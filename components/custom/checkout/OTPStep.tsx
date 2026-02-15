import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import ChevronLeft from "@/components/icons/ChevronLeft";
import Text from "@/components/generic/Text";
import ChevronRight from "@/components/icons/ChevronRight";
import { getSigninVerifyOtp } from "../header/login/Datas/loginOtpData.api";
import { getSigninOtp } from "../header/login/Datas/loginData.api";
import {
    setGetSigninOtpData,
    setLoggedIn,
} from "@/lib/store/features/authSlice";
import { useDispatch } from "react-redux";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import SetStoreCookieClient from "../cookie/SetStoreCookieClient";
import { getStoredCartId } from "@/lib/cart";
import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_CUSTOMERCART_ID } from "../pdp/datas/addToCart/customerCart.Data.api";
import { MERGE_CARTS } from "../cart/datas/mergeCarts";
import toast from "react-hot-toast";
import { GET_CART_DETAILS } from "../pdp/datas/addToCart/getCart.Data.api";
import { fetchCart } from "@/lib/store/cartSlice";
import { AppDispatch } from "@/lib/store/store";

export default function OTPStep({
    onNext,
    onBack,
    userInput,
}: {
    onNext: () => void;
    onBack: () => void;
    userInput: string;
}) {
    console.log("onBack", onBack);
    const [otp, setOtp] = useState("");
    const [otpError, setOtpError] = useState("");
    const [isVerifying, setIsVerifying] = useState(false);
    const [signinToken, setSigninToken] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState("");
    const [timer, setTimer] = useState<number>(0);
    const [shouldMerge, setShouldMerge] = useState(false);

    const dispatch = useDispatch<AppDispatch>();

    const [getCustomerCart] = useLazyQuery(GET_CUSTOMERCART_ID, {
        fetchPolicy: "no-cache",
    });

    const [mergeCarts] = useMutation(MERGE_CARTS);

    const [getCartDetailsGQL] = useLazyQuery(GET_CART_DETAILS, {
        fetchPolicy: "network-only",
    });

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timer]);

    useEffect(() => {
        const runMerge = async () => {
            if (shouldMerge) {
                await mergeGuestCartIntoCustomerCart();
                setShouldMerge(false);
                onNext();
            }
        };
        runMerge();
    }, [shouldMerge]);

    const formatTime = (seconds: number) => {
        const min = String(Math.floor(seconds / 60)).padStart(2, "0");
        const sec = String(seconds % 60).padStart(2, "0");
        return `${min}:${sec}`;
    };

    const mergeGuestCartIntoCustomerCart = async () => {
        const guestCartId = getStoredCartId();
        if (!guestCartId) return null;

        const result = await getCustomerCart();

        const customerCartId = result?.data?.customerCart?.id;

        // 2. merge carts
        await mergeCarts({
            variables: {
                source_cart_id: guestCartId,
                destination_cart_id: customerCartId,
            },
        });

        // 3. replace local cart ID
        localStorage.setItem("cart_id", customerCartId);

        // Fetch full updated cart details
        const details = await getCartDetailsGQL({
            variables: { cartId: customerCartId },
        });

        //Dispatch cart data to Redux
        if (details?.data?.cart) {
            dispatch(fetchCart());
        }

        return customerCartId;
    };

    // verify otp
    const handleVerifyOtp = async () => {
        if (otp.length !== 6 || !/^\d{6}$/.test(otp)) {
            setOtpError("Please enter a valid 6-digit OTP");
            setTimeout(() => setOtpError(""), 5000);
            return;
        }

        setOtpError("");
        setIsVerifying(true);

        const res = await getSigninVerifyOtp(userInput, otp);

        if (res?.success && res?.token) {
            const encodedToken = btoa(res.token);
            console.log("encodedToken", encodedToken);
            setSigninToken(encodedToken);
            setShouldMerge(true);
            setSuccessMessage("OTP verified successfully");

            toast.success("Logged in successfully!");
            dispatch(setLoggedIn(true));

            document.cookie = `userToken=${encodedToken}; path=/;`;

            setTimeout(() => {
                setIsVerifying(false);
            }, 1500);
        } else {
            const errorMsg = res?.message || "Failed to verify OTP";
            setOtpError(errorMsg);
            setTimeout(() => setOtpError(""), 5000);
            setIsVerifying(false);
        }
    };

    // Resend otp
    const handleResendOtp = async () => {
        if (!userInput) return;

        setOtp("");

        try {
            const res = await getSigninOtp(userInput);

            if (res?.success) {
                dispatch(setGetSigninOtpData(res));

                if (res.otpResendTime !== undefined) {
                    setTimer(res.otpResendTime);
                }
            } else {
                setOtpError(res?.message || "Failed to resend OTP");
                setTimeout(() => setOtpError(""), 5000);
            }
        } catch (err) {
            console.error("Resend OTP error:", err);
            setOtpError("Something went wrong while resending OTP.");
            setTimeout(() => setOtpError(""), 5000);
        }
    };

    // masking phone number
    function maskPhone(phone: string): string {
        if (!phone) return "";
        return phone.replace(/\d(?=\d{2})/g, "*");
    }

    return (
        <>
            {signinToken && (
                <SetStoreCookieClient
                    cookieName="userToken"
                    cookieValue={signinToken}
                />
            )}
            <div className="lg:pr-10 lg:pl-20 pb-8">
                <div className="flex flex-col gap-6 mb-[16px]">
                    <button onClick={onBack}>
                        {" "}
                        <ChevronLeft
                            size={24}
                            fill="black"
                            className="cursor-pointer"
                        />
                    </button>

                    <Text
                        as={"h1"}
                        className="text-black font-helvetica text-[1rem] lg:text-[2rem] font-light mb-[16px] hidden"
                    >
                        Proceed to Checkout
                    </Text>
                </div>

                <div className="bg-white rounded-[8px] shadow-lg px-6 py-8">
                    <div className="mb-[34px]">
                        <Text
                            as={"h4"}
                            className="text-black font-helvetica text-[1.25rem] font-bold mb-[14px]"
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

                    <div className="flex justify-between max-w-[240px] md:max-w-[368px] mb-4 mx-auto">
                        <Text
                            font="helvetica"
                            weight="normal"
                            color="fontMain"
                            className="text-base"
                        >
                            OTP
                        </Text>
                        <Text
                            font="helvetica"
                            weight="normal"
                            color="fontMain"
                            className="text-base"
                        >
                            {maskPhone(userInput)}
                        </Text>
                    </div>

                    <div className="flex gap-3 justify-evenly flex-col items-center">
                        <InputOTP
                            maxLength={6}
                            value={otp}
                            onChange={(value) => {
                                const onlyDigits = value
                                    .replace(/\D/g, "")
                                    .slice(0, 6);
                                setOtp(onlyDigits);
                            }}
                        >
                            <InputOTPGroup className="space-x-4">
                                {Array.from({ length: 6 }, (_, i) => (
                                    <InputOTPSlot
                                        key={i}
                                        index={i}
                                        className="h-8 w-8 md:h-12 md:w-12 mr-2 md:mr-4 rounded-full border border-gray-400 text-center text-lg appearance-none outline-none shadow-none p-0 first:rounded-full last:rounded-full"
                                    />
                                ))}
                            </InputOTPGroup>
                        </InputOTP>
                        {otpError && (
                            <p className="text-red-500 text-sm lg:text-base text-center font-helvetica mt-2">
                                {otpError}
                            </p>
                        )}
                        {successMessage && (
                            <p className="text-green-600 text-sm lg:text-base font-helvetica text-center">
                                {successMessage}
                            </p>
                        )}
                    </div>

                    <div className="w-full text-center flex flex-col justify-center">
                        <div className="w-full my-[32px]">
                            <Button
                                className="cursor-pointer rounded-full bg-black text-white hover:bg-gray-900 w-full max-w-[340px] p-[24px] font-helvetica text-[1.25rem] leading-normal font-bold"
                                onClick={handleVerifyOtp}
                                type="button"
                                disabled={otp.length !== 6}
                            >
                                {isVerifying
                                    ? "Verifying..."
                                    : "Verify OTP and Checkout"}
                            </Button>
                        </div>
                        <div className="flex justify-center">
                            <button
                                disabled={timer > 0}
                                type="button"
                                onClick={handleResendOtp}
                                className="text-[1.25rem] font-helvetica italic leading-normal font-medium cursor-pointer flex items-start gap-4 shadow-none p-0"
                            >
                                {timer > 0
                                    ? `Resend OTP in ${formatTime(timer)}`
                                    : "Resend OTP"}
                                {timer === 0 && (
                                    <div className="italic">
                                        <ChevronRight size={16} fill="black" />
                                    </div>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
