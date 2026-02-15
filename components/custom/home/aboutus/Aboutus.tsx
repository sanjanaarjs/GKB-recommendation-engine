"use client";

import Text from "@/components/generic/Text";
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import ChevronRight from "@/components/icons/ChevronRight";
import { ItemData } from "@/lib/services/magento/homepageData";
import ChevronLeft from "@/components/icons/ChevronLeft";

export interface IAboutProps {
    data: ItemData[] | [];
}

export default function Aboutus({ data }: IAboutProps) {
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
                    size="xl5"
                    weight="light"
                    color="black"
                    className="text-3xl lg:text-5xl mt-3"
                >
                    {" "}
                    {data?.[0]?.name?.split(" ").slice(0, 1).join(" ")} <br />
                    {data?.[0]?.name?.split(" ").slice(1).join(" ")}
                    {/* read
                    <br />
                    all about us */}
                </Text>
                <Text
                    as="p"
                    size="customText5"
                    weight="normal"
                    font="helvetica"
                    color="black"
                    className="text-left leading-6 lg:leading-8 block my-6 pr-12"
                >
                    {data?.[0]?.description}
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
                        {data?.[0]?.buttontext}
                    </Text>
                    <ChevronRight size={14} fill="black" />
                </Link>
                <div className="w-full items-center justify-start gap-8 hidden lg:flex mt-8">
                    <button
                        onClick={prev}
                        className={cn(
                            "px-6 py-7 rounded-full flex items-center justify-center transition-all duration-300 h-[66px] w-[66px]",
                            canScrollPrev
                                ? "bg-white shadow-2xl cursor-pointer"
                                : "bg-tertiary-600 opacity-40 cursor-not-allowed",
                        )}
                    >
                        <ChevronLeft fill="black" size={28} />
                    </button>
                    <button
                        onClick={next}
                        className={cn(
                            "px-6 py-7 rounded-full flex items-center justify-center transition-all duration-300 h-[66px] w-[66px]",
                            canScrollNext
                                ? "bg-white shadow-2xl cursor-pointer"
                                : "bg-tertiary-600 opacity-40 cursor-not-allowed",
                        )}
                    >
                        <ChevronRight fill="black" size={28} />
                    </button>
                </div>
            </div>
            <div className="basis-2/3">
                <Carousel
                    opts={{ loop: false, align: "start", dragFree: true }}
                    setApi={setApi}
                >
                    <CarouselContent className="gap-2 w-full">
                        {data.slice(1).map((item, index) => (
                            <CarouselItem
                                key={index}
                                className="basis-2/3 md:basis-1/2 xl:basis-2/5 2xl:basis-1/3 cursor-pointer"
                            >
                                <div className="h-[460px] relative min-w-full">
                                    {item.attachment && (
                                        <Image
                                            src={item.attachment}
                                            alt={item.name}
                                            fill
                                            className="object-cover w-full h-full"
                                        />
                                    )}
                                </div>
                                <Text
                                    as="h3"
                                    size="base"
                                    color="black"
                                    weight="normal"
                                    font="helvetica"
                                    className="text-left leading-normal mt-6"
                                >
                                    {item.name}
                                </Text>
                                {item.link && (
                                    <Link href={item.link}>
                                        <Text
                                            as="p"
                                            size="sm"
                                            color="black"
                                            weight="light"
                                            font="helvetica"
                                            className="text-left leading-normal text-black lg:text-fontMain italic"
                                        >
                                            {item.buttontext}
                                        </Text>
                                    </Link>
                                )}
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
        </div>
    );
}
