import Text from "@/components/generic/Text";
import Pencil from "@/components/icons/Pencil";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import { useResponsive } from "@/lib/hooks/useResponsive";

export default function LensSection6({
    setCurrentSection,
}: {
    setCurrentSection: (section: number) => void;
}) {
    const { isDesktop } = useResponsive();

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
                review your selections
            </Text>
            <Text
                as="p"
                size="base"
                weight="light"
                color="fontMain"
                font="helvetica"
                className="py-6 w-3/4 text-sm lg:text-base"
            >
                Your purchase includes free shipping, no-hassle returns, and a
                six-month guarantee against scratches.
            </Text>
            <div className="py-6 flex flex-col gap-6">
                <div className="flex flex-col">
                    <div className="flex items-center justify-between">
                        <Text
                            as="p"
                            size="base"
                            weight="light"
                            color="fontMain"
                            font="helvetica"
                            className="py-6 w-3/4 text-sm lg:text-base"
                        >
                            Prescription type
                        </Text>
                        <button
                            className="flex items-center gap-2 cursor-pointer"
                            onClick={() => setCurrentSection(1)}
                        >
                            <Pencil
                                size={!isDesktop ? 14 : 16}
                                stroke="black"
                            />
                            <Text
                                as="p"
                                size="base"
                                weight="bold"
                                color="fontMain"
                                font="helvetica"
                                className="text-sm lg:text-base"
                            >
                                Edit
                            </Text>
                        </button>
                    </div>
                    <div>
                        <Text
                            as="p"
                            size="base"
                            weight="bold"
                            color="fontMain"
                            font="helvetica"
                            className="text-sm lg:text-base"
                        >
                            Single - vision
                        </Text>
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="flex items-center justify-between">
                        <Text
                            as="p"
                            size="base"
                            weight="light"
                            color="fontMain"
                            font="helvetica"
                            className="py-6 w-3/4 text-sm lg:text-base"
                        >
                            Light Protection
                        </Text>
                        <button
                            className="flex items-center gap-2 cursor-pointer"
                            onClick={() => setCurrentSection(2)}
                        >
                            <Pencil
                                size={!isDesktop ? 14 : 16}
                                stroke="black"
                            />
                            <Text
                                as="p"
                                size="base"
                                weight="bold"
                                color="fontMain"
                                font="helvetica"
                                className="text-sm lg:text-base"
                            >
                                Edit
                            </Text>
                        </button>
                    </div>
                    <div>
                        <Text
                            as="p"
                            size="base"
                            weight="bold"
                            color="fontMain"
                            font="helvetica"
                            className="text-sm lg:text-base"
                        >
                            Sun lenses
                        </Text>
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="flex items-center justify-between">
                        <Text
                            as="p"
                            size="base"
                            weight="light"
                            color="fontMain"
                            font="helvetica"
                            className="py-6 w-3/4 text-sm lg:text-base"
                        >
                            Color Tint
                        </Text>
                        <button
                            className="flex items-center gap-2 cursor-pointer"
                            onClick={() => setCurrentSection(3)}
                        >
                            <Pencil
                                size={!isDesktop ? 14 : 16}
                                stroke="black"
                            />
                            <Text
                                as="p"
                                size="base"
                                weight="bold"
                                color="fontMain"
                                font="helvetica"
                                className="text-sm lg:text-base"
                            >
                                Edit
                            </Text>
                        </button>
                    </div>
                    <div className="flex items-center justify-between">
                        <Text
                            as="p"
                            size="base"
                            weight="bold"
                            color="fontMain"
                            font="helvetica"
                            className="text-sm lg:text-base"
                        >
                            Polarised Solid Grey
                        </Text>
                        <Text
                            as="p"
                            size="base"
                            weight="bold"
                            color="fontMain"
                            font="helvetica"
                            className="text-sm lg:text-base"
                        >
                            {formatPrice(4000)}
                        </Text>
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="flex items-center justify-between">
                        <Text
                            as="p"
                            size="base"
                            weight="light"
                            color="fontMain"
                            font="helvetica"
                            className="py-6 w-3/4 text-sm lg:text-base"
                        >
                            Lens material
                        </Text>
                        <button
                            className="flex items-center gap-2 cursor-pointer"
                            onClick={() => setCurrentSection(4)}
                        >
                            <Pencil
                                size={!isDesktop ? 14 : 16}
                                stroke="black"
                            />
                            <Text
                                as="p"
                                size="base"
                                weight="bold"
                                color="fontMain"
                                font="helvetica"
                                className="text-sm lg:text-base"
                            >
                                Edit
                            </Text>
                        </button>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Image
                                src="/images/pdp/lens/log1.png"
                                alt="lens"
                                width={100}
                                height={14}
                                className="w-auto h-[14px]"
                            />
                            <Text
                                as="p"
                                size="base"
                                weight="bold"
                                color="fontMain"
                                font="helvetica"
                                className="text-sm lg:text-base"
                            >
                                Thin
                            </Text>
                        </div>
                        <Text
                            as="p"
                            size="base"
                            weight="bold"
                            color="fontMain"
                            font="helvetica"
                            className="text-sm lg:text-base"
                        >
                            {formatPrice(8000)}
                        </Text>
                    </div>
                </div>
            </div>
        </div>
    );
}
