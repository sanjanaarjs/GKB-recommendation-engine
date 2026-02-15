import Image from "next/image";

export default function PdpBanner() {
    return (
        <div className="w-full">
            <Image
                width={1509}
                height={1345}
                src="/images/pdp/eyeglass.png"
                alt="dual-image"
                className="w-full"
            />
        </div>
    );
}
