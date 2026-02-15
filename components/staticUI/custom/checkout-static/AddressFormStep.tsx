import React from "react";
import { Button } from "@/components/ui/button";
import ChevronLeft from "@/components/icons/ChevronLeft";
import Text from "@/components/generic/Text";
import { Input } from "@/components/ui/input";

export default function AddressFormStep({
    onNext,
    onBack,
}: {
    onNext: () => void;
    onBack: () => void;
}) {
    return (
        <div className="lg:pr-[80px] pb-8">
            <div className="flex flex-col gap-6 mb-[16px]">
                <div onClick={onBack}>
                    {" "}
                    <ChevronLeft
                        size={24}
                        fill="black"
                        className="cursor-pointer"
                    />
                </div>

                <Text
                    as={"h1"}
                    className="text-black font-helvetica text-[1rem] lg:text-[2rem] font-light mb-[16px]"
                >
                    Address edit
                </Text>
            </div>

            <div className="bg-white shadow-lg p-6 rounded-[8px]">
                <div className="mb-[34px]">
                    <h4 className="text-black font-helvetica text-sm lg:text-[1.25rem] font-bold mb-[8px]">
                        Shipping details
                    </h4>
                    <h4 className="text-black font-helvetica text-sm lg:text-[1.25rem] font-normal">
                        Enter your details and checkout as a guest
                    </h4>
                </div>
                <div className="relative">
                    <Input
                        className="peer mb-8 border-border-color-light rounded-full h-[64px] text-[1rem] font-helvetica text-font-main"
                        placeholder=""
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
                        * Phone number
                    </Text>
                </div>
                <div className="relative">
                    <Input className="peer mb-8 border-border-color-light rounded-full h-[64px] text-[1rem] font-helvetica text-font-main" />

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
                        * First name
                    </Text>
                </div>
                <div className="relative">
                    <Input className="peer mb-8 border-border-color-light rounded-full h-[64px] text-[1rem] font-helvetica text-font-main" />

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
                        * Last name
                    </Text>
                </div>
                <div className="relative">
                    <Input className="peer mb-8 border-border-color-light rounded-full h-[64px] text-[1rem] font-helvetica text-font-main" />

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
                        * Street address
                    </Text>
                </div>
                <div className="flex gap-2">
                    <div className="relative w-full">
                        <Input className="peer mb-8 border-border-color-light rounded-full h-[64px] text-[1rem] font-helvetica text-font-main" />

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
                            * State
                        </Text>
                    </div>
                    <div className="relative w-full">
                        <Input className="peer mb-8 border-border-color-light rounded-full h-[64px] text-[1rem] font-helvetica text-font-main" />

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
                            * City
                        </Text>
                    </div>
                </div>
                <div className="flex gap-3">
                    <div className="w-full text-center">
                        <Button
                            onClick={onNext}
                            className="my-4 rounded-full bg-black text-white hover:bg-gray-900 w-full max-w-[340px] p-[24px] font-helvetica text-[1.25rem] leading-normal font-bold"
                        >
                            save address
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
