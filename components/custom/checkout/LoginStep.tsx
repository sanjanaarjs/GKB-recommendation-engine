import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ChevronLeft from "@/components/icons/ChevronLeft";
import Text from "@/components/generic/Text";
import { useState } from "react";
import { z } from "zod";
import { setGetSigninOtpData } from "@/lib/store/features/authSlice";
import { useDispatch } from "react-redux";
import { getSigninOtp } from "../header/login/Datas/loginData.api";
import { useRouter } from "next/navigation";

const contactSchema = z
    .string()
    .min(1, { message: "Email address or Phone number is required" })
    .superRefine((val, ctx) => {
        const isPhone = /^[6-9]\d{9}$/.test(val); // Indian phone format
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

        if (/^\d/.test(val)) {
            // starts with number
            if (!isPhone && !isEmail) {
                ctx.addIssue({
                    code: "custom",
                    message: "Invalid phone number",
                });
            }
        } else {
            // starts with letter/symbol → must be email
            if (!isEmail) {
                ctx.addIssue({
                    code: "custom",
                    message: "Invalid email address",
                });
            }
        }
    });

export const formSchema = z.object({
    contact: contactSchema,
});

export default function LoginStep({
    onNext,
    onEdit,
    setUserInput,
}: {
    onNext: () => void;
    onEdit: () => void;
    setUserInput: (value: string) => void;
}) {
    const [value, setValue] = useState("");
    const [error, setError] = useState("");
    const [isRequestingOtp, setIsRequestingOtp] = useState(false);
    const dispatch = useDispatch();

    const handleSubmit = async () => {
        const result = formSchema.safeParse({ contact: value });

        if (!result.success) {
            setError(result.error.issues[0].message);
            return;
        }

        setError("");
        setIsRequestingOtp(true);
        const contact = result?.data?.contact;
        if (contact) {
            try {
                const res = await getOtpByDefault(contact);

                if (res?.success) {
                    setUserInput(contact);
                    onNext();
                } else {
                    setUserInput(contact);
                    onEdit();
                }
            } catch (err) {
                console.error("OTP request error:", err);
                setError("Something went wrong while sending OTP.");
                setTimeout(() => {
                    setError("");
                }, 5000);
            } finally {
                setIsRequestingOtp(false);
            }
        }
    };

    const handleGuestCheckout = () => {
        const result = formSchema.safeParse({ contact: value });

        if (!result.success) {
            setError(result.error.issues[0].message);
            return;
        }

        setError("");
        const contact = result.data.contact;
        setUserInput(contact);
        onEdit();
    };

    // sign in otp
    const getOtpByDefault = async (contact: string) => {
        const res = await getSigninOtp(contact);
        dispatch(setGetSigninOtpData(res));
        return res;
    };

    const router = useRouter();

    return (
        <div className="lg:pr-10 lg:pl-20 pb-8">
            <div className="flex flex-col gap-6 mb-[16px]">
                <div onClick={() => router.push("/cart")}>
                    <ChevronLeft
                        size={24}
                        fill="black"
                        className="cursor-pointer"
                    />
                </div>

                <Text
                    as={"h1"}
                    className="text-black font-helvetica text-[1rem] lg:text-[2rem] font-light mb-[16px] hidden"
                >
                    Proceed to Checkout
                </Text>
            </div>
            <form>
                <div className="bg-white rounded-[8px] shadow-lg px-6 lg:py-8 py-6">
                    <div className="mb-[34px]">
                        <Text
                            as={"h4"}
                            className="text-black font-helvetica text-[1.25rem] font-bold mb-[14px]"
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
                            type="text"
                            placeholder=""
                            value={value}
                            onChange={(e) => {
                                const input = e.target.value.trim();
                                const isPhone = /^\d*$/.test(input);
                                if (isPhone) {
                                    if (input.length <= 10) {
                                        setValue(input);
                                        setError("");
                                    }
                                    return;
                                }
                                setValue(input);
                                setError("");
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    handleSubmit();
                                }
                            }}
                            className={`rounded-full p-3 md:px-10 h-10 md:h-16 text-font-main text-base md:text-xl outline-none
                            peer mb-2 lg:mb-8 border-border-color-light rounded-full h-[64px] text-[1rem] font-helvetica text-font-main
                        ${
                            error
                                ? "border border-font-error focus-visible:ring-font-error focus-visible:ring-[1px]"
                                : ""
                        }`}
                        />
                        <Text
                            as="label"
                            className="
                        hidden lg:block absolute left-[14px] top-[18px] bg-white px-1 
                        font-helvetica text-font-main text-[1.25rem] mb-2 cursor-text
                        transition-all duration-500 ease-in-out
                        peer-hover:top-[-14px] peer-hover:text-sm
                        peer-focus:top-[-14px] peer-focus:text-sm
                        peer-[&:not(:placeholder-shown)]:top-[-14px]
                        peer-[&:not(:placeholder-shown)]:text-sm
                        "
                        >
                            * Email address / Phone number
                        </Text>{" "}
                        <Text
                            as="label"
                            className="text-base font-helvetica text-font-main lg:hidden absolute left-[14px] top-[-14px] bg-white"
                        >
                            * Email address / Phone number
                        </Text>
                        {error && (
                            <p className="text-red-500 text-sm mt-2 text-center font-helvetica">
                                {error}
                            </p>
                        )}
                    </div>

                    <div className="w-full text-center">
                        <Button
                            onClick={() => {
                                handleSubmit();
                            }}
                            className={`my-4 rounded-full cursor-pointer bg-black text-white hover:bg-gray-900 w-full max-w-[340px] p-[24px] font-helvetica text-[1.25rem] leading-normal font-bold
                            ${!value || error ? "opacity-50 cursor-not-allowed" : ""}
                        `}
                            type="button"
                            disabled={!value || !!error || isRequestingOtp}
                        >
                            {isRequestingOtp
                                ? "Processing..."
                                : "Proceed to Checkout"}
                        </Button>
                    </div>
                    <div className="w-full text-center">
                        <Button
                            onClick={handleGuestCheckout}
                            className={`my-4 rounded-full cursor-pointer bg-black text-white hover:bg-gray-900 w-full max-w-[340px] p-[24px] font-helvetica text-[1.25rem] leading-normal font-bold
                                ${!value || error ? "opacity-50 cursor-not-allowed" : ""}`}
                            type="button"
                            disabled={!value || !!error}
                        >
                            Proceed As Guest
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}
