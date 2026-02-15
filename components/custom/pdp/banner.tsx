import Image from "next/image";
import { ProductDetails } from "./datas/pdpData.api";

interface ImageGridQRProps {
    productContent: ProductDetails[];
}

export default function PdpBanner({ productContent }: ImageGridQRProps) {
    const imageBanner = productContent[0]?.ProductContentRow?.filter(
        (item) => item.sort_order === "2",
    );
    return (
        <div className="w-full">
            <Image
                width={1509}
                height={1345}
                src={imageBanner?.[0]?.media}
                alt="dual-image"
                className="w-full"
            />
        </div>
    );
}
