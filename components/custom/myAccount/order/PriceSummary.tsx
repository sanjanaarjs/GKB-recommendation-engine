"use client";

import React from "react";
import Text from "@/components/generic/Text";

interface PriceSummaryRowProps {
    label: string;
    value: number | string;
    isTotal?: boolean;
}

export default function PriceSummaryRow({
    label,
    value,
    isTotal = false,
}: PriceSummaryRowProps) {
    // Extracted independent statement (SonarQube fix)
    const formattedValue = String(value).toLowerCase();
    const isFree = formattedValue === "free";
    const valueClasses = isTotal
        ? "text-base font-semibold text-black font-bold"
        : isFree
          ? "text-gray-500 font-medium font-bold"
          : "text-gray-700 font-bold";
    return (
        <div className="w-full">
            <div
                className={`flex justify-between items-center ${
                    isTotal ? "pt-4" : ""
                }`}
            >
                <Text
                    font="helvetica"
                    className={`text-base ${
                        isTotal
                            ? "text-base font-semibold text-black"
                            : "text-gray-700"
                    }`}
                >
                    {label}
                </Text>

                <Text font="helvetica" className={valueClasses}>
                    {value}
                </Text>
            </div>

            {isTotal && <div className="w-full border-t border-gray-200" />}
        </div>
    );
}
