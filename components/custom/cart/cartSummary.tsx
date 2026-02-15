import Text from "@/components/generic/Text";
import CartCall from "@/components/icons/CartCall";
// import CartRefunds from "@/components/icons/CartRefunds";
// import CartShipping from "@/components/icons/CartShipping";
import CartWarranty from "@/components/icons/CartWarranty";
import Coupon from "@/components/icons/Coupon";
import Redeem from "@/components/icons/Redeem";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { GetCartDetailsResponse } from "../pdp/datas/addToCart/getCart.Data.api";
import toast from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Close from "@/components/icons/Close";

export default function CartSummary({
    cartData,
    handleApplyGiftCard,
    giftCardMessage,
    handleApplyCoupon,
    couponMessage,
    handleRemoveCoupon,
}: Readonly<{
    cartData: GetCartDetailsResponse["cart"] | null;
    handleApplyGiftCard: (
        giftcardCode: string,
        giftcardPin: string,
        remove: boolean,
    ) => Promise<boolean>;
    giftCardMessage: string;
    handleApplyCoupon: (couponCode: string) => Promise<boolean>;
    handleRemoveCoupon: () => Promise<boolean>;
    couponMessage: string;
}>) {
    const carttotal = cartData?.prices;
    const [giftCode, setGiftCode] = useState("");
    const [giftPin, setGiftPin] = useState("");
    const [couponError, setCouponError] = useState("");
    const [giftError, setGiftError] = useState("");

    const giftcardTotal = cartData?.prices.giftcard;

    const router = useRouter();

    const handleApply = async () => {
        if (!giftCode.trim() || !giftPin.trim()) {
            setGiftError("Please enter both gift card number and PIN.");
            toast.error("Please enter both gift card number and PIN.");
            return;
        }

        setGiftError("");

        // Wait for API result
        const result = await handleApplyGiftCard(
            giftCode.trim(),
            giftPin.trim(),
            false,
        );

        // If success → clear inputs
        if (result === true) {
            setGiftCode("");
            setGiftPin("");
            setGiftError("");
        } else {
            setGiftError("Invalid gift card number or PIN.");
        }
    };

    const handleRemove = () => {
        handleApplyGiftCard("", "", true);
    };

    const [couponCode, setCouponCode] = useState("");

    const handleCouponApply = async () => {
        if (!couponCode.trim()) {
            setCouponError("Please enter a coupon code.");
            toast.error("Please enter a coupon code.");
            return;
        }

        const success = await handleApplyCoupon(couponCode.trim());

        if (success) {
            setCouponError(""); // Clear error
            setCouponCode("");
        } else {
            // Failed → show error message below input
            setCouponError("Invalid or expired coupon code.");
        }
    };

    return (
        <div className="w-full flex-1 lg:pl-10 border-t lg:border-t-0 lg:border-l lg:pt-0">
            {cartData?.items[0]?.__typename !== "GiftCardCartItem" && (
                <Accordion
                    type="single"
                    collapsible
                    className="w-full mt-[48px]"
                >
                    {/* --------------------- APPLY COUPON --------------------- */}
                    <AccordionItem
                        value="coupon"
                        className="border-border-color-light last:border-b py-[32px]"
                    >
                        <AccordionTrigger className="hover:no-underline cursor-pointer p-0">
                            <div className="flex items-center justify-start gap-2">
                                <Coupon />
                                <Text
                                    as={"p"}
                                    className="text-font-cart font-helvetica text-[1rem] leading-normal "
                                >
                                    Apply coupon
                                </Text>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="p-0">
                            <div className="flex items-center justify-center w-full mt-[32px] relative">
                                <input
                                    value={couponCode}
                                    onChange={(e) => {
                                        setCouponCode(e.target.value);
                                        setCouponError(""); // clear error while typing
                                    }}
                                    type="text"
                                    placeholder="* Enter coupon code"
                                    className={`w-full border border-border-grey h-[48px] px-[12px] py-2 text-sm rounded-full font-helvetica text-[1rem] leading-normal font-light text-black
                                            ${couponError ? "border-red-500" : "border-border-grey"}
                                        `}
                                />
                                <Button
                                    onClick={handleCouponApply}
                                    className="w-fit border-2 border-black h-[48px] text-font-main text-[1.25rem] font-helvetica  font-bold rounded-full absolute right-0 z-3 cursor-pointer px-[48px] hover:bg-black hover:text-white"
                                >
                                    apply
                                </Button>
                            </div>
                            {couponError && (
                                <Text className="text-red-500 text-sm mt-2 px-2 font-helvetica">
                                    {couponError}
                                </Text>
                            )}
                        </AccordionContent>
                    </AccordionItem>
                    {/* --------------------- APPLY GIFT CARD --------------------- */}
                    <AccordionItem
                        value="giftcard"
                        className="border-border-color-light last:border-b py-[32px]"
                    >
                        <AccordionTrigger className="hover:no-underline cursor-pointer p-0">
                            <div className="flex items-center justify-start gap-2">
                                <Redeem />
                                <Text
                                    as={"p"}
                                    className="text-font-cart font-helvetica text-[1rem] leading-normal "
                                >
                                    Redeem gift card
                                </Text>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className="flex flex-col items-center justify-center w-full mt-[32px]">
                                <div className="mb-6 w-full">
                                    <div className="flex flex-col lg:flex-row items-center gap-3 w-full">
                                        <input
                                            value={giftCode}
                                            onChange={(e) => {
                                                setGiftCode(e.target.value);
                                                setGiftError(""); // clear error while typing
                                            }}
                                            type="text"
                                            placeholder="* Enter gift card number"
                                            className={`flex-1 w-full border border-border-grey h-[48px] px-[12px] py-2 text-sm rounded-full font-helvetica text-[1rem] leading-normal font-light text-black placeholder:text-font-main
                                                ${giftError ? "border-red-500" : "border-border-grey"}
                                            `}
                                        />
                                        <input
                                            value={giftPin}
                                            onChange={(e) => {
                                                setGiftPin(e.target.value);
                                                setGiftError(""); // clear error while typing
                                            }}
                                            type="text"
                                            placeholder="* Enter Pin"
                                            className={`flex-1 w-full lg:w-auto border border-border-grey h-[48px] px-[12px] py-2 text-sm rounded-full font-helvetica text-[1rem] leading-normal font-light text-black placeholder:text-font-main
                                                ${giftError ? "border-red-500" : "border-border-grey"}
                                            `}
                                        />
                                    </div>
                                    {giftError && (
                                        <Text className="text-red-500 text-sm mt-2 px-2 font-helvetica">
                                            {giftError}
                                        </Text>
                                    )}
                                </div>
                                <button
                                    onClick={handleApply}
                                    className="border-2 border-black h-[48px] text-font-main text-[1.25rem] font-bold rounded-full right-0 z-3 cursor-pointer px-[72px] hover:bg-white font-helvetica "
                                >
                                    redeem gift card
                                </button>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            )}

            <div className="space-y-2 mt-[32px]">
                <Text
                    as="h2"
                    className="font-helvetica text-[1rem] font-bold leading-normal text-black w-full mb-[32px]"
                >
                    Order summary
                </Text>
                <div className="flex justify-between mb-[16px]">
                    <Text
                        as={"span"}
                        className="font-light font-helvetica text-[16px] lg:text-[1.25rem] leading-normal text-black"
                    >
                        Item totals ({cartData?.items?.length ?? 0}{" "}
                        {cartData?.items?.length === 1 ? "item" : "items"})
                    </Text>
                    <Text
                        as={"span"}
                        className="font-bold font-helvetica text-[16px] lg:text-[1.25rem] leading-normal text-black"
                    >
                        ₹{carttotal?.subtotal_excluding_tax?.value}
                    </Text>
                </div>
                {cartData?.shipping_addresses[0]?.selected_shipping_method
                    ?.amount?.value ? (
                    <div className="flex justify-between mb-[16px]">
                        <Text
                            as={"span"}
                            className="font-light font-helvetica text-[16px] lg:text-[1.25rem] leading-normal text-black"
                        >
                            Shipping charges
                        </Text>
                        <Text
                            as={"span"}
                            className="font-bold font-helvetica text-[16px] lg:text-[1rem] leading-normal  text-black"
                        >
                            {
                                cartData?.shipping_addresses[0]
                                    ?.selected_shipping_method?.amount?.value
                            }
                        </Text>
                    </div>
                ) : (
                    <div className="flex justify-between mb-[16px]">
                        <Text
                            as={"span"}
                            className="font-light font-helvetica text-[16px] lg:text-[1.25rem] leading-normal text-black"
                        >
                            Shipping charges
                        </Text>
                        <Text
                            as={"span"}
                            className="font-light font-helvetica text-[16px] lg:text-[1rem] leading-normal text-font-price"
                        >
                            Calculated at checkout
                        </Text>
                    </div>
                )}
                {carttotal?.discounts && carttotal.discounts.length > 0 && (
                    <div className="flex justify-between">
                        <Text
                            as={"span"}
                            className="font-light font-helvetica text-[16px] lg:text-[1.25rem] leading-normal text-black"
                        >
                            Discount amount
                        </Text>
                        <Text
                            as={"span"}
                            className="font-bold font-helvetica text-[16px] lg:text-[1.25rem] leading-normal text-black"
                        >
                            − ₹
                            {carttotal.discounts[0]?.amount?.value?.toLocaleString(
                                "en-IN",
                            )}
                        </Text>
                    </div>
                )}
                {couponMessage && (
                    <div className="relative w-full flex text-center justify-between bg-gray-200 p-1">
                        <Text
                            as={"span"}
                            className="font-light font-helvetica text-sm leading-normal text-black italic"
                        >
                            Coupon Applied
                        </Text>
                        <button
                            className="cursor-pointer text-sm hover:underline font-helvetica text-font-main text-right italic font-medium flex items-center gap-1 justify-end"
                            onClick={handleRemoveCoupon}
                        >
                            Remove
                            <Close fill={"black"} size={15} />
                        </button>
                    </div>
                )}
                {giftcardTotal &&
                    giftcardTotal?.amount > 0 &&
                    giftcardTotal?.code && (
                        <div className="relative flex justify-between w-full">
                            <Text
                                as={"span"}
                                className="font-light font-helvetica text-[16px] lg:text-[1.25rem] leading-normal text-black"
                            >
                                Gift Card Applied
                            </Text>
                            <div className="flex flex-col items-center gap-1">
                                <Text
                                    as={"span"}
                                    className="font-bold font-helvetica text-[16px] lg:text-[1.25rem] leading-normal text-black"
                                >
                                    − ₹
                                    {giftcardTotal?.amount?.toLocaleString(
                                        "en-IN",
                                    )}
                                </Text>
                                <button
                                    className="cursor-pointer text-sm hover:underline font-helvetica text-font-main w-full text-right italic font-medium flex items-center gap-1 justify-end"
                                    onClick={handleRemove}
                                >
                                    Remove
                                    <Close fill={"black"} size={15} />
                                </button>
                            </div>
                        </div>
                    )}
            </div>

            <Separator className="my-8 bg-border-color-light" />
            <div className="mb-[32px]">
                <div className="flex justify-between text-base font-semibold">
                    <Text
                        as={"span"}
                        className="font-bold font-helvetica text-[16px] lg:text-[1.25rem] leading-normal text-black"
                    >
                        Grand total
                    </Text>
                    <Text
                        as={"span"}
                        className="font-bold font-helvetica text-[16px] lg:text-[1.25rem] leading-normal text-black"
                    >
                        ₹{carttotal?.grand_total?.value}
                    </Text>
                </div>
                <Text
                    as={"p"}
                    className="font-light font-helvetica text-[16px] lg:text-[1.25rem] leading-normal text-black"
                >
                    (inclusive of all taxes)
                </Text>
            </div>
            <div className="w-full text-center">
                <Button
                    className="my-4 rounded-full bg-black text-white hover:bg-gray-900 w-full max-w-[340px] p-[24px] font-helvetica text-[16px] lg:text-[1.25rem] leading-normal font-bold cursor-pointer mx-auto"
                    onClick={() => router.push("/checkout")}
                >
                    proceed to checkout
                </Button>
            </div>

            <div className="mt-[48px] flex flex-wrap gap-4 justify-evenly">
                <div className="flex flex-col items-center gap-4">
                    <CartCall />
                    <Text
                        as={"p"}
                        className="font-light font-helvetica text-[16px] lg:text-[1.25rem] leading-normal text-black"
                    >
                        Expert callback
                    </Text>
                </div>
                {/* <div className="flex flex-col items-center gap-4">
                    <CartShipping />
                    <Text
                        as={"p"}
                        className="font-light font-helvetica text-[1.25rem] leading-normal text-black"
                    >
                        Free shipping
                    </Text>
                </div>
                <div className="flex flex-col items-center gap-4">
                    <CartRefunds />
                    <Text
                        as={"p"}
                        className="font-light font-helvetica text-[1.25rem] leading-normal text-black"
                    >
                        7-day refunds
                    </Text>
                </div> */}
                <div className="flex flex-col items-center gap-4">
                    <CartWarranty />
                    <Text
                        as={"p"}
                        className="font-light font-helvetica text-[16px] lg:text-[1.25rem] leading-normal text-black"
                    >
                        1-month warranty
                    </Text>
                </div>
            </div>
        </div>
    );
}
