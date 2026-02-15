"use client";

import { useEffect, useRef, useState } from "react";
import { transformServicesData } from "./services.api";
import Image from "next/image";
import Plus from "@/components/icons/Plus";
import Text from "@/components/generic/Text";
import { cn } from "@/lib/utils";
import Close from "@/components/icons/Close";
import Link from "next/link";
import { useResponsive } from "@/lib/hooks/useResponsive";
import { AnimatePresence, motion } from "motion/react";
import { ItemData } from "@/lib/services/magento/homepageData";
import { toSentenceCase } from "@/lib/store/commonFunction/sentenceFormat";

interface IServiceProps {
    data: ItemData[] | [];
}

export default function Services({ data }: IServiceProps) {
    const [current, setCurrent] = useState<number>(0);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const closeButton = useRef<HTMLButtonElement>(null);
    const positionRef = useRef<{ [slide: number]: number }>({});
    const { isDesktop } = useResponsive();

    const position = () => {
        if (closeButton.current) {
            closeButton.current.style.left = `${positionRef.current[current]}px`;
        }
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            const sliderTitle = document.querySelectorAll(".slider-title");
            sliderTitle.forEach((title, index) => {
                const e: DOMRect = (
                    title as HTMLElement
                ).getBoundingClientRect();
                positionRef.current[index] = e.x + e.width - 150;
            });
            position();
        }, 800);
        return () => clearTimeout(timeout);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        position();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [current]);

    const serviceData =
        data && Array.isArray(data) && data.length > 0
            ? transformServicesData(data)
            : [];
    const bannerImage =
        data && Array.isArray(data) && data.length > 0
            ? data?.[0]?.attachment
            : "";

    return (
        <div className="w-full h-screen relative flex justify-center items-end overflow-hidden">
            {serviceData.map((service, index) => (
                <div
                    key={index}
                    className={cn(
                        "w-full h-full absolute top-0 left-0 transition-all duration-1000 flex justify-start items-center md:items-end p-24",
                        index === current && isOpen
                            ? "opacity-100"
                            : "opacity-0",
                        index < current && "-translate-x-1/5",
                        index > current && "translate-x-1/5",
                        index === current && "translate-x-0",
                    )}
                >
                    {service.img && (
                        <Image
                            src={isDesktop ? service.img : service.imgMob}
                            alt={service.title}
                            fill
                            className="w-full h-full object-cover"
                        />
                    )}
                    <div
                        className={cn("z-10 flex-col w-1/2 hidden lg:flex")}
                        style={{
                            transform: `translateX(${120 * index}px)`,
                        }}
                    >
                        <Text
                            as="h2"
                            size="xl6"
                            weight="light"
                            font="helvetica"
                            color="white"
                            className="text-left pb-6 text-3xl 2xl:text-4xl leading-[1.5]"
                        >
                            {service.description}
                        </Text>
                        <div className="w-fit mt-6">
                            <Link
                                href={service.link}
                                className="secondary-button px-16 py-4 rounded-full"
                            >
                                <Text
                                    size="base"
                                    weight="bold"
                                    font="helvetica"
                                    color="inherit"
                                >
                                    {service.linkText}
                                </Text>
                            </Link>
                        </div>
                    </div>
                </div>
            ))}

            {bannerImage && bannerImage?.trim()?.length > 0 && (
                <Image
                    src={bannerImage}
                    alt={`image_${bannerImage}`}
                    fill
                    className={cn(
                        "w-full h-full object-cover transition-all duration-1000",
                        !isOpen ? "opacity-100" : "opacity-0",
                    )}
                />
            )}

            <div className="bg-gradient-to-t from-black/40 to-transparent absolute top-0 left-0 w-full h-full"></div>

            <div
                className={cn(
                    "absolute top-0 left-0 h-full w-full flex justify-center items-center transition-all duration-500",
                    isOpen ? "opacity-100 visible" : "opacity-0 invisible",
                )}
            >
                <div className="flex flex-col gap-6 lg:gap-20 justify-end lgjustify-center items-center p-16 lg:rotate-270 origin-center h-full w-full lg:h-[100vw] lg:w-[100vh]">
                    {serviceData.map((service, index) => (
                        <div
                            key={index}
                            className={cn(
                                "cursor-pointer w-full flex flex-col items-start justify-end relative transition-all duration-300 border-b-2 border-white/70 lg:border-white slider-title",
                                current === index && "lg:flex-1",
                            )}
                            onClick={() => setCurrent(index)}
                        >
                            <Text
                                as="h2"
                                size="customText12"
                                weight="bold"
                                font="helvetica"
                                color="white"
                                className="text-left text-2xl lg:text-4xl pb-6 hidden lg:block"
                            >
                                {service.title}
                            </Text>

                            <Text
                                as="h2"
                                size="xl4"
                                weight="bold"
                                font="helvetica"
                                color="white"
                                className={cn(
                                    "text-left text-2xl lg:text-4xl block lg:hidden transition-all duration-300",
                                    current === index
                                        ? "text-primary-100 pb-3"
                                        : "pb-6",
                                )}
                            >
                                {service.title}
                            </Text>
                            <AnimatePresence>
                                {current === index && (
                                    <motion.div
                                        className={cn(
                                            "w-full overflow-hidden block lg:hidden",
                                        )}
                                        initial={{ height: 0 }}
                                        animate={{ height: "auto" }}
                                        exit={{ height: 0 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <Text
                                            as="p"
                                            size="customText8"
                                            weight="light"
                                            font="helvetica"
                                            color="white"
                                            className="text-left pb-6"
                                        >
                                            {service.description}
                                        </Text>
                                        <div className="w-fit mb-6">
                                            <Link
                                                href={service.link}
                                                className="text-white primary-button py-4 px-12 rounded-full"
                                            >
                                                <Text
                                                    weight="normal"
                                                    font="helvetica"
                                                    color="white"
                                                    className="text-lg md:text-xl"
                                                >
                                                    {service.linkText}
                                                </Text>
                                            </Link>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>

            <button
                ref={closeButton}
                className={cn(
                    "absolute transition-all duration-500 top-16 p-4 z-20 bg-white/10 rounded-full border border-white cursor-pointer hidden lg:block",
                    isOpen ? "opacity-100 visible" : "opacity-0 invisible",
                )}
                onClick={() => {
                    setIsOpen(false);
                    setCurrent(0);
                }}
            >
                <Close size={42} fill="white" />
            </button>
            <button
                className={cn(
                    "absolute transition-all duration-500 top-4 right-4 p-4 z-20 cursor-pointer block lg:hidden",
                    isOpen ? "opacity-100 visible" : "opacity-0 invisible",
                )}
                onClick={() => {
                    setIsOpen(false);
                    setCurrent(0);
                }}
            >
                <Close size={48} fill="white" />
            </button>

            <div
                className={cn(
                    "z-20 flex justify-around w-full items-center flex-col lg:flex-row gap-10 lg:gap-4 pb-16 transition-all duration-500",
                    isOpen ? "opacity-0 invisible" : "opacity-100 visible",
                )}
            >
                <div className="basis-1/2 hidden lg:block"></div>
                {serviceData.map((service, index) => (
                    <div
                        key={index}
                        className={cn(
                            "cursor-pointer flex-1 basis-full flex flex-row lg:flex-col items-center justify-start lg:justify-center relative transition-all duration-300 w-4/5 md:w-3/4 lg:w-auto gap-6 lg:gap-0",
                        )}
                        onClick={() => {
                            setCurrent(index);
                            setIsOpen(true);
                            position();
                        }}
                    >
                        <button className="bg-white/10 rounded-full border border-white cursor-pointer">
                            <Plus size={!isDesktop ? 48 : 72} fill="white" />
                        </button>
                        <div>
                            <Text
                                as="h2"
                                size="customText9"
                                weight="bold"
                                font="helvetica"
                                color="primary100"
                                className="text-left lg:text-center leading-normal lg:mt-16"
                            >
                                {toSentenceCase(service.title)}
                            </Text>
                            <Text
                                as="p"
                                size="customText9"
                                weight="normal"
                                font="helvetica"
                                color="white"
                                className="text-left lg:text-center leading-normal mt-2 lg:w-64"
                            >
                                {service.subtitle}
                            </Text>
                        </div>
                        {index !== serviceData.length - 1 && (
                            <>
                                <div className="w-0.5 bg-white/60 h-full absolute top-0 right-0 hidden lg:block"></div>
                                <div className="w-full bg-white/60 h-0.5 absolute -bottom-5 left-0 block lg:hidden"></div>
                            </>
                        )}
                    </div>
                ))}
                <div className="basis-1/2 hidden lg:block"></div>
            </div>
        </div>
    );
}
