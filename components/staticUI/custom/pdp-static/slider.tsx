"use client";

import Text from "@/components/generic/Text";
import ArrowDown from "@/components/icons/ArrowDown";
import ArrowLeftThin from "@/components/icons/ArrowLeftThin";
import ArrowRightThin from "@/components/icons/ArrowRightThin";
import ArrowUp from "@/components/icons/ArrowUp";
import Close from "@/components/icons/Close";
import Heart from "@/components/icons/Heart";
import Minus from "@/components/icons/Minus";
import Plus from "@/components/icons/Plus";
import TruckDelivery from "@/components/icons/TruckDelivery";
import TryOn from "@/components/icons/TryOn";
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import StoreAvailabilitySheet from "./storeAvailability";
import LensFlow from "./lens-flow/LensFlow";

export default function Slider() {
    const [api, setApi] = useState<CarouselApi | null>(null);
    const [api2, setApi2] = useState<CarouselApi | null>(null);
    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const [showAllVariants, setShowAllVariants] = useState<boolean>(false);
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [openLensFlow, setOpenLensFlow] = useState<boolean>(false);

    api?.on("select", () => {
        setCurrentSlide(api?.selectedScrollSnap() ?? 0);
    });

    const images = [
        "/images/pdp/slider/slide1.png",
        "/images/pdp/slider/slide2.png",
        "/images/pdp/slider/slide3.png",
    ];

    const variants = [
        {
            id: 1,
            image: "/images/pdp/slider/slide1.png",
            href: "#",
            color: "brown",
        },
        {
            id: 2,
            image: "/images/pdp/slider/slide2.png",
            href: "#",
            color: "green",
        },
        {
            id: 3,
            image: "/images/pdp/slider/slide3.png",
            href: "#",
            color: "grey",
        },
        {
            id: 4,
            image: "/images/pdp/slider/slide1.png",
            href: "#",
            color: "blue",
        },
        {
            id: 5,
            image: "/images/pdp/slider/slide2.png",
            href: "#",
            color: "yellow",
        },
        {
            id: 6,
            image: "/images/pdp/slider/slide3.png",
            href: "#",
            color: "red",
        },
    ];

    return (
        <div className="px-0 lg:px-20 py-6 lg:py-8 bg-background-grey flex flex-col gap-4">
            <div className="px-10 lg:px-0 flex justify-between items-start w-full">
                <div className="flex flex-col lg:flex-row justify-between items-start w-full">
                    <div>
                        <Image
                            src="/images/pdp/slider/logo1.png"
                            alt="logo"
                            width={111}
                            height={72}
                            className="hidden lg:block"
                        />
                        <Text
                            as="p"
                            size="sm"
                            weight="normal"
                            color="fontMain"
                            font="helvetica"
                            className="block lg:hidden"
                        >
                            Persol
                        </Text>
                    </div>
                    <div className="flex flex-col items-start lg:items-center">
                        <Text
                            as="h2"
                            size="xl4"
                            weight="fontblack"
                            color="fontMain"
                            font="avenir"
                            className="text-base lg:text-4xl"
                        >
                            Black Arrow
                        </Text>
                        <div className="flex items-center gap-2">
                            <Text
                                as="p"
                                size="base"
                                weight="normal"
                                color="fontMain"
                                font="helvetica"
                                className="text-xs lg:text-base text-font-main lg:text-black"
                            >
                                New
                            </Text>
                            <div className="w-1.5 h-1.5 bg-black/60 lg:bg-black rounded-full"></div>
                            <Text
                                as="p"
                                size="base"
                                weight="normal"
                                color="fontMain"
                                font="helvetica"
                                className="text-xs lg:text-base text-font-main lg:text-black"
                            >
                                Polarized Lenses
                            </Text>
                            <div className="w-1.5 h-1.5 bg-black/60 lg:bg-black rounded-full"></div>
                            <Text
                                as="p"
                                size="base"
                                weight="normal"
                                color="fontMain"
                                font="helvetica"
                                className="text-xs lg:text-base text-font-main lg:text-black"
                            >
                                Handmade in Italy
                            </Text>
                        </div>
                    </div>
                    <div></div>
                </div>
                <div className="flex items-center gap-3 lg:gap-6">
                    <button className="py-2 px-2 lg:px-4 bg-white shadow-lg shadow-black/20 rounded-4xl flex items-center gap-2 cursor-pointer">
                        <TryOn size={24} />
                        <Text
                            as="p"
                            size="xl"
                            weight="bold"
                            color="fontMain"
                            font="helvetica"
                            className="hidden lg:block whitespace-nowrap"
                        >
                            try them on
                        </Text>
                    </button>
                    <button className="cursor-pointer">
                        <Heart size={64} />
                    </button>
                </div>
            </div>

            <div className="flex gap-4 relative">
                <div className="hidden lg:flex flex-col items-center gap-4 pt-6 absolute left-0 top-0 z-10">
                    <button
                        className="cursor-pointer"
                        onClick={() => api2?.scrollPrev()}
                    >
                        <ArrowUp />
                    </button>
                    <Carousel
                        orientation="vertical"
                        setApi={setApi2}
                        opts={{ loop: true, dragFree: true }}
                    >
                        <CarouselContent className="h-[200px] xl:h-[284px]">
                            {variants.map((variant, index) => (
                                <CarouselItem key={index} className="basis-1/3">
                                    <Link href={variant.href}>
                                        <Image
                                            src={variant.image}
                                            alt="variant"
                                            className="lg:w-[110px] xl:w-[147px]"
                                            width={147}
                                            height={70}
                                        />
                                    </Link>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                    <button
                        className="cursor-pointer"
                        onClick={() => api2?.scrollNext()}
                    >
                        <ArrowDown />
                    </button>
                </div>
                <div>
                    <Carousel
                        className="w-full"
                        setApi={setApi}
                        opts={{ loop: true }}
                    >
                        <CarouselContent>
                            {images.map((image, index) => (
                                <CarouselItem
                                    key={index}
                                    className="flex justify-center items-center"
                                >
                                    <Image
                                        src={image}
                                        alt="image"
                                        className="w-[393px] md:w-[440px] lg:w-[544px] xl:w-[775px]"
                                        width={775}
                                        height={384}
                                    />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                </div>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10 border-y border-black hidden lg:flex justify-center">
                    <div className="flex justify-center items-center gap-6 px-4 xl:px-6 py-3">
                        <button
                            className="cursor-pointer"
                            onClick={() => api?.scrollPrev()}
                        >
                            <ArrowLeftThin size={24} />
                        </button>
                        <button
                            className="cursor-pointer"
                            onClick={() => api?.scrollNext()}
                        >
                            <ArrowRightThin size={24} />
                        </button>
                    </div>
                    <div className="px-4 xl:px-6 py-3 border-l border-black">
                        <Text
                            as="p"
                            size="xl"
                            weight="normal"
                            color="fontMain"
                            font="helvetica"
                        >
                            {`${currentSlide + 1} / ${images.length}`}
                        </Text>
                    </div>
                </div>
            </div>
            <div className="flex lg:hidden gap-1.5 justify-center pt-8 pb-6">
                {images.map((_, index) => (
                    <button
                        key={index}
                        className={`border border-black rounded-full w-1.5 h-1.5 cursor-pointer ${currentSlide === index ? "bg-black" : "bg-white"}`}
                        onClick={() => api?.scrollTo(index)}
                    ></button>
                ))}
            </div>

            <div className="lg:mt-20 px-10 lg:px-0">
                <div className="lg:bg-white flex flex-col lg:flex-row">
                    <div className="lg:px-8 xl:px-16 py-6 lg:py-8 flex flex-col justify-between gap-6 lg:gap-12">
                        <div>
                            <table>
                                <tbody>
                                    <tr>
                                        <td className="pr-12">
                                            <Text
                                                as="p"
                                                size="base"
                                                weight="light"
                                                color="fontMain"
                                                font="helvetica"
                                                className="text-sm lg:text-base"
                                            >
                                                Model:
                                            </Text>
                                        </td>
                                        <td>
                                            <Text
                                                as="p"
                                                size="base"
                                                weight="bold"
                                                color="fontMain"
                                                font="helvetica"
                                                className="text-sm lg:text-base"
                                            >
                                                P03310S
                                            </Text>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="pr-12">
                                            <Text
                                                as="p"
                                                size="base"
                                                weight="light"
                                                color="fontMain"
                                                font="helvetica"
                                                className="text-sm lg:text-base"
                                            >
                                                Size
                                            </Text>
                                        </td>
                                        <td>
                                            <Text
                                                as="p"
                                                size="base"
                                                weight="bold"
                                                color="fontMain"
                                                font="helvetica"
                                                className="text-sm lg:text-base"
                                            >
                                                Medium
                                            </Text>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <Text
                            as="p"
                            size="xl"
                            weight="bold"
                            color="fontMain"
                            font="helvetica"
                            className="text-sm lg:text-xl"
                        >
                            In Stock
                        </Text>
                    </div>
                    <div className="lg:hidden flex gap-2 pb-4">
                        <div className="flex gap-2">
                            {variants
                                .slice(0, showAllVariants ? variants.length : 3)
                                .map((variant, index) => (
                                    <Link
                                        href={variant.href}
                                        key={index}
                                        className={`w-12 h-12 p-1 rounded-full cursor-pointer ${index === 0 ? "border" : ""}`}
                                        style={{ borderColor: variant.color }}
                                    >
                                        <div
                                            className={`w-full h-full rounded-full`}
                                            style={{
                                                backgroundColor: variant.color,
                                                borderColor: variant.color,
                                            }}
                                        ></div>
                                    </Link>
                                ))}
                        </div>
                        <button
                            className="cursor-pointer flex items-center gap-2"
                            onClick={() => setShowAllVariants(!showAllVariants)}
                        >
                            {showAllVariants ? (
                                <Minus size={16} stroke="black" />
                            ) : (
                                <Plus size={16} fill="black" />
                            )}
                            <Text
                                as="p"
                                size="sm"
                                weight="normal"
                                color="fontMain"
                                font="helvetica"
                            >
                                {showAllVariants ? "Less" : "More"}
                            </Text>
                        </button>
                    </div>
                    <div className="border-x border-border-color-light px-8 xl:px-16 py-4 lg:py-8 hidden lg:flex flex-col justify-between gap-10 relative">
                        <Text
                            as="p"
                            size="base"
                            weight="light"
                            color="fontMain"
                            font="helvetica"
                        >
                            Select lenses and <br />
                            add your prescription
                        </Text>
                        <button
                            className="primary-button-black px-16 py-3 cursor-pointer"
                            onClick={() => setOpenLensFlow(true)}
                        >
                            <Text
                                as="p"
                                size="xl"
                                weight="bold"
                                color="inherit"
                                font="helvetica"
                                className="whitespace-nowrap"
                            >
                                add lens
                            </Text>
                        </button>

                        <div className="absolute bottom-full left-0 w-full bg-primary-500 justify-between gap-4 px-4 py-2 hidden lg:flex">
                            <Text
                                as="p"
                                size="xs"
                                weight="normal"
                                color="fontMain"
                                font="helvetica"
                            >
                                Explore a world of top-quality premium lenses
                                crafted for your individual vision needs.
                            </Text>
                            <button className="cursor-pointer">
                                <Close size={18} fill="black" />
                            </button>
                        </div>
                    </div>
                    <div className="lg:px-8 xl:px-16 py-4 lg:py-8 flex flex-col justify-between gap-10">
                        <div>
                            <table>
                                <tbody>
                                    <tr>
                                        <td className="pr-4">
                                            <Text
                                                as="p"
                                                size="base"
                                                weight="light"
                                                color="fontMain"
                                                font="helvetica"
                                                className="text-sm lg:text-base"
                                            >
                                                GKB Price:
                                            </Text>
                                        </td>
                                        <td className="pr-4">
                                            <Text
                                                as="p"
                                                size="xl"
                                                weight="fontblack"
                                                color="fontMain"
                                                font="helvetica"
                                                className="text-sm lg:text-base"
                                            >
                                                ₹ 26,400
                                            </Text>
                                        </td>
                                        <td>
                                            <Text
                                                as="p"
                                                size="base"
                                                weight="light"
                                                color="fontMain"
                                                font="helvetica"
                                                className="text-sm lg:text-base"
                                            >
                                                (20% Off)
                                            </Text>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="pr-4">
                                            <Text
                                                as="p"
                                                size="base"
                                                weight="light"
                                                color="fontMain"
                                                font="helvetica"
                                                className="text-sm lg:text-base"
                                            >
                                                MRP:
                                            </Text>
                                        </td>
                                        <td className="pr-4">
                                            <Text
                                                as="p"
                                                size="xl"
                                                weight="fontblack"
                                                color="fontMain"
                                                font="helvetica"
                                                className="line-through text-sm lg:text-base"
                                            >
                                                ₹ 33,000
                                            </Text>
                                        </td>
                                        <td>
                                            <Text
                                                as="p"
                                                size="base"
                                                weight="light"
                                                color="fontMain"
                                                font="helvetica"
                                                className="text-sm lg:text-base"
                                            >
                                                (with GST)
                                            </Text>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="hidden lg:flex flex-col xl:flex-row gap-6">
                            <div className="flex justify-center items-end">
                                <button className="secondary-button px-16 py-3 cursor-pointer">
                                    <Text
                                        as="p"
                                        size="xl"
                                        weight="bold"
                                        color="inherit"
                                        font="helvetica"
                                        className="whitespace-nowrap"
                                    >
                                        add to cart
                                    </Text>
                                </button>
                            </div>
                            <button
                                className="py-3 flex items-center gap-2 cursor-pointer"
                                onClick={() => setIsSheetOpen(true)}
                            >
                                <Plus size={24} fill="black" />
                                <Text
                                    as="p"
                                    size="xl"
                                    weight="normal"
                                    color="inherit"
                                    font="helvetica"
                                >
                                    Check in-store availability
                                </Text>
                            </button>
                            {/* Store Availability Sheet */}
                            <StoreAvailabilitySheet
                                isOpen={isSheetOpen}
                                onClose={() => setIsSheetOpen(false)}
                            />
                        </div>
                    </div>
                </div>
                <div className="bg-border-grey px-8 py-4 hidden lg:flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <Text
                            as="p"
                            size="base"
                            weight="normal"
                            color="fontMain"
                            font="helvetica"
                        >
                            Free shipping
                        </Text>
                        <div className="w-1.5 h-1.5 bg-black/60 lg:bg-black rounded-full"></div>
                        <Text
                            as="p"
                            size="base"
                            weight="normal"
                            color="fontMain"
                            font="helvetica"
                        >
                            EMI options available
                        </Text>
                        <div className="w-1.5 h-1.5 bg-black/60 lg:bg-black rounded-full"></div>
                        <Text
                            as="p"
                            size="base"
                            weight="normal"
                            color="fontMain"
                            font="helvetica"
                        >
                            2 years warranty on manufacturing defects
                        </Text>
                    </div>
                    <div className="flex items-center gap-2">
                        <TruckDelivery size={24} stroke="black" />
                        <Text
                            as="p"
                            size="base"
                            weight="normal"
                            color="fontMain"
                            font="helvetica"
                        >
                            Expected delivery: 2-3 days
                        </Text>
                        <Text
                            as="p"
                            size="base"
                            weight="bold"
                            color="fontMain"
                            font="helvetica"
                        >
                            12 Jun, 2025 - 18 Jun, 2025
                        </Text>
                    </div>
                </div>
            </div>
            <div className="flex lg:hidden z-20 justify-between items-center fixed bottom-0 left-0 right-0 bg-background-grey px-6 py-4">
                <div>
                    <Text
                        as="p"
                        size="sm"
                        weight="normal"
                        color="fontMain"
                        font="helvetica"
                    >
                        Total
                    </Text>
                    <Text
                        as="p"
                        size="base"
                        weight="bold"
                        color="fontMain"
                        font="helvetica"
                    >
                        ₹ 26,640
                    </Text>
                </div>
                <div>
                    <button
                        className="primary-button-black px-8 py-2 cursor-pointer"
                        onClick={() => setOpenLensFlow(true)}
                    >
                        <Text
                            as="p"
                            size="sm"
                            weight="normal"
                            color="inherit"
                            font="helvetica"
                        >
                            add lens
                        </Text>
                    </button>
                </div>
                <div>
                    <button className="secondary-button px-8 py-2 cursor-pointer">
                        <Text
                            as="p"
                            size="sm"
                            weight="normal"
                            color="inherit"
                            font="helvetica"
                        >
                            add to cart
                        </Text>
                    </button>
                </div>
            </div>
            <LensFlow
                openLensFlow={openLensFlow}
                setOpenLensFlow={setOpenLensFlow}
            />
        </div>
    );
}
