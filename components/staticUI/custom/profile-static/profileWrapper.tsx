"use client";

import { useState } from "react";
import {
    ShoppingBag,
    Heart,
    MapPin,
    Calendar,
    FileText,
    Gift,
    HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import OrdersWrapper from "./orders/ordersWrapper";
import WishlistWrapper from "./wishlist/wishlistWrapper";
import AddressWrapper from "./address/addressWrapper";
import AppointmentWrapper from "./appointments/appointmentWrapper";
import PrescriptionWrapper from "./prescriptions/prescriptionWrapper";
import GiftCardWrapper from "./giftCard/giftCardWrapper";
import HelpWrapper from "./help/helpWrapper";

type NavItem = {
    name: string;
    icon: React.ElementType;
};

const navItems: NavItem[] = [
    { name: "Orders", icon: ShoppingBag },
    { name: "Wishlist", icon: Heart },
    { name: "Addresses", icon: MapPin },
    { name: "Appointments", icon: Calendar },
    { name: "Saved prescriptions", icon: FileText },
    { name: "Gift cards", icon: Gift },
    { name: "Help centre", icon: HelpCircle },
];

export default function ProfileWrapper() {
    const [active, setActive] = useState("Orders");

    const renderContent = () => {
        switch (active) {
            case "Orders":
                return <OrdersWrapper />;
            case "Wishlist":
                return <WishlistWrapper />;
            case "Addresses":
                return <AddressWrapper />;
            case "Appointments":
                return <AppointmentWrapper />;
            case "Saved prescriptions":
                return <PrescriptionWrapper />;
            case "Gift cards":
                return <GiftCardWrapper />;
            case "Help centre":
                return <HelpWrapper />;
            default:
                return <DummyContent title="Profile" />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className="w-64 border-r bg-white p-4 hidden md:block">
                <nav className="space-y-1">
                    {navItems.map(({ name, icon: Icon }) => (
                        <Button
                            key={name}
                            variant={active === name ? "secondary" : "ghost"}
                            className="w-full justify-start text-base font-normal"
                            onClick={() => setActive(name)}
                        >
                            <Icon className="w-5 h-5 mr-3" />
                            {name}
                        </Button>
                    ))}
                </nav>
            </aside>

            {/* Main content */}
            <main className="flex-1 p-6">{renderContent()}</main>
        </div>
    );
}

function DummyContent({ title }: { title: string }) {
    return (
        <div className="space-y-6">
            <h1 className="text-xl font-semibold">{title}</h1>
            <Card className="p-6 text-gray-500">
                <p>
                    This is dummy placeholder content for{" "}
                    <strong>{title}</strong>. You can replace it with actual
                    data or components later.
                </p>
            </Card>
        </div>
    );
}
