"use client";

import Text from "@/components/generic/Text";
import ChevronLeft from "@/components/icons/ChevronLeft";
import ChevronRight from "@/components/icons/ChevronRight";
import HomeWithGlass from "@/components/icons/HomeWithGlass";
import LocationStore from "@/components/icons/LocationStore";
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import { useEffect, useRef, useState } from "react";

export default function AnnouncementBar() {
    const announcements = [
        "Avail 3 day delivery in all major cities now!",
        "Book Home Services",
        "Locate a store near you",
    ];
    const [api, setApi] = useState<CarouselApi>();
    const scrollInterval = useRef<NodeJS.Timeout | null>(null);

    const setScrollInterval = () => {
        if (scrollInterval.current) {
            clearInterval(scrollInterval.current);
        }
        scrollInterval.current = setInterval(() => {
            api?.scrollNext();
        }, 3000);
    };

    const clearScrollInterval = () => {
        if (scrollInterval.current) {
            clearInterval(scrollInterval.current);
            scrollInterval.current = null;
        }
    };

    useEffect(() => {
        setScrollInterval();
        return () => {
            if (scrollInterval.current) {
                clearInterval(scrollInterval.current);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [api]);

    return (
        <div className="w-full bg-black hidden lg:flex items-center justify-between px-12 h-12">
            <div className="flex items-center gap-2">
                <LocationStore />
                <Text color="white" size="base">
                    Locate a store near you
                </Text>
            </div>

            <div
                className="flex items-center gap-12"
                onMouseEnter={clearScrollInterval}
                onMouseLeave={setScrollInterval}
            >
                <button
                    onClick={() => api?.scrollPrev()}
                    className="cursor-pointer"
                >
                    <ChevronLeft />
                </button>
                <Carousel
                    opts={{ loop: true }}
                    setApi={setApi}
                    className="w-96"
                >
                    <CarouselContent>
                        {announcements.map((announcement) => (
                            <CarouselItem key={announcement}>
                                <Text
                                    color="white"
                                    size="base"
                                    weight="extrabold"
                                    className="text-center"
                                >
                                    {announcement}
                                </Text>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
                <button
                    onClick={() => api?.scrollNext()}
                    className="cursor-pointer"
                >
                    <ChevronRight />
                </button>
            </div>

            <div className="flex items-center gap-2">
                <HomeWithGlass />
                <Text color="white" size="base">
                    Book Home Services
                </Text>
            </div>
        </div>
    );
}
