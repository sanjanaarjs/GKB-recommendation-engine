"use client";

import Mute from "@/components/icons/Mute";
import Play from "@/components/icons/Play";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { CollectionPage } from "./datas/productData.api";

interface PlpBannerProps {
    bannerData: CollectionPage[];
}

export default function PlpBanner({ bannerData }: PlpBannerProps) {
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);

    const banner = bannerData?.find((item) => item?.position === "Top");

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
        <div className="w-full h-[70vh] relative flex items-end justify-center">
            {banner?.isVideo ? (
                <video
                    ref={videoRef}
                    src={banner?.media}
                    autoPlay
                    muted={isMuted}
                    loop
                    className="absolute top-0 left-0 w-full h-full object-cover object-top"
                />
            ) : (
                <>
                    {banner?.media && (
                        <Image
                            src={banner?.media}
                            alt="slider"
                            fill
                            className="object-cover object-top"
                        />
                    )}
                </>
            )}
            {banner?.isVideo && (
                <div className="absolute bottom-10 left-12 z-20 flex items-center gap-6">
                    <div
                        className="flex items-center justify-center cursor-pointer"
                        onClick={() => setIsPlaying(!isPlaying)}
                        role="button"
                        aria-label={isPlaying ? "Pause video" : "Play video"}
                    >
                        <Play />
                    </div>
                    <div
                        className="flex items-center justify-center cursor-pointer"
                        onClick={() => setIsMuted(!isMuted)}
                        role="button"
                        aria-label={isMuted ? "Unmute video" : "Mute video"}
                    >
                        <Mute />
                    </div>
                </div>
            )}
        </div>
    );
}
