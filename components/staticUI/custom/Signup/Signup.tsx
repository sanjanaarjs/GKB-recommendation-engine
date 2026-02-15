"use client";

import Image from "next/image";
import Text from "@/components/generic/Text";
import ChevronRight from "@/components/icons/ChevronRight";

export default function Signup() {
    return (
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
                        <Text
                            as="a"
                            weight="normal"
                            className="leading-[normal] text-black italic text-[1.25rem] flex gap-2 items-center"
                            font="helvetica"
                        >
                            Sign in <ChevronRight size={12} fill="black" />
                        </Text>
                    </Text>

                    <form className="space-y-4 font-helvetica mb-10 lg:mb-[112px]">
                        <input
                            type="text"
                            placeholder="* First name"
                            className="w-full px-4 py-3 border border-border-color-light rounded-full text-font-main placeholder-font-main font-[300] lg:min-h-[64px]"
                        />
                        <input
                            type="text"
                            placeholder="* Last name"
                            className="w-full px-4 py-3 border border-border-color-light rounded-full text-font-main placeholder-font-main font-[300] lg:min-h-[64px]"
                        />
                        <input
                            type="email"
                            placeholder="* Email address"
                            className="w-full px-4 py-3 border border-border-color-light rounded-full text-font-main placeholder-font-main font-[300] lg:min-h-[64px]"
                        />
                        <input
                            type="tel"
                            placeholder="* Phone number"
                            className="w-full px-4 py-3 border border-border-color-light rounded-full text-font-main placeholder-font-main font-[300] lg:min-h-[64px]"
                        />
                        <div className="flex justify-center">
                            <button
                                type="submit"
                                className="p-3 bg-black text-white font-semibold rounded-full font-helvetica text-[1.25rem] max-w-[100%] w-full lg:w-[50%] mx-auto"
                            >
                                Create Account
                            </button>
                        </div>
                    </form>

                    <Text
                        as="p"
                        weight="semibold"
                        font="helvetica"
                        className="text-[1.25rem] leading-[normal] text-black grid align-items-center text-center"
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
    );
}
