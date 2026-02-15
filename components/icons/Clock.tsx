import React from "react";

interface ClockProps {
    size?: number;
    stroke?: string;
    className?: string;
}

export default function Clock({
    size = 16,
    stroke = "black",
    className = "",
}: ClockProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 16 16"
            fill="none"
            className={className}
        >
            <path
                d="M8 2C4.6875 2 2 4.6875 2 8C2 11.3125 4.6875 14 8 14C11.3125 14 14 11.3125 14 8C14 4.6875 11.3125 2 8 2Z"
                stroke={stroke}
                strokeMiterlimit="10"
            />
            <path
                d="M8 4V8.5H11"
                stroke={stroke}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
