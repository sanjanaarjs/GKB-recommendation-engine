"use client";
import { useEffect, useState } from "react";
import { ApolloError, useMutation } from "@apollo/client";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription,
    DialogOverlay,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Text from "@/components/generic/Text";
import { CANCEL_APPOINTMENT } from "./appointment.data.api";

interface CancelAppointmentModalProps {
    open: boolean;
    appointmentId: number | null;
    onClose: () => void;
    onSuccess?: () => void;
}

const CancelAppointmentModal = ({
    open,
    appointmentId,
    onClose,
    onSuccess,
}: CancelAppointmentModalProps) => {
    const [apiError, setApiError] = useState("");

    const [cancelAppointment, { loading }] = useMutation(CANCEL_APPOINTMENT, {
        onCompleted: (data) => {
            if (data?.cancelAppointment?.success) {
                onSuccess?.();
                onClose();
            } else {
                setApiError(
                    data?.cancelAppointment?.message ||
                        "Unable to cancel appointment. Try again.",
                );
            }
        },
        onError: (error: ApolloError) => {
            let message = error.message;

            // GraphQL error message
            if (error.graphQLErrors?.length > 0) {
                message = error.graphQLErrors[0].message;
            }

            // Network error message (typed)
            if (error.networkError && "result" in error.networkError) {
                const networkErr = error.networkError as {
                    result?: { errors?: Array<{ message?: string }> };
                };

                const netMsg = networkErr.result?.errors?.[0]?.message;
                if (netMsg) message = netMsg;
            }

            setApiError(message || "Something went wrong. Please try again.");
        },
    });

    const handleCancel = () => {
        if (!appointmentId) return;
        setApiError("");
        cancelAppointment({ variables: { appointmentId } });
    };

    useEffect(() => {
        setApiError("");
        return () => {
            setApiError("");
        };
    }, [open]);

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogOverlay className="fixed inset-0 bg-black/30 z-[9998]" />

            <DialogContent className="sm:max-w-lg z-[9999]">
                <DialogHeader>
                    <DialogTitle className="font-helvetica font-bold text-acc-sidebar-neurtal-nine mb-2">
                        Cancel Appointment
                    </DialogTitle>
                    <DialogDescription className="font-helvetica font-medium text-midGrey">
                        Are you sure you want to cancel this appointment?
                    </DialogDescription>
                </DialogHeader>

                {apiError && (
                    <Text className="text-red-500 mt-2 text-sm" font="avenir">
                        {apiError}
                    </Text>
                )}

                <DialogFooter className="mt-6 flex justify-end gap-3">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        disabled={loading}
                        className="rounded-full px-10 font-helvetica border border-border-color-light cursor-pointer"
                    >
                        Close
                    </Button>

                    <Button
                        onClick={handleCancel}
                        disabled={loading}
                        className={`rounded-full font-helvetica bg-black text-white px-10 disabled:opacity-60 
    ${loading ? "cursor-wait" : "cursor-pointer"}`}
                    >
                        {loading ? "Cancelling..." : "Confirm"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CancelAppointmentModal;
