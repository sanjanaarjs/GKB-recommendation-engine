"use client";

import ChevronLeft from "@/components/icons/ChevronLeft";
import { tabs } from "./profile.data.api";
import Text from "@/components/generic/Text";
import Link from "next/link";

const ProfileTabs = () => {
    return (
        <div className="flex flex-col gap-y-8 mt-8 -mx-8 lg:hidden">
            {tabs &&
                tabs?.map((item) => {
                    const Icon = item?.icon;
                    return (
                        <Link
                            href={`${item.href}`}
                            className="flex items-center gap-x-2 py-2 px-8 border-b border-b-border-color-light pb-8"
                            key={item.id}
                        >
                            <Icon size={24} />
                            <div className="w-full flex justify-between">
                                <Text size="base" weight="bold">
                                    {item.name}
                                </Text>
                                <ChevronLeft
                                    fill="#000"
                                    className="rotate-180"
                                />
                            </div>
                        </Link>
                    );
                })}
        </div>
    );
};

export default ProfileTabs;
