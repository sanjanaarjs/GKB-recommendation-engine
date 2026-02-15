"use client";

import { ProductItem } from "./datas/giftCardPdp.api";
import Image from "next/image";

interface GiftCardPageWrapperProps {
    giftcardData: ProductItem | undefined;
}

export default function BrandSlider({
    giftcardData,
}: GiftCardPageWrapperProps) {
    const slides = [
        { name: "GKB OPTICALS", color: "#00A0DC" },
        { name: "GKB OPTICALS", color: "#000000" },
        { name: "GKB OPTICALS", color: "#808080" },
    ];

    return (
        <div className="flex flex-col justify-center items-center my-[17px] text-center mx-[75px]">
            {giftcardData?.small_image?.url && (
                <Image
                    src={giftcardData?.small_image?.url}
                    alt="Gift Card Banner"
                    width={1307}
                    height={873}
                    className="w-full h-auto lg:h-full object-cover"
                />
            )}
        </div>
    );
}
