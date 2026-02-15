import Text from "@/components/generic/Text";
import Image from "next/image";
import { LensStep } from "../datas/lensFlow.api";
import { SelectedOption } from "./LensSection6";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface LensSection1Props {
    // readonly setCurrentAlias: (section: string) => void;
    readonly goToStep: (nextAlias: string) => void;
    readonly filterLensSection1?: LensStep;
    readonly setSelectedOptions: React.Dispatch<
        React.SetStateAction<Record<string, SelectedOption>>
    >;
}

export default function LensSection1({
    // setCurrentAlias,
    filterLensSection1,
    setSelectedOptions,
    goToStep,
}: LensSection1Props) {
    // filtered tabs
    const noPowerTitles = ["Zero power Tinted", "Zero power computer"];

    const allOptions = filterLensSection1?.steps_options ?? [];

    // filter steps
    const noPowerOptions = allOptions.filter((opt) =>
        noPowerTitles.includes(opt.title),
    );

    const withPowerOptions = allOptions.filter(
        (opt) => !noPowerTitles.includes(opt.title),
    );

    // lens structure
    const renderOptions = (options: any[]) => (
        <div className="flex flex-col gap-4">
            {options.map((option, index) => (
                <button
                    key={index}
                    className="cursor-pointer p-4 lg:p-6 bg-white rounded-lg flex gap-4 items-center border border-transparent hover:border-primary-500 transition-all duration-300"
                    onClick={() => {
                        setSelectedOptions((prev) => ({
                            ...prev,
                            [filterLensSection1?.alias ?? ""]: {
                                id:
                                    typeof option.id === "number"
                                        ? option.id
                                        : undefined,
                                title: option.title,
                                description: option.description,
                                image: option.image,
                                next_step: option.next_step,
                                lightOption: option.lightOption,
                            },
                        }));

                        const nextStep = option.next_step || "light_protection";
                        goToStep(nextStep);
                    }}
                >
                    <Image
                        src={(option.image ?? "").trim()}
                        alt={option.title}
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
                        >
                            {option.title}
                        </Text>
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
    );

    return (
        <div className="step-1">
            <Text
                as="p"
                size="xl5"
                weight="light"
                color="fontMain"
                font="helvetica"
                className="w-2/3 text-3xl lg:text-5xl"
            >
                {filterLensSection1?.title}
            </Text>
            <Text
                as="p"
                size="base"
                weight="light"
                color="fontMain"
                font="helvetica"
                className="py-6 w-3/4 text-sm lg:text-base"
            >
                {filterLensSection1?.description}
            </Text>

            {filterLensSection1?.alias === "prescription_type" && (
                <Tabs defaultValue="no_power" className="w-full">
                    <TabsList className="grid grid-cols-2 w-[250px] mb-6">
                        <TabsTrigger
                            value="no_power"
                            className="font-helvetica text-font-secondary font-bold leading-[18px] text-sm shadow-none bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary-100 rounded-none data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-black border-0 border-b-2 border-transparent cursor-pointer"
                        >
                            No Power
                        </TabsTrigger>
                        <TabsTrigger
                            value="with_power"
                            className="font-helvetica text-font-secondary font-bold leading-[18px] text-sm shadow-none bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary-100 rounded-none data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-black border-0 border-b-2 border-transparent cursor-pointer"
                        >
                            With Power
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="no_power">
                        {renderOptions(noPowerOptions)}
                    </TabsContent>

                    <TabsContent value="with_power">
                        {renderOptions(withPowerOptions)}
                    </TabsContent>
                </Tabs>
            )}
        </div>
    );
}
