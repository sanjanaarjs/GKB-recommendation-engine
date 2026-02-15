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
import SearchOverlay from "./search/SearchOverlay";
import { StoreConfigResponse } from "./search/SearchLabel.api";
import { ExploreQueryResponse } from "./menu/datas/explore.data.api";
import { BrandCategoriesResponse } from "./menu/datas/featureBrand.data.api";
import { CategoriesResponse } from "./menu/datas/menu.api";
import Link from "next/link";
import { GetCartDetailsResponse } from "../pdp/datas/addToCart/getCart.Data.api";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import { hasCookie } from "@/lib/cookie";
import { setLoggedIn } from "@/lib/store/features/authSlice";

type MenuBarProps = {
    readonly setIsLoginPopup: (open: boolean) => void;
    storeConfigData: StoreConfigResponse["storeConfig"] | null;
    exploreCategories: ExploreQueryResponse["getSearchSection"] | null;
    brandCategories: BrandCategoriesResponse["getBrandCategories"] | null;
    categories: CategoriesResponse["categories"] | null;
    isLoggedIn: boolean;
    cartData: GetCartDetailsResponse["cart"] | null;
    announcementsData: {
        name: string;
        link: string;
        buttontext: string;
        attachment: string;
    }[];
};

export default function MenuBar({
    setIsLoginPopup,
    storeConfigData,
    exploreCategories,
    brandCategories,
    categories,
    isLoggedIn,
    cartData,
    announcementsData,
}: Readonly<MenuBarProps>) {
    const router = useRouter();

    const handleCartClick = () => {
        router.push("/cart");
    };
    // filtered categories only eyewear and brands
    const eyewearCategory = categories?.items.find(
        (cat) => cat.url_key === "eyewear" && cat.include_in_menu === 1,
    );

    const brandCategory = categories?.items.find(
        (cat) => cat.url_key === "brands" && cat.include_in_menu === 1,
    );

    // filtered categories except eyewear and brands
    const filteredCategories = categories?.items.filter(
        (cat) =>
            cat.include_in_menu === 1 &&
            cat.url_key !== "eyewear" &&
            cat.url_key !== "brands",
    );

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const isUserLoggedIn = useSelector(
        (state: RootState) => state.auth.isLoggedIn,
    );
    const dispatch = useDispatch();

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    useEffect(() => {
        async function checkCookie() {
            const result = await hasCookie("userToken");
            dispatch(setLoggedIn(result));
        }
        checkCookie();
    }, []);

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
                {/* <Text
                    as="span"
                    color="white"
                    size="gkbOpticalText"
                    font="gilroy"
                >
                    GKB Opticals
                </Text> */}
                {storeConfigData?.logo_url && (
                    <Link href={"/"}>
                        {storeConfigData?.logo_url && (
                            <img
                                width="170"
                                height="40"
                                src={storeConfigData.logo_url}
                                alt={storeConfigData?.logo_alt ?? "Store logo"}
                            />
                        )}
                    </Link>
                )}
            </div>

            <div className="hidden lg:flex items-center z-50">
                <div className="flex items-center group/menu">
                    {eyewearCategory && (
                        <div className="group/item px-5">
                            <Text
                                as="span"
                                color="white"
                                size="xl"
                                className="cursor-pointer pointer-events-none relative"
                            >
                                {eyewearCategory.name}
                                <div className="absolute -bottom-2 left-0 w-full h-0.5 z-20 flex items-center justify-center">
                                    <div className="w-0 h-0.5 bg-primary-100 transition-all duration-200 group-hover/item:w-1/2"></div>
                                </div>
                            </Text>

                            {/* Dropdown */}
                            <div className="absolute top-[60px] left-0 w-full h-auto bg-black invisible group-hover/item:visible">
                                <div className="max-h-0 pt-11 bg-black group-hover/menu:max-h-[calc(100vh-96px)] transition-all duration-200 overflow-hidden group-hover/menu:overflow-y-auto block-carousel">
                                    <CategoryMenu
                                        eyewearCategory={eyewearCategory}
                                        exploreCategories={exploreCategories}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                    {/* brands */}
                    {brandCategory && (
                        <div className="group/item px-5">
                            <Text
                                as="span"
                                color="white"
                                size="xl"
                                className="cursor-pointer pointer-events-none relative"
                            >
                                {brandCategory.name}
                                <div className="absolute -bottom-2 left-0 w-full h-0.5 z-20 flex items-center justify-center">
                                    <div className="w-0 h-0.5 bg-primary-100 transition-all duration-200 group-hover/item:w-1/2"></div>
                                </div>
                            </Text>
                            <div className="absolute top-[60px] left-0 w-full h-auto bg-black invisible group-hover/item:visible">
                                <div className="max-h-0 pt-11 bg-black group-hover/menu:max-h-[calc(100vh-96px)] transition-all duration-200 overflow-hidden group-hover/menu:overflow-y-auto block-carousel">
                                    <BrandMenu
                                        brandcategory={brandCategory}
                                        featurebrands={
                                            brandCategories?.data ?? []
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                {filteredCategories?.map((category) => (
                    <div className="group/item px-5" key={category.uid}>
                        <Link href={category.url_key}>
                            <Text
                                as="span"
                                color={
                                    category.url_key.toLowerCase() === "sale"
                                        ? "primary100"
                                        : "white"
                                }
                                size="xl"
                                className="cursor-pointer relative"
                            >
                                {category.name}
                                <div className="absolute -bottom-2 left-0 w-full h-0.5 z-20 flex items-center justify-center">
                                    <div className="w-0 h-0.5 bg-primary-100 transition-all duration-200 group-hover/item:w-1/2"></div>
                                </div>
                            </Text>
                        </Link>
                    </div>
                ))}
            </div>

            <div className="flex items-center gap-6">
                <button
                    onClick={() => setIsSearchOpen(true)}
                    className="cursor-pointer"
                >
                    <Search />
                </button>

                <button
                    className="hidden lg:block cursor-pointer relative"
                    onClick={() => {
                        if (!isUserLoggedIn) {
                            setIsLoginPopup(true);
                            return;
                        }
                        router.push("/profile");
                    }}
                >
                    <Person />
                    {isUserLoggedIn && (
                        <div className="absolute bg-[#129e12] w-2 h-2 rounded-full -top-0.5 right-[1px]"></div>
                    )}
                </button>

                <button
                    className="block cursor-pointer relative"
                    onClick={handleCartClick}
                >
                    <Bag className="text-white" />
                    {(cartData?.items?.length ?? 0) > 0 && (
                        <Text
                            as={"span"}
                            className="text-white bg-primary-100 px-2 py-1 font-helvetica font-bold text-xs rounded-full absolute -top-[10px]"
                        >
                            {cartData?.total_quantity ?? 0}
                        </Text>
                    )}
                </button>

                {isSearchOpen && (
                    <SearchOverlay onClose={() => setIsSearchOpen(false)} />
                )}
            </div>

            <AnimatePresence>
                {isMenuOpen &&
                    eyewearCategory &&
                    exploreCategories &&
                    brandCategory &&
                    filteredCategories && (
                        <div className="absolute top-full left-0 w-full h-[calc(100vh-5px)] overflow-y-auto z-50">
                            <MobileMenu
                                setIsLoginPopup={setIsLoginPopup}
                                category={eyewearCategory}
                                exploreCategories={exploreCategories}
                                brandcategory={brandCategory}
                                filteredCategories={filteredCategories}
                                setIsMenuOpen={setIsMenuOpen}
                                isLogin={isLoggedIn}
                                announcementsData={announcementsData}
                            />
                        </div>
                    )}
            </AnimatePresence>
        </div>
    );
}
