"use client";

import React from "react";
import Text from "@/components/generic/Text";
import { Mail, MapPin } from "lucide-react";
import { ShippingAddress } from "./datas/order.data.api";

export default function ShippingSection({
    shippingAddress,
    email,
}: Readonly<{ shippingAddress: ShippingAddress | undefined; email?: string }>) {
    return (
        <section className="w-full">
            <span className="flex  gap-x-2">
                <MapPin />
                <span>
                    <Text weight="bold" size="base" font="helvetica">
                        Ship to:
                    </Text>
                    <span>
                        <Text
                            font="helvetica"
                            weight="extrabold"
                            size="base"
                            className="mt-4"
                        >
                            {shippingAddress?.firstname}{" "}
                            {shippingAddress?.lastname}
                        </Text>
                        <Text
                            font="helvetica"
                            weight="light"
                            size="base"
                            className="mt-2"
                        >
                            {shippingAddress?.street?.join(", ")}
                        </Text>
                        <Text
                            font="helvetica"
                            weight="light"
                            size="base"
                            className=""
                        >
                            {" "}
                            {shippingAddress?.city}, {shippingAddress?.region},{" "}
                            {shippingAddress?.country_code}
                        </Text>
                        <Text
                            font="helvetica"
                            weight="light"
                            size="base"
                            className=""
                        >
                            {shippingAddress?.postcode}{" "}
                        </Text>
                    </span>
                </span>
            </span>

            <span className="flex  gap-x-2 mt-8">
                <Mail />
                <span>
                    <Text weight="bold" size="base" font="helvetica">
                        Shared shipping updates:
                    </Text>
                    <Text
                        font="helvetica"
                        weight="light"
                        size="base"
                        className=""
                    >
                        {email}
                    </Text>
                </span>
            </span>
        </section>
    );
}
