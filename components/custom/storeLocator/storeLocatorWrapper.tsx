"use client";

import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { useLazyQuery, useMutation } from "@apollo/client";
import {
    GET_NEARBY_STORES,
    NearbyStore,
    QuickFilter,
} from "@/components/custom/storeLocator/datas/storeLocator.api";
import {
    GET_BRAND_CATEGORIES,
    GetBrandCategoriesResponse,
    BrandCategory,
} from "@/lib/services/magento/homepageData";
import {
    GET_AVAILABLE_SLOTS,
    GetAvailableSlotsResponse,
} from "./datas/availableSlots.api";
import {
    BOOK_APPOINTMENT,
    BookAppointmentResponse,
} from "./datas/bookAppointment.api";
import { getCookieValue, hasCookie } from "@/lib/cookie";
import StoreLocatorDesktop from "./storeLocatorDesktop";
import StoreLocatorMobile from "./storeLocatorMobile";
import { useMap } from "react-leaflet";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import type { StaticImageData } from "next/image";
import BookingStatusModal from "./bookingStatusModal";
let L: typeof import("leaflet") | null = null;

type BookingStatus = "success" | "error";

export interface StoreLocatorSharedProps {
    stores: NearbyStore[];
    filteredStores: QuickFilter[]; // quick filters structure
    brandCategories: BrandCategory[];
    isLoggedIn: boolean;
    selectedStore: NearbyStore | null;
    handleBookClick: (store: NearbyStore) => void;
    appointmentOpen: boolean;
    setAppointmentOpen: (open: boolean) => void;
    statusModalOpen: boolean;
    setStatusModalOpen: (open: boolean) => void;
    bookingStatus: BookingStatus;
    bookingMessage: string;
    appointmentId: string | null;
    handleBookAppointment: (args: {
        slotTime: string;
        date: string;
        mobileNumber: string;
        name?: string;
        type: string;
        email?: string;
    }) => Promise<void>;
    slotData: GetAvailableSlotsResponse["getAvailableSlots"] & {
        slots: { isBooked: boolean; time: string }[];
    };
    slotLoading: boolean;
    handleFetchSlotsByDate: (date: string) => void;
    handleApplyFilters: (filters: {
        name: string;
        isAudiology: number;
        isMyopiaClinic: number;
        isHomeService: number;
        isLensExpZone: number;
        brand: string;
    }) => void;
    handleSearch: (e: React.FormEvent) => Promise<void>;
    search: string;
    setSearch: (v: string) => void;
    filterOpen: boolean;
    setFilterOpen: (v: boolean) => void;
    appliedFilters: {
        name: string;
        isAudiology: number;
        isMyopiaClinic: number;
        isHomeService: number;
        isLensExpZone: number;
        brand: string;
    };
    loading: boolean;
    loadingLocation: boolean;
    locationDenied: boolean;
    lastSearchLabel: string;
    hasMoreStores: boolean;
    onLoadMore: () => void;
    totalStores: number;
}

function FitMapToMarkers({ stores }: { stores: NearbyStore[] }) {
    const map = useMap();

    useEffect(() => {
        if (!stores?.length || !L) return;

        const validCoords = stores
            .filter((s) => s.latitude && s.longitude)
            .map((s) => [s.latitude, s.longitude]) as [number, number][];

        if (validCoords.length > 0) {
            const bounds = L.latLngBounds(validCoords);
            map.fitBounds(bounds, { padding: [50, 50] });
        }
    }, [stores, map]);

    return null;
}

export { FitMapToMarkers };

