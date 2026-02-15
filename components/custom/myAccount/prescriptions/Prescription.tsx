"use client";

import React, { useEffect } from "react";
import Text from "@/components/generic/Text";
import Pencil from "@/components/icons/Pencil";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import PrescriptionCard from "./PrescriptionCard";
import { useRouter } from "next/navigation";
import ChevronLeft from "@/components/icons/ChevronLeft";
import SignOut from "@/components/icons/SignOut";
import {
    GET_MY_PRESCRIPTIONS,
    GetMyPrescriptionsResponse,
    Prescription,
} from "./datas/prescription.data.api";
import { useMutation, useQuery } from "@apollo/client";
import { useLogout } from "@/lib/hooks/useLogout";
import {
    UPDATE_PRESCRIPTION,
    UpdatePrescriptionResponse,
    UpdatePrescriptionVariables,
} from "./datas/updatePrescription.data.api";
import toast from "react-hot-toast";

export default function Prescriptions() {
    const router = useRouter();
    // Api call for getting prescriptions
    const { data, loading } =
        useQuery<GetMyPrescriptionsResponse>(GET_MY_PRESCRIPTIONS);

    // Api call to update prescription
    const [updatePrescription] = useMutation<
        UpdatePrescriptionResponse,
        UpdatePrescriptionVariables
    >(UPDATE_PRESCRIPTION);

    const [editingUser, setEditingUser] = React.useState<string | null>(null);
    const [newName, setNewName] = React.useState("");
    const [localPrescriptions, setLocalPrescriptions] = React.useState<
        Prescription[]
    >([]);

    const { handleLogout } = useLogout();

    useEffect(() => {
        if (data?.getMyPrescriptions?.data) {
            setLocalPrescriptions(data.getMyPrescriptions.data);
        }
    }, [data]);
    const prescriptions = localPrescriptions;

    const groupedByUser = prescriptions.reduce<Record<string, Prescription[]>>(
        (acc, item) => {
            const name = item.prescriptionName || "Unknown prescription";
            if (!acc[name]) acc[name] = [];
            acc[name].push(item);
            return acc;
        },
        {},
    );

    const handleUpdateName = async () => {
        if (!newName.trim()) {
            toast.error("Name cannot be empty");
            return;
        }

        if (!editingUser) {
            toast.error("Something went wrong. Try again.");
            return;
        }

        const updatedName = newName.trim();
        const prescriptionsToUpdate = groupedByUser[editingUser];

        try {
            for (const pres of prescriptionsToUpdate) {
                await updatePrescription({
                    variables: {
                        prescriptionId: Number(pres.id),
                        isDelete: 0,
                        prescriptionName: updatedName,
                    },
                });

                setLocalPrescriptions((prev) =>
                    prev.map((item) =>
                        item.id === pres.id
                            ? { ...item, prescriptionName: updatedName }
                            : item,
                    ),
                );
            }

            setEditingUser(null);
            toast.success("Name updated successfully!");
        } catch (err) {
            console.error("Failed to update prescriptions:", err);
            toast.error("Failed to update. Please try again.");
        }
    };

    const handleDelete = async (id: string | number) => {
        try {
            await updatePrescription({
                variables: {
                    prescriptionId: Number(id),
                    isDelete: 1,
                    prescriptionName: "",
                },
            });

            // Remove from local state immediately
            setLocalPrescriptions((prev) =>
                prev.filter((item) => item.id !== id),
            );
        } catch (err) {
            console.error("Failed to delete prescription:", err);
        }
    };

    return (
        <section className="flex h-full w-full flex-col relative overflow-hidden gap-y-6">
            {/* edit user name */}
            {editingUser && (
                <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
                    <div className="bg-white rounded-md p-6 w-[90%] max-w-sm shadow-lg">
                        <Text
                            font="helvetica"
                            weight="bold"
                            className="text-xl mb-4"
                        >
                            Edit name
                        </Text>

                        <input
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            className="w-full border border-gray-300 rounded-none px-3 py-2 mb-4 font-helvetica"
                        />

                        <div className="flex justify-end gap-3">
                            <button
                                className="px-4 py-2 border rounded-lg font-helvetica"
                                onClick={() => setEditingUser(null)}
                            >
                                Cancel
                            </button>

                            <button
                                className="px-4 py-2 bg-black text-white rounded-lg font-helvetica"
                                onClick={handleUpdateName}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* Back + Sign Out */}
            <div
                className="flex justify-between lg:hidden -mt-2 pb-4"
                onClick={() => {
                    router?.back();
                }}
            >
                <div className="flex items-center gap-2">
                    <ChevronLeft fill="black" size={16} />
                    <Text font="helvetica" size="sm" className="italic">
                        Back
                    </Text>
                </div>
                <div
                    className="flex items-center gap-2 lg:hidden"
                    onClick={handleLogout}
                >
                    <Text
                        font="helvetica"
                        size="productTitle1"
                        className="italic"
                    >
                        Sign out
                    </Text>
                    <SignOut size={24} fill="#000000" />
                </div>
            </div>

            {/* Main Title */}
            <Text font="helvetica" className="text-[28px] md:text-[32px]">
                your prescriptions
            </Text>

            {/* Render users & prescriptions */}
            {loading ? (
                <div className="w-full flex justify-center items-center h-full py-10">
                    <Text font="helvetica" className="text-sm md:text-xl">
                        Loading Prescriptions...
                    </Text>
                </div>
            ) : Object.keys(groupedByUser).length === 0 ? (
                <div className="w-full flex justify-center items-center h-full py-10">
                    <Text font="helvetica" className="text-sm md:text-xl">
                        No prescriptions found
                    </Text>
                </div>
            ) : (
                Object.keys(groupedByUser).map((username) => (
                    <React.Fragment key={username}>
                        {/* User Header */}
                        <div className="flex flex-row justify-between items-center mt-4 md:mt-6">
                            <Text
                                font="helvetica"
                                weight="bold"
                                className="text-base text-font-main"
                            >
                                {username}
                            </Text>

                            <button
                                className="flex items-center gap-x-2 hover:opacity-80"
                                onClick={() => {
                                    setEditingUser(username);
                                    setNewName(username);
                                }}
                            >
                                <Pencil size={20} />
                                <Text
                                    weight="bold"
                                    className="text-base text-font-main"
                                >
                                    Edit user
                                </Text>
                            </button>
                        </div>

                        {/* Swiper */}
                        <div className="mt-5 w-full h-full overflow-x-auto">
                            <Swiper
                                modules={[Navigation, Pagination, Autoplay]}
                                spaceBetween={20}
                                slidesPerView={2.5}
                                className="w-full overflow-x-auto"
                                autoplay={{
                                    delay: 2500,
                                    disableOnInteraction: false,
                                    pauseOnMouseEnter: true,
                                }}
                                loop={true}
                                breakpoints={{
                                    0: { slidesPerView: 1, spaceBetween: 12 },
                                    640: { slidesPerView: 2 },
                                    1024: { slidesPerView: 2.5 },
                                }}
                            >
                                {groupedByUser[username].map((prescription) => (
                                    <SwiperSlide
                                        key={prescription.id}
                                        className="pb-10"
                                    >
                                        <div className="flex justify-center">
                                            <PrescriptionCard
                                                prescription={prescription}
                                                handleDelete={handleDelete}
                                            />
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>

                        <div className="border-b border-color-light md:py-4" />
                    </React.Fragment>
                ))
            )}
        </section>
    );
}
