"use client";

import ProductCard from "@/components/generic/product-card/ProductCard";
import { GridItem } from "@/components/generic/product-card/productCard.api";
import Text from "@/components/generic/Text";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

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
];

export default function SimilarFrames() {
    return (
        <div className="bg-background-grey px-6 lg:px-20 py-16">
            <Text size="xl4" className="pb-8 lg:pb-[72px] w-[290px]">
                Similar frames you may also like
            </Text>

            <Swiper
                modules={[Autoplay]}
                spaceBetween={24}
                slidesPerView={1.2}
                navigation
                pagination={{ clickable: true }}
                breakpoints={{
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
            >
                {items.map((item, index) => {
                    if (item.type === "product") {
                        return (
                            <SwiperSlide key={index}>
                                <ProductCard
                                    tag={item.tag}
                                    title={item.title}
                                    subtitle={item.subtitle}
                                    images={item.images}
                                    price={item.price}
                                    tryOn={item.tryOn}
                                    shopNow={item.shopNow}
                                    currency="₹"
                                    tagClassName="italic font-semibold font-avenir"
                                />
                            </SwiperSlide>
                        );
                    }
                    return null;
                })}
            </Swiper>
        </div>
    );
}
