export default function Redeem({
    size = 24,
    className = "",
}: {
    size?: number;
    fill?: string;
    stroke?: string;
    className?: string;
}) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            className={className}
        >
            <path
                d="M12 21V12M12 7H7.95001C5.18001 7 5.01001 3 7.95001 3C11.1 3 12 7 12 7ZM12 7H16.05C18.946 7 18.946 3 16.05 3C12.9 3 12 7 12 7Z"
                stroke="black"
                strokeWidth="0.875"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M20 12V19C20 19.5304 19.7893 20.0391 19.4142 20.4142C19.0391 20.7893 18.5304 21 18 21H6C5.46957 21 4.96086 20.7893 4.58579 20.4142C4.21071 20.0391 4 19.5304 4 19V12M21 12V9C21 8.46957 20.7893 7.96086 20.4142 7.58579C20.0391 7.21071 19.5304 7 19 7H5C4.46957 7 3.96086 7.21071 3.58579 7.58579C3.21071 7.96086 3 8.46957 3 9V12H21Z"
                stroke="black"
                strokeWidth="0.875"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
