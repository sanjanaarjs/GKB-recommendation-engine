"use client";

import React from "react";
import {
    CheckCircle,
    Clock,
    PackageCheck,
    LucideIcon,
    Truck,
} from "lucide-react";
import clsx from "clsx";
import Image from "next/image";
import Text from "@/components/generic/Text";
// import TruckDelivery from "@/components/icons/TruckDelivery";

interface OrderProgressProps {
    shiprocketData?: {
        awb: string;
        current_status: string | null;
        track_url: string | null;
        edd: string | null;
        activity:
            | {
                  date: string | null;
                  description: string | null;
                  label: string | null;
                  location: string | null;
              }[]
            | null;
    };
}
const statusIconMap: Record<string, LucideIcon> = {
    ["Booked"]: CheckCircle,
    ["Picked Up"]: Truck,
    ["In Transit"]: Clock,
    ["Out For Delivery"]: Truck,
    ["Delivered"]: PackageCheck,
};

const OrderProgress: React.FC<OrderProgressProps> = ({ shiprocketData }) => {
    const activity = (shiprocketData?.activity || []).slice().reverse();
    console.log("shiprocket activity", activity);
    // Build dynamic steps
    type Step = {
        name: string;
        date: string;
        icon: LucideIcon;
        isFutureStep?: boolean;
    };

    const dynamicSteps: Step[] = activity.map((item) => ({
        name: item.description ?? "",
        date: item.label ?? "",
        icon: statusIconMap[item.description ?? "Booked"] || CheckCircle,
    }));

    // Auto-detect current step from current_status
    const normalize = (str: string | null | undefined) =>
        (str ?? "").replace(/\s+/g, "").toLowerCase();

    const expectedSteps = [
        "Booked",
        "Picked Up",
        "In Transit",
        "Out For Delivery",
        "Delivered",
    ];

    expectedSteps.forEach((status) => {
        if (
            !dynamicSteps.some(
                (step) => normalize(step.name) === normalize(status),
            )
        ) {
            dynamicSteps.push({
                name: status,
                date: "",
                icon: statusIconMap[status],
                isFutureStep: true,
            });
        }
    });

    const currentIndex = dynamicSteps.findIndex(
        (step) =>
            normalize(step.name) === normalize(shiprocketData?.current_status),
    );
    const currentStep = currentIndex !== -1 ? currentIndex : 0;
    return (
        <div className="relative w-full">
            <ol className="relative">
                {dynamicSteps.map((step, index) => {
                    const isFuture = (step as any).isFutureStep;
                    const isCompleted = !isFuture && index <= currentStep;
                    const isActive = !isFuture && index === currentStep;
                    const Icon = step.icon;
                    const activityLabel = activity[index]?.label || step.date;
                    return (
                        <li
                            key={index}
                            className="relative mb-10 ml-0 flex flex-row items-center gap-3"
                        >
                            {/* The vertical line */}
                            {index !== dynamicSteps.length - 1 && (
                                <span
                                    className={clsx(
                                        "absolute left-0 top-[24px] h-[40px]",
                                        {
                                            "border-l border-black":
                                                isCompleted, // solid active line
                                            "border-l border-dotted border-black opacity-50":
                                                !isCompleted, // faded dotted line
                                        },
                                    )}
                                ></span>
                            )}
                            <span className="absolute -left-3 flex h-6 w-6 items-center justify-center gap-x-6 rounded-full bg-white ring-4 ring-white">
                                {isCompleted ? (
                                    <Image
                                        src="/images/account/stop-circle-outlined.svg"
                                        alt=""
                                        height={20}
                                        width={20}
                                    />
                                ) : (
                                    <Image
                                        src="/images/account/stop-circle.svg"
                                        alt=""
                                        height={20}
                                        width={20}
                                    />
                                )}
                            </span>

                            <div
                                className={clsx(
                                    "ml-5 flex flex-row items-center gap-x-2",
                                    {
                                        "opacity-50": !isCompleted && !isActive,
                                    },
                                )}
                            >
                                <Icon size={24} />
                                <Text
                                    className={clsx({
                                        "text-black-neutral-nine": isCompleted,
                                        "text-title-900": isActive,
                                        "opacity-50": !isCompleted && !isActive,
                                    })}
                                    weight="bold"
                                    size="base"
                                    font="avenir"
                                >
                                    {activityLabel || step.name}
                                </Text>
                            </div>
                        </li>
                    );
                })}
            </ol>
        </div>
    );
};

export default OrderProgress;
