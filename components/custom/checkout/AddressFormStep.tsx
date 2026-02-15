import React, { useEffect, useState } from "react";
import ChevronLeft from "@/components/icons/ChevronLeft";
import Text from "@/components/generic/Text";
import { Input } from "@/components/ui/input";
import { setCountriesData } from "@/lib/store/checkoutSlice";
import {
    setSameAsShipping,
    setShippingFormField,
    setBillingFormField,
    setAddressFormData,
    clearAddressForm,
} from "@/lib/store/checkoutFormSlice";
import { getCountry } from "./datas/getCountriedwithRegion.api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion";
import { z } from "zod";
import { CustomerAddress } from "@/app/(default)/profile/profile.data.api";
import { Button } from "@/components/ui/button";
import {
    UPDATE_CUSTOMER_ADDRESS,
    CREATE_CUSTOMER_ADDRESS,
} from "../myAccount/addresses/address.data.api";
import { useMutation } from "@apollo/client";
import { hasCookie } from "@/lib/cookie";
export type AddressFormErrors = {
    phone?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    street?: string;
    state?: string;
    city?: string;
    pincode?: string;
};

export type AddressData = {
    shipping: {
        phone: string;
        email: string;
        firstName: string;
        lastName: string;
        street: string;
        state: string;
        city: string;
        regionId: number;
        pincode: string;
    };
    billing: {
        phone: string;
        email: string;
        firstName: string;
        lastName: string;
        street: string;
        state: string;
        city: string;
        regionId: number;
        pincode: string;
    } | null;
};

