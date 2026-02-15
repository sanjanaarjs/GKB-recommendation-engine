"use client";

import { Breadcrumbs } from "@/components/generic/breadcrumbs/breadcrumbs";
import Text from "@/components/generic/Text";
import SignOut from "@/components/icons/SignOut";
import { AccountHeaderProps, profileNav } from "./account.data.api";
import { usePathname } from "next/navigation";

export default function MyAccountHeader({
    customer,
    onSignOut,
}: AccountHeaderProps) {
    const fullName =
        `${customer?.firstname ?? ""} ${customer?.lastname ?? ""}`.trim();
    const phone = customer?.custom_attributes?.[0]?.value ?? "-";
    const shortIntro = customer?.customerSum;

    const pathname = usePathname();

    const match = profileNav.find((item) => item.href === pathname);
    const safePath = pathname ?? "";

    const items = [
        { label: "Home", url: "/" },
        { label: "User account", url: "/profile" },
        {
            label:
                match?.name ??
                safePath
                    .split("/")
                    .pop()
                    ?.replace(/-/g, " ")
                    .replace(/\b\w/g, (s) => s.toUpperCase()) ??
                "",
            url: safePath,
        },
    ];

    return (
        <div className="w-full lg:px-20 lg:py-12 px-6 py-8 bg-background-grey lg:block hidden">
            <div>
                <div className="flex lg:justify-between justify-end">
                    <div className="mb-8 hidden lg:block">
                        <Breadcrumbs items={items} />
                    </div>

                    <button
                        onClick={onSignOut}
                        className="flex items-center gap-2 lg:mb-0 mb-12 cursor-pointer"
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
                    </button>
                </div>

                <Text
                    font="helvetica"
                    size="customText16"
                    weight="light"
                    className="lg:mb-4 mb-8"
                >
                    hi,{" "}
                    <span className="capitalize">{fullName || "Guest"}</span>
                </Text>

                <div className="flex lg:flex-row flex-col gap-2 lg:gap-0">
                    <div className="lg:w-[411px]">
                        <Text
                            font="helvetica"
                            size="productTitle1"
                            weight="customWeight1"
                            className="w-full lg:w-[313px] lg:py-5 lg:pr-5 mb-8 lg:mb-0"
                        >
                            {shortIntro}
                        </Text>
                    </div>

                    <div className="lg:block hidden border-[1px] border-border-color-light"></div>

                    <div className="lg:py-5 lg:pr-5 lg:pl-20 mb-12 lg:mb-0">
                        <Text
                            font="helvetica"
                            size="productTitle1"
                            weight="extrabold"
                            className="text-font-main mb-4"
                        >
                            Profile information
                        </Text>

                        <div className="flex gap-2 mb-2">
                            <Text
                                font="helvetica"
                                size="productTitle1"
                                weight="light"
                                className="lg:w-30 w-24 text-font-main"
                            >
                                Name:
                            </Text>
                            <Text
                                font="helvetica"
                                size="productTitle1"
                                weight="extrabold"
                                className="capitalize"
                            >
                                {fullName || "-"}
                            </Text>
                        </div>

                        <div className="flex gap-2 mb-2">
                            <Text
                                font="helvetica"
                                size="productTitle1"
                                weight="light"
                                className="lg:w-30 w-24 text-font-main"
                            >
                                Email:
                            </Text>
                            <Text
                                font="helvetica"
                                size="productTitle1"
                                weight="extrabold"
                            >
                                {customer?.email ?? "-"}
                            </Text>
                        </div>

                        <div className="flex gap-2 mb-2">
                            <Text
                                font="helvetica"
                                size="productTitle1"
                                weight="light"
                                className="lg:w-30 w-24 text-font-main"
                            >
                                Phone:
                            </Text>
                            <Text
                                font="helvetica"
                                size="productTitle1"
                                weight="extrabold"
                            >
                                {phone}
                            </Text>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
