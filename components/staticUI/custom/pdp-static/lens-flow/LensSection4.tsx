import Text from "@/components/generic/Text";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";

export default function LensSection4({
    setCurrentSection,
}: {
    setCurrentSection: (section: number) => void;
}) {
    const options = [
        {
            img: "/images/pdp/lens/lens1.png",
            title: "Thin",
            description:
                "Impact-resistant polycarbonate lenses are good for prescriptions that range between -3.00 and +3.00",
            logo: "/images/pdp/lens/log1.png",
            recommended: true,
            price: 8000,
        },
        {
            img: "/images/pdp/lens/lens2.png",
            title: "Classic",
            description:
                "Impact-resistant polycarbonate lenses are good for prescriptions that range between -3.00 and +3.00",
            logo: "/images/pdp/lens/log2.png",
            recommended: false,
            price: 6000,
        },
        {
            img: "/images/pdp/lens/lens3.png",
            title: "Super Thin",
            description:
                "Impact-resistant polycarbonate lenses are good for prescriptions that range between -3.00 and +3.00",
            logo: "/images/pdp/lens/log1.png",
            recommended: false,
            price: 4000,
        },
        {
            img: "/images/pdp/lens/lens2.png",
            title: "Classic",
            description:
                "Impact-resistant polycarbonate lenses are good for prescriptions that range between -3.00 and +3.00",
            logo: "/images/pdp/lens/log2.png",
            recommended: false,
            price: 7000,
        },
        {
            img: "/images/pdp/lens/lens1.png",
            title: "Thin",
            description:
                "Impact-resistant polycarbonate lenses are good for prescriptions that range between -3.00 and +3.00",
            logo: "/images/pdp/lens/log1.png",
            recommended: false,
            price: 5000,
        },
        {
            img: "/images/pdp/lens/lens2.png",
            title: "Classic",
            description:
                "Impact-resistant polycarbonate lenses are good for prescriptions that range between -3.00 and +3.00",
            logo: "/images/pdp/lens/log1.png",
            recommended: false,
            price: 3000,
        },
        {
            img: "/images/pdp/lens/lens3.png",
            title: "Super Thin",
            description:
                "Impact-resistant polycarbonate lenses are good for prescriptions that range between -3.00 and +3.00",
            logo: "/images/pdp/lens/log2.png",
            recommended: false,
            price: 8000,
        },
        {
            img: "/images/pdp/lens/lens2.png",
            title: "Classic",
            description:
                "Impact-resistant polycarbonate lenses are good for prescriptions that range between -3.00 and +3.00",
            logo: "/images/pdp/lens/log1.png",
            recommended: false,
            price: 7000,
        },
    ];

    return (
        <div>
            <Text
                as="p"
                size="xl5"
                weight="light"
                color="fontMain"
                font="helvetica"
                className="w-2/3 text-3xl lg:text-5xl"
            >
                how thin and light can your lens be?
            </Text>
            <Text
                as="p"
                size="base"
                weight="light"
                color="fontMain"
                font="helvetica"
                className="py-6 w-3/4 text-sm lg:text-base"
            >
                Nobody wants bulky, heavy glasses — they should feel light and
                almost invisible. <br />
                You may choose any one the lens options provided below:
            </Text>
            <div className="flex flex-col gap-4">
                {options.map((option, index) => (
                    <button key={index}>
                        {option.recommended && (
                            <div className="bg-tertiary-700 w-full py-1 flex items-center justify-center rounded-t-lg">
                                <Text
                                    as="p"
                                    size="base"
                                    weight="light"
                                    color="white"
                                    font="helvetica"
                                    className="text-sm lg:text-base"
                                >
                                    Recommended for you
                                </Text>
                            </div>
                        )}
                        <div
                            className="cursor-pointer p-4 lg:p-6 bg-white rounded-lg flex gap-4 items-center border border-transparent hover:border-primary-500 transition-all duration-300"
                            onClick={() => setCurrentSection(5)}
                        >
                            <Image
                                src={option.img}
                                alt={option.title}
                                width={96}
                                height={79}
                                className="w-[96px] h-[79px]"
                            />
                            <div className="flex flex-col gap-2 items-start grow-0 w-full">
                                <div className="flex justify-between items-center gap-2 w-full">
                                    <div className="flex items-center gap-2">
                                        <Image
                                            src={option.logo}
                                            alt={option.title}
                                            width={100}
                                            height={14}
                                            className="w-auto h-[14px]"
                                        />
                                        <Text
                                            as="p"
                                            size="base"
                                            weight="bold"
                                            color="black"
                                            font="helvetica"
                                            className="text-sm lg:text-base"
                                        >
                                            {option.title}
                                        </Text>
                                    </div>
                                    <Text
                                        as="p"
                                        size="base"
                                        weight="bold"
                                        color="black"
                                        font="helvetica"
                                        className="text-sm lg:text-base"
                                    >
                                        {formatPrice(option.price)}
                                    </Text>
                                </div>
                                <Text
                                    as="p"
                                    size="base"
                                    weight="light"
                                    color="fontMain"
                                    font="helvetica"
                                    className="text-left text-xs sm:text-sm lg:text-base"
                                >
                                    {option.description}
                                </Text>
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}
