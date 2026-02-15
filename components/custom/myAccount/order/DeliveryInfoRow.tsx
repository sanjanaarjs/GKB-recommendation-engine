"use client";

import React from "react";
import Text from "@/components/generic/Text";

interface DeliveryInfoRowProps {
    label: string;
    value: string;
}

export default function DeliveryInfoRow({
    label,
    value,
}: DeliveryInfoRowProps) {
    return (
        <div className="w-full">
            {/* Row */}
            <div className="flex justify-between items-center py-3">
                <Text font="helvetica" className="text-sm text-gray-800">
                    {label}
                </Text>
                <Text
                    font="helvetica"
                    className="text-sm text-gray-500 font-medium"
                >
                    {value}
                </Text>
            </div>

            {/* Divider */}
            <div className="w-full border-t border-gray-200" />
        </div>
    );
}
