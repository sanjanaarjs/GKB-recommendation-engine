"use client";

import Image from "next/image";
import Text from "@/components/generic/Text";
import ChevronRight from "@/components/icons/ChevronRight";
import { getOtp } from "./SignupOtpSend.api";
import { verifyOtp } from "./SignUpVerifyOtp.api";
import { createCustomer } from "./CreateCustomer.api";
import { useAppDispatch, useAppSelector } from "@/lib/store/hook";
import {
    setCustomerDetails,
    setGetOtpData,
} from "@/lib/store/features/signupSlice";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { useEffect, useState } from "react";
import SetStoreCookieClient from "../cookie/SetStoreCookieClient";
import Login from "../header/login/login";

const FormSchema = z.object({
    firstName: z
        .string()
        .min(1, "First name is required")
        .regex(/^[A-Za-z\s]+$/, "Only alphabets allowed"),

    lastName: z
        .string()
        .min(1, "Last name is required")
        .regex(/^[A-Za-z\s]+$/, "Only alphabets allowed"),

    email: z
        .string()
        .min(1, "Email is required")
        .email("* Invalid email address"),

    phone: z
        .string()
        .min(1, "Phone number is required")
        .refine((val) => val.length === 10, {
            message: "* Phone number must be exactly 10 digits",
        }),
});

const otpSchema = z.object({
    otp: z
        .string()
        .min(1, { message: "Please enter the OTP to login" })
        .length(6, { message: "OTP must be exactly 6 digits" })
        .regex(/^\d+$/, { message: "OTP must contain only numbers" }),
});

type FormValues = z.infer<typeof FormSchema>;
type OtpFormValues = z.infer<typeof otpSchema>;

