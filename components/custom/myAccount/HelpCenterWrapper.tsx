"use client";
import Text from "@/components/generic/Text";
import ChevronLeft from "@/components/icons/ChevronLeft";
import Faq from "@/components/icons/faq";
import Location from "@/components/icons/Location";
import Phone from "@/components/icons/Phone";
import SignOut from "@/components/icons/SignOut";
import TryOn from "@/components/icons/TryOn";
import Whatsapp from "@/components/icons/Whatsapp";
import { Button } from "@/components/ui/button";
import { useLogout } from "@/lib/hooks/useLogout";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function HelpCenterWrapper() {
    const router = useRouter();
    const { handleLogout } = useLogout();

    return (
        <>
            <div className="flex justify-between lg:hidden -mt-3 pb-4">
                <button
                    className="flex items-center gap-2"
                    onClick={() => {
                        router?.back();
                    }}
                >
                    <ChevronLeft fill="black" size={16} />
                    <Text
                        font="helvetica"
                        size="sm"
                        weight="normal"
                        className="italic"
                    >
                        Back
                    </Text>
                </button>
                <div
                    className="flex items-center gap-2 lg:mb-0 lg:hidden"
                    onClick={handleLogout}
                >
                    <Text
                        font="helvetica"
                        size="productTitle1"
                        weight="normal"
                        className="italic"
                    >
                        Sign out
                    </Text>
                    <SignOut
                        size={24}
                        fill="#000000"
                        className="w-4 h-4 lg:w-6 lg:h-6"
                    />
                </div>
            </div>
            <div className="bg-[#F7F7F7] lg:bg-[#FFF] lg:pb-31 pb-[152px]">
                <Text
                    font="helvetica"
                    size="customText17"
                    weight="light"
                    className="lg:pb-14 pb-12 pl-2 pt-6"
                >
                    help centre
                </Text>
                <div className="flex justify-center lg:justify-start gap-2 lg:gap-12 lg:mb-6 mb-8">
                    <div className="shadow-[0_6px_24px_0_rgba(0,0,0,0.10)]">
                        <div className="flex flex-col gap-3 items-center justify-center p-4 lg:w-[367px] w-[160px] h-[86px] lg:h-[172px]">
                            <Phone className="lg:w-8 lg:h-8 w-6 h-6" />
                            <Text
                                font="helvetica"
                                size="customtext3"
                                weight="customWeight2"
                            >
                                Call Us
                            </Text>
                        </div>
                    </div>
                    <div className="shadow-[0_6px_24px_0_rgba(0,0,0,0.10)] ">
                        <div className="flex flex-col gap-3 items-center justify-center p-4 w-[160px] h-[86px] lg:w-[367px] lg:h-[172px]">
                            <Whatsapp className="lg:w-8 lg:h-8 w-6 h-6" />
                            <Text
                                font="helvetica"
                                size="customtext3"
                                weight="customWeight2"
                            >
                                Chat with us
                            </Text>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="flex justify-between px-8  py-8 lg:py-12 border-b-[1px] border-b-border-color-light lg:border-b-border-color-white">
                        <div className="flex items-center gap-2">
                            <Image
                                src="/images/profile/homeService.png"
                                alt="homeService"
                                width={32}
                                height={23}
                            />
                            <Text
                                font="helvetica"
                                size="base"
                                weight="extrabold"
                                color="fontMain"
                            >
                                Book home service
                            </Text>
                        </div>
                        <Button className="rotate-180 cursor-pointer">
                            <ChevronLeft fill="black" />
                        </Button>
                    </div>
                    <div className="flex justify-between px-8  py-8 lg:py-12 border-b-[1px] border-b-border-color-light lg:border-b-border-color-white">
                        <div className="flex items-center gap-2">
                            <Location />
                            <Text
                                font="helvetica"
                                size="base"
                                weight="extrabold"
                                color="fontMain"
                            >
                                Locate a store near you
                            </Text>
                        </div>
                        <Button className="rotate-180 cursor-pointer">
                            <ChevronLeft fill="black" />
                        </Button>
                    </div>
                    <div className="flex justify-between px-8  py-8 lg:py-12 border-b-[1px] border-b-border-color-light lg:border-b-border-color-white">
                        <div className="flex gap-2">
                            <TryOn size={24} />
                            <Text
                                font="helvetica"
                                size="base"
                                weight="extrabold"
                                color="fontMain"
                            >
                                Try frames on virtually
                            </Text>
                        </div>
                        <Button className="rotate-180 cursor-pointer">
                            <ChevronLeft fill="black" />
                        </Button>
                    </div>
                    <div className="flex justify-between px-8 py-8 lg:py-12 border-b-[1px] border-b-border-color-light lg:border-none">
                        <div className="flex items-center gap-2">
                            <Faq />
                            <Text
                                font="helvetica"
                                size="base"
                                weight="extrabold"
                                color="fontMain"
                            >
                                Frequently asked questions
                            </Text>
                        </div>
                        <Button className="rotate-180 cursor-pointer">
                            <ChevronLeft fill="black" />
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
