import React from "react";

const steps = ["Shipping information", "Payment details", "Order Confirmation"];

export default function ProgressStepper({ step }: { step: number }) {
    return (
        <div className="w-full">
            <div className="flex items-center justify-between">
                {steps.map((label, idx) => {
                    const active = idx + 1 <= step;

                    return (
                        <div
                            key={label}
                            className="flex-1 text-center relative"
                        >
                            {/* Step circle */}
                            <div className="flex items-center justify-center">
                                <div
                                    className={`w-4 h-4 rounded-full border-[2px] flex items-center justify-center transition-colors duration-300 
                    ${active ? "bg-black border-black" : "bg-white border-[#C8CCD0]"}
                  `}
                                />
                            </div>

                            {/* Step label */}
                            <div
                                className={`mt-3 text-sm transition-colors duration-300
                  ${active ? "text-black font-medium" : "text-[#7C7C7C]"}
                `}
                            >
                                {label}
                            </div>

                            {/* Connector line between circles */}
                            {idx < steps.length - 1 && (
                                <div
                                    className={`absolute top-2 left-[calc(50%+10px)] w-[calc(100%-20px)] h-[2px] 
                    ${idx + 1 < step ? "bg-black" : "bg-[#E5E7EB]"}
                  `}
                                />
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Bottom border */}
            <div className="mt-6 h-px bg-[#E5E7EB]" />
        </div>
    );
}
