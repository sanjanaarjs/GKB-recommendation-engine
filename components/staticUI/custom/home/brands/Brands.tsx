"use client";

import { useState } from "react";
import { brands } from "./brands.api";
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

export default function Brands() {
    const [current, setCurrent] = useState<number>(1);
    const [api, setApi] = useState<CarouselApi>();

    const prev = () => {
        if (current > 1) {
            setCurrent(current - 1);
            api?.scrollTo(current - 1);
        }
    };
    const next = () => {
        if (current < brands.length) {
            setCurrent(current + 1);
            api?.scrollTo(current + 1);
        }
    };
    const setSlide = (index: number) => {
        api?.scrollTo(index);
        setCurrent(index + 1);
    };

    return (
        <div className="w-full h-screen relative">
            {brands.map((brand, index) => (
                <div
                    key={index}
                    className="absolute top-0 left-0 w-full h-full"
                >
                    <Image
                        src={brand.bg}
                        alt={brand.logo}
                        fill
                        className={cn(
                            "object-cover transition-all duration-500",
                            index === current - 1 ? "opacity-100" : "opacity-0",
                        )}
                    />
                </div>
            ))}
            <div className="absolute bottom-0 left-0 w-full h-[96px] lg:h-[160px] 2xl:h-[240px] flex items-center justify-center bg-black/80 px-4 lg:px-20 overflow-hidden gap-8">
                <Carousel
                    opts={{ loop: false, align: "start" }}
                    className="w-full"
                    setApi={setApi}
                >
                    <CarouselContent className="gap-8 lg:gap-16 items-center brand-carousel h-[96px] lg:h-[160px] 2xl:h-[240px]">
                        {brands.map((brand, index) => (
                            <CarouselItem
                                key={index}
                                className="basis-1/4 lg:basis-1/6 h-full relative"
                            >
                                <div
                                    className="cursor-pointer relative flex justify-center items-center h-full"
                                    onClick={() => setSlide(index)}
                                >
                                    <Image
                                        src={brand.logo}
                                        alt={brand.logo}
                                        width={100}
                                        height={100}
                                        className="w-full h-auto"
                                    />
                                </div>
                                <div
                                    className={cn(
                                        "absolute bottom-0 left-1/2 -translate-x-1/2 h-1 lg:h-2 bg-white flex items-center justify-center transition-all duration-500 w-full rounded-full",
                                        index === current - 1 ? "w-3/4" : "w-0",
                                    )}
                                ></div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>

                <div className="items-center justify-center gap-12 hidden lg:flex">
                    <button
                        onClick={prev}
                        className={cn(
                            "h-[96px] w-[96px] rounded-full flex items-center justify-center transition-all duration-300",
                            current > 1
                                ? "bg-black shadow-2xl shadow-white/20 cursor-pointer"
                                : "bg-black opacity-40 cursor-not-allowed",
                        )}
                    >
                        <ChevronLeft fill="white" size={48} />
                    </button>
                    <button
                        onClick={next}
                        className={cn(
                            "h-[96px] w-[96px] rounded-full flex items-center justify-center transition-all duration-300",
                            current < brands.length - 1
                                ? "bg-black shadow-2xl shadow-white/20 cursor-pointer"
                                : "bg-black opacity-40 cursor-not-allowed",
                        )}
                    >
                        <ChevronRight fill="white" size={48} />
                    </button>
                </div>
            </div>
        </div>
    );
}
