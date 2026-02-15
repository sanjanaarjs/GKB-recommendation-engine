import React from "react";

type PhoneProps = {
    size?: number;
    color?: string;
    className?: string;
};

const Phone: React.FC<PhoneProps> = ({
    size = 14,
    color = "black",
    className,
}) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 14 14"
        fill="none"
        className={className}
    >
        <path
            d="M2.86531 6.14892L4.40531 4.60892C4.55831 4.45336 4.66653 4.25943 4.71858 4.04754C4.77062 3.83566 4.76457 3.61365 4.70106 3.40492C4.59314 3.04984 4.4978 2.69106 4.41523 2.32925C4.34756 2.0125 4.06931 1.75 3.74498 1.75H2.86531C2.21781 1.75 1.68523 2.27733 1.7564 2.92133C2.29656 7.81667 6.1839 11.7034 11.0786 12.2436C11.7226 12.3147 12.25 11.7828 12.25 11.1353V10.2544C12.25 9.93125 11.9863 9.66525 11.6678 9.60692C11.3177 9.53884 10.9721 9.44942 10.633 9.33917C10.1856 9.19683 9.68856 9.29717 9.35665 9.6285L7.85106 11.1347"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

export default Phone;
