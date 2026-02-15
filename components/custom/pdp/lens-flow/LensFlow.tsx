"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import LensHeader from "./LensHeader";
import LensFooter from "./LensFooter";
import LensSection1 from "./LensSection1";
import LensSection2NoPower from "./LensSection2NoPower";
import LensSection2 from "./LensSection2";
import LensSection3 from "./LensSection3";
import LensSection4 from "./LensSection4";
import LensSection5 from "./LensSection5";
import LensSection6, { SelectedOption } from "./LensSection6";
import { cn } from "@/lib/utils";
import { GetLensResponse, LensStep } from "../datas/lensFlow.api";
import {
    ContactLensData,
    getContactLens,
} from "../datas/prescription/manualPrescription.Data.api";
import Text from "@/components/generic/Text";

// lensflow steps for progress bar
const MAIN_STEPS = [
    "prescription_type",
    "choice_lens",
    "light_protection",
    "color", // virtual step for color_pc & color_sg
    "select_prescription",
    "review_lenses",
];
const normalizeAlias = (alias: string) => {
    if (alias === "color_pc" || alias === "color_sg") return "color";
    if (alias === "light_protection_no_power") return "light_protection";
    return alias;
};

const parsePrice = (price?: string) =>
    price ? Number(price.replace(/[^\d]/g, "")) : 0;

export interface Glass {
    id: number;
    image: string;
    color: string;
    name: string;
    price?: number;
}
export interface LensFlowProps {
    openLensFlow: boolean;
    setOpenLensFlow: (open: boolean) => void;
    lensData: GetLensResponse | null | undefined;
    productName: string | undefined;
    productPrice: string;
    isPowerLensFlow?: boolean;
    rightEyeQuantity: number;
    leftEyeQuantity: number;
    handleAddToCart?: (payload?: { lense_options?: string }) => void;
}
interface Attribute {
    attribute_code: string;
    attribute_value: string;
}

