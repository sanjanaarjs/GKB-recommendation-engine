import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ChevronLeft from "@/components/icons/ChevronLeft";
import Text from "@/components/generic/Text";
import ChevronRight from "@/components/icons/ChevronRight";

export default function OTPStep({
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
                    <ChevronLeft size={24} fill="black" />
                </div>

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
                        Login to access saved addresses
                    </Text>
                    <Text
                        as={"p"}
                        className="text-black font-helvetica text-sm lg:text-[1rem] font-normal mb-[8px]"
                    >
                        Enter OTP to proceed with the purchase
                    </Text>
                </div>

                <div className="flex gap-3 justify-evenly lg:max-w-[70%] mx-auto mb-4">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <Input
                            key={i}
                            className="w-12 h-12 text-center rounded-full border-border-color-light"
                            maxLength={1}
                        />
                    ))}
                </div>

                <div className="w-full text-center flex flex-col justify-center">
                    <div className="w-full my-[32px]">
                        <Button
                            onClick={onNext}
                            className="rounded-full bg-black text-white hover:bg-gray-900 w-full max-w-[340px] p-[24px] font-helvetica text-[1.25rem] leading-normal font-bold"
                        >
                            Verify OTP and Checkout
                        </Button>
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="button"
                            className="text-[1.25rem] font-helvetica italic leading-normal font-medium cursor-pointer flex items-start gap-4 shadow-none p-0"
                        >
                            Resend OTP
                            <div className="italic">
                                <ChevronRight size={16} fill="black" />
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
