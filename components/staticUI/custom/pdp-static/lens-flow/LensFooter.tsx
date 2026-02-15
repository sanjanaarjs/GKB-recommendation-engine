import Text from "@/components/generic/Text";
import Car from "@/components/icons/Car";
import Cycling from "@/components/icons/Cycling";
import Island from "@/components/icons/Island";
import { Glass } from "./LensFlow";
import { cn } from "@/lib/utils";

export default function LensFooter({
    currentGlass,
    currentSection,
    setCurrentSection,
}: {
    currentGlass: Glass | undefined;
    currentSection: number;
    setCurrentSection: (section: number) => void;
}) {
    return (
        <div className="px-6 sm:px-10 lg:px-20 pt-2 pb-12 border-t border-border-color-light">
            <div className="py-2 flex justify-between items-center">
                <Text
                    as="p"
                    size="base"
                    weight="bold"
                    color="black"
                    font="helvetica"
                    className="text-sm lg:text-base"
                >
                    Black Arrow
                </Text>
                <Text
                    as="p"
                    size="base"
                    weight="bold"
                    color="fontMain"
                    font="helvetica"
                    className="text-sm lg:text-base"
                >
                    ₹ 24,640
                </Text>
            </div>
            <div className="flex justify-between items-end">
                <table>
                    <tbody>
                        <tr>
                            <td className="pr-4 py-2">
                                <Text
                                    as="p"
                                    size="base"
                                    weight="light"
                                    color="fontMain"
                                    font="helvetica"
                                    className="text-sm lg:text-base"
                                >
                                    Frame size:
                                </Text>
                            </td>
                            <td className="py-2">
                                <Text
                                    as="p"
                                    size="base"
                                    weight="light"
                                    color="fontMain"
                                    font="helvetica"
                                    className="text-sm lg:text-base"
                                >
                                    Medium
                                </Text>
                            </td>
                        </tr>
                        <tr>
                            <td className="pr-4 py-2">
                                <Text
                                    as="p"
                                    size="base"
                                    weight="light"
                                    color="fontMain"
                                    font="helvetica"
                                    className="text-sm lg:text-base"
                                >
                                    Frame colour:
                                </Text>
                            </td>
                            <td className="py-2">
                                <Text
                                    as="p"
                                    size="base"
                                    weight="light"
                                    color="fontMain"
                                    font="helvetica"
                                    className="text-sm lg:text-base"
                                >
                                    Black
                                </Text>
                            </td>
                        </tr>
                        <tr>
                            <td className="pr-4 py-2">
                                <Text
                                    as="p"
                                    size="base"
                                    weight="light"
                                    color="fontMain"
                                    font="helvetica"
                                    className="text-sm lg:text-base"
                                >
                                    Lens size:
                                </Text>
                            </td>
                            <td className="flex items-center gap-2 py-2">
                                <div
                                    className="w-8 h-8 rounded-full hidden lg:block"
                                    style={{
                                        backgroundColor: currentGlass?.color,
                                    }}
                                ></div>
                                <Text
                                    as="p"
                                    size="base"
                                    weight="light"
                                    color="fontMain"
                                    font="helvetica"
                                    className="capitalize text-sm lg:text-base"
                                >
                                    {currentGlass?.color}
                                </Text>
                            </td>
                        </tr>
                    </tbody>
                </table>
                {currentSection === 3 && (
                    <div className="hidden lg:flex flex-col lg:flex-row items-start gap-2">
                        <Text
                            as="p"
                            size="base"
                            weight="light"
                            color="fontMain"
                            font="helvetica"
                            className="text-sm lg:text-base"
                        >
                            Colour recommended for:
                        </Text>
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
                )}
                <div className="hidden lg:block">
                    {currentSection === 3 && (
                        <button
                            className="secondary-button px-20 py-3"
                            onClick={() => setCurrentSection(4)}
                        >
                            <Text
                                as="p"
                                size="xl"
                                weight="bold"
                                color="inherit"
                                font="helvetica"
                                className="text-sm lg:text-xl"
                            >
                                apply color
                            </Text>
                        </button>
                    )}
                    {currentSection === 6 && (
                        <button className="secondary-button px-20 py-3">
                            <Text
                                as="p"
                                size="xl"
                                weight="bold"
                                color="inherit"
                                font="helvetica"
                                className="text-sm lg:text-xl"
                            >
                                add to cart
                            </Text>
                        </button>
                    )}
                </div>
            </div>

            <div
                className={cn(
                    "fixed bottom-0 left-0 right-0 px-6 py-4 flex lg:hidden justify-between items-center bg-background-grey-light z-[60] border-t transition-all linear duration-500",
                    currentSection === 3 || currentSection === 6
                        ? "bottom-0"
                        : "-bottom-100",
                )}
            >
                {currentSection === 3 && (
                    <>
                        <div className="flex flex-col items-start gap-2">
                            <Text
                                as="p"
                                size="base"
                                weight="light"
                                color="fontMain"
                                font="helvetica"
                                className="text-sm lg:text-base"
                            >
                                Selected colour:
                            </Text>
                            <Text
                                as="p"
                                size="base"
                                weight="bold"
                                color="fontMain"
                                font="helvetica"
                                className="text-sm lg:text-base capitalize"
                            >
                                {currentGlass?.color}
                            </Text>
                        </div>
                        <div>
                            <button
                                className="secondary-button px-8 lg:px-20 py-2"
                                onClick={() => setCurrentSection(4)}
                            >
                                <Text
                                    as="p"
                                    size="xl"
                                    weight="normal"
                                    color="inherit"
                                    font="helvetica"
                                    className="text-sm lg:text-xl"
                                >
                                    apply color
                                </Text>
                            </button>
                        </div>
                    </>
                )}
                {currentSection === 6 && (
                    <>
                        <div></div>
                        <div>
                            <button className="secondary-button px-8 lg:px-20 py-2">
                                <Text
                                    as="p"
                                    size="xl"
                                    weight="normal"
                                    color="inherit"
                                    font="helvetica"
                                    className="text-sm lg:text-xl"
                                >
                                    add to cart
                                </Text>
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
