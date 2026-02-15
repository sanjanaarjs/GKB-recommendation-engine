"use client";

import Text from "@/components/generic/Text";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Play from "@/components/icons/Play";
import { useRef, useState } from "react";
import he from "he";
import { ItemData } from "@/lib/services/magento/homepageData";

export default function MobileSlide1({
    bgImage,
    heading1,
    buttonText,
    buttonLink,
    buttonVariant,
    isVideo,
    videoUrl,
}: {
    bgImage?: string | null;
    heading1: string | null;
    buttonText?: string;
    buttonLink?: string;
    buttonVariant?: ItemData["buttonVariant1"];
    isVideo?: string | null;
    videoUrl?: string;
}) {
    const [isPlaying, setIsPlaying] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);

    return (
        <div className="w-full h-full relative flex items-end justify-start">
            {isVideo && (
                <video
                    ref={videoRef}
                    src={videoUrl || ""}
                    autoPlay
                    muted
                    loop
                    className="absolute top-0 left-0 w-full h-full object-cover object-top"
                />
            )}
            {!isVideo && bgImage && (
                <Image
                    src={bgImage}
                    alt="slider"
                    fill
                    className="object-cover object-top"
                />
            )}
            <div className="z-20 relative flex flex-col items-start justify-center pl-10 pb-16">
                {heading1 && (
                    <div
                        dangerouslySetInnerHTML={{
                            __html: he.decode(heading1),
                        }}
                    />
                )}
                <div className="pt-8 pb-10">
                    {buttonLink && (
                        <Link
                            href={buttonLink}
                            className={cn(
                                "primary-button",
                                buttonVariant === "secondary" &&
                                    "secondary-button",
                                "px-8",
                            )}
                        >
                            <Text
                                as="span"
                                size="xl"
                                weight="normal"
                                font="helvetica"
                                color="inherit"
                            >
                                {buttonText}
                            </Text>
                        </Link>
                    )}
                </div>
            </div>

            {isVideo && (
                <div className="absolute bottom-10 left-12 z-20 flex items-center gap-6">
                    <div
                        className="flex items-center justify-center cursor-pointer"
                        onClick={() => setIsPlaying(!isPlaying)}
                    >
                        <Play />
                    </div>
                </div>
            )}
        </div>
    );
}
