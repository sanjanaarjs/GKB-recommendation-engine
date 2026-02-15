"use client";

import Text from "@/components/generic/Text";
import Pencil from "@/components/icons/Pencil";
import { formatPrice } from "@/lib/utils";
import { useResponsive } from "@/lib/hooks/useResponsive";
import { LensStep } from "../datas/lensFlow.api";
import { useEffect, useMemo } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_LENS_PRICE_INFO } from "../datas/getLensPriceInfo.api";

export interface SelectedOption {
    id?: number;
    title?: string;
    description?: string;
    price?: number;
    image?: string;
    next_step?: string;
    is_color?: number;
    is_logged_required?: number;
    login_title?: string;
    color?: string;
    lightOption?: string | null;

    // Extra fields for LensSection3
    selectedFinishType?: string;
    selectedColor?: {
        id: number;
        color: string;
        image: string;
        name: string;
        recommended?: {
            media: string;
        }[];
    };

    [key: string]:
        | string
        | number
        | null
        | undefined
        | {
              id: number;
              color: string;
              image: string;
              name?: string;
          };
}
interface LensSection6Props {
    readonly setCurrentAlias: (alias: string) => void;
    readonly filterLensSection6?: LensStep;
    readonly selectedOptions: Record<string, SelectedOption>;
    readonly setSelectedOptions: React.Dispatch<
        React.SetStateAction<Record<string, SelectedOption>>
    >;
}

