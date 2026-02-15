import Text from "@/components/generic/Text";
import ChevronRight from "@/components/icons/ChevronRight";
import Link from "next/link";
import { useResponsive } from "@/lib/hooks/useResponsive";

export default function LensSection5({
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
                <button className="cursor-pointe p-4 lg:p-6 bg-white rounded-lg flex gap-4 items-center border border-transparent hover:border-primary-500 transition-all duration-300">
                    <div className="flex flex-col gap-2 items-start grow-0">
                        <Text
                            as="p"
                            size="base"
                            weight="bold"
                            color="black"
                            font="helvetica"
                            className="text-sm lg:text-base"
                        >
                            Select from saved prescriptions
                        </Text>
                        <Text
                            as="p"
                            size="base"
                            weight="light"
                            color="fontMain"
                            font="helvetica"
                            className="text-left text-xs sm:text-sm lg:text-base"
                        >
                            Quickly choose from your previously added vision
                            details to select your prescription, without
                            re-entering anything
                        </Text>
                        <button className="pt-2 flex items-center gap-2">
                            <Text
                                as="p"
                                size="base"
                                weight="bold"
                                color="black"
                                font="helvetica"
                                className="text-sm lg:text-base"
                            >
                                Login
                            </Text>
                            <Text
                                as="p"
                                size="base"
                                weight="light"
                                color="fontMain"
                                font="helvetica"
                                className="text-sm lg:text-base"
                            >
                                to access saved prescriptions
                            </Text>
                            <ChevronRight
                                size={!isDesktop ? 10 : 16}
                                fill="black"
                            />
                        </button>
                    </div>
                </button>
                <button className="cursor-pointer p-4 lg:p-6 bg-white rounded-lg flex gap-4 items-center border border-transparent hover:border-primary-500 transition-all duration-300">
                    <div className="flex flex-col gap-2 items-start grow-0">
                        <Text
                            as="p"
                            size="base"
                            weight="bold"
                            color="black"
                            font="helvetica"
                            className="text-sm lg:text-base"
                        >
                            Upload prescriptions
                        </Text>
                        <Text
                            as="p"
                            size="base"
                            weight="light"
                            color="fontMain"
                            font="helvetica"
                            className="text-left text-xs sm:text-sm lg:text-base"
                        >
                            Already have a PDF or JPG saved on your system.
                            Upload here and we will extract the information
                            required.
                        </Text>
                    </div>
                </button>
                <button
                    className="cursor-pointer p-4 lg:p-6 bg-white rounded-lg flex gap-4 items-center border border-transparent hover:border-primary-500 transition-all duration-300"
                    onClick={() => setCurrentSection(6)}
                >
                    <div className="flex flex-col gap-2 items-start grow-0">
                        <Text
                            as="p"
                            size="base"
                            weight="bold"
                            color="black"
                            font="helvetica"
                            className="text-sm lg:text-base"
                        >
                            Send it later
                        </Text>
                        <Text
                            as="p"
                            size="base"
                            weight="light"
                            color="fontMain"
                            font="helvetica"
                            className="text-left text-xs sm:text-sm lg:text-base"
                        >
                            Our Care team will get in touch with you post
                            checkout.
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
                className="pt-6 text-xs sm:text-sm lg:text-base"
            >
                Don’t have a valid prescription?
            </Text>
            <div className="flex items-center gap-2 py-2">
                <Link href="#">
                    <Text
                        as="p"
                        size="base"
                        weight="bold"
                        color="black"
                        font="helvetica"
                        className="text-xs sm:text-sm lg:text-base"
                    >
                        Book a home service
                    </Text>
                </Link>
                <Text
                    as="p"
                    size="base"
                    weight="normal"
                    color="black"
                    font="helvetica"
                    className="text-xs sm:text-sm lg:text-base"
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
                        className="text-xs sm:text-sm lg:text-base"
                    >
                        Schedule an eye exam at a store near you
                    </Text>
                    <ChevronRight size={!isDesktop ? 10 : 16} fill="black" />
                </Link>
            </div>
        </div>
    );
}
