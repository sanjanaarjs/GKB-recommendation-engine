"use client";

import React from "react";
import Text from "@/components/generic/Text";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/generic/product-card/ProductCard";
import { useQuery } from "@apollo/client";
import { GET_WISHLIST, WishlistData } from "./wishlist.api";
import ChevronLeft from "@/components/icons/ChevronLeft";
import SignOut from "@/components/icons/SignOut";
import { useRouter } from "next/navigation";
import { useWishlist } from "@/lib/hooks/useWishlist";
import { useLogout } from "@/lib/hooks/useLogout";

export default function Wishlist() {
    const { loading, data, refetch } = useQuery<WishlistData>(GET_WISHLIST, {
        fetchPolicy: "network-only",
    });

    const totalNumber = Number(data?.wishlist?.items_count) ?? 0;
    const wishlistData =
        data?.wishlist?.items?.map((item) => item.product) || [];
    // const totalCard = wishlistData.length;
    const [visibleCount, setVisibleCount] = React.useState(12);
    const [removingSkus, setRemovingSkus] = React.useState<Set<string>>(
        new Set(),
    );
    const [hidingSkus, setHidingSkus] = React.useState<Set<string>>(new Set());
    // Filter out items that have finished hiding animation
    const filteredWishlistData = wishlistData.filter(
        (product) => !removingSkus.has(product.sku),
    );
    const visibleProducts = filteredWishlistData.slice(0, visibleCount);
    const { handleLogout } = useLogout();
    const refetchTimerRef = React.useRef<NodeJS.Timeout | null>(null);

    const router = useRouter();

    const { wishlistSkuSet, handleWishlistClick } = useWishlist();

    const handleWishlistToggle = (sku: string) => {
        // Add to hiding set to trigger fade-out animation
        setHidingSkus((prev) => new Set(prev).add(sku));

        // Call without await - optimistic update happens instantly
        handleWishlistClick(sku);

        // After animation completes, remove from DOM
        setTimeout(() => {
            setRemovingSkus((prev) => new Set(prev).add(sku));
        }, 300);

        // Clear existing refetch timer
        if (refetchTimerRef.current) {
            clearTimeout(refetchTimerRef.current);
        }

        // Debounced refetch - only happens after user stops clicking
        refetchTimerRef.current = setTimeout(async () => {
            const result = await refetch();
            // Only clear states for items that are confirmed removed from server
            const serverSkus = new Set(
                result.data?.wishlist?.items?.map(
                    (item: any) => item.product.sku,
                ) || [],
            );
            setRemovingSkus((prev) => {
                const newSet = new Set(prev);
                Array.from(prev).forEach((removedSku) => {
                    if (!serverSkus.has(removedSku)) {
                        newSet.delete(removedSku);
                    }
                });
                return newSet;
            });
            setHidingSkus((prev) => {
                const newSet = new Set(prev);
                Array.from(prev).forEach((removedSku) => {
                    if (!serverSkus.has(removedSku)) {
                        newSet.delete(removedSku);
                    }
                });
                return newSet;
            });
        }, 1500);
    };

    if (loading) {
        return (
            <section className="flex h-full w-full flex-col">
                <Text
                    font="helvetica"
                    className="text-[28px] md:text-[32px] pt-10 md:pt-0"
                >
                    your wishlist
                </Text>

                <div className="w-full flex justify-center items-center my-auto">
                    <Text
                        className="text-black"
                        size="xl"
                        weight="normal"
                        font="helvetica"
                    >
                        Loading your wishlist...
                    </Text>
                </div>
            </section>
        );
    }

    return (
        <section className="flex h-full w-full flex-col">
            <div
                className="flex justify-between lg:hidden -mt-3 pb-4"
                onClick={() => {
                    router?.back();
                }}
            >
                <div className="flex items-center gap-2">
                    <ChevronLeft fill="black" size={16} />
                    <Text
                        font="helvetica"
                        size="sm"
                        weight="normal"
                        className="italic"
                    >
                        Back
                    </Text>
                </div>
                <div
                    className="flex items-center gap-2 lg:mb-0 lg:hidden"
                    onClick={handleLogout}
                >
                    <Text
                        font="helvetica"
                        size="productTitle1"
                        weight="normal"
                        className="italic"
                    >
                        Sign out
                    </Text>
                    <SignOut
                        size={24}
                        fill="#000000"
                        className="w-4 h-4 lg:w-6 lg:h-6"
                    />
                </div>
            </div>

            {/* Header */}
            <Text
                font="helvetica"
                className="text-[28px] md:text-[32px] pt-2 md:pt-0"
            >
                your wishlist
            </Text>

            {/* Wishlist wishlistData */}
            {visibleProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-1 lg:gap-6 mt-6">
                    {visibleProducts.map((product) => (
                        <div
                            key={product.sku}
                            className={`transition-all duration-300 ease-in-out ${
                                hidingSkus.has(product.sku)
                                    ? "opacity-0 scale-95 pointer-events-none"
                                    : "opacity-100 scale-100"
                            }`}
                        >
                            <ProductCard
                                title={
                                    product.categories?.[0]?.name || "Category"
                                }
                                subtitle={product.name}
                                images={[product.image?.url ?? ""]}
                                price={
                                    product.price?.regularPrice?.amount
                                        ?.value ?? 0
                                }
                                currency={
                                    product.price?.regularPrice?.amount
                                        ?.currency
                                }
                                shopNow
                                tryOn={false}
                                isWishlisted={wishlistSkuSet?.has(product.sku)}
                                sku={product.sku}
                                onWishlistClick={handleWishlistToggle}
                                url_key={product.url_key}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                // Empty state
                <div className="flex flex-col items-center justify-center text-center py-16">
                    <Text className="text-lg text-gray-600">
                        Your wishlist is empty 🕊️
                    </Text>
                </div>
            )}

            {/* CTA Button */}
            {visibleCount < totalNumber && (
                <Button
                    variant="outline"
                    onClick={() => setVisibleCount((prev) => prev + 12)}
                    className="w-[90%] md:w-fit py-5 px-8 md:px-[72px] rounded-3xl mx-auto mt-[48px] border-[2px] border-black font-semibold text-lg md:text-xl cursor-pointer"
                >
                    View More Wishlist Items
                </Button>
            )}
        </section>
    );
}
