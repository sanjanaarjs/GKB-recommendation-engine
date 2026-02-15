"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import LensHeader from "./LensHeader";
import LensFooter from "./LensFooter";
import LensSection1 from "./LensSection1";
import LensSection2 from "./LensSection2";
import LensSection3 from "./LensSection3";
import LensSection4 from "./LensSection4";
import LensSection5 from "./LensSection5";
import LensSection6 from "./LensSection6";
import { cn } from "@/lib/utils";

export interface Glass {
    id: number;
    image: string;
    color: string;
}

export default function LensFlow({
    openLensFlow,
    setOpenLensFlow,
}: {
    openLensFlow: boolean;
    setOpenLensFlow: (open: boolean) => void;
}) {
    const totalSections = 6;
    const [currentSection, setCurrentSection] = useState<number>(1);
    const desktopScrollRef = useRef<HTMLDivElement>(null);
    const mobileScrollRef = useRef<HTMLDivElement>(null);
    const glasses: Glass[] = [
        { id: 1, image: "/images/pdp/lens/img1.png", color: "brown" },
        { id: 2, image: "/images/pdp/lens/img2.png", color: "green" },
        { id: 3, image: "/images/pdp/lens/img1.png", color: "grey" },
        { id: 4, image: "/images/pdp/lens/img2.png", color: "blue" },
        { id: 5, image: "/images/pdp/lens/img1.png", color: "yellow" },
        { id: 6, image: "/images/pdp/lens/img2.png", color: "red" },
        { id: 7, image: "/images/pdp/lens/img1.png", color: "purple" },
        { id: 8, image: "/images/pdp/lens/img2.png", color: "orange" },
        { id: 9, image: "/images/pdp/lens/img1.png", color: "pink" },
        { id: 10, image: "/images/pdp/lens/img2.png", color: "teal" },
        { id: 11, image: "/images/pdp/lens/img1.png", color: "black" },
        { id: 12, image: "/images/pdp/lens/img2.png", color: "white" },
    ];
    const [selectedGlass, setSelectedGlass] = useState<number>(1);
    const currentGlass: Glass | undefined = useMemo(() => {
        return glasses.find((glass) => glass.id === selectedGlass);
    }, [selectedGlass]);

    const progress = useMemo(() => {
        return (
            (((currentSection ? currentSection : 1) - 1) /
                (totalSections - 1)) *
            100
        );
    }, [currentSection]);

    useEffect(() => {
        if (openLensFlow) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.removeProperty("overflow");
        }
        return () => {
            document.body.style.removeProperty("overflow");
        };
    }, [openLensFlow]);

    useEffect(() => {
        setTimeout(() => {
            desktopScrollRef.current?.scrollTo({
                top: 0,
                behavior: "smooth",
            });
            mobileScrollRef.current?.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        }, 100);
    }, [currentSection]);

    return (
        <div
            className={cn(
                "fixed top-0 w-full bottom-0 z-50 bg-background-grey overflow-y-auto flex flex-col transition-all duration-500",
                openLensFlow ? "left-0 opacity-100" : "left-full opacity-0",
            )}
            data-lenis-prevent
        >
            <LensHeader
                progress={progress}
                currentSection={currentSection}
                setCurrentSection={setCurrentSection}
                onClose={() => setOpenLensFlow(false)}
            />

            <div
                ref={mobileScrollRef}
                className={`flex-1 md:h-[calc(100vh-114px)] flex flex-col overflow-y-auto md:overflow-y-hidden ${currentSection === 3 || currentSection === 6 ? "pb-20 md:pb-0" : ""}`}
            >
                <div className="flex-1 flex flex-col md:flex-row md:overflow-y-auto">
                    <div className="px-6 lg:px-12 relative min-h-52 max-h-52 md:max-h-full h-52 md:h-full w-full flex-1">
                        {currentGlass?.image && (
                            <Image
                                src={currentGlass?.image}
                                alt="glass"
                                fill
                                className="object-contain"
                            />
                        )}
                    </div>
                    <div
                        ref={desktopScrollRef}
                        className="flex-1 px-6 lg:px-12 py-6 md:overflow-y-auto"
                    >
                        {currentSection === 1 && (
                            <LensSection1
                                setCurrentSection={setCurrentSection}
                            />
                        )}
                        {currentSection === 2 && (
                            <LensSection2
                                setCurrentSection={setCurrentSection}
                            />
                        )}
                        {currentSection === 3 && (
                            <LensSection3
                                glasses={glasses}
                                selectedGlass={currentGlass}
                                setSelectedGlass={setSelectedGlass}
                            />
                        )}
                        {currentSection === 4 && (
                            <LensSection4
                                setCurrentSection={setCurrentSection}
                            />
                        )}
                        {currentSection === 5 && (
                            <LensSection5
                                setCurrentSection={setCurrentSection}
                            />
                        )}
                        {currentSection === 6 && (
                            <LensSection6
                                setCurrentSection={setCurrentSection}
                            />
                        )}
                    </div>
                </div>

                <LensFooter
                    currentGlass={currentGlass}
                    currentSection={currentSection}
                    setCurrentSection={setCurrentSection}
                />
            </div>
        </div>
    );
}
