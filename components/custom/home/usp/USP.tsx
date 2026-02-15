import Text from "@/components/generic/Text";
import { ItemData } from "@/lib/services/magento/homepageData";
import he from "he";

export interface IUspProps {
    data: ItemData[] | [];
}

export default function USP({ data }: IUspProps) {
    return (
        <div
            className="w-full h-screen relative bg-cover bg-center bg-fixed flex flex-col items-center lg:items-end justify-center px-4 sm:px-16"
            style={{ backgroundImage: `url(${data[0]?.attachment})` }}
        >
            <div className="flex flex-col items-center justify-center max-w-[820px] lg:mr-[18px]">
                <Text
                    as="h2"
                    size="xl6"
                    weight="bold"
                    font="helvetica"
                    color="white"
                    className="text-center text-xl lg:text-3xl leading-normal mb-10"
                >
                    {data[0]?.name}
                </Text>
                <div
                    className="flex flex-col gap-5 text-center leading-normal lg:leading-[64px] w-[65%] md:w-1/2 mx-auto lg:w-auto"
                    dangerouslySetInnerHTML={{
                        __html: he.decode(data?.[0]?.description ?? ""),
                    }}
                />
                <div></div>
            </div>
        </div>
    );
}
