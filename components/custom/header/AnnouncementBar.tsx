"use client";

import Text from "@/components/generic/Text";
import ChevronLeft from "@/components/icons/ChevronLeft";
import ChevronRight from "@/components/icons/ChevronRight";
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function AnnouncementBar({
    announcementsData,
    announcements,
}: {
    announcementsData: {
        name: string;
        link: string;
        buttontext: string;
        attachment: string;
    }[];
    announcements: { description: string; ctaHyperlink: string }[];
}) {
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
            {announcementsData[0]?.name && (
                <div className="flex items-center gap-2 ">
                    {announcementsData?.[1]?.attachment && (
                        <Image
                            width={24}
                            height={24}
                            alt={announcementsData[1]?.name ?? ""}
                            src={announcementsData[1].attachment}
                        />
                    )}
                    <Link href={announcementsData[1]?.link}>
                        <Text color="white" size="base">
                            {announcementsData[1]?.buttontext}
                        </Text>
                    </Link>
                </div>
            )}

            {announcements && (
                <div className="flex-1 flex justify-center">
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
                                    <CarouselItem
                                        key={announcement.description}
                                    >
                                        <Link href={announcement.ctaHyperlink}>
                                            <Text
                                                color="white"
                                                size="base"
                                                weight="bold"
                                                className="text-center"
                                            >
                                                {announcement.description}
                                            </Text>
                                        </Link>
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
                </div>
            )}

            {announcementsData[1]?.name && (
                <div className="flex items-center gap-2 justify-end">
                    {announcementsData?.[0]?.attachment && (
                        <Image
                            width={24}
                            height={24}
                            alt={announcementsData[0]?.name || "announcement"}
                            src={announcementsData[0].attachment}
                        />
                    )}
                    <Link href={announcementsData[0]?.link}>
                        <Text color="white" size="base">
                            {announcementsData[0]?.buttontext}
                        </Text>
                    </Link>
                </div>
            )}
        </div>
    );
}
