"use client";

import Text from "@/components/generic/Text";
import OrderProgress from "./OrderProgress";
import { LinkIcon } from "lucide-react";
import OrderBanner from "./OrderBanner";
import ShippingSection from "./ShippingSection";
import OtherOrders from "./OtherOrder";
import PaymentSummary from "./PaymentSummary";
import { CustomerOrderDetailsResponse } from "./datas/order.data.api";
import {
    SHIPROCKET_TRACKING_URL,
    ShiprocketTrackingResponse,
    ShiprocketTrackingVariables,
} from "./datas/shiprocketTracking";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import TruckDelivery from "@/components/icons/TruckDelivery";

interface MyOrderSummaryProps {
    customer?: CustomerOrderDetailsResponse["customer"];
    orderNumber?: string;
}

export default function MyOrderSummary({
    customer,
    orderNumber,
}: Readonly<MyOrderSummaryProps>) {
    const firstOrder = customer?.orders?.items?.[0];
    const thumbnailUrl = firstOrder?.items?.[0]?.product?.thumbnail?.url || "";
    const product_name = firstOrder?.items?.[0]?.product_name || "";
    const product_sale_price = firstOrder?.items?.[0].product_sale_price || {
        currency: "₹",
        value: 0,
    };

    const shippingAddress = firstOrder?.shipping_address;
    const billingAddress = firstOrder?.billing_address;
    const email = customer?.email;
    const paymentMethod = firstOrder?.payment_methods?.[0]?.name;
    const OrderTotals = firstOrder?.total;
    const otherItems = firstOrder?.items;
    const awbNumber = firstOrder?.shipments?.[0]?.tracking?.[0]?.number ?? "";

    const { data, loading } = useQuery<
        ShiprocketTrackingResponse,
        ShiprocketTrackingVariables
    >(SHIPROCKET_TRACKING_URL, {
        variables: { awb: awbNumber },
        skip: !awbNumber,
    });

    console.log("firstOrder", firstOrder);
    const shiprocketData = data?.shiprocketTracking;

    const shouldShowTracking =
        awbNumber &&
        shiprocketData?.activity &&
        shiprocketData.activity.length > 0;

    const isOrderLoading = !customer || !firstOrder || (awbNumber && loading);

    if (isOrderLoading) {
        return (
            <div className="w-full py-20 flex justify-center items-center">
                <Text font="helvetica" className="text-sm text-font-main">
                    Loading order details...
                </Text>
            </div>
        );
    }

    return (
        <div className="w-full py-6">
            {shouldShowTracking && (
                <>
                    <div className="flex gap-x-5">
                        <TruckDelivery size={24} />
                        <div className="flex justify-start">
                            <div className="flex flex-col mb-1">
                                <Text
                                    weight="bold"
                                    font="helvetica"
                                    className="text-black"
                                >
                                    {shiprocketData?.edd}
                                </Text>
                                <div className="flex items-center gap-x-2 mt-1 justify-center">
                                    <Text
                                        weight="normal"
                                        className="text-sm text-font-main"
                                    >
                                        {shiprocketData?.current_status}
                                    </Text>
                                    <Text
                                        weight="normal"
                                        className="text-sm text-font-main"
                                    >
                                        |
                                    </Text>
                                    <div className="flex items-center gap-x-1">
                                        <LinkIcon size={12} color="#000" />
                                        <Link
                                            href={
                                                shiprocketData?.track_url || "#"
                                            }
                                            target="_blank"
                                        >
                                            <Text
                                                weight="normal"
                                                className="text-sm text-font-main hover:underline hover:cursor-pointer font-avenir"
                                            >
                                                Track your shipment here
                                            </Text>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="pt-[18px] pl-12">
                        <OrderProgress shiprocketData={shiprocketData} />
                    </div>
                </>
            )}
            <div className="relative md:px-20 md:pt-10">
                <OrderBanner
                    thumbnailUrl={thumbnailUrl}
                    product_name={product_name}
                    product_sale_price={product_sale_price}
                />
            </div>
            <div className="border-b border-border-light-grey w-full h-[1px] py-6" />
            <div className="mt-16">
                <ShippingSection
                    shippingAddress={shippingAddress}
                    email={email}
                />
            </div>
            <div className="border-b border-border-light-grey w-full h-[1px] py-6" />
            <div className="pt-[60px]">
                <OtherOrders
                    otherItems={otherItems}
                    orderNumber={orderNumber}
                />
                <div className="border-b border-border-light-grey w-full h-[1px] py-6" />
            </div>
            <div className="flex flex-col pt-12">
                <PaymentSummary
                    billingAddress={billingAddress}
                    email={email}
                    paymentMethod={paymentMethod}
                    OrderTotals={OrderTotals}
                />
            </div>
        </div>
    );
}
