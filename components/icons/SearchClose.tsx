export default function SearchClose({
    size = 24,
    fill = "#0B0B0B",
}: {
    readonly size?: number;
    readonly fill?: string;
}) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 72 72"
            fill={fill}
        >
            <path
                d="M53.1431 53.1429L18.8574 18.8571M53.1431 18.8571L18.8574 53.1429"
                stroke="#0B0B0B"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
