"use client";

import { ColorSwatchesProps } from "./swatchesType";
import Text from "../Text";
import Link from "next/link";

export function ColorSwatches({
    colors,
    maxVisible = 3,
}: Readonly<ColorSwatchesProps>) {
    const visible = colors.slice(0, maxVisible);
    const extraColors = colors.length > 3 ? colors.length - 3 : 0;

    //   const remaining = colors.length - maxVisible;
    return (
        <div>
            <div className="mb-[11px] flex items-center gap-2 lg:mt-2 lg:mb-2">
                {visible.map((color, index) => (
                    <div key={`${color.hex}-${index}`} className="relative">
                        <div
                            className="h-5 w-5 shrink-0 border border-gray-300 rounded-full"
                            style={{ backgroundColor: color.hex }}
                        />
                        {Number(color?.is_current) === 1 && (
                            <span className="absolute inset-0 rounded-full ring-2 ring-black-500 ring-offset-2"></span>
                        )}
                    </div>
                ))}
                {/* {remaining > 0 && ( */}
            </div>
            {extraColors > 0 && (
                <Link href="#" className="underline hidden lg:block">
                    <Text size="base" weight="normal" className="text-right">
                        More ({extraColors})
                    </Text>
                </Link>
            )}
        </div>
    );
}
