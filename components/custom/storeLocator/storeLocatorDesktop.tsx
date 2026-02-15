"use client";

import React from "react";
import dynamic from "next/dynamic";
import { NearbyStore } from "./datas/storeLocator.api";
import { FitMapToMarkers } from "./storeLocatorWrapper";

import StoreCard from "./storeCard";
import SearchStore from "@/components/icons/SearchStore";
import Text from "@/components/generic/Text";
import FilterIcon from "@/components/icons/filterIcon";
import FilterSheet from "./storeFilterSheet";
import AppointmentSheet from "./storeAppointmentSheet";
import BookingStatusModal from "./bookingStatusModal";
import type { StoreLocatorSharedProps } from "./storeLocatorWrapper";
const StoreLeafletMap = dynamic(() => import("./StoreLeafletMap"), {
    ssr: false,
    loading: () => <div className="h-[500px] w-full bg-gray-200" />,
});

export default function StoreLocatorDesktop(props: StoreLocatorSharedProps) {
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

    const validStores = stores || [];

    const mapCenter =
        validStores.length > 0
            ? [validStores[0].latitude, validStores[0].longitude]
            : [12.9716, 77.5946]; // default → Bengaluru

    if (loading || loadingLocation) {
        return (
            <div className="hidden lg:block animate-pulse">
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
        <div className="hidden lg:block">
            {/* Breadcrumb */}
            <div className="bg-background-grey px-[80px] py-[48px]">
                <div className="text-base text-black font-light font-helvetica mb-[32px]">
                    Home /{" "}
                    <span className="text-base text-black font-helvetica font-bold">
                        Store locator
                    </span>
                </div>

                <Text className="text-xl text-black leading-normal lg:text-[48px] font-light lg:leading-[64px] font-helvetica mb-8">
                    find us near you
                </Text>

                {/* Search Bar */}
                <form
                    onSubmit={handleSearch}
                    className="flex items-center gap-3 pb-3 relative"
                >
                    <label className="bg-background-grey lg:w-fit left-1/2 -translate-x-1/2 lg:translate-x-0 w-[222px] absolute lg:left-[30px] top-[-13px]">
                        <Text
                            font="helvetica"
                            color="fontSecondary"
                            size="customText11"
                        >
                            Enter PIN code, city or state to locate a store near
                            you
                        </Text>
                    </label>
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Enter PIN code, city or state to locate a store near you"
                        className="w-full border border-black placeholder-transparent rounded-full pl-6 pr-9 py-4 text-lg"
                    />
                    <button
                        type="submit"
                        disabled={loadingLocation}
                        className="text-gray-600 hover:text-black transition absolute right-4 top-7 -translate-y-1/2 cursor-pointer"
                    >
                        {loadingLocation ? (
                            <span className="animate-spin border-2 border-t-transparent border-black rounded-full w-5 h-5 inline-block" />
                        ) : (
                            <SearchStore size={24} stroke="black" />
                        )}
                    </button>
                </form>
            </div>

            {/* Filters */}
            <div className="flex justify-between items-center px-[80px] py-[24px] border-b border-border-color-light">
                <p className="text-gray-600">
                    {totalStores} {totalStores <= 1 ? "store" : "stores"} found{" "}
                    {!locationDenied && lastSearchLabel
                        ? `near ${lastSearchLabel}`
                        : ""}
                </p>
                {validStores.length >= 1 && (
                    <button
                        className="border border-gray-400 text-black px-8 py-2 rounded-full text-sm lg:text-xl hover:bg-gray-100 transition flex items-center gap-2 cursor-pointer"
                        onClick={() => setFilterOpen(true)}
                    >
                        <FilterIcon size={16} />
                        Filters
                    </button>
                )}
            </div>

            {/* Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-[40%_1fr] py-[48px] px-[80px] gap-8">
                {/* Store List */}
                <div
                    className="max-h-[500px] overflow-y-auto pr-2"
                    data-lenis-prevent
                >
                    {validStores.length === 0 ? (
                        <p className="text-center text-gray-500">
                            No nearby stores found.
                        </p>
                    ) : (
                        validStores.map((store: NearbyStore) => (
                            <StoreCard
                                key={store.sourceCode || store.name}
                                store={store}
                                onBook={() => handleBookClick(store)}
                            />
                        ))
                    )}
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
                </div>

                {/* Map */}
                <div className="overflow-hidden rounded-xl shadow-md">
                    <StoreLeafletMap
                        stores={validStores}
                        center={mapCenter as [number, number]}
                    />
                </div>
            </div>

            {/* Filter Offcanvas */}
            <FilterSheet
                open={filterOpen}
                onOpenChange={setFilterOpen}
                filteredStores={props.filteredStores}
                brandOptions={brandCategories}
                onApplyFilters={handleApplyFilters}
                currentFilters={props.appliedFilters}
            />

            {/* Appointment Offcanvas */}
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
