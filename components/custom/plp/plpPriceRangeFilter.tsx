"use client";

import Text from "@/components/generic/Text";
import * as Slider from "@radix-ui/react-slider";
import { useEffect, useMemo, useState } from "react";
import { AggregationOption } from "./datas/productData.api";

export default function PlpPriceRangeFilter({
    options,
    onChange,
    value,
}: {
    options: AggregationOption[];
    onChange?: (min: number, max: number) => void;
    value?: [number, number];
}) {
    const baseCurrencySymbol = "₹";

    const { MIN, MAX } = useMemo(() => {
        if (!options?.length) return { MIN: 0, MAX: 0 };

        const ranges = options.map((opt) => {
            const [low, high] = opt.value.split("_").map(Number);
            return { low, high };
        });

        return {
            MIN: Math.min(...ranges.map((r) => r.low)),
            MAX: Math.max(...ranges.map((r) => r.high)),
        };
    }, [options]);

    const [range, setRange] = useState<[number, number]>(value ?? [MIN, MAX]);

    useEffect(() => {
        if (value) {
            setRange(value);
        } else {
            setRange([MIN, MAX]);
        }
    }, [MIN, MAX, value]);

    const formatted = (val: number) => val.toLocaleString("en-IN");

    return (
        <div className="flex flex-col gap-8 space-y-4 max-w-md">
            {/* Top Pills - These WILL update */}
            <div className="flex items-center justify-between gap-2 flex-col md:flex-row">
                <div className="flex-1 flex justify-center w-full">
                    <div className="px-6 py-3 rounded-full border border-gray-300 text-base flex items-center justify-center w-full">
                        <span className="mr-1">{baseCurrencySymbol}</span>
                        <input
                            type="text"
                            inputMode="numeric"
                            value={range[0]}
                            onChange={(e) => {
                                const cleaned = e.target.value.replace(
                                    /\D/g,
                                    "",
                                );
                                const val = cleaned ? parseInt(cleaned, 10) : 0;
                                setRange((prev) => [val, prev[1]]);
                            }}
                            className="w-full focus:outline-none text-center"
                            aria-label="Minimum price"
                        />
                    </div>
                </div>
                <Text
                    as="span"
                    size="base"
                    className="mx-2 font-semibold text-lg"
                >
                    to
                </Text>
                <div className="flex-1 flex justify-center w-full">
                    <div className="px-6 py-3 rounded-full border border-gray-300 text-base flex items-center justify-center w-full">
                        <span className="mr-1">{baseCurrencySymbol}</span>
                        <input
                            type="text"
                            inputMode="numeric"
                            value={range[1]}
                            onChange={(e) => {
                                const cleaned = e.target.value.replace(
                                    /\D/g,
                                    "",
                                );
                                const val = cleaned ? parseInt(cleaned, 10) : 0;
                                setRange((prev) => [prev[0], val]);
                            }}
                            className="w-full focus:outline-none text-center"
                            aria-label="Maximum price"
                        />
                    </div>
                </div>
            </div>

            {/* Slider */}
            <div className="flex flex-col gap-6 px-2">
                <Slider.Root
                    className="relative flex w-full touch-none items-center select-none"
                    value={range}
                    // onValueChange={(val) => setRange(val as [number, number])}
                    onValueChange={(val) => {
                        setRange(val as [number, number]);
                        if (onChange) {
                            const [min, max] = val as [number, number];
                            onChange(min, max); // 👈 NEW
                        }
                    }}
                    min={MIN}
                    max={MAX}
                    step={100}
                >
                    <Slider.Track className="relative h-[2px] flex-grow bg-gray-300 rounded-full">
                        <Slider.Range className="absolute h-full bg-black" />
                    </Slider.Track>
                    <Slider.Thumb className="block h-6 w-6 cursor-pointer rounded-full border-4 border-white bg-black shadow" />
                    <Slider.Thumb className="block h-6 w-6 cursor-pointer rounded-full border-4 border-white bg-black shadow" />
                </Slider.Root>

                {/* Static full range display */}
                <div className="flex justify-between text-lg font-normal">
                    <Text size="base" weight="normal">
                        {baseCurrencySymbol} {formatted(range[0])}
                    </Text>
                    <Text size="base" weight="normal">
                        {baseCurrencySymbol} {formatted(range[1])}
                    </Text>
                </div>
            </div>
        </div>
    );
}
