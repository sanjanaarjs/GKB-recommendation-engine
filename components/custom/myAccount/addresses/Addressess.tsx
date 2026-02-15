"use client";
import Text from "@/components/generic/Text";
import { Plus } from "lucide-react";
import AddressList from "./AddressList";
import React, { useState } from "react";
import ShippingAddressForm from "./AddAddresssForm";
import ChevronLeft from "@/components/icons/ChevronLeft";
import { useRouter } from "next/navigation";
import SignOut from "@/components/icons/SignOut";
import AddressDeleteForm from "./AddressDeleteModal";
import { useQuery } from "@apollo/client";
import {
    GET_CUSTOMER_ADDRESSES,
    GetCustomerAddressesResponse,
} from "./address.data.api";
import { Address } from "./type";
import { Button } from "@/components/ui/button";
import { useLogout } from "@/lib/hooks/useLogout";

export default function AddressMain() {
    const [isAddNewAddress, setIsAddNewAddress] = useState(false);
    const router = useRouter();
    const [isAddDeleteModal, setIsAddDeleteModal] = useState(false);
    const { data, loading, refetch } = useQuery<GetCustomerAddressesResponse>(
        GET_CUSTOMER_ADDRESSES,
    );
    const [addressId, setAddressId] = useState<null | string>(null);
    const [initialAddress, setInitialAddress] = useState<Address>();
    const { handleLogout } = useLogout();

    const refreshAddressList = () => {
        refetch();
        setTimeout(() => {
            setInitialAddress(undefined);
            setIsAddNewAddress((prev) => !prev);
        }, 1000);
    };

    if (isAddNewAddress) {
        return (
            <section className="flex h-full w-full flex-col gap-y-6">
                <div
                    className="flex justify-between lg:hidden -mt-3 pb-4"
                    onClick={() => {
                        router?.back();
                    }}
                >
                    <div className="flex items-center gap-2">
                        <ChevronLeft fill="black" size={16} />
                        <Text
                            font="helvetica"
                            size="sm"
                            weight="normal"
                            className="italic"
                        >
                            Back
                        </Text>
                    </div>
                    <div
                        className="flex items-center gap-2 lg:mb-0 lg:hidden"
                        onClick={handleLogout}
                    >
                        <Text
                            font="helvetica"
                            size="productTitle1"
                            weight="normal"
                            className="italic"
                        >
                            Sign out
                        </Text>
                        <SignOut
                            size={24}
                            fill="#000000"
                            className="w-4 h-4 lg:w-6 lg:h-6"
                        />
                    </div>
                </div>
                <span
                    className="flex gap-x-4 items-center cursor-pointer md:pt-0"
                    onClick={() => setIsAddNewAddress(false)}
                >
                    <Text font="helvetica" className="text-[32px]">
                        {initialAddress ? "edit addresses" : "add addresses"}
                    </Text>
                </span>
                <ShippingAddressForm
                    address={initialAddress}
                    onBack={() => setIsAddNewAddress((prev) => !prev)}
                    onRefresh={refreshAddressList}
                />
            </section>
        );
    }

    const handleEdit = (data: Address) => {
        setIsAddNewAddress((prev) => !prev);
        setInitialAddress(data);
    };

    return (
        <React.Fragment>
            <section className="flex h-full w-full flex-col gap-y-6">
                <div
                    className="flex justify-between lg:hidden -mt-3 pb-4"
                    onClick={() => {
                        router?.back();
                    }}
                >
                    <div className="flex items-center gap-2">
                        <ChevronLeft fill="black" size={16} />
                        <Text
                            font="helvetica"
                            size="sm"
                            weight="normal"
                            className="italic"
                        >
                            Back
                        </Text>
                    </div>
                    <div
                        className="flex items-center gap-2 lg:mb-0 lg:hidden"
                        onClick={handleLogout}
                    >
                        <Text
                            font="helvetica"
                            size="productTitle1"
                            weight="normal"
                            className="italic"
                        >
                            Sign out
                        </Text>
                        <SignOut
                            size={24}
                            fill="#000000"
                            className="w-4 h-4 lg:w-6 lg:h-6"
                        />
                    </div>
                </div>

                <Text
                    font="helvetica"
                    className="text-[32px] font-light md:pt-0"
                >
                    your addresses
                </Text>
                {data?.customer?.addresses &&
                    data?.customer?.addresses.length > 0 && (
                        <div className="flex flex-row justify-between w-full gap-y-3 mt-6">
                            <Text font="helvetica" weight="bold" size="base">
                                Saved addresses
                            </Text>
                            <button
                                className="flex cursor-pointer gap-x-1 items-center"
                                onClick={() => {
                                    setIsAddNewAddress((prev) => !prev);
                                    setInitialAddress(undefined);
                                }}
                            >
                                <Plus color="#000" size={20} />
                                <span className="italic font-helvetica font-extrabold text-base">
                                    Add new address
                                </span>
                            </button>
                        </div>
                    )}

                {data?.customer?.addresses &&
                    data?.customer?.addresses?.length <= 0 && (
                        <div className="flex gap-y-[48px] flex-col">
                            <Text
                                font="helvetica"
                                className="text-xl mt-2 lg:mt-6"
                            >
                                No saved addresses found at the moment
                            </Text>
                            <Button
                                className="w-fit border-[2px] border-font-main rounded-full font-bold text-xl px-[72px] py-6 leading-[28px] cursor-pointer"
                                onClick={() => {
                                    setInitialAddress(undefined);
                                    setIsAddNewAddress((prev) => !prev);
                                }}
                            >
                                {" "}
                                + add new address
                            </Button>
                        </div>
                    )}

                <AddressList
                    onEdit={handleEdit}
                    data={data?.customer?.addresses ?? []}
                    onDelete={(id) => {
                        setAddressId(id);
                        setIsAddDeleteModal((prev) => !prev);
                    }}
                    loading={loading}
                />
            </section>
            <AddressDeleteForm
                addressId={addressId}
                open={isAddDeleteModal}
                setOpen={setIsAddDeleteModal}
                refreshAddressList={refreshAddressList}
            />
        </React.Fragment>
    );
}
