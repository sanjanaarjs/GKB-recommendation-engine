import Image from "next/image";
import Text from "@/components/generic/Text";
import Link from "next/link";
import { ProductDetails } from "./datas/pdpData.api";

interface ImageGridQRProps {
    productContent: ProductDetails[];
}

export default function ImageGridQR({ productContent }: ImageGridQRProps) {
    const imageContent = productContent[0]?.ProductContentRow?.filter(
        (item) => item.sort_order === "1",
    );

    return (
        <div className="flex items-center justify-center">
            <div className="flex lg:flex-row flex-col w-full">
                {imageContent?.map((item, index) => (
                    <div
                        key={index}
                        className="flex-1 border border-border-grey w-full"
                    >
                        <Image
                            width={968}
                            height={1450}
                            src={item.media}
                            alt={item.title || "Product image"}
                            className="w-full"
                        />
                    </div>
                ))}
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center border border-border-grey">
                    <Text as={"p"} className="text-lg mb-4">
                        {imageContent?.[0]?.description}
                    </Text>
                    <Link
                        href={imageContent?.[0]?.btn_url || "#"}
                        className="bg-black text-white px-6 py-2 rounded-full shadow hover:bg-gray-800 transition cursor-pointer"
                    >
                        {imageContent?.[0]?.btn_text}
                    </Link>
                </div>
            </div>
        </div>
    );
}
