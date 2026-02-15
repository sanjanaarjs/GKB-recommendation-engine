"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm, Controller } from "react-hook-form";
import {
    CREATE_CUSTOMER_ADDRESS,
    CreateCustomerAddressResponse,
    GET_COUNTRY_REGIONS,
    GetCountryRegionsResponse,
    GetCountryRegionsVariables,
    UPDATE_CUSTOMER_ADDRESS,
} from "./address.data.api";
import { useEffect, useState } from "react";
import React from "react";
import { makeStreetLines } from "@/lib/utils";
import { useMutation, useQuery } from "@apollo/client";
import { Address } from "./type";
import ChevronRight from "@/components/icons/ChevronRight";
import Text from "@/components/generic/Text";

export default function AddressEditForm({
    address,
    onBack,
    onRefresh,
}: {
    address?: Address | undefined | null;
    onBack: () => void;
    onRefresh: () => void;
}) {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<Address>({
        defaultValues: {
            firstname: address?.firstname || "",
            lastname: address?.lastname || "",
            street: makeStreetLines(address?.street),
            city: address?.city || "",
            region: address?.region || {
                region: "",
                region_code: "",
                region_id: 599,
            },
            postcode: address?.postcode || "",
            country_code: address?.country_code || "IN",
            telephone: address?.telephone || "",
            company: address?.company || "",
            vat_id: address?.vat_id || "",
            default_shipping: address?.default_shipping || false,
            default_billing: address?.default_billing || false,
        },
    });
    const id = address?.id ?? "";
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [createCustomerAddress] = useMutation<CreateCustomerAddressResponse>(
        CREATE_CUSTOMER_ADDRESS,
    );
    const [updateCustomerAddress] = useMutation<CreateCustomerAddressResponse>(
        UPDATE_CUSTOMER_ADDRESS,
    );

    const { data: countryData } = useQuery<
        GetCountryRegionsResponse,
        GetCountryRegionsVariables
    >(GET_COUNTRY_REGIONS, { variables: { countryId: "IN" } });

    // Prepare state options
    const stateOptions = countryData?.country?.available_regions || [];
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    const onSubmit = async (formData: Address) => {
        setLoading(true);
        setError(null);
        try {
            // Merge Address Line 1 and Line 2 into a single street[0] using '||' delimiter
            const DELIM = "||";
            const line1 =
                formData.street && typeof formData.street[0] !== "undefined"
                    ? String(formData.street[0]).trim()
                    : "";
            const line2 =
                formData.street && typeof formData.street[1] !== "undefined"
                    ? String(formData.street[1]).trim()
                    : "";

            const combined = line2
                ? `${line1}${line1 ? DELIM : ""}${line2}`
                : line1 || line2;

            const payload: Address = {
                ...formData,
                street: [combined], // API expects street as array
            };
            if (id) {
                await updateCustomerAddress({
                    variables: {
                        id: address?.id,
                        input: payload,
                    },
                });
                onRefresh();
            } else {
                await createCustomerAddress({
                    variables: {
                        input: payload,
                    },
                });
                onRefresh();
            }

            // Show success message
            setSuccessMessage(
                id
                    ? "Address updated successfully!"
                    : "Address added successfully!",
            );

            // Optional: auto-hide success message after 3 seconds
            setTimeout(() => {
                setSuccessMessage(null);
                if (typeof window !== "undefined") {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                }
            }, 2000);
        } catch (err) {
            console.error("Address submit failed:", err);

            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Something went wrong while saving the address.");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (address && typeof window !== "undefined") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }, [address]);

    const sanitizeName = (v: string) =>
        v.replace(/[^A-Za-z\s]/g, "").replace(/\s+/g, " ");

    const sanitizeAddress = (v: string) =>
        v
            .replace(/[^A-Za-z0-9\s\.,]/g, "")
            .replace(/^[^A-Za-z0-9]+/, "")
            .replace(/\s+/g, " ");

    return (
        <React.Fragment>
            <div className="flex items-center justify-between mt-4 md:hidden">
                <button
                    onClick={onBack}
                    className="text-sm font-semibold text-gray-600"
                >
                    <ChevronRight className="w-7 h-7" />
                </button>
            </div>

            <div>
                <div className="md:4 mt-6 grid grid-cols-1 gap-6">
                    <form
                        className="space-y-6"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        {/* First Name */}
                        <div>
                            <Controller
                                control={control}
                                name="firstname"
                                rules={{
                                    required: "First name is required *",
                                    pattern: {
                                        value: /^[A-Za-z]+(?: [A-Za-z]+)*$/,
                                        message:
                                            "Only alphabets and single spaces allowed",
                                    },
                                }}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        placeholder="* Enter your first name"
                                        className="w-full border border-border-color-light rounded-full p-5 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                                        onChange={(e) => {
                                            const cleaned = sanitizeName(
                                                e.target.value,
                                            );
                                            field.onChange(cleaned);
                                        }}
                                        value={field.value ?? ""}
                                    />
                                )}
                            />
                            {errors.firstname && (
                                <span className="text-red-500 text-xs font-avenir">
                                    {errors.firstname.message}
                                </span>
                            )}
                        </div>

                        {/* Last Name */}
                        <div>
                            <Controller
                                control={control}
                                name="lastname"
                                rules={{
                                    required: "Last name is required *",
                                    pattern: {
                                        value: /^[A-Za-z]+(?: [A-Za-z]+)*$/,
                                        message:
                                            "Only alphabets and single spaces allowed",
                                    },
                                }}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        placeholder="* Enter your last name"
                                        maxLength={60}
                                        className="w-full border border-border-color-light rounded-full p-5 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                                        onChange={(e) => {
                                            const cleaned = sanitizeName(
                                                e.target.value,
                                            );
                                            field.onChange(cleaned);
                                        }}
                                        value={field.value ?? ""}
                                    />
                                )}
                            />
                            {errors.lastname && (
                                <span className="text-red-500 text-xs font-avenir">
                                    {errors.lastname.message}
                                </span>
                            )}
                        </div>

                        {/* Mobile Number */}
                        <div>
                            <Controller
                                control={control}
                                name="telephone"
                                rules={{
                                    required: "Mobile Number is required *",
                                    pattern: {
                                        value: /^[6-9][0-9]{9}$/,
                                        message:
                                            "Please enter a valid mobile number (e.g. 9876543210 or 8765432109)",
                                    },
                                }}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        placeholder="* Enter your Mobile Number"
                                        inputMode="numeric"
                                        maxLength={10}
                                        className="w-full border border-border-color-light rounded-full p-5 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                                        onChange={(e) => {
                                            const cleaned = e.target.value
                                                .replace(/\D/g, "")
                                                .slice(0, 10);
                                            field.onChange(cleaned);
                                        }}
                                        value={field.value ?? ""}
                                    />
                                )}
                            />
                            {errors.telephone && (
                                <span className="text-red-500 text-xs font-avenir">
                                    {errors.telephone.message}
                                </span>
                            )}
                        </div>

                        {/* Street Address - Line 1 */}
                        <div>
                            <Controller
                                control={control}
                                name="street.0"
                                rules={{
                                    required: "Address Line 1 is required *",
                                    pattern: {
                                        value: /^[A-Za-z0-9][A-Za-z0-9\s\.,]*$/,
                                        message:
                                            "Only letters, numbers, spaces, . and , are allowed",
                                    },
                                    validate: (value) => {
                                        if (
                                            !value ||
                                            String(value).trim() === ""
                                        )
                                            return "Address Line 1 cannot be empty or whitespace";
                                        return true;
                                    },
                                }}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        placeholder="* House number and street name"
                                        maxLength={120}
                                        className="w-full border border-border-color-light rounded-full p-5 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                                        onChange={(e) => {
                                            const cleaned = sanitizeAddress(
                                                e.target.value,
                                            );
                                            field.onChange(cleaned);
                                        }}
                                        value={field.value ?? ""}
                                    />
                                )}
                            />

                            {errors.street?.[0] && (
                                <span className="text-red-500 text-xs font-avenir">
                                    {errors.street[0].message}
                                </span>
                            )}
                        </div>

                        {/* Street Address - Line 2 (Optional) */}
                        <div>
                            <Controller
                                control={control}
                                name="street.1"
                                rules={{
                                    pattern: {
                                        value: /^[A-Za-z0-9][A-Za-z0-9\s\.,]*$/,
                                        message:
                                            "Only letters, numbers, spaces, . and , are allowed",
                                    },
                                    // optional but if provided cannot be only whitespace and only allowed chars
                                    validate: (v) => {
                                        if (v === undefined || v === "")
                                            return true;
                                        if (String(v).trim() === "")
                                            return "Address Line 2 cannot be whitespace";
                                        return true;
                                    },
                                }}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        placeholder="Apt, suite, building, landmark (optional)"
                                        maxLength={80}
                                        className="w-full border border-border-color-light rounded-full p-5 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                                        onChange={(e) => {
                                            const cleaned = sanitizeAddress(
                                                e.target.value,
                                            );
                                            field.onChange(cleaned);
                                        }}
                                        value={field.value ?? ""}
                                    />
                                )}
                            />
                            {errors.street?.[1] && (
                                <span className="text-red-500 text-xs font-avenir">
                                    {errors.street[1].message}
                                </span>
                            )}
                        </div>

                        {/* City */}
                        <div>
                            <Input
                                placeholder="* Enter Town / City"
                                className="w-full border border-border-color-light rounded-full p-5 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                                {...register("city", {
                                    required: "City is required *",
                                    pattern: {
                                        value: /^[A-Za-z]+(?: [A-Za-z]+)*$/, // no leading whitespace
                                        message:
                                            "City cannot start with whitespace",
                                    },
                                    validate: (value) => {
                                        if (value.trim() === "")
                                            return "City cannot be empty or whitespace";
                                        return true;
                                    },
                                })}
                                onChange={(e) => {
                                    e.target.value = e.target.value.replace(
                                        /[^A-Za-z\s]/g,
                                        "",
                                    );
                                }}
                            />
                            {errors.city && (
                                <span className="text-red-500 text-xs font-avenir">
                                    {errors.city.message}
                                </span>
                            )}
                        </div>

                        {/* State */}
                        <div className="relative">
                            <Controller
                                control={control}
                                name="region"
                                rules={{
                                    validate: (value) =>
                                        value?.region &&
                                        value.region.trim() !== ""
                                            ? true
                                            : "State is required *",
                                }}
                                render={({ field }) => (
                                    <div className="relative items-center">
                                        <select
                                            {...field}
                                            value={field.value?.region || ""}
                                            onChange={(e) => {
                                                const selectedRegion =
                                                    stateOptions.find(
                                                        (region) =>
                                                            region.name ===
                                                            e.target.value,
                                                    );
                                                if (selectedRegion) {
                                                    field.onChange({
                                                        region: selectedRegion.name,
                                                        region_code:
                                                            selectedRegion.code,
                                                        region_id:
                                                            selectedRegion.id,
                                                    });
                                                } else {
                                                    field.onChange({
                                                        region: "",
                                                        region_code: "",
                                                        region_id: null,
                                                    });
                                                }
                                                setIsOpen(false);
                                            }}
                                            onFocus={() => setIsOpen(true)} // OPEN
                                            onBlur={() => {
                                                // Delay to ensure option selection completes
                                                setTimeout(
                                                    () => setIsOpen(false),
                                                    100,
                                                );
                                            }}
                                            className={`w-full h-12 rounded-full border pl-5 pr-8 text-slate-700 font-avenir text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand appearance-none ${errors.region ? "border-red-500" : "border-gray-300"}`}
                                        >
                                            <option
                                                value=""
                                                className="text-slate-700 font-avenir font-semibold"
                                            >
                                                * Select a state
                                            </option>
                                            {stateOptions.map((region) => (
                                                <option
                                                    key={region.id}
                                                    value={region.name}
                                                    className="text-slate-700"
                                                >
                                                    {region.name}
                                                </option>
                                            ))}
                                        </select>

                                        {/* Dropdown arrow */}
                                        <div
                                            className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 transition-transform duration-200 
                        ${isOpen ? "rotate-180" : "rotate-0"}
                        `}
                                        >
                                            <svg
                                                className="w-4 h-4 text-gray-500"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M19 9l-7 7-7-7"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                )}
                            />
                            {errors.region && (
                                <span className="text-red-500 text-xs font-avenir">
                                    {errors.region.message as string}
                                </span>
                            )}
                        </div>

                        {/* Pin Code */}
                        <div>
                            <Controller
                                control={control}
                                name="postcode"
                                rules={{
                                    required: "Pin code is required *",
                                    pattern: {
                                        value: /^[1-9][0-9]{5}$/,
                                        message:
                                            "Please enter a valid 6-digit Indian PIN code",
                                    },
                                }}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        placeholder="* Example: 110001"
                                        inputMode="numeric"
                                        maxLength={6}
                                        className="w-full border border-border-color-light rounded-full p-5 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                                        onChange={(e) => {
                                            const cleaned = e.target.value
                                                .replace(/\D/g, "")
                                                .slice(0, 6);
                                            field.onChange(cleaned);
                                        }}
                                        value={field.value ?? ""}
                                    />
                                )}
                            />
                            {errors.postcode && (
                                <span className="text-red-500 text-xs font-avenir">
                                    {errors.postcode.message}
                                </span>
                            )}
                        </div>

                        {/* Default Shipping */}
                        <div className="flex items-center space-x-2 pl-2">
                            <Controller
                                control={control}
                                name="default_shipping"
                                render={({ field }) => (
                                    <Checkbox
                                        className="keep h-5 w-5 cursor-pointer"
                                        checked={field.value}
                                        onCheckedChange={(val) =>
                                            field.onChange(val)
                                        }
                                    />
                                )}
                            />
                            <label className="text-sm font-normal font-avenir">
                                Set as default shipping address
                            </label>
                        </div>

                        {/* Default Billing */}
                        <div className="flex items-center space-x-2 pl-2">
                            <Controller
                                control={control}
                                name="default_billing"
                                render={({ field }) => (
                                    <Checkbox
                                        className="keep h-5 w-5 cursor-pointer"
                                        checked={field.value}
                                        onCheckedChange={(val) =>
                                            field.onChange(val)
                                        }
                                    />
                                )}
                            />
                            <label className="text-sm font-normal font-avenir">
                                Set as default billing address
                            </label>
                        </div>

                        <Text font="helvetica" className="text-xs pl-2">
                            Our expert optometrist or delivery person may call
                            this number
                        </Text>

                        {error && (
                            <div
                                className={`text-center font-avenir mb-4 p-2 rounded ${"bg-red-100 text-red-600"}`}
                            >
                                <span className="text-red-500 text-xs font-avenir">
                                    {error}
                                </span>
                            </div>
                        )}

                        {successMessage && (
                            <div
                                className={`text-center font-avenir mb-4 p-2 rounded ${"bg-green-100 text-green-600"}`}
                            >
                                <span className="text-green-500 text-sm font-avenir font-bold mb-2">
                                    {successMessage}
                                </span>
                            </div>
                        )}

                        {/* Submit */}
                        <div className="flex justify-center py-4 mt-6">
                            <Button
                                type="submit"
                                className={`rounded-full bg-brand px-[72px] py-5 text-sm md:text-xl font-bold text-white bg-font-main self-center ${!loading ? "cursor-pointer" : "cursor-not-allowed"}`}
                                disabled={loading}
                            >
                                {loading
                                    ? id
                                        ? "updating ..."
                                        : "saving ..."
                                    : address
                                      ? "update address"
                                      : "save address"}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </React.Fragment>
    );
}
