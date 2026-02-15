"use client";

import Close from "@/components/icons/Close";
import Image from "next/image";
import Text from "@/components/generic/Text";
import ChevronLeft from "@/components/icons/ChevronLeft";
import { useResponsive } from "@/lib/hooks/useResponsive";

export default function LensHeader({
    progress,
    currentSection,
    setCurrentSection,
    onClose,
}: {
    progress: number;
    currentSection: number;
    setCurrentSection: (section: number) => void;
    onClose: () => void;
}) {
    const { isDesktop } = useResponsive();

    return (
        <>
            <div className="min-h-16 h-16 lg:min-h-[104px] lg:h-[104px] flex items-center justify-between px-6 lg:px-12 bg-white">
                {currentSection === 1 ? (
                    <div className="w-[50px] lg:w-[197px]">
                        <Image
                            src="/images/header/login/gkb.png"
                            alt="gkb"
                            width={197}
                            height={40}
                            className="hidden lg:block"
                        />
                    </div>
                ) : (
                    <div className="flex justify-start items-center gap-2 w-[50px] lg:w-[197px]">
                        <button
                            className="cursor-pointer"
                            onClick={() =>
                                setCurrentSection(currentSection - 1)
                            }
                        >
                            <ChevronLeft
                                size={!isDesktop ? 16 : 20}
                                fill="black"
                            />
                        </button>
                    </div>
                )}
                <Text
                    as="p"
                    size="xl"
                    weight="normal"
                    color="black"
                    font="helvetica"
                    className="text-xs sm:text-base lg:text-xl"
                >
                    Lens selection | Prescription type | Lens type
                </Text>
                <div className="flex justify-end items-center gap-2 w-[50px] lg:w-[197px]">
                    <button className="cursor-pointer" onClick={onClose}>
                        <Close size={!isDesktop ? 20 : 24} fill="black" />
                    </button>
                </div>
            </div>

            <div className="h-2.5 w-full bg-primary-500">
                <div
                    className="h-full bg-primary-100 rounded-r-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
        </>
    );
}
