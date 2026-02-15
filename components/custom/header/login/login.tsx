import Text from "@/components/generic/Text";
import { usePathname, useRouter } from "next/navigation";
import ChevronRight from "@/components/icons/ChevronRight";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { z } from "zod";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { getSigninOtp } from "./Datas/loginData.api";
import { getSigninVerifyOtp } from "./Datas/loginOtpData.api";
import SetStoreCookieClient from "../../cookie/SetStoreCookieClient";
import {
    setGetSigninOtpData,
    setLoggedIn,
} from "@/lib/store/features/authSlice";
import { useDispatch } from "react-redux";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { getCustomerCart } from "../../pdp/datas/addToCart/customerCart.Data.api";
import { setStoredCartId } from "@/lib/cart";
import { fetchCart } from "@/lib/store/cartSlice";
import { AppDispatch } from "@/lib/store/store";

type LoginProps = {
    isLoginPopup: boolean;
    setIsLoginPopup: (open: boolean) => void;
    setIsLoggedIn?: (open: boolean) => void;
};

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

export default function Login({
    isLoginPopup,
    setIsLoginPopup,
    setIsLoggedIn,
}: Readonly<LoginProps>) {
    const router = useRouter();
    const [step, setStep] = useState<"login" | "otp">("login");
    const [otp, setOtp] = useState("");
    const [otpError, setOtpError] = useState("");
    const [value, setValue] = useState("");
    const [error, setError] = useState("");
    const [contact, setContact] = useState("");
    const [isVerifying, setIsVerifying] = useState(false);
    const [isRequestingOtp, setIsRequestingOtp] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [signinToken, setSigninToken] = useState<string | null>(null);
    const [timer, setTimer] = useState<number>(0);

    const dispatch = useDispatch<AppDispatch>();

    const pathname = usePathname();

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

    const handleClick = () => {
        setIsLoginPopup(false);
        router.push("/signup");
    };

    const handleSubmit = async () => {
        const result = formSchema.safeParse({ contact: value });

        if (!result.success) {
            setError(result.error.issues[0].message);
            setTimeout(() => {
                setError("");
            }, 5000);
            return;
        }

        setError("");
        setIsRequestingOtp(true);
        const contact = result.data.contact;
        setContact(contact);

        try {
            const res = await getOtpByDefault(contact);

            if (res?.success) {
                setStep("otp");
                // setTimeout(() => {
                //     router.push("/");
                // }, 5000);
            } else {
                setError(res?.message || "Failed to send OTP");
                setTimeout(() => {
                    setError("");
                    setIsLoginPopup(false);
                    router.push("/signup");
                }, 5000);
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
    };

    // sign in otp
    const getOtpByDefault = async (contact: string) => {
        const res = await getSigninOtp(contact);
        dispatch(setGetSigninOtpData(res));
        return res;
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

        const res = await getSigninVerifyOtp(contact, otp);

        if (res?.success && res?.token) {
            const encodedToken = btoa(res.token);
            setSigninToken(encodedToken);
            setSuccessMessage("OTP verified successfully");
            dispatch(setLoggedIn(true));
            const customerCart = await getCustomerCart(); // fetch customer cart ID
            if (customerCart?.customerCart?.id) {
                setStoredCartId(customerCart.customerCart.id); // SAVE it!
            }
            dispatch(fetchCart());
            setTimeout(() => {
                setIsVerifying(false);
                setIsLoginPopup(false);
                if (setIsLoggedIn) {
                    setIsLoggedIn(true);
                }

                if (pathname === "/signup") {
                    router.push("/");
                }
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
        if (!contact) return;

        setOtp("");
        setIsRequestingOtp(true);

        try {
            const res = await getSigninOtp(contact);

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
        } finally {
            setIsRequestingOtp(false);
        }
    };

    // masking phone number
    function maskPhone(phone: string): string {
        if (!phone) return "";
        return phone.replace(/\d(?=\d{2})/g, "*");
    }

    return (
        <>
            <Dialog open={isLoginPopup} onOpenChange={setIsLoginPopup}>
                <DialogContent className="w-[80%] md:w-[736px] md:min-w-[736px] pb-12 pt-8 z-[9999]">
                    <DialogTitle className="sr-only">Login Dialog</DialogTitle>
                    <DialogDescription className="sr-only">
                        Login Dialog
                    </DialogDescription>
                    <DialogHeader>
                        {/* <DialogTitle>Hello from another component</DialogTitle> */}
                    </DialogHeader>
                    <Image
                        src="/images/header/login/gkb.png"
                        alt="Login"
                        width={132}
                        height={60}
                        className="object-cover mx-auto"
                    />
                    <div>
                        {step === "login" && (
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleSubmit();
                                }}
                            >
                                <Text
                                    as="h2"
                                    font="helvetica"
                                    size="loginTitle"
                                    weight="light"
                                    color="black"
                                    className="mt-6 md:mt-4 mb-8 text-center lg:mb-6 2xl:mb-4"
                                >
                                    Let’s get you signed in!
                                </Text>
                                <div className="flex gap-1 md:gap-4 flex-col md:flex-row items-center justify-center mb-6 md:mb-8 lg:mb-8">
                                    <Text
                                        as="span"
                                        font="helvetica"
                                        size="base"
                                        weight="bold"
                                        color="black"
                                    >
                                        Don’t have an account?{" "}
                                    </Text>
                                    <button
                                        type="button"
                                        className="flex items-center gap-2 cursor-pointer bg-transparent border-none p-0"
                                        onClick={handleClick}
                                    >
                                        <Text
                                            as="span"
                                            font="helvetica"
                                            size="base"
                                            weight="normal"
                                            color="black"
                                            className="italic underline"
                                        >
                                            Create an account
                                        </Text>
                                        <ChevronRight
                                            size={12}
                                            fill="black"
                                            className="w-3 md:w-4"
                                        />
                                    </button>
                                </div>
                                <div className="flex flex-col items-center gap-4 md:gap-16 lg:gap-8">
                                    <div className="max-w-[498px] w-full">
                                        <Input
                                            type="text"
                                            placeholder="* Email Address / Phone number"
                                            value={value}
                                            onChange={(e) => {
                                                const input = e.target.value;
                                                const isPhone = /^\d+$/.test(
                                                    input,
                                                );
                                                if (isPhone) {
                                                    if (input.length <= 10) {
                                                        setValue(input);
                                                        setError("");
                                                    } else {
                                                        setError(
                                                            "Phone number cannot exceed 10 digits",
                                                        );
                                                    }
                                                } else {
                                                    setValue(input);
                                                    setError("");
                                                }
                                            }}
                                            className={`rounded-full p-3 md:px-10 h-10 md:h-16 text-font-main text-base md:text-xl outline-none
                                            ${
                                                error
                                                    ? "border border-font-error focus-visible:ring-font-error focus-visible:ring-[1px]"
                                                    : ""
                                            }`}
                                        />
                                        {error && (
                                            <p className="text-red-500 text-sm mt-2 text-center font-helvetica">
                                                {error}
                                            </p>
                                        )}
                                    </div>
                                    <button
                                        onClick={handleSubmit}
                                        type="button"
                                        className="cursor-pointer"
                                        disabled={isRequestingOtp}
                                    >
                                        <Text
                                            color="fontInverse"
                                            as="p"
                                            font="helvetica"
                                            size="orText"
                                            weight="bold"
                                            className="bg-black py-3 px-8 md:px-16 rounded-full"
                                        >
                                            {isRequestingOtp
                                                ? "Requesting OTP..."
                                                : "Request OTP"}
                                        </Text>
                                    </button>
                                </div>
                            </form>
                        )}
                        {step === "otp" && (
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleSubmit();
                                }}
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

                                <div className="flex justify-between max-w-[240px] md:max-w-[368px] mb-4 mx-auto">
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
                                        {maskPhone(contact)}
                                    </Text>
                                </div>
                                <div className="flex flex-col items-center gap-6 md:gap-16">
                                    <div className="flex flex-col justify-center">
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
                                                {Array.from(
                                                    { length: 6 },
                                                    (_, i) => (
                                                        <InputOTPSlot
                                                            key={i}
                                                            index={i}
                                                            className="h-8 w-8 md:h-12 md:w-12 mr-2 md:mr-4 rounded-full border border-gray-400 text-center text-lg appearance-none outline-none shadow-none p-0 first:rounded-full last:rounded-full"
                                                        />
                                                    ),
                                                )}
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
                                    <div>
                                        <div>
                                            <button
                                                onClick={handleVerifyOtp}
                                                type="button"
                                                disabled={otp.length !== 6}
                                                className="mb-3 md:mb-6 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
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
                                                        : "Verify OTP and Sign in"}
                                                </Text>
                                            </button>
                                        </div>

                                        <button
                                            disabled={timer > 0}
                                            onClick={handleResendOtp}
                                            type="button"
                                            className="flex gap-2 items-center justify-center w-full cursor-pointer"
                                        >
                                            <Text
                                                color="black"
                                                as="p"
                                                font="helvetica"
                                                size="orText"
                                                weight="normal"
                                                className="italic"
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
                                    </div>
                                </div>
                            </form>
                        )}

                        <div className="mt-20 md:mt-[100px] text-center lg:mt-10 2xl:mt-[100px]">
                            <Link href="#">
                                <Text
                                    as="span"
                                    size="orText"
                                    color="black"
                                    weight="bold"
                                >
                                    By signing in
                                </Text>
                            </Link>
                            <Text
                                as="span"
                                size="orText"
                                color="black"
                                weight="bold"
                            >
                                , you accept our
                            </Text>
                            {"  "}
                            <Text className="italic" as="span" size="orText">
                                T&Cs
                            </Text>
                            {"  "}
                            <Text
                                as="span"
                                size="orText"
                                color="black"
                                weight="bold"
                            >
                                and
                            </Text>
                            {"  "}
                            <Text size="orText" className="italic" as="span">
                                Privacy Policy
                            </Text>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
            {signinToken && (
                <SetStoreCookieClient
                    cookieName="userToken"
                    cookieValue={signinToken}
                />
            )}
        </>
    );
}
