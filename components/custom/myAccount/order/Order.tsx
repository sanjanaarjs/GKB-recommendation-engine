"use client";
import React, { useState } from "react";
import Text from "@/components/generic/Text";
import OrderList from "./OrderList";
import { Button } from "@/components/ui/button";
import OrderDetail from "./OrderDetail";
import ChevronLeft from "@/components/icons/ChevronLeft";
import SignOut from "@/components/icons/SignOut";
import { useRouter } from "next/navigation";
import { useQuery } from "@apollo/client";
import {
    CUSTOMER_ORDERS,
    CustomerOrdersResponse,
} from "./datas/order.data.api";
import { useLogout } from "@/lib/hooks/useLogout";

const Order = () => {
    const [orderId, setOrderId] = useState<null | string>(null);
    const router = useRouter();
    const { data } = useQuery<CustomerOrdersResponse>(CUSTOMER_ORDERS);
    const { handleLogout } = useLogout();

    if (orderId) {
        return (
            <OrderDetail
                onBackClick={() => setOrderId(null)}
                orderId={orderId}
            />
        );
    }

    console.log("customer orders data", data);
    return (
        <section className="flex h-full w-full flex-col">
            <div
                className="flex justify-between lg:hidden -mt-3 pb-4"
                onClick={() => {
                    router?.back();
                }}
            >
                <div className="flex items-center gap-1">
                    <ChevronLeft size={20} />
                    <Text
                        font="helvetica"
                        size="sm"
                        weight="normal"
                        className="italic"
                    >
                        Back
                    </Text>
                </div>
                <div
                    className="flex items-center gap-2 lg:mb-0 lg:hidden"
                    onClick={handleLogout}
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
                </div>
            </div>

            <Text
                font="helvetica"
                weight="light"
                className="text-[28px] md:text-[32px] pt-2 md:pt-0 mb-2 lg:mb-6"
            >
                your orders
            </Text>
            <OrderList
                onClickOrderDetails={setOrderId}
                customerOrder={data?.customerOrders?.items ?? []}
            />

            {(data?.customerOrders?.total_count ?? 0) >
                (data?.customerOrders?.items?.length ?? 0) && (
                <Button
                    variant="outline"
                    className="w-[90%] md:w-fit py-5 md:px-[72px] rounded-3xl mx-auto mt-[48px] cursor-pointer border-2 border-black font-semibold text-lg md:text-xl flex items-center"
                >
                    view more orders
                </Button>
            )}
        </section>
    );
};

export default Order;
