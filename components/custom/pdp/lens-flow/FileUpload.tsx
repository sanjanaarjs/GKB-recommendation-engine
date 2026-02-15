"use client";

import Text from "@/components/generic/Text";
import {
    useState,
    useCallback,
    forwardRef,
    useImperativeHandle,
    useEffect,
} from "react";
import { useDropzone, FileRejection } from "react-dropzone";
import {
    uploadPrescription,
    UploadPrescriptionResponse,
} from "../datas/prescription/uploadPrescription.Data.api";

export interface FileUploadRef {
    showError: (message: string) => void;
}

interface FileUploadProps {
    initialValue?: {
        prescriptionName?: string;
    };
    prescriptionType?: string;
    onValidUpload?: (data: {
        id: number;
        prescriptionName: string;
        downloadUrl: string;
    }) => void;
}

const MAX_FILE_SIZE_MB = 5;
const MAX_FILE_SIZE = MAX_FILE_SIZE_MB * 1024 * 1024;

const FileUpload = forwardRef<FileUploadRef, FileUploadProps>(
    ({ onValidUpload, initialValue, prescriptionType }, ref) => {
        const [uploadedFile, setUploadedFile] = useState<File | null>(null);
        const [error, setError] = useState<string | null>(null);
        const [successMessage, setSuccessMessage] = useState<string | null>(
            null,
        );
        const [isUploading, setIsUploading] = useState(false);
        const [prescriptionName, setPrescriptionName] = useState("");

        useImperativeHandle(ref, () => ({
            showError(message: string) {
                setError(message);
                setSuccessMessage(null);
                setTimeout(() => setError(null), 3000);
            },
        }));

        const convertToBase64 = (file: File): Promise<string> => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onloadend = () => {
                    const result = reader.result as string;
                    const cleanedBase64 = result.replace(
                        /^data:.*;base64,/,
                        "",
                    );
                    resolve(cleanedBase64);
                };
                reader.onerror = (error) => reject(error);
            });
        };

        const onDrop = useCallback(
            async (acceptedFiles: File[], rejections: FileRejection[]) => {
                setError(null);
                setSuccessMessage(null);

                if (rejections.length > 0) {
                    setError("Only image or PDF formats are allowed.");
                    setTimeout(() => setError(null), 3000);
                    return;
                }

                const file = acceptedFiles[0];
                if (!file) return;

                // File size validation before encoding
                if (file.size > MAX_FILE_SIZE) {
                    setError(
                        `File size exceeds ${MAX_FILE_SIZE_MB}MB. Please upload a smaller file.`,
                    );
                    setTimeout(() => setError(null), 4000);
                    return;
                }

                if (!prescriptionName.trim()) {
                    setError("Please enter a prescription name before upload.");
                    setTimeout(() => setError(null), 3000);
                    return;
                }
                setUploadedFile(null);
                setSuccessMessage(null);
                setError(null);
                try {
                    setIsUploading(true);

                    const base64 = await convertToBase64(file);
                    const variables = {
                        prescriptionName,
                        fileName: file.name,
                        path: base64,
                        type:
                            file.type === "image/jpg"
                                ? "image/jpeg"
                                : file.type,
                        prescriptionType,
                    };

                    // added console for testing
                    console.log("Uploading with variables:", variables);

                    const data: UploadPrescriptionResponse | null =
                        await uploadPrescription(variables);

                    if (data?.uploadPrescription?.success) {
                        setUploadedFile(file);
                        setSuccessMessage(
                            data.uploadPrescription.message ||
                                "Prescription uploaded successfully!",
                        );

                        onValidUpload?.({
                            id: Number(data.uploadPrescription.id),
                            prescriptionName: prescriptionName,
                            downloadUrl: data.uploadPrescription.downloadUrl,
                        });

                        setTimeout(() => setSuccessMessage(null), 3000);
                    } else {
                        setError(
                            data?.uploadPrescription?.message ||
                                "Upload failed.",
                        );
                        setTimeout(() => setError(null), 3000);
                    }
                } catch (err) {
                    console.error("Upload error:", err);
                    setError("Something went wrong while uploading.");
                    setTimeout(() => setError(null), 3000);
                } finally {
                    setIsUploading(false);
                }
            },
            [onValidUpload, prescriptionName],
        );

        const { getRootProps, getInputProps } = useDropzone({
            accept: {
                "image/*": [],
                "application/pdf": [],
            },
            onDrop,
            multiple: false,
        });

        useEffect(() => {
            if (initialValue?.prescriptionName) {
                setPrescriptionName(initialValue.prescriptionName);
            }
        }, [initialValue]);

        return (
            <div className="flex flex-col gap-3">
                {/* Prescription name input */}
                <div className="flex flex-col text-left">
                    <input
                        id="prescriptionName"
                        type="text"
                        value={prescriptionName}
                        onChange={(e) => setPrescriptionName(e.target.value)}
                        placeholder="Enter prescription name"
                        className="border border-gray-300 rounded-xs py-2 px-3 text-sm font-helvetica focus:border-primary-500 outline-none"
                    />
                </div>

                {/* Dropzone section */}
                <div
                    {...getRootProps()}
                    className={`border py-4 px-2 cursor-pointer rounded-xs text-center bg-white transition ${
                        error
                            ? "border-red-500"
                            : successMessage
                              ? "border-green-500"
                              : "border-gray-300 hover:border-primary-500"
                    }`}
                >
                    <input {...getInputProps()} disabled={isUploading} />
                    {isUploading ? (
                        <Text
                            as="p"
                            className="text-sm font-helvetica text-gray-600"
                        >
                            Uploading...
                        </Text>
                    ) : uploadedFile ? (
                        <Text
                            as="p"
                            className="text-sm font-helvetica text-green-700"
                        >
                            Uploaded: {uploadedFile.name}
                        </Text>
                    ) : (
                        <Text
                            as="p"
                            className="text-sm font-helvetica text-gray-600"
                        >
                            Choose an image or PDF, or drag and drop it here to
                            upload.
                        </Text>
                    )}
                </div>

                {error && (
                    <Text
                        as="p"
                        className="text-xs text-red-600 font-helvetica text-left"
                    >
                        {error}
                    </Text>
                )}

                {successMessage && (
                    <Text
                        as="p"
                        className="text-xs text-green-700 font-helvetica text-left"
                    >
                        {successMessage}
                    </Text>
                )}
            </div>
        );
    },
);

FileUpload.displayName = "FileUpload";
export default FileUpload;