export default function LensFlow({
    openLensFlow,
    setOpenLensFlow,
    lensData,
    productName,
    productPrice,
    isPowerLensFlow,
    rightEyeQuantity,
    leftEyeQuantity,
    handleAddToCart,
}: Readonly<LensFlowProps>) {
    const productType = lensData?.products?.items?.[0]?.type_of_product || null;
    const lensLabelQty = lensData?.products?.items?.[0].lensLabelQty;
    const [currentSection, setCurrentSection] = useState<number>(1);
    const [currentAlias, setCurrentAlias] =
        useState<string>("prescription_type");
    const desktopScrollRef = useRef<HTMLDivElement>(null);
    const mobileScrollRef = useRef<HTMLDivElement>(null);
    const productImage =
        lensData?.products?.items?.[0]?.lense_addition?.productImage;
    // const glasses: Glass[] = [
    //     { id: 1, image: "/images/pdp/lens/img1.png", color: "brown" },
    //     { id: 2, image: "/images/pdp/lens/img2.png", color: "green" },
    //     { id: 3, image: "/images/pdp/lens/img1.png", color: "grey" },
    //     { id: 4, image: "/images/pdp/lens/img2.png", color: "blue" },
    //     { id: 5, image: "/images/pdp/lens/img1.png", color: "yellow" },
    //     { id: 6, image: "/images/pdp/lens/img2.png", color: "red" },
    //     { id: 7, image: "/images/pdp/lens/img1.png", color: "purple" },
    //     { id: 8, image: "/images/pdp/lens/img2.png", color: "orange" },
    //     { id: 9, image: "/images/pdp/lens/img1.png", color: "pink" },
    //     { id: 10, image: "/images/pdp/lens/img2.png", color: "teal" },
    //     { id: 11, image: "/images/pdp/lens/img1.png", color: "black" },
    //     { id: 12, image: "/images/pdp/lens/img2.png", color: "white" },
    // ];
    // const [selectedGlass, setSelectedGlass] = useState<number>(1);
    // const currentGlass: Glass | undefined = useMemo(() => {
    //     return glasses.find((glass) => glass.id === selectedGlass);
    // }, [selectedGlass]);
    const [selectedGlass, setSelectedGlass] = useState<Glass | undefined>(
        undefined,
    );

    const currentGlass = selectedGlass;

    useEffect(() => {
        if (openLensFlow) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.removeProperty("overflow");
        }
        return () => {
            document.body.style.removeProperty("overflow");
        };
    }, [openLensFlow]);

    useEffect(() => {
        setTimeout(() => {
            desktopScrollRef.current?.scrollTo({
                top: 0,
                behavior: "smooth",
            });
            mobileScrollRef.current?.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        }, 100);
    }, [currentSection]);

    // get all lens info steps
    const lensSteps: LensStep[] = useMemo(() => {
        const raw =
            lensData?.products?.items?.[0]?.lense_addition?.LensInfo?.[0]
                ?.steps;

        if (Array.isArray(raw)) return raw;

        // If backend sends object instead of array
        if (raw && typeof raw === "object") {
            return Object.values(raw);
        }

        return [];
    }, [lensData]);

    // find the current section object
    const currentStep = lensSteps.find((step) => step.alias === currentAlias);
    const progress = useMemo(() => {
        const normalized = normalizeAlias(currentAlias);
        const stepIndex = MAIN_STEPS.indexOf(normalized);

        if (stepIndex === -1) return 0;

        return Math.round(((stepIndex + 1) / MAIN_STEPS.length) * 100);
    }, [currentAlias]);

    const [selectedOptions, setSelectedOptions] = useState<
        Record<string, SelectedOption>
    >({});

    const frameShape =
        lensData?.products?.items?.[0]?.attributeTobeShow?.find(
            (attr: Attribute) => attr.attribute_code === "frame_shape",
        )?.attribute_value || null;

    const frameColor =
        lensData?.products?.items?.[0]?.attributeTobeShow?.find(
            (attr: Attribute) => attr.attribute_code === "frame_color_primary",
        )?.attribute_value || null;

    const sku = lensData?.products?.items?.[0]?.sku || "";
    const [lensResponse, setLensResponse] = useState<ContactLensData[]>([]);
    useEffect(() => {
        if (openLensFlow) {
            (async () => {
                const lensResponse = await getContactLens({
                    sku,
                    spherical: "",
                    cylindrical: "",
                });
                setLensResponse(lensResponse?.getContactLens?.data || []);
            })();
        }
    }, [openLensFlow, sku]);

    // close popup and reset steps
    const [showCloseConfirm, setShowCloseConfirm] = useState(false);
    const [, setFlowPath] = useState<string[]>(["prescription_type"]);

    // backstep lensflow
    const goToStep = (nextAlias: string) => {
        setFlowPath((prev) => {
            if (prev[prev.length - 1] === nextAlias) return prev;
            return [...prev, nextAlias];
        });

        setCurrentAlias(nextAlias);
    };

    const resetLensFlow = () => {
        setSelectedOptions({});
        setFlowPath(["prescription_type"]);
        setCurrentAlias("prescription_type");
        setCurrentSection(1);
        setShowCloseConfirm(false);
    };

    const requestCloseLensFlow = () => {
        setShowCloseConfirm(true);
    };
    const closeLensFlow = () => {
        resetLensFlow();
        setOpenLensFlow(false);
    };

    const resolveAliasForNavigation = (
        alias: string,
        steps: LensStep[] | undefined,
    ) => {
        if (!Array.isArray(steps)) return "prescription_type";

        if (alias === "color") {
            return (
                steps.find((s) => s.alias === "color_pc")?.alias ||
                steps.find((s) => s.alias === "color_sg")?.alias ||
                "light_protection"
            );
        }

        if (alias === "light_protection") {
            return (
                steps.find((s) => s.alias === "light_protection_no_power")
                    ?.alias || "light_protection"
            );
        }

        return alias;
    };

    // calculate the amount in review lens section
    const calculateLensTotal = (
        selectedOptions: Record<string, SelectedOption>,
    ) => {
        let total = 0;

        Object.entries(selectedOptions).forEach(([key, option]) => {
            if (!option) return;

            const price =
                typeof option.price === "number"
                    ? option.price
                    : Number(option.price);

            if (!Number.isNaN(price)) {
                console.log("adding", key, price);
                total += price;
            }
        });

        return total;
    };

    const totalAmount = useMemo(() => {
        return parsePrice(productPrice) + calculateLensTotal(selectedOptions);
    }, [selectedOptions, productPrice]);

    // remove it later

    console.log("Base price:", parsePrice(productPrice));
    console.log("Lens total:", calculateLensTotal(selectedOptions));
    console.log("Grand total:", totalAmount);

    return (
        <div
            className={cn(
                "fixed top-0 w-full bottom-0 z-50 bg-background-grey overflow-y-auto flex flex-col transition-all duration-500",
                openLensFlow ? "left-0 opacity-100" : "left-full opacity-0",
            )}
            data-lenis-prevent
        >
            <LensHeader
                progress={progress}
                onClose={requestCloseLensFlow}
                currentAlias={currentAlias}
                setCurrentAlias={setCurrentAlias}
                lensSteps={lensSteps}
                mainSteps={MAIN_STEPS}
                normalizeAlias={normalizeAlias}
                isPowerLensFlow={isPowerLensFlow}
                // resolveAliasForNavigation={resolveAliasForNavigation}
                setFlowPath={setFlowPath}
            />

            <div
                ref={mobileScrollRef}
                className={`flex-1 md:h-[calc(100vh-114px)] flex flex-col md:overflow-y-hidden ${currentSection === 3 || currentSection === 6 ? "pb-20 md:pb-0" : ""}`}
            >
                <div className="flex-1 flex flex-col md:flex-row md:overflow-y-auto md:h-[100vh]">
                    <div className="w-full flex-1 lg:relative fixed md:static top-[56px] md:top-0 bg-white">
                        <div className="px-6 lg:px-12 relative min-h-52 max-h-52 md:max-h-full h-[80%]">
                            {!isPowerLensFlow && currentGlass?.image ? (
                                <Image
                                    src={currentGlass?.image}
                                    alt="glass"
                                    fill
                                    className="object-contain"
                                />
                            ) : productImage ? (
                                <Image
                                    src={productImage}
                                    alt="glass"
                                    fill
                                    className="object-cover"
                                />
                            ) : null}
                        </div>
                        {currentStep?.alias !== "color_pc" &&
                            currentStep?.alias !== "color_sg" &&
                            currentStep?.alias !== "review_lenses" && (
                                <div className="hidden md:block">
                                    <LensFooter
                                        currentGlass={currentGlass}
                                        currentSection={currentSection}
                                        setCurrentSection={setCurrentSection}
                                        frameShape={frameShape}
                                        frameColor={frameColor}
                                        setCurrentAlias={setCurrentAlias}
                                        productName={productName}
                                        productPrice={productPrice}
                                        lensLabelQty={lensLabelQty}
                                        isPowerLensFlow={isPowerLensFlow}
                                        rightEyeQuantity={rightEyeQuantity}
                                        leftEyeQuantity={leftEyeQuantity}
                                        onClose={requestCloseLensFlow}
                                        onForceClose={closeLensFlow}
                                        totalAmount={totalAmount}
                                    />
                                </div>
                            )}
                    </div>
                    <div
                        ref={desktopScrollRef}
                        className="flex-1 px-6 lg:px-12 py-6 md:overflow-y-auto h-[120vh] lg:h-auto no-scrollbar mt-[250px] lg:mt-0"
                    >
                        {currentStep &&
                            (() => {
                                // If type_of_product is "contact_lens", show only LensSection5
                                if (productType === "contact_lens") {
                                    if (
                                        currentStep.alias ===
                                        "select_prescription"
                                    ) {
                                        return (
                                            <LensSection5
                                                // setCurrentAlias={
                                                //     setCurrentAlias
                                                // }
                                                filterLensSection5={currentStep}
                                                setSelectedOptions={
                                                    setSelectedOptions
                                                }
                                                selectedOptions={
                                                    selectedOptions
                                                }
                                                isPowerLensFlow={
                                                    isPowerLensFlow
                                                }
                                                lensResponse={lensResponse}
                                                sku={
                                                    lensData?.products
                                                        ?.items?.[0]?.sku
                                                }
                                                handleAddToCart={
                                                    handleAddToCart
                                                }
                                                goToStep={goToStep}
                                                onForceClose={closeLensFlow}
                                                rightEyeQuantity={
                                                    rightEyeQuantity
                                                }
                                                leftEyeQuantity={
                                                    leftEyeQuantity
                                                }
                                            />
                                        );
                                    } else {
                                        // force to show select_prescription step only
                                        const selectPrescriptionStep =
                                            lensSteps.find(
                                                (s) =>
                                                    s.alias ===
                                                    "select_prescription",
                                            );
                                        if (selectPrescriptionStep) {
                                            const sku =
                                                lensData?.products?.items?.[0]
                                                    ?.sku;

                                            if (!sku) {
                                                // You can show a loader or skip rendering entirely
                                                return (
                                                    <div>
                                                        Loading prescription
                                                        data...
                                                    </div>
                                                );
                                            }

                                            return (
                                                <LensSection5
                                                    // setCurrentAlias={
                                                    //     setCurrentAlias
                                                    // }
                                                    filterLensSection5={
                                                        selectPrescriptionStep
                                                    }
                                                    setSelectedOptions={
                                                        setSelectedOptions
                                                    }
                                                    selectedOptions={
                                                        selectedOptions
                                                    }
                                                    isPowerLensFlow={
                                                        isPowerLensFlow
                                                    }
                                                    lensResponse={lensResponse}
                                                    sku={sku}
                                                    handleAddToCart={
                                                        handleAddToCart
                                                    }
                                                    goToStep={goToStep}
                                                    onForceClose={closeLensFlow}
                                                    rightEyeQuantity={
                                                        rightEyeQuantity
                                                    }
                                                    leftEyeQuantity={
                                                        leftEyeQuantity
                                                    }
                                                />
                                            );
                                        }
                                        return null;
                                    }
                                }
                                switch (currentStep.alias) {
                                    case "prescription_type":
                                        return (
                                            <LensSection1
                                                // setCurrentAlias={
                                                //     setCurrentAlias
                                                // }
                                                goToStep={goToStep}
                                                filterLensSection1={currentStep}
                                                setSelectedOptions={
                                                    setSelectedOptions
                                                }
                                            />
                                        );
                                    case "choice_lens":
                                        return (
                                            <LensSection4
                                                // setCurrentAlias={
                                                //     setCurrentAlias
                                                // }
                                                filterLensSection4={currentStep}
                                                setSelectedOptions={
                                                    setSelectedOptions
                                                }
                                                goToStep={goToStep}
                                            />
                                        );

                                    case "light_protection_no_power":
                                        return (
                                            <LensSection2NoPower
                                                // setCurrentAlias={
                                                //     setCurrentAlias
                                                // }
                                                filterLensSection2NoPower={
                                                    currentStep
                                                }
                                                setSelectedOptions={
                                                    setSelectedOptions
                                                }
                                                selectedOptions={
                                                    selectedOptions
                                                }
                                                goToStep={goToStep}
                                            />
                                        );
                                    case "light_protection":
                                        return (
                                            <LensSection2
                                                // setCurrentAlias={
                                                //     setCurrentAlias
                                                // }
                                                filterLensSection2={currentStep}
                                                setSelectedOptions={
                                                    setSelectedOptions
                                                }
                                                selectedOptions={
                                                    selectedOptions
                                                }
                                                goToStep={goToStep}
                                            />
                                        );

                                    case "color_pc":
                                    case "color_sg":
                                        return (
                                            <LensSection3
                                                selectedGlass={currentGlass}
                                                setSelectedGlass={
                                                    setSelectedGlass
                                                }
                                                filterLensSection3={currentStep}
                                                setSelectedOptions={
                                                    setSelectedOptions
                                                }
                                            />
                                        );

                                    case "select_prescription":
                                        return (
                                            <LensSection5
                                                // setCurrentAlias={
                                                //     setCurrentAlias
                                                // }
                                                filterLensSection5={currentStep}
                                                setSelectedOptions={
                                                    setSelectedOptions
                                                }
                                                selectedOptions={
                                                    selectedOptions
                                                }
                                                isPowerLensFlow={
                                                    isPowerLensFlow
                                                }
                                                lensResponse={lensResponse}
                                                goToStep={goToStep}
                                                onForceClose={closeLensFlow}
                                                rightEyeQuantity={
                                                    rightEyeQuantity
                                                }
                                                leftEyeQuantity={
                                                    leftEyeQuantity
                                                }
                                            />
                                        );

                                    case "review_lenses":
                                        return (
                                            <LensSection6
                                                setCurrentAlias={
                                                    setCurrentAlias
                                                }
                                                filterLensSection6={currentStep}
                                                selectedOptions={
                                                    selectedOptions
                                                }
                                                setSelectedOptions={
                                                    setSelectedOptions
                                                }
                                            />
                                        );

                                    default:
                                        return (
                                            <LensSection1
                                                // setCurrentAlias={
                                                //     setCurrentAlias
                                                // }
                                                filterLensSection1={currentStep}
                                                setSelectedOptions={
                                                    setSelectedOptions
                                                }
                                                goToStep={goToStep}
                                            />
                                        );
                                }
                            })()}
                        <div className="md:hidden">
                            <LensFooter
                                currentGlass={currentGlass}
                                currentSection={currentSection}
                                setCurrentSection={setCurrentSection}
                                selectedOptions={selectedOptions}
                                frameShape={frameShape}
                                frameColor={frameColor}
                                setCurrentAlias={setCurrentAlias}
                                productName={productName}
                                productPrice={productPrice}
                                currentAlias={currentAlias}
                                handleAddToCart={(payload) =>
                                    handleAddToCart?.(payload)
                                }
                                onClose={requestCloseLensFlow}
                                onForceClose={closeLensFlow}
                                currentStep={currentStep}
                                totalAmount={totalAmount}
                            />
                        </div>
                    </div>
                </div>

                {(currentStep?.alias === "color_pc" ||
                    currentStep?.alias === "color_sg" ||
                    currentStep?.alias === "review_lenses") && (
                    <div className="hidden md:block">
                        <LensFooter
                            currentGlass={currentGlass}
                            currentSection={currentSection}
                            setCurrentSection={setCurrentSection}
                            selectedOptions={selectedOptions}
                            frameShape={frameShape}
                            frameColor={frameColor}
                            setCurrentAlias={setCurrentAlias}
                            productName={productName}
                            productPrice={productPrice}
                            currentAlias={currentAlias}
                            handleAddToCart={(payload) =>
                                handleAddToCart?.(payload)
                            }
                            onClose={requestCloseLensFlow}
                            onForceClose={closeLensFlow}
                            totalAmount={totalAmount}
                        />
                    </div>
                )}
            </div>
            {showCloseConfirm && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40">
                    <div className="bg-white rounded-none p-6 w-[90%] max-w-md flex flex-col">
                        <Text
                            as="p"
                            size="lg"
                            weight="bold"
                            color="black"
                            font="helvetica"
                            className="mb-4 leading-[24px]"
                        >
                            Are you sure you want to exit?
                        </Text>

                        <Text
                            as="p"
                            size="lg"
                            weight="light"
                            color="fontMain"
                            font="helvetica"
                            className="mb-6"
                        >
                            Your lens selections will not be saved
                        </Text>

                        <div className="flex justify-end gap-4">
                            <button
                                className="px-4 py-1 text-sm font-bold bg-black text-white rounded-none font-helvetica cursor-pointer hover:opacity-80 transition-all"
                                onClick={closeLensFlow}
                            >
                                Exit
                            </button>
                            <button
                                className="px-4 py-1 text-sm font-bold text-black border-black border font-helvetica cursor-pointer hover:opacity-80 transition-all"
                                onClick={() => setShowCloseConfirm(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
