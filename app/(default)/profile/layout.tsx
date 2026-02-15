"use client";

import MyAccountHeader from "@/components/custom/myAccount/myAccountHeader";
import BottomWrapper from "@/components/custom/myAccount/bottomWrapper/BottomWrapper";
import ProfileSidebar from "@/components/staticUI/custom/profile-static/sideBar";
import { useQuery } from "@apollo/client";
import { GET_CUSTOMER, GetCustomerResponse } from "./profile.data.api";
import { useLogout } from "@/lib/hooks/useLogout";

export default function ProfileLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { data, loading, error } =
        useQuery<GetCustomerResponse>(GET_CUSTOMER);

    const { handleLogout } = useLogout();

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <span>Loading...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <span>Error loading profile data.</span>
            </div>
        );
    }
    return (
        <div className="relative flex flex-col min-h-screen bg-gray-50">
            {/* Header */}
            <MyAccountHeader
                customer={data?.customer}
                onSignOut={handleLogout}
            />

            {/* Content */}
            <div className="flex flex-1 min-h-0 flex-col md:flex-row">
                {/* Sidebar */}
                <ProfileSidebar />

                {/* Main content */}
                <main className="flex-1 p-8 md:py-20 md:px-20 bg-background-grey md:bg-white overflow-hidden">
                    {children}
                </main>
            </div>

            {/* Bottom Section */}
            <BottomWrapper />
        </div>
    );
}
