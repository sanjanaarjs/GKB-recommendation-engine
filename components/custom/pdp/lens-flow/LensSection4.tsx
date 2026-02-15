import Text from "@/components/generic/Text";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { LensStep } from "../datas/lensFlow.api";
import { SelectedOption } from "./LensSection6";

interface LensSection4Props {
    // readonly setCurrentAlias: (alias: string) => void;
    readonly filterLensSection4?: LensStep;
    readonly setSelectedOptions: React.Dispatch<
        React.SetStateAction<Record<string, SelectedOption>>
    >;
    readonly goToStep: (nextAlias: string) => void;
}

export default function LensSection4({
    // setCurrentAlias,
    filterLensSection4,
    setSelectedOptions,
    goToStep,
}: LensSection4Props) {
    return (
        <div className="lenssec4">
            {/* Title */}
            <Text
                as="p"
                size="xl5"
                weight="light"
                color="fontMain"
                font="helvetica"
                className="w-2/3 text-3xl lg:text-5xl"
            >
                {filterLensSection4?.title}
            </Text>

            {/* Description */}
            <Text
                as="p"
                size="base"
                weight="light"
                color="fontMain"
                font="helvetica"
                className="py-6 w-3/4 text-sm lg:text-base"
            >
                {filterLensSection4?.description}
            </Text>

            {/* Step options */}
            <div className="flex flex-col gap-4 test-4">
                {filterLensSection4?.steps_options?.map((option) => {
                    const imageSrc = option.image
                        ? encodeURI(option.image.trim())
                        : option.small_image;

                    return (
                        <button
                            key={option.id}
                            type="button"
                            className="cursor-pointer p-4 lg:p-6 bg-white rounded-lg flex gap-4 items-center border border-transparent hover:border-primary-500 transition-all duration-300"
                            onClick={() => {
                                setSelectedOptions((prev) => ({
                                    ...prev,
                                    [filterLensSection4?.alias ?? ""]: {
                                        id:
                                            typeof option.id === "number"
                                                ? option.id
                                                : undefined,
                                        title: option.title,
                                        description: option.description,
                                        image: option.image,
                                        next_step: option.next_step,
                                    },
                                }));
                                const nextAlias =
                                    option.next_step || "select_prescription";
                                goToStep(nextAlias);
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    setSelectedOptions((prev) => ({
                                        ...prev,
                                        [filterLensSection4?.alias ?? ""]: {
                                            id:
                                                typeof option.id === "number"
                                                    ? option.id
                                                    : undefined,
                                            title: option.title,
                                            description: option.description,
                                            image: option.image,
                                            next_step: option.next_step,
                                            price: option.price,
                                        },
                                    }));
                                    const nextAlias =
                                        option.next_step ||
                                        "select_prescription";
                                    goToStep(nextAlias);
                                }
                            }}
                        >
                            <Image
                                src={imageSrc || "/placeholder.png"}
                                alt={option.title}
                                width={96}
                                height={79}
                                className="w-[96px] h-[79px] object-contain"
                            />

                            <div className="flex flex-col gap-2 items-start w-full">
                                <div className="flex justify-between items-center gap-2 w-full">
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
                                    weight="light"
                                    color="fontMain"
                                    font="helvetica"
                                    className="text-left text-xs sm:text-sm lg:text-base"
                                >
                                    {option.description || ""}
                                </Text>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
