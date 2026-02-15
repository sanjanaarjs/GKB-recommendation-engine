"use client";

import AboutCards from "./aboutCards";
import CardBalance from "./cardBalance";
import { ProductItem } from "./datas/giftCardPdp.api";
import GiftCardBanner from "./giftCardBanner";

interface GiftCardPageWrapperProps {
    giftcardData: ProductItem | undefined;
}

export default function GiftCardPageWrapper({
    giftcardData,
}: GiftCardPageWrapperProps) {
    return (
        <div>
            <GiftCardBanner giftcardData={giftcardData} />
            <CardBalance />
            <AboutCards />
        </div>
    );
}
