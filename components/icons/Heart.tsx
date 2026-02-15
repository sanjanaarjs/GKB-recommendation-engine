export default function Heart({
    size = 64,
    fill = "white",
    stroke = "black",
    colorFill = "white",
    className = "",
}) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 64 65"
            fill={colorFill}
            className={className}
        >
            <g filter="url(#filter0_d_1659_463)">
                <circle cx="32" cy="28.5" r="20" fill={fill} />
                <path
                    d="M36.5429 21.2504C33.4999 21.2504 32 24.2502 32 24.2502C32 24.2502 30.5001 21.2504 27.4571 21.2504C24.9841 21.2504 23.0258 23.3193 23.0005 25.7881C22.9489 30.9127 27.0657 34.557 31.5782 37.6197C31.7026 37.7043 31.8495 37.7496 32 37.7496C32.1505 37.7496 32.2975 37.7043 32.4219 37.6197C36.9338 34.557 41.0506 30.9127 40.9995 25.7881C40.9742 23.3193 39.0159 21.2504 36.5429 21.2504Z"
                    stroke={stroke}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </g>
            <defs>
                <filter
                    id="filter0_d_1659_463"
                    x="0"
                    y="0.5"
                    width="64"
                    height="64"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                    />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="6" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                    />
                    <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_1659_463"
                    />
                    <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_1659_463"
                        result="shape"
                    />
                </filter>
            </defs>
        </svg>
    );
}
