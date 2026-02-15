"use client";

import React, { useState } from "react";
import ProductCard from "@/components/generic/product-card/ProductCard";
import Text from "@/components/generic/Text";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
} from "@/components/ui/accordion";
import { Minus, Plus } from "lucide-react";
import { ProductItem } from "@/components/custom/pdp/datas/pdpData.api";

interface RecentProductsProps {
    title?: string;
}

export const mockProduct: ProductItem[] = [
    {
        id: 201,
        uid: "UID201",
        sku: "MK-001",
        attribute_set_id: 2,
        name: "Michael Kors",
        color: "Clear Cat Eye",
        stock_status: "In Stock",
        brand: "Michael Kors",
        country_of_manufacture: "Italy",
        expected_delivery: "2-4 business days",
        brandInfo: {
            name: "Michael Kors",
            image: "/images/brand/mk.png",
            url_key: "michael-kors",
        },
        product_content: [],
        attributeTobeShow: [
            {
                attribute_code: "brand",
                attribute_label: "Brand",
                attribute_value: "Michael Kors",
                attribute_value_id: "2",
            },
        ],
        product_usp: "Stylish | Premium quality | Lightweight",
        image: {
            url: "/images/home/best-seller/spec1.png",
            label: "Main Image",
            position: 1,
            disabled: false,
        },
        small_image: {
            url: "/images/home/best-seller/spec1.png",
            label: "Small Image",
            position: 1,
            disabled: false,
        },
        thumbnail: {
            url: "/images/home/best-seller/spec2.png",
            label: "Thumbnail",
            position: 1,
            disabled: false,
        },
        media_gallery: [
            {
                url: "/images/home/best-seller/spec1.png",
                label: "Gallery 1",
                position: 1,
                disabled: false,
            },
            {
                url: "/images/home/best-seller/spec2.png",
                label: "Gallery 2",
                position: 2,
                disabled: false,
            },
        ],
        price_range: {
            minimum_price: {
                regular_price: { value: 13990, currency: "INR" },
                final_price: { value: 13990, currency: "INR" },
                discount: { amount_off: 0, percent_off: 0 },
            },
        },
        url_key: "michael-kors-clear-cat-eye-1",
        related_products: [],
        color_swatch: {
            id: 1,
            name: "Clear Cat Eye",
            sku: "MK-001-CLEAR",
            hashcode: "#FFFFFF",
            frame_color_primary: "#FFFFFF",
            swatch_image: "/images/colors/white.png",
            url_key: "clear-cat-eye",
            is_current: "",
        },
    },
    {
        id: 202,
        uid: "UID202",
        sku: "MK-002",
        attribute_set_id: 2,
        name: "Michael Kors",
        color: "Clear Cat Eye",
        stock_status: "In Stock",
        brand: "Michael Kors",
        country_of_manufacture: "Italy",
        expected_delivery: "2-4 business days",
        brandInfo: {
            name: "Michael Kors",
            image: "/images/brand/mk.png",
            url_key: "michael-kors",
        },
        product_content: [],
        attributeTobeShow: [
            {
                attribute_code: "brand",
                attribute_label: "Brand",
                attribute_value: "Michael Kors",
                attribute_value_id: "2",
            },
        ],
        product_usp: "Stylish | Premium quality | Lightweight",
        image: {
            url: "/images/home/best-seller/spec1.png",
            label: "Main Image",
            position: 1,
            disabled: false,
        },
        small_image: {
            url: "/images/home/best-seller/spec1.png",
            label: "Small Image",
            position: 1,
            disabled: false,
        },
        thumbnail: {
            url: "/images/home/best-seller/spec2.png",
            label: "Thumbnail",
            position: 1,
            disabled: false,
        },
        media_gallery: [
            {
                url: "/images/home/best-seller/spec1.png",
                label: "Gallery 1",
                position: 1,
                disabled: false,
            },
            {
                url: "/images/home/best-seller/spec2.png",
                label: "Gallery 2",
                position: 2,
                disabled: false,
            },
        ],
        price_range: {
            minimum_price: {
                regular_price: { value: 13990, currency: "INR" },
                final_price: { value: 13990, currency: "INR" },
                discount: { amount_off: 0, percent_off: 0 },
            },
        },
        url_key: "michael-kors-clear-cat-eye-2",
        related_products: [],
        color_swatch: {
            id: 2,
            name: "Clear Cat Eye",
            sku: "MK-002-CLEAR",
            hashcode: "#FFFFFF",
            is_current: "",
            frame_color_primary: "#FFFFFF",
            swatch_image: "/images/colors/white.png",
            url_key: "clear-cat-eye",
        },
    },
    {
        id: 203,
        uid: "UID203",
        sku: "MK-003",
        attribute_set_id: 2,
        name: "Michael Kors",
        color: "Clear Cat Eye",
        stock_status: "In Stock",
        brand: "Michael Kors",
        country_of_manufacture: "Italy",
        expected_delivery: "2-4 business days",
        brandInfo: {
            name: "Michael Kors",
            image: "/images/brand/mk.png",
            url_key: "michael-kors",
        },
        product_content: [],
        attributeTobeShow: [
            {
                attribute_code: "brand",
                attribute_label: "Brand",
                attribute_value: "Michael Kors",
                attribute_value_id: "2",
            },
        ],
        product_usp: "Stylish | Premium quality | Lightweight",
        image: {
            url: "/images/home/best-seller/spec1.png",
            label: "Main Image",
            position: 1,
            disabled: false,
        },
        small_image: {
            url: "/images/home/best-seller/spec1.png",
            label: "Small Image",
            position: 1,
            disabled: false,
        },
        thumbnail: {
            url: "/images/home/best-seller/spec2.png",
            label: "Thumbnail",
            position: 1,
            disabled: false,
        },
        media_gallery: [
            {
                url: "/images/home/best-seller/spec1.png",
                label: "Gallery 1",
                position: 1,
                disabled: false,
            },
            {
                url: "/images/home/best-seller/spec2.png",
                label: "Gallery 2",
                position: 2,
                disabled: false,
            },
        ],
        price_range: {
            minimum_price: {
                regular_price: { value: 13990, currency: "INR" },
                final_price: { value: 13990, currency: "INR" },
                discount: { amount_off: 0, percent_off: 0 },
            },
        },
        url_key: "michael-kors-clear-cat-eye-3",
        related_products: [],
        color_swatch: {
            id: 3,
            name: "Clear Cat Eye",
            sku: "MK-003-CLEAR",
            hashcode: "#FFFFFF",
            is_current: "true",
            frame_color_primary: "#FFFFFF",
            swatch_image: "/images/colors/white.png",
            url_key: "clear-cat-eye",
        },
    },
];

