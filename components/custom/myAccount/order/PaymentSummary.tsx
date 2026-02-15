"use client";

import React from "react";
import { CreditCard, Mail, Phone } from "lucide-react";
import Text from "@/components/generic/Text"; // assuming you already have this
import PriceSummaryRow from "./PriceSummary";
import HelpCard from "./MyHelpCard";
import { OrderTotals, ShippingAddress } from "./datas/order.data.api";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";

export default function PaymentSummary({
    billingAddress,
    email,
    paymentMethod,
    OrderTotals,
}: Readonly<{
    billingAddress: ShippingAddress | undefined;
    email?: string;
    paymentMethod?: string;
    OrderTotals?: OrderTotals;
}>) {
    const currency = useSelector(
        (state: RootState) => state.currency.currencySymbol,
    );
    const grand_total = OrderTotals?.grand_total?.value || 0;
    const sub_total = OrderTotals?.subtotal?.value || 0;
    const giftcard_amount = OrderTotals?.giftcard?.[0]?.amount || 0;
    const shipping = OrderTotals?.total_shipping?.value || 0;
    const discount = OrderTotals?.discounts || 0;

    const discountAmount = Array.isArray(discount)
        ? discount.reduce((total, d) => total + (d.amount?.value ?? 0), 0)
        : (discount ?? 0);

    return (
        <section className="w-full flex gap-x-2">
            {/* Icon Section */}
            <div className="flex-shrink-0">
                <CreditCard size={28} strokeWidth={1.6} />
            </div>

            {/* Content Section */}
            <div className="w-full">
                {/* Title */}
                <Text
                    weight="bold"
                    size="base"
                    font="helvetica"
                    className="mt-1"
                >
                    Payment summary
                </Text>

                {/* Payment Method */}
                <div className="flex flex-col mt-8">
                    <Text weight="bold" size="base" font="helvetica">
                        Payment method:
                    </Text>
                    <Text font="helvetica">{paymentMethod}</Text>
                </div>

                {/* Bill To */}
                <div className="flex flex-col mt-8">
                    <Text weight="bold" size="base">
                        Bill To:
                    </Text>
                    <div className="flex flex-col mt-2 space-y-1">
                        <Text font="helvetica" weight="light" size="base">
                            {billingAddress?.firstname}{" "}
                            {billingAddress?.lastname}
                        </Text>
                        <Text font="helvetica" weight="light" size="base">
                            {billingAddress?.street?.join(", ")}
                        </Text>
                        <Text font="helvetica" weight="light" size="base">
                            {billingAddress?.city},{billingAddress?.region},
                            {billingAddress?.country_code}
                        </Text>
                        <Text font="helvetica" weight="light" size="base">
                            {billingAddress?.postcode}{" "}
                        </Text>
                    </div>
                </div>

                {/* Contact Information */}
                <div className="flex flex-col mt-8 w-full">
                    <div className="flex justify-between w-full items-center">
                        <Text weight="bold" size="base">
                            Contact information:
                        </Text>
                        {/* <button className="flex items-center gap-x-1 text-base font-helvetica hover:opacity-80">
                            <Text weight="bold" size="base" font="helvetica">
                                Edit
                            </Text>
                            <ChevronLeft
                                className="rotate-180"
                                strokeWidth={1}
                                size={20}
                            />
                        </button> */}
                    </div>

                    <div className="flex flex-col mt-2 space-y-2">
                        <span className="flex gap-x-2 items-center">
                            <Mail strokeWidth={1} size={18} />
                            <Text font="helvetica" weight="light" size="base">
                                {email}
                            </Text>
                        </span>
                        <span className="flex gap-x-2 items-center">
                            <Phone strokeWidth={1} size={18} />
                            <Text font="helvetica" weight="light" size="base">
                                {billingAddress?.telephone}
                            </Text>
                        </span>
                    </div>
                </div>

                <div className="w-full relative flex flex-col gap-y-4 pt-16">
                    {sub_total > 0 && (
                        <PriceSummaryRow
                            label={"Subtotal"}
                            value={`${currency} ${sub_total}`}
                        />
                    )}
                    {shipping !== undefined && shipping > 0 && (
                        <PriceSummaryRow
                            label={"Shipping charges"}
                            value={`${currency} ${shipping}`}
                        />
                    )}
                    {giftcard_amount > 0 && (
                        <PriceSummaryRow
                            label={"Gift card"}
                            value={`${currency} ${giftcard_amount}`}
                        />
                    )}
                    {discountAmount != null &&
                        discountAmount !== undefined &&
                        discountAmount > 0 && (
                            <PriceSummaryRow
                                label={"Discount amount"}
                                value={`${currency} ${discountAmount}`}
                            />
                        )}
                </div>
                <div className="border-b border-[#949494] w-full h-[1px] pt-2 pb-6" />
                <div className="w-full flex flex-col py-8">
                    <div className="flex justify-between w-full">
                        <Text font="helvetica" weight="bold" size="base">
                            Order Total
                        </Text>
                        <Text font="helvetica" weight="bold" size="base">
                            {currency} {grand_total}
                        </Text>
                    </div>
                    <Text className="py-6" font="helvetica" size="sm">
                        Your order invoice has been mailed to you. If you don’t
                        find it, please connect with our Customer Care team.
                    </Text>
                </div>
                <HelpCard />
            </div>
        </section>
    );
}