export default function StoreLocatorWrapper() {
    useEffect(() => {
        if (typeof window !== "undefined") {
            import("leaflet").then((leaflet) => {
                L = leaflet;

                const DefaultIcon = leaflet.icon({
                    iconUrl:
                        typeof iconUrl === "string"
                            ? iconUrl
                            : (iconUrl as StaticImageData).src,
                    shadowUrl:
                        typeof iconShadow === "string"
                            ? iconShadow
                            : (iconShadow as StaticImageData).src,
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [0, -30],
                });

                leaflet.Marker.prototype.options.icon = DefaultIcon;
            });
        }
    }, []);
    // UI / logic states
    const [search, setSearch] = useState("");
    const [filterOpen, setFilterOpen] = useState(false);
    const [appliedFilters, setAppliedFilters] = useState<{
        name: string;
        isAudiology: number;
        isMyopiaClinic: number;
        isHomeService: number;
        isLensExpZone: number;
        brand: string;
    }>({
        name: "",
        isAudiology: 0,
        isMyopiaClinic: 0,
        isHomeService: 0,
        isLensExpZone: 0,
        brand: "",
    });
    const [appointmentOpen, setAppointmentOpen] = useState(false);
    const [selectedStore, setSelectedStore] = useState<NearbyStore | null>(
        null,
    );
    const [locationDenied, setLocationDenied] = useState(false);
    const [loadingLocation, setLoadingLocation] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [statusModalOpen, setStatusModalOpen] = useState(false);
    const [bookingStatus, setBookingStatus] =
        useState<BookingStatus>("success");
    const [visibleCount, setVisibleCount] = useState(10);
    const [appointmentId, setAppointmentId] = useState<string | null>(null);
    const [bookingMessage, setBookingMessage] = useState<string>("");
    const [searchCoords, setSearchCoords] = useState<{
        lat: number;
        lon: number;
    } | null>(null);
    const [lastSearchLabel, setLastSearchLabel] = useState<string>("");
    const [storeArea, setStoreArea] = useState<string>("");
    const [storeSlot, setStoreSlot] = useState<string>("");

    // GraphQL hooks
    const [fetchStores, { data, loading }] = useLazyQuery(GET_NEARBY_STORES, {
        fetchPolicy: "network-only",
    });
    const [getBrandCategories, { data: brandData }] =
        useLazyQuery<GetBrandCategoriesResponse>(GET_BRAND_CATEGORIES);

    const [getSlots, { data: slotData, loading: slotLoading }] = useLazyQuery(
        GET_AVAILABLE_SLOTS,
        { fetchPolicy: "no-cache" },
    );

    const [bookAppointment] =
        useMutation<BookAppointmentResponse>(BOOK_APPOINTMENT);

    // derived data
    const apiStores: NearbyStore[] = data?.getNearbyStores?.data || [];
    const quickFilters = data?.getNearbyStores?.quick_filters || [];
    const brandCategories = brandData?.getBrandCategories?.data || [];

    const validStores = apiStores.filter(
        (s: NearbyStore) =>
            typeof s.latitude === "number" &&
            typeof s.longitude === "number" &&
            s.sourceCode !== "default",
    );

    const visibleStores = validStores.slice(0, visibleCount);
    const totalStores = data?.getNearbyStores?.totalCount ?? 0;

    // check login once
    useEffect(() => {
        const checkToken = async () => {
            const token = await hasCookie("userToken");
            setIsLoggedIn(!!token);
        };
        checkToken();
    }, []);

    // fetch brand categories once
    useEffect(() => {
        getBrandCategories();
    }, [getBrandCategories]);

    // fetch stores for current location on mount
    useEffect(() => {
        if (!navigator.geolocation) {
            callApiWithoutLocation();
            return;
        }
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                fetchStores({
                    variables: {
                        lat: latitude,
                        lon: longitude,
                        sku: "",
                        brand: "",
                    },
                });
            },
            () => {
                // CASE 2 → permission denied → DO NOT send lat/lon
                callApiWithoutLocation();
            },
        );
    }, [fetchStores]);

    const callApiWithoutLocation = () => {
        fetchStores({
            variables: {
                name: "",
                isAudiology: 0,
                isMyopiaClinic: 0,
                isHomeService: 0,
                isLensExpZone: 0,
                brand: "",
                skuAvailability: true,
                page: 1,
                pageSize: 100,
            },
        });
    };

    useEffect(() => {
        if (appointmentOpen && selectedStore?.sourceCode) {
            const tomorrow = getTomorrowDate();
            getSlots({
                variables: {
                    gkbStoreId: selectedStore.sourceCode,
                    appointmentDate: tomorrow,
                },
            });
        }
    }, [appointmentOpen, selectedStore, getSlots]);

    // search handler (geocode)
    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!search.trim()) return;

        try {
            setLoadingLocation(true);
            const res = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
                    search,
                )}`,
            );
            const geoData = await res.json();
            if (geoData && geoData.length > 0) {
                const { lat, lon } = geoData[0];

                // store searched coords
                setSearchCoords({ lat: parseFloat(lat), lon: parseFloat(lon) });

                // store the searched label
                setLastSearchLabel(search.trim());

                await fetchStores({
                    variables: {
                        lat: parseFloat(lat),
                        lon: parseFloat(lon),
                        sku: "",
                        brand: "",
                    },
                });
            } else {
                alert("No location found for that search term.");
            }
            setSearch("");
        } catch (err) {
            console.error("Geocoding failed:", err);
        } finally {
            setLoadingLocation(false);
        }
    };

    // apply filters
    const handleApplyFilters = (filters: {
        name: string;
        isAudiology: number;
        isMyopiaClinic: number;
        isHomeService: number;
        isLensExpZone: number;
        brand: string;
    }) => {
        // persist the applied filters locally so UI (filter sheet) can reflect selections

        setAppliedFilters(filters);

        const useSearch = !!searchCoords;

        // fallback to geolocation only if no search coordinates exist
        if (useSearch && searchCoords) {
            fetchStores({
                variables: {
                    lat: searchCoords.lat,
                    lon: searchCoords.lon,
                    name: filters.name || "",
                    isAudiology: filters.isAudiology,
                    isMyopiaClinic: filters.isMyopiaClinic,
                    isHomeService: filters.isHomeService,
                    isLensExpZone: filters.isLensExpZone,
                    brand: filters.brand || "",
                    skuAvailability: true,
                    page: 1,
                    pageSize: 100,
                },
            });
        } else if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    fetchStores({
                        variables: {
                            lat: latitude,
                            lon: longitude,
                            name: filters?.name || "",
                            isAudiology: filters?.isAudiology,
                            isMyopiaClinic: filters?.isMyopiaClinic,
                            isHomeService: filters?.isHomeService,
                            isLensExpZone: filters?.isLensExpZone,
                            brand: filters?.brand || "",
                            skuAvailability: true,
                            page: 1,
                            pageSize: 100,
                        },
                    });
                },
                (err) => {
                    console.warn("Location access denied:", err);
                    setLocationDenied(true);
                    // Call API without location as fallback when location is denied
                    fetchStores({
                        variables: {
                            name: filters?.name || "",
                            isAudiology: filters?.isAudiology,
                            isMyopiaClinic: filters?.isMyopiaClinic,
                            isHomeService: filters?.isHomeService,
                            isLensExpZone: filters?.isLensExpZone,
                            brand: filters?.brand || "",
                            skuAvailability: true,
                            page: 1,
                            pageSize: 100,
                        },
                    });
                },
            );
        } else {
            // Geolocation not available, call API without location
            fetchStores({
                variables: {
                    name: filters?.name || "",
                    isAudiology: filters?.isAudiology,
                    isMyopiaClinic: filters?.isMyopiaClinic,
                    isHomeService: filters?.isHomeService,
                    isLensExpZone: filters?.isLensExpZone,
                    brand: filters?.brand || "",
                    skuAvailability: true,
                    page: 1,
                    pageSize: 100,
                },
            });
        }
    };

    const getTomorrowDate = () => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow.toISOString().split("T")[0];
    };

    // fetch slots by date for selected store
    const handleFetchSlotsByDate = (date: string) => {
        if (!selectedStore?.sourceCode) return;
        getSlots({
            variables: {
                gkbStoreId: selectedStore.sourceCode,
                appointmentDate: date,
            },
        });
    };

    // book appointment
    const handleBookAppointment = async ({
        slotTime,
        date,
        mobileNumber,
        name,
        type,
        email,
    }: {
        slotTime: string;
        date: string;
        mobileNumber: string;
        name?: string;
        type: string;
        email?: string;
    }) => {
        if (!selectedStore?.sourceCode) return;
        try {
            const token = await getCookieValue("userToken");

            const decodedToken = (() => {
                if (token) {
                    try {
                        return atob(token);
                    } catch {
                        return token;
                    }
                }
            })();

            const { data } = await bookAppointment({
                variables: {
                    gkbStoreId: selectedStore.sourceCode,
                    appointmentDate: date,
                    slotTime,
                    mobileNumber,
                    type,
                    email: isLoggedIn ? undefined : email,
                    name: isLoggedIn ? undefined : name,
                },
                context: {
                    headers: {
                        Authorization: token ? `Bearer ${decodedToken}` : "",
                    },
                },
            });

            if (data?.bookAppointment?.success) {
                setAppointmentId(data.bookAppointment.appointmentId);
                setBookingStatus("success");
                setBookingMessage(
                    data.bookAppointment.message ||
                        "Appointment booked successfully!",
                );
                setStoreSlot(slotTime);
            } else {
                setBookingStatus("error");
                setBookingMessage(
                    data?.bookAppointment?.message ||
                        "Booking failed, please try again.",
                );
            }
        } catch (error) {
            console.error("Booking error:", error);
            setBookingStatus("error");
            setBookingMessage(
                "Something went wrong while booking the appointment.",
            );
        } finally {
            setAppointmentOpen(false);
            setStatusModalOpen(true);
        }
    };

    const handleBookClick = async (store: NearbyStore) => {
        const token = await hasCookie("userToken");
        setIsLoggedIn(!!token);
        setSelectedStore(store);
        setStoreArea(store.name);
        setAppointmentOpen(true);
    };

    const sharedProps: StoreLocatorSharedProps = {
        // stores: validStores,
        stores: visibleStores,
        filteredStores: quickFilters,
        brandCategories,
        isLoggedIn,
        selectedStore,
        handleBookClick,
        appointmentOpen,
        setAppointmentOpen,
        statusModalOpen,
        setStatusModalOpen,
        bookingStatus,
        bookingMessage,
        appointmentId,
        handleBookAppointment,
        slotData: slotData?.getAvailableSlots || { slots: [] },
        slotLoading,
        handleFetchSlotsByDate,
        handleApplyFilters,
        handleSearch,
        search,
        setSearch,
        filterOpen,
        setFilterOpen,
        appliedFilters,
        loading: Boolean(loading),
        loadingLocation,
        locationDenied,
        lastSearchLabel,
        hasMoreStores: visibleCount < validStores.length,
        onLoadMore: () => setVisibleCount(visibleCount + 10),
        totalStores,
    };

    return (
        <>
            {/* Desktop UI uses Tailwind classes to hide/show */}
            <div className="hidden lg:block">
                <StoreLocatorDesktop {...sharedProps} />
            </div>

            {/* Mobile UI */}
            <div className="block lg:hidden">
                <StoreLocatorMobile {...sharedProps} />
            </div>

            {/* Booking status popup */}
            <BookingStatusModal
                open={statusModalOpen}
                onClose={() => setStatusModalOpen(false)}
                status={bookingStatus}
                appointmentId={appointmentId || ""}
                message={bookingMessage}
                storeArea={storeArea}
                storeSlot={storeSlot}
            />
        </>
    );
}