export default function Signup() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: zodResolver(FormSchema),
    });

    const {
        control,
        handleSubmit: handleOtpSubmitForm,
        formState: { errors: OtpErrors },
    } = useForm<OtpFormValues>({
        resolver: zodResolver(otpSchema),
        defaultValues: {
            otp: "",
        },
    });

    const dispatch = useAppDispatch();
    const [signupEnable, setSignupEnable] = useState<boolean>(true);
    const [isOtpDisabled, setIsOtpDisabled] = useState<boolean>(false);
    const [isEmail, setIsEmail] = useState<string>("");
    const [message, setMessage] = useState<string | null>(null);
    const [isError, setIsError] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isVerifying, setIsVerifying] = useState(false);
    const [signupToken, setSignupToken] = useState<string | null>(null);
    const [timer, setTimer] = useState<number>(0);
    const { getOtpData } = useAppSelector((state) => state.signupSlice);
    const [isLoginPopup, setIsLoginPopup] = useState(false);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timer]);

    const formatTime = (seconds: number) => {
        const min = String(Math.floor(seconds / 60)).padStart(2, "0");
        const sec = String(seconds % 60).padStart(2, "0");
        return `${min}:${sec}`;
    };

    const onSubmit = (data: FormValues) => {
        setIsSubmitting(true);
        dispatch(
            setCustomerDetails({
                input: {
                    firstname: data.firstName,
                    lastname: data.lastName,
                    email: data.email,
                    is_subscribed: true,
                    mobile_number: data.phone,
                },
            }),
        );
        getOtpOnSubmit(data.email);
        setIsEmail(data.email);
    };

    const getOtpOnSubmit = async (email: string) => {
        setIsVerifying(false);
        const res = await getOtp(email);
        dispatch(setGetOtpData(res));
        if (!res?.success) {
            setIsError(true);
            setMessage(res?.message ?? "");
            // if(res?.success) {

            // }

            setIsSubmitting(false);
            setIsVerifying(false);

            setTimeout(() => {
                setIsError(false);
                setMessage("");
            }, 5000);
        } else {
            setSignupEnable(false);
            setIsError(false);
            setMessage(res?.message ?? "");
            setTimeout(() => {
                setMessage("");
            }, 5000);
        }
        setIsOtpDisabled(false);
    };

    const handleResendOtp = (email: string) => {
        if (timer === 0) {
            getOtpOnSubmit(email);
            if (getOtpData?.otpResendTime !== undefined) {
                setTimer(getOtpData.otpResendTime);
            }
        }
    };

    const onSubmitOtp = (otpData: OtpFormValues) => {
        setIsOtpDisabled(true);
        setIsVerifying(true);
        createNewCustomer(isEmail, otpData.otp);
    };

    const customerDetails = useAppSelector((state) => state.signupSlice);

    const createNewCustomer = async (email: string, otpData: string) => {
        const otpres = await verifyOtp(email, otpData);
        setIsOtpDisabled(false);
        if (!otpres?.success) {
            setIsError(true);
            setMessage(otpres?.message ?? "");
            setIsVerifying(false);

            setTimeout(() => {
                setIsError(false);
                setMessage("");
            }, 5000);

            return;
        }

        try {
            if (customerDetails?.customerDetails?.input) {
                const customer = await createCustomer(
                    customerDetails?.customerDetails?.input,
                );

                if (customer?.customer) {
                    setMessage(customer?.message ?? "");
                    if (customer?.customer?.token) {
                        const encodedToken = btoa(customer?.customer?.token);
                        setSignupToken(encodedToken);
                    }
                    window.location.href = `/`;
                }
            }
        } catch (error) {
            let errorMessage = "";

            if (
                typeof error === "object" &&
                error !== null &&
                "graphQLErrors" in error
            ) {
                const gqlErrors = (
                    error as {
                        graphQLErrors: { message: string }[];
                    }
                ).graphQLErrors;

                errorMessage = gqlErrors?.[0]?.message || errorMessage;
            }

            setIsError(true);
            setMessage(errorMessage);

            setTimeout(() => {
                setIsError(false);
                setMessage("");
            }, 5000);
        } finally {
            setIsVerifying(false);
        }
    };

    return (
        <>
            {isLoginPopup && (
                <Login
                    isLoginPopup={isLoginPopup}
                    setIsLoginPopup={setIsLoginPopup}
                />
            )}
            {signupToken && (
                <SetStoreCookieClient
                    cookieName="userToken"
                    cookieValue={signupToken}
                />
            )}
            <div className="min-h-screen flex flex-col lg:flex-row items-stretch font-helvetica">
                {/* Left Promo Section */}
                <div className="w-full lg:w-[65%]">
                    <div className="relative w-full h-full">
                        <div className="absolute inset-0">
                            <Image
                                src="/images/signup/signupbanner.png"
                                alt="Glasses Promo"
                                fill
                                style={{ objectFit: "cover" }}
                            />
                        </div>

                        <div className="absolute inset-0" />
                        <div className="flex flex-col justify-between items-center h-full text-center z-10 relative lg:pt-[62px] lg:pb-[62px] py-5 gap-20">
                            <div>
                                <Text
                                    as="h2"
                                    color="fontMain"
                                    weight="normal"
                                    className="lg:text-[3.5rem] text-[2.5rem]"
                                >
                                    Avail{" "}
                                    <Text
                                        as="span"
                                        weight="bold"
                                        className="italic lg:text-[3.5rem] text-[2.5rem]"
                                    >
                                        flat 10% off
                                    </Text>{" "}
                                    <br />
                                    on your first purchase!
                                </Text>
                            </div>

                            <div className="grid gap-2 w-full lg:gap-4 text-center align-items-center bg-white/20 p-3">
                                <Text
                                    font="helvetica"
                                    as="p"
                                    color="black"
                                    className="text-[1rem] lg:text-[2rem] font-[300] leading-[normal]"
                                >
                                    Sign up and Shop now
                                </Text>
                                <Text
                                    font="helvetica"
                                    as="p"
                                    color="black"
                                    className="text-[1rem] lg:text-[2rem] font-[300] leading-[normal]"
                                >
                                    Use code &quot;
                                    <Text
                                        font="helvetica"
                                        as="span"
                                        weight="bold"
                                        className="text-[1rem] lg:text-[2rem] leading-[normal] text-font-accent-1"
                                    >
                                        GKB10
                                    </Text>
                                    &quot;
                                </Text>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Signup Form */}
                <div className="w-full lg:w-[35%] bg-white flex flex-col justify-center px-5 lg:px-10 my-10">
                    <div className="w-full">
                        {signupEnable ? (
                            <form
                                noValidate
                                className="space-y-4 font-helvetica mb-10 lg:mb-[112px]"
                                onSubmit={handleSubmit(onSubmit)}
                            >
                                <Text
                                    as="h3"
                                    font="helvetica"
                                    className="text-[2rem] font-[300] mb-4 leading-[normal] text-black"
                                >
                                    Let&apos;s create an account!
                                </Text>
                                <Text
                                    as="p"
                                    weight="bold"
                                    font="helvetica"
                                    className="text-[1.25rem] mb-6 flex gap-5"
                                >
                                    Already have an account?{" "}
                                    <button
                                        className="cursor-pointer"
                                        onClick={() => setIsLoginPopup(true)}
                                    >
                                        <Text
                                            as="a"
                                            weight="normal"
                                            className="leading-[normal] text-black italic text-[1.25rem] flex gap-2 items-center underline"
                                            font="helvetica"
                                        >
                                            Sign in{" "}
                                            <ChevronRight
                                                size={12}
                                                fill="black"
                                            />
                                        </Text>
                                    </button>
                                </Text>
                                <div className="mb-8">
                                    <div className="relative">
                                        <Input
                                            type="text"
                                            placeholder=" "
                                            {...register("firstName")}
                                            onInput={(e) => {
                                                e.currentTarget.value =
                                                    e.currentTarget.value.replace(
                                                        /[^A-Za-z\s]/g,
                                                        "",
                                                    );
                                            }}
                                            className={`
            peer w-full px-4 py-3 border rounded-full
            text-font-main placeholder-font-main font-[300]
            lg:min-h-[64px] h-12 outline-none shadow-none
            ${
                errors.firstName
                    ? "border-font-error focus-visible:ring-font-error focus-visible:ring-[1px]"
                    : "border-border-color-light focus:border-black focus:ring-1 focus:ring-black"
            }
        `}
                                        />

                                        <Text
                                            as="label"
                                            className="
            absolute left-[20px] top-[12px] lg:top-[18px] bg-white px-1
            font-helvetica text-font-main text-base cursor-text
            transition-all duration-500 ease-in-out
            peer-hover:top-[-14px] peer-hover:text-sm
            peer-focus:top-[-14px] peer-focus:text-sm
            peer-[&:not(:placeholder-shown)]:top-[-14px]
            peer-[&:not(:placeholder-shown)]:text-sm"
                                        >
                                            * First name
                                        </Text>
                                    </div>

                                    {errors.firstName && (
                                        <Text
                                            font="helvetica"
                                            color="fontError"
                                            size="sm"
                                            className="mt-1"
                                        >
                                            {errors.firstName.message}
                                        </Text>
                                    )}
                                </div>
                                <div className="mb-8">
                                    <div className="relative">
                                        <Input
                                            type="text"
                                            placeholder=" "
                                            {...register("lastName")}
                                            onInput={(e) => {
                                                e.currentTarget.value =
                                                    e.currentTarget.value.replace(
                                                        /[^A-Za-z\s]/g,
                                                        "",
                                                    );
                                            }}
                                            className={`
            peer w-full px-4 py-3 border rounded-full
            text-font-main placeholder-font-main font-[300]
            lg:min-h-[64px] h-12 outline-none shadow-none
            ${
                errors.lastName
                    ? "border-font-error focus-visible:ring-font-error focus-visible:ring-[1px]"
                    : "border-border-color-light focus:border-black focus:ring-1 focus:ring-black"
            }
        `}
                                        />

                                        <Text
                                            as="label"
                                            className="
            absolute left-[20px] top-[12px] lg:top-[18px] bg-white px-1
            font-helvetica text-font-main text-base cursor-text
            transition-all duration-500 ease-in-out
            peer-hover:top-[-14px] peer-hover:text-sm
            peer-focus:top-[-14px] peer-focus:text-sm
            peer-[&:not(:placeholder-shown)]:top-[-14px]
            peer-[&:not(:placeholder-shown)]:text-sm"
                                        >
                                            * Last name
                                        </Text>
                                    </div>

                                    {errors.lastName && (
                                        <Text
                                            font="helvetica"
                                            color="fontError"
                                            size="sm"
                                            className="mt-1"
                                        >
                                            {errors.lastName.message}
                                        </Text>
                                    )}
                                </div>
                                <div className="mb-8">
                                    <div className="relative">
                                        <Input
                                            type="email"
                                            placeholder=" "
                                            {...register("email")}
                                            className={`
            peer w-full px-4 py-3 border rounded-full
            text-font-main placeholder-font-main font-[300]
            lg:min-h-[64px] h-12 outline-none shadow-none
            ${
                errors.email
                    ? "border-font-error focus-visible:ring-font-error focus-visible:ring-[1px]"
                    : "border-border-color-light focus:border-black focus:ring-1 focus:ring-black"
            }
        `}
                                        />

                                        <Text
                                            as="label"
                                            className="
            absolute left-[20px] top-[12px] lg:top-[18px] bg-white px-1
            font-helvetica text-font-main text-base cursor-text
            transition-all duration-500 ease-in-out
            peer-hover:top-[-14px] peer-hover:text-sm
            peer-focus:top-[-14px] peer-focus:text-sm
            peer-[&:not(:placeholder-shown)]:top-[-14px]
            peer-[&:not(:placeholder-shown)]:text-sm"
                                        >
                                            * Email address
                                        </Text>
                                    </div>

                                    {errors.email && (
                                        <Text
                                            font="helvetica"
                                            color="fontError"
                                            size="sm"
                                            className="mt-1"
                                        >
                                            {errors.email.message}
                                        </Text>
                                    )}
                                </div>
                                <div className="mb-8">
                                    <div className="relative">
                                        <Input
                                            type="tel"
                                            placeholder=" "
                                            {...register("phone")}
                                            onInput={(e) => {
                                                e.currentTarget.value =
                                                    e.currentTarget.value.replace(
                                                        /[^0-9]/g,
                                                        "",
                                                    );
                                            }}
                                            maxLength={10}
                                            className={`
            peer w-full px-4 py-3 border rounded-full
            text-font-main placeholder-font-main font-[300]
            lg:min-h-[64px] h-12 outline-none shadow-none
            ${
                errors.phone
                    ? "border-font-error focus-visible:ring-font-error focus-visible:ring-[1px]"
                    : "border-border-color-light focus:border-black focus:ring-1 focus:ring-black"
            }`}
                                        />

                                        <Text
                                            as="label"
                                            className="
            absolute left-[20px] top-[12px] lg:top-[18px] bg-white px-1
            font-helvetica text-font-main text-base cursor-text
            transition-all duration-500 ease-in-out
            peer-hover:top-[-14px] peer-hover:text-sm
            peer-focus:top-[-14px] peer-focus:text-sm
            peer-[&:not(:placeholder-shown)]:top-[-14px]
            peer-[&:not(:placeholder-shown)]:text-sm"
                                        >
                                            * Phone number
                                        </Text>
                                    </div>

                                    {errors.phone && (
                                        <Text
                                            font="helvetica"
                                            size="sm"
                                            color="fontError"
                                            className="mt-1"
                                        >
                                            {errors.phone.message}
                                        </Text>
                                    )}
                                </div>

                                <div className="flex justify-center">
                                    <button
                                        type="submit"
                                        className="p-3 bg-black text-white font-semibold whitespace-nowrap rounded-full font-helvetica text-[1.25rem] max-w-[100%] w-full lg:w-[50%] mx-auto cursor-pointer"
                                    >
                                        {isSubmitting
                                            ? "Creating Account..."
                                            : "Create Account"}
                                    </button>
                                </div>
                                {message && (
                                    <div className="my-4 min-h-[15.5px] text-center text-xs">
                                        <Text
                                            size="sm"
                                            className={`text-xs ${isError ? "text-font-error" : "text-green-600"}`}
                                        >
                                            {message}
                                        </Text>
                                    </div>
                                )}
                            </form>
                        ) : (
                            // otp
                            <>
                                <form
                                    onSubmit={handleOtpSubmitForm(onSubmitOtp)}
                                >
                                    <Text
                                        as="h2"
                                        font="helvetica"
                                        size="loginTitle"
                                        weight="light"
                                        color="black"
                                        className="mt-6 md:mt-20 mb-8 text-center"
                                    >
                                        You’re almost there!
                                    </Text>

                                    <div className="flex justify-between max-w-[240px] md:max-w-[328px] mb-4 mx-auto">
                                        <Text
                                            font="helvetica"
                                            size="customtext2"
                                            weight="normal"
                                            color="fontMain"
                                        >
                                            OTP
                                        </Text>
                                        <Text
                                            font="helvetica"
                                            size="customtext2"
                                            weight="normal"
                                            color="fontMain"
                                        >
                                            {isEmail}
                                        </Text>
                                    </div>
                                    <div className="flex flex-col items-center gap-6 md:gap-16">
                                        <div className="flex justify-center flex-col">
                                            <Controller
                                                name="otp"
                                                control={control}
                                                render={({ field }) => (
                                                    <InputOTP
                                                        maxLength={6}
                                                        value={field.value}
                                                        onChange={(val) => {
                                                            const onlyDigits =
                                                                val
                                                                    .replace(
                                                                        /\D/g,
                                                                        "",
                                                                    )
                                                                    .slice(
                                                                        0,
                                                                        6,
                                                                    );
                                                            field.onChange(
                                                                onlyDigits,
                                                            );
                                                        }}
                                                        disabled={isOtpDisabled}
                                                    >
                                                        <InputOTPGroup className="space-x-8 gap-2">
                                                            {Array.from({
                                                                length: 6,
                                                            }).map((_, i) => (
                                                                <InputOTPSlot
                                                                    key={i}
                                                                    index={i}
                                                                    className="h-12 w-12 mr-0 rounded-full border border-gray-400 text-center text-lg appearance-none outline-none shadow-none p-0 first:rounded-full last:rounded-full"
                                                                />
                                                            ))}
                                                        </InputOTPGroup>
                                                    </InputOTP>
                                                )}
                                            />
                                            {OtpErrors.otp && (
                                                <Text
                                                    color="fontError"
                                                    size="sm"
                                                    className="mt-4 text-center"
                                                >
                                                    {OtpErrors.otp.message}
                                                </Text>
                                            )}
                                        </div>
                                        <div>
                                            <button
                                                className={`mb-3 md:mb-6 cursor-pointer ${
                                                    isOtpDisabled
                                                        ? "pointer-events-none cursor-not-allowed"
                                                        : "cursor-pointer"
                                                }`}
                                                disabled={isOtpDisabled}
                                            >
                                                <Text
                                                    color="fontInverse"
                                                    as="p"
                                                    font="helvetica"
                                                    size="orText"
                                                    weight="bold"
                                                    className="bg-black py-3 px-8 md:px-16 rounded-full"
                                                >
                                                    {isVerifying
                                                        ? "Verifying..."
                                                        : "verify OTP and sign in"}
                                                </Text>
                                            </button>
                                            {message && (
                                                <div className="my-4 min-h-[15.5px] text-center text-xs">
                                                    <Text
                                                        size="sm"
                                                        className={`text-xs ${isError ? "text-font-error" : "text-green-600"}`}
                                                    >
                                                        {message}
                                                    </Text>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </form>
                                <button
                                    className={`flex gap-2 items-center justify-center w-full cursor-pointer ${
                                        timer > 0
                                            ? "pointer-events-none opacity-50"
                                            : "cursor-pointer"
                                    }`}
                                    onClick={() => handleResendOtp(isEmail)}
                                    disabled={timer > 0}
                                >
                                    <Text
                                        color="black"
                                        as="p"
                                        font="helvetica"
                                        size="orText"
                                        weight="normal"
                                        className="italic underline"
                                    >
                                        {timer > 0
                                            ? `Resend OTP in ${formatTime(timer)}`
                                            : "Resend OTP"}
                                    </Text>

                                    {timer === 0 && (
                                        <ChevronRight
                                            size={16}
                                            fill="black"
                                            className="w-3 md:w-4"
                                        />
                                    )}
                                </button>
                            </>
                        )}

                        <Text
                            as="p"
                            weight="semibold"
                            font="helvetica"
                            className="text-[1.25rem] leading-[normal] text-black grid align-items-center text-center mt-7"
                        >
                            By creating an account,
                            <Text
                                as="span"
                                weight="semibold"
                                font="helvetica"
                                className="text-[1.25rem] leading-[normal] text-black"
                            >
                                you accept our{" "}
                                <Text
                                    as="span"
                                    weight="normal"
                                    className="text-[1.25rem] leading-[normal] text-black italic"
                                >
                                    T&Cs
                                </Text>{" "}
                                and{" "}
                                <Text
                                    as="span"
                                    weight="normal"
                                    className="text-[1.25rem] leading-[normal] text-black italic"
                                >
                                    Privacy Policy
                                </Text>
                            </Text>
                        </Text>
                    </div>
                </div>
            </div>
        </>
    );
}
