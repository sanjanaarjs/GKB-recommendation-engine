import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import TruckDelivery from "@/components/icons/TruckDelivery";
import CheckoutPayment from "@/components/icons/CheckoutPayment";
import CheckoutHelp from "@/components/icons/CheckoutHelp";
import CartRefunds from "@/components/icons/CartRefunds";
import { Separator } from "@/components/ui/separator";

export default function ConfirmationStep() {
    return (
        <Card>
            <CardContent className="py-6 lg:pr-[80px] pb-8">
                <h1 className="text-3xl font-light mb-4">
                    thank you for your purchase!
                </h1>
                <p className="text-sm text-gray-700 mb-8">
                    An experienced optometrist will contact you shortly. Your
                    order will be processed only after confirmation during the
                    call.
                </p>
                <Separator className="bg-border-color-light" />
                <div className="pt-6">
                    <h3 className="text-xl font-bold mb-4">
                        Create your account with just one click!
                    </h3>
                    <ul className="list-inside text-sm text-gray-700 mb-4">
                        <li className="flex items-center gap-2 mb-2">
                            <img
                                src="./images/checkout/tick.svg"
                                alt="razorpay"
                                className="h-6"
                            />
                            <p className="text-base">Faster checkout</p>
                        </li>
                        <li className="flex items-center gap-2  mb-2">
                            <img
                                src="./images/checkout/tick.svg"
                                alt="razorpay"
                                className="h-6"
                            />
                            <p className="text-base">
                                Access to past prescriptions
                            </p>
                        </li>
                        <li className="flex items-center gap-2">
                            <img
                                src="./images/checkout/tick.svg"
                                alt="razorpay"
                                className="h-6"
                            />
                            <p className="text-base">
                                10% off on your next purchase
                            </p>
                        </li>
                    </ul>

                    <div className="flex items-center rounded-full border border-[#BDC6D0] mb-4">
                        <input
                            className=" px-4 py-3 w-1/2 text-base focus:outline-none"
                            placeholder="email.address@gmail.com"
                        />
                        <button className="primary-button-black rounded-full px-2 py-3 h-full w-1/2 border-2 border-black text-xl justify-center">
                            + create account
                        </button>
                    </div>
                    <p className="text-xs font-bold">
                        If you already have an account, in the future be sure to
                        sign in before your purchase!
                    </p>

                    <div className="mt-6 grid grid-cols-4 gap-4">
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
                </div>
            </CardContent>
        </Card>
    );
}
