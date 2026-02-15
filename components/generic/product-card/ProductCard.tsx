import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ApiColorSwatch, ProductCardProps } from "./productCard.api";
import { cn, formatPrice } from "@/lib/utils";
import Heart from "@/components/icons/Heart";
import Text from "../Text";
import Bag from "@/components/icons/Bag";
import TryOn from "@/components/icons/TryOn";
import { ColorSwatches } from "../ColorSwatches/colorSwatches";
import React from "react";

export default function ProductCard({
    title,
    subtitle,
    images,
    price,
    tag,
    thumbnailImages,
    tryOn,
    shopNow,
    tagClassName,
    recentlyViewed = false,
    colorSwatches = [],
    currency,
    ishideShopNowAtMobile,
    url_key,
    showPrice,
    sku,
    isWishlisted,
    onWishlistClick,
    isRemoving = false,
}: ProductCardProps) {
    const normalizedSwatches =
        colorSwatches?.map((swatch: ApiColorSwatch) => ({
            label: swatch.frame_color_primary,
            hex: swatch.hashcode,
            is_current: swatch.is_current,
        })) ?? [];

    const imageAltBase = title || sku || "product_image";

    let content: ReactNode;

    // 🔥 NEW: normalize & round price
    // const roundedPrice = React.useMemo(() => {
    //     if (price === null || price === undefined) return 0;

    //     // Handle string values like "2,167.86"
    //     const numericPrice =
    //         typeof price === "string" ? Number(price.replace(/,/g, "")) : price;

    //     return Math.round(numericPrice);
    // }, [price]);

    const normalizedPrice = React.useMemo(() => {
        if (price === null || price === undefined) return 0;

        return typeof price === "string"
            ? Number(price.replace(/,/g, ""))
            : price;
    }, [price]);

    if (shopNow) {
        // Shop Now section
        content = (
            <>
                {showPrice && (
                    <Text
                        as="p"
                        font="helvetica"
                        size="base"
                        color="black"
                        weight="bold"
                        className="block lg:hidden mb-3"
                    >
                        {currency} {formatPrice(normalizedPrice)}
                    </Text>
                )}

                <div
                    className={`mt-4 mb-4 lg:mb-0 lg:mt-5 bg-white lg:bg-transparent p-4 lg:px-7 lg:py-5 rounded-full flex items-center justify-between shadow-lg ${ishideShopNowAtMobile && "hidden lg:flex"}`}
                >
                    <Text
                        as="p"
                        font="helvetica"
                        size="base"
                        color="black"
                        weight="bold"
                    >
                        {currency} {formatPrice(normalizedPrice)}
                    </Text>
                    <div className="flex items-center gap-3">
                        <Bag className="text-black" size={24} />
                        <Text
                            as="p"
                            font="helvetica"
                            size="sm"
                            color="black"
                            weight="bold"
                        >
                            shop now
                        </Text>
                    </div>
                </div>
                <div className="lg:hidden w-fit">
                    <ColorSwatches colors={normalizedSwatches} />
                </div>
            </>
        );
    } else if (thumbnailImages) {
        // Homepage card
        // mobile Thumbnail version
        content = (
            <div className="mt-8 bg-white lg:bg-transparent px-6 py-[18px] rounded-full flex items-center justify-between shadow-lg">
                <Text
                    as="p"
                    font="helvetica"
                    size="lg"
                    color="black"
                    weight="bold"
                >
                    {currency} {formatPrice(normalizedPrice)}
                </Text>
                <div className="flex items-center gap-3">
                    <Bag className="text-black" size={24} />
                    <Text
                        as="p"
                        font="helvetica"
                        size="lg"
                        color="black"
                        weight="bold"
                    >
                        shop now
                    </Text>
                </div>
            </div>
        );
    } else if (recentlyViewed) {
        content = (
            <div className="flex flex-col gap-y-2">
                <Text
                    as="p"
                    font="helvetica"
                    size="xl2"
                    color="black"
                    weight="bold"
                    className="py-2 md:py-4"
                >
                    {currency} {formatPrice(normalizedPrice)}
                </Text>
                <ColorSwatches colors={normalizedSwatches} />
            </div>
        );
    } else {
        // Homepage card
        // mobile Thumbnail version
        content = (
            <div className="mt-8 bg-white lg:bg-transparent px-8 py-6 lg:p-0 rounded-full flex items-center justify-between shadow-lg lg:shadow-none">
                <Text
                    as="p"
                    font="helvetica"
                    size="xl"
                    color="black"
                    weight="bold"
                    className="leading-6"
                >
                    {currency} {formatPrice(normalizedPrice)}
                </Text>
                <div className="flex lg:hidden items-center gap-3">
                    <Bag className="text-black" size={30} />
                    <Text
                        as="p"
                        font="helvetica"
                        size="xl"
                        color="black"
                        weight="bold"
                    >
                        shop now
                    </Text>
                </div>
            </div>
        );
    }

    const sanitizedUrlKey = (url_key || "")
        .replace(/^\/+/, "")
        .replace(/\.html$/i, "");

    function renderCardContent() {
        return (
            <div className="p-4 cursor-pointer relative">
                {/* Loading overlay when removing from wishlist */}
                {isRemoving && (
                    <div className="absolute inset-0 bg-white/70 backdrop-blur-sm z-50 flex items-center justify-center rounded-lg">
                        <div className="flex flex-col items-center gap-3">
                            <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
                            <Text
                                font="helvetica"
                                size="sm"
                                weight="normal"
                                className="text-black"
                            >
                                Removing...
                            </Text>
                        </div>
                    </div>
                )}
                {tag && (
                    <Text
                        size="productTitle1"
                        weight="extrabold"
                        font="avenir"
                        className={cn("text-center", tagClassName)}
                    >
                        {tag}
                    </Text>
                )}

                {recentlyViewed && (
                    <div className="flex items-center justify-between mt-ex items-center mt-0 lg:mt-0 relative">
                        <button
                            className={`rounded-full flex items-center justify-between shadow-[0px_1px_0px_0px_#0000,0px_1px_0px_0px_#0000,0px_0px_0px_#00000000,1px_2px_0px_#0000,0px_4px_8px_3px_#00000042] gap-1 p-2`}
                        >
                            <TryOn size={24} />
                            {tryOn && (
                                <Text size="tryOn" weight="tryOn">
                                    Try them on
                                </Text>
                            )}
                        </button>
                        <button
                            className="absolute hidden lg:block cursor-pointer right-[-12px] top-[-8px] z-10"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                if (sku) {
                                    onWishlistClick?.(sku);
                                }
                            }}
                        >
                            <Heart
                                colorFill={isWishlisted ? "black" : "white"}
                            />
                        </button>
                    </div>
                )}

                <div className="group">
                    {images.length > 0 && (
                        <Image
                            src={images[0]}
                            alt={`${imageAltBase}_primary`}
                            width={800}
                            height={500}
                            className={cn(
                                "block",
                                images.length > 1 && "block group-hover:hidden",
                            )}
                        />
                    )}
                    {images.length > 1 && (
                        <Image
                            src={images[1]}
                            alt={`${imageAltBase}_secondary`}
                            width={800}
                            height={500}
                            className={cn(
                                "hidden",
                                images.length > 1 && "hidden group-hover:block",
                            )}
                        />
                    )}
                </div>
                <div className="px-3 py-0">
                    {/* homepage card */}
                    {thumbnailImages && (
                        <div className="flex lg:hidden items-center justify-center bg-white rounded-full mr-0 lg:mr-12 p-2 overflow-x-auto px-4 shadow-lg mb-6">
                            {thumbnailImages?.map((item, index) => (
                                <div
                                    key={index}
                                    className="relative flex-1 h-12"
                                >
                                    {item && (
                                        <Image
                                            src={item}
                                            alt={item}
                                            fill
                                            className="object-contain"
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {!recentlyViewed && (
                        <div className="flex items-center justify-between lg:mt-0 relative">
                            <button
                                className={`rounded-full flex items-center justify-between shadow-[0px_1px_0px_0px_#0000,0px_1px_0px_0px_#0000,0px_0px_0px_#00000000,1px_2px_0px_#0000,0px_4px_8px_3px_#00000042] gap-1 lg:ml-0 lg:mb-0 py-1 lg:py-2 ${thumbnailImages ? "px-2" : "px-1 lg:px-2"}`}
                            >
                                <TryOn size={24} />
                                {tryOn && (
                                    <Text size="tryOn" weight="tryOn">
                                        Try them on
                                    </Text>
                                )}
                            </button>
                            <button
                                className="lg:hidden cursor-pointer mt-1 translate-x-2.5"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    if (sku) {
                                        onWishlistClick?.(sku);
                                    }
                                }}
                            >
                                <Heart
                                    size={56}
                                    colorFill={isWishlisted ? "black" : "white"}
                                />
                            </button>
                            <button
                                className="absolute hidden lg:block cursor-pointer right-[-12px] top-[-8px] z-10"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    if (sku) {
                                        onWishlistClick?.(sku);
                                    }
                                }}
                            >
                                <Heart
                                    colorFill={isWishlisted ? "black" : "white"}
                                />
                            </button>
                        </div>
                    )}

                    {recentlyViewed ? (
                        <div className="flex items-start pt-8 flex-col">
                            <div>
                                <Text
                                    as="h5"
                                    font="avenir"
                                    size="productTitle"
                                    color="black"
                                    weight="extrabold"
                                >
                                    {title}
                                </Text>
                                <Text
                                    as="p"
                                    font="helvetica"
                                    size="productTitle"
                                    color="black"
                                    weight="light"
                                >
                                    {subtitle}
                                </Text>
                            </div>
                            <div className="lg:flex items-center gap-2 hidden">
                                {!recentlyViewed && (
                                    <ColorSwatches
                                        colors={normalizedSwatches}
                                    />
                                )}
                                {/* <button className="border-black border rounded-full p-0.5">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="25"
                                    viewBox="0 0 24 25"
                                    fill="none"
                                >
                                    <circle
                                        cx="12"
                                        cy="12.5"
                                        r="12"
                                        fill="url(#paint0_linear_1659_473)"
                                    />
                                    <defs>
                                        <linearGradient
                                            id="paint0_linear_1659_473"
                                            x1="12"
                                            y1="0.5"
                                            x2="12"
                                            y2="24.5"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#201613" />
                                            <stop offset="1" stopColor="#DED8D4" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </button>
                            <button className="border-transparent border rounded-full p-0.5">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="25"
                                    viewBox="0 0 24 25"
                                    fill="none"
                                >
                                    <ellipse
                                        cx="12"
                                        cy="12.5"
                                        rx="12"
                                        ry="12.5"
                                        fill="url(#paint0_linear_1659_475)"
                                    />
                                    <defs>
                                        <linearGradient
                                            id="paint0_linear_1659_475"
                                            x1="12"
                                            y1="0"
                                            x2="12"
                                            y2="25"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#8F9098" />
                                            <stop offset="1" stopColor="#585A77" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </button>
                            <button className="border-transparent border rounded-full p-0.5">
                                <svg width="24" height="26" viewBox="0 0 24 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <ellipse cx="12" cy="13" rx="12" ry="12.5" fill="#353535"/>
                                </svg>
                            </button> */}
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-start flex-col lg:flex-row lg:items-center lg:justify-between p6 gap-12 mb-1 lg:mb-0">
                            <div>
                                <Text
                                    as="h5"
                                    font="avenir"
                                    size="productTitle1"
                                    color="black"
                                    weight="extrabold"
                                    className="mb-2 mt-6"
                                >
                                    {title}
                                </Text>
                                <Text
                                    as="p"
                                    font="helvetica"
                                    size="productTitle2"
                                    color="black"
                                    weight="light"
                                    className="line-clamp-2"
                                >
                                    {subtitle}
                                </Text>
                            </div>
                            <div className="lg:flex items-center gap-2 hidden">
                                <ColorSwatches colors={normalizedSwatches} />
                                {/* <button className="border-black border rounded-full p-0.5">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="25"
                                    viewBox="0 0 24 25"
                                    fill="none"
                                >
                                    <circle
                                        cx="12"
                                        cy="12.5"
                                        r="12"
                                        fill="url(#paint0_linear_1659_473)"
                                    />
                                    <defs>
                                        <linearGradient
                                            id="paint0_linear_1659_473"
                                            x1="12"
                                            y1="0.5"
                                            x2="12"
                                            y2="24.5"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#201613" />
                                            <stop offset="1" stopColor="#DED8D4" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </button>
                            <button className="border-transparent border rounded-full p-0.5">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="25"
                                    viewBox="0 0 24 25"
                                    fill="none"
                                >
                                    <ellipse
                                        cx="12"
                                        cy="12.5"
                                        rx="12"
                                        ry="12.5"
                                        fill="url(#paint0_linear_1659_475)"
                                    />
                                    <defs>
                                        <linearGradient
                                            id="paint0_linear_1659_475"
                                            x1="12"
                                            y1="0"
                                            x2="12"
                                            y2="25"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="#8F9098" />
                                            <stop offset="1" stopColor="#585A77" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </button>
                            <button className="border-transparent border rounded-full p-0.5">
                                <svg width="24" height="26" viewBox="0 0 24 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <ellipse cx="12" cy="13" rx="12" ry="12.5" fill="#353535"/>
                                </svg>
                            </button> */}
                            </div>
                        </div>
                    )}
                    <div>{content}</div>
                </div>
            </div>
        );
    }

    if (sanitizedUrlKey) {
        return <Link href={`/${sanitizedUrlKey}`}>{renderCardContent()}</Link>;
    }

    return renderCardContent();
}
