export default function CartMinus({
    size = 14,
    fill = "black",
}: {
    size?: number;
    fill?: string;
    className?: string;
}) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height="2"
            viewBox="0 0 16 2"
            fill={fill}
        >
            <path
                d="M1 1H15"
                stroke={fill}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
