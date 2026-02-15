export default function Play({
    width = 17,
    height = 22,
    fill = "white",
}: {
    width?: number;
    height?: number;
    fill?: string;
}) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox="0 0 17 22"
            fill="none"
        >
            <path
                d="M15.6488 9.35971C16.7897 10.1557 16.7897 11.8444 15.6488 12.6403L3.14431 21.3638C1.81847 22.2887 0 21.3401 0 19.7235V2.27649C0 0.659896 1.81848 -0.288742 3.14432 0.636206L15.6488 9.35971Z"
                fill={fill}
            />
        </svg>
    );
}
