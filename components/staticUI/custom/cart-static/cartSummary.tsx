import Text from "@/components/generic/Text";
import CartCall from "@/components/icons/CartCall";
import CartRefunds from "@/components/icons/CartRefunds";
import CartShipping from "@/components/icons/CartShipping";
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

export default function CartSummary() {
    return (
        <div className="w-full flex-1 lg:px-[80px] border-t lg:border-t-0 lg:border-l lg:pt-0">
            <Accordion
                type="single"
                collapsible
                className="w-full mb-[32px] mt-[48px]"
            >
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
                                type="text"
                                placeholder="*Enter coupon code"
                                className="w-full border border-border-grey h-[48px] px-[30px] py-2 text-sm rounded-full font-helvetica text-[1rem] leading-normal font-light text-black "
                            />
                            <Button className="w-fit border-2 border-black h-[48px] text-font-main text-[1.25rem] font-helvetica  font-bold rounded-full absolute right-0 z-3 cursor-pointer px-[48px] hover:bg-black hover:text-white">
                                apply
                            </Button>
                        </div>
                    </AccordionContent>
                </AccordionItem>

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
                            <div className="flex flex-col lg:flex-row items-center gap-6 w-full mb-6">
                                <input
                                    type="text"
                                    placeholder="*Enter gift card number"
                                    className="w-full border border-border-grey h-[48px] px-[30px] py-2 text-sm rounded-full font-helvetica text-[1rem] leading-normal font-light text-black placeholder:text-font-main"
                                />
                                <Button className="w-full lg:w-fit border border-border-grey h-[48px] text-font-main text-[1rem] font-light font-helvetica rounded-full right-0 z-3 cursor-pointer px-[32px] hover:bg-black hover:text-white">
                                    Enter Pin
                                </Button>
                            </div>
                            <Button className="w-full border-2 border-black h-[48px] text-font-main text-[1.25rem] font-bold rounded-full right-0 z-3 cursor-pointer px-[48px] hover:bg-white font-helvetica ">
                                apply gift card
                            </Button>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

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
