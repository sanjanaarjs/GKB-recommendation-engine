import Text from "@/components/generic/Text";
import { Glass } from "./LensFlow";
import { cn, formatPrice } from "@/lib/utils";
import Image from "next/image";
import { LensProductItem } from "../datas/lensFlow.api";
import toast from "react-hot-toast";
import { useState } from "react";
import { SelectedOption } from "./LensSection6";

interface LensFooterProps {
    readonly currentGlass: Glass | undefined;
    readonly currentSection: number;
    readonly setCurrentSection: (section: number) => void;
    readonly selectedOptions?: Record<string, SelectedOption>;
    readonly frameShape?: string | null;
    readonly frameColor?: string | null;
    readonly setCurrentAlias: (alias: string) => void;
    productName?: string | undefined;
    productPrice?: string | undefined;
    lensLabelQty?: LensProductItem["lensLabelQty"];
    isPowerLensFlow?: boolean;
    rightEyeQuantity?: number;
    leftEyeQuantity?: number;
    currentAlias?: string;
    handleAddToCart?: (payload?: { lense_options?: string }) => void;
    onClose: () => void;
    currentStep?: { alias?: string };
    totalAmount?: number;
    onForceClose: () => void;
}

export default function LensFooter({
    currentGlass,
    currentSection,
    setCurrentSection,
    selectedOptions,
    frameShape,
    frameColor,
    setCurrentAlias,
    productName,
    productPrice,
    lensLabelQty,
    isPowerLensFlow,
    rightEyeQuantity,
    leftEyeQuantity,
    currentAlias,
    handleAddToCart,
    onClose,
    onForceClose,
    currentStep,
    totalAmount = 0,
}: Readonly<LensFooterProps>) {
    console.log("totalAmount", totalAmount);
    const selectedColor =
        selectedOptions?.color_sg?.selectedColor ||
        selectedOptions?.color_pc?.selectedColor;

    const [isAdding, setIsAdding] = useState(false);

    // *** NEW *** build compact string here

    const buildLensOptionsString = () => {
        const compact: Record<string, Record<string, string>> = {};

        type LensOption = {
            selectedColor?: {
                id?: number | string;
                name?: string;
                color?: string;
                recommended?: { media: string }[];
            };
            id?: number | string;
            title?: string;
            name?: string;
            value?: string;
            uploadedFileName?: string;

            // NEW FIELDS for upload prescription
            prescriptionId?: number | string;
            prescriptionName?: string;
            downloadUrl?: string;
            next_step?: string;
        };

        Object.entries(selectedOptions || {}).forEach(([stepKey, val]) => {
            if (!val || typeof val !== "object") return;

            // ---------------------------------
            // SEND IT LATER (SPECIAL CASE)
            // ---------------------------------
            if (stepKey === "send_it_later") {
                compact["send_it_later"] = { "": "send it later" };
                return;
            }

            // -----------------------------
            // NORMAL OPTIONS
            // -----------------------------
            if (
                stepKey !== "select_prescription" &&
                stepKey !== "upload_prescription"
            ) {
                const v = val as LensOption;
                const id = v.selectedColor?.id ?? v.id ?? "file";

                let value =
                    v.selectedColor?.name || v.title || v.name || v.value || "";

                // old logic for file upload (will be replaced below)
                if (v.uploadedFileName) value = v.uploadedFileName;

                if (value) compact[stepKey] = { [String(id)]: value };
                return;
            }

            // -----------------------------
            // SAVED PRESCRIPTION
            // -----------------------------
            if (stepKey === "select_prescription") {
                const pres = val as {
                    id?: number | string;
                    prescriptionName?: string;
                    downloadUrl?: string;
                };

                if (pres.id && pres.downloadUrl) {
                    compact["select_prescription"] = {
                        [String(pres.id)]: pres.downloadUrl,
                    };
                }
                return;
            }

            // -----------------------------
            // UPLOADED PRESCRIPTION (NEW)
            // -----------------------------
            if (stepKey === "upload_prescription") {
                const uploaded = val as {
                    id?: number | string;
                    downloadUrl?: string;
                    prescriptionName?: string;
                };

                if (uploaded.id && uploaded.downloadUrl) {
                    compact["upload_prescription"] = {
                        [String(uploaded.id)]: uploaded.downloadUrl,
                    };
                }
            }
        });

        // -----------------------------
        // SELECT LENSE ID (NEW)
        // -----------------------------
        const selectLenseId = selectedOptions?.select_lense_id?.id;

        if (selectLenseId) {
            compact["select_lense_id"] = {
                id: String(selectLenseId),
            };
        }

        return JSON.stringify(compact).replace(/"/g, "'");
    };

    return (
        <div className="px-6 sm:px-10 lg:px-20 pt-2 bg-background-grey pb-12 border-t border-border-color-light">
            <div className="py-2 flex flex-col">
                <div className="flex justify-between items-start gap-3 mb-4">
                    <Text
                        as="p"
                        size="base"
                        weight="bold"
                        color="black"
                        font="helvetica"
                        className="text-sm lg:text-base"
                    >
                        {productName}
                    </Text>
                    <Text
                        as="p"
                        size="base"
                        weight="bold"
                        color="fontMain"
                        font="helvetica"
                        className="text-sm lg:text-base"
                    >
                        {formatPrice(totalAmount)}
                    </Text>
                </div>

                {isPowerLensFlow && (
                    <div className="flex flex-col gap-2">
                        <Text
                            as={"p"}
                            className="font-helvetica font-light text-base leading-[22px] text-black flex items-center gap-2"
                        >
                            {lensLabelQty?.leftEyeLabel}
                            <Text
                                as={"span"}
                                className="font-helvetica font-light text-base leading-[22px] text-black"
                            >
                                {leftEyeQuantity} box
                            </Text>
                        </Text>
                        <Text
                            as={"p"}
                            className="font-helvetica font-light text-base leading-[22px] text-black flex items-center gap-2"
                        >
                            {lensLabelQty?.rightEyeLabel}
                            <Text
                                as={"span"}
                                className="font-helvetica font-light text-base leading-[22px] text-black"
                            >
                                {rightEyeQuantity} box
                            </Text>
                        </Text>
                    </div>
                )}
            </div>
            {!isPowerLensFlow && (
                <div className="flex justify-between lg:items-end lg:flex-row flex-col items-start">
                    <table>
                        <tbody>
                            <tr>
                                <td className="pr-4 py-2 w-[130px]">
                                    <Text
                                        as="p"
                                        size="base"
                                        weight="light"
                                        color="fontMain"
                                        font="helvetica"
                                        className="text-sm lg:text-base"
                                    >
                                        Frame color:
                                    </Text>
                                </td>
                                <td className="py-2 w-[130px]">
                                    <Text
                                        as="p"
                                        size="base"
                                        weight="light"
                                        color="fontMain"
                                        font="helvetica"
                                        className="text-sm lg:text-base"
                                    >
                                        {frameColor}
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
                                        Frame Shape:
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
                                        {frameShape}
                                    </Text>
                                </td>
                            </tr>
                            {selectedColor && (
                                <tr>
                                    <td className="pr-4 py-2 align-top">
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
                                    <td className="flex flex-col gap-2 py-2">
                                        <div
                                            className="w-8 h-8 rounded-full hidden lg:block"
                                            style={{
                                                backgroundColor:
                                                    selectedColor.color,
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
                                            {selectedColor?.name}
                                        </Text>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    {selectedColor?.recommended &&
                        selectedColor.recommended.length > 0 &&
                        currentAlias !== "review_lenses" && (
                            <div className="hidden lg:flex flex-col lg:flex-row items-center gap-2">
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
                                    {selectedColor.recommended?.map(
                                        (
                                            item: { media: string },
                                            index: number,
                                        ) => (
                                            <div
                                                key={index}
                                                className="bg-white p-2 rounded-full border border-border-color-light"
                                            >
                                                <Image
                                                    src={item.media}
                                                    alt={`lens-option-${index}`}
                                                    width={24}
                                                    height={24}
                                                    className="object-contain"
                                                />
                                            </div>
                                        ),
                                    )}
                                </div>
                            </div>
                        )}
                    <div>
                        {selectedColor &&
                            currentAlias !== "review_lenses" &&
                            (currentAlias === "color_pc" ||
                                currentStep?.alias === "color_sg") && (
                                <div className="fixed bottom-0 left-0 right-0 flex justify-center bg-[#EBEBEB] p-[14px] lg:hidden">
                                    <button
                                        className="secondary-button px-20 py-3"
                                        onClick={() => {
                                            const nextStep =
                                                selectedOptions?.color_pc
                                                    ?.next_step ||
                                                selectedOptions?.color_sg
                                                    ?.next_step ||
                                                "choice_lens";

                                            setCurrentAlias(nextStep);
                                            setCurrentSection(4);
                                        }}
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
                                </div>
                            )}
                        {selectedColor && currentAlias !== "review_lenses" && (
                            <button
                                className="secondary-button px-20 py-3 hidden lg:block"
                                onClick={() => {
                                    const nextStep =
                                        // selectedOptions?.color_pc?.next_step ??
                                        // selectedOptions?.color_sg?.next_step ??
                                        "select_prescription";

                                    setCurrentAlias(nextStep);
                                    setCurrentSection(4);
                                }}
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
                        {currentAlias === "review_lenses" && (
                            <button
                                className="secondary-button px-20 py-3 mt-4 lg:mt-0"
                                onClick={async () => {
                                    if (!handleAddToCart || isAdding) return;

                                    setIsAdding(true);
                                    try {
                                        const lense_options =
                                            buildLensOptionsString();
                                        await handleAddToCart({
                                            lense_options,
                                        });
                                        onForceClose();
                                    } catch {
                                        toast.error(
                                            "Failed to add product to cart. Please try again.",
                                        );
                                    } finally {
                                        setIsAdding(false);
                                    }
                                }}
                            >
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
            )}
            {!isPowerLensFlow && (
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
                                    onClick={() => {
                                        const nextStep =
                                            // selectedOptions?.color_pc
                                            //     ?.next_step ??
                                            // selectedOptions?.color_sg
                                            //     ?.next_step ??
                                            "select_prescription";
                                        setCurrentAlias(nextStep);
                                        setCurrentSection(4);
                                    }}
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
            )}
        </div>
    );
}
