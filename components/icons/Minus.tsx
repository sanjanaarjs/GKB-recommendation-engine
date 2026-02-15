export default function Minus({
    size = 72,
    stroke = "white",
    className,
}: {
    size?: number;
    stroke?: string;
    className?: string;
}) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 72 72"
            fill="none"
            className={className}
        >
            <path
                d="M15 36H57"
                stroke={stroke}
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
