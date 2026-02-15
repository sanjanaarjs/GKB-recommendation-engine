export default function LocationStore({
    size = 24,
    stroke = "white",
}: {
    size?: number;
    stroke?: string;
}) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
        >
            <path
                d="M10 8.5V7.5C10 6.96957 10.2107 6.46086 10.5858 6.08579C10.9609 5.71071 11.4696 5.5 12 5.5C12.5304 5.5 13.0391 5.71071 13.4142 6.08579C13.7893 6.46086 14 6.96957 14 7.5V8.5M8 13.5L9 8.5H15L16 13.5H8Z"
                stroke={stroke}
                strokeWidth="1.5"
            />
            <path
                d="M12 22C12 22 20.5 15.632 20.5 10C20.5 5.632 17.263 2 12 2C6.737 2 3.5 5.632 3.5 10C3.5 15.632 12 22 12 22Z"
                stroke={stroke}
                strokeWidth="1.5"
            />
        </svg>
    );
}
