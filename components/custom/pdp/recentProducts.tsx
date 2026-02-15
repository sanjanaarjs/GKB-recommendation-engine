"use client";

import React, { useEffect, useMemo, useState } from "react";
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
import { getProductBySku, ProductItem } from "./datas/pdpData.api";
import {
    CurrencyResponse,
    getCurrency,
} from "@/lib/services/magento/query_getCurrency_graphql";
import { useWishlist } from "@/lib/hooks/useWishlist";
import { useResponsive } from "@/lib/hooks/useResponsive";

interface RecentProductsProps {
    title?: string;
}

export default function RecentProducts({
    title = "Items you have recently viewed",
}: RecentProductsProps) {
    const [accordionValue, setAccordionValue] = useState<string | undefined>(
        "recent",
    );
    const [products, setProducts] = useState<ProductItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { wishlistSkuSet, handleWishlistClick } = useWishlist();
    const { isDesktop } = useResponsive();

    let currency: CurrencyResponse["currency"] | null = null;

    const toggleAccordion = () => {
        setAccordionValue(accordionValue ? undefined : "recent");
    };

    useEffect(() => {
        const fetchProductsFromHistory = async () => {
            try {
                setLoading(true); // start loader

                // Get history safely as string[]
                const existingHistory = localStorage.getItem("searchHistory");
                const history: string[] = existingHistory
                    ? JSON.parse(existingHistory)
                    : [""];

                if (history.length === 0) {
                    setProducts([]); // clear products if no history
                    return;
                }

                // Fetch products for the saved SKUs
                const productData = await getProductBySku(history);

                if (productData && productData.length > 0) {
                    setProducts(productData);
                    currency = await getCurrency();
                } else {
                    setProducts([]); // ensure it's always an array
                }
            } catch (error) {
                console.error("Error fetching products from history:", error);
                setProducts([]);
            } finally {
                setLoading(false); // stop loader
            }
        };

        fetchProductsFromHistory();
    }, []);

    const enhancedProducts = useMemo(() => {
        return products.map((item) => ({
            ...item,
            isWishlisted: item.sku ? wishlistSkuSet.has(item.sku) : false,
        }));
    }, [products, wishlistSkuSet]);

    return (
        <Accordion
            type="single"
            collapsible
            value={accordionValue}
            onValueChange={setAccordionValue}
            className="bg-background-grey lg:border lg:border-b-border-grey pb-16 md:pb-12 relative"
        >
            <AccordionItem value="recent" className="border-none">
                {/* Header */}
                <div className="flex justify-between relative pt-6 px-10 lg:px-20 md:pt-[88px] md:px-20 items-center">
                    <div className="flex-1">
                        <Text
                            size="xl4"
                            className="w-[290px] lg:w-full text-sm font-semibold lg:font-normal lg:text-4xl"
                        >
                            {title}
                        </Text>
                    </div>
                    <div
                        onClick={toggleAccordion}
                        className="bg-white  p-2 lg:p-3 rounded-full cursor-pointer shadow-[0_12px_44px_0_rgba(0,0,0,0.10)]"
                    >
                        {accordionValue ? (
                            <Minus size={!isDesktop ? 48 : 52} fill="white" />
                        ) : (
                            <Plus size={!isDesktop ? 48 : 52} fill="white" />
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
                                {enhancedProducts &&
                                enhancedProducts.length > 0 ? (
                                    enhancedProducts.map((item) => (
                                        <SwiperSlide
                                            key={item.sku}
                                            className="bg-white"
                                        >
                                            <div className="col-span-1">
                                                <ProductCard
                                                    title={item.brand}
                                                    subtitle={item.name || ""}
                                                    images={[
                                                        item?.small_image?.url,
                                                        item?.thumbnail?.url,
                                                    ].filter(
                                                        (url): url is string =>
                                                            Boolean(url),
                                                    )}
                                                    price={
                                                        item?.price_range
                                                            ?.minimum_price
                                                            ?.regular_price
                                                            ?.value || 0
                                                    }
                                                    recentlyViewed={true}
                                                    colorSwatches={[]}
                                                    currency={
                                                        currency &&
                                                        currency?.base_currency_symbol
                                                            ? currency?.base_currency_symbol
                                                            : ""
                                                    }
                                                    url_key={item?.url_key}
                                                    sku={item.sku}
                                                    isWishlisted={
                                                        item.isWishlisted
                                                    }
                                                    onWishlistClick={() => {
                                                        if (item.sku)
                                                            handleWishlistClick(
                                                                item.sku,
                                                            );
                                                    }}
                                                />
                                            </div>
                                        </SwiperSlide>
                                    ))
                                ) : (
                                    <div className="w-full justify-center px-10 md:px-[120px]">
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
