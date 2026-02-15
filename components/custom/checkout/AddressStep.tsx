import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion";
import ChevronLeft from "@/components/icons/ChevronLeft";
import Text from "@/components/generic/Text";
import ChevronRight from "@/components/icons/ChevronRight";
import {
    Customer,
    CustomerAddress,
    getCustomerData,
} from "@/app/(default)/profile/profile.data.api";
import { getCookieValue } from "@/lib/cookie";
import { useDispatch } from "react-redux";
import { setCustomerAddressData } from "@/lib/store/checkoutSlice";

export default function AddressStep({
    onBack,
    onEdit,
    onAddNewAddress,
    setSelectedAddress,
    setSelectedEmail,
    setSelectedShippingAddress,
    setSelectedBillingAddress,
    selectedShippingAddress,
    isVirtual,
}: Readonly<{
    onNext: () => void;
    onBack: () => void;
    onEdit: () => void;
    onAddNewAddress: () => void;
    setSelectedAddress: (addr: CustomerAddress) => void;
    setSelectedEmail: (email: string) => void;
    setSelectedShippingAddress: (id: number | null) => void;
    setSelectedBillingAddress: (id: number | null) => void;
    selectedShippingAddress: number | null;
    isVirtual: boolean;
}>) {
    const [customer, setCustomer] = useState<Customer | null>(null);
    const [useShippingAsBilling, setUseShippingAsBilling] = useState(true);
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchCustomer = async () => {
            // GET TOKEN
            const token = await getCookieValue("userToken");
            let userToken: string | null = null;

            if (token) {
                try {
                    userToken = atob(token); // decode base64
                } catch {
                    userToken = token; // fallback
                }
            }

            if (!userToken) {
                console.warn("No user token found");
                setLoading(false);
                return;
            }

            // CALL CUSTOMER API
            const res = await getCustomerData(userToken);

            // dispatch into store
            dispatch(setCustomerAddressData({ customer: res }));

            setSelectedEmail(res?.email || "");

            if (res && res.addresses?.length === 0) {
                onEdit();
                return;
            }

            setCustomer(res);
            setLoading(false);
        };

        fetchCustomer();
    }, []);

    useEffect(() => {
        if (useShippingAsBilling && selectedShippingAddress) {
            setSelectedBillingAddress(Number(selectedShippingAddress));
        }
    }, [useShippingAsBilling, selectedShippingAddress]);

    useEffect(() => {
        if (customer?.addresses?.length) {
            // -------------------------
            // VIRTUAL PRODUCT (NO SHIPPING)
            // -------------------------
            if (isVirtual) {
                const billingAddr =
                    customer.addresses.find((a) => a.default_billing) ||
                    customer.addresses[0];

                setSelectedBillingAddress(Number(billingAddr.id));
                return; //
            }

            // find default shipping
            const defaultAddr =
                customer.addresses.find((a) => a.default_shipping) ||
                customer.addresses[0];

            setSelectedShippingAddress(Number(defaultAddr.id));

            if (useShippingAsBilling) {
                setSelectedBillingAddress(Number(defaultAddr.id));
            }
        }
    }, [customer]);

    if (loading) return null;

    return (
        <div className="lg:pr-10 lg:pl-20 pb-8">
            <div className="flex flex-col gap-6 mb-[16px]">
                <button onClick={onBack}>
                    {" "}
                    <ChevronLeft size={24} fill="black" />
                </button>

                <Text
                    as={"h1"}
                    className="text-black font-helvetica text-[1rem] lg:text-[2rem] font-light mb-[16px] hidden"
                >
                    Where should we deliver your order?
                </Text>
            </div>

            <div className="bg-white shadow-lg p-6 rounded-[8px]">
                <Text
                    as={"h4"}
                    className="text-green-700 font-helvetica text-sm lg:text-[1.25rem] font-normal mb-[8px] hidden"
                >
                    You are successfully logged in!
                </Text>

                {!isVirtual && (
                    <Accordion type="single" collapsible defaultValue="saved">
                        <AccordionItem value="saved">
                            <AccordionTrigger className="group hover:no-underline [&>*]:hover:no-underline">
                                <div>
                                    <Text
                                        as="h4"
                                        className="text-black font-helvetica text-base lg:text-[1.25rem] font-bold mb-[8px]"
                                    >
                                        Shipping address
                                    </Text>
                                    <Text
                                        as="h4"
                                        className="text-black font-helvetica text-sm lg:text-[1.25rem] font-normal"
                                    >
                                        Select from saved addresses
                                    </Text>

                                    <button
                                        type="button"
                                        className="text-base lg:text-[1.25rem] font-helvetica italic leading-normal font-normal cursor-pointer flex items-start gap-4 shadow-none p-0"
                                        onClick={onAddNewAddress}
                                        aria-label="Add new address"
                                    >
                                        Add new address
                                        <div className="hidden lg:block italic">
                                            <ChevronRight
                                                size={16}
                                                fill="black"
                                            />
                                        </div>
                                        <div className="lg:hidden block italic">
                                            <ChevronRight
                                                size={10}
                                                fill="black"
                                            />
                                        </div>
                                    </button>
                                </div>
                            </AccordionTrigger>

                            <AccordionContent>
                                <div className="my-[32px]">
                                    {customer?.addresses?.map((addr, index) => (
                                        <div
                                            key={addr.id}
                                            className="flex items-start gap-4 mb-[32px]"
                                        >
                                            <input
                                                type="radio"
                                                name="addr"
                                                onChange={() => {
                                                    setSelectedShippingAddress(
                                                        Number(addr.id),
                                                    ); // shipping
                                                }}
                                                className="mt-1 w-6 h-6 border-2 border-black rounded-full checked:bg-black checked:border-black accent-black"
                                                defaultChecked={
                                                    index === 0 ||
                                                    addr.default_shipping
                                                }
                                            />

                                            <div className="flex-1">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <Text
                                                            as="h4"
                                                            className="text-black font-helvetica text-sm lg:text-[1.25rem] font-normal"
                                                        >
                                                            {addr.firstname}{" "}
                                                            {addr.lastname}
                                                        </Text>

                                                        <Text
                                                            as="h4"
                                                            className="text-black font-helvetica text-sm lg:text-[1.25rem] font-normal w-full"
                                                        >
                                                            {addr.street.join(
                                                                ", ",
                                                            )}
                                                            , {addr.city} -{" "}
                                                            {addr.postcode}
                                                        </Text>
                                                    </div>

                                                    <button
                                                        type="button"
                                                        className="text-base lg:text-[1.25rem] font-helvetica italic leading-normal font-normal cursor-pointer flex items-start gap-4 shadow-none p-0"
                                                        onClick={() => {
                                                            setSelectedAddress(
                                                                addr,
                                                            );
                                                            onEdit();
                                                        }}
                                                    >
                                                        Edit
                                                        <div className="hidden lg:block italic">
                                                            <ChevronRight
                                                                size={16}
                                                                fill="black"
                                                            />
                                                        </div>
                                                        <div className="lg:hidden block italic">
                                                            <ChevronRight
                                                                size={10}
                                                                fill="black"
                                                            />
                                                        </div>
                                                    </button>
                                                </div>

                                                {addr.default_shipping && (
                                                    <div className="mt-3">
                                                        <Button
                                                            type="button"
                                                            size="sm"
                                                            className="border rounded-none border-border-color-light text-xs font-normal leading-[18px] text-black bg-background-grey px-2 py-1 cursor-pointer"
                                                        >
                                                            Deliver here
                                                        </Button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}

                                    {/* <button
                                    type="button"
                                    className="text-[1.25rem] font-helvetica italic leading-normal font-normal cursor-pointer flex items-start gap-4 shadow-none p-0"
                                >
                                    View more addresses
                                    <div className="italic">
                                        <ChevronRight
                                            size={16}
                                            fill="black"
                                            className="rotate-90"
                                        />
                                    </div>
                                </button> */}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                )}

                <div className="mt-6">
                    <Text
                        as="h4"
                        className="text-black font-helvetica text-base lg:text-[1.25rem] font-bold mb-[8px]"
                    >
                        Billing address
                    </Text>

                    {/* CHECKBOX: Same as shipping */}
                    {!isVirtual && (
                        <div className="flex items-center gap-3 mt-3">
                            <input
                                type="checkbox"
                                checked={useShippingAsBilling}
                                onChange={(e) =>
                                    setUseShippingAsBilling(e.target.checked)
                                }
                                className="w-4 h-4 lg:w-6 lg:h-6 border-2 border-black rounded-full checked:bg-black checked:border-black accent-black"
                            />
                            <Text
                                as="h4"
                                className="text-black font-helvetica text-base lg:text-[1.25rem] font-normal"
                            >
                                Same as shipping address
                            </Text>
                        </div>
                    )}

                    {/* SHOW billing addresses ONLY when checkbox is unchecked */}
                    {(isVirtual || !useShippingAsBilling) && (
                        <div className="mt-6">
                            {customer?.addresses?.map((addr) => (
                                <div
                                    key={addr.id}
                                    className="flex items-start gap-4 mb-[32px]"
                                >
                                    {/* radio buttons for billing */}
                                    <input
                                        type="radio"
                                        name="billing"
                                        onChange={() => {
                                            setSelectedBillingAddress(
                                                Number(addr.id),
                                            );
                                        }}
                                        className="mt-1 w-6 h-6 border-2 border-black rounded-full checked:bg-black checked:border-black accent-black"
                                        defaultChecked={addr.default_billing}
                                    />

                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <Text
                                                    as="h4"
                                                    className="text-black font-helvetica text-sm lg:text-[1.25rem] font-normal"
                                                >
                                                    {addr.firstname}{" "}
                                                    {addr.lastname}
                                                </Text>
                                                <Text
                                                    as="h4"
                                                    className="text-black font-helvetica text-sm lg:text-[1.25rem] font-normal w-full"
                                                >
                                                    {addr.street.join(", ")},{" "}
                                                    {addr.city} -{" "}
                                                    {addr.postcode}
                                                </Text>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
