"use client";

import Text from "@/components/generic/Text";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { ItemData } from "@/lib/services/magento/homepageData";

interface DualImageGridProps {
    title?: string;
    items: ItemData[];
}

export default function DualImageGrid({
    title = "Do you need a prescription?",
    items,
}: DualImageGridProps) {
    return (
        <div className="py-16 lg:pt-[168px] lg:pb-[200px] bg-white">
            <div className="w-[70%] 2xl:w-1/2 mx-auto max-lg:w-[90%]">
                {/* Dynamic Title */}
                <Text size="xl4" className="w-[290px]">
                    {title}
                </Text>

                {/* Mobile view → Swiper */}
                <div className="w-full lg:hidden h-full mt-8">
                    <Swiper
                        spaceBetween={24}
                        slidesPerView={1}
                        pagination={{ clickable: true }}
                        className="w-full lg:hidden"
                    >
                        {items.map((item, idx) => (
                            <SwiperSlide key={idx}>
                                <div className="flex flex-col gap-[24px] items-center w-full">
                                    <Image
                                        src={
                                            item.attachmentmob ??
                                            item.attachment ??
                                            "/images/fallback.png"
                                        }
                                        alt={item.name}
                                        width={400}
                                        height={600}
                                        className="w-full"
                                    />
                                    {item.buttontext && (
                                        <Link href={item.link ?? "#"}>
                                            <button
                                                className={`rounded-full py-2.5 px-6 font-helvetica text-base font-normal leading-normal cursor-pointer
                          ${
                              item.buttonVariant1 === "primary"
                                  ? "bg-black text-white border border-black px-[38px]"
                                  : item.buttonVariant1 === "secondary"
                                    ? "bg-transparent border border-black text-[#0B0B0B] px-[60px]"
                                    : "bg-black text-white border border-black px-[38px]" // default
                          }`}
                                            >
                                                {item.buttontext}
                                            </button>
                                        </Link>
                                    )}
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* Desktop view → Flex */}
                <div className="hidden lg:flex flex-row justify-center gap-[40px] mt-[56px]">
                    {items.map((item, idx) => (
                        <div
                            key={idx}
                            className="flex flex-col gap-[24px] items-center w-full"
                        >
                            <Image
                                src={item.attachment ?? "/images/fallback.png"}
                                alt={item.name}
                                width={400}
                                height={600}
                                className="w-full"
                            />
                            {item.buttontext && (
                                <Link href={item.link ?? "#"}>
                                    <button
                                        className={`rounded-full p-[8px] py-[19px] font-helvetica text-[1.25rem] font-bold leading-normal cursor-pointer
                      ${
                          item.buttonVariant1 === "primary"
                              ? "bg-black text-white border border-black px-[38px]"
                              : item.buttonVariant1 === "secondary"
                                ? "bg-transparent border border-black text-[#0B0B0B] px-[60px]"
                                : "bg-black text-white border border-black px-[38px]"
                      }`}
                                    >
                                        {item.buttontext}
                                    </button>
                                </Link>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
