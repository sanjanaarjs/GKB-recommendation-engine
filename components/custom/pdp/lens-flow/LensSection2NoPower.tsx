import { LensStep } from "../datas/lensFlow.api";
import Text from "@/components/generic/Text";
import ChevronRight from "@/components/icons/ChevronRight";
import Image from "next/image";
import Link from "next/link";
import { useResponsive } from "@/lib/hooks/useResponsive";
import { SelectedOption } from "./LensSection6";
import { filterByLightOption } from "@/lib/utils/filterByLightOption";

interface LensSection2NoPowerProps {
    // readonly setCurrentAlias: (alias: string) => void;
    readonly filterLensSection2NoPower?: LensStep;
    readonly setSelectedOptions: React.Dispatch<
        React.SetStateAction<Record<string, SelectedOption>>
    >;
    readonly selectedOptions: Record<string, SelectedOption>;
    readonly goToStep: (nextAlias: string) => void;
}

export default function LensSection2NoPower({
    // setCurrentAlias,
    filterLensSection2NoPower,
    setSelectedOptions,
    selectedOptions,
    goToStep,
}: LensSection2NoPowerProps) {
    const { isDesktop } = useResponsive();
    const selectedPrescription = selectedOptions["prescription_type"]; // alias of section 1

    const filteredOptions = filterByLightOption(
        filterLensSection2NoPower?.steps_options ?? [],
        selectedPrescription?.lightOption,
    );
    return (
        <div>
            <Text
                as="p"
                size="xl5"
                weight="light"
                color="fontMain"
                font="helvetica"
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
                {filteredOptions?.map((option, index) => (
                    <button
                        key={index}
                        className="cursor-pointer p-4 lg:p-6 bg-white rounded-lg flex gap-4 items-center border border-transparent hover:border-primary-500 transition-all duration-300"
                        onClick={() => {
                            // Save user’s selected option
                            setSelectedOptions((prev) => ({
                                ...prev,
                                [filterLensSection2NoPower?.alias ?? ""]: {
                                    id:
                                        typeof option.id === "number"
                                            ? option.id
                                            : undefined,
                                    title: option.title,
                                    description: option.description,
                                    image: option.image,
                                    next_step: option.next_step,
                                    is_color: option.is_color,
                                    // add other SelectedOption properties if needed
                                },
                            }));
                            const isColorStep = Number(option.is_color) === 1;

                            if (isColorStep && option.next_step) {
                                // Go to LensSection3
                                goToStep(option.next_step);
                            } else if (option.next_step) {
                                // Go to LensSection4
                                goToStep(option.next_step);
                            } else {
                                // if API next_step is missing, fallback to hardcoded alias
                                goToStep("choice_lens");
                            }
                        }}
                    >
                        <Image
                            src={option.image ?? "/placeholder.png"}
                            alt={option.title}
                            width={96}
                            height={79}
                            className="w-[96px] h-[79px]"
                        />
                        <div className="flex flex-col gap-2 items-start grow-0">
                            <div className="flex items-center gap-8">
                                <Text
                                    as="p"
                                    size="customText11"
                                    weight="bold"
                                    color="black"
                                    font="helvetica"
                                >
                                    {option.title}
                                </Text>
                                {option.is_color === 1 && (
                                    <div className="flex items-center gap-2">
                                        <Text
                                            as="p"
                                            size="customText11"
                                            weight="bold"
                                            color="black"
                                            font="helvetica"
                                        >
                                            Select colour
                                        </Text>
                                        <ChevronRight
                                            size={!isDesktop ? 10 : 16}
                                            fill="black"
                                        />
                                    </div>
                                )}
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
                    </button>
                ))}
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
