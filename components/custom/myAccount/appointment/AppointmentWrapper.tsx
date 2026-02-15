"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@apollo/client";

import Text from "@/components/generic/Text";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Calendar from "@/components/icons/Calendar";
import Clock from "@/components/icons/Clock";
import Eye from "@/components/icons/Eye";
import Phone from "@/components/icons/Phone";
import LoungeIcon from "@/components/icons/Lounge";
import ChevronLeft from "@/components/icons/ChevronLeft";
import SignOut from "@/components/icons/SignOut";
import AppointmentsIcon from "@/components/icons/AppointmentsIcon";

import {
    Appointment,
    GET_MY_APPOINTMENTS,
    GetMyAppointmentsResponse,
} from "./appointment.data.api";
import CancelAppointmentModal from "./CancelAppointment";
import { CircleX } from "lucide-react";
import { useLogout } from "@/lib/hooks/useLogout";

export default function AppointmentWrapper() {
    const router = useRouter();
    const { handleLogout } = useLogout();

    const { data, loading } =
        useQuery<GetMyAppointmentsResponse>(GET_MY_APPOINTMENTS);
    const appointments = data?.getMyAppointments?.data ?? [];
    const [open, setOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    console.log("appointments data", data);

    const filterByStatus = (status: string) =>
        status === "all"
            ? appointments
            : appointments.filter(
                  (item) => item.status.toLowerCase() === status.toLowerCase(),
              );

    const onCancelClick = (id: number) => {
        setSelectedId(id);
        setOpen(true);
    };

    const renderAppointmentCard = (item: Appointment) => {
        const isUpcoming = item?.status === "UPCOMING";
        const isCompleted = item?.status === "COMPLETED";

        return (
            <div
                key={item?.appointmentId}
                className="shadow-[0_6px_24px_0_rgba(0,0,0,0.10)] mb-6 lg:mb-12 rounded-md"
            >
                <div className="flex flex-col lg:p-6 p-4 bg-white border-b">
                    {/* Date + Time + Status */}
                    <div className="flex justify-between pb-4 border-b border-border-color-white">
                        <div className="flex items-center gap-2">
                            {/* Date */}
                            <div className="flex items-center gap-1">
                                <Calendar size={16} />
                                <Text
                                    font="helvetica"
                                    size="base"
                                    weight="extrabold"
                                    className="mt-1"
                                >
                                    {/* Format when date comes from API */}
                                    {item?.appointmentDate}
                                </Text>
                            </div>

                            {/* Divider */}
                            <div className="w-px h-[14px] bg-[#EBEBEB]" />

                            {/* Time */}
                            <div className="flex items-center gap-1">
                                <Clock size={16} />
                                <Text
                                    font="helvetica"
                                    size="base"
                                    weight="extrabold"
                                    className="mt-1"
                                >
                                    {item?.slotTime}
                                </Text>
                            </div>
                        </div>

                        {/* Status Badge */}
                        <Text
                            font="helvetica"
                            size="customText1"
                            weight="normal"
                            className={`px-2 py-1 rounded-[2px] h-fit border ${
                                isUpcoming
                                    ? "bg-background-color-orange border-border-color-orange"
                                    : isCompleted
                                      ? "bg-background-color-green border-border-color-green"
                                      : "bg-background-color-error border-gray-400"
                            }`}
                        >
                            {item?.status}
                        </Text>
                    </div>

                    {/* Appointment Details */}
                    <div className="py-6 border-b border-border-color-white">
                        <div className="flex items-center gap-2 py-2">
                            {item?.type === "Lounge Visit" ? (
                                <LoungeIcon />
                            ) : (
                                <Eye />
                            )}
                            <Text font="helvetica" size="sm" weight="extrabold">
                                {item?.type}
                            </Text>
                        </div>

                        <Text
                            font="helvetica"
                            size="sm"
                            className="pb-2 w-[84%] lg:w-[92%] mx-auto my-0"
                        >
                            {item?.gkbStore}
                        </Text>

                        <div className="flex items-center gap-2">
                            <Phone />
                            <Text font="helvetica" size="xs">
                                080-47406740
                            </Text>
                        </div>
                    </div>

                    {/* Cancel Button */}
                    {isUpcoming && (
                        <button
                            onClick={() =>
                                onCancelClick(Number(item?.appointmentId))
                            }
                            className="flex gap-2 items-center justify-center mt-4 cursor-pointer"
                        >
                            <CircleX size={20} strokeWidth={1.2} />
                            <Text
                                font="helvetica"
                                size="sm"
                                weight="bold"
                                className="italic"
                            >
                                Cancel
                            </Text>
                        </button>
                    )}
                </div>
            </div>
        );
    };

    return (
        <>
            {/* Mobile Top Bar */}
            <div className="flex justify-between lg:hidden mb-4">
                <div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => router.back()}
                >
                    <ChevronLeft fill="black" size={16} />
                    <Text font="helvetica" size="sm" className="italic">
                        Back
                    </Text>
                </div>

                <div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={handleLogout}
                >
                    <Text
                        font="helvetica"
                        size="productTitle1"
                        className="italic"
                    >
                        Sign out
                    </Text>
                    <SignOut size={24} fill="#000" />
                </div>
            </div>

            {/* Page Title */}
            <Text
                font="helvetica"
                size="customText17"
                className="lg:pb-20 pb-6 pt-2 lg:pt-0"
            >
                your appointments
            </Text>

            {/* Loading */}
            {loading && (
                <div className="w-full h-64 flex items-center justify-center flex-col gap-4">
                    <Text font="helvetica" size="xl">
                        Loading appointments...
                    </Text>
                </div>
            )}

            {/* Empty State */}
            {!loading && appointments.length === 0 && (
                <div className="w-full flex flex-col items-center gap-6 py-10">
                    <AppointmentsIcon size={40} />
                    <Text font="helvetica" weight="bold" className="text-xl">
                        No Appointments Available
                    </Text>
                </div>
            )}

            {/* Tabs + Content */}
            {appointments.length > 0 && (
                <Tabs defaultValue="all">
                    {/* Tabs */}
                    <div className="overflow-x-auto no-scrollbar">
                        <TabsList className="mb-6 p-0 ">
                            {["all", "upcoming", "completed", "cancelled"].map(
                                (tab) => (
                                    <TabsTrigger
                                        key={tab}
                                        value={tab}
                                        className="mr-2 lg:mr-4 data-[state=active]:bg-black data-[state=active]:text-white bg-white text-black rounded-[40px] cursor-pointer py-2 px-6 lg:px-8 border border-black"
                                    >
                                        {tab.charAt(0).toUpperCase() +
                                            tab.slice(1)}
                                    </TabsTrigger>
                                ),
                            )}
                        </TabsList>
                    </div>

                    {/* Appointment Content */}
                    {["all", "upcoming", "completed", "cancelled"].map(
                        (tab) => (
                            <TabsContent key={tab} value={tab}>
                                {filterByStatus(tab).map((item) =>
                                    renderAppointmentCard(item),
                                )}
                            </TabsContent>
                        ),
                    )}
                </Tabs>
            )}

            {/* Cancel Modal */}
            <CancelAppointmentModal
                open={open}
                appointmentId={selectedId}
                onClose={() => setOpen(false)}
                onSuccess={() => console.log("Appointment cancelled!")}
            />
        </>
    );
}
