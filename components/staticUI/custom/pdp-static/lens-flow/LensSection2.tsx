import Text from "@/components/generic/Text";
import ChevronRight from "@/components/icons/ChevronRight";
import Image from "next/image";
import Link from "next/link";
import { useResponsive } from "@/lib/hooks/useResponsive";

export default function LensSection2({
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
                className="w-3/4 text-3xl lg:text-5xl"
            >
                what type of light protection do you need?
            </Text>
            <Text
                as="p"
                size="base"
                weight="light"
                color="fontMain"
                font="helvetica"
                className="py-6 w-3/4 text-sm lg:text-base"
            >
                Your eyes deserve constant protection — that’s why even our
                clear lenses block 100% of UV rays. Need blue light defense,
                stylish sunglasses, or convenient self-tinting lenses? GKB has a
                solution for every kind of light.
            </Text>
            <div className="flex flex-col gap-4">
                <button
                    className="cursor-pointer p-4 lg:p-6 bg-white rounded-lg flex gap-4 items-center border border-transparent hover:border-primary-500 transition-all duration-300"
                    onClick={() => setCurrentSection(3)}
                >
                    <Image
                        src="/images/pdp/lens/clear.png"
                        alt="clear"
                        width={96}
                        height={79}
                        className="w-[96px] h-[79px]"
                    />
                    <div className="flex flex-col gap-2 items-start grow-0">
                        <Text
                            as="p"
                            size="base"
                            weight="bold"
                            color="black"
                            font="helvetica"
                            className="text-sm lg:text-base"
                        >
                            Clear
                        </Text>
                        <Text
                            as="p"
                            size="base"
                            weight="light"
                            color="fontMain"
                            font="helvetica"
                            className="text-left text-xs sm:text-sm lg:text-base"
                        >
                            Clear lenses with blue light filter capability to
                            reduce eye strain and eye fatigue
                        </Text>
                    </div>
                </button>
                <button
                    className="cursor-pointer p-4 lg:p-6 bg-white rounded-lg flex gap-4 items-center border border-transparent hover:border-primary-500 transition-all duration-300"
                    onClick={() => setCurrentSection(3)}
                >
                    <Image
                        src="/images/pdp/lens/sun.png"
                        alt="sunglasses"
                        width={96}
                        height={79}
                        className="w-[96px] h-[79px]"
                    />
                    <div className="flex flex-col gap-2 items-start grow-0">
                        <div className="flex items-center gap-8">
                            <Text
                                as="p"
                                size="base"
                                weight="bold"
                                color="black"
                                font="helvetica"
                                className="text-sm lg:text-base"
                            >
                                Sun lenses
                            </Text>
                            <div className="flex items-center gap-2">
                                <Text
                                    as="p"
                                    size="base"
                                    weight="bold"
                                    color="black"
                                    font="helvetica"
                                    className="text-sm lg:text-base"
                                >
                                    Select colour
                                </Text>
                                <ChevronRight
                                    size={!isDesktop ? 10 : 16}
                                    fill="black"
                                />
                            </div>
                        </div>
                        <Text
                            as="p"
                            size="base"
                            weight="light"
                            color="fontMain"
                            font="helvetica"
                            className="text-left text-xs sm:text-sm lg:text-base"
                        >
                            Tinted lenses to reduce glare when there is excess
                            light, and improve contrast
                        </Text>
                    </div>
                </button>
                <button
                    className="cursor-pointer p-4 lg:p-6 bg-white rounded-lg flex gap-4 items-center border border-transparent hover:border-primary-500 transition-all duration-300"
                    onClick={() => setCurrentSection(3)}
                >
                    <Image
                        src="/images/pdp/lens/photochromic.gif"
                        alt="photochromic"
                        width={96}
                        height={79}
                        className="w-[96px] h-[79px]"
                    />
                    <div className="flex flex-col gap-2 items-start grow-0">
                        <div className="flex items-center gap-8">
                            <Text
                                as="p"
                                size="base"
                                weight="bold"
                                color="black"
                                font="helvetica"
                                className="text-sm lg:text-base"
                            >
                                Photochromic
                            </Text>
                            <div className="flex items-center gap-2">
                                <Text
                                    as="p"
                                    size="base"
                                    weight="bold"
                                    color="black"
                                    font="helvetica"
                                    className="text-sm lg:text-base"
                                >
                                    Select colour
                                </Text>
                                <ChevronRight
                                    size={!isDesktop ? 10 : 16}
                                    fill="black"
                                />
                            </div>
                        </div>
                        <Text
                            as="p"
                            size="base"
                            weight="light"
                            color="fontMain"
                            font="helvetica"
                            className="text-left text-xs sm:text-sm lg:text-base"
                        >
                            Regular clear lenses when worn indoors but darken
                            when exposed to UV rays protecting our eyes from the
                            harmful rays
                        </Text>
                    </div>
                </button>
            </div>
            <Text
                as="p"
                size="base"
                weight="normal"
                color="black"
                font="helvetica"
                className="pt-6 text-sm lg:text-base"
            >
                Need help choosing the right lenses? Let our experts guide you!
            </Text>
            <div className="flex items-center gap-2 py-2">
                <Link href="#">
                    <Text
                        as="p"
                        size="base"
                        weight="bold"
                        color="black"
                        font="helvetica"
                        className="text-sm lg:text-base"
                    >
                        Read our lens guide
                    </Text>
                </Link>
                <Text
                    as="p"
                    size="base"
                    weight="normal"
                    color="black"
                    font="helvetica"
                    className="text-sm lg:text-base"
                >
                    or
                </Text>
                <Link href="#" className="flex items-center gap-2">
                    <Text
                        as="p"
                        size="base"
                        weight="bold"
                        color="black"
                        font="helvetica"
                        className="text-sm lg:text-base"
                    >
                        Request a callback
                    </Text>
                    <ChevronRight size={!isDesktop ? 10 : 16} fill="black" />
                </Link>
            </div>
        </div>
    );
}
