"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import ChevronLeft from "@/components/icons/ChevronLeft";
import ChevronRight from "@/components/icons/ChevronRight";
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import { BrandCategory, ItemData } from "@/lib/services/magento/homepageData";

export interface IBrandsProps {
    data: BrandCategory[];
    brandBanner: ItemData[];
}

export default function Brands({ data, brandBanner }: IBrandsProps) {
    const [current, setCurrent] = useState<number>(1);
    const [api, setApi] = useState<CarouselApi>();

    const merged = data.map((brand) => {
        const banner = brandBanner.find(
            (b) => Number(b.categories) === Number(brand.id),
        );

        return {
            ...brand,
            banner: banner || null, // keep null if no match found
        };
    });

    const prev = () => {
        if (current > 1) {
            setCurrent(current - 1);
        }
    };
    const next = () => {
        if (current < merged.length) {
            setCurrent(current + 1);
        }
    };
    useEffect(() => {
        api?.scrollTo(current - 1);
    }, [current]);
    const setSlide = (index: number) => {
        api?.scrollTo(index);
        setCurrent(index + 1);
    };

    const slides =
        merged &&
        Array.isArray(merged) &&
        merged.length > 0 &&
        merged.map((brand, index) => (
            <CarouselItem
                key={index}
                className="basis-1/4 lg:basis-1/6 h-full relative"
            >
                <div
                    className="cursor-pointer relative flex justify-center items-center h-full"
                    onClick={() => setSlide(index)}
                >
                    {brand?.thumbnail && (
                        <Image
                            src={brand.thumbnail}
                            alt={`${brand?.name}_image`}
                            width={100}
                            height={100}
                            className="w-full h-auto"
                        />
                    )}
                </div>
                <div
                    className={cn(
                        "absolute bottom-0 left-1/2 -translate-x-1/2 h-1 lg:h-2 bg-primary-100 flex items-center justify-center transition-all duration-500 w-full rounded-full",
                        index === current - 1 ? "w-3/4" : "w-0",
                    )}
                ></div>
            </CarouselItem>
        ));

    return (
        <div className="w-full h-screen relative">
            {merged &&
                Array.isArray(merged) &&
                merged.length > 0 &&
                merged.map((brand, index) => (
                    <div
                        key={index}
                        className="absolute top-0 left-0 w-full h-full"
                    >
                        {brand?.banner?.attachment && (
                            <Image
                                src={brand?.banner?.attachment}
                                alt={`${brand?.id}_image`}
                                fill
                                className={cn(
                                    "object-cover transition-all duration-500",
                                    index === current - 1
                                        ? "opacity-100"
                                        : "opacity-0",
                                )}
                            />
                        )}
                    </div>
                ))}
            <div className="absolute bottom-0 left-0 w-full h-[96px] lg:h-[160px] 2xl:h-[240px] flex items-center justify-center bg-black/80 px-4 lg:px-20 overflow-hidden gap-8">
                <Carousel
                    opts={{ loop: false, align: "start" }}
                    className="w-full lg:w-[80%] min-w-sm"
                    setApi={setApi}
                >
                    <CarouselContent className="gap-8 lg:gap-16 items-center brand-carousel h-[96px] lg:h-[160px] 2xl:h-[240px]">
                        {slides}
                    </CarouselContent>
                </Carousel>

                <div className="items-center justify-center gap-12 hidden lg:flex">
                    <button
                        onClick={prev}
                        className={cn(
                            "h-[66px] w-[66px] rounded-full flex items-center justify-center transition-all duration-300",
                            current > 1
                                ? "bg-black shadow-2xl shadow-white/20 cursor-pointer"
                                : "bg-black opacity-40 cursor-not-allowed",
                        )}
                    >
                        <ChevronLeft fill="white" size={28} />
                    </button>
                    <button
                        onClick={next}
                        className={cn(
                            "h-[66px] w-[66px] rounded-full flex items-center justify-center transition-all duration-300",
                            current < merged.length
                                ? "bg-black shadow-2xl shadow-white/20 cursor-pointer"
                                : "bg-black opacity-40 cursor-not-allowed",
                        )}
                    >
                        <ChevronRight fill="white" size={28} />
                    </button>
                </div>
            </div>
        </div>
    );
}
