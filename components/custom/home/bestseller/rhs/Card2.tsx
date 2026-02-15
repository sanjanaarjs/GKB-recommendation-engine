import Text from "@/components/generic/Text";
import { ItemData } from "@/lib/services/magento/homepageData";
import Image from "next/image";

export default function Card2({ data }: { data: ItemData }) {
    return (
        <div className="flex flex-col h-full w-full relative justify-end items-center pb-20">
            {data?.attachment && (
                <Image
                    src={data?.attachment}
                    alt={`images_${data.name}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                />
            )}
            <div className="z-10">
                <button className="primary-button px-12 py-4 rounded-full">
                    <Text
                        as="p"
                        font="helvetica"
                        size="lg"
                        color="inherit"
                        weight="bold"
                    >
                        {data?.buttontext}
                    </Text>
                </button>
            </div>
        </div>
    );
}
