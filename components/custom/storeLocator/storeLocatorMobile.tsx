"use client";

import React, { useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Text from "@/components/generic/Text";
import FilterIcon from "@/components/icons/filterIcon";
import FilterSheet from "./storeFilterSheet";
import AppointmentSheet from "./storeAppointmentSheet";
import StoreCard from "./storeCard";
import SearchStore from "@/components/icons/SearchStore";
import StoreList from "@/components/icons/StoreList";
import StoreMap from "@/components/icons/StoreMap";
import BookingStatusModal from "./bookingStatusModal";
import type { StoreLocatorSharedProps } from "./storeLocatorWrapper";
import { NearbyStore } from "./datas/storeLocator.api";
import { FitMapToMarkers } from "./storeLocatorWrapper";
import dynamic from "next/dynamic";

const StoreLeafletMap = dynamic(() => import("./StoreLeafletMap"), {
    ssr: false,
});

export default function StoreLocatorMobile(props: StoreLocatorSharedProps) {
    const {
        stores,
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
        slotData,
        slotLoading,
        handleFetchSlotsByDate,
        handleApplyFilters,
        handleSearch,
        search,
        setSearch,
        filterOpen,
        setFilterOpen,
        loading,
        loadingLocation,
        locationDenied,
        lastSearchLabel,
        hasMoreStores,
        onLoadMore,
        totalStores,
    } = props;

    const [activeTab, setActiveTab] = React.useState("list");

    useEffect(() => {
        if (!filterOpen && !appointmentOpen) {
            setActiveTab("list");
        }
    }, [filterOpen, appointmentOpen]);

    const validStores = stores || [];

    const mapCenter =
        validStores.length > 0
            ? [validStores[0].latitude, validStores[0].longitude]
            : [12.9716, 77.5946]; // default → Bengaluru

    if (loading || loadingLocation) {
        return (
            // show mobile skeleton when loading; desktop has its own skeleton elsewhere
            <div className="block lg:hidden animate-pulse">
                {/* keep skeleton UI exactly unchanged */}
                <div className="bg-background-grey px-[80px] py-[48px]">
                    <div className="h-4 w-56 bg-gray-200 rounded mb-[32px] skeleton" />
                    <div className="h-10 w-[420px] bg-gray-200 rounded skeleton" />
                    <div className="mt-8 relative">
                        <div className="h-12 w-full bg-gray-200 rounded-full skeleton" />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 bg-gray-300 rounded-full skeleton" />
                    </div>
                </div>
                <div className="flex justify-between items-center px-[80px] py-[24px] border-b border-border-color-light">
                    <div className="h-4 w-28 bg-gray-200 rounded skeleton" />
                    <div className="h-9 w-28 bg-gray-200 rounded-full skeleton" />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-[40%_1fr] py-[48px] px-[80px] gap-8">
                    <div className="max-h-[500px] overflow-hidden pr-2">
                        <div className="flex flex-col gap-4">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <div key={i} className="border rounded-xl p-4">
                                    <div className="h-5 w-2/3 bg-gray-200 rounded mb-2 skeleton" />
                                    <div className="h-4 w-1/3 bg-gray-200 rounded mb-3 skeleton" />
                                    <div className="h-4 w-1/2 bg-gray-200 rounded skeleton" />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="overflow-hidden rounded-xl shadow-md">
                        <div className="h-[500px] w-full bg-gray-200 skeleton" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="block lg:hidden">
            <div className="bg-background-grey px-[40px] py-[32px] ">
                <Text className="text-[28px] text-black leading-normal lg:text-[48px] font-light lg:leading-[64px] font-helvetica mb-8">
                    find us near you
                </Text>

                {/* Search Bar */}
                <form
                    onSubmit={handleSearch}
                    className="flex items-center w-full h-10 bg-white rounded-full border border-border-color-light overflow-hidden"
                >
                    <div className="flex items-center flex-1 pl-4">
                        <SearchStore size={14} stroke="gray" />
                        <input
                            type="text"
                            placeholder="Search location"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-2 py-[11px] text-xs font-normal font-helvetica text-font-main placeholder-border-color-light outline-none lg:placeholder:content-['Enter_PIN_code,_city_or_state']"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loadingLocation}
                        className="border-2 border-black rounded-full h-full px-6 font-helvetica text-xs font-extrabold text-font-main"
                    >
                        {loadingLocation ? (
                            <span className="animate-spin border-2 border-t-transparent border-black rounded-full w-5 h-5 inline-block" />
                        ) : (
                            "search"
                        )}
                    </button>
                </form>
            </div>

            {/* Header Tabs */}
            <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
            >
                <TabsList className="group w-full flex justify-around border-b bg-white sticky top-0 z-10 p-0">
                    <TabsTrigger
                        value="list"
                        className="flex items-center gap-2 text-sm font-light leading-[18px] data-[state=active]:font-bold data-[state=active]:border-0 data-[state=active]:shadow-none !border-r !border-store-border !rounded-none py-0"
                    >
                        <StoreList size={16} /> Store list
                    </TabsTrigger>

                    <TabsTrigger
                        value="map"
                        className="flex items-center gap-2 text-sm font-light leading-[18px] data-[state=active]:font-bold data-[state=active]:border-0 data-[state=active]:shadow-none !border-r !border-store-border !rounded-none py-0"
                    >
                        <StoreMap size={16} /> Store map
                    </TabsTrigger>

                    {validStores.length >= 1 && (
                        <TabsTrigger
                            value="filter"
                            className="flex items-center gap-2 text-sm font-light leading-[18px] data-[state=active]:font-bold data-[state=active]:border-0 data-[state=active]:shadow-none !border-r !border-store-border !rounded-none py-0"
                            onClick={() => setFilterOpen(true)}
                        >
                            <FilterIcon size={16} /> Store filter
                        </TabsTrigger>
                    )}
                </TabsList>

                {/* Store List View */}
                <TabsContent value="list" className="px-0 py-3">
                    <Text className="text-sm text-black font-helvetica px-[48px] mb-4">
                        {totalStores} {totalStores <= 1 ? "store" : "stores"}{" "}
                        found{" "}
                        {!locationDenied && lastSearchLabel
                            ? `near ${lastSearchLabel}`
                            : ""}
                    </Text>
                    <div className="space-y-6">
                        {stores.map((store) => (
                            <div key={store.sourceCode || store.name}>
                                <StoreCard
                                    key={store.sourceCode || store.name}
                                    store={store}
                                    onBook={() => {
                                        handleBookClick(store);
                                        setAppointmentOpen(true);
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                    {hasMoreStores && (
                        <div className="flex justify-center cursor-pointer">
                            <button
                                onClick={onLoadMore}
                                className="mt-4 bg-black text-white py-2 px-4 rounded"
                            >
                                View More
                            </button>
                        </div>
                    )}
                </TabsContent>

                {/* Map View */}
                <TabsContent value="map">
                    <StoreLeafletMap
                        stores={validStores}
                        center={mapCenter as [number, number]}
                    />
                </TabsContent>
            </Tabs>

            {/* Filter Drawer */}
            <FilterSheet
                open={validStores.length >= 1 && filterOpen}
                onOpenChange={setFilterOpen}
                filteredStores={props.filteredStores}
                brandOptions={brandCategories}
                onApplyFilters={handleApplyFilters}
                currentFilters={props.appliedFilters}
            />

            {/* Appointment Drawer */}
            <AppointmentSheet
                open={appointmentOpen}
                onOpenChange={setAppointmentOpen}
                store={selectedStore}
                slotsData={slotData?.slots || []}
                loading={slotLoading}
                onDateChange={handleFetchSlotsByDate}
                onBookSlot={handleBookAppointment}
                isLoggedIn={isLoggedIn}
            />
        </div>
    );
}