export default function RecentProducts({
    title = "Items you have recently viewed",
}: RecentProductsProps) {
    const [accordionValue, setAccordionValue] = useState<string | undefined>(
        "recent",
    );
    const loading = false;

    const toggleAccordion = () => {
        setAccordionValue(accordionValue ? undefined : "recent");
    };

    return (
        <Accordion
            type="single"
            collapsible
            value={accordionValue}
            onValueChange={setAccordionValue}
            className="bg-background-grey border border-b-border-grey pb-16 md:pb-[120px] relative"
        >
            <AccordionItem value="recent" className="border-none">
                {/* Header */}
                <div className="flex justify-between relative pt-8 px-[24px] md:pt-16 md:px-[24px] md:px-[120px] items-center">
                    <div className="flex-1">
                        <Text
                            size="xl4"
                            className="w-[290px] text-sm  font-semibold lg:font-normal  lg:text-4xl"
                        >
                            {title}
                        </Text>
                    </div>
                    <div
                        onClick={toggleAccordion}
                        className="bg-white  p-2 lg:p-3 rounded-full cursor-pointer shadow-[0_12px_44px_0_rgba(0,0,0,0.10)]"
                    >
                        {accordionValue ? (
                            <Minus
                                className="w-3.5 h-3.5 lg:w-18 lg:h-18"
                                strokeWidth={1.8}
                            />
                        ) : (
                            <Plus
                                className="w-3.5 h-3.5 lg:w-18 lg:h-18"
                                strokeWidth={1.8}
                            />
                        )}
                    </div>
                </div>

                {/* Accordion Content with Swiper */}
                <AccordionContent>
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        spaceBetween={24}
                        breakpoints={{
                            320: { slidesPerView: 1.25 },
                            640: { slidesPerView: 2 },
                            1024: { slidesPerView: 4.25 },
                        }}
                        className="w-full px-4 pb-8 md:pb-10 mt-[38px] lg:mt-[48px]"
                        slidesOffsetBefore={24}
                        slidesOffsetAfter={24}
                    >
                        {loading ? (
                            <div className="w-full justify-center px-[40px] md:px-[120px]">
                                <Text>Loading...</Text>
                            </div>
                        ) : (
                            <>
                                {mockProduct && mockProduct.length > 0 ? (
                                    mockProduct.map((item) => (
                                        <SwiperSlide
                                            key={item.sku}
                                            className="bg-white"
                                        >
                                            <div className="col-span-1">
                                                <ProductCard
                                                    title={item.brand}
                                                    subtitle={item.name || ""}
                                                    images={
                                                        item?.small_image?.url
                                                            ? [
                                                                  item
                                                                      ?.small_image
                                                                      ?.url ??
                                                                      "",
                                                                  item
                                                                      ?.thumbnail
                                                                      ?.url ??
                                                                      "",
                                                              ]
                                                            : []
                                                    }
                                                    price={
                                                        item?.price_range
                                                            ?.minimum_price
                                                            ?.regular_price
                                                            ?.value || 0
                                                    }
                                                    recentlyViewed={true}
                                                    colorSwatches={[]}
                                                    currency={"₹"}
                                                    url_key={item?.url_key}
                                                />
                                            </div>
                                        </SwiperSlide>
                                    ))
                                ) : (
                                    <div className="w-full justify-center">
                                        <Text>Product not Available</Text>
                                    </div>
                                )}
                            </>
                        )}
                    </Swiper>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}
