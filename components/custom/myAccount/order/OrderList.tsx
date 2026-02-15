"use client";

import React from "react";
import OrderCard from "./OrderCard";
import Text from "@/components/generic/Text";
import { CircleX } from "lucide-react";
import { IOrderList } from "./datas/types";
import Link from "next/link";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationPrevious,
    PaginationNext,
} from "@/components/ui/pagination";
import { formatOrderDate } from "@/lib/utils/formatOrderDate";

const OrderList = ({ onClickOrderDetails, customerOrder }: IOrderList) => {
    // pagination
    const [currentPage, setCurrentPage] = React.useState(1);
    const ordersPerPage = 3;

    const customerOrders = React.useMemo(() => {
        if (!customerOrder) return [];

        return [...customerOrder].sort(
            (a, b) =>
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime(),
        );
    }, [customerOrder]);
    const totalPages = Math.ceil(customerOrders.length / ordersPerPage);

    const indexOfLast = currentPage * ordersPerPage;
    const indexOfFirst = indexOfLast - ordersPerPage;
    const paginatedOrders = customerOrders.slice(indexOfFirst, indexOfLast);

    if (customerOrders && customerOrders?.length === 0) {
        return (
            <div className="bg-white my-6 px-6 py-10 md:p-0 md:m-auto justify-center flex flex-col gap-y-4">
                <Text
                    font="helvetica"
                    className="text-black text-center text-xl4"
                    weight="semibold"
                >
                    No Order Available
                </Text>
                <Link
                    href="/"
                    className="bg-black text-center cursor-pointer text-white rounded-full px-20 py-2 text-xl"
                >
                    Shop Now
                </Link>
            </div>
        );
    }

    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === totalPages;

    return (
        <section className="space-y-8 w-full">
            {paginatedOrders.map((order, index) => (
                <div
                    key={order.id}
                    className={`border-b lg:border-border-light-grey border-border-color-light pb-6 md:pb-10 md:mb-10 ${
                        index === order.items.length - 1 ? "border-none" : ""
                    }`}
                >
                    {/* Order Header */}
                    <div className="flex justify-between flex-col w-full gap-y-2 pt-2 pb-4 md:pt-12 md:pb-6">
                        <div>
                            <Text
                                font="helvetica"
                                size="xl"
                                weight="bold"
                                color="fontMain"
                                className="text-base md:text-xl"
                            >
                                {formatOrderDate(order.created_at)}
                            </Text>
                        </div>
                        <div className="flex w-full justify-between items-center">
                            <Text
                                className="text-xs md:text-sm"
                                font="helvetica"
                                weight="normal"
                                color="fontMain"
                            >
                                {order.items.length} items: ₹{order.grand_total}
                            </Text>
                            <Text
                                className="text-sm"
                                font="helvetica"
                                weight="normal"
                                color="fontMain"
                            >
                                Order ID: {order.order_number}
                            </Text>
                        </div>
                    </div>

                    {/* Order Items */}
                    <div className="flex flex-col gap-y-6 md:gap-y-8">
                        {order.items.map((item, index) => (
                            <OrderCard
                                arrivalDate=""
                                productName={item.product_name}
                                productDesc={item?.product?.description}
                                productImage={item?.product?.image?.url}
                                productQuantity={item.quantity_ordered}
                                key={`${order.order_number}-${item.product_url_key}-${index}`}
                                {...item}
                                onClickOrderDetails={() =>
                                    onClickOrderDetails(order?.order_number)
                                }
                            />
                        ))}
                    </div>

                    {/* Cancel Order Button */}
                    <button className="gap-x-1 w-full justify-end mt-6 items-center cursor-pointer hidden">
                        <CircleX className="w-5 h-5 md:w-5 md:h-5" />
                        <Text
                            size="base"
                            className="italic text-black font-semibold text-sm md:text-base"
                        >
                            Cancel Order
                        </Text>
                    </button>
                </div>
            ))}
            {customerOrders.length > ordersPerPage && (
                <Pagination className="py-6">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                className={`cursor-pointer ${
                                    isFirstPage
                                        ? "cursor-not-allowed opacity-50"
                                        : ""
                                }`}
                                onClick={() =>
                                    setCurrentPage((p) => Math.max(p - 1, 1))
                                }
                            />
                        </PaginationItem>

                        {Array.from({ length: totalPages }).map(
                            (_, pageIndex) => (
                                <PaginationItem key={pageIndex}>
                                    <button
                                        onClick={() =>
                                            setCurrentPage(pageIndex + 1)
                                        }
                                        className={`px-3 py-1 rounded-md text-sm ${
                                            currentPage === pageIndex + 1
                                                ? "bg-black text-white"
                                                : "text-black hover:bg-gray-200"
                                        }`}
                                    >
                                        {pageIndex + 1}
                                    </button>
                                </PaginationItem>
                            ),
                        )}

                        <PaginationItem>
                            <PaginationNext
                                className={`cursor-pointer ${
                                    isLastPage
                                        ? "cursor-not-allowed opacity-50"
                                        : ""
                                }`}
                                onClick={() =>
                                    setCurrentPage((p) =>
                                        Math.min(p + 1, totalPages),
                                    )
                                }
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            )}
        </section>
    );
};

export default OrderList;
