import Image from "next/image";

export default function Banner() {
    return (
        <div className="relative w-full h-auto">
            <Image
                src="/images/about/banner-orig.png"
                alt="Banner Image"
                width={1524}
                height={1546}
                className="w-full h-auto"
            />
        </div>
    );
}
