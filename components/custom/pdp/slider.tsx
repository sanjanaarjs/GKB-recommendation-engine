"use client";

import Text from "@/components/generic/Text";
import ArrowDown from "@/components/icons/ArrowDown";
import ArrowLeftThin from "@/components/icons/ArrowLeftThin";
import ArrowRightThin from "@/components/icons/ArrowRightThin";
import ArrowUp from "@/components/icons/ArrowUp";
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
import { useEffect, useState } from "react";
import { SliderProps } from "./datas/pdpData.api";
import StoreAvailabilitySheet from "./storeAvailability";
import { useLenis } from "lenis/react";
import LensFlow from "./lens-flow/LensFlow";
import LocationPin from "@/components/icons/LocationPin";
import AddtoCart from "@/components/icons/AddtoCart";
import CartMinus from "@/components/icons/CartMinus";
import CartPlus from "@/components/icons/CartPlus";
import { useWishlist } from "@/lib/hooks/useWishlist";
import Location from "@/components/icons/Location";
import Bag from "@/components/icons/Bag";
import ChevronLeft from "@/components/icons/ChevronLeft";
import { useRouter } from "next/navigation";

export default function Slider({
    productData,
    currency,
    lensData,
    isPowerLensFlow,
    handleAddToCart,
    loading,
    leftEyeQuantity,
    setLeftEyeQuantity,
    rightEyeQuantity,
    setRightEyeQuantity,
}: Readonly<SliderProps> & { loading?: boolean }) {
    const [isOpen, setIsOpen] = useState(true);
    const [api, setApi] = useState<CarouselApi | null>(null);
    const [api2, setApi2] = useState<CarouselApi | null>(null);
    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const [showAllVariants, setShowAllVariants] = useState<boolean>(false);
    const currencySymbol = currency?.base_currency_symbol || "₹";
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const lenis = useLenis();
    // Stop Lenis scroll when the Sheet opens
    useEffect(() => {
        if (isSheetOpen) {
            lenis?.stop(); // disable smooth scroll
            document.body.style.overflow = "hidden"; // fallback for touch devices
        } else {
            lenis?.start(); // re-enable scroll
            document.body.style.overflow = "";
        }

        return () => {
            lenis?.start(); // ensure scroll is re-enabled on cleanup
            document.body.style.overflow = "";
        };
    }, [isSheetOpen, lenis]);
    const [openLensFlow, setOpenLensFlow] = useState<boolean>(false);

    api?.on("select", () => {
        setCurrentSlide(api?.selectedScrollSnap() ?? 0);
    });

    const mediaGallery = productData?.products?.items?.[0]?.media_gallery || [];
    // image sorted based on position
    const sortedImages = [...mediaGallery].sort(
        (a, b) => (a.position ?? 0) - (b.position ?? 0),
    );
    const brandInfo = productData?.products?.items?.[0]?.brandInfo || null;
    const productDetails = productData?.products?.items?.[0];

    const deliveryText = productDetails?.expected_delivery || "";
    const [label, dateRange] = deliveryText.split(/:(.*)/).map((s) => s.trim());

    const Model = productDetails?.attributeTobeShow?.find(
        (attr) => attr.attribute_code === "model_no",
    );
    const idealFor = productDetails?.attributeTobeShow?.find(
        (attr) => attr.attribute_code === "gender",
    );
    const priceRange = productDetails?.price_range?.minimum_price;
    const uspArray = Array.isArray(productDetails?.product_usp)
        ? productDetails.product_usp
        : productDetails?.product_usp
          ? JSON.parse(productDetails.product_usp)
          : [];

    const colorSwatch = Array.isArray(
        productData?.products?.items?.[0]?.color_swatch,
    )
        ? productData.products.items[0].color_swatch
        : productData?.products?.items?.[0]?.color_swatch
          ? [productData.products.items[0].color_swatch]
          : [];

    const hasColorSwatches = (colorSwatch?.length ?? 0) > 1;

    const lensLabelQty =
        productData?.products?.items?.[0]?.lensLabelQty || null;

    const minMax = lensLabelQty?.lensMinMaxQty
        ? lensLabelQty.lensMinMaxQty.split("-").map(Number)
        : [1, 1];
    const [minQty, maxQty] = minMax;
    const { wishlistSkuSet, handleWishlistClick } = useWishlist();
    const router = useRouter();

    return (
        <div className="px-0 lg:px-20 py-6 lg:py-8 bg-background-white flex flex-col gap-4">
            <div className="px-4 lg:px-0 flex justify-between items-start w-full gap-2">
                <div className="flex flex-row justify-between items-center w-full gap-2">
                    {brandInfo?.image && brandInfo?.name && (
                        <div>
                            <button
                                type="button"
                                onClick={() => router.back()}
                                className="cursor-pointer"
                            >
                                <ChevronLeft size={24} fill="black" />
                            </button>

                            {/* <Image
                                src={brandInfo?.image}
                                alt={brandInfo?.name}
                                width={111}
                                height={72}
                                className="hidden lg:block"
                            /> */}
                            <Text
                                as="p"
                                size="sm"
                                weight="normal"
                                color="fontMain"
                                font="helvetica"
                                className="hidden"
                            >
                                {brandInfo?.name}
                            </Text>
                        </div>
                    )}
                    <div className="flex flex-col items-start lg:items-center">
                        <Text
                            as="h2"
                            weight="fontblack"
                            color="fontMain"
                            font="avenir"
                            className="text-base lg:text-xl"
                        >
                            {productDetails?.name}
                        </Text>
                        {/* <div className="flex items-center gap-2">
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
                        </div> */}
                    </div>
                    <div></div>
                </div>
                <div className="flex items-start lg:items-start gap-2">
                    <button className="py-2 px-2 lg:px-4 bg-white shadow-lg shadow-black/20 rounded-4xl lg:flex items-center gap-2 cursor-pointer hidden lg:mr-[50px]">
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
                    <div className="relative w-[40px] h-[40px] lg:hidden lg:w-auto lg:h-auto">
                        <button className="py-2 px-2 lg:px-4 bg-white shadow-lg shadow-black/20 rounded-4xl flex items-center gap-2 cursor-pointer ">
                            <TryOn size={24} />
                        </button>
                    </div>
                    <div className="relative w-[40px] h-[40px] lg:w-auto lg:h-auto">
                        <button
                            className="cursor-pointer absolute -top-[5px] -right-[11px] lg:top-[4px]"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                if (productDetails?.sku) {
                                    handleWishlistClick(productDetails?.sku);
                                }
                            }}
                        >
                            {productDetails?.sku &&
                            wishlistSkuSet.has(productDetails.sku) ? (
                                <Heart
                                    size={64}
                                    fill="white"
                                    stroke="black"
                                    colorFill="black"
                                    className="lg:-mt-2 w-[60px] h-[60px] lg:w-[64px] lg:h-[64px]"
                                />
                            ) : (
                                <Heart
                                    size={64}
                                    stroke="black"
                                    className="lg:-mt-2 w-[60px] h-[60px] lg:w-[64px] lg:h-[64px]"
                                />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex gap-4 relative">
                {hasColorSwatches && (
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
                                {colorSwatch?.map((variant) => (
                                    <CarouselItem
                                        key={variant.id}
                                        className="basis-1/3"
                                    >
                                        <Link href={`/${variant.url_key}`}>
                                            <Image
                                                src={variant.swatch_image}
                                                alt={
                                                    variant.frame_color_primary ||
                                                    "variant"
                                                }
                                                className="lg:w-[110px] xl:w-[147px]"
                                                width={147}
                                                height={70}
                                                priority
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
                )}
                <div className="w-full">
                    <Carousel
                        className="w-full"
                        setApi={setApi}
                        opts={{ loop: true }}
                    >
                        <CarouselContent>
                            {sortedImages.map((media, index) => (
                                <CarouselItem
                                    key={media.url || `${media.label}-${index}`}
                                    className="flex justify-center items-center"
                                >
                                    <Image
                                        src={media.url}
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
                    <div className="flex justify-center items-center gap-6 lg:gap-3 lg:px-3 px-4 py-3">
                        <button
                            className="cursor-pointer"
                            onClick={() => api?.scrollPrev()}
                        >
                            <div className="lg:hidden block">
                                <ArrowLeftThin size={24} />
                            </div>
                            <div className="lg:block hidden">
                                <ArrowLeftThin size={18} />
                            </div>
                        </button>
                        <button
                            className="cursor-pointer"
                            onClick={() => api?.scrollNext()}
                        >
                            <div className="lg:hidden block">
                                <ArrowRightThin size={24} />
                            </div>
                            <div className="lg:block hidden">
                                <ArrowRightThin size={18} />
                            </div>
                        </button>
                    </div>
                    <div className="px-4 lg:px-3 py-3 border-l border-black">
                        <Text
                            as="p"
                            weight="normal"
                            color="fontMain"
                            font="helvetica"
                            className="text-xl lg:text-lg xl:text-base"
                        >
                            {`${currentSlide + 1} / ${sortedImages.length}`}
                        </Text>
                    </div>
                </div>
            </div>
            <div className="flex lg:hidden gap-1.5 justify-center">
                {sortedImages.map((media, index) => (
                    <button
                        key={`${media.label || "media"}-${index}`}
                        className={`border border-black rounded-full w-1.5 h-1.5 cursor-pointer ${currentSlide === index ? "bg-black" : "bg-white"}`}
                        onClick={() => api?.scrollTo(index)}
                    ></button>
                ))}
            </div>

            <div className="lg:mt-5 px-5 lg:px-0">
                {/************************************** Product Type - power flow - start  ****************************************/}
                {isPowerLensFlow && (
                    <>
                        <div className="lg:bg-white flex flex-col lg:flex-row">
                            <div className="flex-1 lg:px-8 pt-6 lg:py-8 flex flex-col justify-center gap-6 lg:gap-12">
                                <div className="flex flex-col gap-2 justify-evenly">
                                    <Text
                                        as="p"
                                        size="xl"
                                        weight="bold"
                                        color="fontMain"
                                        font="helvetica"
                                        className="text-sm lg:text-xl"
                                    >
                                        {productDetails?.stock_status ===
                                        "IN_STOCK"
                                            ? "In Stock"
                                            : "Out of Stock"}
                                    </Text>
                                    <div className="flex items-center gap-2">
                                        <button
                                            className="py-3 flex items-center gap-2 cursor-pointer "
                                            onClick={() => setIsSheetOpen(true)}
                                        >
                                            <LocationPin size={24} />
                                            <Text
                                                as="p"
                                                weight="bold"
                                                color="fontMain"
                                                font="helvetica"
                                                className="text-base lg:text-[1.25rem] leading-[26px] italic mt-1"
                                            >
                                                View in store near you
                                            </Text>
                                        </button>
                                        {/* Store Availability Sheet */}
                                        <StoreAvailabilitySheet
                                            isOpen={isSheetOpen}
                                            onClose={() =>
                                                setIsSheetOpen(false)
                                            }
                                            sku={productDetails?.sku || ""}
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* swatches mobile */}
                            <div className="hidden gap-2 pb-4">
                                <div className="flex gap-2">
                                    {colorSwatch
                                        ?.slice(
                                            0,
                                            showAllVariants
                                                ? colorSwatch.length
                                                : 3,
                                        )
                                        .map((variant) => (
                                            <Link
                                                href={`/${variant.url_key}`}
                                                key={variant.id}
                                                className={`w-12 h-12 p-1 rounded-full cursor-pointer ${
                                                    variant.is_current === "1"
                                                        ? "border-2 border-black"
                                                        : "border"
                                                }`}
                                                style={{
                                                    borderColor:
                                                        variant.hashcode,
                                                }}
                                            >
                                                <div
                                                    className="w-full h-full rounded-full"
                                                    style={{
                                                        backgroundColor:
                                                            variant.hashcode,
                                                        borderColor:
                                                            variant.hashcode,
                                                    }}
                                                    title={
                                                        variant.frame_color_primary
                                                    } // shows tooltip on hover
                                                ></div>
                                            </Link>
                                        ))}
                                </div>
                                <button
                                    className="cursor-pointer flex items-center gap-2"
                                    onClick={() =>
                                        setShowAllVariants(!showAllVariants)
                                    }
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

                            <div className="flex-1 border-x border-border-color-light px-8 py-4 lg:py-8 hidden lg:flex flex-col justify-center items-start gap-10 relative">
                                {lensLabelQty && (
                                    <div className="flex items-center gap-6 flex-col">
                                        <div className="flex items-center justify-between gap-4 lg:gap-10">
                                            <div>
                                                <Text
                                                    as="p"
                                                    size="base"
                                                    weight="light"
                                                    color="fontMain"
                                                    font="helvetica"
                                                >
                                                    {lensLabelQty.leftEyeLabel}
                                                </Text>
                                            </div>
                                            <div className="flex items-center rounded-[2px] border-[0.5px] border-cart-border">
                                                <button
                                                    className="p-[13px]"
                                                    onClick={() =>
                                                        setLeftEyeQuantity(
                                                            (prev) =>
                                                                Math.max(
                                                                    minQty,
                                                                    prev - 1,
                                                                ),
                                                        )
                                                    }
                                                >
                                                    <CartMinus
                                                        size={14}
                                                        fill="black"
                                                    />
                                                </button>
                                                <div className="bg-cart-border w-[0.5px] h-[40px]"></div>
                                                <Text
                                                    as={"span"}
                                                    className="mx-2 w-4 text-center text-sm"
                                                >
                                                    {leftEyeQuantity}
                                                </Text>
                                                <div className="bg-cart-border w-[0.5px] h-[40px]"></div>
                                                <button
                                                    className="p-[13px]"
                                                    onClick={() =>
                                                        setLeftEyeQuantity(
                                                            (prev) =>
                                                                Math.min(
                                                                    maxQty,
                                                                    prev + 1,
                                                                ),
                                                        )
                                                    }
                                                >
                                                    <CartPlus
                                                        size={14}
                                                        fill="black"
                                                    />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between mb-[32px] gap-4 lg:gap-10">
                                            <div>
                                                <Text
                                                    as="p"
                                                    size="base"
                                                    weight="light"
                                                    color="fontMain"
                                                    font="helvetica"
                                                >
                                                    {lensLabelQty.rightEyeLabel}
                                                </Text>
                                            </div>
                                            <div className="flex items-center rounded-[2px] border-[0.5px] border-cart-border">
                                                <button
                                                    className="p-[13px]"
                                                    onClick={() =>
                                                        setRightEyeQuantity(
                                                            (prev) =>
                                                                Math.max(
                                                                    minQty,
                                                                    prev - 1,
                                                                ),
                                                        )
                                                    }
                                                >
                                                    <CartMinus
                                                        size={14}
                                                        fill="black"
                                                    />
                                                </button>
                                                <div className="bg-cart-border w-[0.5px] h-[40px]"></div>
                                                <Text
                                                    as={"span"}
                                                    className="mx-2 w-4 text-center text-sm"
                                                >
                                                    {rightEyeQuantity}
                                                </Text>
                                                <div className="bg-cart-border w-[0.5px] h-[40px]"></div>
                                                <button
                                                    className="p-[13px]"
                                                    onClick={() =>
                                                        setRightEyeQuantity(
                                                            (prev) =>
                                                                Math.min(
                                                                    maxQty,
                                                                    prev + 1,
                                                                ),
                                                        )
                                                    }
                                                >
                                                    <CartPlus
                                                        size={14}
                                                        fill="black"
                                                    />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="flex-1 lg:px-8 pt-4 lg:py-8 flex flex-col justify-between gap-10">
                                <div className="flex items-center gap-4">
                                    <Text
                                        as="p"
                                        color="fontMain"
                                        font="helvetica"
                                        className="text-xl lg:text-[1.5rem] font-extrabold flex items-center gap-1"
                                    >
                                        <Text
                                            as={"span"}
                                            color="fontMain"
                                            font="helvetica"
                                            className="text-xl lg:text-[1.25rem] font-light flex items-center gap-2"
                                        >
                                            {currencySymbol}
                                        </Text>

                                        {priceRange?.regular_price.value}
                                    </Text>
                                    <Text
                                        as="p"
                                        weight="light"
                                        color="fontMain"
                                        font="helvetica"
                                        className="text-sm lg:text-base leading-normal"
                                    >
                                        (GST included)
                                    </Text>
                                </div>
                                <div className="hidden lg:flex flex-col xl:flex-row gap-6">
                                    <div className="flex items-end gap-6 w-full">
                                        <button
                                            className="border-font-main border-2 rounded-full px-14 py-3 cursor-pointer flex items-center justify-center not-last-of-type:gap-2 w-full 2xl:max-w-[65%] gap-1"
                                            onClick={() =>
                                                setOpenLensFlow(true)
                                            }
                                        >
                                            <Plus size={24} fill="black" />
                                            <Text
                                                as="p"
                                                size="xl"
                                                weight="bold"
                                                color="fontMain"
                                                font="helvetica"
                                                className="whitespace-nowrap"
                                            >
                                                add to cart
                                            </Text>
                                        </button>
                                        {productData?.products.items?.[0]
                                            ?.type_of_product !==
                                            "contact_lens" && (
                                            <button
                                                className="group secondary-button px-16 py-3 cursor-pointer flex items-center gap-2 addtocart_ContactFlow_Dekstop"
                                                onClick={() =>
                                                    handleAddToCart?.()
                                                }
                                            >
                                                <AddtoCart size={20} />
                                                <Text
                                                    as="p"
                                                    size="xl"
                                                    weight="bold"
                                                    font="helvetica"
                                                    className="whitespace-nowrap group-hover:text-font-main text-white"
                                                >
                                                    add to cart
                                                </Text>
                                            </button>
                                        )}
                                    </div>
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
                                    {uspArray.join(" • ")}
                                </Text>
                            </div>
                            <div className="flex gap-2">
                                <TruckDelivery size={24} stroke="black" />
                                <Text
                                    as="p"
                                    size="base"
                                    weight="normal"
                                    color="fontMain"
                                    font="helvetica"
                                >
                                    {productDetails?.expected_delivery}
                                </Text>
                            </div>
                        </div>
                    </>
                )}
                {/************************************** Product Type - Lens flow - start  ****************************************/}
                {!isPowerLensFlow && (
                    <>
                        <div className="lg:bg-[#f7f7f7] flex flex-col lg:flex-row">
                            <div className="lg:px-8 py-4 lg:py-8 flex flex-col justify-center gap-6 lg:gap-12 flex-1">
                                <div className="flex flex-row gap-6">
                                    <Text
                                        as="p"
                                        size="base"
                                        weight="light"
                                        color="fontMain"
                                        font="helvetica"
                                        className="text-sm lg:text-base"
                                    >
                                        {Model?.attribute_label}
                                    </Text>
                                    <Text
                                        as="p"
                                        size="base"
                                        weight="bold"
                                        color="fontMain"
                                        font="helvetica"
                                        className="text-sm lg:text-base mt-[2px] lg:mt-0"
                                    >
                                        {Model?.attribute_value}
                                    </Text>
                                </div>
                                <div className="flex lg:flex-col xl:flex-col 2xl:flex-row flex-col items-start gap-4">
                                    <div className="w-fit">
                                        <Text
                                            as="p"
                                            size="xl"
                                            weight="bold"
                                            color="fontMain"
                                            font="helvetica"
                                            className="text-sm lg:text-xl"
                                        >
                                            {productDetails?.stock_status ===
                                            "IN_STOCK"
                                                ? "In Stock"
                                                : "Out of Stock"}
                                        </Text>
                                    </div>

                                    <div className="lg:block hidden w-fit">
                                        <button
                                            className="flex items-center gap-1 cursor-pointer w-full"
                                            onClick={() => setIsSheetOpen(true)}
                                        >
                                            <Location size={24} color="black" />
                                            <Text
                                                as="p"
                                                size="xl"
                                                weight="bold"
                                                color="inherit"
                                                font="helvetica"
                                                className="italic"
                                            >
                                                View in store near you
                                            </Text>
                                        </button>
                                        {/* Store Availability Sheet */}
                                        <StoreAvailabilitySheet
                                            isOpen={isSheetOpen}
                                            onClose={() =>
                                                setIsSheetOpen(false)
                                            }
                                            sku={productDetails?.sku || ""}
                                        />
                                    </div>
                                </div>
                                {/* <div>
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
                                                        {Model?.attribute_label}
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
                                                        {Model?.attribute_value}
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
                                                        Ideal for
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
                                                        {
                                                            idealFor?.attribute_value
                                                        }
                                                    </Text>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div> */}
                            </div>
                            {/* swatches mobile */}
                            <div className="lg:hidden flex gap-2 pb-4">
                                <div className="flex gap-2">
                                    {colorSwatch
                                        ?.slice(
                                            0,
                                            showAllVariants
                                                ? colorSwatch.length
                                                : 3,
                                        )
                                        .map((variant) => (
                                            <Link
                                                href={`/${variant.url_key}`}
                                                key={variant.id}
                                                className={`w-12 h-12 p-1 rounded-full cursor-pointer ${
                                                    variant.is_current === "1"
                                                        ? "border-2 border-black"
                                                        : ""
                                                }`}
                                                style={{
                                                    borderColor:
                                                        variant.hashcode,
                                                }}
                                            >
                                                <div
                                                    className="w-full h-full rounded-full"
                                                    style={{
                                                        backgroundColor:
                                                            variant.hashcode,
                                                        borderColor:
                                                            variant.hashcode,
                                                    }}
                                                    title={
                                                        variant.frame_color_primary
                                                    } // shows tooltip on hover
                                                ></div>
                                            </Link>
                                        ))}
                                </div>
                                {colorSwatch.length > 3 && (
                                    <button
                                        className="cursor-pointer flex items-center gap-2"
                                        onClick={() =>
                                            setShowAllVariants(!showAllVariants)
                                        }
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
                                )}
                            </div>
                            <div className="flex-1 border-x border-border-color-light px-8 py-4 lg:py-8 hidden lg:flex flex-col justify-between gap-10 relative">
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
                                    className="primary-button-black px-16 py-3 cursor-pointer text-black hover:text-white justify-center w-full 2xl:max-w-[65%]"
                                    onClick={() => setOpenLensFlow(true)}
                                >
                                    <CartPlus size={14} fill="black" />
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

                                {/* hide the section */}
                                {/* <div
                                    className={`hidden opacity-0 absolute bottom-full left-0 w-full bg-primary-500 justify-between gap-4 px-4 py-2 transition-transform transition-opacity duration-300 motion-safe:duration-300 motion-safe:ease-in-out
    ${isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}
    lg:flex
  `}
                                >
                                    <Text
                                        as="p"
                                        size="xs"
                                        weight="normal"
                                        color="fontMain"
                                        font="helvetica"
                                    >
                                        Explore a world of top-quality premium
                                        lenses crafted for your individual
                                        vision needs.
                                    </Text>
                                    <button
                                        className="cursor-pointer"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <Close size={18} fill="black" />
                                    </button>
                                </div> */}
                            </div>
                            <div className="flex-1 lg:px-8 py-4 lg:py-8 flex flex-col justify-between gap-10">
                                <div>
                                    <div className="flex flex-row items-center gap-4">
                                        <Text
                                            as="p"
                                            weight="fontblack"
                                            color="fontMain"
                                            font="helvetica"
                                            className="text-[1.5rem] mt-1"
                                        >
                                            <Text
                                                as={"span"}
                                                size="xl"
                                                weight="light"
                                                font="helvetica"
                                            >
                                                {currencySymbol}
                                            </Text>

                                            {priceRange?.final_price.value}
                                        </Text>
                                        <div>
                                            <Text
                                                as="p"
                                                weight="light"
                                                color="fontMain"
                                                font="helvetica"
                                                className="text-sm mb-0 "
                                            >
                                                (GST included)
                                            </Text>
                                        </div>
                                    </div>

                                    {/* <div className="lg:hidden flex gap-2 items-center">
                                        <div className="flex items-center gap-2">
                                            <Text
                                                as="p"
                                                weight="fontblack"
                                                color="fontMain"
                                                font="helvetica"
                                                className="text-base lg:text-base"
                                            >
                                                {currencySymbol}
                                                {priceRange?.final_price.value.toLocaleString(
                                                    "en-IN",
                                                    {
                                                        maximumFractionDigits: 0,
                                                    },
                                                ) || "0"}
                                            </Text>
                                            <Text
                                                as="p"
                                                weight="fontblack"
                                                color="fontMain"
                                                font="helvetica"
                                                className="line-through text-base lg:text-base"
                                            >
                                                {currencySymbol}
                                                {priceRange?.regular_price.value.toLocaleString(
                                                    "en-IN",
                                                    {
                                                        maximumFractionDigits: 0,
                                                    },
                                                ) || "0"}
                                            </Text>
                                            <Text
                                                as="p"
                                                weight="light"
                                                color="fontMain"
                                                font="helvetica"
                                                className="text-sm lg:text-base mb-0"
                                            >
                                                (
                                                {
                                                    priceRange?.discount
                                                        .percent_off
                                                }
                                                % Off)
                                            </Text>
                                        </div>
                                    </div> */}
                                </div>
                                <div className="hidden lg:flex flex-col xl:flex-row gap-6 w-full">
                                    <div className="flex items-end w-full ">
                                        {/* desktop btn */}
                                        <button
                                            className="secondary-button px-16 py-3 cursor-pointer addtocart_Lensflow_Desktop
                                            text-white hover:text-black w-full justify-center 2xl:max-w-[65%]"
                                            onClick={() => handleAddToCart?.()}
                                            disabled={loading}
                                        >
                                            <Bag />
                                            <Text
                                                as="p"
                                                size="xl"
                                                weight="bold"
                                                color="inherit"
                                                font="helvetica"
                                                className="whitespace-nowrap"
                                            >
                                                {loading
                                                    ? "adding..."
                                                    : "add to Cart"}
                                            </Text>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="lg:hidden block my-6">
                                <div className="flex justify-center items-center w-full">
                                    <button
                                        className="py-3 flex items-center gap-2 cursor-pointer primary-button-black w-full justify-center"
                                        onClick={() => setIsSheetOpen(true)}
                                    >
                                        {/* <Plus size={24} fill="black" /> */}
                                        <Location size={18} color="black" />
                                        <Text
                                            as="p"
                                            size="xl"
                                            weight="semibold"
                                            color="inherit"
                                            font="helvetica"
                                            className="text-base capitalize mt-1"
                                        >
                                            View in store near you
                                        </Text>
                                    </button>
                                </div>

                                {/* Store Availability Sheet */}
                                <StoreAvailabilitySheet
                                    isOpen={isSheetOpen}
                                    onClose={() => setIsSheetOpen(false)}
                                    sku={productDetails?.sku || ""}
                                />
                            </div>
                        </div>
                        <div className="lg:bg-border-grey border-b border-border-grey lg:border-0 lg:px-8 lg:py-4 p-4 lg:flex justify-between items-center">
                            <div className="lg:flex items-center gap-2 hidden">
                                <Text
                                    as="p"
                                    size="base"
                                    weight="normal"
                                    color="fontMain"
                                    font="helvetica"
                                >
                                    {uspArray.join(" • ")}
                                </Text>
                            </div>

                            {deliveryText && (
                                <div className="flex items-start lg:items-center gap-2">
                                    <TruckDelivery size={24} stroke="black" />
                                    <div className="flex lg:flex-row flex-col items-start gap-1">
                                        <Text
                                            as="p"
                                            size="base"
                                            weight="bold"
                                            color="fontMain"
                                            font="helvetica"
                                        >
                                            {label}:
                                        </Text>

                                        <Text
                                            as="p"
                                            size="base"
                                            weight="normal"
                                            color="fontMain"
                                            font="helvetica"
                                        >
                                            {dateRange}
                                        </Text>
                                    </div>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
            {isPowerLensFlow && (
                <div className="flex lg:hidden z-20 justify-between items-center fixed bottom-0 left-0 right-0 bg-background-grey px-6 py-4">
                    <div className="flex-1 flex gap-2 items-center">
                        <Text
                            as="p"
                            size="base"
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
                            {currencySymbol}
                            {priceRange?.final_price.value.toLocaleString(
                                "en-IN",
                                {
                                    maximumFractionDigits: 0,
                                },
                            ) || "0"}
                        </Text>
                    </div>
                    <div className="flex-1">
                        {/* mobile view */}
                        <button
                            className="primary-button-black px-8 py-2 cursor-pointer w-full justify-center flex"
                            onClick={() => setOpenLensFlow(true)}
                        >
                            <Text
                                as="p"
                                size="base"
                                weight="normal"
                                color="inherit"
                                font="helvetica"
                            >
                                add power
                            </Text>
                        </button>
                    </div>
                    {/* <div>
                        <button
                            className="hidden secondary-button px-8 py-2 cursor-pointer addtocart_Contactflow_Mobile"
                            onClick={() => handleAddToCart?.()}
                        >
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
                    </div> */}
                </div>
            )}
            {!isPowerLensFlow && (
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
                            {currencySymbol}
                            {priceRange?.final_price.value.toLocaleString(
                                "en-IN",
                                {
                                    maximumFractionDigits: 0,
                                },
                            ) || "0"}
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
                        <button
                            className="secondary-button px-8 py-2 cursor-pointer addtocart_Lensflow_Desktop"
                            onClick={() => handleAddToCart?.()}
                        >
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
            )}
            <LensFlow
                openLensFlow={openLensFlow}
                setOpenLensFlow={setOpenLensFlow}
                leftEyeQuantity={leftEyeQuantity}
                rightEyeQuantity={rightEyeQuantity}
                lensData={lensData}
                productName={productDetails?.name}
                productPrice={`${currencySymbol}${(
                    priceRange?.final_price?.value || 0
                ).toLocaleString("en-IN", {
                    maximumFractionDigits: 0,
                })}`}
                isPowerLensFlow={isPowerLensFlow}
                handleAddToCart={(payload) => handleAddToCart?.(payload)}
            />
        </div>
    );
}
