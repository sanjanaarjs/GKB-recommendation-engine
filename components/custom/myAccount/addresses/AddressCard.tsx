"use client";

import { User, Phone, Edit, Trash } from "lucide-react";
import { AddressCardProps } from "./type";
import Text from "@/components/generic/Text";

export default function AddressCard({
    address,
    onEdit,
    onDelete,
}: AddressCardProps) {
    const {
        id,
        firstname,
        lastname,
        telephone,
        default_billing,
        default_shipping,
        street,
        city,
        postcode,
    } = address;
    const name = `${firstname ?? ""} ${lastname ?? ""}`;
    console.log(address, "address !!");
    const addStr = `${street?.[0] ?? ""}  ${street?.[1] ?? ""} ${city}  - ${postcode}`;

    return (
        <div className="grid grid-cols-2 auto-rows-auto gap-4 p-6 bg-white rounded-lg border border-gray-200 w-full sm:max-w-md shadow-[0_6px_24px_0_rgba(0,0,0,0.10)]">
            {/* Address Section */}
            <div className="col-span-2">
                <Text
                    className="leading-relaxed whitespace-pre-line font-light"
                    size="base"
                    font="helvetica"
                    weight="light"
                >
                    {addStr}
                </Text>
            </div>

            {/* Name & Phone */}
            <div className="flex items-center gap-2 text-gray-700 text-sm">
                <User size={16} className="text-gray-500" />
                <Text weight="light" font="helvetica" className="font-light">
                    {name}
                </Text>
            </div>

            <div className="flex items-center gap-2 text-gray-700 text-sm justify-end">
                <Phone size={16} className="text-gray-500" />
                <Text weight="light" font="helvetica" className="font-light">
                    {telephone}
                </Text>
            </div>

            {/* Default Tag */}
            <div className="col-span-2">
                {(default_billing || default_shipping) && (
                    <button className="px-3 py-1 text-xs border border-gray-300 rounded bg-gray-50">
                        Default
                    </button>
                )}
            </div>

            {/* Divider */}
            <div className="col-span-2 border-t border-gray-200 my-2"></div>

            {/* Actions */}
            <div className="col-span-2 flex justify-between text-sm text-gray-700">
                <button
                    onClick={onEdit}
                    className="flex items-center gap-2 hover:text-black cursor-pointer"
                >
                    <Edit size={16} className="text-gray-500" />
                    <Text weight="bold" className="italic" font="helvetica">
                        Edit
                    </Text>
                </button>
                <button
                    onClick={() => {
                        if (id) {
                            onDelete?.(`${id}`);
                        }
                    }}
                    className="flex items-center gap-2 hover:text-black cursor-pointer"
                >
                    <Trash size={16} className="text-gray-500" />
                    <Text font="helvetica" weight="bold" className="italic">
                        Delete
                    </Text>
                </button>
            </div>
        </div>
    );
}
