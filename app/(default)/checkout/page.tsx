"use client";

import React, { useEffect, useRef, useState } from "react";
import ProgressStepper from "@/components/custom/checkout/ProgressStepper";
import OrderSummary from "@/components/custom/checkout/OrderSummary";
import LoginStep from "@/components/custom/checkout/LoginStep";
import OTPStep from "@/components/custom/checkout/OTPStep";
import AddressStep from "@/components/custom/checkout/AddressStep";
import PaymentStep from "@/components/custom/checkout/PaymentStep";
import ConfirmationStep from "@/components/custom/checkout/ConfirmationStep";
import AddressFormStep, {
    AddressData,
} from "@/components/custom/checkout/AddressFormStep";
import { getStoredCartId } from "@/lib/cart";
import { setGuestEmailOnCart } from "@/components/custom/checkout/datas/setGuestEmailOnCart.api";
import {
    setBillingAddressData,
    setGuestEmailOnCartData,
    setPaymentMethodsData,
    setPlaceOrderData,
    setShippingAddressData,
    setShippingMethodsData,
    clearPlaceOrderData,
} from "@/lib/store/checkoutSlice";
import {
    setCurrentStep,
    goToPreviousStep,
    setUserInput,
    setSelectedEmail,
    setSelectedAddress,
    setSelectedShippingAddress,
    setSelectedBillingAddress,
    setSelectedPaymentMethod,
} from "@/lib/store/checkoutFormSlice";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
    BillingAddressInput,
    setBillingAddressOnCart,
} from "@/components/custom/checkout/datas/setBillingAddressOnCart.api";
import {
    setShippingAddressOnCart,
    ShippingAddressInput,
} from "@/components/custom/checkout/datas/setShippingAddressesOnCart.api";
import { CustomerAddress } from "../profile/profile.data.api";
import { setShippingMethodsOnCart } from "@/components/custom/checkout/datas/setShippingMethodsOnCart.api";
import { AppDispatch, RootState } from "@/lib/store/store";
import {
    PaymentMethodInput,
    setPaymentMethodOnCart,
} from "@/components/custom/checkout/datas/setPaymentMethodOnCart.api";
import { placeOrder } from "@/components/custom/checkout/datas/placeOrder.api";
import { hasCookie } from "@/lib/cookie";
import { clearCart, fetchCart } from "@/lib/store/cartSlice";
import { useAuth } from "@/lib/context/AuthContext";
import { setLoggedIn } from "@/lib/store/features/authSlice";
import { useRouter } from "next/navigation";
import { generatePaytmTxnToken } from "@/components/custom/checkout/datas/generatePaymentToken";
import { AvailablePaymentMethod } from "@/components/custom/checkout/datas/getAvailablePaymentMethod.api";
import { useSearchParams } from "next/navigation";
import { checkPaytmOrderStatus } from "@/components/custom/checkout/datas/paymentOrderStatus";

type PaymentResult = "success" | "failure" | null;

const EMPTY_METHODS: AvailablePaymentMethod[] = [];

