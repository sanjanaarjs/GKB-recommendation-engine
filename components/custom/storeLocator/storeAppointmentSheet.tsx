"use client";

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetOverlay,
    SheetTitle,
} from "@/components/ui/sheet";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import Text from "@/components/generic/Text";
import { StoreLocatorWrapperProps } from "./storeCard";
import CartCall from "@/components/icons/CartCall";
import ChevronRight from "@/components/icons/ChevronRight";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useLenis } from "lenis/react";

interface AppointmentSheetProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    store: StoreLocatorWrapperProps["store"] | null;
    slotsData?: { time: string; isBooked: boolean }[];
    loading?: boolean;
    onDateChange?: (date: string) => void;
    onBookSlot?: (args: {
        slotTime: string;
        date: string;
        name?: string;
        mobileNumber: string;
        type: string;
        email: string | undefined;
    }) => void;
    isLoggedIn?: boolean;
}

export default function AppointmentSheet({
    open,
    onOpenChange,
    store,
    slotsData = [],
    loading = false,
    onDateChange,
    onBookSlot,
    isLoggedIn = false,
}: Readonly<AppointmentSheetProps>) {
    //  helper to always get tomorrow in yyyy-mm-dd
    const getTomorrowDate = () => {
        const t = new Date();
        t.setDate(t.getDate() + 1);
        return t.toISOString().split("T")[0];
    };

    const [selectedDate, setSelectedDate] = useState(getTomorrowDate());

    const serviceOptions = [
        "General eye test at store",
        "Hearing test at store",
        "Home service",
        "Lens experience center",
    ];

    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");
    const [email, setEmail] = useState("");
    const [selectedService, setSelectedService] = useState(serviceOptions[0]);

    const lenis = useLenis(); // initialize lenis

    // Disable Lenis scroll when sheet is open
    useEffect(() => {
        if (open) {
            lenis?.stop(); // disable smooth scroll
            document.body.style.overflow = "hidden"; // fallback for touch devices
        } else {
            lenis?.start(); // re-enable scroll
            document.body.style.overflow = "";
        }

        return () => {
            lenis?.start(); // ensure scroll is re-enabled on unmount
            document.body.style.overflow = "";
        };
    }, [open, lenis]);

    if (!store) return null;
    // validators
    const isMobileValid = /^\d{10}$/.test(mobile);
    const isEmailValid =
        isLoggedIn || email.length === 0
            ? isLoggedIn // if logged in, we don't require email
            : /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newDate = e.target.value;
        setSelectedDate(newDate);
        onDateChange?.(newDate); // triggers refetch in parent
        setSelectedSlot(null); //  UPDATED: reset slot on date change
    };

    const handleSlotSelect = (slotTime: string) => {
        // 🔹 UPDATED: only store slot, no API call yet
        setSelectedSlot(slotTime);
    };

    const handleBookNow = () => {
        if (!selectedSlot || !mobile) return;
        onBookSlot?.({
            slotTime: selectedSlot,
            date: selectedDate,
            mobileNumber: mobile,
            name: !isLoggedIn ? name : undefined,
            type: selectedService,
            email: !isLoggedIn ? email : undefined,
        });
        //  reset everything after booking
        setSelectedDate(getTomorrowDate());
        setSelectedSlot(null);
        setName("");
        setMobile("");
        setEmail("");
        setSelectedService(serviceOptions[0]);
    };

    let slotContent;

    if (loading) {
        slotContent = (
            <Text className="text-sm text-gray-500 font-helvetica">
                Loading available slots...
            </Text>
        );
    } else if (slotsData.length > 0) {
        slotContent = (
            <div className="grid grid-cols-3 gap-2 text-sm">
                {slotsData.map((slot) => (
                    <button
                        key={slot.time}
                        disabled={slot.isBooked}
                        onClick={() => handleSlotSelect(slot.time)} //  UPDATED
                        className={`border border-gray-300 rounded-none py-2 font-normal font-helvetica leading-normal text-sm transition cursor-pointer
                            ${
                                slot.isBooked
                                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                    : selectedSlot === slot.time
                                      ? "bg-black text-white"
                                      : "hover:bg-black hover:text-white"
                            }`}
                    >
                        {slot.time}
                    </button>
                ))}
            </div>
        );
    } else {
        slotContent = (
            <Text className="text-sm text-gray-500 font-helvetica">
                No slots available
            </Text>
        );
    }

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetOverlay className="!z-[9999] bg-black/50" />
            <SheetContent
                side="right"
                className="w-full lg:w-[420px] overflow-y-auto gap-0 z-[9999]"
                data-lenis-prevent
            >
                <SheetHeader className="p-6 bg-white">
                    <SheetTitle className="text-sm text-black font-bold leading-[18px] font-helvetica">
                        Book appointment
                    </SheetTitle>
                </SheetHeader>

                <div>
                    {/* Store Details */}
                    <div className="px-[40px] pt-[32px] pb-[24px] bg-background-grey">
                        <div className="flex items-center mb-4 gap-2 justify-between">
                            <Text className="text-sm text-black font-light leading-[18px] font-helvetica">
                                Store details
                            </Text>
                            <button
                                onClick={() => onOpenChange(false)}
                                className="text-sm text-black font-bold leading-[18px] font-helvetica italic flex items-center gap-1 cursor-pointer"
                            >
                                Change
                                <ChevronRight size={14} fill="black" />
                            </button>
                        </div>
                        <Text className="text-sm text-black font-bold leading-[18px] font-helvetica mb-2">
                            {store.name}
                        </Text>
                        <Text className="text-sm text-black font-light leading-[20px] font-helvetica mb-4">
                            {store.city}
                        </Text>

                        <Text className="text-sm flex items-center gap-1 text-black font-light leading-normal font-helvetica">
                            <CartCall size={16} />
                            <a
                                href={`tel:${store.landlinePrimary}`}
                                className="font-bold italic hover:underline"
                            >
                                {store.landlinePrimary}
                            </a>
                        </Text>
                    </div>
                    <div className="px-[40px] py-[24px]">
                        {/* Service Selection */}
                        <div className="border-b border-store-border pb-6 mb-4">
                            <Text className="font-bold font-helvetica leading-[18px] text-sm mb-4">
                                Which service would you like to book?
                            </Text>

                            <RadioGroup
                                value={selectedService}
                                onValueChange={setSelectedService}
                            >
                                {serviceOptions.map((opt) => (
                                    <div
                                        key={opt}
                                        className="flex items-center space-x-3"
                                    >
                                        <RadioGroupItem value={opt} id={opt} />
                                        <label
                                            htmlFor={opt}
                                            className="text-sm font-normal font-helvetica leading-[20px] text-black peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            {opt}
                                        </label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>

                        {/* Date Picker */}
                        <div className="border-b border-store-border pb-6 mb-4">
                            <Text className="font-bold font-helvetica leading-[18px] text-sm mb-4">
                                Choose date
                            </Text>
                            <Input
                                type="date"
                                value={selectedDate}
                                onChange={handleDateChange}
                                min={getTomorrowDate()} //  only allow dates from tomorrow
                                className="w-full font-helvetica block rounded-none cursor-pointer"
                            />
                        </div>

                        {/* Time Slot Selection (refactored) */}
                        <div className="border-b border-store-border pb-6 mb-4">
                            <Text className="font-bold font-helvetica leading-[18px] text-sm mb-4">
                                Choose a time slot
                            </Text>
                            {slotContent}
                        </div>

                        {/* Name & Mobile Input Section */}
                        <div className="border-b border-store-border pb-6 mb-4">
                            {!isLoggedIn && (
                                <>
                                    <div className="mb-4">
                                        <Text className="font-bold font-helvetica text-sm mb-2">
                                            Email
                                        </Text>
                                        <Input
                                            type="email"
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                            placeholder="Enter your email"
                                            className="rounded-none"
                                        />
                                        {!isLoggedIn &&
                                            email &&
                                            !isEmailValid && (
                                                <Text className="text-xs text-red-600 mt-1">
                                                    Enter a valid email address
                                                </Text>
                                            )}
                                    </div>
                                    <div className="mb-4">
                                        <Text className="font-bold font-helvetica text-sm mb-2">
                                            Name
                                        </Text>
                                        <Input
                                            type="text"
                                            value={name}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (
                                                    /^[\p{L}\p{M}'\s-]*$/u.test(
                                                        value,
                                                    )
                                                )
                                                    setName(value);
                                            }}
                                            placeholder="Enter your name"
                                            className="rounded-none"
                                        />
                                    </div>
                                </>
                            )}
                            <div>
                                <Text className="font-bold font-helvetica text-sm mb-2">
                                    Mobile Number
                                </Text>
                                <Input
                                    type="tel"
                                    value={mobile}
                                    autoComplete="tel"
                                    onChange={(e) => {
                                        const cleaned = e.target.value
                                            .replace(/\D/g, "")
                                            .slice(0, 10);
                                        setMobile(cleaned);
                                    }}
                                    placeholder="Enter mobile number"
                                    className="rounded-none"
                                />
                                {mobile && !isMobileValid && (
                                    <Text className="text-xs text-red-600 mt-1">
                                        Enter a 10-digit mobile number
                                    </Text>
                                )}
                            </div>
                        </div>

                        {/* Book Button */}
                        <Button
                            onClick={handleBookNow}
                            disabled={
                                !selectedSlot ||
                                !isMobileValid ||
                                (!isLoggedIn && (!name || !isEmailValid))
                            }
                            className="w-full bg-black text-white rounded-full hover:bg-gray-800 transition cursor-pointer"
                        >
                            Book Appointment
                        </Button>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
