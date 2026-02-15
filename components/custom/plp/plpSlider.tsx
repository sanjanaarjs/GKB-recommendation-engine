"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import { CollectionPage } from "./datas/productData.api";
import { BOTTOM } from "@/lib/constants/variable";

interface PlpSliderProps {
    sliders: CollectionPage[];
}

export default function PlpSlider({ sliders }: PlpSliderProps) {
    const sliderData = sliders?.find((item) => item?.position === BOTTOM);

    return (
        <>
            {sliderData && sliderData.images?.length > 0 && (
                <div className="relative w-full">
                    <Swiper
                        modules={[Autoplay, Pagination, Navigation]}
                        slidesPerView={1.1}
                        spaceBetween={30}
                        autoplay={{ delay: 4000, disableOnInteraction: false }}
                        className="h-[85vh] w-full"
                    >
                        {sliderData?.images.map((item, index) => (
                            <SwiperSlide key={index}>
                                <div className="relative h-full w-full">
                                    {item.ctaLink && (
                                        <Link href={item?.ctaLink}>
                                            {item?.link && (
                                                <Image
                                                    src={item.link}
                                                    alt={
                                                        item.ctaLabel ??
                                                        "banner"
                                                    }
                                                    fill
                                                    className="object-contain"
                                                    priority={index === 0}
                                                />
                                            )}
                                        </Link>
                                    )}
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            )}
        </>
    );
}
