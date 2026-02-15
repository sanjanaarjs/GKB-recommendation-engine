import React from "react";
import Text from "@/components/generic/Text";
import { Customer } from "@/app/(default)/profile/profile.data.api";

interface ProfileInfoHeaderProps {
    customer: Customer | undefined | null;
}

const ProfileInfoHeader: React.FC<ProfileInfoHeaderProps> = ({ customer }) => {
    const customerName = `${customer?.firstname ?? ""} ${customer?.middlename ?? ""} ${customer?.lastname ?? ""}`;
    const phone = customer?.custom_attributes?.[0]?.value ?? "-";
    const email = customer?.email ?? "";

    return (
        <div className="lg:hidden">
            <Text
                weight="bold"
                className="text-sm text-font-main"
                font="helvetica"
            >
                Profile information
            </Text>

            <div className="flex flex-col gap-y-2.5 mt-4">
                <div className="flex justify-between">
                    <Text font="helvetica" className="text-sm" weight="light">
                        Name
                    </Text>
                    <Text font="helvetica" className="text-sm" weight="bold">
                        {customerName}
                    </Text>
                </div>
                <div className="flex justify-between">
                    <Text font="helvetica" className="text-sm" weight="light">
                        Email:
                    </Text>
                    <Text font="helvetica" className="text-sm" weight="bold">
                        {email}
                    </Text>
                </div>
                <div className="flex justify-between">
                    <Text font="helvetica" className="text-sm" weight="light">
                        Phone:
                    </Text>
                    <Text font="helvetica" className="text-sm" weight="bold">
                        {phone}
                    </Text>
                </div>
            </div>
        </div>
    );
};

export default ProfileInfoHeader;
