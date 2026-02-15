"use client";

import Text from "@/components/generic/Text";
import Bag from "@/components/icons/Bag";
import Menu from "@/components/icons/Menu";
import Person from "@/components/icons/Person";
import Search from "@/components/icons/Search";
import CategoryMenu from "./menu/CategoryMenu";
import BrandMenu from "./menu/BrandMenu";
import { useEffect, useState } from "react";
import Close from "@/components/icons/Close";
import MobileMenu from "./menu/MobileMenu";
import { AnimatePresence } from "motion/react";
import SearchOverlay from "./SearchOverlay";

type MenuBarProps = {
    readonly setIsLoginPopup: (open: boolean) => void;
};

export default function MenuBar({ setIsLoginPopup }: Readonly<MenuBarProps>) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    useEffect(() => {
        window.addEventListener("resize", closeMenu);
        return () => window.removeEventListener("resize", closeMenu);
    }, []);

    return (
        <div className="w-full bg-black flex items-center justify-between p-4 lg:px-12 lg:py-9 h-14 lg:h-24 relative">
            <div
                className="lg:hidden cursor-pointer"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                {isMenuOpen ? <Close /> : <Menu />}
            </div>

            <div className="flex items-center">
                <Text
                    as="span"
                    color="white"
                    size="gkbOpticalText"
                    font="gilroy"
                >
                    GKB Opticals
                </Text>
            </div>

            <div className="hidden lg:flex items-center z-50">
                <div className="flex items-center group/menu">
                    <div className="group/item px-5">
                        <Text
                            as="span"
                            color="white"
                            size="xl"
                            className="cursor-pointer relative"
                        >
                            Eyewear
                            <div className="absolute -bottom-2 left-0 w-full h-0.5 z-20 flex items-center justify-center">
                                <div className="w-0 h-0.5 bg-primary-100 transition-all duration-200 group-hover/item:w-1/2"></div>
                            </div>
                        </Text>
                        <div className="absolute top-[60px] left-0 w-full h-auto bg-black invisible group-hover/item:visible">
                            <div className="max-h-0 pt-11 bg-black group-hover/menu:max-h-[calc(100vh-96px)] transition-all duration-200 overflow-hidden group-hover/menu:overflow-y-auto block-carousel">
                                <CategoryMenu />
                            </div>
                        </div>
                    </div>
                    <div className="group/item px-5">
                        <Text
                            as="span"
                            color="white"
                            size="xl"
                            className="cursor-pointer relative"
                        >
                            Brands
                            <div className="absolute -bottom-2 left-0 w-full h-0.5 z-20 flex items-center justify-center">
                                <div className="w-0 h-0.5 bg-primary-100 transition-all duration-200 group-hover/item:w-1/2"></div>
                            </div>
                        </Text>
                        <div className="absolute top-[60px] left-0 w-full h-auto bg-black invisible group-hover/item:visible">
                            <div className="max-h-0 pt-11 bg-black group-hover/menu:max-h-[calc(100vh-96px)] transition-all duration-200 overflow-hidden group-hover/menu:overflow-y-auto block-carousel">
                                <BrandMenu />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="group/item px-5">
                    <Text
                        as="span"
                        color="white"
                        size="xl"
                        className="cursor-pointer relative"
                    >
                        Services
                        <div className="absolute -bottom-2 left-0 w-full h-0.5 z-20 flex items-center justify-center">
                            <div className="w-0 h-0.5 bg-primary-100 transition-all duration-200 group-hover/item:w-1/2"></div>
                        </div>
                    </Text>
                </div>
                <div className="group/item px-5">
                    <Text
                        as="span"
                        color="white"
                        size="xl"
                        className="cursor-pointer relative"
                    >
                        About
                        <div className="absolute -bottom-2 left-0 w-full h-0.5 z-20 flex items-center justify-center">
                            <div className="w-0 h-0.5 bg-primary-100 transition-all duration-200 group-hover/item:w-1/2"></div>
                        </div>
                    </Text>
                </div>
                <div className="group/item px-5">
                    <Text
                        as="span"
                        color="primary100"
                        size="xl"
                        weight="extrabold"
                        className="cursor-pointer relative"
                    >
                        Sale
                        <div className="absolute -bottom-2 left-0 w-full h-0.5 z-20 flex items-center justify-center">
                            <div className="w-0 h-0.5 bg-primary-100 transition-all duration-200 group-hover/item:w-1/2"></div>
                        </div>
                    </Text>
                </div>
            </div>

            <div className="flex items-center gap-6 test">
                <button
                    onClick={() => setIsSearchOpen(true)}
                    className="cursor-pointer"
                >
                    <Search />
                </button>

                <button
                    className="hidden lg:block cursor-pointer"
                    onClick={() => setIsLoginPopup(true)}
                >
                    <Person />
                </button>
                <Bag />
                {isSearchOpen && (
                    <SearchOverlay onClose={() => setIsSearchOpen(false)} />
                )}
            </div>

            <AnimatePresence>
                {isMenuOpen && (
                    <div className="absolute top-full left-0 w-full h-[calc(100vh-5px)] overflow-y-auto z-50">
                        <MobileMenu setIsLoginPopup={setIsLoginPopup} />
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
