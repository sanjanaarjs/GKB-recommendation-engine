"use client";

import React from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import Text from "@/components/generic/Text";
import { OrderCardProps } from "./datas/types";
import TruckDelivery from "@/components/icons/TruckDelivery";

const OrderCard: React.FC<OrderCardProps> = ({
    arrivalDate,
    status,
    productName,
    productDesc,
    productImage,
    productQuantity,
    onClickOrderDetails,
}) => {
    const isCancelled =
        status?.toLowerCase() === "canceled" ||
        status?.toLowerCase() === "cancelled";

    return (
        <div
            className="bg-white  shadow-md overflow-hidden border border-gray-200 rounded-md cursor-pointer"
            role="button"
            onClick={onClickOrderDetails}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault(); // prevent page scroll on Space
                    onClickOrderDetails();
                }
            }}
        >
            {/* Top Bar */}
            <div
                className={`flex justify-between items-start md:items-center ${isCancelled ? "bg-[#c734341a]" : "bg-order-card-topBar"} text-white px-6 py-4 md:px-6 md:py-4`}
            >
                <div>
                    <div className="flex gap-x-4 items-start">
                        <TruckDelivery size={24} />
                        <div>
                            <Text
                                className="font-semibold leading-6 text-[14px] md:text-base"
                                color="fontMain"
                            >
                                Arriving by {arrivalDate}
                            </Text>
                            <Text
                                font="helvetica"
                                size="productTitle4"
                                weight="normal"
                                className="mt-1 md:mt-0"
                                color="fontMain"
                            >
                                {status}
                            </Text>
                        </div>
                    </div>
                </div>
                <button className="cursor-pointer">
                    <ChevronRight className="w-5 h-5" color="#000" />
                </button>
            </div>

            {/* Product Info */}
            <div className="flex items-center gap-4 py-4 px-6 lg:p-4 w-fit relative">
                <div className="relative flex flex-col md:gap-y-2">
                    <div className="w-[90px] h-[50px] md:w-fit md:h-fit">
                        {productImage && (
                            <Image
                                src={productImage}
                                alt={productName}
                                width={124}
                                height={124}
                                className="object-contain w-[90px] h-[50px] md:w-fit md:h-fit"
                            />
                        )}
                    </div>

                    <div className="bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center text-sm text-black font-helvetica font-normal self-end">
                        x{productQuantity}
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex-1 max-w-full flex flex-col gap-y-2">
                        <Text className="font-semibold text-sm md:text-base text-black">
                            {productName}
                        </Text>
                        <Text className="text-black text-sm md:text-base font-light">
                            {productDesc}
                        </Text>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderCard;
