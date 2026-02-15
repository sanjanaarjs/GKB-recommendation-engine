import Image from "next/image";
import Text from "@/components/generic/Text";

export default function ImageGridQR() {
    return (
        <div className="flex items-center justify-center">
            <div className="flex lg:flex-row flex-col w-full">
                <div className="flex-1 border border-border-grey w-full">
                    <Image
                        width={968}
                        height={1450}
                        src="/images/pdp/tryon1-original.png"
                        alt="Woman with sunglasses"
                        className="w-full"
                    />
                </div>
                <div className="flex-1 border border-border-grey w-full">
                    <Image
                        width={968}
                        height={1450}
                        src="/images/pdp/tryon2-original.png"
                        alt="Man with sunglasses"
                        className="w-full"
                    />
                </div>
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center border border-border-grey">
                    <Text as={"p"} className="text-lg mb-4">
                        See how they look on you
                    </Text>
                    <button className="bg-black text-white px-6 py-2 rounded-full shadow hover:bg-gray-800 transition cursor-pointer">
                        try them on
                    </button>
                </div>
            </div>
        </div>
    );
}
