export default function CartDeletion({
    size = 16,
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
            viewBox="0 0 18 18"
            fill="none"
            className={className}
        >
            <path
                d="M1 3.90909H17M7.36364 13.1818V7.72727M10.6364 13.1818V7.72727M10.6364 1H7.36364C7.07431 1 6.79683 1.11493 6.59225 1.31952C6.38766 1.5241 6.27273 1.80158 6.27273 2.09091V3.90909H11.7273V2.09091C11.7273 1.80158 11.6123 1.5241 11.4078 1.31952C11.2032 1.11493 10.9257 1 10.6364 1ZM13.9891 15.9964C13.9689 16.2697 13.8458 16.5252 13.6447 16.7114C13.4437 16.8976 13.1795 17.0007 12.9055 17H5.09455C4.82049 17.0007 4.55632 16.8976 4.35525 16.7114C4.15418 16.5252 4.03114 16.2697 4.01091 15.9964L3 3.90909H15L13.9891 15.9964Z"
                stroke={stroke}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
