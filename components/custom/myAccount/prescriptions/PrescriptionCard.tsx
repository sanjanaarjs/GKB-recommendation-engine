"use client";

import React from "react";
import { Trash2 } from "lucide-react";
import Text from "@/components/generic/Text";
import Image from "next/image";
import { PrescriptionCardProps } from "./datas/prescription.data.api";

export default function PrescriptionCard({
    prescription,
    handleDelete,
}: Readonly<{
    prescription: PrescriptionCardProps["prescription"];
    handleDelete?: (id: number | string) => void;
}>) {
    const { id, prescriptionPath, prescriptionType, downloadUrl, addedOn } =
        prescription;

    // Format Date (Fallback to empty)
    const formattedDate = addedOn
        ? new Date(addedOn).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
          })
        : "--";

    const isPdf = downloadUrl?.toLowerCase().endsWith(".pdf");

    return (
        <div className="w-full min-h-[420px] bg-white rounded-2xl shadow-[0_6px_24px_0_rgba(0,0,0,0.10)] p-5 flex flex-col justify-between overflow-hidden">
            {/* Top info */}
            <div className="space-y-4">
                {/* Prescription type */}
                <div className="flex justify-between">
                    <Text
                        className="text-sm text-black font-light"
                        font="helvetica"
                    >
                        Prescription Type:
                    </Text>
                    <Text
                        className="font-bold text-black text-sm"
                        font="helvetica"
                    >
                        {prescriptionType || "N/A"}
                    </Text>
                </div>

                {/* Date added */}
                <div className="flex justify-between">
                    <Text
                        className="text-sm text-black font-light"
                        font="helvetica"
                    >
                        Added on:
                    </Text>
                    <Text
                        className="font-bold text-black text-sm"
                        font="helvetica"
                    >
                        {formattedDate}
                    </Text>
                </div>

                {/* Uploaded prescription */}
                <div>
                    <Text
                        className="text-sm text-black font-light"
                        font="helvetica"
                    >
                        Uploaded Prescription:
                    </Text>

                    <div className="relative border border-border-color rounded-lg mt-4 w-full h-[160px] md:h-[200px] lg:h-[240px] overflow-hidden flex items-center justify-center bg-gray-50">
                        {!downloadUrl ? (
                            <Image
                                alt="prescription_placeholder"
                                src="/images/account/prescription.png"
                                fill
                                className="object-contain w-full h-full"
                            />
                        ) : isPdf ? (
                            <iframe
                                src={downloadUrl}
                                className="w-full h-full"
                                title="PDF Preview"
                            />
                        ) : (
                            <Image
                                alt="prescription_image"
                                src={downloadUrl}
                                fill
                                className="object-contain w-full h-full"
                            />
                        )}
                    </div>
                </div>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex justify-between items-center">
                {/* Download Button */}
                {downloadUrl && (
                    <a
                        href={downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-bold italic font-helvetica text-black hover:underline"
                    >
                        Download
                    </a>
                )}

                {/* Delete Button */}
                <button
                    className="flex items-center gap-2 text-sm font-medium text-gray-800 hover:text-red-600 transition-colors cursor-pointer"
                    onClick={() => handleDelete?.(id)}
                >
                    <Trash2 size={20} />
                    <Text className="text-sm font-bold italic" font="helvetica">
                        Delete
                    </Text>
                </button>
            </div>
        </div>
    );
}
