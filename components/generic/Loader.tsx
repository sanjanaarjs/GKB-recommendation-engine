import Image from "next/image";

export default function Loader({ loading = false }: { loading?: boolean }) {
    return (
        loading && (
            <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black z-[100]">
                <Image
                    src="/images/loader.gif"
                    alt="Loading"
                    width={100}
                    height={100}
                    unoptimized
                />
            </div>
        )
    );
}
