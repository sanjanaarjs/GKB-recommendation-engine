"use client";

import Text from "@/components/generic/Text";
import ChevronRight from "@/components/icons/ChevronRight";
import Link from "next/link";
import { useResponsive } from "@/lib/hooks/useResponsive";
import { LensStep } from "../datas/lensFlow.api";
import { SelectedOption } from "./LensSection6";
import FileUpload, { FileUploadRef } from "./FileUpload";
import Login from "../../header/login/login";
import { useEffect, useRef, useState } from "react";
import {
    GET_SAVED_PRESCRIPTION,
    GetSavedPrescriptionResponse,
} from "../datas/prescription/savedPrescription.Data.api";
import { useLazyQuery } from "@apollo/client";
import { getCookieValue } from "@/lib/cookie";
import {
    ContactLensData,
    GET_CONTACT_LENS,
} from "../datas/prescription/manualPrescription.Data.api";

interface LensSection5Props {
    // readonly setCurrentAlias: (alias: string) => void;
    readonly filterLensSection5?: LensStep;
    readonly setSelectedOptions: React.Dispatch<
        React.SetStateAction<Record<string, SelectedOption>>
    >;
    readonly isPowerLensFlow?: boolean;
    readonly lensResponse: ContactLensData[];
    sku?: string;
    handleAddToCart?: (payload?: {
        lense_options?: string;
        selected_contact_lens?: string;
    }) => void;
    readonly selectedOptions: Record<string, SelectedOption>;
    readonly goToStep: (nextAlias: string) => void;
    readonly onForceClose: () => void;
    readonly rightEyeQuantity: number;
    readonly leftEyeQuantity: number;
}

type ActiveSection = "saved" | "upload" | null;

