import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ChevronLeft from "@/components/icons/ChevronLeft";
import Text from "@/components/generic/Text";

export default function LoginStep({ onNext }: { onNext: () => void }) {
    return (
        <div className="lg:pr-[80px] pb-8">
            <div className="flex flex-col gap-6 mb-[16px]">
                <ChevronLeft
                    size={24}
                    fill="black"
                    className="cursor-pointer"
                />
                <Text
                    as={"h1"}
                    className="text-black font-helvetica text-[1rem] lg:text-[2rem] font-light mb-[16px]"
                >
                    Proceed to Checkout
                </Text>
            </div>

            <div className="bg-white rounded-[8px] shadow-lg px-6 py-8">
                <div className="mb-[34px]">
                    <Text
                        as={"h4"}
                        className="text-black font-helvetica text-sm lg:text-[1.25rem] font-bold mb-[14px]"
                    >
                        Login or checkout as a guest
                    </Text>
                    <Text
                        as={"h4"}
                        className="text-black font-helvetica text-sm lg:text-[1.25rem] font-normal mb-[8px]"
                    >
                        Enter your details to proceed with the purchase
                    </Text>
                </div>

                <div className="relative">
                    <Input
                        className="peer mb-8 border-border-color-light rounded-full h-[64px] text-[1rem] font-helvetica text-font-main"
                        placeholder=" "
                    />

                    <Text
                        as="label"
                        className="
                        absolute left-[14px] top-[18px] bg-white px-1 
                        font-helvetica text-font-main text-[1.25rem] mb-2 cursor-text
                        transition-all duration-500 ease-in-out
                        peer-hover:top-[-14px] peer-hover:text-sm
                        peer-focus:top-[-14px] peer-focus:text-sm
                        "
                    >
                        * Email address / Phone number
                    </Text>
                </div>

                <div className="w-full text-center">
                    <Button
                        onClick={onNext}
                        className="my-4 rounded-full bg-black text-white hover:bg-gray-900 w-full max-w-[340px] p-[24px] font-helvetica text-[1.25rem] leading-normal font-bold"
                    >
                        Proceed to Checkout
                    </Button>
                </div>
            </div>
        </div>
    );
}
