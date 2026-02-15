"use client";

import Link from "next/link";
import { actions } from "./profile.data.api";
import Text from "@/components/generic/Text";

export default function AccountQuickActions() {
    return (
        <div className="grid grid-cols-2 gap-3 w-full max-w-md mx-auto mt-6 lg:hidden">
            {actions &&
                actions.map((item) => {
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            className="flex flex-col items-center justify-center gap-3 borders  rounded-[2px] p-4 card-shadow transition bg-white"
                        >
                            {item.label === "Orders" ? (
                                <Icon size={22} stroke="#000" />
                            ) : (
                                <Icon size={22} strokeWidth={1.5} />
                            )}
                            <Text
                                className="text-sm leading-[100%]"
                                weight="bold"
                                font="helvetica"
                            >
                                {item.label}
                            </Text>
                        </Link>
                    );
                })}
        </div>
    );
}
