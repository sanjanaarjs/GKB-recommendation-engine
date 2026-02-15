import Text from "@/components/generic/Text";
import CartDeletion from "@/components/icons/CartDeletion";
import CartMinus from "@/components/icons/CartMinus";
import CartPlus from "@/components/icons/CartPlus";
import CartWishlist from "@/components/icons/CartWishlist";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import { useState } from "react";
import { GetCartDetailsResponse } from "../pdp/datas/addToCart/getCart.Data.api";
import Link from "next/link";
import ChevronLeft from "@/components/icons/ChevronLeft";

const isJsonString = (value: string) => {
    try {
        JSON.parse(value);
        return true;
    } catch {
        return false;
    }
};

export default function CartItems({
    cartData,
    handleRemoveItem,
    handleQuantityChange,
}: Readonly<{
    cartData: GetCartDetailsResponse["cart"] | null;
    handleRemoveItem: (itemUid: string) => void;
    handleQuantityChange: (itemUid: string, newQuantity: number) => void;
}>) {
    const [isActive, setIsActive] = useState(false);

    const items = cartData?.items ?? [];

    const HIDDEN_LENS_KEYS = ["select_lense_id"];

    // If no items in the cart

    if (!items.length) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center py-20 text-center px-4">
                <Text
                    as="h3"
                    className="text-lg lg:text-2xl font-helvetica font-medium text-gray-700 mb-2"
                >
                    Your cart is empty
                </Text>
                <Text
                    as="p"
                    className="text-sm text-gray-500 font-helvetica mb-6"
                >
                    Looks like you haven’t added anything yet.
                </Text>
                <Link
                    href="/"
                    className="px-6 py-3 bg-black text-white text-sm rounded-full hover:bg-gray-800 transition font-helvetica"
                >
                    continue shopping
                </Link>
            </div>
        );
    }

    return (
        <div
            className="flex-1 px-[0px] lg:px-[20px] lg:pr-10 overflow-y-auto h-screen no-scrollbar"
            data-lenis-prevent
        >
            {/* Product Item */}

            {items.map((item, index) => {
                const hasGift = (item.giftcard_options ?? []).length > 0;
                const hasLens = (item.lense_custom_options ?? []).length > 0;
                const hasAdditionalDetails = hasGift || hasLens;
                return (
                    <div
                        key={item.uid || index}
                        className="border-b pt-[30px] lg:pt-[80px] last:border-b-0"
                    >
                        <div className="flex flex-col lg:flex-row gap-4">
                            <div className="h-auto lg:h-[80px] shrink-0 bg-white">
                                <Image
                                    src={item.product.image.url}
                                    alt={item.product.name}
                                    width={100}
                                    height={100}
                                    className="2xl:h-full w-full object-contain rounded-md"
                                />
                            </div>

                            <div className="flex flex-1 flex-col justify-between">
                                {/* Product Details */}
                                <div className="mb-[32px]">
                                    <Text
                                        as="h4"
                                        className="text-sm lg:text-[1.25rem] font-avenir text-black font-extrabold leading-normal mb-2"
                                    >
                                        {item.product.name}
                                    </Text>

                                    <div className="flex items-center gap-2">
                                        <Text
                                            as="span"
                                            className="text-sm lg:text-[1.25rem] font-helvetica text-black font-bold leading-normal"
                                        >
                                            ₹
                                            {item.prices.price.value.toLocaleString(
                                                "en-IN",
                                            )}
                                        </Text>
                                    </div>
                                </div>

                                {/* Quantity */}
                                <div className="flex items-center justify-between mb-[32px]">
                                    <div className="flex items-center rounded-[2px] border-[0.5px] border-cart-border">
                                        {/* Decrease quantity */}
                                        <button
                                            disabled={item.quantity <= 1}
                                            className={`p-[13px] transition 
                                            ${
                                                item.quantity <= 1
                                                    ? "opacity-30 cursor-not-allowed"
                                                    : "cursor-pointer hover:opacity-80"
                                            }
                                        `}
                                            onClick={() => {
                                                const newQuantity = Math.max(
                                                    1,
                                                    item.quantity - 1,
                                                );
                                                handleQuantityChange(
                                                    item.uid,
                                                    newQuantity,
                                                );
                                            }}
                                        >
                                            <CartMinus size={14} fill="black" />
                                        </button>

                                        <div className="bg-cart-border w-[0.5px] h-[40px]" />

                                        {/* Current quantity */}
                                        <span className="mx-2 w-4 text-center text-sm">
                                            {item.quantity}
                                        </span>

                                        <div className="bg-cart-border w-[0.5px] h-[40px]" />

                                        {/* Increase quantity */}
                                        <button
                                            className="p-[13px] cursor-pointer"
                                            onClick={() => {
                                                const newQuantity =
                                                    item.quantity + 1;
                                                handleQuantityChange(
                                                    item.uid,
                                                    newQuantity,
                                                );
                                            }}
                                        >
                                            <CartPlus size={14} fill="black" />
                                        </button>
                                    </div>
                                </div>

                                {/* Lens / Product Details */}
                                <div className="my-2 lg:mb-[80px] text-[1.25rem] text-black text-left flex items-start gap-2 relative">
                                    {hasAdditionalDetails && (
                                        <Accordion
                                            type="single"
                                            collapsible
                                            className="w-full flex-1 cart-accordion"
                                        >
                                            <AccordionItem value="details">
                                                <AccordionTrigger className="cursor-pointer text-font-cart group gap-2 font-helvetica text-sm lg:text-[1rem] leading-normal flex items-center justify-start italic">
                                                    Details
                                                    <div></div>
                                                    <ChevronLeft
                                                        fill="black"
                                                        className="chevron-cart-arrow w-5 h-5 -rotate-90 group-data-[state=open]:rotate-180"
                                                    />
                                                </AccordionTrigger>
                                                <AccordionContent>
                                                    {(() => {
                                                        const hasGift =
                                                            (
                                                                item.giftcard_options ??
                                                                []
                                                            ).length > 0;
                                                        const hasLens =
                                                            (
                                                                item.lense_custom_options ??
                                                                []
                                                            ).length > 0;

                                                        return (
                                                            <>
                                                                {/* Gift Card Options */}

                                                                {hasGift &&
                                                                    (() => {
                                                                        const giftOptions =
                                                                            item.giftcard_options ??
                                                                            [];

                                                                        if (
                                                                            giftOptions.length <=
                                                                            1
                                                                        )
                                                                            return null;

                                                                        const lowestSortOrder =
                                                                            Math.min(
                                                                                ...giftOptions.map(
                                                                                    (
                                                                                        opt,
                                                                                    ) =>
                                                                                        opt.sort_order,
                                                                                ),
                                                                            );

                                                                        return giftOptions
                                                                            .filter(
                                                                                (
                                                                                    option,
                                                                                ) =>
                                                                                    option.sort_order !==
                                                                                    lowestSortOrder,
                                                                            )
                                                                            .map(
                                                                                (
                                                                                    option,
                                                                                    idx,
                                                                                ) => (
                                                                                    <div
                                                                                        key={`gift-${idx}`}
                                                                                        className="grid grid-cols-2 gap-3 items-center justify-between mb-[16px]"
                                                                                    >
                                                                                        <Text
                                                                                            as="span"
                                                                                            className="font-light font-helvetica text-sm text-font-cart"
                                                                                        >
                                                                                            {
                                                                                                option.label
                                                                                            }

                                                                                            :
                                                                                        </Text>
                                                                                        <Text
                                                                                            as="span"
                                                                                            className="font-medium font-helvetica text-sm text-font-cart"
                                                                                        >
                                                                                            {
                                                                                                option
                                                                                                    .values?.[0]
                                                                                                    ?.value
                                                                                            }
                                                                                        </Text>
                                                                                    </div>
                                                                                ),
                                                                            );
                                                                    })()}

                                                                {/* Lens Custom Options */}
                                                                {hasLens &&
                                                                    item
                                                                        .lense_custom_options!.filter(
                                                                            (
                                                                                option,
                                                                            ) =>
                                                                                !HIDDEN_LENS_KEYS.includes(
                                                                                    option.label?.toLowerCase() ??
                                                                                        "",
                                                                                ),
                                                                        )
                                                                        .map(
                                                                            (
                                                                                option,
                                                                                idx,
                                                                            ) => {
                                                                                const isJson =
                                                                                    isJsonString(
                                                                                        option.value,
                                                                                    );

                                                                                if (
                                                                                    isJson
                                                                                ) {
                                                                                    const parsed =
                                                                                        JSON.parse(
                                                                                            option.value,
                                                                                        );

                                                                                    return (
                                                                                        <div
                                                                                            key={`lens-${idx}`}
                                                                                            className="mb-[16px]"
                                                                                        >
                                                                                            {/* Eye label */}
                                                                                            <Text
                                                                                                as="span"
                                                                                                className="font-light font-helvetica text-sm 2xl:text-[1rem] leading-normal text-font-cart capitalize"
                                                                                            >
                                                                                                {
                                                                                                    option.label
                                                                                                }{" "}
                                                                                                eye:
                                                                                            </Text>

                                                                                            {/* Power values */}
                                                                                            <div className="grid grid-cols-2 gap-3 mt-1">
                                                                                                <Text className="font-light text-sm text-font-cart">
                                                                                                    Spherical
                                                                                                </Text>
                                                                                                <Text className="font-medium text-sm text-font-cart">
                                                                                                    {
                                                                                                        parsed.spherical
                                                                                                    }
                                                                                                </Text>

                                                                                                <Text className="font-light text-sm text-font-cart">
                                                                                                    Cylindrical
                                                                                                </Text>
                                                                                                <Text className="font-medium text-sm text-font-cart">
                                                                                                    {parsed.cylindrical ??
                                                                                                        "-"}
                                                                                                </Text>

                                                                                                <Text className="font-light text-sm text-font-cart">
                                                                                                    Axis
                                                                                                </Text>
                                                                                                <Text className="font-medium text-sm text-font-cart">
                                                                                                    {
                                                                                                        parsed.axis
                                                                                                    }
                                                                                                </Text>
                                                                                            </div>
                                                                                        </div>
                                                                                    );
                                                                                }

                                                                                // Non-JSON lens options (normal text)
                                                                                return (
                                                                                    <div
                                                                                        key={`lens-${idx}`}
                                                                                        className="grid grid-cols-2 gap-3 items-center justify-between mb-[16px]"
                                                                                    >
                                                                                        <Text
                                                                                            as="span"
                                                                                            className="font-light font-helvetica text-sm 2xl:text-[1rem] leading-normal text-font-cart capitalize"
                                                                                        >
                                                                                            {option.label.replace(
                                                                                                /_/g,
                                                                                                " ",
                                                                                            )}

                                                                                            :
                                                                                        </Text>
                                                                                        <Text
                                                                                            as="span"
                                                                                            className="font-medium font-helvetica text-sm 2xl:text-[1rem] leading-normal text-font-cart
               break-all whitespace-normal"
                                                                                        >
                                                                                            {
                                                                                                option.value
                                                                                            }
                                                                                        </Text>
                                                                                    </div>
                                                                                );
                                                                            },
                                                                        )}

                                                                {/* Fallback ONLY if both are empty */}
                                                                {!hasGift &&
                                                                    !hasLens && (
                                                                        <Text
                                                                            as="span"
                                                                            className="font-helvetica text-sm text-gray-500"
                                                                        >
                                                                            No
                                                                            additional
                                                                            details
                                                                        </Text>
                                                                    )}
                                                            </>
                                                        );
                                                    })()}
                                                </AccordionContent>
                                            </AccordionItem>
                                        </Accordion>
                                    )}
                                    {/* Action buttons */}
                                    <div className="lg:flex-1 pt-2 flex justify-end absolute lg:right-0 lg:top-0 -top-1 right-2">
                                        <div className="flex items-center gap-4">
                                            <button
                                                className="rounded-full p-3 bg-white hover:bg-gray-100 drop-shadow-[0_4px_12px_rgba(0,0,0,0.25)] cursor-pointer"
                                                onClick={() =>
                                                    handleRemoveItem(item.uid)
                                                }
                                            >
                                                <CartDeletion />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    setIsActive(!isActive)
                                                }
                                                className="hidden rounded-full p-3 bg-white hover:bg-black drop-shadow-[0_4px_12px_rgba(0,0,0,0.25)] cartwishlist"
                                            >
                                                <CartWishlist
                                                    fill={
                                                        isActive
                                                            ? "black"
                                                            : "none"
                                                    }
                                                    stroke={
                                                        isActive
                                                            ? "black"
                                                            : "black"
                                                    }
                                                />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
