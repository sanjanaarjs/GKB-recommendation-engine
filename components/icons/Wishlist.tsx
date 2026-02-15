import React from "react";

type WishlistIconProps = {
    width?: number;
    height?: number;
    stroke?: string;
    className?: string;
};

const WishlistIcon: React.FC<WishlistIconProps> = ({
    width = 24,
    height = 24,
    stroke = "black",
    className,
}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox="0 0 24 24"
            fill="none"
            className={className}
        >
            <path
                d="M12 5.37552C18.5042 -1.25346 29.6544 11.0575 12 21C-5.6544 11.0576 5.49571 -1.25346 12 5.37552Z"
                stroke={stroke}
            />
        </svg>
    );
};

export default WishlistIcon;
