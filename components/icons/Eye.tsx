import React from "react";

interface EyeProps {
    size?: number;
    stroke?: string;
    className?: string;
}

export default function Eye({
    size = 16,
    stroke = "black",
    className = "",
}: EyeProps) {
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
                d="M8.00033 10.3337C9.28899 10.3337 10.3337 9.28899 10.3337 8.00033C10.3337 6.71166 9.28899 5.66699 8.00033 5.66699C6.71166 5.66699 5.66699 6.71166 5.66699 8.00033C5.66699 9.28899 6.71166 10.3337 8.00033 10.3337Z"
                stroke={stroke}
                strokeWidth="0.666667"
            />
            <path
                d="M13.4587 7.28933C13.7173 7.604 13.8467 7.76067 13.8467 8C13.8467 8.23933 13.7173 8.396 13.4587 8.71067C12.512 9.86 10.424 12 7.99999 12C5.57599 12 3.48799 9.86 2.54132 8.71067C2.28265 8.396 2.15332 8.23933 2.15332 8C2.15332 7.76067 2.28265 7.604 2.54132 7.28933C3.48799 6.14 5.57599 4 7.99999 4C10.424 4 12.512 6.14 13.4587 7.28933Z"
                stroke={stroke}
                strokeWidth="0.666667"
            />
        </svg>
    );
}
