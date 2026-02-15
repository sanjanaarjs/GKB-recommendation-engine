import React from "react";
import { Button } from "@/components/ui/button";
import CartWarranty from "@/components/icons/CartWarranty";
import CartRefunds from "@/components/icons/CartRefunds";
import CartShipping from "@/components/icons/CartShipping";
import CartCall from "@/components/icons/CartCall";
import Text from "@/components/generic/Text";
import { Separator } from "@/components/ui/separator";

export default function OrderSummary() {
    return (
        <div className="w-full flex-1 lg:px-[80px] border-t lg:border-t-0 lg:border-l lg:pt-0">
            <div className="space-y-2">
                <Text
                    as="h2"
                    className="font-helvetica text-[1rem] font-bold leading-normal text-black w-full mb-[32px]"
                >
                    Order Summary
                </Text>
                <div className="flex justify-between mb-[16px]">
                    <Text
                        as={"span"}
                        className="font-light font-helvetica text-[1.25rem] leading-normal text-black"
                    >
                        Item totals (2 items)
                    </Text>
                    <Text
                        as={"span"}
                        className="font-bold font-helvetica text-[1.25rem] leading-normal text-black"
                    >
                        ₹20,980
                    </Text>
                </div>
                <div className="flex justify-between mb-[16px]">
                    <Text
                        as={"span"}
                        className="font-light font-helvetica text-[1.25rem] leading-normal text-black"
                    >
                        Shipping charges
                    </Text>
                    <Text
                        as={"span"}
                        className="font-light font-helvetica text-[1rem] leading-normal text-font-price"
                    >
                        Calculated at checkout
                    </Text>
                </div>
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
                        − ₹4,000
                    </Text>
                </div>
            </div>

            <Separator className="my-8 bg-border-color-light" />
            <div className="mb-[32px]">
                <div className="flex justify-between text-base font-semibold">
                    <Text
                        as={"span"}
                        className="font-bold font-helvetica text-[1.25rem] leading-normal text-black"
                    >
                        Grand total
                    </Text>
                    <Text
                        as={"span"}
                        className="font-bold font-helvetica text-[1.25rem] leading-normal text-black"
                    >
                        ₹20,980
                    </Text>
                </div>
                <Text
                    as={"p"}
                    className="font-light font-helvetica text-[1.25rem] leading-normal text-black"
                >
                    (inclusive of all taxes)
                </Text>
            </div>
            <div className="w-full text-center">
                <Button className="my-4 rounded-full bg-black text-white hover:bg-gray-900 w-full max-w-[340px] p-[24px] font-helvetica text-[1.25rem] leading-normal font-bold">
                    proceed to checkout
                </Button>
            </div>

            <div className="mt-[48px] flex flex-wrap gap-4 justify-evenly">
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
