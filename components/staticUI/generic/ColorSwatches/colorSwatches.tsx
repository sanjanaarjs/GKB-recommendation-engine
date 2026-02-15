"use client";

import { ColorSwatchesProps } from "./swatchesType";
// import Text from '../Text';

export function ColorSwatches({
    colors,
    maxVisible = 3,
}: Readonly<ColorSwatchesProps>) {
    const visible = colors.slice(0, maxVisible);
    //   const remaining = colors.length - maxVisible;
    return (
        <div className="mb-[11px] flex items-center gap-[7px] lg:mt-2 lg:mb-2">
            {visible.map((color, index) => (
                <div
                    key={`${color.hex}-${index}`}
                    className="h-[24px] w-[24px] shrink-0 border border-gray-300 rounded-full"
                    style={{ backgroundColor: color.hex }}
                />
            ))}
            {/* {remaining > 0 && (
        <Text size="xs" weight="normal" className="ml-1">
          +{remaining}
        </Text>
      )} */}
        </div>
    );
}
