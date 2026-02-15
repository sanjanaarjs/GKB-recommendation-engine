"use client";

import Text from "@/components/generic/Text";
import { Button } from "@/components/ui/button";
import { useLazyQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
    CHECK_GIFT_CARD_BALANCE,
    GiftCardBalanceInfo,
} from "./datas/giftCardCheckBalance.api";

// zod schema
const schema = z.object({
    giftcardCode: z.string().min(1, "* Gift card number is required"),
    giftcardPin: z
        .string()
        .min(1, "* Gift card PIN is required")
        .regex(/^\d+$/, "* PIN must contain only numbers"),
});

type FormData = z.infer<typeof schema>;

export default function CardBalance() {
    const [isResultMode, setIsResultMode] = useState(false); // switches to RESET mode

    const [checkBalanceQuery, { loading, error }] = useLazyQuery(
        CHECK_GIFT_CARD_BALANCE,
        { fetchPolicy: "no-cache" },
    );

    const [apiResponse, setApiResponse] = useState<GiftCardBalanceInfo | null>(
        null,
    );

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    // Submit (API call)
    const onSubmit = async (values: FormData) => {
        const res = await checkBalanceQuery({
            variables: {
                giftcardCode: values.giftcardCode,
                giftcardPin: values.giftcardPin,
            },
        });

        const output = res?.data?.checkGiftCardBalance ?? null;

        setApiResponse(output);

        // Only change button when API returns a response
        if (output) {
            setIsResultMode(true);
        }
    };

    // RESET handler
    const handleReset = () => {
        reset(); // clears input fields
        setApiResponse(null);
        setIsResultMode(false);
    };

    return (
        <div className="lg:mx-42 lg:py-16 mx-10 my-16">
            <Text
                font="helvetica"
                size="productTitle1"
                className="lg:mb-6 mb-4"
            >
                Have a gift card already?
            </Text>

            <Text font="helvetica" size="customtext4" className="lg:mb-16 mb-4">
                Check your card balance
            </Text>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="lg:mt-[34px] lg:mb-[34px] flex flex-col gap-4 lg:flex-row lg:gap-6">
                    {/* Gift Card Number */}
                    <div className="flex flex-1 flex-col h-[64px]">
                        <input
                            {...register("giftcardCode")}
                            placeholder="* Gift card number"
                            className="pl-6 pt-[15px] pb-[11px] lg:px-10 lg:py-5 border-[1px]
                                        lg:flex-1 rounded-[40px] border-border-color-light"
                        />
                        {errors.giftcardCode && (
                            <span className="text-red-500 text-xs mt-2">
                                {errors.giftcardCode.message}
                            </span>
                        )}
                    </div>

                    {/* Gift Card PIN */}
                    <div className="flex flex-1 flex-col h-[64px]">
                        <input
                            {...register("giftcardPin")}
                            placeholder="* Gift card PIN"
                            type="tel"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            onInput={(e) => {
                                e.currentTarget.value =
                                    e.currentTarget.value.replace(/\D/g, "");
                            }}
                            className="pl-6 pt-[15px] pb-[11px] lg:px-10 lg:py-5 border-[1px]
                                       lg:flex-1 rounded-[40px] border-border-color-light"
                        />
                        {errors.giftcardPin && (
                            <span className="text-red-500 text-xs mt-2">
                                {errors.giftcardPin.message}
                            </span>
                        )}
                    </div>
                </div>

                {/* RESPONSE UI */}
                {apiResponse && (
                    <div className="mt-3 lg:mt-0 text-center">
                        {/* If amount is 0 → show message */}
                        {apiResponse.available_amount === 0 ? (
                            <Text size="productTitle" className="text-red-500">
                                {apiResponse.message}
                            </Text>
                        ) : (
                            <Text size="productTitle">
                                your current card balance is{" "}
                                {apiResponse.available_amount}{" "}
                                {apiResponse.currency}
                            </Text>
                        )}
                    </div>
                )}

                {error && (
                    <div className="text-red-500 text-center mt-4">
                        Something went wrong.
                    </div>
                )}

                {/* BUTTON */}
                <div className="flex justify-center mt-5">
                    {isResultMode ? (
                        <Button
                            type="button"
                            onClick={handleReset}
                            className="lg:w-[281px] w-36 h-10 lg:h-[47px] lg:px-18 lg:py-3 
                                       px-6 py-2 border bg-border-color-black rounded-[40px] cursor-pointer"
                        >
                            <Text
                                font="helvetica"
                                size="productTitle3"
                                weight="extrabold"
                                color="white"
                            >
                                Reset
                            </Text>
                        </Button>
                    ) : (
                        <Button
                            type="submit"
                            disabled={loading}
                            className="lg:w-[281px] w-36 h-10 lg:h-[47px] lg:px-18 lg:py-3
                                       px-6 py-2 border bg-border-color-black rounded-[40px] cursor-pointer"
                        >
                            <Text
                                font="helvetica"
                                size="productTitle3"
                                weight="extrabold"
                                color="white"
                            >
                                {loading ? "Checking..." : "Check Balance"}
                            </Text>
                        </Button>
                    )}
                </div>
            </form>
        </div>
    );
}
