export default function CartWishlist({
    size = 18,
    fill = "none",
    stroke = "black",
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
            viewBox="0 0 20 18"
            fill={fill}
            className={className}
        >
            <path
                d="M14.5429 0.750427C11.4999 0.750427 10 3.75027 10 3.75027C10 3.75027 8.50008 0.750427 5.45712 0.750427C2.98412 0.750427 1.02579 2.81938 1.00048 5.28816C0.948919 10.4127 5.06573 14.0571 9.57815 17.1197C9.70255 17.2044 9.84954 17.2496 10 17.2496C10.1505 17.2496 10.2975 17.2044 10.4219 17.1197C14.9338 14.0571 19.0506 10.4127 18.9995 5.28816C18.9742 2.81938 17.0159 0.750427 14.5429 0.750427Z"
                stroke={stroke}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
