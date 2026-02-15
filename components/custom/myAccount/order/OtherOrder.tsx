"use client";

import Image from "next/image";
import React from "react";
import Text from "@/components/generic/Text";
import BiLensIcon from "@/components/icons/BiLens";
import { OrderDetailItem } from "./datas/order.data.api";
import Link from "next/link";

export default function OtherOrders({
    otherItems,
    orderNumber,
}: Readonly<{
    otherItems: OrderDetailItem[] | undefined;
    orderNumber?: string;
}>) {
    return (
        <section className="w-full  flex flex-col  gap-8 items-start">
            {/* Left Side - Image & Order Info */}
            <div className="flex flex-col items-start gap-4 w-fit">
                <div className="">
                    <span className="flex gap-x-2 items-start">
                        <BiLensIcon />
                        <span className="flex flex-col gap-y-2">
                            <Text weight="bold" font="helvetica" size="base">
                                Other items in this order
                            </Text>

                            <Text weight="normal" size="sm">
                                Order number:{" "}
                                <span className="font-semibold text-gray-800">
                                    {orderNumber}
                                </span>
                            </Text>
                        </span>
                    </span>
                </div>
            </div>

            {/* Right Side - Product Info */}
            {otherItems?.map((item, index) => (
                <Link
                    href={`/${item?.product_url_key}`}
                    key={`${item?.product_url_key}-${index}`}
                >
                    <div className="flex flex-row  justify-between gap-x-10 w-fit px-8">
                        <div className="rounded-lg relative overflow-hidden shadow-[0_12px_24px_0_rgba(0,0,0,0.10)] w-40 h-20 bg-gray-50 flex items-center justify-center">
                            {item?.product?.thumbnail?.url && (
                                <Image
                                    src={item.product.thumbnail.url}
                                    alt={
                                        item.product.thumbnail.label ??
                                        "Sunglasses"
                                    }
                                    fill
                                    className="object-cover"
                                />
                            )}
                        </div>

                        <div className="flex flex-col gap-y-2">
                            <Text className="text-lg font-semibold text-gray-900">
                                {item?.product_name}
                            </Text>
                            <div className="flex justify-between items-center mt-2">
                                <Text className="text-base font-semibold text-gray-800">
                                    {item?.product_sale_price?.currency}{" "}
                                    {item?.product_sale_price?.value}
                                </Text>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </section>
    );
}
