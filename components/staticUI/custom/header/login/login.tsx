import Text from "@/components/generic/Text";
import ChevronRight from "@/components/icons/ChevronRight";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";

type LoginProps = {
    isLoginPopup: boolean;
    setIsLoginPopup: (open: boolean) => void;
};

export default function Login({
    isLoginPopup,
    setIsLoginPopup,
}: Readonly<LoginProps>) {
    const [step, setStep] = useState<"login" | "otp">("login");
    const [otp, setOtp] = useState("");

    return (
        <Dialog open={isLoginPopup} onOpenChange={setIsLoginPopup}>
            <DialogContent className="w-[80%] md:w-[736px] md:min-w-[736px] pb-12 pt-8">
                <DialogHeader>
                    {/* <DialogTitle>Hello from another component</DialogTitle> */}
                </DialogHeader>
                <Image
                    src="/images/header/login/gkb.png"
                    alt="Login"
                    width={282}
                    height={60}
                    className="object-cover mx-auto"
                />
                <div>
                    {step === "login" && (
                        <form>
                            <Text
                                as="h2"
                                font="helvetica"
                                size="loginTitle"
                                weight="light"
                                color="black"
                                className="mt:6 md:mt-20 mb-8 text-center"
                            >
                                Let’s get you signed in!
                            </Text>
                            <div className="flex gap-1 md:gap-4 flex-col md:flex-row items-center justify-center mb-6 md:mb-16">
                                <Text
                                    as="span"
                                    font="helvetica"
                                    size="orText"
                                    weight="bold"
                                    color="black"
                                >
                                    Don’t have an account?{" "}
                                </Text>
                                <div className="flex items-center gap-2">
                                    <Text
                                        as="span"
                                        font="helvetica"
                                        size="orText"
                                        weight="normal"
                                        color="black"
                                        className="italic"
                                    >
                                        Create an account
                                    </Text>
                                    <ChevronRight
                                        size={16}
                                        fill="black"
                                        className="w-3 md:w-4"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col items-center gap-4 md:gap-16">
                                <Input
                                    type="text"
                                    placeholder="* Email Address / Phone number"
                                    className="rounded-full max-w-[498px] p-3 md:px-10 h-10 md:h-16 text-font-main text-base md:text-xl"
                                ></Input>
                                <button
                                    onClick={() => setStep("otp")}
                                    className="cursor-pointer"
                                >
                                    <Text
                                        color="fontInverse"
                                        as="p"
                                        font="helvetica"
                                        size="orText"
                                        weight="bold"
                                        className="bg-black py-3 px-8 md:px-16 rounded-full"
                                    >
                                        request OTP
                                    </Text>
                                </button>
                            </div>
                        </form>
                    )}

                    {step === "otp" && (
                        <form>
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
                                    person.name@gmail.com
                                </Text>
                            </div>
                            <div className="flex flex-col items-center gap-6 md:gap-16">
                                <div className="flex justify-center">
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
                                </div>
                                <div>
                                    <button
                                        onClick={() => {
                                            setIsLoginPopup(false);
                                        }}
                                        className="mb-3 md:mb-6 cursor-pointer"
                                    >
                                        <Text
                                            color="fontInverse"
                                            as="p"
                                            font="helvetica"
                                            size="orText"
                                            weight="bold"
                                            className="bg-black py-3 px-8 md:px-16 rounded-full"
                                        >
                                            verify OTP and sign in
                                        </Text>
                                    </button>
                                    <button className="flex gap-2 items-center justify-center w-full cursor-pointer">
                                        <Text
                                            color="black"
                                            as="p"
                                            font="helvetica"
                                            size="orText"
                                            weight="normal"
                                            className="italic"
                                        >
                                            Resend OTP
                                        </Text>
                                        <ChevronRight
                                            size={16}
                                            fill="black"
                                            className="w-3 md:w-4"
                                        />
                                    </button>
                                </div>
                            </div>
                        </form>
                    )}

                    <div className="mt-20 md:mt-[100px] text-center">
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
    );
}
