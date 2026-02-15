import React from "react";
import { Button } from "@/components/ui/button";
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion";
import ChevronLeft from "@/components/icons/ChevronLeft";
import Text from "@/components/generic/Text";
import ChevronRight from "@/components/icons/ChevronRight";

export default function AddressStep({
    onNext,
    onBack,
    onEdit,
}: {
    onNext: () => void;
    onBack: () => void;
    onEdit: () => void;
}) {
    return (
        <div className="lg:pr-[80px] pb-8">
            <div className="flex flex-col gap-6 mb-[16px]">
                <div onClick={onBack}>
                    {" "}
                    <ChevronLeft size={24} fill="black" />
                </div>

                <Text
                    as={"h1"}
                    className="text-black font-helvetica text-[1rem] lg:text-[2rem] font-light mb-[16px]"
                >
                    Where should we deliver your order?
                </Text>
            </div>

            <div className="bg-white shadow-lg p-6 rounded-[8px]">
                <Text
                    as={"h4"}
                    className="text-green-700 font-helvetica text-sm lg:text-[1.25rem] font-normal mb-[8px] hidden"
                >
                    You are successfully logged in!
                </Text>

                <Accordion type="single" collapsible defaultValue="saved">
                    <AccordionItem value="saved">
                        <AccordionTrigger className="group hover:no-underline [&>*]:hover:no-underline">
                            <div>
                                <Text
                                    as="h4"
                                    className="text-black font-helvetica text-sm lg:text-[1.25rem] font-bold mb-[8px]"
                                >
                                    Shipping address
                                </Text>
                                <Text
                                    as="h4"
                                    className="text-black font-helvetica text-sm lg:text-[1.25rem] font-normal"
                                >
                                    Select from saved addresses
                                </Text>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className="my-[32px]">
                                <div className="flex items-start gap-4 mb-[32px]">
                                    <input
                                        type="radio"
                                        name="addr"
                                        className="mt-1 w-6 h-6 border-2 border-black rounded-full checked:bg-black checked:border-black accent-black"
                                        defaultChecked
                                    />

                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <Text
                                                    as="h4"
                                                    className="text-black font-helvetica text-sm lg:text-[1.25rem] font-normal"
                                                >
                                                    Monisha Saha
                                                </Text>
                                                <Text
                                                    as="h4"
                                                    className="text-black font-helvetica text-sm lg:text-[1.25rem] font-normal w-full"
                                                >
                                                    32, Royal Apartments,
                                                    Indiranagar, Bengaluru -
                                                    560009
                                                </Text>
                                            </div>
                                            <button
                                                type="button"
                                                className="text-[1.25rem] font-helvetica italic leading-normal font-normal cursor-pointer flex items-start gap-4 shadow-none p-0"
                                                onClick={onEdit}
                                            >
                                                Edit
                                                <div className="italic">
                                                    <ChevronRight
                                                        size={16}
                                                        fill="black"
                                                    />
                                                </div>
                                            </button>
                                        </div>
                                        <div className="mt-3">
                                            <Button
                                                size="sm"
                                                className="border rounded-none border-border-color-light text-xs font-normal leading-[18px] text-black bg-background-grey px-2 py-1 cursor-pointer"
                                            >
                                                Deliver here
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 mb-[32px]">
                                    <input
                                        type="radio"
                                        name="addr"
                                        className="mt-1 w-6 h-6 border-2 border-black rounded-full checked:bg-black checked:border-black accent-black"
                                        defaultChecked
                                    />
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <Text
                                                    as="h4"
                                                    className="text-black font-helvetica text-sm lg:text-[1.25rem] font-normal"
                                                >
                                                    Firstname Lastname,
                                                </Text>
                                                <Text
                                                    as="h4"
                                                    className="text-black font-helvetica text-sm lg:text-[1.25rem] font-normal w-full"
                                                >
                                                    No2, Apartment, Area, City,
                                                    State, PIN
                                                </Text>
                                            </div>
                                            <button
                                                type="button"
                                                className="text-[1.25rem] font-helvetica italic leading-normal font-normal cursor-pointer flex items-start gap-4 shadow-none p-0"
                                                onClick={onEdit}
                                            >
                                                Edit
                                                <div className="italic">
                                                    <ChevronRight
                                                        size={16}
                                                        fill="black"
                                                    />
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    className="text-[1.25rem] font-helvetica italic leading-normal font-normal cursor-pointer flex items-start gap-4 shadow-none p-0"
                                >
                                    View more addresses
                                    <div className="italic">
                                        <ChevronRight
                                            size={16}
                                            fill="black"
                                            className="rotate-90"
                                        />
                                    </div>
                                </button>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

                <div className="mt-6">
                    <Text
                        as="h4"
                        className="text-black font-helvetica text-sm lg:text-[1.25rem] font-bold mb-[8px]"
                    >
                        Billing address
                    </Text>
                    <div className="flex items-center gap-3 mt-3">
                        <input
                            type="radio"
                            name="billing"
                            className="w-6 h-6 border-2 border-black rounded-full checked:bg-black checked:border-black accent-black"
                        />
                        <Text
                            as="h4"
                            className="text-black font-helvetica text-sm lg:text-[1.25rem] font-normal"
                        >
                            Same as shipping address
                        </Text>
                    </div>
                </div>

                <div className="mt-6 flex gap-3">
                    <div className="w-full text-center">
                        <Button
                            onClick={onNext}
                            className="my-4 rounded-full bg-black text-white hover:bg-gray-900 w-full max-w-[340px] p-[24px] font-helvetica text-[1.25rem] leading-normal font-bold"
                        >
                            Proceed to Pay
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
