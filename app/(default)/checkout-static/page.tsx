"use client";

import React, { useState } from "react";
import ProgressStepper from "@/components/staticUI/custom/checkout-static/ProgressStepper";
import OrderSummary from "@/components/staticUI/custom/checkout-static/OrderSummary";
import LoginStep from "@/components/staticUI/custom/checkout-static/LoginStep";
import OTPStep from "@/components/staticUI/custom/checkout-static/OTPStep";
import AddressStep from "@/components/staticUI/custom/checkout-static/AddressStep";
import PaymentStep from "@/components/staticUI/custom/checkout-static/PaymentStep";
import ConfirmationStep from "@/components/staticUI/custom/checkout-static/ConfirmationStep";
import AddressFormStep from "@/components/staticUI/custom/checkout-static/AddressFormStep";

export default function CheckoutPage() {
    const [step, setStep] = useState<number>(1);

    return (
        <div className="bg-background-grey">
            <div className="p-10">
                <ProgressStepper step={step} />

                <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 lg:px-[168px]">
                    <div>
                        {step === 1 && <LoginStep onNext={() => setStep(2)} />}
                        {step === 2 && (
                            <OTPStep
                                onNext={() => setStep(3)}
                                onBack={() => setStep(1)}
                            />
                        )}
                        {step === 3 && (
                            <AddressStep
                                onNext={() => setStep(5)}
                                onBack={() => setStep(2)}
                                onEdit={() => setStep(4)}
                            />
                        )}
                        {step === 4 && (
                            <AddressFormStep
                                onNext={() => setStep(3)}
                                onBack={() => setStep(3)}
                            />
                        )}
                        {step === 5 && (
                            <PaymentStep
                                onNext={() => setStep(6)}
                                onBack={() => setStep(3)}
                            />
                        )}
                        {step === 6 && <ConfirmationStep />}
                    </div>

                    <OrderSummary />
                </div>
            </div>
        </div>
    );
}
