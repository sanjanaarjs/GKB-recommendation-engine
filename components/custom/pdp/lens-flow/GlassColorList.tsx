"use client";

import { useEffect, useState } from "react";
import { Glass } from "./LensFlow";
import Minus from "@/components/icons/Minus";
import Plus from "@/components/icons/Plus";
import Text from "@/components/generic/Text";

interface GlassColorListProps {
    glasses: Glass[];
    selectedGlass: Glass | undefined;
    setSelectedGlass: (glass: Glass) => void;
}

export default function GlassColorList({
    glasses,
    selectedGlass,
    setSelectedGlass,
}: GlassColorListProps) {
    const [showAll, setShowAll] = useState(false);

    //auto-select first glass (FULL OBJECT)
    useEffect(() => {
        if (glasses.length > 0 && !selectedGlass) {
            setSelectedGlass(glasses[0]);
        }
    }, [glasses, selectedGlass, setSelectedGlass]);

    return (
        <div className="py-6 flex items-center gap-2 flex-wrap">
            {glasses.slice(0, showAll ? glasses.length : 5).map((glass) => {
                const isGradient = glass.color.includes(",");

                const swatchStyle = isGradient
                    ? {
                          background: `linear-gradient(135deg, ${glass.color
                              .split(",")
                              .join(", ")})`,
                      }
                    : {
                          backgroundColor: glass.color,
                      };

                return (
                    <button
                        key={glass.id}
                        className="w-16 h-16 rounded-full border flex items-center justify-center cursor-pointer transition-all"
                        style={{
                            borderColor:
                                selectedGlass?.id === glass.id
                                    ? "#000"
                                    : "transparent",
                        }}
                        onClick={() => setSelectedGlass(glass)}
                    >
                        <div
                            className="w-12 h-12 rounded-full"
                            style={swatchStyle}
                        />
                    </button>
                );
            })}

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
