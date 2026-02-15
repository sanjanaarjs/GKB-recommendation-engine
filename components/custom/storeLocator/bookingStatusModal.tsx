"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Text from "@/components/generic/Text";
import { CheckCircle, XCircle } from "lucide-react";

interface BookingStatusModalProps {
    open: boolean;
    onClose: () => void;
    status: "success" | "error";
    message?: string;
    appointmentId?: string;
    storeArea?: string;
    storeSlot?: string;
}

export default function BookingStatusModal({
    open,
    onClose,
    status,
    message,
    appointmentId,
    storeArea,
    storeSlot,
}: BookingStatusModalProps) {
    const isSuccess = status === "success";

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-md text-center py-6 z-[9999]">
                <DialogHeader>
                    {isSuccess ? (
                        <CheckCircle className="mx-auto mb-3 text-green-600 w-12 h-12" />
                    ) : (
                        <XCircle className="mx-auto mb-3 text-red-500 w-12 h-12" />
                    )}

                    <DialogTitle
                        className={`text-2xl font-semibold mb-2 ${
                            isSuccess ? "text-green-600" : "text-red-500"
                        }`}
                    >
                        {isSuccess
                            ? "Appointment Booked Successfully"
                            : "Booking Failed"}
                    </DialogTitle>
                </DialogHeader>

                <Text className="text-gray-700 mb-4">
                    {isSuccess ? (
                        <>
                            Your appointment has been confirmed. <br />
                            <span className="font-bold">Appointment ID: </span>
                            {appointmentId}
                            <div className="flex gap-2 justify-center mt-1">
                                {storeArea && (
                                    <p>
                                        <span className="font-bold">
                                            Store:
                                        </span>{" "}
                                        {storeArea}
                                    </p>
                                )}
                                {storeSlot && (
                                    <p>
                                        <span className="font-bold">Slot:</span>
                                        {storeSlot}
                                    </p>
                                )}
                            </div>
                        </>
                    ) : (
                        message ||
                        "Something went wrong while booking your appointment."
                    )}
                </Text>

                <DialogFooter>
                    <Button
                        onClick={onClose}
                        className={`w-full text-white rounded-none cursor-pointer ${
                            isSuccess
                                ? "bg-black hover:bg-gray-800"
                                : "bg-red-500 hover:bg-red-600"
                        }`}
                    >
                        Continue
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
