"use client";

import Text from "@/components/generic/Text";
import Mute from "@/components/icons/Mute";
import Play from "@/components/icons/Play";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Slider3({
    heading1,
    italicHeading1,
    heading2,
    buttonText1,
    buttonLink1,
    buttonText2,
    buttonLink2,
    bgImage,
    isVideo = false,
    videoUrl,
}: {
    heading1: string;
    italicHeading1: string;
    heading2: string;
    buttonText1: string;
    buttonLink1: string;
    buttonText2: string;
    buttonLink2: string;
    bgImage: string;
    isVideo?: boolean;
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

    return (
        <div className="w-full h-full relative flex items-center justify-start">
            {isVideo && videoUrl && (
                <video
                    ref={videoRef}
                    src={videoUrl}
                    autoPlay
                    muted={isMuted}
                    loop
                    className="absolute top-0 left-0 w-full h-full object-cover object-top"
                />
            )}

            {!isVideo && (
                <Image
                    src={bgImage}
                    alt="slider"
                    fill
                    className="object-cover object-top"
                />
            )}
            <div className="bg-gradient-to-t from-black/60 to-transparent absolute top-0 left-0 w-full h-full z-10"></div>
            <div className="z-20 relative flex flex-col items-start justify-center pl-24">
                <div>
                    <Text
                        as="h2"
                        className="inline-block italic"
                        size="xl5"
                        weight="medium"
                        color="fontMain"
                        font="montserrat"
                    >
                        {italicHeading1}
                    </Text>
                </div>
                <div className="pt-2">
                    <Text
                        as="h2"
                        className="inline-block"
                        size="xl5"
                        weight="fontblack"
                        color="fontMain"
                        font="montserrat"
                    >
                        {heading1}
                    </Text>
                </div>
                <div className="pt-2">
                    <Text
                        as="h2"
                        className="inline-block"
                        size="xl5"
                        weight="fontblack"
                        color="fontMain"
                        font="montserrat"
                    >
                        {heading2}
                    </Text>
                </div>
                <div className="pt-8 flex items-center gap-4">
                    <Link
                        href={buttonLink1}
                        className={cn("primary-button-black px-10")}
                    >
                        <Text
                            as="span"
                            size="xl"
                            weight="bold"
                            font="helvetica"
                            color="inherit"
                        >
                            {buttonText1}
                        </Text>
                    </Link>
                    <Link
                        href={buttonLink2}
                        className={cn("primary-button-black px-10")}
                    >
                        <Text
                            as="span"
                            size="xl"
                            weight="bold"
                            font="helvetica"
                            color="inherit"
                        >
                            {buttonText2}
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
