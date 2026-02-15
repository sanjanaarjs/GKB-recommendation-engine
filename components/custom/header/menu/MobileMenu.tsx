"use client";

import Text from "@/components/generic/Text";
import LocationStore from "@/components/icons/LocationStore";
import Person from "@/components/icons/Person";
import ChevronRight from "@/components/icons/ChevronRight";
import Image from "next/image";
import Headphone from "@/components/icons/Headphone";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import ChevronLeft from "@/components/icons/ChevronLeft";
import { CategoryItem, CategoryLevel3 } from "./datas/menu.api";
import { ExploreMobileQueryResponse } from "./datas/explore.data.api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import { hasCookie } from "@/lib/cookie";
import { setLoggedIn } from "@/lib/store/features/authSlice";

export default function MobileMenu({
    setIsLoginPopup,
    category,
    exploreCategories,
    brandcategory,
    filteredCategories,
    setIsMenuOpen,
    isLogin,
    announcementsData,
}: {
    setIsLoginPopup: (open: boolean) => void;
    category: CategoryItem;
    exploreCategories: ExploreMobileQueryResponse;
    brandcategory: CategoryItem;
    filteredCategories: CategoryItem[];
    setIsMenuOpen: (open: boolean) => void;
    isLogin?: boolean;
    announcementsData: {
        name: string;
        link: string;
        buttontext: string;
        attachment: string;
    }[];
}) {
    const [showSubmenu, setShowSubmenu] = useState<CategoryLevel3[] | null>(
        null,
    );
    const [showsubhead, setShowSubhead] = useState<string | null>(null);
    const [showSubLink, setShowSubLink] = useState<string | null>(null);
    const isUserLoggedIn = useSelector(
        (state: RootState) => state.auth.isLoggedIn,
    );
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        async function checkCookie() {
            const result = await hasCookie("userToken");
            dispatch(setLoggedIn(result));
        }
        checkCookie();
    }, []);

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
                        onClick={() => {
                            setIsMenuOpen(false);
                            if (!isLogin) {
                                setIsLoginPopup(true);
                            } else {
                                router.push("/profile");
                            }
                        }}
                    >
                        <div className="relative">
                            <Person size={20} stroke="var(--font-secondary)" />
                            {isUserLoggedIn && (
                                <div className="absolute bg-[#129e12] w-2 h-2 rounded-full -top-0.5 right-[1px]"></div>
                            )}
                        </div>
                        <Text as="span" font="avenir" size="sm" color="inherit">
                            {isUserLoggedIn ? "My Profile" : "Login"}
                        </Text>
                    </button>
                    <button
                        className="primary-button cursor-pointer"
                        onClick={() => {
                            setIsMenuOpen(false);

                            if (!isUserLoggedIn) {
                                setIsLoginPopup(true);
                            } else {
                                router.push("/profile/orders");
                            }
                        }}
                    >
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
                        <div className="px-12 flex flex-col gap-4 mb-4">
                            {category?.children?.map((category) => (
                                <div
                                    className="flex items-center justify-between cursor-pointer"
                                    key={category.uid}
                                    onClick={() => {
                                        setShowSubmenu(
                                            category.children ?? null,
                                        );
                                        setShowSubLink(category.url_path);
                                    }}
                                >
                                    <Text
                                        as="h2"
                                        font="avenir"
                                        size="base"
                                        color="white"
                                    >
                                        {category.name}
                                    </Text>

                                    <ChevronRight size={16} fill="white" />
                                </div>
                            ))}
                        </div>
                        <div className="px-12 flex flex-col gap-4 mb-4">
                            {brandcategory && (
                                <div
                                    className="flex items-center justify-between cursor-pointer"
                                    onClick={() => {
                                        setShowSubmenu(
                                            brandcategory.children ?? null,
                                        );
                                        setShowSubhead(brandcategory.name);
                                    }}
                                >
                                    <Text
                                        as="h2"
                                        font="avenir"
                                        size="base"
                                        color="white"
                                    >
                                        {brandcategory.name}
                                    </Text>

                                    <ChevronRight size={16} fill="white" />
                                </div>
                            )}
                        </div>
                        <div className="px-12 flex flex-col gap-4">
                            {filteredCategories?.map(
                                (category: CategoryItem) => (
                                    <div
                                        key={category.uid}
                                        className="flex items-center justify-between cursor-pointer"
                                    >
                                        <Text
                                            as="h2"
                                            font="avenir"
                                            size="base"
                                            color="white"
                                        >
                                            {category.name}
                                        </Text>
                                    </div>
                                ),
                            )}
                        </div>

                        <div className="pt-8 flex flex-col gap-4 px-12">
                            {announcementsData[1]?.name && (
                                <div className="flex items-center gap-2 justify-start">
                                    {announcementsData?.[0]?.attachment && (
                                        <Image
                                            width={24}
                                            height={24}
                                            src={
                                                announcementsData[0].attachment
                                            }
                                            alt={
                                                announcementsData[0]?.name ??
                                                "announcement"
                                            }
                                        />
                                    )}

                                    <Link
                                        href={announcementsData[0]?.link}
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        <Text color="white" size="base">
                                            {announcementsData[0]?.buttontext}
                                        </Text>
                                    </Link>
                                </div>
                            )}
                            {announcementsData[0]?.name && (
                                <div className="flex items-center gap-2 ">
                                    {announcementsData?.[1]?.attachment && (
                                        <Image
                                            width={24}
                                            height={24}
                                            src={
                                                announcementsData[1].attachment
                                            }
                                            alt={
                                                announcementsData[1]?.name ??
                                                "announcement"
                                            }
                                        />
                                    )}

                                    <Link href={announcementsData[1]?.link}>
                                        <Text color="white" size="base">
                                            {announcementsData[1]?.buttontext}
                                        </Text>
                                    </Link>
                                </div>
                            )}
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
                                {exploreCategories?.data.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex flex-col items-start gap-2 cursor-pointer"
                                    >
                                        <div className="aspect-video w-full relative">
                                            {item.image && (
                                                <Image
                                                    src={item.image}
                                                    alt={item.title}
                                                    fill
                                                    className="object-cover"
                                                />
                                            )}
                                        </div>
                                        <Text
                                            as="span"
                                            font="avenir"
                                            size="base"
                                            color="white"
                                        >
                                            {item.title}
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
                                            className="test sub"
                                        >
                                            {showsubhead}
                                        </Text>
                                        <span></span>
                                    </div>
                                    <div className="flex flex-col gap-4 pt-4">
                                        {showSubmenu?.map((child) => (
                                            <Text
                                                key={child.uid}
                                                as="h2"
                                                font="avenir"
                                                size="base"
                                                color="white"
                                            >
                                                <Link
                                                    href={`/${child.url_path}`}
                                                    onClick={() =>
                                                        setIsMenuOpen(false)
                                                    }
                                                >
                                                    {child.name}
                                                </Link>
                                            </Text>
                                        ))}
                                        <Text
                                            as="h2"
                                            font="avenir"
                                            size="base"
                                            color="white"
                                            className="underline"
                                        >
                                            <Link
                                                href={`/${showSubLink}`}
                                                onClick={() =>
                                                    setIsMenuOpen(false)
                                                }
                                            >
                                                View All
                                            </Link>
                                        </Text>
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
