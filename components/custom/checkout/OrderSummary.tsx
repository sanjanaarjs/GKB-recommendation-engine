import React, { useState } from "react";
import CartWarranty from "@/components/icons/CartWarranty";
import CartCall from "@/components/icons/CartCall";
import Text from "@/components/generic/Text";
import { Separator } from "@/components/ui/separator";
import { RootState } from "@/lib/store/store";
import { useDispatch, useSelector } from "react-redux";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { CustomerAddress } from "../myAccount/addresses/address.data.api";
import { clearPlaceOrderData } from "@/lib/store/checkoutSlice";
import { useRouter } from "next/navigation";

export default function OrderSummary({
    step,
    handleProceedToPayment,
    handlePaymentAndPlaceOrder,
    onNext,
    selectedAddress,
    isLoggedIn,
}: Readonly<{
    step: number;
    handleProceedToPayment: () => Promise<boolean>;
    handlePaymentAndPlaceOrder: () => Promise<boolean>;
    onNext: (nextStep: number) => void;
    selectedAddress?: CustomerAddress | null;
    isLoggedIn: boolean;
}>) {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();

    // api call
    const { cartData } = useSelector((state: RootState) => state.cart);
    const { placeOrderData } = useSelector(
        (state: RootState) => state.checkout,
    );
    const { customerAddressData } = useSelector(
        (state: RootState) => state.checkout,
    );

    const carttotal = cartData?.prices;
    const grandTotalValue = carttotal?.grand_total?.value || 0;
    const isFreeOrder = grandTotalValue === 0;

    const discountValue = carttotal?.discounts?.[0]?.amount?.value;

    const giftCardValue = cartData?.prices?.giftcard?.amount;

    const handleClick = async () => {
        setIsLoading(true);
        let ok = false;

        try {
            if (step < 5) {
                // Steps 1–4 → validate address & go to payment
                ok = await handleProceedToPayment();
                if (ok) onNext(5);
            } else if (step === 5) {
                // Step 5 → Payment + Place Order → Success page
                ok = await handlePaymentAndPlaceOrder();
                if (ok) onNext(6);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const order = placeOrderData?.placeOrder?.orderV2;

    // Item count
    const itemCount = order?.items?.reduce(
        (sum, item) => sum + (item?.quantity_ordered || 0),
        0,
    );

    // Subtotal
    const subtotal = order?.total?.subtotal?.value;

    // Shipping charge
    const shippingCharge = order?.total?.total_shipping?.value;

    // Grand total
    const grandTotal = order?.total?.grand_total?.value;

    // Calculate total discount (in case discounts come inside items)
    const totalDiscount = order?.items?.reduce((sum, item) => {
        if (!item.discounts?.length) return sum;
        return (
            sum +
            item.discounts.reduce(
                (dSum, d) => dSum + (d?.amount?.value || 0),
                0,
            )
        );
    }, 0);

    // ITEMS
    const items = order?.items || [];

    // SHIPPING ADDRESS
    const ship = order?.shipping_address;

    // SHIPPING METHOD
    const shippingMethod = order?.shipping_method;

    const addressLength = customerAddressData?.customer?.addresses?.length ?? 0;
    const shippingAmount =
        cartData?.shipping_addresses?.[0]?.selected_shipping_method?.amount
            ?.value;

    console.log("placeOrderData", placeOrderData);

    return (
        <div className="w-full flex-1 lg:pl-10 lg:pr-20 border-t lg:border-t-0 lg:border-l lg:pt-12 pt-5">
            <div className="space-y-2">
                {step === 6 && (
                    <Text
                        as="h2"
                        className="font-helvetica text-[1.25rem] font-bold leading-normal text-black w-full mb-[32px]"
                    >
                        Order summary
                    </Text>
                )}
                {step === 6 && placeOrderData && (
                    <>
                        {/* Order number */}
                        <div className="flex justify-between mb-[16px]">
                            <Text
                                as="span"
                                className="font-light font-helvetica text-[1.25rem] text-black"
                            >
                                Order number
                            </Text>
                            <Text
                                as="span"
                                className="font-bold font-helvetica text-[1.25rem] text-black"
                            >
                                {order?.number}
                            </Text>
                        </div>

                        {/* Date of Purchase */}
                        <div className="flex justify-between mb-[16px]">
                            <Text
                                as="span"
                                className="font-light font-helvetica text-[1.25rem] text-black"
                            >
                                Date of purchase
                            </Text>
                            <Text
                                as="span"
                                className="font-bold font-helvetica text-[1.25rem] text-black"
                            >
                                {order?.order_date}
                            </Text>
                        </div>

                        {/* Payment Method */}
                        <div className="flex justify-between mb-[16px]">
                            <Text
                                as="span"
                                className="font-light font-helvetica text-[1.25rem] text-black"
                            >
                                Payment method
                            </Text>
                            <Text
                                as="span"
                                className="font-bold font-helvetica text-[1.25rem] text-black"
                            >
                                {order?.payment_methods?.[0]?.name}
                            </Text>
                        </div>

                        {/* Item Totals */}
                        {itemCount && (
                            <div className="flex justify-between mb-[16px]">
                                <Text
                                    as="span"
                                    className="font-light font-helvetica text-[1.25rem] text-black"
                                >
                                    Item totals ({itemCount} item
                                    {itemCount > 1 ? "s" : ""})
                                </Text>
                                <Text
                                    as="span"
                                    className="font-bold font-helvetica text-[1.25rem] text-black"
                                >
                                    ₹{subtotal}
                                </Text>
                            </div>
                        )}

                        {/* Shipping Charges */}
                        {shippingCharge !== undefined && shippingCharge > 0 && (
                            <div className="flex justify-between mb-[16px]">
                                <Text
                                    as="span"
                                    className="font-light font-helvetica text-[1.25rem] text-black"
                                >
                                    Shipping charges
                                </Text>
                                <Text
                                    as="span"
                                    className="font-bold font-helvetica text-[1.25rem] text-black"
                                >
                                    ₹{shippingCharge}
                                </Text>
                            </div>
                        )}

                        {/* Discount Amount */}
                        {(totalDiscount ?? 0) > 0 && (
                            <div className="flex justify-between mb-[16px]">
                                <Text
                                    as="span"
                                    className="font-light font-helvetica text-[1.25rem] text-black"
                                >
                                    Discount amount
                                </Text>
                                <Text
                                    as="span"
                                    className="font-bold font-helvetica text-[1.25rem] text-black"
                                >
                                    -₹{totalDiscount}
                                </Text>
                            </div>
                        )}
                    </>
                )}
                {!placeOrderData && (
                    <>
                        <div className="flex justify-between mb-[16px]">
                            <Text
                                as={"span"}
                                className="font-light font-helvetica text-[1.25rem] leading-normal text-black"
                            >
                                Item totals ({cartData?.items?.length ?? 0}{" "}
                                {cartData?.items?.length === 1
                                    ? "item"
                                    : "items"}
                                )
                            </Text>
                            <Text
                                as={"span"}
                                className="font-bold font-helvetica text-[1.25rem] leading-normal text-black"
                            >
                                ₹{carttotal?.subtotal_excluding_tax?.value}
                            </Text>
                        </div>
                        {shippingAmount !== undefined && shippingAmount > 0 && (
                            <div className="flex justify-between items-center mb-[16px]">
                                <Text
                                    as={"span"}
                                    className="font-light font-helvetica text-[1.25rem] leading-normal text-black"
                                >
                                    Shipping charges
                                </Text>
                                <Text
                                    as={"span"}
                                    className="font-bold font-helvetica text-[1.25rem] leading-normal text-black"
                                >
                                    {
                                        cartData?.shipping_addresses[0]
                                            ?.selected_shipping_method?.amount
                                            ?.value
                                    }
                                </Text>
                            </div>
                        )}
                        {typeof discountValue === "number" &&
                            discountValue > 0 && (
                                <div className="flex justify-between">
                                    <Text
                                        as={"span"}
                                        className="font-light font-helvetica text-[1.25rem] leading-normal text-black"
                                    >
                                        Discount amount
                                    </Text>
                                    <Text
                                        as={"span"}
                                        className="font-bold font-helvetica text-[1.25rem] leading-normal text-black"
                                    >
                                        − ₹
                                        {discountValue.toLocaleString("en-IN")}
                                    </Text>
                                </div>
                            )}

                        {typeof giftCardValue === "number" &&
                            giftCardValue > 0 && (
                                <div className="flex justify-between mb-[16px]">
                                    <Text
                                        as={"span"}
                                        className="font-light font-helvetica text-[1.25rem] leading-normal text-black"
                                    >
                                        Gift card applied
                                    </Text>
                                    <Text
                                        as={"span"}
                                        className="font-bold font-helvetica text-[1.25rem] leading-normal text-black"
                                    >
                                        - ₹
                                        {giftCardValue.toLocaleString("en-IN")}
                                    </Text>
                                </div>
                            )}
                    </>
                )}
            </div>

            <Separator className="my-8 bg-border-color-light" />
            <div className="mb-[32px]">
                <div className="lg:border-b lg:border-border-color-light lg:pb-8">
                    <div className="flex justify-between">
                        <Text
                            as={"p"}
                            className="font-bold font-helvetica text-[1.25rem] leading-normal text-black"
                        >
                            Grand total
                        </Text>
                        <Text
                            as={"span"}
                            className="font-bold font-helvetica text-[1.25rem] leading-normal text-black"
                        >
                            {!placeOrderData
                                ? `₹${carttotal?.grand_total?.value}`
                                : `₹${grandTotal}`}
                        </Text>
                    </div>
                </div>
                {step === 6 && (
                    <div>
                        {/* DESKTOP ACCORDION */}
                        {itemCount && (
                            <Accordion
                                type="single"
                                collapsible
                                className="hidden lg:block"
                            >
                                {/* ITEM DETAILS */}
                                <AccordionItem
                                    value="Item details"
                                    className="border-b border-border-color-light py-4"
                                >
                                    <AccordionTrigger className="cursor-pointer no-underline hover:no-underline">
                                        <Text
                                            font="helvetica"
                                            size="xl"
                                            weight="extrabold"
                                        >
                                            Item details ({itemCount} item
                                            {itemCount > 1 ? "s" : ""})
                                        </Text>
                                    </AccordionTrigger>

                                    <AccordionContent>
                                        {items.map((item) => (
                                            <div
                                                key={item.product_sku}
                                                className="py-3 border-b last:border-b-0"
                                            >
                                                <Text className="font-helvetica text-lg font-bold">
                                                    {item.product_name}
                                                </Text>

                                                <Text className="font-helvetica text-base text-gray-600">
                                                    SKU: {item.product_sku}
                                                </Text>

                                                <div className="flex justify-between mt-2">
                                                    <Text>
                                                        Qty:{" "}
                                                        {item.quantity_ordered}
                                                    </Text>
                                                    <Text className="font-bold">
                                                        ₹
                                                        {
                                                            item
                                                                .product_sale_price
                                                                ?.value
                                                        }
                                                    </Text>
                                                </div>
                                            </div>
                                        ))}
                                    </AccordionContent>
                                </AccordionItem>

                                {/* SHIPPING DETAILS */}
                                <AccordionItem
                                    value="Shipping details"
                                    className="border-b border-border-color-light py-4"
                                >
                                    <AccordionTrigger className="cursor-pointer no-underline hover:no-underline">
                                        <Text
                                            font="helvetica"
                                            size="xl"
                                            weight="extrabold"
                                        >
                                            Shipping details
                                        </Text>
                                    </AccordionTrigger>

                                    <AccordionContent>
                                        <div className="space-y-2 mt-2">
                                            <Text className="font-bold">
                                                {ship?.firstname}{" "}
                                                {ship?.lastname}
                                            </Text>

                                            <Text>
                                                {ship?.street?.join(", ")}
                                            </Text>
                                            <Text>
                                                {ship?.city}, {ship?.region} -{" "}
                                                {ship?.postcode}
                                            </Text>

                                            <Text>
                                                Phone: {ship?.telephone}
                                            </Text>

                                            <Text className="font-bold mt-2">
                                                Shipping method:{" "}
                                                {shippingMethod}
                                            </Text>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        )}

                        {/* MOBILE ACCORDION */}
                        <Accordion
                            type="single"
                            collapsible
                            className="lg:hidden cursor-pointer lg:mt-0 mt-7"
                        >
                            {/* ORDER / ITEM DETAILS */}
                            <AccordionItem
                                value="Item details"
                                className="px-4 pb-2 rounded-[4px] bg-white shadow-[0_6px_24px_rgba(0,0,0,0.10)] my-2"
                            >
                                <AccordionTrigger className="cursor-pointer">
                                    <Text
                                        font="helvetica"
                                        size="base"
                                        weight="bold"
                                    >
                                        Order details
                                    </Text>
                                </AccordionTrigger>

                                <AccordionContent>
                                    {items.map((item) => (
                                        <div
                                            key={item.product_sku}
                                            className="py-3 border-b last:border-b-0"
                                        >
                                            <Text className="font-helvetica text-base font-bold">
                                                {item.product_name}
                                            </Text>

                                            <Text className="font-helvetica text-sm text-gray-600">
                                                SKU: {item.product_sku}
                                            </Text>

                                            <div className="flex justify-between mt-2">
                                                <Text>
                                                    Qty: {item.quantity_ordered}
                                                </Text>
                                                <Text className="font-bold">
                                                    ₹
                                                    {
                                                        item.product_sale_price
                                                            ?.value
                                                    }
                                                </Text>
                                            </div>
                                        </div>
                                    ))}
                                </AccordionContent>
                            </AccordionItem>

                            {/* SHIPPING DETAILS */}
                            <AccordionItem
                                value="Shipping details"
                                className="px-4 pb-2 rounded-[4px] bg-white shadow-[0_6px_24px_rgba(0,0,0,0.10)] my-2"
                            >
                                <AccordionTrigger className="cursor-pointer">
                                    <Text
                                        font="helvetica"
                                        size="base"
                                        weight="bold"
                                    >
                                        Shipping details
                                    </Text>
                                </AccordionTrigger>

                                <AccordionContent>
                                    <div className="space-y-2 mt-2">
                                        <Text className="font-bold">
                                            {ship?.firstname} {ship?.lastname}
                                        </Text>

                                        <Text>{ship?.street?.join(", ")}</Text>
                                        <Text>
                                            {ship?.city}, {ship?.region} -{" "}
                                            {ship?.postcode}
                                        </Text>

                                        <Text>Phone: {ship?.telephone}</Text>

                                        <Text className="font-bold mt-2">
                                            Shipping method: {shippingMethod}
                                        </Text>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                )}
            </div>

            {/* {selectedAddress === null && ( */}
            <>
                {((step !== 4 && (step === 3 || step === 5)) ||
                    (step === 4 && addressLength === 0)) && (
                    <div className="w-full text-center">
                        <button
                            onClick={handleClick}
                            disabled={
                                isLoading || (isLoggedIn && addressLength === 0)
                            }
                            className="my-4 rounded-full bg-black text-white hover:bg-gray-900 w-full max-w-[340px] p-[14px] font-helvetica text-[1.25rem] leading-normal font-bold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mx-auto"
                        >
                            {isLoading && (
                                <svg
                                    className="animate-spin h-5 w-5 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                            )}
                            {step === 5
                                ? isFreeOrder
                                    ? "Place order"
                                    : "Pay now"
                                : "Proceed to pay"}
                        </button>
                    </div>
                )}
            </>
            {/* )} */}

            {step === 6 && (
                <div className="w-full text-center flex justify-center lg:hidden">
                    <button
                        onClick={() => {
                            dispatch(clearPlaceOrderData());
                            router.push("/");
                        }}
                        className="block my-4 rounded-full bg-black text-white hover:bg-gray-900 w-full max-w-[340px] p-[14px] font-helvetica text-[1.25rem] leading-normal font-bold cursor-pointer mx-auto"
                    >
                        continue shopping
                    </button>
                </div>
            )}

            <div className="my-[48px] flex flex-wrap gap-4 justify-evenly">
                <div className="flex flex-col items-center gap-4">
                    <CartCall />
                    <Text
                        as={"p"}
                        className="font-light font-helvetica text-[1.25rem] leading-normal text-black"
                    >
                        Expert callback
                    </Text>
                </div>
                <div className="flex flex-col items-center gap-4">
                    <CartWarranty />
                    <Text
                        as={"p"}
                        className="font-light font-helvetica text-[1.25rem] leading-normal text-black"
                    >
                        1-month warranty
                    </Text>
                </div>
            </div>
        </div>
    );
}