export default function AddressFormStep({
    onBack,
    userInput,
    validate,
    selectedAddress,
    selectedEmail,
    isVirtual,
    hideBilling = false,
}: Readonly<{
    onBack: (addr?: CustomerAddress | null) => void;
    userInput: string;
    validate: (fn: () => AddressData | null) => void;
    selectedAddress?: CustomerAddress | null;
    selectedEmail?: string | null;
    isVirtual: boolean;
    hideBilling?: boolean;
}>) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Get form state from Redux
    const { addressForm } = useSelector(
        (state: RootState) => state.checkoutForm,
    );
    const { sameAsShipping, shipping, billing } = addressForm;

    // country api call
    const dispatch = useDispatch();
    const countriesData = useSelector(
        (state: RootState) => state.checkout.countriesData,
    );

    // Local error states
    const [shippingErrors, setShippingErrors] = useState<AddressFormErrors>({});
    const [billingErrors, setBillingErrors] = useState<AddressFormErrors>({});

    const fetchCountries = async () => {
        const res = await getCountry("IN");
        if (res) {
            dispatch(setCountriesData(res));
        }
    };

    useEffect(() => {
        fetchCountries();
    }, []);

    // Detect if input contains phone or email
    // validate - step-1
    const isEmail = (value: string) => /\S+@\S+\.\S+/.test(value);
    const isPhone = (value: string) => /^[0-9]{7,15}$/.test(value);

    //separating the input - step-2
    const phoneValue = isPhone(userInput) ? userInput : "";
    const emailValue = isEmail(userInput) ? userInput : "";
    // Shipping State
    const [sPhone, setSPhone] = useState(phoneValue);
    const [sEmail, setSEmail] = useState(emailValue);
    const [sFirstName, setSFirstName] = useState("");
    const [sLastName, setSLastName] = useState("");
    const [sStreet, setSStreet] = useState("");
    const [sStateValue, setSStateValue] = useState("");
    const [sCity, setSCity] = useState("");
    const [sRegionId, setSRegionId] = useState<number>(0);
    const [sPincode, setSPincode] = useState<string>("");

    // biling state
    const [bPhone, setBPhone] = useState("");
    const [bEmail, setBEmail] = useState("");
    const [bFirstName, setBFirstName] = useState("");
    const [bLastName, setBLastName] = useState("");
    const [bStreet, setBStreet] = useState("");
    const [bStateValue, setBStateValue] = useState("");
    const [bCity, setBCity] = useState("");
    const [bRegionId, setBRegionId] = useState<number>(0);
    const [hasAutoFilled, setHasAutoFilled] = useState(false);
    // Helper functions to update Redux state
    const updateSameAsShipping = (value: boolean) =>
        dispatch(setSameAsShipping(value));
    const updateShippingField = (field: string, value: string | number) =>
        dispatch(
            setShippingFormField({
                field: field as keyof typeof shipping,
                value,
            }),
        );
    const updateBillingField = (field: string, value: string | number) =>
        dispatch(
            setBillingFormField({
                field: field as keyof typeof billing,
                value,
            }),
        );
    // Initialize form fields from userInput only once for guest checkout
    useEffect(() => {
        // Only auto-fill if we haven't already done so
        if (!hasAutoFilled) {
            if (phoneValue && !shipping.phone) {
                updateShippingField("phone", phoneValue);
            }
            if (emailValue && !shipping.email) {
                updateShippingField("email", emailValue);
            }
            if (selectedEmail && !shipping.email && !emailValue) {
                updateShippingField("email", selectedEmail);
            }

            // Mark as auto-filled if we populated anything
            if (phoneValue || emailValue || selectedEmail) {
                setHasAutoFilled(true);
            }
        }
    }, [phoneValue, emailValue, selectedEmail, hasAutoFilled]); // eslint-disable-line react-hooks/exhaustive-deps

    const [updateAddress] = useMutation(UPDATE_CUSTOMER_ADDRESS);
    const [createCustomerAddress] = useMutation(CREATE_CUSTOMER_ADDRESS);
    const [bPincode, setBPincode] = useState<string>("");
    // validation for all the inputs
    const addressSchema = z.object({
        phone: z
            .string()
            .min(1, { message: "Phone number is required" })
            .superRefine((val, ctx) => {
                if (val.trim() === "") return;
                const isValidPhone = /^[6-9]\d{9}$/.test(val); // Indian phone
                if (!isValidPhone) {
                    ctx.addIssue({
                        code: "custom",
                        message: "Invalid phone number",
                    });
                }
            }),
        email: z
            .string()
            .min(1, { message: "Email is required" })
            .superRefine((val, ctx) => {
                if (val.trim() === "") return; // don't validate invalid if empty

                const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
                if (!isValidEmail) {
                    ctx.addIssue({
                        code: "custom",
                        message: "Enter a valid email address",
                    });
                }
            }),
        firstName: z.string().min(1, "First name is required"),
        lastName: z.string().min(1, "Last name is required"),
        street: z.string().min(3, "Street address is required"),
        state: z.string().min(1, "State is required"),
        city: z.string().min(1, "City is required"),
        pincode: z
            .string()
            .min(1, "Pincode is required")
            .superRefine((val, ctx) => {
                if (val.trim() === "") return;
                if (!/^[1-9][0-9]{5}$/.test(val)) {
                    ctx.addIssue({
                        code: "custom",
                        message: "Invalid PIN code",
                    });
                }
            }),
    });

    // --------------------------
    // Validate Shipping
    // --------------------------

    useEffect(() => {
        const checkLogin = async () => {
            const logged = await hasCookie("userToken");
            setIsLoggedIn(!!logged);
        };

        checkLogin();
    }, []);

    useEffect(() => {
        // If we are editing an existing address, populate the form fields
        if (selectedAddress) {
            dispatch(
                setAddressFormData({
                    shipping: {
                        phone: selectedAddress.telephone || "",
                        email: shipping.email || selectedEmail || emailValue,
                        firstName: selectedAddress.firstname || "",
                        lastName: selectedAddress.lastname || "",
                        street: selectedAddress.street?.join(" ") || "",
                        state: selectedAddress.region?.region_code || "",
                        city: selectedAddress.city || "",
                        pincode: selectedAddress.postcode || "",
                        regionId: selectedAddress.region?.region_id || 0,
                    },
                    billing: {
                        phone: selectedAddress.telephone || "",
                        email: "",
                        firstName: selectedAddress.firstname || "",
                        lastName: selectedAddress.lastname || "",
                        street: selectedAddress.street?.join(" ") || "",
                        state:
                            selectedAddress.region?.region_code ||
                            selectedAddress.region?.region ||
                            "",
                        city: selectedAddress.city || "",
                        pincode: selectedAddress.postcode || "",
                        regionId: selectedAddress.region?.region_id || 0,
                    },
                }),
            );
            setHasAutoFilled(true); // Mark as initialized when editing
        } else {
            // Reset to completely empty values when adding a new address
            dispatch(clearAddressForm());
            // Reset sameAsShipping to true (default state)
            dispatch(setSameAsShipping(true));
            // Clear all error states
            setShippingErrors({});
            setBillingErrors({});
            // Reset auto-fill flag
            setHasAutoFilled(false);
        }
    }, [selectedAddress, selectedEmail, dispatch]);

    // --------------------------
    // Validate Shipping
    // --------------------------
    const validateShipping = () => {
        const result = addressSchema.safeParse({
            phone:
                shipping.phone?.trim() ||
                selectedAddress?.telephone ||
                userInput ||
                "",
            email: shipping.email || selectedEmail || emailValue,
            firstName: shipping.firstName,
            lastName: shipping.lastName,
            street: shipping.street,
            state: shipping.state,
            city: shipping.city,
            pincode: shipping.pincode,
        });

        if (!result.success) {
            const errors: AddressFormErrors = {};
            result.error.issues.forEach((i) => {
                errors[i.path[0] as keyof AddressFormErrors] = i.message;
            });
            setShippingErrors(errors);
            return null;
        }

        setShippingErrors({});
        return result.data;
    };

    // --------------------------
    // Validate Billing (only if needed)
    // --------------------------
    const validateBilling = () => {
        const result = addressSchema.safeParse({
            phone: billing.phone,
            email: billing.email,
            firstName: billing.firstName,
            lastName: billing.lastName,
            street: billing.street,
            state: billing.state,
            city: billing.city,
            pincode: billing.pincode,
        });

        if (!result.success) {
            const errors: AddressFormErrors = {};
            result.error.issues.forEach((i) => {
                errors[i.path[0] as keyof AddressFormErrors] = i.message;
            });
            setBillingErrors(errors);
            return null;
        }

        setBillingErrors({});
        return result.data;
    };

    const validateAddress = () => {
        // 1. If virtual product → ignore shipping, validate ONLY billing
        if (isVirtual) {
            const billingData = validateBilling();
            if (!billingData) return null;

            const finalBilling = {
                ...billingData,
                regionId: billing.regionId,
            };

            // Magento STILL REQUIRES shipping object → send billing as shipping
            return {
                shipping: finalBilling,
                billing: finalBilling,
            };
        }

        // 2. For NON-virtual → normal logic
        const shippingData = validateShipping();
        if (!shippingData) return null;

        // SHIPPING address object with regionId included
        const finalShipping = {
            ...shippingData,
            regionId: shipping.regionId,
        };

        // If editing EXISTING address → return ONLY shipping, billing = null
        if (selectedAddress) {
            return {
                shipping: finalShipping,
                billing: null,
            };
        }

        // If billing = same as shipping
        if (sameAsShipping) {
            return {
                shipping: finalShipping,
                billing: finalShipping,
            };
        }

        const billingData = validateBilling();
        if (!billingData) return null;

        // BILLING object with regionId included
        const finalBilling = {
            ...billingData,
            regionId: billing.regionId,
        };

        return {
            shipping: finalShipping,
            billing: finalBilling,
        };
    };

    const clearShippingError = (field: keyof AddressFormErrors) => {
        setShippingErrors((prev) => {
            const copy = { ...prev };
            delete copy[field];
            return copy;
        });
    };

    const clearBillingError = (field: keyof AddressFormErrors) => {
        setBillingErrors((prev) => {
            const copy = { ...prev };
            delete copy[field];
            return copy;
        });
    };

    useEffect(() => {
        validate(() => validateAddress());
    }, [
        shipping.phone,
        shipping.email,
        shipping.firstName,
        shipping.lastName,
        shipping.street,
        shipping.state,
        shipping.city,
        shipping.pincode,
        billing.phone,
        billing.email,
        billing.firstName,
        billing.lastName,
        billing.street,
        billing.state,
        billing.city,
        billing.pincode,
        sameAsShipping,
    ]);

    // --------------------------
    // Validate Billing (only if needed)
    // --------------------------

    const handleSubmit = async () => {
        // If submitting billing form only (when sameAsShipping is false)
        if (hideBilling && !sameAsShipping) {
            const billingData = validateBilling();
            if (!billingData) {
                console.log("Billing validation failed");
                return;
            }

            // For guest users, just save to Redux and go back
            if (!isLoggedIn) {
                onBack?.(null);
                return;
            }

            // For logged-in users, save billing address to their account
            const regionObj = countriesData?.country.available_regions.find(
                (r) => r.code === billing.state,
            );

            const input = {
                firstname: billingData.firstName,
                lastname: billingData.lastName,
                street: [billingData.street],
                city: billingData.city,
                postcode: billingData.pincode,
                telephone: billingData.phone,
                country_code: "IN",
                region: {
                    region_code: billing.state || regionObj?.code || "",
                    region: regionObj?.name || billing.state || "",
                    region_id: billing.regionId || regionObj?.id || 0,
                },
            };

            try {
                const resp = await createCustomerAddress({
                    variables: {
                        input,
                    },
                });

                const created = resp?.data?.createCustomerAddress || null;
                onBack?.(created);
            } catch (err) {
                console.error("Error saving billing address:", err);
            }
            return;
        }

        // Otherwise, validate full address (shipping + billing or just shipping)
        const validated = validateAddress();

        if (!validated) {
            console.log("Validation failed");
            return;
        }

        // For guest users, data is already saved in Redux, just go back
        if (!isLoggedIn) {
            onBack?.(null);
            return;
        }

        // For logged-in users, save address to their account
        const regionObj = countriesData?.country.available_regions.find(
            (r) => r.code === shipping.state,
        );

        const input = {
            firstname: validated.shipping.firstName,
            lastname: validated.shipping.lastName,
            street: [validated.shipping.street],
            city: validated.shipping.city,
            postcode: validated.shipping.pincode,
            telephone: validated.shipping.phone,
            country_code: "IN",
            region: {
                region_code: shipping.state || regionObj?.code || "",
                region: regionObj?.name || shipping.state || "",
                region_id: shipping.regionId || regionObj?.id || 0,
            },
        };

        try {
            // UPDATE EXISTING ADDRESS
            if (selectedAddress) {
                await updateAddress({
                    variables: {
                        id: Number(selectedAddress.id),
                        input,
                    },
                });

                onBack?.(selectedAddress);
            }
            // CREATE NEW ADDRESS
            else {
                const resp = await createCustomerAddress({
                    variables: {
                        input,
                    },
                });

                const created = resp?.data?.createCustomerAddress || null;

                // Pass created address back to parent so it can select it
                onBack?.(created);
            }
        } catch (err) {
            console.error("Error saving address:", err);
        }
    };
    const validateEmailLive = (email: string) => {
        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        return isValid;
    };

    // Handle back navigation with form data preservation
    const handleBack = () => {
        // If we are editing an existing address, preserve the selected address data
        if (selectedAddress) {
            dispatch(
                setAddressFormData({
                    sameAsShipping,
                    shipping: {
                        phone: selectedAddress.telephone || "",
                        email: selectedEmail ?? "",
                        firstName: selectedAddress.firstname || "",
                        lastName: selectedAddress.lastname || "",
                        street: selectedAddress.street?.join(" ") || "",
                        state: selectedAddress.region?.region_code || "",
                        city: selectedAddress.city || "",
                        pincode: selectedAddress.postcode || "",
                        regionId: selectedAddress.region?.region_id || 0,
                    },
                    billing: {
                        phone: selectedAddress.telephone || "",
                        email: "",
                        firstName: selectedAddress.firstname || "",
                        lastName: selectedAddress.lastname || "",
                        street: selectedAddress.street?.join(" ") || "",
                        state:
                            selectedAddress.region?.region_code ||
                            selectedAddress.region?.region ||
                            "",
                        city: selectedAddress.city || "",
                        pincode: selectedAddress.postcode || "",
                        regionId: selectedAddress.region?.region_id || 0,
                    },
                }),
            );
        } else {
            // If no selectedAddress, clear the form (add address)
            dispatch(clearAddressForm());
        }
        onBack?.(selectedAddress);
    };

    return (
        <div className="lg:pr-10 lg:pl-20 pb-8">
            <div className="flex flex-col gap-6 mb-[16px]">
                <button onClick={handleBack}>
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
                    Address edit
                </Text>
            </div>

            <Accordion
                type="single"
                collapsible
                defaultValue={isVirtual ? undefined : "address-info"}
            >
                <AccordionItem value="address-info">
                    {!isVirtual && (
                        <div className="bg-white shadow-lg p-6 rounded-[8px] my-4">
                            <AccordionTrigger className="flex hover:no-underline no-underline focus:no-underline cursor-pointer">
                                <div className="flex flex-col hover:no-underline">
                                    <Text
                                        as={"h4"}
                                        className="text-black font-helvetica text-[1rem] lg:text-[1.25rem] font-bold hover:no-underline mb-2"
                                    >
                                        Shipping details
                                    </Text>
                                    <Text
                                        as={"h4"}
                                        className="text-black font-helvetica text-sm lg:text-[1.25rem] font-normal hover:no-underline"
                                    >
                                        {isLoggedIn
                                            ? "Enter your details and checkout"
                                            : "Enter your details and checkout as a guest"}
                                    </Text>
                                </div>
                            </AccordionTrigger>

                            <AccordionContent>
                                <div className="mt-[34px] px-1">
                                    <form>
                                        {/* PHONE INPUT */}
                                        <div className="relative mb-8">
                                            <Input
                                                type="tel"
                                                autoComplete="tel"
                                                className="peer border-border-color-light rounded-full h-[64px] !text-[1rem] font-helvetica text-font-main px-[24px]"
                                                placeholder=""
                                                value={
                                                    shipping.phone || phoneValue
                                                }
                                                onChange={(e) => {
                                                    const digits =
                                                        e.target.value.replace(
                                                            /\D/g,
                                                            "",
                                                        );
                                                    const cleaned =
                                                        digits.length > 10
                                                            ? digits.slice(-10)
                                                            : digits;
                                                    updateShippingField(
                                                        "phone",
                                                        cleaned,
                                                    );
                                                    clearShippingError("phone");
                                                }}
                                                onKeyDown={(e) => {
                                                    // Allow only digits + backspace + arrows
                                                    if (
                                                        !/[0-9]/.test(e.key) &&
                                                        e.key !== "Backspace" &&
                                                        e.key !== "Tab" &&
                                                        e.key !== "ArrowLeft" &&
                                                        e.key !== "ArrowRight"
                                                    ) {
                                                        e.preventDefault();
                                                    }
                                                }}
                                            />

                                            <Text
                                                as="label"
                                                className="
                absolute left-[14px] top-[18px] bg-white px-1 
                font-helvetica text-font-main text-sm lg:text-[1.25rem] cursor-text
                transition-all duration-500 ease-in-out
                peer-focus:top-[-14px] peer-focus:text-sm
                peer-[:not(:placeholder-shown)]:top-[-14px] 
                peer-[:not(:placeholder-shown)]:text-sm
                "
                                            >
                                                * Phone Number
                                            </Text>
                                            {shippingErrors.phone && (
                                                <Text
                                                    as={"p"}
                                                    className="text-red-500 text-sm px-[24px] mt-1 font-helvetica"
                                                >
                                                    {shippingErrors.phone}
                                                </Text>
                                            )}
                                        </div>

                                        {/* EMAIL INPUT */}
                                        {!selectedAddress && (
                                            <div className="relative mb-8">
                                                <Input
                                                    className="peer border-border-color-light rounded-full h-[64px] !text-[1rem] font-helvetica text-font-main px-[24px]"
                                                    placeholder=""
                                                    value={
                                                        shipping.email ||
                                                        emailValue
                                                    }
                                                    onChange={(e) => {
                                                        const val =
                                                            e.target.value;
                                                        updateShippingField(
                                                            "email",
                                                            val,
                                                        );

                                                        // if (val === "") {
                                                        //     setShippingErrors((prev) => ({ ...prev, email: "Email is required" }));
                                                        //     return;
                                                        // }

                                                        if (
                                                            !validateEmailLive(
                                                                val,
                                                            )
                                                        ) {
                                                            setShippingErrors(
                                                                (prev) => ({
                                                                    ...prev,
                                                                    email: "Enter a valid email address",
                                                                }),
                                                            );
                                                        } else {
                                                            setShippingErrors(
                                                                (prev) => {
                                                                    const copy =
                                                                        {
                                                                            ...prev,
                                                                        };
                                                                    delete copy.email;
                                                                    return copy;
                                                                },
                                                            );
                                                        }
                                                    }}
                                                />

                                                <Text
                                                    as="label"
                                                    className="
                        absolute left-[14px] top-[18px] bg-white px-1 
                        font-helvetica text-font-main text-sm lg:text-[1.25rem] cursor-text
                        transition-all duration-500 ease-in-out
                        peer-focus:top-[-14px] peer-focus:text-sm
                        peer-[:not(:placeholder-shown)]:top-[-14px] 
                        peer-[:not(:placeholder-shown)]:text-sm
                        "
                                                >
                                                    * Email
                                                </Text>
                                                {shippingErrors.email && (
                                                    <Text
                                                        as={"p"}
                                                        className="text-red-500 text-sm px-[24px] mt-1 font-helvetica"
                                                    >
                                                        {shippingErrors.email}
                                                    </Text>
                                                )}
                                            </div>
                                        )}

                                        <div className="relative mb-8">
                                            <Input
                                                className="peer border-border-color-light rounded-full h-[64px] !text-[1rem] font-helvetica text-font-main px-[24px]"
                                                placeholder=""
                                                value={shipping.firstName}
                                                onChange={(e) => {
                                                    updateShippingField(
                                                        "firstName",
                                                        e.target.value,
                                                    );
                                                    clearShippingError(
                                                        "firstName",
                                                    );
                                                }}
                                            />

                                            <Text
                                                as="label"
                                                className="
                            absolute left-[14px] top-[18px] bg-white px-1 
                            font-helvetica text-font-main text-sm lg:text-[1.25rem] mb-2 cursor-text
                            transition-all duration-500 ease-in-out
                            peer-hover:top-[-14px] peer-hover:text-sm
                            peer-focus:top-[-14px] peer-focus:text-sm
                            peer-[:not(:placeholder-shown)]:text-sm
                            peer-[:not(:placeholder-shown)]:top-[-14px]
                            "
                                            >
                                                * First name
                                            </Text>
                                            {shippingErrors.firstName && (
                                                <Text
                                                    as={"p"}
                                                    className="text-red-500 text-sm px-[24px] mt-1 font-helvetica"
                                                >
                                                    {shippingErrors.firstName}
                                                </Text>
                                            )}
                                        </div>
                                        <div className="relative mb-8">
                                            <Input
                                                className="peer border-border-color-light rounded-full h-[64px] !text-[1rem] font-helvetica text-font-main px-[24px]"
                                                placeholder=""
                                                value={shipping.lastName}
                                                onChange={(e) => {
                                                    updateShippingField(
                                                        "lastName",
                                                        e.target.value,
                                                    );
                                                    clearShippingError(
                                                        "lastName",
                                                    );
                                                }}
                                            />

                                            <Text
                                                as="label"
                                                className="
                            absolute left-[14px] top-[18px] bg-white px-1 
                            font-helvetica text-font-main text-sm lg:text-[1.25rem] mb-2 cursor-text
                            transition-all duration-500 ease-in-out
                            peer-hover:top-[-14px] peer-hover:text-sm
                            peer-focus:top-[-14px] peer-focus:text-sm
                            peer-[:not(:placeholder-shown)]:text-sm
                            peer-[:not(:placeholder-shown)]:top-[-14px]
                            "
                                            >
                                                * Last name
                                            </Text>
                                            {shippingErrors.lastName && (
                                                <Text
                                                    as={"p"}
                                                    className="text-red-500 text-sm px-[24px] mt-1 font-helvetica"
                                                >
                                                    {shippingErrors.lastName}
                                                </Text>
                                            )}
                                        </div>
                                        <div className="relative mb-8">
                                            <Input
                                                className="peer border-border-color-light rounded-full h-[64px] !text-[1rem] font-helvetica text-font-main px-[24px]"
                                                placeholder=""
                                                value={shipping.street}
                                                onChange={(e) => {
                                                    updateShippingField(
                                                        "street",
                                                        e.target.value,
                                                    );
                                                    clearShippingError(
                                                        "street",
                                                    );
                                                }}
                                            />

                                            <Text
                                                as="label"
                                                className="
                            absolute left-[14px] top-[18px] bg-white px-1 
                            font-helvetica text-font-main text-sm lg:text-[1.25rem] mb-2 cursor-text
                            transition-all duration-500 ease-in-out
                            peer-hover:top-[-14px] peer-hover:text-sm
                            peer-focus:top-[-14px] peer-focus:text-sm
                            peer-[:not(:placeholder-shown)]:text-sm
                            peer-[:not(:placeholder-shown)]:top-[-14px]
                            "
                                            >
                                                * Street address
                                            </Text>
                                            {shippingErrors.street && (
                                                <Text
                                                    as={"p"}
                                                    className="text-red-500 text-sm px-[24px] mt-1 font-helvetica"
                                                >
                                                    {shippingErrors.street}
                                                </Text>
                                            )}
                                        </div>
                                        <div className="flex lg:flex-row flex-col gap-2">
                                            <div className="relative w-full mb-8">
                                                <select
                                                    className="
        peer border border-border-color-light rounded-full h-[64px] px-4 
        text-[1rem] font-helvetica text-font-main bg-white
        appearance-none outline-none w-full
    "
                                                    value={shipping.state}
                                                    onChange={(e) => {
                                                        const code =
                                                            e.target.value;
                                                        updateShippingField(
                                                            "state",
                                                            code,
                                                        );
                                                        const regionObj =
                                                            countriesData?.country.available_regions.find(
                                                                (r) =>
                                                                    r.code ===
                                                                    code,
                                                            );
                                                        updateShippingField(
                                                            "regionId",
                                                            regionObj?.id || 0,
                                                        );
                                                        clearShippingError(
                                                            "state",
                                                        );
                                                    }}
                                                >
                                                    {/* Placeholder */}
                                                    <option
                                                        value=""
                                                        disabled
                                                        hidden
                                                    >
                                                        Select your state
                                                    </option>
                                                    {countriesData?.country?.available_regions?.map(
                                                        (region) => (
                                                            <option
                                                                key={region.id}
                                                                value={
                                                                    region.code
                                                                }
                                                            >
                                                                {region.name}
                                                            </option>
                                                        ),
                                                    )}
                                                </select>

                                                <Text
                                                    as="label"
                                                    className="
                absolute left-[14px] top-[18px] bg-white px-1 
                font-helvetica text-font-main text-sm lg:text-[1.25rem] cursor-text
                transition-all duration-500 ease-in-out

                /* Move on select click */
                peer-focus:top-[-14px]
                peer-focus:text-sm

                /* Move when value is selected */
                peer-[&:not([value=''])]:top-[-14px]
                peer-[&:not([value=''])]:text-sm
            "
                                                >
                                                    * State
                                                </Text>

                                                {/* Dropdown arrow */}
                                                <span className="pointer-events-none absolute right-5 top-[26px] text-gray-400">
                                                    ▼
                                                </span>
                                                {shippingErrors.state && (
                                                    <p className="text-red-500 text-sm px-[24px] mt-1 font-helvetica">
                                                        {shippingErrors.state}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="relative w-full mb-8">
                                                <Input
                                                    className="peer border-border-color-light rounded-full h-[64px] !text-[1rem] font-helvetica text-font-main px-[24px]"
                                                    placeholder=""
                                                    value={shipping.city}
                                                    onChange={(e) => {
                                                        const val =
                                                            e.target.value;
                                                        if (
                                                            /^[A-Za-z ]+$/.test(
                                                                val.trim(),
                                                            ) ||
                                                            val === ""
                                                        ) {
                                                            updateShippingField(
                                                                "city",
                                                                val,
                                                            );
                                                            clearShippingError(
                                                                "city",
                                                            );
                                                        }
                                                    }}
                                                />

                                                <Text
                                                    as="label"
                                                    className="
                            absolute left-[14px] top-[18px] bg-white px-1 
                            font-helvetica text-font-main text-sm lg:text-[1.25rem] mb-2 cursor-text
                            transition-all duration-500 ease-in-out
                            peer-hover:top-[-14px] peer-hover:text-sm
                            peer-focus:top-[-14px] peer-focus:text-sm
                            peer-[:not(:placeholder-shown)]:text-sm
                            peer-[:not(:placeholder-shown)]:top-[-14px]
                            "
                                                >
                                                    * City
                                                </Text>
                                                {shippingErrors.city && (
                                                    <p className="text-red-500 text-sm px-[24px] mt-1 font-helvetica">
                                                        {shippingErrors.city}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        {/* PINCODE INPUT */}
                                        <div className="relative mb-8">
                                            <Input
                                                className="peer border-border-color-light rounded-full h-[64px] !text-[1rem] font-helvetica text-font-main px-[24px]"
                                                placeholder=""
                                                value={shipping.pincode}
                                                onChange={(e) => {
                                                    const val = e.target.value
                                                        .replace(/\D/g, "")
                                                        .slice(0, 6);
                                                    updateShippingField(
                                                        "pincode",
                                                        val,
                                                    );
                                                    clearShippingError(
                                                        "pincode",
                                                    );
                                                }}
                                                onKeyDown={(e) => {
                                                    if (
                                                        !/[0-9]/.test(e.key) &&
                                                        e.key !== "Backspace" &&
                                                        e.key !== "Tab" &&
                                                        e.key !== "ArrowLeft" &&
                                                        e.key !== "ArrowRight"
                                                    ) {
                                                        e.preventDefault();
                                                    }
                                                }}
                                            />

                                            <Text
                                                as="label"
                                                className="
                                                    absolute left-[14px] top-[18px] bg-white px-1 
                                                    font-helvetica text-font-main text-sm lg:text-[1.25rem] cursor-text
                                                    transition-all duration-500 ease-in-out
                                                    peer-focus:top-[-14px] peer-focus:text-sm
                                                    peer-[:not(:placeholder-shown)]:top-[-14px] 
                                                    peer-[:not(:placeholder-shown)]:text-sm
                                                "
                                            >
                                                * Pincode
                                            </Text>
                                            {shippingErrors.pincode && (
                                                <Text
                                                    as={"p"}
                                                    className="text-red-500 text-sm px-[24px] mt-1 font-helvetica"
                                                >
                                                    {shippingErrors.pincode}
                                                </Text>
                                            )}
                                        </div>
                                        {isLoggedIn &&
                                            (!hideBilling ||
                                                sameAsShipping) && (
                                                <div className="flex gap-3">
                                                    <div className="w-full text-center">
                                                        <Button
                                                            type="button"
                                                            onClick={
                                                                handleSubmit
                                                            }
                                                            className="cursor-pointer my-4 rounded-full bg-black text-white hover:bg-gray-900 w-full max-w-[340px] p-[24px] font-helvetica text-sm lg:text-[1.25rem] leading-normal font-bold mx-auto"
                                                        >
                                                            {selectedAddress
                                                                ? "save address"
                                                                : "add address"}
                                                        </Button>
                                                    </div>
                                                </div>
                                            )}
                                    </form>
                                </div>
                                {/* End Form */}
                            </AccordionContent>
                        </div>
                    )}
                    {!selectedAddress && hideBilling && (
                        <div className="bg-white shadow-lg p-6 rounded-[8px] my-4">
                            <Text
                                as="h4"
                                className="text-black font-helvetica text-sm lg:text-sm lg:text-[1.25rem] font-bold mb-[8px]"
                            >
                                Billing address
                            </Text>
                            {!isVirtual && (
                                <div className="flex items-center gap-3 mt-3">
                                    <input
                                        type="checkbox"
                                        checked={sameAsShipping}
                                        onChange={(e) => {
                                            updateSameAsShipping(
                                                e.target.checked,
                                            );

                                            // NEW: Trigger billing validation immediately when checkbox unchecked
                                            if (!e.target.checked) {
                                                validateBilling(); // <-- this sets billingErrors immediately
                                            } else {
                                                setBillingErrors({}); // clear when checking again
                                            }
                                        }}
                                        className="w-4 h-4 border-1 border-black rounded-none accent-black mb-[4px]"
                                    />
                                    <Text
                                        as="h4"
                                        className="text-black font-helvetica text-sm lg:text-[1.25rem] font-normal"
                                    >
                                        Same as shipping address
                                    </Text>
                                </div>
                            )}
                            {/* BILLING FORM — visible ONLY if not sameAsShipping */}
                            {hideBilling && (isVirtual || !sameAsShipping) && (
                                <div className="mt-[34px] px-1">
                                    <form>
                                        {/* PHONE INPUT */}
                                        <div className="relative mb-8">
                                            <Input
                                                className="peer border-border-color-light rounded-full h-[64px] !text-[1rem] font-helvetica text-font-main px-[24px]"
                                                placeholder=""
                                                value={billing.phone}
                                                onChange={(e) => {
                                                    const input =
                                                        e.target.value;

                                                    // Allow only digits
                                                    if (/^\d*$/.test(input)) {
                                                        // Limit to 10 digits
                                                        if (
                                                            input.length <= 10
                                                        ) {
                                                            updateBillingField(
                                                                "phone",
                                                                input,
                                                            );
                                                            clearBillingError(
                                                                "phone",
                                                            );
                                                        }
                                                    }
                                                }}
                                                onKeyDown={(e) => {
                                                    if (
                                                        !/[0-9]/.test(e.key) &&
                                                        e.key !== "Backspace" &&
                                                        e.key !== "Tab" &&
                                                        e.key !== "ArrowLeft" &&
                                                        e.key !== "ArrowRight"
                                                    ) {
                                                        e.preventDefault();
                                                    }
                                                }}
                                            />

                                            <Text
                                                as="label"
                                                className="
                    absolute left-[14px] top-[18px] bg-white px-1 
                    font-helvetica text-font-main text-sm lg:text-[1.25rem] cursor-text
                    transition-all duration-500 ease-in-out
                    peer-focus:top-[-14px] peer-focus:text-sm
                    peer-[:not(:placeholder-shown)]:top-[-14px] 
                    peer-[:not(:placeholder-shown)]:text-sm
                    "
                                            >
                                                * Phone Number
                                            </Text>
                                            {billingErrors.phone && (
                                                <Text
                                                    as={"p"}
                                                    className="text-red-500 text-sm px-[24px] mt-1 font-helvetica"
                                                >
                                                    {billingErrors.phone}
                                                </Text>
                                            )}
                                        </div>

                                        {/* EMAIL INPUT */}
                                        <div className="relative mb-8">
                                            <Input
                                                className="peer border-border-color-light rounded-full h-[64px] !text-[1rem] font-helvetica text-font-main px-[24px]"
                                                placeholder=""
                                                value={billing.email}
                                                onChange={(e) => {
                                                    const val = e.target.value;
                                                    updateBillingField(
                                                        "email",
                                                        val,
                                                    );

                                                    // if (val === "") {
                                                    //     setBillingErrors((prev) => ({ ...prev, email: "Email is required" }));
                                                    //     return;
                                                    // }

                                                    if (
                                                        !validateEmailLive(val)
                                                    ) {
                                                        setBillingErrors(
                                                            (prev) => ({
                                                                ...prev,
                                                                email: "Enter a valid email address",
                                                            }),
                                                        );
                                                    } else {
                                                        setBillingErrors(
                                                            (prev) => {
                                                                const copy = {
                                                                    ...prev,
                                                                };
                                                                delete copy.email;
                                                                return copy;
                                                            },
                                                        );
                                                    }
                                                }}
                                            />

                                            <Text
                                                as="label"
                                                className="
                    absolute left-[14px] top-[18px] bg-white px-1 
                    font-helvetica text-font-main text-sm lg:text-[1.25rem] cursor-text
                    transition-all duration-500 ease-in-out
                    peer-focus:top-[-14px] peer-focus:text-sm
                    peer-[:not(:placeholder-shown)]:top-[-14px] 
                    peer-[:not(:placeholder-shown)]:text-sm
                    "
                                            >
                                                * Email
                                            </Text>
                                            {billingErrors.email && (
                                                <Text
                                                    as={"p"}
                                                    className="text-red-500 text-sm px-[24px] mt-1 font-helvetica"
                                                >
                                                    {billingErrors.email}
                                                </Text>
                                            )}
                                        </div>

                                        <div className="relative mb-8">
                                            <Input
                                                className="peer border-border-color-light rounded-full h-[64px] !text-[1rem] font-helvetica text-font-main px-[24px]"
                                                placeholder=""
                                                value={billing.firstName}
                                                onChange={(e) => {
                                                    updateBillingField(
                                                        "firstName",
                                                        e.target.value,
                                                    );
                                                    clearBillingError(
                                                        "firstName",
                                                    );
                                                }}
                                            />

                                            <Text
                                                as="label"
                                                className="
                                absolute left-[14px] top-[18px] bg-white px-1 
                                font-helvetica text-font-main text-sm lg:text-[1.25rem] mb-2 cursor-text
                                transition-all duration-500 ease-in-out
                                peer-hover:top-[-14px] peer-hover:text-sm
                                peer-focus:top-[-14px] peer-focus:text-sm
                                peer-[:not(:placeholder-shown)]:text-sm
                                peer-[:not(:placeholder-shown)]:top-[-14px]
                                "
                                            >
                                                * First name
                                            </Text>
                                            {billingErrors.firstName && (
                                                <Text
                                                    as={"p"}
                                                    className="text-red-500 text-sm px-[24px] mt-1 font-helvetica"
                                                >
                                                    {billingErrors.firstName}
                                                </Text>
                                            )}
                                        </div>
                                        <div className="relative mb-8">
                                            <Input
                                                className="peer border-border-color-light rounded-full h-[64px] !text-[1rem] font-helvetica text-font-main px-[24px]"
                                                placeholder=""
                                                value={billing.lastName}
                                                onChange={(e) => {
                                                    updateBillingField(
                                                        "lastName",
                                                        e.target.value,
                                                    );
                                                    clearBillingError(
                                                        "lastName",
                                                    );
                                                }}
                                            />

                                            <Text
                                                as="label"
                                                className="
                                absolute left-[14px] top-[18px] bg-white px-1 
                                font-helvetica text-font-main text-sm lg:text-[1.25rem] mb-2 cursor-text
                                transition-all duration-500 ease-in-out
                                peer-hover:top-[-14px] peer-hover:text-sm
                                peer-focus:top-[-14px] peer-focus:text-sm
                                peer-[:not(:placeholder-shown)]:text-sm
                                peer-[:not(:placeholder-shown)]:top-[-14px]
                                "
                                            >
                                                * Last name
                                            </Text>
                                            {billingErrors.lastName && (
                                                <Text
                                                    as={"p"}
                                                    className="text-red-500 text-sm px-[24px] mt-1 font-helvetica"
                                                >
                                                    {billingErrors.lastName}
                                                </Text>
                                            )}
                                        </div>
                                        <div className="relative mb-8">
                                            <Input
                                                className="peer border-border-color-light rounded-full h-[64px] !text-[1rem] font-helvetica text-font-main px-[24px]"
                                                placeholder=""
                                                value={billing.street}
                                                onChange={(e) => {
                                                    updateBillingField(
                                                        "street",
                                                        e.target.value,
                                                    );
                                                    clearBillingError("street");
                                                }}
                                            />

                                            <Text
                                                as="label"
                                                className="
                                absolute left-[14px] top-[18px] bg-white px-1 
                                font-helvetica text-font-main text-sm lg:text-[1.25rem] mb-2 cursor-text
                                transition-all duration-500 ease-in-out
                                peer-hover:top-[-14px] peer-hover:text-sm
                                peer-focus:top-[-14px] peer-focus:text-sm
                                peer-[:not(:placeholder-shown)]:text-sm
                                peer-[:not(:placeholder-shown)]:top-[-14px]
                                "
                                            >
                                                * Street address
                                            </Text>
                                            {billingErrors.street && (
                                                <Text
                                                    as={"p"}
                                                    className="text-red-500 text-sm px-[24px] mt-1 font-helvetica"
                                                >
                                                    {billingErrors.street}
                                                </Text>
                                            )}
                                        </div>
                                        <div className="flex lg:flex-row flex-col gap-2">
                                            <div className="relative w-full mb-8">
                                                <select
                                                    className="
            peer border border-border-color-light rounded-full h-[64px] px-4 
            text-[1rem] font-helvetica text-font-main bg-white
            appearance-none outline-none w-full
        "
                                                    value={billing.state}
                                                    onChange={(e) => {
                                                        const code =
                                                            e.target.value;
                                                        updateBillingField(
                                                            "state",
                                                            code,
                                                        );
                                                        const regionObj =
                                                            countriesData?.country.available_regions.find(
                                                                (r) =>
                                                                    r.code ===
                                                                    code,
                                                            );
                                                        updateBillingField(
                                                            "regionId",
                                                            regionObj?.id || 0,
                                                        );
                                                        clearBillingError(
                                                            "state",
                                                        );
                                                    }}
                                                >
                                                    {/* Placeholder */}
                                                    <option
                                                        value=""
                                                        disabled
                                                        hidden
                                                    >
                                                        Select your state
                                                    </option>
                                                    {countriesData?.country?.available_regions?.map(
                                                        (region) => (
                                                            <option
                                                                key={region.id}
                                                                value={
                                                                    region.code
                                                                }
                                                            >
                                                                {region.name}
                                                            </option>
                                                        ),
                                                    )}
                                                </select>

                                                <Text
                                                    as="label"
                                                    className="
                    absolute left-[14px] top-[18px] bg-white px-1 
                    font-helvetica text-font-main text-sm lg:text-[1.25rem] cursor-text
                    transition-all duration-500 ease-in-out

                    /* Move on select click */
                    peer-focus:top-[-14px]
                    peer-focus:text-sm

                    /* Move when value is selected */
                    peer-[&:not([value=''])]:top-[-14px]
                    peer-[&:not([value=''])]:text-sm
                "
                                                >
                                                    * State
                                                </Text>

                                                {/* Dropdown arrow */}
                                                <span className="pointer-events-none absolute right-5 top-[26px] text-gray-400">
                                                    ▼
                                                </span>
                                                {billingErrors.state && (
                                                    <p className="text-red-500 text-sm px-[24px] mt-1 font-helvetica">
                                                        {billingErrors.state}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="relative w-full mb-8">
                                                <Input
                                                    className="peer border-border-color-light rounded-full h-[64px] !text-[1rem] font-helvetica text-font-main px-[24px]"
                                                    placeholder=""
                                                    value={billing.city}
                                                    onChange={(e) => {
                                                        const val =
                                                            e.target.value;
                                                        if (
                                                            /^[A-Za-z ]+$/.test(
                                                                val.trim(),
                                                            ) ||
                                                            val === ""
                                                        ) {
                                                            updateBillingField(
                                                                "city",
                                                                val,
                                                            );
                                                            clearBillingError(
                                                                "city",
                                                            );
                                                        }
                                                    }}
                                                />

                                                <Text
                                                    as="label"
                                                    className="
                                absolute left-[14px] top-[18px] bg-white px-1 
                                font-helvetica text-font-main text-sm lg:text-[1.25rem] mb-2 cursor-text
                                transition-all duration-500 ease-in-out
                                peer-hover:top-[-14px] peer-hover:text-sm
                                peer-focus:top-[-14px] peer-focus:text-sm
                                peer-[:not(:placeholder-shown)]:text-sm
                                peer-[:not(:placeholder-shown)]:top-[-14px]
                                "
                                                >
                                                    * City
                                                </Text>
                                                {billingErrors.city && (
                                                    <p className="text-red-500 text-sm px-[24px] mt-1 font-helvetica">
                                                        {billingErrors.city}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        {/* PINCODE INPUT */}
                                        <div className="relative mb-8">
                                            <Input
                                                className="peer border-border-color-light rounded-full h-[64px] !text-[1rem] font-helvetica text-font-main px-[24px]"
                                                placeholder=""
                                                value={billing.pincode}
                                                onChange={(e) => {
                                                    const val = e.target.value
                                                        .replace(/\D/g, "")
                                                        .slice(0, 6);
                                                    updateBillingField(
                                                        "pincode",
                                                        val,
                                                    );
                                                    clearBillingError(
                                                        "pincode",
                                                    );
                                                }}
                                                onKeyDown={(e) => {
                                                    if (
                                                        !/[0-9]/.test(e.key) &&
                                                        e.key !== "Backspace" &&
                                                        e.key !== "Tab" &&
                                                        e.key !== "ArrowLeft" &&
                                                        e.key !== "ArrowRight"
                                                    ) {
                                                        e.preventDefault();
                                                    }
                                                }}
                                            />

                                            <Text
                                                as="label"
                                                className="
                                                        absolute left-[14px] top-[18px] bg-white px-1 
                                                        font-helvetica text-font-main text-sm lg:text-[1.25rem] cursor-text
                                                        transition-all duration-500 ease-in-out
                                                        peer-focus:top-[-14px] peer-focus:text-sm
                                                        peer-[:not(:placeholder-shown)]:top-[-14px] 
                                                        peer-[:not(:placeholder-shown)]:text-sm
                                                    "
                                            >
                                                * Pincode
                                            </Text>
                                            {billingErrors.pincode && (
                                                <Text
                                                    as={"p"}
                                                    className="text-red-500 text-sm px-[24px] mt-1 font-helvetica"
                                                >
                                                    {billingErrors.pincode}
                                                </Text>
                                            )}
                                        </div>
                                        {isLoggedIn &&
                                            hideBilling &&
                                            !sameAsShipping && (
                                                <div className="flex gap-3">
                                                    <div className="w-full text-center">
                                                        <Button
                                                            type="button"
                                                            onClick={
                                                                handleSubmit
                                                            }
                                                            className="cursor-pointer my-4 rounded-full bg-black text-white hover:bg-gray-900 w-full max-w-[340px] p-[24px] font-helvetica text-sm lg:text-[1.25rem] leading-normal font-bold mx-auto"
                                                        >
                                                            {selectedAddress
                                                                ? "save address"
                                                                : "add address"}
                                                        </Button>
                                                    </div>
                                                </div>
                                            )}
                                    </form>
                                </div>
                            )}
                        </div>
                    )}
                </AccordionItem>
            </Accordion>
        </div>
    );
}
