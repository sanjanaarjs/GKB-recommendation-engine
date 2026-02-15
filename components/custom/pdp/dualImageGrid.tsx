"use client";

import Text from "@/components/generic/Text";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { ProductDetails } from "./datas/pdpData.api";

interface ImageGridQRProps {
    productContent: ProductDetails[];
}

export default function DualImageGrid({ productContent }: ImageGridQRProps) {
    const dualgrid = productContent[4];

    return (
        <div className="py-16 lg:pt-[168px] lg:pb-[200px] bg-white">
            <div className="w-[70%] 2xl:w-1/2 mx-auto max-lg:w-[90%]">
                {/* Dynamic Title */}
                <Text size="xl4" className="w-[290px]">
                    {dualgrid?.tag_label}
                </Text>

                {/* Mobile view → Swiper */}
                <div className="w-full lg:hidden h-full mt-8">
                    <Swiper
                        spaceBetween={24}
                        slidesPerView={1}
                        pagination={{ clickable: true }}
                        className="w-full lg:hidden"
                    >
                        {dualgrid?.ProductContentRow?.map((item, idx) => (
                            <SwiperSlide key={idx}>
                                <div className="flex flex-col gap-[24px] items-center w-full">
                                    <Image
                                        src={
                                            item.media_mob ??
                                            item.media ??
                                            "/images/fallback.png"
                                        }
                                        alt={item.btn_text || "Product image"}
                                        width={400}
                                        height={600}
                                        className="w-full"
                                    />
                                    {item?.btn_text && (
                                        <Link href={item.btn_url ?? "#"}>
                                            <button
                                                className={`rounded-full py-2.5 px-6 font-helvetica text-base font-normal leading-normal cursor-pointer
                          ${
                              idx === 0
                                  ? "bg-black text-white border border-black px-[38px]"
                                  : idx !== 0
                                    ? "bg-transparent border border-black text-[#0B0B0B] px-[60px]"
                                    : "bg-black text-white border border-black px-[38px]" // default
                          }`}
                                            >
                                                {item.btn_text}
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
                    {dualgrid?.ProductContentRow?.map((item, idx) => (
                        <div
                            key={idx}
                            className="flex flex-col gap-[24px] items-center w-full"
                        >
                            <Image
                                src={item.media ?? "/images/fallback.png"}
                                alt={item.btn_text || "Product image"}
                                width={400}
                                height={600}
                                className="w-full"
                            />
                            {item.btn_text && (
                                <Link href={item.btn_url ?? "#"}>
                                    <button
                                        className={`rounded-full p-[8px] py-[19px] font-helvetica text-[1.25rem] font-bold leading-normal cursor-pointer
                      ${
                          idx === 0
                              ? "bg-black text-white border border-black px-[38px]"
                              : idx !== 0
                                ? "bg-transparent border border-black text-[#0B0B0B] px-[60px]"
                                : "bg-black text-white border border-black px-[38px]"
                      }`}
                                    >
                                        {item.btn_text}
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
