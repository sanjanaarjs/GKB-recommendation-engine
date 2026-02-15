import React, { useEffect, useState } from "react";
import ChevronLeft from "@/components/icons/ChevronLeft";
import Text from "@/components/generic/Text";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import { getStoredCartId } from "@/lib/cart";
import { getAvailablePaymentMethods } from "./datas/getAvailablePaymentMethod.api";
import { setAvailablePaymentMethodData } from "@/lib/store/checkoutSlice";
import Image from "next/image";

export default function PaymentStep({
    onBack,
    selectedMethod,
    setSelectedMethod,
}: Readonly<{
    onBack: () => void;
    selectedMethod: string | null;
    setSelectedMethod: (value: string) => void;
}>) {
    // Available paymentMethods api call
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const { cartData } = useSelector((state: RootState) => state.cart);
    const carttotal = cartData?.prices;
    const grandTotalValue = carttotal?.grand_total?.value || 0;
    const isFreeOrder = grandTotalValue === 0;
    const paymentMethods = useSelector(
        (state: RootState) => state.checkout.availablePaymentMethodData,
    );

    useEffect(() => {
        if (isFreeOrder) {
            setSelectedMethod("free");
        }
    }, [isFreeOrder]);

    useEffect(() => {
        const cartId = getStoredCartId();

        if (!cartId) {
            console.error("No cart ID found in storage");
            return;
        }

        const fetchMethods = async () => {
            try {
                setLoading(true);
                const res = await getAvailablePaymentMethods(cartId);

                if (res) {
                    dispatch(setAvailablePaymentMethodData(res));
                }
            } catch (err) {
                console.error("Error fetching payment methods:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchMethods();
    }, [dispatch, grandTotalValue]);

    const methods = paymentMethods?.cart?.available_payment_methods || [];
    const hasRazorpay = methods.some((m) => m.code === "checkmo");
    const hasCOD = methods.some((m) => m.code === "cashondelivery");

    const filteredMethods = isFreeOrder
        ? methods.filter((m) => m.code === "free")
        : methods;

    return (
        <div className="lg:pr-10 lg:pl-20 pb-8">
            <div className="flex flex-col gap-6 mb-[16px]">
                <button onClick={onBack}>
                    {" "}
                    <ChevronLeft
                        size={24}
                        fill="black"
                        className="cursor-pointer"
                    />
                </button>

                <Text
                    as={"h1"}
                    className="text-black font-helvetica text-[1rem] lg:text-[2rem] font-light mb-[16px] hidden"
                >
                    how would you like to pay?
                </Text>
            </div>

            <div className="bg-white shadow-lg py-8 px-6 border-r-2">
                <h3 className="text-xl font-semibold mb-12">Payment options</h3>

                {/* Loader */}
                {loading && (
                    <div className="text-lg mb-4">Loading payment options…</div>
                )}
                {!loading && (
                    <>
                        {filteredMethods.map((method) => (
                            <label
                                key={method.code}
                                className={`flex items-start gap-4 mb-12 ${
                                    isFreeOrder
                                        ? "cursor-default opacity-70"
                                        : "cursor-pointer"
                                }`}
                            >
                                <input
                                    type="radio"
                                    name="pay"
                                    value={method.code}
                                    checked={selectedMethod === method.code}
                                    disabled={
                                        isFreeOrder && method.code !== "free"
                                    }
                                    onChange={() => {
                                        if (!isFreeOrder) {
                                            setSelectedMethod(method.code);
                                        }
                                    }}
                                    className="scale-125 mt-[6px] accent-black"
                                />

                                <div>
                                    <div className="text-xl font-bold mb-2">
                                        {method.title}
                                    </div>

                                    {method.code === "checkmo" && (
                                        <div className="text-xl">
                                            UPI, Credit / Debit cards,
                                            Netbanking, Digital wallets, EMI
                                            options
                                        </div>
                                    )}

                                    {method.code === "cashondelivery" && (
                                        <div className="text-xl">
                                            Pay via UPI or cash at the time of
                                            delivery
                                        </div>
                                    )}
                                </div>
                            </label>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
}
