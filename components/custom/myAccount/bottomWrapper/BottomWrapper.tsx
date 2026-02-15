"use client";

import React from "react";
import { usePathname } from "next/navigation";
import TryFramesSection from "../order/TryFrameSection";
import GlassExplore from "../wishlist/GlassExplore";
import RecentProducts from "../../pdp/recentProducts";

export default function BottomWrapper() {
    const pathname = usePathname();

    const isOrderPage = pathname?.includes("/order");
    const isWishlistPage = pathname?.includes("/wishlist");

    return (
        <div className="w-full mx-auto">
            {isOrderPage && (
                <>
                    <RecentProducts />
                    <TryFramesSection className="lg:pt-[168px] lg:pb-[141px] md:mx-auto flex items-center" />
                </>
            )}
            {isWishlistPage && <GlassExplore />}
        </div>
    );
}
