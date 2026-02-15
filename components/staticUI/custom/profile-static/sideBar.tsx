"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import Addresses from "@/components/icons/Address";
import AppointmentsIcon from "@/components/icons/AppointmentsIcon";
import PrescriptionIcon from "@/components/icons/PrescriptionIcon";
import GiftCard from "@/components/icons/GiftCard";
import Help from "@/components/icons/Help";
import OrdersIcon from "@/components/icons/ordersIcon";
import WishlistIcon from "@/components/icons/Wishlist";
import ArrowDown from "@/components/icons/ArrowDown";
import Text from "@/components/generic/Text";

const navItems = [
    { name: "Orders", href: "/profile/orders", icon: OrdersIcon },
    { name: "Wishlist", href: "/profile/wishlist", icon: WishlistIcon },
    { name: "Addresses", href: "/profile/addresses", icon: Addresses },
    {
        name: "Appointments",
        href: "/profile/appointments",
        icon: AppointmentsIcon,
    },
    {
        name: "Saved prescriptions",
        href: "/profile/savedprescriptions",
        icon: PrescriptionIcon,
    },
    { name: "Gift cards", href: "/profile/gift-card", icon: GiftCard },
    { name: "Help centre", href: "/profile/helpcenter", icon: Help },
];

export default function ProfileSidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-[491px] border-r bg-white hidden md:block">
            <nav className="px-20 pt-8">
                {navItems.map(({ name, href, icon: Icon }) => (
                    <Link key={name} href={href}>
                        <div className="flex justify-between items-center border-b-[2px] py-12 border-b-border-color-white">
                            <Button
                                variant={
                                    pathname === href ? "secondary" : "ghost"
                                }
                                className={clsx(
                                    "justify-start text-base items-center font-normal cursor-pointer",
                                    pathname === href && "font-extrabold",
                                )}
                            >
                                <div className="flex gap-2 items-center">
                                    <Icon width={24} height={24} />
                                    <Text
                                        font="helvetica"
                                        size="xl"
                                        weight="normal"
                                    >
                                        {name}
                                    </Text>
                                </div>
                            </Button>
                            <div className="-rotate-90">
                                <ArrowDown size={16} />
                            </div>
                        </div>
                    </Link>
                ))}
            </nav>
        </aside>
    );
}
