"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Text from "@/components/generic/Text";
import { CheckCircle, XCircle, Info, AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";

type PopupStatus = "success" | "error" | "info" | "warning";

interface AppPopupProps {
    open: boolean;
    onClose: () => void;
    status?: PopupStatus;
    title?: string;
    message?: string;
    buttonCart?: string;
}

export default function SuccessMessageModals({
    open,
    onClose,
    status = "info",
    title = "",
    message = "",
    buttonCart = "Go to Cart",
}: AppPopupProps) {
    const iconMap = {
        success: <CheckCircle className="m-0 mb-3 text-green-600 w-8 h-8" />,
        error: <XCircle className="mx-auto mb-3 text-red-500 w-12 h-12" />,
        info: <Info className="mx-auto mb-3 text-blue-500 w-12 h-12" />,
        warning: (
            <AlertTriangle className="mx-auto mb-3 text-yellow-500 w-12 h-12" />
        ),
    };

    const colorMap: Record<PopupStatus, string> = {
        success: "text-green-600",
        error: "text-red-500",
        info: "text-blue-600",
        warning: "text-yellow-600",
    };
    const router = useRouter();

    const handleGoToCart = () => {
        onClose(); // close the modal first
        router.push("/cart"); // then navigate to cart page
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-md text-center py-6 z-[9999]">
                <DialogHeader className="flex-row items-center justify-center">
                    {iconMap[status]}

                    <DialogTitle
                        className={`text-2xl font-semibold mb-2 ${colorMap[status]} font-helvetica`}
                    >
                        {title}
                    </DialogTitle>
                </DialogHeader>

                <Text className="text-gray-700 mb-4 font-helvetica font-light">
                    {message}
                </Text>

                <div className="flex w-full justify-center items-center gap-4">
                    <Button
                        onClick={handleGoToCart}
                        className=" text-white rounded-none bg-black hover:bg-gray-800 cursor-pointer"
                    >
                        {buttonCart}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
