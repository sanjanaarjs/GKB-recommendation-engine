"use client";

import React from "react";
import Text from "@/components/generic/Text";
import { Button } from "@/components/ui/button";

export default function GlassExplore() {
    return (
        <div className="relative flex flex-col gap-y-8 lg:gap-y-16 justify-center py-10 lg:py-40">
            <Text
                size="xl5"
                font="helvetica"
                weight="light"
                className="text-center leading-[64px] text-[28px] md:text-5xl lg:leading-[64px]"
            >
                still searching for your <br />
                perfect pair of glasses?
            </Text>
            <div className="flex items-center mx-auto gap-x-8 flex-wrap gap-y-8 justify-center">
                <Button
                    variant={"outline"}
                    className="w-fit bg-black text-white border-[2px] w-[80%] md:w-fit py-5 md:py-5 md:px-[72px] rounded-full cursor-pointer border-black font-semibold text-lg md:text-xl flex"
                >
                    {" "}
                    explore sunglasses
                </Button>
                <Button
                    variant={"outline"}
                    className="bg-white w-[80%] md:w-fit text-black rounded-full px-[94px] py-[22px] cursor-pointer text-xl font-extrabold border-[2px] border-font-main"
                >
                    try frames on
                </Button>
            </div>
        </div>
    );
}
