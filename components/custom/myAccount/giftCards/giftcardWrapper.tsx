"use client";
import Text from "@/components/generic/Text";
import TransactionsLogIcon from "@/components/icons/TransactionsLogIcon";
import { Button } from "@/components/ui/button";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import SignOut from "@/components/icons/SignOut";
import ChevronLeft from "@/components/icons/ChevronLeft";
import { useRouter } from "next/navigation";
import { useLogout } from "@/lib/hooks/useLogout";
import CardBalanceIcon from "@/components/icons/CardBalanceIcon";
import {
    GET_GIFT_CARD_HISTORY_QUERY,
    GetGiftCardHistoryData,
} from "./giftCard.data.api";
import { useQuery } from "@apollo/client";

export default function GiftCardWrapper() {
    const router = useRouter();
    const { handleLogout } = useLogout();

    const { data } = useQuery<GetGiftCardHistoryData>(
        GET_GIFT_CARD_HISTORY_QUERY,
        {
            fetchPolicy: "no-cache",
        },
    );

    const giftCardList = data?.getGiftCardHistory.giftCartList || [];

    return (
        <>
            <div className="flex  justify-between lg:hidden -mt-3">
                <div
                    className="flex items-center gap-2"
                    onClick={() => router.back()}
                >
                    <ChevronLeft fill="black" size={16} />
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
            <div className="lg:flex-1 bg-[#F7F7F7] lg:bg-[#FFF]">
                <Text
                    font="helvetica"
                    size="customText17"
                    weight="light"
                    className="pt-6 lg:pb-[72px] lg:pt-0 pb-12"
                >
                    your gift cards
                </Text>
                <div className="flex flex-col gap-2 pb-6 md:px-4">
                    <Text font="helvetica" size="base" weight="extrabold">
                        Gift card details
                    </Text>
                    <Text
                        font="helvetica"
                        size="productTitle1"
                        weight="customWeight1"
                    >
                        The following gift cards are issued from your email
                        address:
                    </Text>
                </div>
                {giftCardList.map((card) => (
                    <div
                        className="flex flex-col shadow-[0_6px_24px_0_rgba(0,0,0,0.10)] lg:mb-12 mb-6"
                        key={card.id}
                    >
                        <div className="flex flex-col gap-6 pb-6 border-b-[1px] bg-[#FFF] px-4 lg:p-6 pt-4 border-b-border-color-white">
                            <div className="flex lg:justify-between gap-6">
                                <Text
                                    font="helvetica"
                                    size="sm"
                                    weight="light"
                                    className="w-30"
                                >
                                    Card number:
                                </Text>
                                <Text
                                    font="helvetica"
                                    size="sm"
                                    weight="extrabold"
                                >
                                    {card.giftCardCode}
                                </Text>
                            </div>
                            <div className="flex lg:justify-between gap-6">
                                <Text
                                    font="helvetica"
                                    size="sm"
                                    weight="light"
                                    className="w-30"
                                >
                                    Issued on:
                                </Text>
                                <Text
                                    font="helvetica"
                                    size="sm"
                                    weight="extrabold"
                                >
                                    {card.issuedOn.split(" ")[0]}
                                </Text>
                            </div>
                            <div className="flex lg:justify-between gap-6">
                                <Text
                                    font="helvetica"
                                    size="sm"
                                    weight="light"
                                    className="w-30"
                                >
                                    Expired at:
                                </Text>
                                <Text
                                    font="helvetica"
                                    size="sm"
                                    weight="extrabold"
                                >
                                    {card.expireAt.split(" ")[0]}
                                </Text>
                            </div>
                            <div className="flex lg:justify-between gap-6">
                                <Text
                                    font="helvetica"
                                    size="sm"
                                    weight="light"
                                    className="w-30"
                                >
                                    Issued amount:
                                </Text>
                                <Text
                                    font="helvetica"
                                    size="sm"
                                    weight="extrabold"
                                >
                                    {Number(card.issuedAmount).toFixed(2)}
                                </Text>
                            </div>
                        </div>
                        <div className="flex flex-col gap-6 border-b-[1px] bg-[#FFF] border-b-border-color-white">
                            <Accordion
                                type="single"
                                collapsible
                                className="w-full"
                                defaultValue="item-1"
                            >
                                <AccordionItem
                                    value="item-1"
                                    className="px-6 py-2 lg:px-6 lg:py-2"
                                >
                                    <AccordionTrigger>
                                        <div className="flex gap-1 items-center">
                                            <CardBalanceIcon size={14} />
                                            <Text
                                                font="helvetica"
                                                size="sm"
                                                weight="extrabold"
                                            >
                                                Card balance
                                            </Text>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <div>
                                            <Text
                                                font="helvetica"
                                                weight="light"
                                                size="sm"
                                                className="mt-6"
                                                as="span"
                                            >
                                                Your current card balance is ₹
                                            </Text>
                                            <Text
                                                font="helvetica"
                                                weight="extrabold"
                                                size="sm"
                                                className="mt-6"
                                                as="span"
                                            >
                                                {Number(card.balance).toFixed(
                                                    2,
                                                )}
                                            </Text>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                                {card.GiftCardOrderHistory.map(
                                    (orderHistory) => (
                                        <AccordionItem
                                            value={`item-2-${orderHistory.id}`}
                                            className="px-6 py-2 lg:px-6 lg:py-2"
                                            key={orderHistory.id}
                                        >
                                            <AccordionTrigger>
                                                <div className="flex gap-1 items-center">
                                                    <TransactionsLogIcon
                                                        size={16}
                                                    />
                                                    <Text
                                                        font="helvetica"
                                                        size="sm"
                                                        weight="extrabold"
                                                    >
                                                        Transactions log
                                                    </Text>
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                <div className="flex flex-col gap-6">
                                                    <div className="flex flex-col gap-2">
                                                        <div className="flex justify-between">
                                                            <Text
                                                                font="helvetica"
                                                                size="sm"
                                                                weight="normal"
                                                            >
                                                                Redeemed Date
                                                            </Text>
                                                            <Text
                                                                font="helvetica"
                                                                size="sm"
                                                                weight="normal"
                                                            >
                                                                {
                                                                    orderHistory?.useDate.split(
                                                                        " ",
                                                                    )[0]
                                                                }
                                                            </Text>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <Text
                                                                font="helvetica"
                                                                size="sm"
                                                                weight="normal"
                                                                color="fontMain"
                                                            >
                                                                Order ID:{" "}
                                                                {
                                                                    orderHistory?.orderId
                                                                }
                                                            </Text>
                                                            <Text
                                                                font="helvetica"
                                                                size="sm"
                                                                weight="normal"
                                                                color="fontMain"
                                                            >
                                                                ₹
                                                                {Number(
                                                                    orderHistory?.amount,
                                                                ).toFixed(2)}
                                                            </Text>
                                                        </div>
                                                    </div>
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>
                                    ),
                                )}
                            </Accordion>
                        </div>
                    </div>
                ))}
                {giftCardList.length > 3 ? (
                    <div className="hidden items-center justify-center lg:flex">
                        <Button className="py-8 lg:py-18 cursor-pointer">
                            <Text
                                font="helvetica"
                                size="productTitle2"
                                weight="extrabold"
                                color="fontMain"
                                className="px-8 py-2 lg:px-18 lg:py-3 border-[2px] rounded-[40px] border-border-color-black"
                            >
                                view more gift cards
                            </Text>
                        </Button>
                    </div>
                ) : (
                    <div className="hidden items-center justify-center lg:flex">
                        <Button
                            className="py-8 lg:py-18 cursor-pointer"
                            onClick={() => router.push("/gift-card")}
                        >
                            <Text
                                font="helvetica"
                                size="productTitle2"
                                weight="extrabold"
                                color="fontMain"
                                className="px-8 py-2 lg:px-18 lg:py-3 border-[2px] rounded-[40px] border-border-color-black"
                            >
                                Purchase gift card
                            </Text>
                        </Button>
                    </div>
                )}
            </div>
        </>
    );
}
