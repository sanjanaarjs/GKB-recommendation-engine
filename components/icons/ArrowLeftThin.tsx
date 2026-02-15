export default function ArrowLeftThin({
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
                d="M18.6667 44.6665C18.6667 42.9352 16.9563 40.3498 15.225 38.1798C12.999 35.3798 10.339 32.9368 7.28933 31.0725C5.00267 29.6748 2.23067 28.3332 0 28.3332M0 28.3332C2.23067 28.3332 5.005 26.9915 7.28933 25.5938C10.339 23.7272 12.999 21.2842 15.225 18.4888C16.9563 16.3165 18.6667 13.7265 18.6667 11.9998M0 28.3332L56 28.3332"
                stroke={stroke}
                strokeWidth="2"
            />
        </svg>
    );
}
