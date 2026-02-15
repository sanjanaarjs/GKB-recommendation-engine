"use client";

import Image from "next/image";
import React from "react";
import Text from "@/components/generic/Text";
import { Button } from "@/components/ui/button";

type TryFramesSectionProps = {
    className?: string;
};

export default function TryFramesSection({
    className = "",
}: TryFramesSectionProps) {
    return (
        <div className={`flex flex-col mx-10 py-16 relative ${className}`}>
            {/* Main Content Wrapper */}
            <div className="relative w-full md:max-w-3xl flex flex-col gap-y-8 md:gap-y-[56px] items-start">
                <Text
                    className="text-[28px] leading-[36px] md:text-5xl text-start md:leading-[64px]"
                    font="helvetica"
                >
                    try frames <br />
                    virtually?
                </Text>

                {/* Background Image */}
                <div className="relative w-full h-[469px] md:h-[768px] md:mx-auto">
                    <Image
                        src="/images/account/orderbanner.png"
                        alt="Try Frames Background"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
            </div>

            <Button
                variant="outline"
                className="bg-black w-fit text-white rounded-full md:px-[94px]  px-8 py-3 md:py-7 mx-auto mt-6 cursor-pointer text-sm md:text-xl"
            >
                try frames on
            </Button>
        </div>
    );
}
