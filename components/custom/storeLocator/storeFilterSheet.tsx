"use client";

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetOverlay,
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import Text from "@/components/generic/Text";
import { QuickFilter } from "./datas/storeLocator.api";
import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrandCategory } from "@/lib/services/magento/homepageData";
import { useLenis } from "lenis/react";

interface FilterSheetProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    filteredStores: QuickFilter[];
    brandOptions: BrandCategory[];
    onApplyFilters: (filters: {
        name: string;
        isAudiology: number;
        isMyopiaClinic: number;
        isHomeService: number;
        isLensExpZone: number;
        brand: string;
    }) => void;
    currentFilters?: {
        name: string;
        isAudiology: number;
        isMyopiaClinic: number;
        isHomeService: number;
        isLensExpZone: number;
        brand: string;
    };
}

export default function FilterSheet({
    open,
    onOpenChange,
    filteredStores,
    brandOptions,
    onApplyFilters,
    currentFilters,
}: Readonly<FilterSheetProps>) {
    const [expandedSections, setExpandedSections] = useState<
        Record<number, boolean>
    >({});
    const [selectedStores, setSelectedStores] = useState<string[]>([]);
    const [selectedServices, setSelectedServices] = useState<string[]>([]);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

    const storeFilters = filteredStores
        .map((filter) => {
            if (
                filter.label?.toLowerCase().includes("store") &&
                filter.options?.length > 0
            ) {
                return {
                    ...filter,
                    options: filter.options.slice(1),
                };
            }
            return filter;
        })
        .filter((filter) => filter.options && filter.options.length > 0);

    const mergedFilters: QuickFilter[] = [...storeFilters];
    const lenis = useLenis();

    if (brandOptions?.length) {
        mergedFilters.push({
            label: "Brand",
            options: brandOptions.map((b) => ({
                attribute_code: "brand",
                label: b.name,
                value: b.name,
            })),
        });
    }
    // end merge brand

    useEffect(() => {
        if (open) {
            lenis?.stop(); // pause smooth scrolling of background
            document.body.style.overflow = "hidden"; // prevent page scroll
        } else {
            lenis?.start();
            document.body.style.overflow = "";
        }
        return () => {
            lenis?.start();
            document.body.style.overflow = "";
        };
    }, [open, lenis]);

    // Initialize local selections from the current applied filters when the sheet opens
    useEffect(() => {
        if (!open) return;

        if (currentFilters) {
            setSelectedBrands(
                currentFilters.brand
                    ? currentFilters.brand
                          .split(",")
                          .map((s) => s.trim())
                          .filter(Boolean)
                    : [],
            );

            setSelectedStores(
                currentFilters.name
                    ? currentFilters.name
                          .split(",")
                          .map((s) => s.trim())
                          .filter(Boolean)
                    : [],
            );

            const services: string[] = [];
            if (currentFilters.isAudiology) services.push("Audiology");
            if (currentFilters.isMyopiaClinic) services.push("Myopia Clinic");
            if (currentFilters.isHomeService) services.push("Home Service");
            if (currentFilters.isLensExpZone)
                services.push("Lens Experience Zone");
            setSelectedServices(services);
        }
    }, [open, currentFilters]);

    const toggleShowMore = (index: number) => {
        setExpandedSections((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    const handleToggle = (
        value: string,
        type: "store" | "service" | "brand",
    ) => {
        const stateMap = {
            store: [selectedStores, setSelectedStores],
            service: [selectedServices, setSelectedServices],
            brand: [selectedBrands, setSelectedBrands],
        } as const;

        const [, setState] = stateMap[type];
        setState((prev) =>
            prev.includes(value)
                ? prev.filter((v) => v !== value)
                : [...prev, value],
        );
    };

    const handleReset = () => {
        setSelectedStores([]);
        setSelectedServices([]);
        setSelectedBrands([]);
        // Apply empty filters to the parent so the store locator is reset too
        onApplyFilters({
            name: "",
            brand: "",
            isAudiology: 0,
            isMyopiaClinic: 0,
            isHomeService: 0,
            isLensExpZone: 0,
        });
        // close the sheet so the user sees the cleared results
        onOpenChange(false);
    };

    const handleApply = () => {
        const serviceFlags = {
            isAudiology: selectedServices.includes("Audiology") ? 1 : 0,
            isMyopiaClinic: selectedServices.includes("Myopia Clinic") ? 1 : 0,
            isHomeService: selectedServices.includes("Home Service") ? 1 : 0,
            isLensExpZone: selectedServices.includes("Lens Experience Zone")
                ? 1
                : 0,
        };

        onApplyFilters({
            name: selectedStores.join(", "),
            brand: selectedBrands.join(", "),
            ...serviceFlags,
        });

        onOpenChange(false);
    };

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetOverlay className="!z-[9999] bg-black/50" />
            <SheetContent
                side="right"
                className="w-full lg:max-w-[400px] overflow-y-auto gap-0 z-[9999]"
                data-lenis-prevent
            >
                <SheetHeader className="p-6 bg-white">
                    <SheetTitle className="text-black font-helvetica font-bold leading-normal text-sm">
                        Filter stores by
                    </SheetTitle>
                </SheetHeader>

                <div className="space-y-8 p-6 bg-background-grey h-full">
                    {mergedFilters?.map((filter, index) => {
                        // if no options -> hide heading + section
                        if (!filter.options || filter.options.length === 0)
                            return null;

                        const showAll = expandedSections[index] ?? false;
                        const visibleOptions = showAll
                            ? filter.options
                            : filter.options?.slice(0, 3);

                        // Detect section type
                        const isBrandSection = filter.label
                            ?.toLowerCase()
                            .includes("brand");
                        const isServiceSection = filter.label
                            ?.toLowerCase()
                            .includes("service");

                        return (
                            <div
                                key={`${filter.label}-${index}`}
                                className="border-b border-store-border pb-6 mb-4"
                            >
                                <Text className="font-bold font-helvetica leading-[24px] text-black mb-4 block text-base">
                                    {filter.label}
                                </Text>

                                {/* Brand Section */}
                                {isBrandSection ? (
                                    <ul className="space-y-2 text-sm">
                                        {brandOptions?.map((brand) => (
                                            <li
                                                key={brand.id}
                                                className="flex items-center space-x-3"
                                            >
                                                <Checkbox
                                                    id={brand.name}
                                                    checked={selectedBrands.includes(
                                                        brand.name,
                                                    )}
                                                    onCheckedChange={() =>
                                                        handleToggle(
                                                            brand.name,
                                                            "brand",
                                                        )
                                                    }
                                                    className="rounded-none border border-font-price cursor-pointer"
                                                />
                                                <label
                                                    htmlFor={brand.name}
                                                    className="text-sm font-light leading-normal font-helvetica text-black"
                                                >
                                                    {brand.name}
                                                </label>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <div className="space-y-3">
                                        {visibleOptions?.map((opt) => {
                                            let checked = false;
                                            if (isServiceSection)
                                                checked =
                                                    selectedServices.includes(
                                                        opt.label,
                                                    );
                                            else if (isBrandSection)
                                                checked =
                                                    selectedBrands.includes(
                                                        opt.label,
                                                    );
                                            else
                                                checked =
                                                    selectedStores.includes(
                                                        opt.label,
                                                    );

                                            let toggleType:
                                                | "store"
                                                | "service"
                                                | "brand";
                                            if (isServiceSection)
                                                toggleType = "service";
                                            else if (isBrandSection)
                                                toggleType = "brand";
                                            else toggleType = "store";

                                            return (
                                                <div
                                                    key={opt.value}
                                                    className="flex items-center space-x-3"
                                                >
                                                    <Checkbox
                                                        id={opt.value}
                                                        checked={checked}
                                                        onCheckedChange={() =>
                                                            handleToggle(
                                                                opt.label,
                                                                toggleType,
                                                            )
                                                        }
                                                        className="rounded-none border border-font-price cursor-pointer"
                                                    />
                                                    <label
                                                        htmlFor={opt.value}
                                                        className="text-sm font-light leading-normal font-helvetica text-black"
                                                    >
                                                        {opt.label}
                                                    </label>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}

                                {/* Show more toggle */}
                                {filter.options?.length > 3 &&
                                    !isBrandSection && (
                                        <button
                                            type="button"
                                            onClick={() =>
                                                toggleShowMore(index)
                                            }
                                            className="flex items-center text-sm font-bold text-black mt-3 cursor-pointer"
                                        >
                                            {showAll ? (
                                                <>
                                                    Show less{" "}
                                                    <ChevronUp className="ml-1 h-4 w-4" />
                                                </>
                                            ) : (
                                                <>
                                                    Show more{" "}
                                                    <ChevronDown className="ml-1 h-4 w-4" />
                                                </>
                                            )}
                                        </button>
                                    )}
                            </div>
                        );
                    })}

                    {/* Action Buttons */}
                    <div className="flex gap-3 pb-6">
                        <Button
                            type="button"
                            onClick={handleReset}
                            className="primary-button-black rounded-full flex-1"
                        >
                            Reset all
                        </Button>
                        <Button
                            type="button"
                            onClick={handleApply}
                            className="secondary-button rounded-full flex-1"
                        >
                            Apply filters
                        </Button>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
