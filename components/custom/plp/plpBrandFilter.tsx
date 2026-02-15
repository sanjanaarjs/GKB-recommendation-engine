"use client";

import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import Text from "@/components/generic/Text";

interface BrandOption {
    brand?: string;
    brand_name?: string;
    name?: string;
    thumbnail?: string;
    isPopular?: boolean;
    brand_image?: string;
    value?: string | undefined;
    label?: string;
}

type FilterValues = string[] | { from: string; to: string };
interface BrandFilterProps {
    options: BrandOption[];
    selectedFilters: Record<string, FilterValues>;
    handleCheckboxChange: (
        attr: string,
        value: string | number | undefined,
        checked: boolean,
    ) => void;
    attributeCode: string; // usually "brand"
}

export default function BrandFilter({
    options,
    selectedFilters,
    handleCheckboxChange,
    attributeCode,
}: BrandFilterProps) {
    const popularBrands = options?.filter((opt) => opt.isPopular) || [];
    const otherBrands = options?.filter((opt) => !opt.isPopular) || [];

    return (
        <div className="space-y-6">
            {/* Popular Brands */}
            {popularBrands.length > 0 && (
                <div>
                    <h3 className="mb-3 font-semibold text-sm">
                        Popular brands
                    </h3>
                    <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(180px,1fr))]">
                        {popularBrands.map((opt) => {
                            const value = selectedFilters[attributeCode];
                            const isChecked =
                                Array.isArray(value) &&
                                value.includes(opt.value ?? "");

                            const id = `popular-brand-${opt.value}`;

                            return (
                                <div key={opt.value}>
                                    <Checkbox
                                        id={id}
                                        checked={isChecked}
                                        onCheckedChange={(checked) =>
                                            handleCheckboxChange(
                                                attributeCode,
                                                opt.value,
                                                Boolean(checked),
                                            )
                                        }
                                        className="peer sr-only"
                                    />
                                    <Label
                                        htmlFor={id}
                                        className={`cursor-pointer py-[10px] px-5 rounded-full border text-base transition justify-center h-10
                      ${
                          isChecked
                              ? "border-black bg-white"
                              : "border-gray-300"
                      }`}
                                    >
                                        {opt.thumbnail ? (
                                            <Image
                                                src={opt.thumbnail}
                                                alt={
                                                    opt.name ??
                                                    "option thumbnail"
                                                }
                                                width={80}
                                                height={24}
                                                className="object-contain"
                                            />
                                        ) : (
                                            opt.name
                                        )}
                                    </Label>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Other Brands */}
            {otherBrands.length > 0 && (
                <div>
                    <h3 className="mb-3 font-semibold text-sm">All brands</h3>
                    <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(180px,1fr))]">
                        {otherBrands.map((opt) => {
                            const value = selectedFilters[attributeCode];
                            const isChecked =
                                Array.isArray(value) &&
                                value.includes(opt.value ?? "");

                            const id = `brand-${opt.value}`;

                            return (
                                <div key={opt.value}>
                                    <Checkbox
                                        id={id}
                                        checked={isChecked}
                                        onCheckedChange={(checked) =>
                                            handleCheckboxChange(
                                                attributeCode,
                                                opt.value,
                                                Boolean(checked),
                                            )
                                        }
                                        className="peer sr-only"
                                    />
                                    <Label
                                        htmlFor={id}
                                        className={`cursor-pointer py-[10px] px-5 rounded-full border text-base transition
                      ${
                          isChecked
                              ? "border-black text-white"
                              : "border-gray-300"
                      }`}
                                    >
                                        <Text size="base" weight="normal">
                                            {opt.label}
                                        </Text>
                                    </Label>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