export default function LensSection5({
    // setCurrentAlias,
    filterLensSection5,
    setSelectedOptions,
    selectedOptions,
    isPowerLensFlow,
    lensResponse,
    sku,
    handleAddToCart,
    goToStep,
    onForceClose,
    rightEyeQuantity,
    leftEyeQuantity,
}: Readonly<LensSection5Props>) {
    const { isDesktop } = useResponsive();
    const [isLoginPopup, setIsLoginPopup] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const [authToken, setAuthToken] = useState<string | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const fileUploadRef = useRef<FileUploadRef>(null);
    const selectPrescription = filterLensSection5?.steps_options?.[0];
    const uploadPrescription = filterLensSection5?.steps_options?.[1];
    const sendLater = filterLensSection5?.steps_options?.[2];
    const [proceeding, setProceeding] = useState(false);

    const [activeSection, setActiveSection] = useState<ActiveSection>(null);
    const isRightEyeDisabled = rightEyeQuantity === 0;
    const isLeftEyeDisabled = leftEyeQuantity === 0;

    // Saved Prescription fetching
    const [getPrescriptions, { data, loading }] =
        useLazyQuery<GetSavedPrescriptionResponse>(GET_SAVED_PRESCRIPTION, {
            fetchPolicy: "network-only",
        });

    const savedPrescriptionList = data?.getMyPrescriptions?.data || [];

    const [selectedPrescription, setSelectedPrescription] = useState<null | {
        id: number;
        prescriptionName: string;
        downloadUrl?: string;
    }>(null);

    // Decode token and fetch prescriptions
    useEffect(() => {
        (async () => {
            const token = await getCookieValue("userToken");

            if (token) {
                const decodedToken = (() => {
                    try {
                        return atob(token);
                    } catch {
                        return token;
                    }
                })();

                setAuthToken(decodedToken);
                setIsLoggedIn(true);

                // Fetch prescriptions instantly
                await getPrescriptions({
                    context: {
                        headers: {
                            Authorization: `Bearer ${decodedToken}`,
                        },
                    },
                });
            } else {
                setAuthToken(null);
                setIsLoggedIn(false);
            }
        })();
    }, [getPrescriptions]);

    // Re-run after login
    useEffect(() => {
        if (!isLoginPopup) {
            (async () => {
                const token = await getCookieValue("userToken");
                if (token && token !== authToken) {
                    const decodedToken = (() => {
                        try {
                            return atob(token);
                        } catch {
                            return token;
                        }
                    })();

                    setAuthToken(decodedToken);
                    setIsLoggedIn(true);

                    await getPrescriptions({
                        context: {
                            headers: {
                                Authorization: `Bearer ${decodedToken}`,
                            },
                        },
                    });
                }
            })();
        }
    }, [isLoginPopup, getPrescriptions, authToken]);

    const [rightEye, setRightEye] = useState({
        spherical: "",
        cylindrical: "",
        axis: "",
        selectedLensId: null as number | null,
        lensData: [] as ContactLensData[],
        cylindricalOptions: [] as string[],
        axisOptions: [] as string[],
    });

    const [leftEye, setLeftEye] = useState({
        spherical: "",
        cylindrical: "",
        axis: "",
        selectedLensId: null as number | null,
        lensData: [] as ContactLensData[],
        cylindricalOptions: [] as string[],
        axisOptions: [] as string[],
    });

    // Reset right eye when quantity is 0
    useEffect(() => {
        if (rightEyeQuantity === 0) {
            setRightEye({
                spherical: "",
                cylindrical: "",
                axis: "",
                selectedLensId: null,
                lensData: [],
                cylindricalOptions: [],
                axisOptions: [],
            });
        }
    }, [rightEyeQuantity]);

    // Reset left eye when quantity is 0
    useEffect(() => {
        if (leftEyeQuantity === 0) {
            setLeftEye({
                spherical: "",
                cylindrical: "",
                axis: "",
                selectedLensId: null,
                lensData: [],
                cylindricalOptions: [],
                axisOptions: [],
            });
        }
    }, [leftEyeQuantity]);

    const [getContactLensRight] = useLazyQuery(GET_CONTACT_LENS, {
        fetchPolicy: "no-cache",
        onCompleted: (data) => {
            if (!data?.getContactLens?.data) return;
            handleRightLensResponse(data.getContactLens.data);
        },
    });

    const [getContactLensLeft] = useLazyQuery(GET_CONTACT_LENS, {
        fetchPolicy: "no-cache",
        onCompleted: (data) => {
            if (!data?.getContactLens?.data) return;
            handleLeftLensResponse(data.getContactLens.data);
        },
    });

    const handleSphericalChange = (
        eye: "right" | "left",
        spherical: string,
    ) => {
        if (!sku) return;

        if (eye === "right") {
            setRightEye((prev) => ({
                ...prev,
                spherical,
                cylindrical: "",
                axis: "",
                cylindricalOptions: [],
                axisOptions: [],
            }));
            getContactLensRight({ variables: { sku, spherical } });
        } else {
            setLeftEye((prev) => ({
                ...prev,
                spherical,
                cylindrical: "",
                axis: "",
                cylindricalOptions: [],
                axisOptions: [],
            }));
            getContactLensLeft({ variables: { sku, spherical } });
        }
    };

    const handleCylindricalChange = (
        eye: "right" | "left",
        cylindrical: string,
    ) => {
        if (!sku) return;

        if (eye === "right") {
            setRightEye((prev) => ({
                ...prev,
                cylindrical,
                axis: "",
                axisOptions: [],
            }));
            getContactLensRight({
                variables: { sku, spherical: rightEye.spherical, cylindrical },
            });
        } else {
            setLeftEye((prev) => ({
                ...prev,
                cylindrical,
                axis: "",
                axisOptions: [],
            }));
            getContactLensLeft({
                variables: { sku, spherical: leftEye.spherical, cylindrical },
            });
        }
    };

    const handleRightLensResponse = (lensData: ContactLensData[]) => {
        if (!lensData?.length) return;

        setRightEye((prev) => ({
            ...prev,
            lensData, // STORE FULL RESPONSE
            cylindricalOptions: [
                ...new Set(lensData.map((i) => i.cylindrical)),
            ].map(String),
            axisOptions: prev.cylindrical
                ? lensData
                      .filter((i) => String(i.cylindrical) === prev.cylindrical)
                      .map((i) => String(i.axis))
                : [],
        }));
    };

    const handleLeftLensResponse = (lensData: ContactLensData[]) => {
        if (!lensData?.length) {
            return;
        }
        setLeftEye((prev) => ({
            ...prev,
            lensData, // STORE FULL RESPONSE
            cylindricalOptions: [
                ...new Set(lensData.map((i) => i.cylindrical)),
            ].map(String),
            axisOptions: prev.cylindrical
                ? lensData
                      .filter((i) => String(i.cylindrical) === prev.cylindrical)
                      .map((i) => String(i.axis))
                : [],
        }));
    };

    const safeRightQty = Math.max(0, rightEyeQuantity);
    const safeLeftQty = Math.max(0, leftEyeQuantity);

    const hasAnyQuantity = rightEyeQuantity > 0 || leftEyeQuantity > 0;

    // proceed btn enabled or disbled logic - manual prescription
    const canProceed =
        hasAnyQuantity &&
        (isRightEyeDisabled || rightEye.selectedLensId) &&
        (isLeftEyeDisabled || leftEye.selectedLensId);

    const handleProceedToCart = async () => {
        setProceeding(true);

        try {
            // MANUAL IS MANDATORY
            if (!canProceed) {
                setUploadError("Please complete manual prescription details.");
                return;
            }

            // 1. Start with manual
            const selectedContactLensPayload: Record<string, any> = {
                manual: {
                    right: safeRightQty > 0 ? rightEye.selectedLensId : 0,
                    rqty: safeRightQty,
                    left: safeLeftQty > 0 ? leftEye.selectedLensId : 0,
                    lqty: safeLeftQty,
                },
            };

            // 2. OPTIONAL: saved prescription
            if (selectedOptions.saved_prescription?.id) {
                const presc = selectedOptions.saved_prescription;
                selectedContactLensPayload.select_prescription = {
                    [String(presc.id)]: presc.downloadUrl,
                };
            }

            // 3. OPTIONAL: uploaded prescription
            if (selectedOptions.upload_prescription?.id) {
                const presc = selectedOptions.upload_prescription;
                selectedContactLensPayload.upload_prescription = {
                    [String(presc.id)]: presc.downloadUrl,
                };
            }

            // 4. SINGLE API CALL
            await handleAddToCart?.({
                selected_contact_lens: JSON.stringify(
                    selectedContactLensPayload,
                ),
            });

            onForceClose();
        } catch (err) {
            console.error("Add to cart failed:", err);
        } finally {
            setProceeding(false);
        }
    };

    const handleClearSavedPrescription = () => {
        setSelectedPrescription(null);
        setActiveSection(null);

        setSelectedOptions((prev) => {
            const updated = { ...prev };
            delete updated.select_prescription;
            delete updated.saved_prescription;
            return updated;
        });
    };

    return (
        <div>
            {/* Section Heading */}
            <Text
                as="p"
                size="xl5"
                weight="light"
                color="fontMain"
                font="helvetica"
                className="w-3/4 text-3xl lg:text-5xl"
            >
                {filterLensSection5?.title}
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
                {filterLensSection5?.description}
            </Text>

            {/* Step Options */}
            <div className="flex flex-col gap-4">
                {/* --- Select from saved prescriptions --- */}
                <div
                    className={`p-4 lg:p-6 bg-white rounded-lg flex flex-col gap-3 
        border border-transparent hover:border-primary-500 transition-all duration-300
        ${activeSection === "upload" ? "opacity-50 pointer-events-none" : ""}
    `}
                >
                    <Text
                        as="p"
                        size="base"
                        weight="bold"
                        className="text-sm lg:text-base font-helvetica"
                    >
                        {selectPrescription?.title}
                    </Text>

                    {!isLoggedIn ? (
                        <div
                            className="pt-2 flex flex-col gap-2 cursor-pointer"
                            onClick={() => setIsLoginPopup(true)}
                        >
                            <Text className="text-sm lg:text-base font-helvetica text-fontMain">
                                {selectPrescription?.description}
                            </Text>
                            <div className="flex items-center gap-2 pt-1">
                                <Text
                                    as="p"
                                    size="base"
                                    weight="bold"
                                    className="text-sm lg:text-base font-helvetica"
                                >
                                    Login
                                </Text>
                                <Text className="text-sm lg:text-base font-helvetica text-fontMain">
                                    {selectPrescription?.login_title}
                                </Text>
                                <ChevronRight
                                    size={!isDesktop ? 10 : 16}
                                    fill="black"
                                />
                            </div>
                        </div>
                    ) : loading ? (
                        <Text className="text-sm font-helvetica text-fontMain">
                            Loading prescriptions...
                        </Text>
                    ) : savedPrescriptionList.length > 0 ? (
                        <div className="flex flex-col gap-3">
                            {/* Normal lens flow */}
                            {!isPowerLensFlow &&
                                savedPrescriptionList.map((prescription) => {
                                    const prescId = Number(prescription.id);
                                    const isSelected =
                                        selectedPrescription?.id === prescId;
                                    const radioId = `prescription-${prescription.id}`;

                                    return (
                                        <div
                                            key={prescription.id}
                                            className="border border-gray-200 p-4 rounded-md flex items-center justify-between bg-white"
                                        >
                                            <div className="flex items-start gap-3 w-full">
                                                <input
                                                    id={radioId}
                                                    type="radio"
                                                    name="savedPrescription"
                                                    className="mt-[5px] cursor-pointer accent-black"
                                                    checked={isSelected}
                                                    onChange={() => {
                                                        setSelectedPrescription(
                                                            {
                                                                id: prescId,
                                                                prescriptionName:
                                                                    prescription.prescriptionName,
                                                                downloadUrl:
                                                                    prescription.downloadUrl,
                                                            },
                                                        );
                                                        setActiveSection(
                                                            "saved",
                                                        );
                                                    }}
                                                />

                                                <label
                                                    htmlFor={radioId}
                                                    className="flex flex-col cursor-pointer w-full"
                                                >
                                                    <Text
                                                        as="p"
                                                        size="base"
                                                        weight="bold"
                                                        color="black"
                                                        className="font-helvetica"
                                                    >
                                                        {
                                                            prescription.prescriptionName
                                                        }
                                                    </Text>

                                                    <Text
                                                        as="p"
                                                        size="sm"
                                                        weight="light"
                                                        color="fontMain"
                                                        className="font-helvetica"
                                                    >
                                                        {
                                                            prescription.prescriptionType
                                                        }
                                                    </Text>
                                                </label>
                                            </div>
                                            {prescription.downloadUrl && (
                                                <Link
                                                    href={
                                                        prescription.downloadUrl
                                                    }
                                                    target="_blank"
                                                    className="text-primary-600 text-sm hover:underline font-helvetica"
                                                    download
                                                >
                                                    View
                                                </Link>
                                            )}
                                        </div>
                                    );
                                })}

                            {/* Normal flow Proceed button */}
                            {!isPowerLensFlow && (
                                <div className="flex items-center gap-3 mt-2">
                                    <button
                                        className={`py-2 px-4 rounded-0 text-sm font-helvetica font-bold ${
                                            selectedPrescription
                                                ? "bg-black text-white cursor-pointer"
                                                : "bg-gray-400 cursor-not-allowed text-white"
                                        }`}
                                        disabled={!selectedPrescription}
                                        onClick={() => {
                                            if (!selectedPrescription) return;

                                            setSelectedOptions((prev) => ({
                                                ...prev,
                                                select_prescription: {
                                                    id: selectedPrescription.id,
                                                    prescriptionName:
                                                        selectedPrescription.prescriptionName,
                                                    downloadUrl:
                                                        selectedPrescription.downloadUrl,
                                                    next_step: "review_lenses",
                                                },
                                            }));

                                            goToStep("review_lenses");
                                        }}
                                    >
                                        Proceed
                                    </button>

                                    {selectedPrescription && (
                                        <button
                                            type="button"
                                            onClick={
                                                handleClearSavedPrescription
                                            }
                                            className="py-2 px-4 rounded-0 text-sm font-helvetica font-bold border border-black text-black hover:bg-black hover:text-white transition"
                                        >
                                            Clear
                                        </button>
                                    )}
                                </div>
                            )}

                            {/* Power lens flow */}
                            {isPowerLensFlow &&
                                savedPrescriptionList.map((prescription) => {
                                    const prescId = Number(prescription.id);
                                    const isSelected =
                                        selectedPrescription?.id === prescId;
                                    const radioId = `prescription-${prescription.id}`;

                                    return (
                                        <div
                                            key={prescription.id}
                                            className="border border-gray-200 p-4 rounded-md flex items-center justify-between bg-white"
                                        >
                                            <div className="flex items-start gap-3 w-full">
                                                <input
                                                    id={radioId}
                                                    type="radio"
                                                    checked={isSelected}
                                                    className="mt-[5px] cursor-pointer accent-black"
                                                    name="savedPrescription"
                                                    onChange={() => {
                                                        const presc = {
                                                            id: prescId,
                                                            prescriptionName:
                                                                prescription.prescriptionName,
                                                            downloadUrl:
                                                                prescription.downloadUrl,
                                                        };

                                                        setSelectedPrescription(
                                                            presc,
                                                        );
                                                        setSelectedOptions(
                                                            (prev) => ({
                                                                ...prev,
                                                                saved_prescription:
                                                                    presc,
                                                            }),
                                                        );
                                                    }}
                                                />
                                                <label
                                                    htmlFor={radioId}
                                                    className="flex flex-col cursor-pointer w-full"
                                                >
                                                    <Text
                                                        as="p"
                                                        size="base"
                                                        weight="bold"
                                                        color="black"
                                                        className="font-helvetica"
                                                    >
                                                        {
                                                            prescription.prescriptionName
                                                        }
                                                    </Text>

                                                    <Text
                                                        as="p"
                                                        size="sm"
                                                        weight="light"
                                                        color="fontMain"
                                                        className="font-helvetica"
                                                    >
                                                        {
                                                            prescription.prescriptionType
                                                        }
                                                    </Text>
                                                </label>
                                            </div>
                                            {prescription.downloadUrl && (
                                                <Link
                                                    href={
                                                        prescription.downloadUrl
                                                    }
                                                    target="_blank"
                                                    className="text-primary-600 text-sm hover:underline font-helvetica"
                                                    download
                                                >
                                                    View
                                                </Link>
                                            )}
                                        </div>
                                    );
                                })}
                            {isPowerLensFlow && selectedPrescription && (
                                <div className="flex justify-end mt-3">
                                    <button
                                        type="button"
                                        onClick={handleClearSavedPrescription}
                                        className="text-sm font-helvetica font-bold text-black border border-black px-4 py-2 hover:bg-black hover:text-white transition"
                                    >
                                        Clear
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Text
                            as="p"
                            size="sm"
                            weight="light"
                            color="fontMain"
                            font="helvetica"
                        >
                            No saved prescriptions found.
                        </Text>
                    )}
                </div>

                {/* --- Upload prescription --- */}
                <div
                    className={`p-4 lg:p-6 bg-white rounded-lg flex flex-col gap-3 
        border border-transparent hover:border-primary-500 transition-all duration-300
        ${activeSection === "saved" ? "opacity-50 pointer-events-none" : ""}
    `}
                >
                    <Text
                        as="p"
                        size="base"
                        weight="bold"
                        color="black"
                        font="helvetica"
                        className="text-sm lg:text-base"
                    >
                        {uploadPrescription?.title}
                    </Text>

                    <Text
                        as="p"
                        size="base"
                        weight="light"
                        color="fontMain"
                        font="helvetica"
                        className="text-left text-xs sm:text-sm lg:text-base"
                    >
                        {uploadPrescription?.description}
                    </Text>

                    <div className="w-full flex flex-col gap-2">
                        <div className="flex flex-col gap-2">
                            <FileUpload
                                ref={fileUploadRef}
                                prescriptionType={
                                    selectedOptions["prescription_type"]?.title
                                }
                                initialValue={{
                                    prescriptionName:
                                        typeof selectedOptions
                                            .upload_prescription
                                            ?.prescriptionName === "string"
                                            ? selectedOptions
                                                  .upload_prescription
                                                  .prescriptionName
                                            : "",
                                }}
                                onValidUpload={(uploaded) => {
                                    setSelectedOptions((prev) => ({
                                        ...prev,
                                        upload_prescription: {
                                            id: uploaded.id,
                                            prescriptionName:
                                                uploaded.prescriptionName,
                                            downloadUrl: uploaded.downloadUrl,
                                            next_step: "review_lenses",
                                        },
                                    }));
                                    setActiveSection("upload");
                                    setUploadError(null);
                                }}
                            />
                            {!isPowerLensFlow && (
                                <button
                                    className="bg-black font-helvetica font-semibold hover:bg-primary-600 text-white text-sm py-2 px-4 rounded-xs transition w-fit cursor-pointer"
                                    onClick={() => {
                                        const uploaded =
                                            selectedOptions.upload_prescription;

                                        if (
                                            !uploaded?.id ||
                                            !uploaded?.downloadUrl
                                        ) {
                                            setUploadError(
                                                "Please upload an image before continuing.",
                                            );
                                            return;
                                        }

                                        setUploadError(null);
                                        goToStep("review_lenses");
                                    }}
                                >
                                    Proceed
                                </button>
                            )}
                        </div>

                        {uploadError && (
                            <Text
                                as="p"
                                className="text-xs text-red-600 font-helvetica text-left mt-1"
                            >
                                {uploadError}
                            </Text>
                        )}
                    </div>
                </div>

                {/* --- Send it later --- */}
                {!isPowerLensFlow && (
                    <div
                        className="p-4 lg:p-6 bg-white rounded-lg flex flex-col gap-3 border border-transparent hover:border-primary-500 transition-all duration-300 cursor-pointer"
                        onClick={() => {
                            setSelectedOptions((prev) => ({
                                ...prev,
                                send_it_later: {
                                    title: "send it later",
                                    next_step: "review_lenses",
                                },
                            }));

                            goToStep("review_lenses");
                        }}
                    >
                        <Text
                            as="p"
                            size="base"
                            weight="bold"
                            color="black"
                            font="helvetica"
                            className="text-sm lg:text-base"
                        >
                            {sendLater?.title}
                        </Text>
                        <Text
                            as="p"
                            size="base"
                            weight="light"
                            color="fontMain"
                            font="helvetica"
                            className="text-xs sm:text-sm lg:text-base"
                        >
                            {sendLater?.description}
                        </Text>
                    </div>
                )}

                {/* --- Send it later hidden --- */}

                {isPowerLensFlow && (
                    <div
                        className="p-4 lg:p-6 bg-white rounded-lg flex-col gap-3 border border-transparent hover:border-primary-500 transition-all duration-300 hidden"
                        onClick={() => {
                            setSelectedOptions((prev) => ({
                                ...prev,
                                send_it_later: {
                                    title: "send it later",
                                    next_step: "review_lenses",
                                },
                            }));

                            goToStep("review_lenses");
                        }}
                    >
                        <Text
                            as="p"
                            size="base"
                            weight="bold"
                            color="black"
                            font="helvetica"
                            className="text-sm lg:text-base"
                        >
                            {sendLater?.title}
                        </Text>
                        <Text
                            as="p"
                            size="base"
                            weight="light"
                            color="fontMain"
                            font="helvetica"
                            className="text-xs sm:text-sm lg:text-base"
                        >
                            {sendLater?.description}
                        </Text>
                    </div>
                )}

                {/* --- Enter prescription manually --- */}
                {isPowerLensFlow && (
                    <div className="flex flex-col gap-2 bg-white rounded-lg p-4 lg:p-6 border border-transparent hover:border-primary-500 transition-all duration-300">
                        <Text
                            as="p"
                            size="base"
                            weight="bold"
                            color="black"
                            font="helvetica"
                            className="text-sm lg:text-base text-left"
                        >
                            Enter prescription manually
                        </Text>

                        <Text
                            as="p"
                            size="base"
                            weight="light"
                            color="fontMain"
                            font="helvetica"
                            className="text-left text-xs sm:text-sm lg:text-base"
                        >
                            Add your prescription values. Please use a valid
                            prescription issued by a licensed optometrist or
                            ophthalmologist.
                        </Text>

                        <div className="mt-4">
                            <div className="flex flex-col gap-4 items-center">
                                <div className="grid grid-cols-[0.5fr_1fr_1fr] items-center w-full">
                                    <div></div>
                                    <Text
                                        as="p"
                                        size="base"
                                        weight="light"
                                        className="text-xs lg:text-sm text-center font-helvetica text-font-main"
                                    >
                                        Right eye (OD)
                                    </Text>
                                    <Text
                                        as="p"
                                        size="base"
                                        weight="light"
                                        className="text-xs lg:text-sm text-center font-helvetica text-font-main"
                                    >
                                        Left eye (OS)
                                    </Text>
                                </div>

                                {lensResponse.length > 0 && (
                                    <>
                                        {/* Spherical */}
                                        <div className="grid grid-cols-[0.5fr_1fr_1fr] gap-2 items-center w-full">
                                            <p className="text-sm font-helvetica text-font-main">
                                                Spherical
                                            </p>

                                            {/* Right Eye */}
                                            <select
                                                disabled={isRightEyeDisabled}
                                                value={rightEye.spherical}
                                                onChange={(e) =>
                                                    handleSphericalChange(
                                                        "right",
                                                        e.target.value,
                                                    )
                                                }
                                                className={`border-[0.5px] border-cart-border rounded-none py-2 px-4 text-sm w-full font-helvetica text-font-secondary font-light ${isRightEyeDisabled ? "bg-gray-100 cursor-not-allowed opacity-60" : ""}`}
                                            >
                                                <option value="">Select</option>
                                                {[
                                                    ...new Set(
                                                        lensResponse.map(
                                                            (i) => i.spherical,
                                                        ),
                                                    ),
                                                ].map((val) => (
                                                    <option
                                                        key={val}
                                                        value={val}
                                                    >
                                                        {val}
                                                    </option>
                                                ))}
                                            </select>

                                            {/* Left Eye */}
                                            <select
                                                disabled={isLeftEyeDisabled}
                                                value={leftEye.spherical}
                                                onChange={(e) =>
                                                    handleSphericalChange(
                                                        "left",
                                                        e.target.value,
                                                    )
                                                }
                                                className={`border-[0.5px] border-cart-border rounded-none py-2 px-4 text-sm w-full font-helvetica text-font-secondary font-light ${isLeftEyeDisabled ? "bg-gray-100 cursor-not-allowed opacity-60" : ""}`}
                                            >
                                                <option value="">Select</option>
                                                {[
                                                    ...new Set(
                                                        lensResponse.map(
                                                            (item) =>
                                                                item.spherical,
                                                        ),
                                                    ),
                                                ].map((val) => (
                                                    <option
                                                        key={val}
                                                        value={val}
                                                    >
                                                        {val}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Cylindrical */}
                                        <div className="grid grid-cols-[0.5fr_1fr_1fr] gap-2 items-center w-full">
                                            <p className="text-sm font-helvetica text-font-main">
                                                Cylindrical
                                            </p>

                                            <select
                                                value={rightEye.cylindrical}
                                                onChange={(e) =>
                                                    handleCylindricalChange(
                                                        "right",
                                                        e.target.value,
                                                    )
                                                }
                                                disabled={
                                                    isRightEyeDisabled ||
                                                    !rightEye.spherical
                                                }
                                                className="border-[0.5px] border-cart-border rounded-none py-2 px-4 text-sm w-full font-helvetica text-font-secondary font-light disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                <option value="">Select</option>
                                                {rightEye.cylindricalOptions.map(
                                                    (val) => (
                                                        <option
                                                            key={val}
                                                            value={val}
                                                        >
                                                            {val}
                                                        </option>
                                                    ),
                                                )}
                                            </select>

                                            <select
                                                value={leftEye.cylindrical}
                                                onChange={(e) =>
                                                    handleCylindricalChange(
                                                        "left",
                                                        e.target.value,
                                                    )
                                                }
                                                disabled={
                                                    isLeftEyeDisabled ||
                                                    !leftEye.spherical
                                                }
                                                className="border-[0.5px] border-cart-border rounded-none py-2 px-3 text-sm w-full font-helvetica text-font-secondary font-light disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                <option value="">Select</option>
                                                {leftEye.cylindricalOptions.map(
                                                    (val) => (
                                                        <option
                                                            key={val}
                                                            value={val}
                                                        >
                                                            {val}
                                                        </option>
                                                    ),
                                                )}
                                            </select>
                                        </div>

                                        {/* Axis */}
                                        <div className="grid grid-cols-[0.5fr_1fr_1fr] gap-2 items-center w-full">
                                            <p className="text-sm font-helvetica text-font-main">
                                                Axis
                                            </p>

                                            <select
                                                value={rightEye.axis}
                                                onChange={(e) => {
                                                    const axis = e.target.value;

                                                    const matchedLens =
                                                        rightEye.lensData.find(
                                                            (item) =>
                                                                String(
                                                                    item.spherical,
                                                                ) ===
                                                                    rightEye.spherical &&
                                                                String(
                                                                    item.cylindrical,
                                                                ) ===
                                                                    rightEye.cylindrical &&
                                                                String(
                                                                    item.axis,
                                                                ) === axis,
                                                        );

                                                    setRightEye((prev) => ({
                                                        ...prev,
                                                        axis,
                                                        selectedLensId:
                                                            matchedLens?.id ??
                                                            null,
                                                    }));
                                                }}
                                                disabled={
                                                    isRightEyeDisabled ||
                                                    !rightEye.cylindrical
                                                }
                                                className="border-[0.5px] border-cart-border rounded-none py-2 px-4 text-sm w-full font-helvetica text-font-secondary font-light disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                <option value="">Select</option>
                                                {rightEye.axisOptions.map(
                                                    (val) => (
                                                        <option
                                                            key={val}
                                                            value={val}
                                                        >
                                                            {val}
                                                        </option>
                                                    ),
                                                )}
                                            </select>

                                            <select
                                                value={leftEye.axis}
                                                onChange={(e) => {
                                                    const axis = e.target.value;

                                                    const matchedLens =
                                                        leftEye.lensData.find(
                                                            (item) =>
                                                                String(
                                                                    item.spherical,
                                                                ) ===
                                                                    leftEye.spherical &&
                                                                String(
                                                                    item.cylindrical,
                                                                ) ===
                                                                    leftEye.cylindrical &&
                                                                String(
                                                                    item.axis,
                                                                ) === axis,
                                                        );

                                                    setLeftEye((prev) => ({
                                                        ...prev,
                                                        axis,
                                                        selectedLensId:
                                                            matchedLens?.id ??
                                                            null,
                                                    }));
                                                }}
                                                disabled={
                                                    isLeftEyeDisabled ||
                                                    !leftEye.cylindrical
                                                }
                                                className="border-[0.5px] border-cart-border rounded-none py-2 px-3 text-sm w-full font-helvetica text-font-secondary font-light disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                <option value="">Select</option>
                                                {leftEye.axisOptions.map(
                                                    (val) => (
                                                        <option
                                                            key={val}
                                                            value={val}
                                                        >
                                                            {val}
                                                        </option>
                                                    ),
                                                )}
                                            </select>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        <button
                            disabled={!canProceed || proceeding}
                            className={`mt-6 text-white rounded-full py-3 px-6 text-sm font-helvetica font-semibold transition w-fit self-center 
                                ${
                                    !canProceed || proceeding
                                        ? "bg-gray-400 cursor-not-allowed"
                                        : "bg-black hover:bg-primary-600 hover:opacity-90 cursor-pointer"
                                }
                            `}
                            onClick={handleProceedToCart}
                        >
                            {proceeding ? "Proceeding..." : "Proceed to cart"}
                        </button>
                    </div>
                )}
            </div>

            {/* Bottom Section */}
            <Text
                as="p"
                size="base"
                weight="normal"
                color="black"
                font="helvetica"
                className="pt-6 text-xs sm:text-sm lg:text-base"
            >
                Don&apos;t have a valid prescription?
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
            {/* Login Popup */}
            {isLoginPopup && (
                <Login
                    isLoginPopup={isLoginPopup}
                    setIsLoginPopup={setIsLoginPopup}
                />
            )}
        </div>
    );
}
