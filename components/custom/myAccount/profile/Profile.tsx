"use client";

import SignOut from "@/components/icons/SignOut";
import Text from "@/components/generic/Text";
import { useQuery } from "@apollo/client";
import {
    GET_CUSTOMER,
    GetCustomerResponse,
} from "@/app/(default)/profile/profile.data.api";
import ProfileInfoHeader from "./ProfileInfoHeader";
import AccountQuickActions from "./ProfileQuickActionTabs";
import ProfileTabs from "./ProfileTabs";
import TryFramesSection from "../order/TryFrameSection";
import { useLogout } from "@/lib/hooks/useLogout";

const Profile = () => {
    const { data } = useQuery<GetCustomerResponse>(GET_CUSTOMER);

    const shortIntro = data?.customer?.customerSum ?? "";
    const [firstLine, ...rest] = shortIntro.split("\n");
    const secondPart = rest.join("\n").trim();
    const { handleLogout } = useLogout();

    return (
        <div className="flex flex-col gap-y-8">
            <div
                className="flex items-end justify-end gap-2 lg:mb-0 lg:hidden"
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

            <div className="flex items-baseline gap-2">
                <Text
                    font="helvetica"
                    className="text-[28px] leading-[36px]"
                    weight="light"
                >
                    {firstLine}
                </Text>
            </div>
            <Text
                className="text-sm leading-[20px]"
                weight="normal"
                font="helvetica"
            >
                {secondPart}
            </Text>

            <ProfileInfoHeader customer={data?.customer} />
            <AccountQuickActions />
            <ProfileTabs />
            <TryFramesSection className=" lg:pt-0 lg:pb-0 md:mx-0" />
        </div>
    );
};

export default Profile;
