import Text from "@/components/generic/Text";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Glass } from "./LensFlow";
import GlassColorList from "./GlassColorList";
import Car from "@/components/icons/Car";
import Island from "@/components/icons/Island";
import Cycling from "@/components/icons/Cycling";

export default function LensSection3({
    glasses,
    selectedGlass,
    setSelectedGlass,
}: {
    glasses: Glass[];
    selectedGlass: Glass | undefined;
    setSelectedGlass: (glass: number) => void;
}) {
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
                what colour tint do you prefer?
            </Text>
            <Text
                as="p"
                size="base"
                weight="light"
                color="fontMain"
                font="helvetica"
                className="py-6 w-3/4 text-sm lg:text-base"
            >
                Add a pop of personality with GKB color tints — perfect for
                style and visual comfort.
                <br />
                For enhanced clarity and glare reduction, choose polarized
                lenses that make bright days easier on the eyes..
            </Text>
            <div className="pb-6">
                <div className="flex justify-between items-center">
                    <Text
                        as="p"
                        size="base"
                        weight="bold"
                        color="black"
                        font="helvetica"
                    >
                        Polarized
                    </Text>
                    <Text
                        as="p"
                        size="base"
                        weight="bold"
                        color="fontMain"
                        font="helvetica"
                        className="text-left text-sm lg:text-base"
                    >
                        ₹ 4,000
                    </Text>
                </div>
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
                                    backgroundColor: selectedGlass?.color,
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
                <div className="pt-8">
                    <Tabs defaultValue="solid" className="w-full">
                        <TabsList>
                            <TabsTrigger
                                value="solid"
                                className="bg-transparent data-[state=active]:bg-transparent text-font-secondary text-sm data-[state=active]:font-bold data-[state=active]:text-black data-[state=active]:shadow-none rounded-none border-0 border-b-2 border-transparent data-[state=active]:border-primary-100 cursor-pointer"
                            >
                                Solid
                            </TabsTrigger>
                            <TabsTrigger
                                value="mirror"
                                className="bg-transparent data-[state=active]:bg-transparent text-font-secondary text-sm data-[state=active]:font-bold data-[state=active]:text-black data-[state=active]:shadow-none rounded-none border-0 border-b-2 border-transparent data-[state=active]:border-primary-100 cursor-pointer"
                            >
                                Mirror
                            </TabsTrigger>
                            <TabsTrigger
                                value="gradient"
                                className="bg-transparent data-[state=active]:bg-transparent text-font-secondary text-sm data-[state=active]:font-bold data-[state=active]:text-black data-[state=active]:shadow-none rounded-none border-0 border-b-2 border-transparent data-[state=active]:border-primary-100 cursor-pointer"
                            >
                                Gradient
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="solid">
                            <GlassColorList
                                glasses={glasses}
                                selectedGlass={selectedGlass}
                                setSelectedGlass={setSelectedGlass}
                            />
                        </TabsContent>
                        <TabsContent value="mirror">
                            <GlassColorList
                                glasses={glasses}
                                selectedGlass={selectedGlass}
                                setSelectedGlass={setSelectedGlass}
                            />
                        </TabsContent>
                        <TabsContent value="gradient">
                            <GlassColorList
                                glasses={glasses}
                                selectedGlass={selectedGlass}
                                setSelectedGlass={setSelectedGlass}
                            />
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
            <div className="pb-6">
                <div className="flex justify-between items-center">
                    <Text
                        as="p"
                        size="base"
                        weight="bold"
                        color="black"
                        font="helvetica"
                    >
                        Non-Polarized
                    </Text>
                    <Text
                        as="p"
                        size="base"
                        weight="bold"
                        color="fontMain"
                        font="helvetica"
                        className="text-left"
                    >
                        ₹ 0
                    </Text>
                </div>
                <div>
                    <GlassColorList
                        glasses={[...glasses].reverse()}
                        selectedGlass={selectedGlass}
                        setSelectedGlass={setSelectedGlass}
                    />
                </div>
            </div>
        </div>
    );
}
