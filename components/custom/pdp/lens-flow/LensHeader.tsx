"use client";

import Close from "@/components/icons/Close";
import Image from "next/image";
import Text from "@/components/generic/Text";
import ChevronLeft from "@/components/icons/ChevronLeft";
import { useResponsive } from "@/lib/hooks/useResponsive";
import { LensStep } from "../datas/lensFlow.api";

interface LensHeaderProps {
    progress: number;
    onClose: () => void;
    currentAlias: string;
    setCurrentAlias: (alias: string) => void;
    mainSteps: string[];
    normalizeAlias: (alias: string) => string;
    lensSteps: LensStep[];
    isPowerLensFlow?: boolean;
    // resolveAliasForNavigation: (alias: string, steps: LensStep[]) => string;
    setFlowPath: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function LensHeader({
    progress,
    onClose,
    currentAlias,
    setCurrentAlias,
    lensSteps,
    isPowerLensFlow,
    mainSteps,
    normalizeAlias,
    // resolveAliasForNavigation,
    setFlowPath,
}: Readonly<LensHeaderProps>) {
    const { isDesktop } = useResponsive();

    const currentIndex = mainSteps.indexOf(normalizeAlias(currentAlias));

    const handleBack = () => {
        if (isPowerLensFlow) {
            onClose();
            return;
        }

        setFlowPath((prev) => {
            if (prev.length <= 1) {
                onClose();
                return prev;
            }

            const newPath = [...prev];
            newPath.pop();

            const previousAlias = newPath[newPath.length - 1];
            setCurrentAlias(previousAlias);

            return newPath;
        });
    };

    const headerProgress = isPowerLensFlow ? 100 : progress;
    const isReviewStep = normalizeAlias(currentAlias) === "review_lenses";

    return (
        <>
            <div className="min-h-16 h-16 lg:min-h-[104px] lg:h-[104px] flex items-center justify-between px-6 lg:px-12 bg-white fixed md:[position:unset] w-full lg:w-auto">
                {!isPowerLensFlow && (currentIndex === 0 || isReviewStep) ? (
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
                            // onClick={() =>
                            //     setCurrentSection(currentSection - 1)
                            // }
                            onClick={handleBack}
                        >
                            <ChevronLeft
                                size={!isDesktop ? 16 : 20}
                                fill="black"
                            />
                        </button>
                    </div>
                )}
                {!isPowerLensFlow ? (
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
                ) : (
                    <Text
                        as="p"
                        size="xl"
                        weight="normal"
                        color="black"
                        font="helvetica"
                        className="text-xs sm:text-base lg:text-xl"
                    >
                        Lens selection | Upload prescription
                    </Text>
                )}

                <div className="flex justify-end items-center gap-2 w-[50px] lg:w-[197px]">
                    <button className="cursor-pointer" onClick={onClose}>
                        <Close size={!isDesktop ? 20 : 24} fill="black" />
                    </button>
                </div>
            </div>

            <div className="h-1 lg:h-[6px] w-full bg-primary-500">
                <div
                    className="h-full bg-primary-100 rounded-r-full transition-all duration-300"
                    style={{ width: `${headerProgress}%` }}
                ></div>
            </div>
        </>
    );
}
