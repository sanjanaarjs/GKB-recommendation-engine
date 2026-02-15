"use client";

import Text from "@/components/generic/Text";
import Mute from "@/components/icons/Mute";
import Play from "@/components/icons/Play";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import he from "he";
import { ItemData } from "@/lib/services/magento/homepageData";

export default function Slider1({
    heading1,
    paragraph,
    buttonText,
    buttonLink,
    bgImage,
    buttonVariant = "primary",
    isVideo = "video_attachment",
    videoUrl,
}: {
    heading1: string | null;
    paragraph: string;
    buttonText: string;
    buttonLink: string;
    bgImage: string | null;
    buttonVariant?: ItemData["buttonVariant1"];
    isVideo?: string | null;
    videoUrl?: string;
}) {
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.play();
            } else {
                videoRef.current.pause();
            }
        }
    }, [isPlaying]);

    const descExtract = heading1 ? he.decode(heading1) : "";

    let parsedButtonText: { title: string; url: string }[] = [];

    if (paragraph) {
        try {
            parsedButtonText = JSON.parse(paragraph);
        } catch (error) {
            console.error("Failed to parse additional_info", error);
        }
    }

    const titleText = parsedButtonText?.[0]?.title || "";

    return (
        <div className="w-full h-full relative flex items-end justify-center">
            {isVideo && videoUrl ? (
                <video
                    ref={videoRef}
                    src={videoUrl}
                    autoPlay
                    muted={isMuted}
                    loop
                    className="absolute top-0 left-0 w-full h-full object-cover object-top"
                />
            ) : bgImage ? (
                <Image
                    src={bgImage}
                    alt="slider"
                    fill
                    className="object-cover object-top"
                />
            ) : null}

            <div className="bg-gradient-to-t from-black/80 to-transparent absolute top-0 left-0 w-full h-full z-10"></div>
            <div className="z-20 relative flex flex-col items-center justify-center">
                <div dangerouslySetInnerHTML={{ __html: descExtract }} />
                <div className="pt-6">
                    <Text
                        as="p"
                        className="inline-block para"
                        size="xl2"
                        font="helvetica"
                        weight="normal"
                        color="white"
                    >
                        {titleText}
                    </Text>
                </div>
                <div className="pt-12 pb-10">
                    <Link
                        href={buttonLink}
                        className={cn(
                            "primary-button px-16",
                            buttonVariant === "primary" &&
                                "secondary-button px-16",
                        )}
                    >
                        <Text
                            as="span"
                            size="xl"
                            weight="bold"
                            font="helvetica"
                            color="inherit"
                        >
                            {buttonText}
                        </Text>
                    </Link>
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
                    <div
                        className="flex items-center justify-center cursor-pointer"
                        onClick={() => setIsMuted(!isMuted)}
                    >
                        <Mute />
                    </div>
                </div>
            )}
        </div>
    );
}
