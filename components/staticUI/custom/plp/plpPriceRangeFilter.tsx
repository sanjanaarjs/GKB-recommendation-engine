"use client";

import Text from "@/components/generic/Text";
import * as Slider from "@radix-ui/react-slider";
import { useState } from "react";

export default function PlpPriceRangeFilter() {
    const MIN = 1500;
    const MAX = 900000;
    const baseCurrencySymbol = "₹";

    const [range, setRange] = useState<[number, number]>([MIN, MAX]);

    const formatted = (val: number) => val.toLocaleString("en-IN");

    return (
        <div className="flex flex-col gap-8 space-y-4 max-w-md">
            {/* Top Pills - These WILL update */}
            <div className="flex items-center justify-between gap-2">
                <div className="flex-1 flex justify-center">
                    <div className="px-6 py-3 rounded-full border border-gray-300 text-lg flex items-center justify-center w-full">
                        <Text size="customText7" weight="normal">
                            {baseCurrencySymbol} {formatted(range[0])}
                        </Text>
                    </div>
                </div>
                <span className="mx-2 font-semibold text-lg">to</span>
                <div className="flex-1 flex justify-center">
                    <div className="px-6 py-3 rounded-full border border-gray-300 text-lg flex items-center justify-center w-full">
                        <Text size="customText7" weight="normal">
                            {baseCurrencySymbol} {formatted(range[1])}
                        </Text>
                    </div>
                </div>
            </div>

            {/* Slider */}
            <div className="flex flex-col gap-6 px-2">
                <Slider.Root
                    className="relative flex w-full touch-none items-center select-none"
                    value={range}
                    onValueChange={(val) => setRange(val as [number, number])}
                    min={MIN}
                    max={MAX}
                    step={100}
                >
                    <Slider.Track className="relative h-[2px] flex-grow bg-black">
                        <Slider.Range className="absolute h-full bg-black" />
                    </Slider.Track>
                    <Slider.Thumb className="block h-6 w-6 cursor-pointer rounded-full border-4 border-white bg-black shadow" />
                    <Slider.Thumb className="block h-6 w-6 cursor-pointer rounded-full border-4 border-white bg-black shadow" />
                </Slider.Root>

                {/* Static full range display */}
                <div className="flex justify-between text-lg font-normal">
                    <Text size="customText7" weight="normal">
                        {baseCurrencySymbol} {formatted(MIN)}
                    </Text>
                    <Text size="customText7" weight="normal">
                        {baseCurrencySymbol} {formatted(MAX)}
                    </Text>
                </div>
            </div>
        </div>
    );
}