export default function LensSection6({
    setCurrentAlias,
    filterLensSection6,
    selectedOptions,
    setSelectedOptions,
}: LensSection6Props) {
    const { isDesktop } = useResponsive();

    const [fetchLensPriceInfo, { data, loading, error }] = useLazyQuery(
        GET_LENS_PRICE_INFO,
        {
            fetchPolicy: "no-cache",
        },
    );

    const lensPriceInfo = data?.getLensPriceInfo;

    const handleEditPrescription = () => {
        setSelectedOptions((prev) => {
            const updated = { ...prev };
            delete updated.select_prescription;
            delete updated.upload_prescription;
            return updated;
        });

        setCurrentAlias("select_prescription");
    };
    const lightProtectionKey = selectedOptions["light_protection_no_power"]
        ? "light_protection_no_power"
        : "light_protection";

    const lightProtection = selectedOptions[lightProtectionKey];
    const hasValidValue = (value: unknown) => {
        if (value === null || value === undefined) return false;
        if (value === "-" || value === "") return false;
        if (typeof value === "number" && value === 0) return false;
        return true;
    };

    // color tint
    const colorOption =
        selectedOptions["color_pc"] || selectedOptions["color_sg"];

    const colorPrice = lensPriceInfo?.tint ?? 0;
    const colorName = colorOption?.selectedColor?.name;

    const shouldShowColorTint =
        !!colorOption &&
        typeof colorName === "string" &&
        colorName.trim().length > 0;

    // lens material
    const choiceLens = selectedOptions["choice_lens"];
    const choiceLensTitle = choiceLens?.title;
    // const choiceLensPrice = choiceLens?.price;
    const choiceLensPrice = lensPriceInfo?.price ?? 0;

    const shouldShowChoiceLens =
        typeof choiceLensTitle === "string" &&
        choiceLensTitle.trim().length > 0;

    const colorLabel = [colorName]
        .filter(
            (v): v is string => typeof v === "string" && v.trim().length > 0,
        )
        .join(" ");

    const lensPricePayload = useMemo(() => {
        const prescriptionType = selectedOptions["prescription_type"]?.title;
        const lightProtectionTitle = lightProtection?.title;
        const choiceLensTitle = selectedOptions["choice_lens"]?.title;

        const colorName =
            selectedOptions["color_pc"]?.selectedColor?.name ||
            selectedOptions["color_sg"]?.selectedColor?.name;

        if (!prescriptionType || !lightProtectionTitle || !choiceLensTitle) {
            return null;
        }

        return JSON.stringify({
            prescription_type: prescriptionType,
            light_protection: lightProtectionTitle,
            choice_lens: choiceLensTitle,
            ...(colorName ? { color_name: colorName } : {}),
        });
    }, [lightProtection, selectedOptions]);

    useEffect(() => {
        if (!lensPricePayload) return;

        fetchLensPriceInfo({
            variables: {
                select_lense_option: lensPricePayload,
            },
        });
    }, [lensPricePayload, fetchLensPriceInfo]);

    useEffect(() => {
        if (
            !lensPriceInfo?.price ||
            selectedOptions.choice_lens?.price === lensPriceInfo.price
        ) {
            return;
        }

        setSelectedOptions((prev) => ({
            ...prev,
            choice_lens: {
                ...prev.choice_lens,
                price: lensPriceInfo.price,
            },
        }));
    }, [lensPriceInfo?.price]);

    useEffect(() => {
        if (!lensPriceInfo?.tint) return;

        const colorKey = selectedOptions.color_pc
            ? "color_pc"
            : selectedOptions.color_sg
              ? "color_sg"
              : null;

        if (
            !colorKey ||
            selectedOptions[colorKey]?.price === lensPriceInfo.tint
        ) {
            return;
        }

        setSelectedOptions((prev) => ({
            ...prev,
            [colorKey]: {
                ...(prev[colorKey] || {}),
                price: lensPriceInfo.tint,
            },
        }));
    }, [lensPriceInfo?.tint]);

    useEffect(() => {
        if (!lensPriceInfo?.entity_id) return;

        // prevent re-setting same value
        if (selectedOptions.select_lense_id?.id === lensPriceInfo.entity_id) {
            return;
        }

        setSelectedOptions((prev) => ({
            ...prev,
            select_lense_id: {
                id: lensPriceInfo.entity_id,
            },
        }));
    }, [lensPriceInfo?.entity_id]);

    return (
        <div>
            {/* Section Title */}
            <Text
                as="p"
                size="xl5"
                weight="light"
                color="fontMain"
                font="helvetica"
                className="w-2/3 text-3xl lg:text-5xl"
            >
                {filterLensSection6?.title}
            </Text>
            <Text
                as="p"
                size="base"
                weight="light"
                color="fontMain"
                font="helvetica"
                className="py-6 w-3/4 text-sm lg:text-base"
            >
                {filterLensSection6?.description}
            </Text>

            <div className="py-6 flex flex-col gap-6">
                {/* Prescription Type */}
                {hasValidValue(selectedOptions["prescription_type"]?.title) && (
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
                                onClick={() =>
                                    setCurrentAlias("prescription_type")
                                }
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
                                {selectedOptions["prescription_type"]?.title ||
                                    "-"}
                            </Text>
                        </div>
                    </div>
                )}

                {/* Light Protection */}
                {hasValidValue(lightProtection?.title) && (
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
                                onClick={() =>
                                    setCurrentAlias(lightProtectionKey)
                                }
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
                                {lightProtection?.title || "-"}
                            </Text>
                        </div>
                    </div>
                )}

                {/* Color Tint */}
                {shouldShowColorTint && (
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
                                onClick={() =>
                                    setCurrentAlias("light_protection")
                                }
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
                                {colorLabel}
                            </Text>
                            <Text
                                as="p"
                                size="base"
                                weight="bold"
                                color="fontMain"
                                font="helvetica"
                                className="text-sm lg:text-base"
                            >
                                {formatPrice(colorPrice ?? 0)}
                            </Text>
                        </div>
                    </div>
                )}

                {/* Lens Material */}
                {shouldShowChoiceLens && (
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
                                onClick={() => setCurrentAlias("choice_lens")}
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
                                {/* <Image
                                src="/images/pdp/lens/log1.png"
                                alt="lens"
                                width={100}
                                height={14}
                                className="w-auto h-[14px]"
                            /> */}
                                <Text
                                    as="p"
                                    size="base"
                                    weight="bold"
                                    color="fontMain"
                                    font="helvetica"
                                    className="text-sm lg:text-base"
                                >
                                    {choiceLensTitle}
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
                                {formatPrice(choiceLensPrice ?? 0)}
                            </Text>
                        </div>
                    </div>
                )}
                {/* Saved Prescription */}
                {selectedOptions["select_prescription"]?.id && (
                    <div className="flex flex-col">
                        <div className="flex items-center justify-between gap-2">
                            <Text
                                as="p"
                                size="base"
                                weight="light"
                                color="fontMain"
                                font="helvetica"
                                className="py-6 w-3/4 text-sm lg:text-base"
                            >
                                Saved Prescription
                            </Text>
                            <button
                                className="flex items-center gap-2 cursor-pointer"
                                onClick={handleEditPrescription}
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
                        <div className="flex items-center justify-between gap-2">
                            <Text
                                as="p"
                                size="base"
                                weight="bold"
                                color="fontMain"
                                font="helvetica"
                                className="text-sm lg:text-base"
                            >
                                Prescription name
                            </Text>
                            <Text
                                as="p"
                                size="base"
                                weight="bold"
                                color="fontMain"
                                font="helvetica"
                                className="text-sm lg:text-base"
                            >
                                {typeof selectedOptions["select_prescription"]
                                    ?.prescriptionName === "string" ||
                                typeof selectedOptions["select_prescription"]
                                    ?.prescriptionName === "number"
                                    ? selectedOptions["select_prescription"]
                                          ?.prescriptionName
                                    : "-"}
                            </Text>
                        </div>
                    </div>
                )}
                {/* Uploaded File */}
                {selectedOptions["upload_prescription"]?.id && (
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
                                Uploaded Prescription
                            </Text>
                            <button
                                className="flex items-center gap-2 cursor-pointer"
                                onClick={handleEditPrescription}
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
                            <div className="flex items-center justify-between w-full gap-2">
                                <Text
                                    as="p"
                                    size="base"
                                    weight="bold"
                                    color="fontMain"
                                    font="helvetica"
                                    className="text-sm lg:text-base"
                                >
                                    Prescription name
                                </Text>
                                <Text
                                    as="p"
                                    size="base"
                                    weight="bold"
                                    color="fontMain"
                                    font="helvetica"
                                    className="text-sm lg:text-base"
                                >
                                    {typeof selectedOptions[
                                        "upload_prescription"
                                    ]?.prescriptionName === "string" ||
                                    typeof selectedOptions[
                                        "upload_prescription"
                                    ]?.prescriptionName === "number"
                                        ? selectedOptions["upload_prescription"]
                                              ?.prescriptionName
                                        : "-"}
                                </Text>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
