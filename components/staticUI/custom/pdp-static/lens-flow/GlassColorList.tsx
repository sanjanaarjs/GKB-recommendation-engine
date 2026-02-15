"use client";

import { useState } from "react";
import { Glass } from "./LensFlow";
import Minus from "@/components/icons/Minus";
import Plus from "@/components/icons/Plus";
import Text from "@/components/generic/Text";

export default function GlassColorList({
    glasses,
    selectedGlass,
    setSelectedGlass,
}: {
    glasses: Glass[];
    selectedGlass: Glass | undefined;
    setSelectedGlass: (glass: number) => void;
}) {
    const [showAll, setShowAll] = useState(false);

    return (
        <div className="py-6 flex items-center gap-2 flex-wrap">
            {glasses.slice(0, showAll ? glasses.length : 5).map((glass) => (
                <button
                    key={glass.id}
                    className="w-16 h-16 rounded-full border border-transparent flex items-center justify-center cursor-pointer"
                    style={{
                        borderColor:
                            selectedGlass?.id === glass.id
                                ? glass.color
                                : "transparent",
                    }}
                    onClick={() => setSelectedGlass(glass.id)}
                >
                    <div
                        className="w-12 h-12 rounded-full"
                        style={{ backgroundColor: glass.color }}
                    ></div>
                </button>
            ))}
            {glasses.length > 5 && (
                <button
                    className="cursor-pointer flex items-center gap-2"
                    onClick={() => setShowAll(!showAll)}
                >
                    {showAll ? (
                        <Minus size={16} stroke="black" />
                    ) : (
                        <Plus size={16} fill="black" />
                    )}
                    <Text
                        as="p"
                        size="base"
                        weight="normal"
                        color="fontMain"
                        font="helvetica"
                        className="text-sm lg:text-base"
                    >
                        {showAll ? "Less" : glasses.length - 5}
                    </Text>
                </button>
            )}
        </div>
    );
}
