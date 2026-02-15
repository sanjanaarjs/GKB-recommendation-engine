import React from "react";
import { Button } from "@/components/ui/button";
import ChevronLeft from "@/components/icons/ChevronLeft";
import Text from "@/components/generic/Text";

export default function PaymentStep({
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
                    how would you like to pay?
                </Text>
            </div>

            <div className="bg-white shadow-lg py-8 px-6 border-r-2">
                <h3 className="text-xl font-semibold mb-12">Payment options</h3>

                <label className="flex items-start gap-4 border rounded-md mb-12 cursor-pointer border-0">
                    <input
                        type="radio"
                        name="pay"
                        defaultChecked
                        className="scale-125 mt-[6px] accent-black"
                    />
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <img
                                src="./images/checkout/razorpay.svg"
                                alt="razorpay"
                                className="h-6"
                            />
                        </div>
                        <div className="text-xl">
                            UPI, Credit / Debit cards, Netbanking, Digital
                            wallets, EMI options
                        </div>
                    </div>
                </label>

                <label className="flex items-start gap-4 border rounded-md mb-6 cursor-pointer border-0">
                    <input
                        type="radio"
                        name="pay"
                        className="scale-125 mt-[6px] accent-black"
                    />
                    <div>
                        <div className="text-xl font-bold mb-2">
                            Cash on delivery (COD)
                        </div>
                        <div className="text-xl">
                            Pay via UPI or cash at the time of delivery
                        </div>
                    </div>
                </label>

                <div className="w-full text-center">
                    <Button
                        onClick={onNext}
                        className="my-4 rounded-full bg-black text-white hover:bg-gray-900 w-full max-w-[340px] p-[24px] font-helvetica text-[1.25rem] leading-normal font-bold"
                    >
                        pay now
                    </Button>
                </div>
            </div>
        </div>
    );
}
