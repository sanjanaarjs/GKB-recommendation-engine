import { Customer } from "@/app/(default)/profile/profile.data.api";

export interface AccountHeaderProps {
    customer?: Customer | null;
    onSignOut?: () => void;
}

export const profileNav = [
    { name: "Orders", href: "/profile/orders" },
    { name: "Wishlist", href: "/profile/wishlist" },
    { name: "Addresses", href: "/profile/addresses" },
    { name: "Appointments", href: "/profile/appointments" },
    { name: "Saved prescriptions", href: "/profile/savedprescriptions" },
    { name: "Gift cards", href: "/profile/gift-card" },
    { name: "Help centre", href: "/profile/helpcenter" },
];
