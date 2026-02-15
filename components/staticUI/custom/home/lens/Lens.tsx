"use client";

import Image from "next/image";
import { lensApi } from "./lens.api";
import { useEffect, useRef, useState } from "react";
import Text from "@/components/generic/Text";
import { cn } from "@/lib/utils";
import Plus from "@/components/icons/Plus";
import Minus from "@/components/icons/Minus";
import Link from "next/link";
import ArrowRight from "@/components/icons/ArrowRight";
import { AnimatePresence, motion } from "motion/react";
import { useResponsive } from "@/lib/hooks/useResponsive";

export default function Lens() {
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

    return (
        <div className="w-full h-screen relative">
            {lensApi.slides.map((slide, index) => (
                <div
                    key={index}
                    className={cn(
                        "w-full h-full absolute top-0 left-0 transition-opacity duration-500 flex justify-center items-end",
                        currentSlide === index ? "opacity-100" : "opacity-0",
                    )}
                >
                    <Image
                        src={slide.image}
                        alt={slide.title}
                        fill
                        className="object-cover"
                    />
                    <div className="z-10 pb-48 lg:pb-56">
                        <Text
                            font="helvetica"
                            size="xl5"
                            weight="light"
                            color="white"
                            className="text-center text-3xl lg:text-5xl leading-8 lg:leading-16"
                        >
                            {slide.description}
                        </Text>
                    </div>
                </div>
            ))}
            <div className="absolute left-1/2 -translate-x-1/2 top-20 w-3/4 sm:w-2/3 md:w-1/2 lg:w-1/3 h-1/2 z-20">
                <Image
                    src="/images/home/lens/mirror.png"
                    alt="lens-bg"
                    fill
                    className="object-contain opacity-50"
                />
                <div className="relative w-full h-full flex justify-center items-center">
                    <button
                        className="bg-black/50 rounded-full p-2 border border-white cursor-pointer"
                        onClick={() => setInfoOpen(!infoOpen)}
                    >
                        {infoOpen ? (
                            <Minus size={isMobile ? 48 : 72} stroke="white" />
                        ) : (
                            <Plus size={isMobile ? 48 : 72} fill="white" />
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
                                className="absolute top-full lg:top-1/2 left-1/2 -translate-x-1/2 lg:left-[calc(50%+70px)] lg:-translate-x-0 -translate-y-2/8 lg:-translate-y-1/2 bg-black/50 px-12 py-16 w-full flex flex-col gap-5"
                            >
                                <Text
                                    font="helvetica"
                                    size="xl3"
                                    weight="normal"
                                    color="white"
                                    className="text-xl lg:text-3xl"
                                >
                                    For outdoor comfort
                                </Text>
                                <Text
                                    font="helvetica"
                                    size="xl2"
                                    weight="normal"
                                    color="white"
                                    className="text-lg lg:text-2xl"
                                >
                                    Defy glare and embrace the view with
                                    high-performance lenses that blend sun
                                    protection, style and razor-sharp vision
                                    wherever you go.
                                    <br />
                                    <br />
                                    Recommended lenses:
                                </Text>
                                <div className="flex items-center gap-5">
                                    <Image
                                        src="/images/home/lens/log.png"
                                        alt="polarized"
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
                                        Classic
                                    </Text>
                                </div>
                                <div className="flex items-center gap-5">
                                    <Image
                                        src="/images/home/lens/log.png"
                                        alt="polarized"
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
                                        Thin
                                    </Text>
                                </div>
                                <Link
                                    href="#"
                                    className="flex justify-start items-center gap-4"
                                >
                                    <Text
                                        font="helvetica"
                                        size="xl2"
                                        weight="normal"
                                        color="white"
                                        className="italic text-lg lg:text-2xl"
                                    >
                                        Learn more from our Lens Guide
                                    </Text>
                                    <ArrowRight size={24} stroke="white" />
                                </Link>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2 px-4 sm:w-3/4 bg-black/80 h-12 lg:h-16 rounded-full flex justify-center items-center z-10">
                <div className="basis-1/2"></div>
                {lensApi.slides.map((slide, index) => (
                    <div
                        key={index}
                        className="flex-1 basis-full flex justify-center items-center h-full"
                    >
                        <button
                            onClick={() => setCurrentSlide(index)}
                            className={cn(
                                "relative h-full pt-1 px-4 lg:px-8 cursor-pointer transition-all duration-300",
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
                                className="whitespace-nowrap text-base lg:text-2xl"
                            >
                                {slide.title}
                            </Text>
                            <div
                                className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-1 rounded-full transition-all duration-500 ${currentSlide === index ? "bg-primary-100 w-full" : "bg-transparent w-0"}`}
                            />
                        </button>
                    </div>
                ))}
                <div className="flex-1/2"></div>
            </div>
        </div>
    );
}
