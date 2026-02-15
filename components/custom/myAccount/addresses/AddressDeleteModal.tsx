import React from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogOverlay,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Text from "@/components/generic/Text";

import {
    DELETE_CUSTOMER_ADDRESS,
    IAddressDeleteFormProps,
    DeleteCustomerAddressResponse,
    DeleteCustomerAddressVariables,
} from "./address.data.api";
import { useMutation } from "@apollo/client";

const AddressDeleteForm: React.FC<IAddressDeleteFormProps> = ({
    open,
    setOpen,
    addressId,
    refreshAddressList,
}) => {
    const [deleteCustomerAddress, { loading, error }] = useMutation<
        DeleteCustomerAddressResponse,
        DeleteCustomerAddressVariables
    >(DELETE_CUSTOMER_ADDRESS);

    const onSubmit = async () => {
        if (!addressId) return;

        try {
            const { data } = await deleteCustomerAddress({
                variables: { id: addressId },
            });

            if (data?.deleteCustomerAddress) {
                setOpen(false);
                refreshAddressList();
            } else {
                console.error("Delete failed: response was false or null");
            }
        } catch (err: unknown) {
            console.error("Delete address failed:", err);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogOverlay className="fixed inset-0 bg-black/30 z-[9998]" />
            <DialogContent className="sm:max-w-lg z-[9999]">
                <DialogHeader>
                    <DialogTitle className="font-helvetica font-bold text-acc-sidebar-neurtal-nine mb-2">
                        Delete Address
                    </DialogTitle>
                    <DialogDescription className="font-helvetica font-medium text-midGrey">
                        Are you sure you want to delete this address? This
                        action cannot be undone.
                    </DialogDescription>
                </DialogHeader>

                {error && (
                    <Text className="text-red-500 mt-2 text-sm" font="avenir">
                        {error.message}
                    </Text>
                )}

                <DialogFooter
                    className={`mt-4 flex justify-end gap-2 bg-font-main text-white w-fit ml-auto rounded-full px-6
                    ${loading ? "cursor-not-allowed opacity-70" : "cursor-pointer"}
                    `}
                >
                    <Button
                        onClick={onSubmit}
                        disabled={loading}
                        className={`font-helvetica`}
                    >
                        {loading ? "Deleting..." : "Delete"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default AddressDeleteForm;
