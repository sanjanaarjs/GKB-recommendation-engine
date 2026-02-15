"use client";

import MyOrderSummary from "./MyOrderSummary";
import Text from "@/components/generic/Text";
import { IOrderDetails } from "./datas/types";
import ChevronLeft from "@/components/icons/ChevronLeft";
import { useQuery } from "@apollo/client";
import {
    CustomerOrderDetailsResponse,
    GET_CUSTOMER_ORDER_DETAILS,
} from "./datas/order.data.api";
import { formatOrderDate } from "@/lib/utils/formatOrderDate";

export default function OrderDetail({
    onBackClick,
    orderId,
}: Readonly<IOrderDetails>) {
    const { data } = useQuery<CustomerOrderDetailsResponse>(
        GET_CUSTOMER_ORDER_DETAILS,
        {
            variables: { orderNumber: orderId },
        },
    );

    const orderItems = data?.customer.orders.items?.[0];

    return (
        <section className="flex flex-col w-full h-full gap-y-8">
            {/* Header Title */}
            <button
                className="flex gap-x-2 items-center cursor-pointer  pt-10 md:pt-0"
                onClick={() => onBackClick()}
                type="button"
            >
                <ChevronLeft fill="black" size={16} />
                <Text font="helvetica" className="text-[28px] md:text-[32px]">
                    details of your order
                </Text>
            </button>

            {/* Order Info Row */}
            <div className="flex flex-col sm:flex-row justify-between w-full gap-y-2 lg:gap-y-3 lg:mt-6">
                <div className="flex gap-x-2">
                    <Text
                        className="text-base text-font-main font-light"
                        font="helvetica"
                    >
                        Order number:
                    </Text>
                    <Text className="text-base text-font-main font-bold">
                        {orderItems?.order_number}
                    </Text>
                </div>

                <div className="flex gap-x-2">
                    <Text
                        className="text-base text-font-main font-light"
                        font="helvetica"
                    >
                        Order placed on:
                    </Text>
                    <Text className="text-base text-font-main font-bold">
                        {formatOrderDate(orderItems?.order_date)}
                    </Text>
                </div>
            </div>

            {/* Summary Section */}
            <MyOrderSummary
                customer={data?.customer}
                orderNumber={orderItems?.order_number}
            />
        </section>
    );
}
