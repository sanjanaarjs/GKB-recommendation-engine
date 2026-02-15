"use client";

import Image from "next/image";
import Text from "@/components/generic/Text";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";

export default function OrderBanner({
    thumbnailUrl,
    product_name,
    product_sale_price,
}: Readonly<{
    thumbnailUrl: string;
    product_name: string;
    product_sale_price: { currency: string; value: number };
}>) {
    const currency = useSelector(
        (state: RootState) => state.currency.currencySymbol,
    );
    return (
        <div className="flex flex-col">
            <div className="relative w-full h-[437px] overflow-hidden shadow-md px-10 hidden lg:block">
                {/* Background image */}
                <Image
                    src={thumbnailUrl || "/images/order-banner-placeholder.png"}
                    alt="Order banner"
                    fill
                    priority
                    className="object-contain"
                />

                {/* Optional gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-0" />
            </div>

            <div className="relative w-full h-[367px] overflow-hidden shadow-md px-10 lg:hidden">
                {/* Background image */}
                <Image
                    src={thumbnailUrl || "/images/order-banner-placeholder.png"}
                    alt="Order banner"
                    fill
                    priority
                    className="object-contain"
                />

                {/* Optional gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-0" />
            </div>

            <div className="w-full flex justify-between pt-6 pb-4 md:px-0">
                <span className="flex flex-col gap-y-2">
                    <Text
                        font="helvetica"
                        className="text-base"
                        weight="extrabold"
                    >
                        Rayban
                    </Text>
                    <Text font="helvetica" className="text-base" weight="light">
                        {product_name}
                    </Text>
                </span>
                <span>
                    <Text
                        font="helvetica"
                        className="text-base"
                        weight="extrabold"
                    >
                        {/* {product_sale_price?.currency}{" "} */}
                        {currency}
                        {product_sale_price?.value}
                    </Text>
                </span>
            </div>
        </div>
    );
}
