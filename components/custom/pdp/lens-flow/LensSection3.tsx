import Text from "@/components/generic/Text";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Glass } from "./LensFlow";
import GlassColorList from "./GlassColorList";
import Car from "@/components/icons/Car";
import Island from "@/components/icons/Island";
import Cycling from "@/components/icons/Cycling";
import { LensStep } from "../datas/lensFlow.api";
import { SelectedOption } from "./LensSection6";

interface LensSection3Props {
    selectedGlass: Glass | undefined;
    setSelectedGlass: (glass: Glass) => void;
    filterLensSection3?: LensStep;
    readonly setSelectedOptions: React.Dispatch<
        React.SetStateAction<Record<string, SelectedOption>>
    >;
}

export default function LensSection3({
    selectedGlass,
    setSelectedGlass,
    filterLensSection3,
    setSelectedOptions,
}: LensSection3Props) {
    return (
        <div className="lensSec3">
            <Text
                as="p"
                size="xl5"
                weight="light"
                color="fontMain"
                font="helvetica"
                className="w-2/3 text-3xl lg:text-5xl"
            >
                {filterLensSection3?.title}
            </Text>
            <Text
                as="p"
                size="base"
                weight="light"
                color="fontMain"
                font="helvetica"
                className="py-6 w-3/4 text-sm lg:text-base"
            >
                {filterLensSection3?.description}
            </Text>

            {filterLensSection3?.steps_options?.map((option, i) => {
                const validFinishTypes =
                    option.colors_finish_type?.filter(
                        (finish) =>
                            Array.isArray(finish.colors) &&
                            finish.colors.length > 0,
                    ) ?? [];
                return (
                    <div key={i} className="pb-6">
                        <div className="flex justify-between items-center">
                            <Text
                                as="p"
                                size="base"
                                weight="bold"
                                color="black"
                                font="helvetica"
                            >
                                {option.color_type_label}
                            </Text>
                            {/* <Text
                                as="p"
                                size="base"
                                weight="bold"
                                color="fontMain"
                                font="helvetica"
                                className="text-left text-sm lg:text-base"
                            >
                                ₹ {selectedGlass?.price ?? option.price}
                            </Text> */}
                        </div>

                        {/* mobile view */}
                        <div className="flex lg:hidden flex-row items-center gap-6 pt-2 pb-4">
                            <div className="flex items-center gap-2">
                                <Text
                                    as="p"
                                    size="base"
                                    weight="light"
                                    color="fontMain"
                                    font="helvetica"
                                    className="text-sm lg:text-base"
                                >
                                    Colour:
                                </Text>
                                <div className="flex items-center gap-2">
                                    <div
                                        className="w-6 h-6 rounded-full"
                                        style={{
                                            backgroundColor:
                                                selectedGlass?.color,
                                        }}
                                    ></div>
                                    <Text
                                        as="p"
                                        size="base"
                                        weight="bold"
                                        color="fontMain"
                                        font="helvetica"
                                        className="text-sm lg:text-base capitalize"
                                    >
                                        {selectedGlass?.color}
                                    </Text>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="bg-white p-2 rounded-full border border-border-color-light">
                                    <Car size={24} fill="black" />
                                </div>
                                <div className="bg-white p-2 rounded-full border border-border-color-light">
                                    <Island size={24} stroke="black" />
                                </div>
                                <div className="bg-white p-2 rounded-full border border-border-color-light">
                                    <Cycling size={24} fill="black" />
                                </div>
                            </div>
                        </div>
                        {/* mobile view ended */}

                        <div className="pt-8">
                            {validFinishTypes.length > 0 && (
                                <Tabs
                                    defaultValue={
                                        validFinishTypes[0]?.finish_type_id
                                    }
                                    className="w-full"
                                >
                                    <TabsList>
                                        {validFinishTypes.map((finishType) => (
                                            <TabsTrigger
                                                key={finishType.finish_type_id}
                                                value={
                                                    finishType.finish_type_id
                                                }
                                                className="bg-transparent data-[state=active]:bg-transparent text-font-secondary text-sm data-[state=active]:font-bold data-[state=active]:text-black data-[state=active]:shadow-none rounded-none border-0 border-b-2 border-transparent data-[state=active]:border-primary-100 cursor-pointer"
                                            >
                                                {finishType.finish_type_label}
                                            </TabsTrigger>
                                        ))}
                                    </TabsList>

                                    {validFinishTypes.map((finishType, idx) => {
                                        const mappedGlasses =
                                            finishType.colors?.map((color) => ({
                                                id: Number(color.id),
                                                color: color.color_code,
                                                isGradient:
                                                    color.color_code.includes(
                                                        ",",
                                                    ),
                                                image: color.image || "",
                                                name: color.color_name,
                                                recommended: color.recommended,
                                                price: Number(color.price),
                                            })) ?? [];

                                        return (
                                            <TabsContent
                                                key={idx}
                                                value={
                                                    finishType.finish_type_id
                                                }
                                            >
                                                <GlassColorList
                                                    glasses={mappedGlasses}
                                                    selectedGlass={
                                                        selectedGlass
                                                    }
                                                    setSelectedGlass={(
                                                        selected,
                                                    ) => {
                                                        // selected is already the full Glass object
                                                        setSelectedGlass(
                                                            selected,
                                                        );

                                                        // save correct price + color
                                                        setSelectedOptions(
                                                            (prev) => ({
                                                                ...prev,
                                                                [filterLensSection3?.alias ??
                                                                ""]: {
                                                                    id:
                                                                        typeof option.id ===
                                                                        "number"
                                                                            ? option.id
                                                                            : undefined,
                                                                    title: option.title,
                                                                    description:
                                                                        option.description,
                                                                    image: option.image,
                                                                    next_step:
                                                                        option.next_step,
                                                                    price:
                                                                        selected.price ??
                                                                        option.price,
                                                                    color_type:
                                                                        option.color_type,
                                                                    color_type_label:
                                                                        option.color_type_label,
                                                                    selectedFinishType:
                                                                        finishType.finish_type_label,
                                                                    selectedColor:
                                                                        selected,
                                                                },
                                                            }),
                                                        );
                                                    }}
                                                />
                                            </TabsContent>
                                        );
                                    })}
                                </Tabs>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
