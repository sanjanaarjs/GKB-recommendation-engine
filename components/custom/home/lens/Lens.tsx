"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Text from "@/components/generic/Text";
import { cn } from "@/lib/utils";
import Plus from "@/components/icons/Plus";
import Minus from "@/components/icons/Minus";
// import Link from "next/link";
// import ArrowRight from "@/components/icons/ArrowRight";
import { AnimatePresence, motion } from "motion/react";
import { useResponsive } from "@/lib/hooks/useResponsive";
import {
    AdditionalInfoItem,
    ItemData,
} from "@/lib/services/magento/homepageData";
import he from "he";

export interface ILensProps {
    data: ItemData[] | [];
}

export default function Lens({ data }: ILensProps) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [infoOpen, setInfoOpen] = useState(false);
    const { isMobile } = useResponsive();
    const popOverRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setInfoOpen(false);
    }, [currentSlide]);

    const closePopOver = (event: MouseEvent) => {
        if (
            popOverRef.current &&
            !popOverRef.current.contains(event.target as Node)
        ) {
            setInfoOpen(false);
        }
    };

    useEffect(() => {
        if (popOverRef.current) {
            if (infoOpen) {
                document.addEventListener("click", closePopOver);
            } else {
                document.removeEventListener("click", closePopOver);
            }
        }

        return () => {
            document.removeEventListener("click", closePopOver);
        };
    }, [infoOpen]);

    const additionalInfo: AdditionalInfoItem[] = data?.[currentSlide]
        ?.additional_info
        ? JSON.parse(data?.[currentSlide]?.additional_info)
        : [];

    return (
        <div className="w-full h-screen relative">
            {data &&
                Array.isArray(data) &&
                data.length > 0 &&
                data.map((slide, index) => (
                    <div
                        key={index}
                        className={cn(
                            "w-full h-full absolute top-0 left-0 transition-opacity duration-500 flex justify-center items-end",
                            currentSlide === index
                                ? "opacity-100"
                                : "opacity-0",
                        )}
                    >
                        {slide.attachment && (
                            <Image
                                src={slide.attachment}
                                alt={`${slide.name}_image`}
                                fill
                                className="object-cover"
                            />
                        )}
                        <div className="z-10 pb-48 lg:pb-48 2xl:pb-56">
                            <Text
                                font="helvetica"
                                size="xl5"
                                weight="light"
                                color="white"
                                className="text-center text-2xl xl:text-3xl 2xl:text-5xl leading-8 lg:leading-16 mx-auto w-[70%] md:w-full"
                            >
                                {slide.name}
                            </Text>
                        </div>
                    </div>
                ))}
            <div className="absolute left-1/2 -translate-x-1/2 top-20 w-3/4 sm:w-2/3 md:w-1/2 lg:w-[25%] xl:w-1/3 h-1/2 z-20">
                <Image
                    src="/images/home/lens/mirror.png"
                    alt="lens-bg"
                    fill
                    className="object-contain opacity-50"
                />
                <div className="relative w-full h-full flex justify-center items-center">
                    <button
                        className="bg-black/50 rounded-full p-2 border border-white cursor-pointer
                                    
                                    "
                        onClick={() => setInfoOpen(!infoOpen)}
                    >
                        {/* {!infoOpen ? (
                            <Plus size={isMobile ? 48 : 72} fill="white" />
                        ) : (
                            <Minus
                                size={isMobile ? 48 : 72}
                                stroke="white"
                                className="hidden md:block"
                            />
                        )} */}
                        {!infoOpen ? (
                            <>
                                {/* MOBILE → 48px */}
                                <Plus
                                    size={48}
                                    fill="white"
                                    className="block md:hidden"
                                />

                                {/* DESKTOP → 50px */}
                                <Plus
                                    size={50}
                                    fill="white"
                                    className="hidden md:block 2xl:hidden"
                                />

                                {/* LG+ → 72px */}
                                <Plus
                                    size={72}
                                    fill="white"
                                    className="hidden 2xl:block"
                                />
                            </>
                        ) : (
                            <>
                                {/* MOBILE → 48px */}
                                <Minus
                                    size={48}
                                    stroke="white"
                                    className="block md:hidden"
                                />

                                {/* DESKTOP → 50px */}
                                <Minus
                                    size={50}
                                    stroke="white"
                                    className="hidden md:block 2xl:hidden"
                                />

                                {/* LG+ → 72px */}
                                <Minus
                                    size={72}
                                    stroke="white"
                                    className="hidden 2xl:block"
                                />
                            </>
                        )}
                    </button>
                    <AnimatePresence>
                        {infoOpen && (
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    x: isMobile ? 0 : 100,
                                    y: isMobile ? 100 : 0,
                                }}
                                animate={{ opacity: 1, x: 0, y: 0 }}
                                exit={{
                                    opacity: 0,
                                    x: isMobile ? 0 : 100,
                                    y: isMobile ? 100 : 0,
                                }}
                                transition={{ duration: 0.5 }}
                                ref={popOverRef}
                                className="absolute top-[30%] lg:top-[16%] xl:top-1/2 left-1/2 -translate-x-1/2 lg:left-[calc(50%+70px)] lg:-translate-x-0 -translate-y-2/8 lg:-translate-y-1/2 bg-black/50 px-6 py-6 md:px-12 md:py-16 lg:px-6 lg:py-6 2xl:py-16 w-full flex flex-col gap-5"
                            >
                                <button
                                    className="bg-black/50 rounded-full p-2 border border-white cursor-pointer md:hidden
                                    absolute
                                        top-0 right-0 transform translate-x-10 -translate-y-10
                                        md:top-1/2 md:right-auto md:-translate-x-40 md:-translate-y-12
                                    "
                                    onClick={() => setInfoOpen(!infoOpen)}
                                >
                                    {/* {infoOpen ? (
                                        <Minus
                                            size={isMobile ? 48 : 72}
                                            stroke="white"
                                        />
                                    ) : (
                                        <Plus
                                            size={isMobile ? 48 : 72}
                                            fill="white"
                                        />
                                    )} */}
                                    {/* MOBILE (48px) */}
                                    <div className="block lg:hidden">
                                        {infoOpen ? (
                                            <Minus size={48} stroke="white" />
                                        ) : (
                                            <Plus size={48} fill="white" />
                                        )}
                                    </div>

                                    {/* DESKTOP default (72px) — hidden on lg */}
                                    <div className="hidden lg:block 2xl:hidden">
                                        {infoOpen ? (
                                            <Minus size={34} stroke="white" />
                                        ) : (
                                            <Plus size={34} fill="white" />
                                        )}
                                    </div>

                                    {/* LG and above (24px) */}
                                    <div className="hidden 2xl:block">
                                        {infoOpen ? (
                                            <Minus size={24} stroke="white" />
                                        ) : (
                                            <Plus size={24} fill="white" />
                                        )}
                                    </div>
                                </button>
                                {data?.[currentSlide]?.description && (
                                    <div
                                        className="flex flex-col gap-5"
                                        dangerouslySetInnerHTML={{
                                            __html: he.decode(
                                                data[currentSlide].description,
                                            ),
                                        }}
                                    />
                                )}
                                {/* {Array.isArray(additionalInfo) && additionalInfo.length > 0 && additionalInfo.map((item) => {
                                    // Title / Main heading
                                    if (item.record_id === "0") {
                                        return (
                                            <Text
                                                key={item.record_id}
                                                font="helvetica"
                                                size="xl3"
                                                weight="normal"
                                                color="white"
                                                className="text-xl lg:text-3xl"
                                            >
                                                {item.title}
                                            </Text>
                                        );
                                    }

                                    // Paragraph
                                    if (item.record_id === "5") {
                                        return (
                                            <Text
                                                key={item.record_id}
                                                font="helvetica"
                                                size="xl2"
                                                weight="normal"
                                                color="white"
                                                className="text-lg lg:text-2xl"
                                            >
                                                {item.title}
                                            </Text>
                                        );
                                    }

                                    // Lens heading
                                    if (item.record_id === "1") {
                                        return (
                                            <Text
                                                key={item.record_id}
                                                font="helvetica"
                                                size="xl2"
                                                weight="normal"
                                                color="white"
                                                className="text-lg lg:text-2xl"
                                            >
                                                {item.title}
                                            </Text>
                                        );
                                    }

                                    // Lens items
                                    if (item.record_id === "2" || item.record_id === "3") {
                                        return (
                                            <div key={item.record_id} className="flex items-center gap-5">
                                                <Image
                                                    src="/images/home/lens/log.png"
                                                    alt={item.title.toLowerCase()}
                                                    width={280}
                                                    height={100}
                                                />
                                                <Text
                                                    font="helvetica"
                                                    size="xl2"
                                                    weight="bold"
                                                    color="white"
                                                    className="text-lg lg:text-2xl"
                                                >
                                                    {item.title}
                                                </Text>
                                            </div>
                                        );
                                    }

                                    // Link
                                    if (item.record_id === "4") {
                                        return (
                                            <Link
                                                key={item.record_id}
                                                href={item.url || "#"}
                                                className="flex justify-start items-center gap-4"
                                            >
                                                <Text
                                                    font="helvetica"
                                                    size="xl2"
                                                    weight="normal"
                                                    color="white"
                                                    className="italic text-lg lg:text-2xl"
                                                >
                                                    {item.title}
                                                </Text>
                                                <ArrowRight size={24} stroke="white" />
                                            </Link>
                                        );
                                    }

                                    return null;
                                })} */}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2 px-4 w-[90%] sm:w-full md:w-[65%] bg-black/80 h-12 lg:h-16 rounded-full flex justify-center items-center z-10">
                <div className="basis-1/2"></div>
                {Array.isArray(additionalInfo) &&
                    additionalInfo.length > 0 &&
                    data?.map((slide, index) => (
                        <div
                            key={index}
                            className="flex-1 basis-full flex justify-center items-center h-full"
                        >
                            <button
                                onClick={() => setCurrentSlide(index)}
                                className={cn(
                                    "relative h-full pt-1 px-3 lg:px-8 cursor-pointer transition-all duration-300",
                                    currentSlide === index
                                        ? "text-white"
                                        : "text-font-secondary",
                                )}
                            >
                                <Text
                                    font="helvetica"
                                    size="customText6"
                                    weight="bold"
                                    color="inherit"
                                    className="whitespace-nowrap text-xs lg:text-lg 2xl:text-2xl"
                                >
                                    {slide.buttontext}
                                </Text>
                                <div
                                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-1 rounded-full transition-all duration-500 ${currentSlide === index ? "bg-primary-100 w-[40%] lg:w-full" : "bg-transparent w-0"}`}
                                />
                            </button>
                        </div>
                    ))}
                <div className="flex-1/2"></div>
            </div>
        </div>
    );
}
