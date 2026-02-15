import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import TruckDelivery from "@/components/icons/TruckDelivery";
import CheckoutPayment from "@/components/icons/CheckoutPayment";
import CheckoutHelp from "@/components/icons/CheckoutHelp";
import CartRefunds from "@/components/icons/CartRefunds";
import { Separator } from "@/components/ui/separator";
import Text from "@/components/generic/Text";
import Link from "next/link";

type Props = {
    paymentResult: "success" | "failure" | null;
    paymentMessage?: string | null;
};

export default function ConfirmationStep({
    paymentResult,
    paymentMessage,
}: Props) {
    return (
        <Card>
            <CardContent className="lg:py-6 lg:pr-10 lg:pl-20 pb-8 px-0">
                {paymentResult === "success" && (
                    <>
                        <Text
                            font="helvetica"
                            size="customText17"
                            weight="light"
                            className="mb-4"
                        >
                            thank you for your purchase!
                        </Text>

                        <Text
                            font="helvetica"
                            size="productTitle1"
                            weight="extrabold"
                            className="mb-8"
                        >
                            An experienced optometrist will contact you shortly.
                            Your order will be processed after confirmation.
                        </Text>
                    </>
                )}

                {paymentResult === "failure" && (
                    <>
                        <Text
                            font="helvetica"
                            size="customText17"
                            weight="light"
                            className="mb-4 text-red-600"
                        >
                            payment failed
                        </Text>

                        {paymentMessage && (
                            <Text
                                font="helvetica"
                                size="productTitle1"
                                weight="extrabold"
                                className="mb-8"
                            >
                                {paymentMessage}
                            </Text>
                        )}
                    </>
                )}

                <Separator className="bg-border-color-light" />
                <div className="pt-6">
                    <div className="my-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="p-8 rounded flex flex-col items-center gap-2.5 shadow-[0_4px_12px_0_rgba(0,0,0,0.25)]">
                            <TruckDelivery />
                            <p className="text-base">Delivery</p>
                        </div>
                        <div className="p-8 rounded flex flex-col items-center gap-2.5 shadow-[0_4px_12px_0_rgba(0,0,0,0.25)]">
                            <CheckoutPayment />
                            <p className="text-base">Payment</p>
                        </div>
                        <div className="p-8 rounded flex flex-col items-center gap-2.5 shadow-[0_4px_12px_0_rgba(0,0,0,0.25)]">
                            <CartRefunds />
                            <p className="text-base">Returns</p>
                        </div>
                        <div className="p-8 rounded flex flex-col items-center gap-2.5 shadow-[0_4px_12px_0_rgba(0,0,0,0.25)]">
                            <CheckoutHelp />
                            <p className="text-base">Help</p>
                        </div>
                    </div>
                    <div className="w-full text-center lg:flex justify-center hidden">
                        <Link
                            href="/"
                            className="block my-4 rounded-full bg-black text-white hover:bg-gray-900 w-full max-w-[340px] p-[14px] font-helvetica text-[1.25rem] leading-normal font-bold cursor-pointer"
                        >
                            continue shopping
                        </Link>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
