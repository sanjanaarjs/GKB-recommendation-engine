export default function CartPlus({
    size = 14,
    className,
}: {
    size?: number;
    fill?: string;
    className?: string;
}) {
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
                d="M1 8H15M8 15V1"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