export default function CheckoutPage() {
    const [proceedPayment, setProceedPayment] = useState<AddressData | null>(
        null,
    );
    const [isPaytmOpen, setIsPaytmOpen] = useState(false);
    const [paytmParams, setPaytmParams] = useState<{
        mid: string;
        orderId: string;
        txnToken: string;
        amount: string;
    } | null>(null);
    const paytmInvokedRef = useRef(false);
    const { cartData, status } = useSelector((state: RootState) => state.cart);
    const carttotal = cartData?.prices;
    const grandTotalValue = carttotal?.grand_total?.value || 0;
    const isFreeOrder = grandTotalValue === 0;
    const { setAuthOpen } = useAuth();
    const [token, setToken] = useState<boolean>(false);
    const {
        currentStep: step,
        userInput,
        selectedEmail,
        selectedAddress,
        selectedShippingAddress,
        selectedBillingAddress,
        selectedPaymentMethod: selectedMethod,
    } = useSelector((state: RootState) => state.checkoutForm);

    const dispatch = useDispatch<AppDispatch>();

    // Helper functions to update form state
    const updateStep = (newStep: number) => dispatch(setCurrentStep(newStep));
    const updateUserInput = (input: string) => dispatch(setUserInput(input));
    const updateSelectedEmail = (email: string) =>
        dispatch(setSelectedEmail(email));
    const updateSelectedAddress = (addr: CustomerAddress | null) =>
        dispatch(setSelectedAddress(addr));
    const updateSelectedShippingAddress = (id: number | null) =>
        dispatch(setSelectedShippingAddress(id));
    const updateSelectedBillingAddress = (id: number | null) =>
        dispatch(setSelectedBillingAddress(id));
    const updateSelectedMethod = (method: string) =>
        dispatch(setSelectedPaymentMethod(method));
    const router = useRouter();
    const searchParams = useSearchParams();
    const isPaytmReturn = searchParams.has("paytm");
    const [paymentResult, setPaymentResult] = useState<PaymentResult>(null);
    const [paymentMessage, setPaymentMessage] = useState<string | null>(null);
    const [paymentProcessed, setPaymentProcessed] = useState(() => {
        // Initialize from localStorage to persist across redirects
        if (typeof window !== "undefined") {
            return (
                localStorage.getItem("PAYMENT_PROCESSED") === "true" ||
                isPaytmReturn
            );
        }
        return false;
    });

    const methods =
        useSelector(
            (state: RootState) =>
                state.checkout.availablePaymentMethodData?.cart
                    ?.available_payment_methods,
            shallowEqual,
        ) || EMPTY_METHODS;

    useEffect(() => {
        if (
            status === "idle" &&
            !paymentProcessed &&
            paymentResult === null &&
            !isPaytmReturn
        ) {
            dispatch(fetchCart());
        }
    }, [dispatch, status, paymentResult, isPaytmReturn, paymentProcessed]);

    useEffect(() => {
        const cartId = getStoredCartId();
        if (!cartId && paymentResult === null && !isPaytmReturn) {
            dispatch(clearCart());
            router.push("/cart");
        }
    }, [dispatch, router, paymentResult]);

    useEffect(() => {
        if (step < 5 && !isPaytmReturn) {
            dispatch(clearPlaceOrderData());
        }
    }, [step, dispatch]);

    useEffect(() => {
        if (
            step === 5 &&
            !paymentProcessed &&
            paymentResult === null &&
            !isPaytmReturn
        ) {
            dispatch(fetchCart());
        }
    }, [step, dispatch, paymentResult, isPaytmReturn, paymentProcessed]);

    useEffect(() => {
        const checkUser = async () => {
            const isLoggedIn = await hasCookie("userToken");
            setToken(isLoggedIn);
            if (isLoggedIn) {
                updateStep(3);
            }
        };
        checkUser();
    }, []);

    useEffect(() => {
        if (typeof document === "undefined") return;

        if (isPaytmOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        const root = document.getElementById("paytm-checkout");
        if (!root) return;

        const applyIframeStyles = () => {
            const iframe = root.querySelector("iframe");
            if (iframe) {
                iframe.style.width = "100%";
                iframe.style.height = "100%";
                iframe.style.border = "0";
                iframe.style.display = "block";
                iframe.setAttribute("allow", "payment *; fullscreen *");
            }
        };

        applyIframeStyles();

        const observer = new MutationObserver(applyIframeStyles);
        observer.observe(root, { childList: true, subtree: true });

        return () => {
            observer.disconnect();
            document.body.style.overflow = "";
        };
    }, [isPaytmOpen]);

    useEffect(() => {
        if (methods.length === 0) return;

        if (isFreeOrder) {
            updateSelectedMethod("free");
            return;
        }

        if (!selectedMethod) {
            const defaultCode =
                methods.find((m) => m.code === "checkmo")?.code ||
                methods[0].code;

            updateSelectedMethod(defaultCode);
        }
    }, [methods, selectedMethod, isFreeOrder]);

    useEffect(() => {
        if (!isPaytmOpen || !paytmParams || paytmInvokedRef.current) return;

        paytmInvokedRef.current = true;

        const started = startPaytmPayment(paytmParams);
        if (!started) {
            setIsPaytmOpen(false);
        }
    }, [isPaytmOpen, paytmParams]);

    // Handle browser back button during Paytm payment
    useEffect(() => {
        const handleBackButton = () => {
            const orderDetails = localStorage.getItem("ORDER_DETAILS");
            if (orderDetails && isPaytmOpen) {
                // User clicked back during payment - clear cart
                localStorage.removeItem("cart_id");
                localStorage.removeItem("ORDER_DETAILS");
                localStorage.setItem("PAYMENT_PROCESSED", "true");
                dispatch(clearCart());

                // Reload the page if redirected to cart
                if (window.location.pathname === "/cart") {
                    window.location.reload();
                }
            }
        };

        window.addEventListener("popstate", handleBackButton);
        return () => window.removeEventListener("popstate", handleBackButton);
    }, [isPaytmOpen, dispatch]);

    const customer = useSelector(
        (state: RootState) => state.checkout.customerAddressData,
    );

    // payment success or failure query
    useEffect(() => {
        if (!isPaytmReturn) return;

        const encodedOrderDetails = localStorage.getItem("ORDER_DETAILS");

        if (!encodedOrderDetails) {
            console.error("Missing ORDER_DETAILS");
            return;
        }

        const { orderId, orderDetails } = JSON.parse(atob(encodedOrderDetails));

        // Dispatch order details
        dispatch(
            setPlaceOrderData({
                placeOrder: {
                    orderV2: orderDetails,
                    errors: null,
                },
            }),
        );

        if (!orderId) {
            console.error("PAYTM_ORDER_ID not found");
            return;
        }

        let cancelled = false;

        const pollStatus = async () => {
            try {
                const res = await checkPaytmOrderStatus(orderId);

                if (cancelled) return;

                const status = res?.checkPaytmOrderStatus?.result_status;
                const message = res?.checkPaytmOrderStatus?.result_message;

                if (status === "TXN_SUCCESS") {
                    localStorage.removeItem("cart_id");
                    localStorage.removeItem("ORDER_DETAILS");
                    localStorage.setItem("PAYMENT_PROCESSED", "true");
                    dispatch(clearCart());
                    setPaymentProcessed(true);
                    setPaymentResult("success");
                    setPaymentMessage(null);
                    updateStep(6);
                    window.history.replaceState({}, "", "/checkout");
                    return;
                }

                if (status === "TXN_FAILURE") {
                    localStorage.removeItem("cart_id");
                    localStorage.removeItem("ORDER_DETAILS");
                    localStorage.setItem("PAYMENT_PROCESSED", "true");
                    dispatch(clearCart());
                    setPaymentProcessed(true);
                    setPaymentResult("failure");
                    setPaymentMessage(message || "Payment failed");
                    updateStep(6);
                    window.history.replaceState({}, "", "/checkout");
                    return;
                }

                // Handle pending or unknown status (user may have abandoned payment)
                if (
                    status &&
                    status !== "TXN_SUCCESS" &&
                    status !== "TXN_FAILURE"
                ) {
                    console.log("Payment status:", status);
                    // For pending/unknown status, clear cart after timeout
                    setTimeout(() => {
                        localStorage.removeItem("cart_id");
                        localStorage.removeItem("ORDER_DETAILS");
                        localStorage.setItem("PAYMENT_PROCESSED", "true");
                        dispatch(clearCart());
                        setPaymentProcessed(true);
                        setPaymentResult("failure");
                        setPaymentMessage("Payment was not completed");
                        updateStep(6);
                        window.history.replaceState({}, "", "/checkout");
                        window.location.reload();
                    }, 2000);
                }
            } catch (err) {
                console.error("Error checking Paytm status", err);
            }
        };

        pollStatus();

        return () => {
            cancelled = true;
        };
    }, [isPaytmReturn]);

    // Shipping payload
    const buildShippingPayload = (
        data: AddressData,
    ): ShippingAddressInput[] => [
        {
            address: {
                firstname: data.shipping.firstName,
                lastname: data.shipping.lastName,
                street: [data.shipping.street],
                city: data.shipping.city,
                region: data.shipping.state, // "TN"
                region_id: data.shipping.regionId,
                postcode: data.shipping.pincode,
                country_code: "IN",
                telephone: data.shipping.phone,
                save_in_address_book: true,
            },
        },
    ];

    // billingPayload
    const buildBillingPayload = (data: AddressData): BillingAddressInput => {
        if (data.billing === null) {
            return { same_as_shipping: true };
        }

        return {
            address: {
                firstname: data.billing.firstName,
                lastname: data.billing.lastName,
                street: [data.billing.street],
                city: data.billing.city,
                region: data.billing.state,
                region_id: data.billing.regionId,
                postcode: data.billing.pincode,
                country_code: "IN",
                telephone: data.billing.phone,
                save_in_address_book: false,
            },
        };
    };

    // this gets injected into AddressFormStep
    const validateAddressRef = useRef<(() => AddressData | null) | null>(null);

    const handleProceedToPayment = async () => {
        const cartId = getStoredCartId();
        if (!cartId) {
            console.error("No cart ID found in storage");
            dispatch(clearCart());
            router.push("/cart");
            return false;
        }

        const isVirtual = cartData?.is_virtual ?? false;

        let shippingPayload: ShippingAddressInput[] = [];
        let billingPayload: BillingAddressInput;

        let result: AddressData | null = null;

        // ------------------------------------------
        // CASE 1: EXISTING ADDRESS SELECTED
        // ------------------------------------------

        if (isVirtual) {
            // If user selected saved billing address
            if (selectedBillingAddress) {
                billingPayload = {
                    customer_address_id: selectedBillingAddress,
                };
                shippingPayload = [];
            }

            // If user entered NEW address in form
            else if (validateAddressRef.current) {
                result = validateAddressRef.current();

                if (!result || !result.billing) {
                    console.error("Billing form validation failed");
                    return false;
                }

                billingPayload = buildBillingPayload(result);
                shippingPayload = [];
            } else {
                console.error("No billing address provided in virtual flow");
                return false; // <- THIS FIXES THE TS ERROR
            }
        } else if (selectedShippingAddress) {
            shippingPayload = [
                { customer_address_id: selectedShippingAddress },
            ];

            if (selectedBillingAddress) {
                billingPayload = {
                    customer_address_id: selectedBillingAddress,
                };
            } else {
                billingPayload = {
                    customer_address_id: selectedShippingAddress,
                };
            }

            result = null;
        }

        // ------------------------------------------
        // CASE 2: NEW ADDRESS FORM
        // ------------------------------------------
        else {
            if (!validateAddressRef.current) {
                console.error("Address form validator missing");
                return false;
            }

            result = validateAddressRef.current();
            if (!result) {
                console.error("Address validation failed");
                return false;
            }

            shippingPayload = buildShippingPayload(result);
            billingPayload = buildBillingPayload(result);
        }

        setProceedPayment(result);

        try {
            //  Guest Email (only if user is guest)
            const loggedInEmail = customer?.customer?.email ?? null;

            const emailToUse = result?.shipping?.email ?? selectedEmail;

            let guestEmailRes = null;

            if (!loggedInEmail) {
                guestEmailRes = await setGuestEmailOnCart(cartId, emailToUse);
                if (guestEmailRes)
                    dispatch(setGuestEmailOnCartData(guestEmailRes));
            }

            // ------------------------------------
            // SHIPPING (only for physical)
            // ------------------------------------
            let shippingRes = null;
            let shippingMethodsRes = null;

            if (!isVirtual) {
                // Shipping Address API
                shippingRes = await setShippingAddressOnCart(
                    cartId,
                    shippingPayload,
                );

                const addr =
                    shippingRes?.setShippingAddressesOnCart?.cart
                        ?.shipping_addresses?.[0];

                const method = addr?.available_shipping_methods?.[0];

                if (!method) {
                    console.error("No available shipping methods found");
                    return false;
                }

                const shippingMethodsPayload = [
                    {
                        carrier_code: method.carrier_code,
                        method_code: method.method_code,
                    },
                ];

                // Shipping Methods API
                shippingMethodsRes = await setShippingMethodsOnCart(
                    cartId,
                    shippingMethodsPayload,
                );
            }

            // ------------------------------------
            // BILLING (always required)
            // ------------------------------------
            const billingRes = await setBillingAddressOnCart(
                cartId,
                billingPayload,
            );

            // ------------------------------------
            // VALIDATION
            // ------------------------------------
            if (!loggedInEmail && !guestEmailRes) {
                console.error("Guest email API returned null");
                return false;
            }

            if (!billingRes) {
                console.error("Billing API returned null");
                return false;
            }

            // Physical only checks
            if (!isVirtual) {
                if (!shippingRes) {
                    console.error("Shipping address API returned null");
                    return false;
                }
                if (!shippingMethodsRes) {
                    console.error("Shipping method API returned null");
                    return false;
                }
            }

            // ------------------------------------
            // DISPATCH TO REDUX
            // ------------------------------------
            // Guest email always dispatchable
            if (guestEmailRes) {
                dispatch(setGuestEmailOnCartData(guestEmailRes));
            }

            // Billing always needed
            dispatch(setBillingAddressData(billingRes));

            // SHIPPING ONLY WHEN NOT VIRTUAL
            if (!isVirtual && shippingRes) {
                dispatch(setShippingAddressData(shippingRes));
            }

            // SHIPPING-METHODS ONLY WHEN NOT VIRTUAL
            if (!isVirtual && shippingMethodsRes) {
                dispatch(setShippingMethodsData(shippingMethodsRes));
            }

            return true;
        } catch (error) {
            console.error("Checkout flow failed:", error);
            return false;
        }
    };
    const handlePaymentAndPlaceOrder = async () => {
        const cartId = getStoredCartId();
        if (!cartId) {
            console.error("No cart ID found in storage");
            dispatch(clearCart());
            router.push("/cart");
            return false;
        }

        if (!selectedMethod) {
            console.error("Payment method not selected");
            return false;
        }

        try {
            // Set payment method
            const paymentMethodPayload: PaymentMethodInput = {
                code: isFreeOrder ? "free" : selectedMethod,
            };

            const paymentMethodRes = await setPaymentMethodOnCart(
                cartId,
                paymentMethodPayload,
            );

            if (!paymentMethodRes) {
                console.error("Payment method API returned null");
                return false;
            }

            dispatch(setPaymentMethodsData(paymentMethodRes));

            //  Place order
            const placeOrderRes = await placeOrder(cartId);
            if (!placeOrderRes) return false;

            dispatch(setPlaceOrderData(placeOrderRes));

            // PAYTM FLOW (ONLY IF PAYTM)
            if (selectedMethod === "paytm") {
                const orderId = placeOrderRes?.placeOrder?.orderV2?.number;

                if (!orderId) {
                    console.error("Order ID missing");
                    return false;
                }

                const paytmRes = await generatePaytmTxnToken(orderId);

                if (!paytmRes?.generatePaytmTxnToken?.success) {
                    console.error("Paytm token generation failed");
                    return false;
                }

                const { mid, order_id, txn_token, amount } =
                    paytmRes.generatePaytmTxnToken;

                const scriptLoaded = await loadPaytmScript(mid);

                if (!scriptLoaded) {
                    console.error(
                        "Failed to load Paytm script. Disable blockers and retry.",
                    );
                    setIsPaytmOpen(false);
                    return false;
                }

                paytmInvokedRef.current = false;
                setPaytmParams({
                    mid,
                    orderId: order_id,
                    txnToken: txn_token,
                    amount,
                });
                setIsPaytmOpen(true);

                const paytmContext = {
                    orderId: order_id,
                    orderDetails: placeOrderRes.placeOrder.orderV2,
                };

                const encodedOrderData = btoa(JSON.stringify(paytmContext));

                localStorage.setItem("ORDER_DETAILS", encodedOrderData);

                return false; // wait for Paytm completion
            }

            dispatch(clearCart());
            setAuthOpen(false);
            dispatch(setLoggedIn(true));
            localStorage.removeItem("cart_id");
            localStorage.removeItem("couponMessage");
            setPaymentResult("success");
            setPaymentMessage(null);

            return true;
        } catch (error) {
            console.error("Payment + Place Order failed:", error);
            return false;
        }
    };

    const getPaytmHost = () => {
        return process.env.NEXT_PUBLIC_PAYTM_HOST;
    };

    const getPaytmTxnUrl = () => {
        return process.env.NEXT_PUBLIC_PAYTM_TXN_URL;
    };

    const loadPaytmScript = (mid: string): Promise<boolean> => {
        return new Promise((resolve) => {
            const hasCheckoutInit =
                typeof (window as any).Paytm?.CheckoutJS?.init === "function";
            const hasCheckoutOnLoad =
                typeof (window as any).Paytm?.CheckoutJS?.onLoad === "function";

            if (hasCheckoutInit || hasCheckoutOnLoad) {
                resolve(true);
                return;
            }

            const existingScript = document.getElementById(
                "paytm-checkout-js",
            ) as HTMLScriptElement | null;

            if (existingScript) {
                existingScript.addEventListener("load", () => {
                    const ready =
                        typeof (window as any).Paytm?.CheckoutJS?.init ===
                            "function" ||
                        typeof (window as any).Paytm?.CheckoutJS?.onLoad ===
                            "function";
                    resolve(ready);
                });
                existingScript.addEventListener("error", () => resolve(false));
                return;
            }

            const script = document.createElement("script");
            script.id = "paytm-checkout-js";
            script.src = `${getPaytmHost()}/merchantpgpui/checkoutjs/merchants/${mid}.js`;
            script.async = true;
            script.crossOrigin = "anonymous";

            script.onload = () => {
                const ready =
                    typeof (window as any).Paytm?.CheckoutJS?.init ===
                        "function" ||
                    typeof (window as any).Paytm?.CheckoutJS?.onLoad ===
                        "function";
                resolve(ready);
            };
            script.onerror = () => resolve(false);

            document.head.appendChild(script);
        });
    };

    const startPaytmPayment = ({
        mid,
        orderId,
        txnToken,
        amount,
    }: {
        mid: string;
        orderId: string;
        txnToken: string;
        amount: string;
    }): boolean => {
        const hasCheckoutInit =
            typeof (window as any).Paytm?.CheckoutJS?.init === "function";
        const hasOnLoad =
            typeof (window as any).Paytm?.CheckoutJS?.onLoad === "function";

        if (!hasCheckoutInit && !hasOnLoad) {
            console.error("Paytm JS not loaded or blocked");
            return false;
        }

        const rootId = "paytm-checkout";
        const existingRoot = document.getElementById(rootId);
        if (!existingRoot) {
            const rootDiv = document.createElement("div");
            rootDiv.id = rootId;
            document.body.appendChild(rootDiv);
        }

        const config = {
            root: `#${rootId}`,
            flow: "DEFAULT",
            data: {
                orderId,
                token: txnToken,
                tokenType: "TXN_TOKEN",
                amount,
            },
            merchant: {
                mid,
            },
            handler: {
                notifyMerchant: function (eventName: string, data: any) {
                    if (eventName?.toLowerCase().includes("close")) {
                        setIsPaytmOpen(false);
                    }
                },
            },
        };

        const initAndInvoke = () => {
            (window as any).Paytm.CheckoutJS.init(config)
                .then(() => {
                    (window as any).Paytm.CheckoutJS.invoke();
                })
                .catch((err: any) => {
                    console.error("Paytm init failed", err);
                });
        };

        if (hasOnLoad) {
            (window as any).Paytm.CheckoutJS.onLoad(initAndInvoke);
        } else {
            initAndInvoke();
        }

        return true;
    };

    const redirectToPaytm = ({
        mid,
        orderId,
        txnToken,
        amount,
    }: {
        mid: string;
        orderId: string;
        txnToken: string;
        amount: string;
    }) => {
        const form = document.createElement("form");
        form.method = "POST";
        form.action = getPaytmTxnUrl() || "";

        if (!form.action) {
            console.error("Paytm transaction URL is missing.");
            return;
        }

        const fields = {
            MID: mid,
            ORDER_ID: orderId,
            TXN_TOKEN: txnToken,
            AMOUNT: amount,
        };

        Object.entries(fields).forEach(([key, value]) => {
            const input = document.createElement("input");
            input.type = "hidden";
            input.name = key;
            input.value = value;
            form.appendChild(input);
        });

        document.body.appendChild(form);
        form.submit();
    };

    const handleGoBack = async () => {
        if (step === 3) {
            const isLoggedIn = await hasCookie("userToken");
            if (isLoggedIn) {
                router.push("/cart");
                return;
            }
        }
        dispatch(goToPreviousStep());
    };

    const getStepperStage = () => {
        if (step === 3 || step === 4) return 1; // Shipping information
        if (step === 5) return 2; // Payment details
        if (step === 6) return 3; // Order confirmation
        return 0; // For login/OTP screens
    };

    return (
        <div className="bg-background-grey">
            <div
                id="paytm-checkout"
                style={
                    isPaytmOpen
                        ? {
                              position: "fixed",
                              inset: 0,
                              zIndex: 9999,
                              backgroundColor: "rgba(0, 0, 0, 0.4)",
                              width: "100%",
                              height: "100%",
                              display: "block",
                          }
                        : { display: "none" }
                }
            />
            <div className="px-2 pt-10 lg:pt-10 lg:px-10">
                <ProgressStepper step={getStepperStage()} />
            </div>
            <div className="p-5 lg:p-10 lg:pt-0">
                <div
                    className={`lg:mt-8 grid grid-cols-1 ${
                        paymentResult === "failure" ? "" : "lg:grid-cols-2"
                    } lg:px-0 2xl:px-[168px]`}
                >
                    <div>
                        {step === 1 && (
                            <LoginStep
                                onNext={() => updateStep(2)}
                                onEdit={() => updateStep(4)}
                                setUserInput={updateUserInput}
                            />
                        )}
                        {step === 2 && (
                            <OTPStep
                                onNext={() => updateStep(3)}
                                onBack={handleGoBack}
                                userInput={userInput}
                            />
                        )}
                        {step === 3 && (
                            <AddressStep
                                onNext={() => updateStep(5)}
                                onBack={handleGoBack}
                                onEdit={() => updateStep(4)}
                                onAddNewAddress={() => {
                                    updateSelectedAddress(null);
                                    updateUserInput("");
                                    updateStep(4);
                                }}
                                setSelectedAddress={updateSelectedAddress}
                                setSelectedEmail={updateSelectedEmail}
                                setSelectedShippingAddress={
                                    updateSelectedShippingAddress
                                }
                                setSelectedBillingAddress={
                                    updateSelectedBillingAddress
                                }
                                selectedShippingAddress={
                                    selectedShippingAddress
                                }
                                isVirtual={cartData?.is_virtual ?? false}
                            />
                        )}
                        {step === 4 && (
                            <AddressFormStep
                                onBack={async (addr) => {
                                    if (addr) {
                                        updateSelectedAddress(addr);
                                    }

                                    // Check if user is logged in
                                    const isLoggedIn =
                                        await hasCookie("userToken");

                                    if (isLoggedIn) {
                                        // For logged-in users, go back to address selection (step 3)
                                        handleGoBack();
                                    } else {
                                        // For guest users, go back to login/checkout page (step 1)
                                        updateStep(1);
                                    }
                                }}
                                userInput={userInput}
                                validate={(fn) =>
                                    (validateAddressRef.current = fn)
                                }
                                selectedAddress={selectedAddress}
                                selectedEmail={selectedEmail}
                                isVirtual={cartData?.is_virtual ?? false}
                                hideBilling={true}
                            />
                        )}
                        {step === 5 && (
                            <PaymentStep
                                onBack={handleGoBack}
                                selectedMethod={selectedMethod}
                                setSelectedMethod={updateSelectedMethod}
                            />
                        )}
                        {step === 6 && (
                            <ConfirmationStep
                                paymentResult={paymentResult}
                                paymentMessage={paymentMessage}
                            />
                        )}
                    </div>

                    {paymentResult !== "failure" && (
                        <OrderSummary
                            handleProceedToPayment={handleProceedToPayment}
                            handlePaymentAndPlaceOrder={
                                handlePaymentAndPlaceOrder
                            }
                            step={step}
                            onNext={(nextStep) => updateStep(nextStep)}
                            selectedAddress={selectedAddress}
                            isLoggedIn={token}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
