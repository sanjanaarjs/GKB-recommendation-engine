import Text from "@/components/generic/Text";
import { ItemData } from "@/lib/services/magento/homepageData";
import Image from "next/image";
export default function Card1({ data }: { data: ItemData }) {
    return (
        <div className="flex flex-col h-full w-full bg-black py-24 lg:py-12 pl-8 sm:pl-20">
            {data?.attachment && (
                <Image
                    src={data?.attachment}
                    alt={`img_${data?.name}`}
                    width={180}
                    height={114}
                    className="h-[114px]"
                />
            )}
            <Text
                as="p"
                font="helvetica"
                color="white"
                weight="light"
                className="pt-10 lg:text-base xl:text-lg 2xl:text-3xl lowercase leading-12 w-[90%] md:w-[80%]"
            >
                {data?.name ?? ""}
                <br />
                <br />
                {data?.description ?? ""}
            </Text>
            <div className="flex justify-start">
                <button className="primary-button mt-12 xl:px-12 lg:px-6 py-4 rounded-full">
                    <Text
                        as="p"
                        font="helvetica"
                        color="inherit"
                        weight="bold"
                        className="lg:text-base xl:text-lg"
                    >
                        {data?.buttontext ?? ""}
                    </Text>
                </button>
            </div>
        </div>
    );
}
