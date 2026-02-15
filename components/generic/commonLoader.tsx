import Image from "next/image";

export default function CommonLoader({
    loading = false,
}: {
    loading?: boolean;
}) {
    return (
        loading && (
            <div className="fixed top-0 left-0 right-0 bottom-0 flex bg-white justify-center items-center z-[100]">
                <Image
                    src="/images/common_loader.gif"
                    alt="Loading"
                    width={1000}
                    height={1000}
                    unoptimized
                />
            </div>
        )
    );
}
