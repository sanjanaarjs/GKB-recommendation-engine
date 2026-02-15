"use client";

import Text from "@/components/generic/Text";
import LocationStore from "@/components/icons/LocationStore";
import Person from "@/components/icons/Person";
import { brandsMenuData, categoryMenuData } from "./menu.api";
import ChevronRight from "@/components/icons/ChevronRight";
import Image from "next/image";
import LocationPin from "@/components/icons/LocationPin";
import Headphone from "@/components/icons/Headphone";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import ChevronLeft from "@/components/icons/ChevronLeft";

type MobileMenuProps = {
    readonly setIsLoginPopup: (open: boolean) => void;
};

export default function MobileMenu({
    setIsLoginPopup,
}: Readonly<MobileMenuProps>) {
    const categories = [...categoryMenuData.columns, ...brandsMenuData.columns];
    const [showSubmenu, setShowSubmenu] = useState<string | null>(null);
    const currentCategory = categories.find(
        (category) => category.title === showSubmenu,
    );

    return (
        <div
            className="flex flex-col relative block-carousel"
            data-lenis-prevent
        >
            <motion.div
                className="absolute top-0 left-0 h-full bg-black"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "100%" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.3 }}
            ></motion.div>
            <motion.div
                className="pb-8 bg-black z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1 }}
            >
                <div className="pl-10 pr-12 pt-12 pb-8 flex justify-start gap-2">
                    <button
                        className="primary-button cursor-pointer"
                        onClick={() => setIsLoginPopup(true)}
                    >
                        <Person size={20} stroke="var(--font-secondary)" />
                        <Text as="span" font="avenir" size="sm" color="inherit">
                            Login
                        </Text>
                    </button>
                    <button className="primary-button">
                        <LocationStore
                            size={20}
                            stroke="var(--font-secondary)"
                        />
                        <Text as="span" font="avenir" size="sm" color="inherit">
                            Track my order
                        </Text>
                    </button>
                </div>
                <div className="pl-10 pr-12">
                    <hr className="border-font-secondary" />
                </div>
            </motion.div>
            <motion.div
                className="h-[calc(100vh-150px-56px)] bg-black overflow-y-auto pb-12 z-10 overflow-x-hidden"
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -100, opacity: 0 }}
                transition={{ duration: 0.3 }}
            >
                <div
                    className="w-[200%] flex transition-all duration-500"
                    style={{
                        transform: `translateX(-${showSubmenu !== null ? "50%" : "0%"}`,
                    }}
                >
                    <div className="w-1/2">
                        <div className="px-12 flex flex-col gap-4">
                            {categories.map((category, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between cursor-pointer"
                                    onClick={() =>
                                        setShowSubmenu(category.title)
                                    }
                                >
                                    <Text
                                        as="h2"
                                        font="avenir"
                                        size="base"
                                        color="white"
                                    >
                                        {category.mobileTitle}
                                    </Text>
                                    {category.items.length > 0 && (
                                        <ChevronRight size={16} fill="white" />
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="pt-8 flex flex-col gap-4 px-12">
                            <Text
                                as="h2"
                                font="avenir"
                                size="base"
                                color="white"
                            >
                                About us
                            </Text>
                            <Text
                                as="h2"
                                font="avenir"
                                size="base"
                                color="white"
                            >
                                News & Stories
                            </Text>
                            <Text
                                as="h2"
                                font="avenir"
                                size="base"
                                color="white"
                            >
                                Lens guide
                            </Text>
                            <div className="flex items-center gap-3">
                                <Image
                                    src="/images/header/mb1.png"
                                    alt="logo"
                                    width={24}
                                    height={17}
                                />
                                <Text
                                    as="span"
                                    font="avenir"
                                    size="base"
                                    color="white"
                                >
                                    Book a Home service
                                </Text>
                            </div>
                            <div className="flex items-center gap-3">
                                <LocationPin
                                    size={24}
                                    fill="var(--font-secondary)"
                                />
                                <Text
                                    as="span"
                                    font="avenir"
                                    size="base"
                                    color="white"
                                >
                                    Locate a store near me
                                </Text>
                            </div>
                            <div className="flex items-center gap-3">
                                <Headphone
                                    size={24}
                                    stroke="var(--font-secondary)"
                                />
                                <Text
                                    as="span"
                                    font="avenir"
                                    size="base"
                                    color="white"
                                >
                                    Contact us
                                </Text>
                            </div>
                        </div>

                        <div className="pt-8 flex flex-col gap-4 px-12">
                            <Text
                                as="p"
                                font="avenir"
                                size="sm"
                                color="fontSecondary"
                            >
                                Also explore
                            </Text>
                            <div className="flex flex-col gap-6">
                                {categoryMenuData.alsoExplore.map((item) => (
                                    <div
                                        key={item.label}
                                        className="flex flex-col items-start gap-2 cursor-pointer"
                                    >
                                        <div className="aspect-video w-full relative">
                                            <Image
                                                src={item.image}
                                                alt={item.label}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <Text
                                            as="span"
                                            font="avenir"
                                            size="base"
                                            color="white"
                                        >
                                            {item.label}
                                        </Text>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Submenu Items */}
                    <div className="w-1/2">
                        <AnimatePresence>
                            {showSubmenu !== null && (
                                <motion.div
                                    className="px-12 pt-4 flex flex-col gap-4"
                                    initial={{ opacity: 0, y: 200 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 200 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="flex items-center justify-between gap-2">
                                        <button
                                            onClick={() => setShowSubmenu(null)}
                                            className="cursor-pointer"
                                        >
                                            <ChevronLeft
                                                size={16}
                                                fill="white"
                                            />
                                        </button>
                                        <Text
                                            as="h2"
                                            font="avenir"
                                            size="base"
                                            color="white"
                                        >
                                            {currentCategory?.mobileTitle}
                                        </Text>
                                        <span></span>
                                    </div>
                                    <div className="flex flex-col gap-4 pt-4">
                                        {currentCategory?.items.map(
                                            (item, index) => (
                                                <Text
                                                    key={index}
                                                    as="h2"
                                                    font="avenir"
                                                    size="base"
                                                    color="white"
                                                >
                                                    {item}
                                                </Text>
                                            ),
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
