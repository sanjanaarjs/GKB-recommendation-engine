"use client";

import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import { getCustomerWishlistId } from "../services/magento/wishlist/getWishlistId_graphql";
import { addProductsToWishlist } from "../services/magento/wishlist/addProductToWishlist_graphql";
import {
    getWishlist,
    WishlistQueryResult,
} from "../services/magento/wishlist/customerWishlist_graphql";
import { useAppDispatch, useAppSelector } from "@/lib/store/hook";
import { setCustomerWishlistData } from "@/lib/store/features/wishlistSlice";
import { useAuth } from "../context/AuthContext";
import { hasCookie } from "../cookie";
import { removeProductsFromWishlist } from "../services/magento/wishlist/removeProductFromWishlist_graphql";

const CACHE_KEY = "wishlistCache";
const CACHE_DURATION = 5 * 60 * 1000; // 5 mins

type WishlistItem = NonNullable<
    WishlistQueryResult["wishlist"]
>["items"][number];

export function useWishlist() {
    const [wishlistData, setWishlistData] = useState<string[]>([]); // just SKUs
    // const [lastFetched, setLastFetched] = useState(0);
    const reconcileTimerRef = useRef<NodeJS.Timeout | null>(null);
    const dispatch = useAppDispatch();
    const { customerWishlistData } = useAppSelector(
        (state) => state.wishlistSlice,
    );
    const { setAuthOpen } = useAuth();

    // useMemo ensures it only recomputes when wishlistData changes
    const wishlistSkuSet = useMemo(() => new Set(wishlistData), [wishlistData]);

    // Load cache on mount
    useEffect(() => {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
            try {
                const parsed = JSON.parse(cached);
                const isValid = Date.now() - parsed.timestamp < CACHE_DURATION;
                if (isValid) {
                    setWishlistData(parsed.data || []);
                    // setLastFetched(parsed.timestamp);
                } else {
                    localStorage.removeItem(CACHE_KEY);
                }
            } catch (e) {
                console.error("Invalid cache data:", e);
            }
        }
    }, []);

    // 🧹 Clear wishlist if user is logged out
    useEffect(() => {
        const clearIfLoggedOut = async () => {
            const token = await hasCookie("userToken");

            if (!token) {
                // Clear all local wishlist data
                localStorage.removeItem(CACHE_KEY);
                setWishlistData([]);
                dispatch(
                    setCustomerWishlistData({
                        wishlist: {
                            name: "Customer Wishlist",
                            items_count: 0,
                            items: [],
                        },
                    }),
                );
                console.log("User logged out → wishlist cache cleared");
            }
        };

        clearIfLoggedOut();
    }, [dispatch]);

    useEffect(() => {
        const items = customerWishlistData?.wishlist?.items;
        if (!items || items.length === 0) return;

        const skus = items
            .map((item) => item.product?.sku)
            .filter((sku): sku is string => Boolean(sku));

        if (skus.length > 0) {
            setCachedData(skus);
        }
    }, [customerWishlistData]);

    //  Helper: Save cache
    const setCachedData = useCallback((data: string[]) => {
        setWishlistData(data);
        localStorage.setItem(
            CACHE_KEY,
            JSON.stringify({
                data,
                timestamp: Date.now(),
            }),
        );
        // setLastFetched(Date.now());
    }, []);

    //  Helper: Invalidate cache
    const invalidateCache = useCallback(() => {
        localStorage.removeItem(CACHE_KEY);
        console.warn("Cache invalidated, keeping current state until sync");
        // setLastFetched(0);
    }, []);

    //  Reconcile wishlist with server (sync)
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
                // 🆕
                setCachedData(serverSkus); // 🆕
            } else {
                console.warn("Empty wishlist from server; keeping local cache"); // 🆕
            }

            dispatch(
                setCustomerWishlistData({
                    wishlist: {
                        name: "Customer Wishlist",
                        items_count: serverItems.length,
                        items: serverItems,
                    },
                }),
            );
        } catch (err) {
            console.error("Reconcile failed:", err);
        }
    }, [dispatch, setCachedData]);

    //  Debounced reconcile
    const scheduleReconcile = useCallback(() => {
        if (reconcileTimerRef.current) clearTimeout(reconcileTimerRef.current);
        reconcileTimerRef.current = setTimeout(() => {
            fetchAndSyncWishlist();
        }, 1000); // wait 1s to avoid rapid API calls
    }, [fetchAndSyncWishlist]);

    // Handle add-to-wishlist
    const handleWishlistClick = useCallback(
        async (sku: string | undefined) => {
            if (!sku) return;

            const token = await hasCookie("userToken");

            if (!token) {
                console.warn("User not logged in, cannot add wishlist");
                setAuthOpen(true);
                return;
            }

            // Check if already in wishlist using wishlistSkuSet
            const isInWishlist = wishlistSkuSet.has(sku);

            // Optimistic update
            // const optimistic = [...wishlistData, sku];

            const optimistic = isInWishlist
                ? wishlistData.filter((s) => s !== sku) // remove
                : [...wishlistData, sku];

            setCachedData(optimistic);

            dispatch(
                setCustomerWishlistData({
                    wishlist: {
                        name: "Customer Wishlist",
                        items_count: optimistic.length,
                        items: optimistic.map((sku) => ({
                            id: sku,
                            product: { sku },
                        })),
                    },
                }),
            );
            try {
                const wishlistId = await getCustomerWishlistId();
                if (!wishlistId) throw new Error("No wishlist id found");

                if (isInWishlist) {
                    // Fetch fresh data to get current item IDs for removal
                    const freshData = await getWishlist();
                    const freshItems = freshData?.wishlist?.items ?? [];

                    const existingItem = freshItems?.find(
                        (item: WishlistItem) => item.product?.sku === sku,
                    );

                    if (!existingItem?.id) {
                        console.warn(
                            "Wishlist item id not found for SKU:",
                            sku,
                        );
                        await fetchAndSyncWishlist(); // fallback sync if not found
                        return;
                    }

                    await removeProductsFromWishlist(
                        String(wishlistId),
                        [String(existingItem.id)], // send item_id (NOT sku)
                    );
                } else {
                    await addProductsToWishlist(Number(wishlistId), sku);
                }
                scheduleReconcile();
            } catch (err) {
                console.error("Failed to add wishlist:", sku, err);

                // Rollback
                setWishlistData((prev) => prev.filter((s) => s !== sku));
                invalidateCache();
                scheduleReconcile();
            }
        },
        [
            wishlistData,
            wishlistSkuSet,
            customerWishlistData,
            setCachedData,
            scheduleReconcile,
            invalidateCache,
            dispatch,
            setAuthOpen,
            fetchAndSyncWishlist,
        ],
    );

    return {
        wishlistData,
        wishlistSkuSet,
        handleWishlistClick,
        scheduleReconcile,
        fetchAndSyncWishlist,
    };
}
