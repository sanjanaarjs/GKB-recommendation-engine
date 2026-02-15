import WishlistIcon from "@/components/icons/Wishlist";
import Bag from "@/components/icons/Bag";
import AppointmentsIcon from "@/components/icons/AppointmentsIcon";
import AddressBookIcon from "@/components/icons/AddressBookIcon";
import PrescriptionIcon from "@/components/icons/PrescriptionIcon";
import GiftCard from "@/components/icons/GiftCard";
import Help from "@/components/icons/Help";

export const actions = [
    { label: "Orders", icon: Bag, href: "profile/orders" },
    { label: "Wishlist", icon: WishlistIcon, href: "profile/wishlist" },
    { label: "Addresses", icon: AddressBookIcon, href: "profile/addresses" },
    {
        label: "Appointments",
        icon: AppointmentsIcon,
        href: "profile/appointments",
    },
];

export const tabs = [
    {
        id: 1,
        name: "Saved prescriptions",
        href: "/profile/savedprescriptions",
        icon: PrescriptionIcon,
    },
    { id: 2, name: "Gift cards", href: "/profile/gift-card", icon: GiftCard },
    { id: 3, name: "Help centre", href: "/profile/helpcenter", icon: Help },
];
