"use client";

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import Text from "@/components/generic/Text";
import Close from "@/components/icons/Close";
import SearchStore from "@/components/icons/SearchStore";
import InStockToggle from "./toggleSwitch";
import { useEffect, useState } from "react";
import {
    fetchNearbyStores,
    StoreLocation,
} from "./datas/serviceAvailability.Data.api";
import { useLenis } from "lenis/react";
import Location from "@/components/icons/Location";

interface StoreAvailabilitySheetProps {
    isOpen: boolean;
    onClose: () => void;
    sku: string;
    lat?: number;
    lon?: number;
}

const StoreAvailabilitySheet = ({
    isOpen,
    onClose,
    lat: initialLat,
    lon: initialLon,
    sku,
}: StoreAvailabilitySheetProps) => {
    const [stores, setStores] = useState<StoreLocation[]>([]);
    const [filteredStores, setFilteredStores] = useState<StoreLocation[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [showOnlyInStock, setShowOnlyInStock] = useState(true);
    const [locationAllowed, setLocationAllowed] = useState<boolean | null>(
        null,
    );

    const [lat, setLat] = useState<number | null>(initialLat ?? null); // << added
    const [lon, setLon] = useState<number | null>(initialLon ?? null); // << added
    const [hasSearched, setHasSearched] = useState(false);

    const lenis = useLenis();

    // Disable Lenis
    useEffect(() => {
        if (isOpen) {
            lenis?.stop();
            document.body.style.overflow = "hidden";
        } else {
            lenis?.start(); // re-enable scroll
            document.body.style.overflow = "";
        }

        return () => {
            lenis?.start();
            document.body.style.overflow = "";
        };
    }, [isOpen, lenis]);

    // Ask browser location
    useEffect(() => {
        if (!isOpen) return;
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setLocationAllowed(true);
                setLat(pos.coords.latitude);
                setLon(pos.coords.longitude);
            },
            () => {
                setLocationAllowed(false);
            },
        );
    }, [isOpen]);

    // Fetch Stores
    useEffect(() => {
        if (!isOpen) return;

        const fetchStores = async () => {
            // CASE 1: Still waiting on location prompt
            if (locationAllowed === null) return;

            // If user typed search => don't auto fetch, search handler handles fetching
            if (searchQuery.trim()) return;

            // CASE 2: Denied location & no search => ask user to search
            if (locationAllowed === false && !hasSearched) {
                setStores([]);
                setLoading(false);
                return;
            }

            // CASE 3: Location allowed but waiting for coords
            if (locationAllowed === true && (!lat || !lon)) {
                setLoading(true);
                return;
            }

            // CASE 4: Location allowed & coords available => fetch
            if (locationAllowed === true && lat && lon) {
                setLoading(true);
                const response = await fetchNearbyStores(
                    lat,
                    lon,
                    sku,
                    "",
                    "",
                    showOnlyInStock,
                );
                setStores(response?.data ?? []);
                setLoading(false);
                return;
            }
        };

        fetchStores();
    }, [
        isOpen,
        lat,
        lon,
        showOnlyInStock,
        locationAllowed,
        sku,
        searchQuery,
        hasSearched,
    ]);

    // Client-Side Filter
    useEffect(() => {
        let filtered = stores;

        if (showOnlyInStock) {
            filtered = filtered.filter((store) => store.skuAvailability);
        }

        setFilteredStores(filtered);
    }, [stores, showOnlyInStock]);

    // 🔹 GEOCODE Search + Fetch Stores
    const handleGeoSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        setHasSearched(true);

        try {
            setLoading(true);

            const res = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
                    searchQuery.trim(),
                )}&addressdetails=1&limit=1`,
            );
            const geoData = await res.json();

            if (geoData && geoData.length > 0) {
                const { lat: foundLat, lon: foundLon } = geoData[0];
                const parsedLat = parseFloat(foundLat);
                const parsedLon = parseFloat(foundLon);

                setLat(parsedLat);
                setLon(parsedLon);

                const response = await fetchNearbyStores(
                    parsedLat,
                    parsedLon,
                    sku,
                    "",
                    "",
                    showOnlyInStock,
                );

                setStores(response?.data ?? []);
            } else {
                alert("No location found for that search term.");
            }
        } catch (err) {
            console.error("Geocoding failed:", err);
        } finally {
            setSearchQuery("");
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!isOpen) {
            setHasSearched(false);
            setStores([]);
        }
    }, [isOpen]);

    const showResultSummary =
        locationAllowed !== null && !loading && filteredStores.length > 0;

    const resultCity =
        filteredStores[0]?.city || searchQuery || "your location";

    const resultCount = filteredStores.length;

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent
                side="right"
                className="w-full lg:max-w-[568px] [&>button>svg:not(.keep)]:hidden gap-0"
            >
                <SheetHeader className="flex justify-between items-center flex-row shadow-[0_12px_24px_0_rgba(0,0,0,0.10)] p-6">
                    <SheetTitle className="w-full text-center font-helvetica text-[1rem] lg:text-[1.25rem] text-black font-semibold leading-[24px]">
                        In-store availability
                    </SheetTitle>
                    <button onClick={onClose} className="keep cursor-pointer">
                        <Close size={20} fill="#000" />
                    </button>
                </SheetHeader>

                <div
                    className="p-4 lg:p-[48px] overflow-y-auto"
                    data-lenis-prevent
                >
                    <div className="mb-[48px] border-b">
                        <form onSubmit={handleGeoSearch}>
                            <div className="relative bg-white">
                                <input
                                    type="text"
                                    placeholder="Search stores by city, state, postcode or area"
                                    className="w-full border border-[#B2B2B2] rounded-full py-0 px-4 text-[1rem] font-helvetica font-light leading-[22px] placeholder:text-[1rem] placeholder:font-helvetica focus:outline-none placeholder:font-light placeholder:leading-[22px] placeholder:text-[#0B0B0B] text-[#0B0B0B] min-h-[48px]"
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                />
                                <button
                                    type="submit"
                                    className="absolute right-3 top-1/2 -translate-y-1/2"
                                    aria-label="Search for stores"
                                >
                                    <SearchStore size={24} />
                                </button>
                            </div>
                        </form>

                        {/* Toggle for stock availability */}
                        <InStockToggle
                            enabled={showOnlyInStock}
                            onChange={(val) => setShowOnlyInStock(val)}
                        />

                        {showResultSummary && (
                            <Text
                                as="p"
                                className="mb-4 font-helvetica text-sm font-medium text-black"
                            >
                                {resultCount}{" "}
                                {resultCount === 1 ? "store" : "stores"} found
                                near{" "}
                                <span className="capitalize">{resultCity}</span>
                            </Text>
                        )}
                    </div>

                    {/* Stores */}
                    <div className="space-y-4 flex-1 overflow-y-auto">
                        {locationAllowed === false &&
                        !hasSearched &&
                        filteredStores.length === 0 ? (
                            <Text className="text-center text-gray-500 font-helvetica">
                                Location is blocked — Please search by city or
                                pincode.
                            </Text>
                        ) : loading ? (
                            <Text className="text-center text-gray-500">
                                Loading stores...
                            </Text>
                        ) : filteredStores.length === 0 ? (
                            <Text className="text-center text-gray-500">
                                No stores found
                            </Text>
                        ) : (
                            filteredStores.map((store, idx) => (
                                <div key={idx} className="space-y-4">
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center gap-2 justify-between">
                                            <Text
                                                as="p"
                                                className="font-helvetica font-semibold text-sm leading-[22px] text-black"
                                            >
                                                {store.name}
                                            </Text>
                                            <div className="flex items-center gap-1">
                                                <Location size={15} />
                                                <Text
                                                    as={"p"}
                                                    className="font-helvetica font-light text-sm leading-[22px] text-black"
                                                >
                                                    {store.distance} KM
                                                </Text>
                                            </div>
                                        </div>
                                        <Text
                                            as="p"
                                            className="font-helvetica font-light text-sm leading-[22px] text-black"
                                        >
                                            {store.city}, {store.state} -{" "}
                                            {store.postcode}
                                        </Text>
                                        <Text
                                            as="p"
                                            className="font-helvetica font-light text-sm leading-[22px] text-black"
                                        >
                                            Contact:{" "}
                                            <span className="font-helvetica text-sm leading-[22px] text-black font-medium italic">
                                                {store.landlinePrimary || "N/A"}
                                            </span>
                                        </Text>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <span
                                            className={`w-3 h-3 rounded-full ${
                                                store.skuAvailability
                                                    ? "bg-green-500"
                                                    : "bg-red-500"
                                            }`}
                                        />
                                        <Text
                                            as="p"
                                            className="font-helvetica text-sm leading-[22px] text-black font-medium"
                                        >
                                            {store.skuAvailability
                                                ? "Stock available in store"
                                                : "Stock not available in store"}
                                        </Text>
                                    </div>
                                    <hr className="mt-3" />
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default StoreAvailabilitySheet;
