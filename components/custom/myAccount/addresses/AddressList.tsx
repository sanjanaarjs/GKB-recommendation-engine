"use client";

import AddressCard from "./AddressCard";
import { AddressListProps } from "./address.data.api";

export default function AddressList({
    onEdit,
    data,
    loading,
    onDelete,
}: AddressListProps) {
    if (loading)
        return (
            <div className="p-4 mx-auto font-helvetica my-auto text-xl">
                Loading addresses...
            </div>
        );

    const addresses = data ?? [];

    return (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6  p-4">
            {addresses.map((addr) => (
                <AddressCard
                    key={addr.id}
                    address={addr}
                    onEdit={() => onEdit(addr)}
                    onDelete={onDelete}
                />
            ))}
        </section>
    );
}
