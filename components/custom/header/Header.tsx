"use client";

import AnnouncementBar from "./AnnouncementBar";
import MenuBar from "./MenuBar";
import Login from "./login/login";
import { StoreConfigResponse } from "./search/SearchLabel.api";
import { ExploreQueryResponse } from "./menu/datas/explore.data.api";
import { BrandCategoriesResponse } from "./menu/datas/featureBrand.data.api";
import { CategoriesResponse } from "./menu/datas/menu.api";
import { useAuth } from "@/lib/context/AuthContext";
import { useAppDispatch } from "@/lib/store/hook";
import { useCallback, useEffect, useState } from "react";
import {
    getWishlist,
    WishlistQueryResult,
} from "@/lib/services/magento/wishlist/customerWishlist_graphql";
import { setCustomerWishlistData } from "@/lib/store/features/wishlistSlice";
import { getCookieValue, hasCookie } from "@/lib/cookie";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import { fetchCart } from "@/lib/store/cartSlice";

export default function Header({
    announcementsData,
    announcements,
    storeConfigData,
    exploreCategories,
    brandCategories,
    categories,
}: {
    announcementsData: {
        name: string;
        link: string;
        buttontext: string;
        attachment: string;
    }[];
    announcements: { description: string; ctaHyperlink: string }[];
    storeConfigData: StoreConfigResponse["storeConfig"] | null;
    exploreCategories: ExploreQueryResponse["getSearchSection"] | null;
    brandCategories: BrandCategoriesResponse["getBrandCategories"] | null;
    categories: CategoriesResponse["categories"] | null;
}) {
    const { authOpen, setAuthOpen } = useAuth();
    const dispatch = useAppDispatch();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Fetch and sync wishlist when user is logged in
    const fetchAndSyncWishlist = useCallback(async () => {
        try {
            const data = await getWishlist();
            const serverItems = data?.wishlist?.items ?? [];

            const serverSkus = serverItems
                .map(
                    (
                        item: NonNullable<
                            WishlistQueryResult["wishlist"]
                        >["items"][number],
                    ) => item.product?.sku,
                )
                .filter(Boolean);

            if (serverSkus.length > 0) {
                console.log(" Wishlist fetched:", serverSkus);
            } else {
                console.warn("Empty wishlist from server");
            }

            dispatch(
                setCustomerWishlistData({
                    wishlist: {
                        items_count: serverItems.length,
                        name: data?.wishlist?.name || "Customer Wishlist",
                        items: serverItems,
                    },
                }),
            );
        } catch (err) {
            console.error(" Wishlist fetch failed:", err);
        }
    }, [dispatch]);

    useEffect(() => {
        // When login popup closes, check if we now have a token and sync
        const refetchIfJustLoggedIn = async () => {
            if (!authOpen) {
                const token = await hasCookie("userToken");
                if (token) {
                    await fetchAndSyncWishlist(); // this dispatches setCustomerWishlistData
                }
            }
        };
        refetchIfJustLoggedIn();
    }, [authOpen, fetchAndSyncWishlist]);

    useEffect(() => {
        (async () => {
            const token = await getCookieValue("userToken");
            if (token) {
                setIsLoggedIn(true);
            }
        })();
    }, []);

    // Sync isLoggedIn when authOpen changes (after login/logout)
    useEffect(() => {
        if (!authOpen) {
            // Re-check login status when auth modal closes
            (async () => {
                const token = await getCookieValue("userToken");
                setIsLoggedIn(!!token);
            })();
        }
    }, [authOpen]);

    // cart data
    const { cartData, status } = useSelector((state: RootState) => state.cart);

    useEffect(() => {
        (async () => {
            const token = await getCookieValue("userToken");
            const paymentProcessed =
                typeof window !== "undefined" &&
                localStorage.getItem("PAYMENT_PROCESSED") === "true";
            if (token && !paymentProcessed) {
                dispatch(fetchCart());
            }
        })();
    }, [isLoggedIn, dispatch]);

    return (
        <div className="z-50 static top-0">
            <AnnouncementBar
                announcementsData={announcementsData}
                announcements={announcements}
            />
            <MenuBar
                setIsLoginPopup={setAuthOpen}
                storeConfigData={storeConfigData}
                exploreCategories={exploreCategories}
                brandCategories={brandCategories}
                categories={categories}
                isLoggedIn={isLoggedIn}
                cartData={cartData}
                announcementsData={announcementsData}
            />
            {authOpen && (
                <Login
                    isLoginPopup={authOpen}
                    setIsLoginPopup={setAuthOpen}
                    setIsLoggedIn={setIsLoggedIn}
                />
            )}
        </div>
    );
}
