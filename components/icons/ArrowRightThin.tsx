export default function ArrowRightThin({
    size = 56,
    stroke = "black",
}: {
    size?: number;
    stroke?: string;
}) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 56 56"
            fill="none"
        >
            <path
                d="M37.3333 11.6665C37.3333 13.3978 39.0437 15.9832 40.775 18.1532C43.001 20.9532 45.661 23.3962 48.7107 25.2605C50.9973 26.6582 53.7693 27.9998 56 27.9998M56 27.9998C53.7693 27.9998 50.995 29.3415 48.7107 30.7392C45.661 32.6058 43.001 35.0488 40.775 37.8442C39.0437 40.0165 37.3333 42.6065 37.3333 44.3332M56 27.9998L1.90735e-06 27.9998"
                stroke={stroke}
                strokeWidth="2"
            />
        </svg>
    );
}
