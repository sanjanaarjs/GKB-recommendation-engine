"use client";

import Text from "@/components/generic/Text";
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import { aboutus } from "./aboutus.api";
import Image from "next/image";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import ArrowRightThin from "@/components/icons/ArrowRightThin";
import ArrowLeftThin from "@/components/icons/ArrowLeftThin";
import Link from "next/link";
import ChevronRight from "@/components/icons/ChevronRight";

export default function Aboutus() {
    const [current, setCurrent] = useState<number>(1);
    const [api, setApi] = useState<CarouselApi>();

    const prev = () => {
        api?.scrollPrev();
        if (api?.selectedScrollSnap() !== undefined) {
            setCurrent(api?.selectedScrollSnap() + 1);
        }
    };
    const next = () => {
        api?.scrollNext();
        if (api?.selectedScrollSnap() !== undefined) {
            setCurrent(api?.selectedScrollSnap() + 1);
        }
    };

    const canScrollPrev = useMemo(
        () => api?.canScrollPrev(),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [api, current],
    );
    const canScrollNext = useMemo(
        () => api?.canScrollNext(),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [api, current],
    );

    api?.on("select", () => {
        setCurrent(api?.selectedScrollSnap() + 1);
    });

    return (
        <div className="w-full min-h-screen relative py-20 flex flex-col lg:flex-row lg:items-center pl-4 sm:pl-12 xl:pl-28 2xl:pl-40 lg:gap-16">
            <div className="basis-1/3">
                <Text
                    as="h2"
                    font="helvetica"
                    weight="light"
                    size="customText8"
                    color="black"
                    className="text-left leading-9 lg:leading-16"
                >
                    read
                    <br />
                    all about us
                </Text>
                <Text
                    as="p"
                    size="customText5"
                    weight="normal"
                    font="helvetica"
                    color="black"
                    className="text-left leading-6 lg:leading-8 block my-6 pr-12"
                >
                    From advanced lens technology to iconic designs, everything
                    we do is built around better vision. Read our News & Stories
                    to stay updated on new collections, care tips, and real
                    stories from people like you.
                </Text>
                <Link
                    href="#"
                    className="text-left my-6 pr-12 flex items-center gap-2"
                >
                    <Text
                        as="p"
                        size="customText5"
                        color="fontMain"
                        weight="normal"
                        font="helvetica"
                        className="text-left leading-normal italic"
                    >
                        Know more about us
                    </Text>
                    <ChevronRight size={14} fill="black" />
                </Link>
                <div className="w-full items-center justify-start gap-8 hidden lg:flex mt-8">
                    <button
                        onClick={prev}
                        className={cn(
                            "px-8 py-9 rounded-full flex items-center justify-center transition-all duration-300",
                            canScrollPrev
                                ? "bg-white shadow-2xl cursor-pointer"
                                : "bg-tertiary-600 opacity-40 cursor-not-allowed",
                        )}
                    >
                        <ArrowLeftThin stroke="black" size={56} />
                    </button>
                    <button
                        onClick={next}
                        className={cn(
                            "px-8 py-9 rounded-full flex items-center justify-center transition-all duration-300",
                            canScrollNext
                                ? "bg-white shadow-2xl cursor-pointer"
                                : "bg-tertiary-600 opacity-40 cursor-not-allowed",
                        )}
                    >
                        <ArrowRightThin stroke="black" size={56} />
                    </button>
                </div>
            </div>
            <div className="basis-2/3">
                <Carousel
                    opts={{ loop: false, align: "start", dragFree: true }}
                    setApi={setApi}
                >
                    <CarouselContent className="gap-2 w-full">
                        {aboutus.map((item, index) => (
                            <CarouselItem
                                key={index}
                                className="basis-2/3 md:basis-1/2 xl:basis-2/5 2xl:basis-1/3 cursor-pointer"
                            >
                                <div className="h-[460px] relative min-w-full">
                                    <Image
                                        src={item.img}
                                        alt={item.title}
                                        fill
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                                <Text
                                    as="h3"
                                    size="base"
                                    color="black"
                                    weight="normal"
                                    font="helvetica"
                                    className="text-left leading-normal mt-6"
                                >
                                    {item.title}
                                </Text>
                                <Text
                                    as="p"
                                    size="sm"
                                    color="black"
                                    weight="light"
                                    font="helvetica"
                                    className="text-left leading-normal text-black lg:text-fontMain italic"
                                >
                                    Read more
                                </Text>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
        </div>
    );
}
