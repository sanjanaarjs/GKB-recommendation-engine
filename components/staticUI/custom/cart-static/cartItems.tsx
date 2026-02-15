import Text from "@/components/generic/Text";
import CartDeletion from "@/components/icons/CartDeletion";
import CartMinus from "@/components/icons/CartMinus";
import CartPlus from "@/components/icons/CartPlus";
import CartWishlist from "@/components/icons/CartWishlist";
import ChevronRight from "@/components/icons/ChevronRight";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import { useState } from "react";
export default function CartItems() {
    const [quantity, setQuantity] = useState(1);
    const [isActive, setIsActive] = useState(false);
    return (
        <div className="flex-1 px-[20px] lg:px-[80px]">
            {/* Product Item */}
            {[1, 2].map((_, index) => (
                <div key={index} className="border-b pt-[80px] last:border-b-0">
                    <div className="flex flex-col lg:flex-row gap-4">
                        <div className="h-28 w-28 shrink-0 bg-white">
                            <Image
                                src="https://d1f2zfbmtys0sf.cloudfront.net/media/catalog/product/cache/8fff4c08307eb061f0838e463fc8c110/T/M/TM382BL53_A_1.jpg"
                                alt="Rayban Wayfarer Classic"
                                width={100}
                                height={100}
                                className="h-full w-full object-cover rounded-md"
                            />
                        </div>

                        <div className="flex flex-1 flex-col justify-between">
                            <div className="mb-[32px]">
                                <Text
                                    as="h4"
                                    className="text-sm lg:text-[1.25rem] font-avenir text-black font-extrabold leading-normal mb-2"
                                >
                                    {" "}
                                    Rayban{" "}
                                </Text>
                                <Text
                                    as="h4"
                                    className="text-sm lg:text-[1.25rem] font-helvetica text-black font-light leading-normal mb-4"
                                >
                                    {" "}
                                    Wayfarer Classic{" "}
                                </Text>
                                <div className="flex items-center gap-2">
                                    <Text
                                        as="span"
                                        className="text-sm lg:text-[1.25rem] font-helvetica text-black font-bold leading-normal"
                                    >
                                        {" "}
                                        ₹14,150{" "}
                                    </Text>
                                    <Text
                                        as="span"
                                        className="text-sm lg:text-[1.25rem] font-helvetica text-font-price font-normal leading-normal line-through"
                                    >
                                        {" "}
                                        ₹17,690
                                    </Text>
                                    <Text
                                        as={"span"}
                                        className="text-sm lg:text-[1.25rem] font-helvetica text-font-price font-normal leading-normal"
                                    >
                                        {" "}
                                        (with GST)
                                    </Text>
                                </div>
                            </div>

                            <div className="flex items-center justify-between mb-[32px]">
                                <div className="flex items-center rounded-[2px] border-[0.5px] border-cart-border">
                                    <button
                                        className="p-[13px]"
                                        onClick={() =>
                                            setQuantity(
                                                Math.max(1, quantity - 1),
                                            )
                                        }
                                    >
                                        <CartMinus size={14} fill="black" />
                                    </button>
                                    <div className="bg-cart-border w-[0.5px] h-[40px]"></div>
                                    <span className="mx-2 w-4 text-center text-sm">
                                        {quantity}
                                    </span>
                                    <div className="bg-cart-border w-[0.5px] h-[40px]"></div>
                                    <button
                                        className="p-[13px]"
                                        onClick={() =>
                                            setQuantity(quantity + 1)
                                        }
                                    >
                                        <CartPlus size={14} fill="black" />
                                    </button>
                                </div>
                            </div>

                            <div className="my-2 lg:mb-[80px] text-[1.25rem] text-black text-left flex items-start gap-2 ">
                                <Accordion
                                    type="single"
                                    collapsible
                                    className="w-full flex-1 cart-accordion"
                                >
                                    <AccordionItem value="coupon">
                                        <AccordionTrigger className="text-font-cart font-helvetica text-sm lg:text-[1rem] leading-normal flex items-center justify-start italic">
                                            Details
                                            <ChevronRight
                                                size={16}
                                                fill="black"
                                                className="transition-transform duration-300 rotate-90 data-[state=open]:-rotate-90 chevron-cart-arrow"
                                            />
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <div className="grid grid-cols-2 items-center justify-between mb-[16px]">
                                                <Text
                                                    as={"span"}
                                                    className="font-light font-helvetica text-sm lg:text-[1rem]  leading-normal text-font-cart"
                                                >
                                                    Frame Size:
                                                </Text>
                                                <Text
                                                    as={"span"}
                                                    className="font-medium font-helvetica text-sm lg:text-[1rem] leading-normal text-font-cart"
                                                >
                                                    Medium
                                                </Text>
                                            </div>
                                            <div className="grid grid-cols-2  items-center justify-between mb-[16px]">
                                                <Text
                                                    as={"span"}
                                                    className="font-light font-helvetica text-sm lg:text-[1rem] leading-normal text-font-cart"
                                                >
                                                    Frame color:
                                                </Text>
                                                <Text
                                                    as={"span"}
                                                    className="font-medium font-helvetica text-sm lg:text-[1rem] leading-normal text-font-cart"
                                                >
                                                    Black
                                                </Text>
                                            </div>
                                            <div className="grid grid-cols-2 items-center justify-between mb-[16px]">
                                                <Text
                                                    as={"span"}
                                                    className="font-light font-helvetica text-sm lg:text-[1rem] leading-normal text-font-cart"
                                                >
                                                    Prescription type:
                                                </Text>
                                                <Text
                                                    as={"span"}
                                                    className="font-medium font-helvetica text-sm lg:text-[1rem] leading-normal text-font-cart"
                                                >
                                                    Single-vision
                                                </Text>
                                            </div>
                                            <div className="grid grid-cols-2 items-center justify-between mb-[16px]">
                                                <Text
                                                    as={"span"}
                                                    className="font-light font-helvetica text-sm lg:text-[1rem] leading-normal text-font-cart"
                                                >
                                                    Light protection:
                                                </Text>
                                                <Text
                                                    as={"span"}
                                                    className="font-medium font-helvetica text-sm lg:text-[1rem] leading-normal text-font-cart"
                                                >
                                                    Photochromatic
                                                </Text>
                                            </div>
                                            <div className="grid grid-cols-2 items-center justify-between mb-[16px]">
                                                <Text
                                                    as={"span"}
                                                    className="font-light font-helvetica text-sm lg:text-[1rem] leading-normal text-font-cart"
                                                >
                                                    Lens colour:
                                                </Text>
                                                <Text
                                                    as={"span"}
                                                    className="font-medium font-helvetica text-sm lg:text-[1rem] leading-normal text-font-cart"
                                                >
                                                    Photochromatic
                                                </Text>
                                            </div>
                                            <div className="grid grid-cols-2 items-center justify-between mb-[16px]">
                                                <Text
                                                    as={"span"}
                                                    className="font-light font-helvetica text-sm lg:text-[1rem] leading-normal text-font-cart"
                                                >
                                                    Lens material:
                                                </Text>
                                                <Text
                                                    as={"span"}
                                                    className="font-medium font-helvetica text-sm lg:text-[1rem] leading-normal text-font-cart"
                                                >
                                                    Classic
                                                </Text>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                                <div className="lg:flex-1 pt-2 flex justify-end">
                                    <div className="flex items-center gap-4 ">
                                        <button className="rounded-full p-3 bg-white hover:bg-gray-100 drop-shadow-[0_4px_12px_rgba(0,0,0,0.25)]">
                                            <CartDeletion />
                                        </button>
                                        <button
                                            onClick={() =>
                                                setIsActive(!isActive)
                                            }
                                            className="
                                         rounded-full p-3
                                        bg-white hover:bg-black
                                        drop-shadow-[0_4px_12px_rgba(0,0,0,0.25)] cartwishlist"
                                        >
                                            <CartWishlist
                                                fill={
                                                    isActive ? "black" : "none"
                                                }
                                                stroke={
                                                    isActive ? "black" : "black"
                                                }
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
