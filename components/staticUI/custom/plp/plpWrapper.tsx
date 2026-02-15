"use client";

import ProductCard from "@/components/generic/product-card/ProductCard";
import { GridItem } from "@/components/generic/product-card/productCard.api";
import Text from "@/components/generic/Text";
import Sort from "@/components/icons/Sort";
import Image from "next/image";
import { useState } from "react";
import { SheetDemo } from "./plpFilter";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";

export default function PlpWrapper() {
    const [active, setActive] = useState("women");

    const categories = [
        { label: "All Sunglasses", value: "all" },
        { label: "Men", value: "men" },
        { label: "Women", value: "women" },
        { label: "Kids", value: "kids" },
        { label: "Bestsellers", value: "bestsellers" },
        { label: "New Arrivals", value: "new" },
    ];

    const items: GridItem[] = [
        {
            type: "product",
            tag: "New",
            title: "Michael Kors",
            subtitle: "Clear Cat Eye",
            images: [
                "/images/home/best-seller/spec1.png",
                "/images/home/best-seller/spec2.png",
            ],
            price: 13990,
            tryOn: false,
            shopNow: true,
        },
        {
            type: "product",
            tag: "New",
            title: "Michael Kors",
            subtitle: "Clear Cat Eye",
            images: [
                "/images/home/best-seller/spec1.png",
                "/images/home/best-seller/spec2.png",
            ],
            price: 13990,
            tryOn: false,
            shopNow: true,
        },
        {
            type: "product",
            tag: "New",
            title: "Michael Kors",
            subtitle: "Clear Cat Eye",
            images: [
                "/images/home/best-seller/spec1.png",
                "/images/home/best-seller/spec2.png",
            ],
            price: 13990,
            tryOn: false,
            shopNow: true,
        },
        {
            type: "product",
            tag: "New",
            title: "Michael Kors",
            subtitle: "Clear Cat Eye",
            images: [
                "/images/home/best-seller/spec1.png",
                "/images/home/best-seller/spec2.png",
            ],
            price: 13990,
            tryOn: false,
            shopNow: true,
        },
        // {
        //     type: "image",
        //     src: "/images/plp/plp_banner.png",
        //     mobileSrc: "/images/plp/plp_mobile_banner.png",
        //     alt: "plp_banner",
        //     large: true,
        // },
        {
            type: "product",
            tag: "New",
            title: "Michael Kors",
            subtitle: "Clear Cat Eye",
            images: [
                "/images/home/best-seller/spec1.png",
                "/images/home/best-seller/spec2.png",
            ],
            price: 13990,
            tryOn: false,
            shopNow: true,
        },
        {
            type: "product",
            tag: "New",
            title: "Michael Kors",
            subtitle: "Clear Cat Eye",
            images: [
                "/images/home/best-seller/spec1.png",
                "/images/home/best-seller/spec2.png",
            ],
            price: 13990,
            tryOn: false,
            shopNow: true,
        },
        {
            type: "product",
            tag: "New",
            title: "Michael Kors",
            subtitle: "Clear Cat Eye",
            images: [
                "/images/home/best-seller/spec1.png",
                "/images/home/best-seller/spec2.png",
            ],
            price: 13990,
            tryOn: false,
            shopNow: true,
        },
        // {
        //     type: "image",
        //     src: "/images/plp/plp_banner_mini.png",
        //     mobileSrc: "/images/plp/plp_mobile_banner.png",
        //     alt: "plp_banner_mini",
        //     large: false,
        // },
        {
            type: "product",
            tag: "New",
            title: "Michael Kors",
            subtitle: "Clear Cat Eye",
            images: [
                "/images/home/best-seller/spec1.png",
                "/images/home/best-seller/spec2.png",
            ],
            price: 13990,
            tryOn: false,
            shopNow: true,
        },
        {
            type: "product",
            tag: "New",
            title: "Michael Kors",
            subtitle: "Clear Cat Eye",
            images: [
                "/images/home/best-seller/spec1.png",
                "/images/home/best-seller/spec2.png",
            ],
            price: 13990,
            tryOn: false,
            shopNow: true,
        },
    ];

    return (
        <>
            <div className="bg-background-grey py-6 px-10 lg:pt-15 lg:pb-16 lg:px-20">
                <Text className="text-base pb-6 lg:pb-4">
                    Home / Sunglasses / Women’s Sunglasses
                </Text>
                <Text
                    as="h2"
                    className="text-[28px] lg:text-5xl pb-6 lg:pb-[179px]"
                >
                    Women’s Sunglasses (247)
                </Text>
                <div className="flex justify-between flex-col lg:flex-row items-center gap-12">
                    <div className="overflow-x-auto lg:overflow-x-visible w-full">
                        <div className="flex gap-4 py-6 md:flex-wrap">
                            {categories.map((item) => (
                                <button
                                    key={item.value}
                                    onClick={() => setActive(item.value)}
                                    className={`px-8 py-2 rounded-full border border-black text-sm font-medium transition cursor-pointer h-full whitespace-nowrap
                    ${
                        active === item.value
                            ? "bg-black text-white"
                            : "bg-white text-black hover:bg-gray-100"
                    }`}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-between lg:justify-end w-full items-center md:flex-1">
                        <div className="flex gap-4 lg:hidden">
                            <Sort />
                            <Sort />
                        </div>
                        <div
                            className="px-8 py-2 rounded-full border border-black text-sm font-medium cursor-pointer
            bg-white text-black flex gap-2 whitespace-nowrap"
                        >
                            <Sheet>
                                <SheetTrigger asChild>
                                    <div className="flex items-center gap-2">
                                        <Sort />
                                        <Text>Sort & Filters</Text>
                                    </div>
                                </SheetTrigger>
                                <SheetDemo />
                            </Sheet>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-[40px] lg:grid-cols-3">
                {items.map((item, index) => {
                    if (item.type === "product") {
                        return (
                            <div key={index} className="col-span-1">
                                <ProductCard
                                    tag={item.tag}
                                    title={item.title}
                                    subtitle={item.subtitle}
                                    images={item.images}
                                    price={item.price}
                                    tryOn={item.tryOn}
                                    shopNow={item.shopNow}
                                />
                            </div>
                        );
                    }

                    if (item.type === "image" && item.src && item.mobileSrc) {
                        return (
                            <div
                                key={index}
                                className={
                                    item.large ? "col-span-2" : "col-span-1"
                                }
                            >
                                {item.src && (
                                    <Image
                                        src={item.src}
                                        alt={item.alt}
                                        width={item.large ? 1008 : 500}
                                        height={672}
                                        className="w-full h-auto hidden lg:block"
                                    />
                                )}

                                {item.mobileSrc && (
                                    <Image
                                        src={item.mobileSrc}
                                        alt={item.alt}
                                        width={item.large ? 1008 : 500}
                                        height={672}
                                        className="w-full h-auto lg:hidden"
                                    />
                                )}
                            </div>
                        );
                    }

                    return null;
                })}
            </div>
        </>
    );
}
