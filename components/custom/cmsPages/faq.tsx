"use client";

import Text from "@/components/generic/Text";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Plus, Minus } from "lucide-react";

export default function FaqPage() {
    return (
        <div>
            {/* TOP SEARCH SECTION*/}
            <div className="lg:py-20 lg:px-20 px-10 py-6 bg-background-grey">
                <Text
                    color="black"
                    font="helvetica"
                    size="customText16"
                    weight="light"
                    className="mb-[30px]"
                >
                    frequently asked questions{" "}
                </Text>
                <div className="relative">
                    <label className="bg-white w-fit left-[35%] -translate-x-1/2 lg:translate-x-0 absolute lg:left-[30px] top-[-10%]">
                        <Text
                            font="helvetica"
                            color="fontSecondary"
                            size="customText11"
                        >
                            What you are looking for?
                        </Text>
                    </label>
                    <input
                        type="text"
                        placeholder="What you are looking for?"
                        className="w-full border border-black placeholder-transparent rounded-full px-6 py-4 text-lg mb-10"
                    />
                </div>
            </div>

            {/* FAQ CONTENT */}
            <div className="lg:px-0 lg:py-[80px]">
                <div className="flex flex-col lg:flex-row lg:gap-12 gap-6 lg:p-20 p-10 border-b border-border-color-light">
                    <div className="lg:w-[30%]">
                        <Text
                            font="helvetica"
                            weight="extrabold"
                            size="customText12"
                        >
                            Orders
                        </Text>
                    </div>
                    <div className="lg:w-[70%]">
                        <Accordion type="single" collapsible>
                            <AccordionItem
                                value="faq-1"
                                className="border-none lg:pb-20 pb-10"
                            >
                                <div className="flex justify-between items-start cursor-pointer gap-6">
                                    <Text
                                        font="helvetica"
                                        weight="light"
                                        size="customText12"
                                        className="leading-[40px]"
                                    >
                                        How do I submit my prescription?
                                    </Text>

                                    <AccordionTrigger
                                        className="group bg-white p-2 lg:p-3
        w-12 h-12
        rounded-full
        shadow-[0_12px_44px_0_rgba(0,0,0,0.10)]
        hover:no-underline
        flex
        items-center
        justify-center
        border-none
        focus:outline-none
        focus:ring-0
        focus-visible:ring-0
        [&>svg:last-child]:hidden cursor-pointer
    "
                                    >
                                        <Plus className="block group-data-[state=open]:hidden" />
                                        <Minus className="hidden group-data-[state=open]:block" />
                                    </AccordionTrigger>
                                </div>
                                <AccordionContent className="pt-6 lg:max-w-[742px]">
                                    <Text
                                        font="helvetica"
                                        weight="normal"
                                        size="xl"
                                        className="leading-[28px]"
                                        as="span"
                                    >
                                        To upload your prescription, you can
                                        choose from three convenient
                                        options: select a saved
                                        prescription from{" "}
                                    </Text>
                                    <Text
                                        font="helvetica"
                                        weight="extrabold"
                                        size="xl"
                                        className="leading-[26px]"
                                        as="span"
                                    >
                                        your account
                                    </Text>{" "}
                                    <Text
                                        font="helvetica"
                                        weight="normal"
                                        size="xl"
                                        className="leading-[28px]"
                                        as="span"
                                    >
                                        , upload a prescription PDF directly,
                                        or share it with our customer care
                                        team during a scheduled call back.
                                    </Text>
                                    <br />
                                    <br />
                                    <Text
                                        font="helvetica"
                                        weight="normal"
                                        size="xl"
                                        className="leading-[28px]"
                                    >
                                        If you don’t have a prescription yet, no
                                        worries — you can easily {" "}
                                        <Text
                                            font="helvetica"
                                            weight="extrabold"
                                            size="xl"
                                            className="leading-[26px]"
                                            as="span"
                                        >
                                            book an appointment 
                                        </Text>
                                        <Text
                                            font="helvetica"
                                            weight="normal"
                                            size="xl"
                                            className="leading-[28px]"
                                            as="span"
                                        >
                                            to get your eyes tested either at
                                            one of our stores or in the comfort
                                            of your home.
                                        </Text>
                                        <br />
                                        <br />
                                        <Text
                                            font="helvetica"
                                            weight="normal"
                                            size="xl"
                                            className="leading-[28px]"
                                        >
                                            This ensures we have your accurate
                                            prescription before processing your
                                            order.
                                        </Text>
                                    </Text>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem
                                value="faq-2"
                                className="border-none lg:pb-20 pb-10"
                            >
                                <div className="flex justify-between items-start cursor-pointer gap-6">
                                    <Text
                                        font="helvetica"
                                        weight="light"
                                        size="customText12"
                                        className="leading-[40px]"
                                    >
                                        What do I need to order?
                                    </Text>
                                    <AccordionTrigger
                                        className="
        group
        bg-white
        p-2 lg:p-3
        rounded-full
        w-12 h-12
        shadow-[0_12px_44px_0_rgba(0,0,0,0.10)]
        hover:no-underline
        flex
        items-center
        justify-center border-none
        focus:outline-none
        focus:ring-0
        focus-visible:ring-0
        [&>svg:last-child]:hidden cursor-pointer
    "
                                    >
                                        <Plus className="block group-data-[state=open]:hidden" />
                                        <Minus className="hidden group-data-[state=open]:block" />
                                    </AccordionTrigger>
                                </div>
                                <AccordionContent className="pt-6 lg:max-w-[742px]">
                                    <Text
                                        font="helvetica"
                                        weight="normal"
                                        size="xl"
                                        className="leading-[28px]"
                                        as="span"
                                    >
                                        To upload your prescription, you can
                                        choose from three convenient
                                        options: select a saved
                                        prescription from{" "}
                                    </Text>
                                    <Text
                                        font="helvetica"
                                        weight="extrabold"
                                        size="xl"
                                        className="leading-[26px]"
                                        as="span"
                                    >
                                        your account
                                    </Text>{" "}
                                    <Text
                                        font="helvetica"
                                        weight="normal"
                                        size="xl"
                                        className="leading-[28px]"
                                        as="span"
                                    >
                                        , upload a prescription PDF directly,
                                        or share it with our customer care
                                        team during a scheduled call back.
                                    </Text>
                                    <br />
                                    <br />
                                    <Text
                                        font="helvetica"
                                        weight="normal"
                                        size="xl"
                                        className="leading-[28px]"
                                    >
                                        If you don’t have a prescription yet, no
                                        worries — you can easily {" "}
                                        <Text
                                            font="helvetica"
                                            weight="extrabold"
                                            size="xl"
                                            className="leading-[26px]"
                                            as="span"
                                        >
                                            book an appointment 
                                        </Text>
                                        <Text
                                            font="helvetica"
                                            weight="normal"
                                            size="xl"
                                            className="leading-[28px]"
                                            as="span"
                                        >
                                            to get your eyes tested either at
                                            one of our stores or in the comfort
                                            of your home.
                                        </Text>
                                        <br />
                                        <br />
                                        <Text
                                            font="helvetica"
                                            weight="normal"
                                            size="xl"
                                            className="leading-[28px]"
                                        >
                                            This ensures we have your accurate
                                            prescription before processing your
                                            order.
                                        </Text>
                                    </Text>
                                </AccordionContent>{" "}
                            </AccordionItem>
                            <AccordionItem
                                value="faq-3"
                                className="border-none"
                            >
                                <div className="flex justify-between items-start cursor-pointer gap-6">
                                    <Text
                                        font="helvetica"
                                        weight="light"
                                        size="customText12"
                                        className="leading-[40px]"
                                    >
                                        What if I need to change or cancel my
                                        order?{" "}
                                    </Text>
                                    <AccordionTrigger
                                        className="
        group
        bg-white
        p-2 lg:p-3
        rounded-full
        w-12 h-12
        shadow-[0_12px_44px_0_rgba(0,0,0,0.10)]
        hover:no-underline
        flex
        items-center
        justify-center
                border-none
        focus:outline-none
        focus:ring-0
        focus-visible:ring-0
        [&>svg:last-child]:hidden
        cursor-pointer
    "
                                    >
                                        <Plus className="block group-data-[state=open]:hidden" />
                                        <Minus className="hidden group-data-[state=open]:block" />
                                    </AccordionTrigger>
                                </div>
                                <AccordionContent className="pt-6 lg:max-w-[742px]">
                                    <Text
                                        font="helvetica"
                                        weight="normal"
                                        size="xl"
                                        className="leading-[28px]"
                                        as="span"
                                    >
                                        To upload your prescription, you can
                                        choose from three convenient
                                        options: select a saved
                                        prescription from{" "}
                                    </Text>
                                    <Text
                                        font="helvetica"
                                        weight="extrabold"
                                        size="xl"
                                        className="leading-[26px]"
                                        as="span"
                                    >
                                        your account
                                    </Text>{" "}
                                    <Text
                                        font="helvetica"
                                        weight="normal"
                                        size="xl"
                                        className="leading-[28px]"
                                        as="span"
                                    >
                                        , upload a prescription PDF directly,
                                        or share it with our customer care
                                        team during a scheduled call back.
                                    </Text>
                                    <br />
                                    <br />
                                    <Text
                                        font="helvetica"
                                        weight="normal"
                                        size="xl"
                                        className="leading-[28px]"
                                    >
                                        If you don’t have a prescription yet, no
                                        worries — you can easily {" "}
                                        <Text
                                            font="helvetica"
                                            weight="extrabold"
                                            size="xl"
                                            className="leading-[26px]"
                                            as="span"
                                        >
                                            book an appointment 
                                        </Text>
                                        <Text
                                            font="helvetica"
                                            weight="normal"
                                            size="xl"
                                            className="leading-[28px]"
                                            as="span"
                                        >
                                            to get your eyes tested either at
                                            one of our stores or in the comfort
                                            of your home.
                                        </Text>
                                        <br />
                                        <br />
                                        <Text
                                            font="helvetica"
                                            weight="normal"
                                            size="xl"
                                            className="leading-[28px]"
                                        >
                                            This ensures we have your accurate
                                            prescription before processing your
                                            order.
                                        </Text>
                                    </Text>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row lg:gap-12 gap-6 lg:p-20 p-10 border-b border-border-color-light">
                    <div className="lg:w-[30%]">
                        <Text
                            font="helvetica"
                            weight="extrabold"
                            size="customText12"
                        >
                            Eye tests and vision services
                        </Text>
                    </div>
                    <div className="lg:w-[70%]">
                        <Accordion type="single" collapsible>
                            <AccordionItem
                                value="faq-4"
                                className=" border-none lg:pb-20 pb-10"
                            >
                                <div className="flex justify-between items-start cursor-pointer gap-6">
                                    <Text
                                        font="helvetica"
                                        weight="light"
                                        size="customText12"
                                        className="leading-[40px]"
                                    >
                                        How do I get my eyes tested?{" "}
                                    </Text>
                                    <AccordionTrigger
                                        className="
        group
        bg-white
        p-2 lg:p-3
        rounded-full
        w-12 h-12
        shadow-[0_12px_44px_0_rgba(0,0,0,0.10)]
        hover:no-underline
        flex
        items-center
        justify-center
                border-none
        focus:outline-none
        focus:ring-0
        focus-visible:ring-0
        [&>svg:last-child]:hidden cursor-pointer
    "
                                    >
                                        <Plus className="block group-data-[state=open]:hidden" />
                                        <Minus className="hidden group-data-[state=open]:block" />
                                    </AccordionTrigger>
                                </div>
                                <AccordionContent className="pt-6 lg:max-w-[742px]">
                                    <Text
                                        font="helvetica"
                                        weight="normal"
                                        size="xl"
                                        className="leading-[28px]"
                                        as="span"
                                    >
                                        To upload your prescription, you can
                                        choose from three convenient
                                        options: select a saved
                                        prescription from{" "}
                                    </Text>
                                    <Text
                                        font="helvetica"
                                        weight="extrabold"
                                        size="xl"
                                        className="leading-[26px]"
                                        as="span"
                                    >
                                        your account
                                    </Text>{" "}
                                    <Text
                                        font="helvetica"
                                        weight="normal"
                                        size="xl"
                                        className="leading-[28px]"
                                        as="span"
                                    >
                                        , upload a prescription PDF directly,
                                        or share it with our customer care
                                        team during a scheduled call back.
                                    </Text>
                                    <br />
                                    <br />
                                    <Text
                                        font="helvetica"
                                        weight="normal"
                                        size="xl"
                                        className="leading-[28px]"
                                    >
                                        If you don’t have a prescription yet, no
                                        worries — you can easily {" "}
                                        <Text
                                            font="helvetica"
                                            weight="extrabold"
                                            size="xl"
                                            className="leading-[26px]"
                                            as="span"
                                        >
                                            book an appointment 
                                        </Text>
                                        <Text
                                            font="helvetica"
                                            weight="normal"
                                            size="xl"
                                            className="leading-[28px]"
                                            as="span"
                                        >
                                            to get your eyes tested either at
                                            one of our stores or in the comfort
                                            of your home.
                                        </Text>
                                        <br />
                                        <br />
                                        <Text
                                            font="helvetica"
                                            weight="normal"
                                            size="xl"
                                            className="leading-[28px]"
                                        >
                                            This ensures we have your accurate
                                            prescription before processing your
                                            order.
                                        </Text>
                                    </Text>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem
                                value="faq-5"
                                className=" border-none lg:pb-20 pb-10"
                            >
                                <div className="flex justify-between items-start cursor-pointer gap-6">
                                    <Text
                                        font="helvetica"
                                        weight="light"
                                        size="customText12"
                                        className="leading-[40px]"
                                    >
                                        How much do the eye tests cost?{" "}
                                    </Text>
                                    <AccordionTrigger
                                        className="
        group
        bg-white
        p-2 lg:p-3
        rounded-full
        w-12 h-12
        shadow-[0_12px_44px_0_rgba(0,0,0,0.10)]
        hover:no-underline
        flex
        items-center
        justify-center
                border-none
        focus:outline-none
        focus:ring-0
        focus-visible:ring-0
        [&>svg:last-child]:hidden cursor-pointer
    "
                                    >
                                        <Plus className="block group-data-[state=open]:hidden" />
                                        <Minus className="hidden group-data-[state=open]:block" />
                                    </AccordionTrigger>
                                </div>
                                <AccordionContent className="pt-6 lg:max-w-[742px]">
                                    <Text
                                        font="helvetica"
                                        weight="normal"
                                        size="xl"
                                        className="leading-[28px]"
                                        as="span"
                                    >
                                        To upload your prescription, you can
                                        choose from three convenient
                                        options: select a saved
                                        prescription from{" "}
                                    </Text>
                                    <Text
                                        font="helvetica"
                                        weight="extrabold"
                                        size="xl"
                                        className="leading-[26px]"
                                        as="span"
                                    >
                                        your account
                                    </Text>{" "}
                                    <Text
                                        font="helvetica"
                                        weight="normal"
                                        size="xl"
                                        className="leading-[28px]"
                                        as="span"
                                    >
                                        , upload a prescription PDF directly,
                                        or share it with our customer care
                                        team during a scheduled call back.
                                    </Text>
                                    <br />
                                    <br />
                                    <Text
                                        font="helvetica"
                                        weight="normal"
                                        size="xl"
                                        className="leading-[28px]"
                                    >
                                        If you don’t have a prescription yet, no
                                        worries — you can easily {" "}
                                        <Text
                                            font="helvetica"
                                            weight="extrabold"
                                            size="xl"
                                            className="leading-[26px]"
                                            as="span"
                                        >
                                            book an appointment 
                                        </Text>
                                        <Text
                                            font="helvetica"
                                            weight="normal"
                                            size="xl"
                                            className="leading-[28px]"
                                            as="span"
                                        >
                                            to get your eyes tested either at
                                            one of our stores or in the comfort
                                            of your home.
                                        </Text>
                                        <br />
                                        <br />
                                        <Text
                                            font="helvetica"
                                            weight="normal"
                                            size="xl"
                                            className="leading-[28px]"
                                        >
                                            This ensures we have your accurate
                                            prescription before processing your
                                            order.
                                        </Text>
                                    </Text>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem
                                value="faq-6"
                                className=" border-none"
                            >
                                <div className="flex justify-between items-start cursor-pointer gap-6">
                                    <Text
                                        font="helvetica"
                                        weight="light"
                                        size="customText12"
                                        className="leading-[40px]"
                                    >
                                        Can I get a prescription for contact
                                        lenses?{" "}
                                    </Text>
                                    <AccordionTrigger
                                        className="
        group
        bg-white
        p-2 lg:p-3
        rounded-full
        w-12 h-12
        shadow-[0_12px_44px_0_rgba(0,0,0,0.10)]
        hover:no-underline
        flex
        items-center
        justify-center
                border-none
        focus:outline-none
        focus:ring-0
        focus-visible:ring-0
        [&>svg:last-child]:hidden cursor-pointer
    "
                                    >
                                        <Plus className="block group-data-[state=open]:hidden" />
                                        <Minus className="hidden group-data-[state=open]:block" />
                                    </AccordionTrigger>
                                </div>
                                <AccordionContent className="pt-6 lg:max-w-[742px]">
                                    <Text
                                        font="helvetica"
                                        weight="normal"
                                        size="xl"
                                        className="leading-[28px]"
                                        as="span"
                                    >
                                        To upload your prescription, you can
                                        choose from three convenient
                                        options: select a saved
                                        prescription from{" "}
                                    </Text>
                                    <Text
                                        font="helvetica"
                                        weight="extrabold"
                                        size="xl"
                                        className="leading-[26px]"
                                        as="span"
                                    >
                                        your account
                                    </Text>{" "}
                                    <Text
                                        font="helvetica"
                                        weight="normal"
                                        size="xl"
                                        className="leading-[28px]"
                                        as="span"
                                    >
                                        , upload a prescription PDF directly,
                                        or share it with our customer care
                                        team during a scheduled call back.
                                    </Text>
                                    <br />
                                    <br />
                                    <Text
                                        font="helvetica"
                                        weight="normal"
                                        size="xl"
                                        className="leading-[28px]"
                                    >
                                        If you don’t have a prescription yet, no
                                        worries — you can easily {" "}
                                        <Text
                                            font="helvetica"
                                            weight="extrabold"
                                            size="xl"
                                            className="leading-[26px]"
                                            as="span"
                                        >
                                            book an appointment 
                                        </Text>
                                        <Text
                                            font="helvetica"
                                            weight="normal"
                                            size="xl"
                                            className="leading-[28px]"
                                            as="span"
                                        >
                                            to get your eyes tested either at
                                            one of our stores or in the comfort
                                            of your home.
                                        </Text>
                                        <br />
                                        <br />
                                        <Text
                                            font="helvetica"
                                            weight="normal"
                                            size="xl"
                                            className="leading-[28px]"
                                        >
                                            This ensures we have your accurate
                                            prescription before processing your
                                            order.
                                        </Text>
                                    </Text>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row gap-12 lg:p-20 p-10">
                    <div className="lg:w-[30%]">
                        <Text
                            font="helvetica"
                            weight="extrabold"
                            size="customText12"
                        >
                            Returns, exchanges and shipping{" "}
                        </Text>
                    </div>
                    <div className="lg:w-[70%]">
                        <Accordion type="single" collapsible>
                            <AccordionItem
                                value="faq-7"
                                className=" border-none lg:pb-20 pb-10"
                            >
                                <div className="flex justify-between items-start cursor-pointer gap-6">
                                    <Text
                                        font="helvetica"
                                        weight="light"
                                        size="customText12"
                                        className="leading-[40px]"
                                    >
                                        How do I set up a return or
                                        exchange?{" "}
                                    </Text>
                                    <AccordionTrigger
                                        className="
        group
        bg-white
        p-2 lg:p-3
        rounded-full
        w-12 h-12
        shadow-[0_12px_44px_0_rgba(0,0,0,0.10)]
        hover:no-underline
        flex
        items-center
        justify-center
                border-none
        focus:outline-none
        focus:ring-0
        focus-visible:ring-0
        [&>svg:last-child]:hidden cursor-pointer
    "
                                    >
                                        <Plus className="block group-data-[state=open]:hidden" />
                                        <Minus className="hidden group-data-[state=open]:block" />
                                    </AccordionTrigger>
                                </div>
                                <AccordionContent className="pt-6 lg:max-w-[742px]">
                                    <Text
                                        font="helvetica"
                                        weight="normal"
                                        size="xl"
                                        className="leading-[28px]"
                                        as="span"
                                    >
                                        To upload your prescription, you can
                                        choose from three convenient
                                        options: select a saved
                                        prescription from{" "}
                                    </Text>
                                    <Text
                                        font="helvetica"
                                        weight="extrabold"
                                        size="xl"
                                        className="leading-[26px]"
                                        as="span"
                                    >
                                        your account
                                    </Text>{" "}
                                    <Text
                                        font="helvetica"
                                        weight="normal"
                                        size="xl"
                                        className="leading-[28px]"
                                        as="span"
                                    >
                                        , upload a prescription PDF directly,
                                        or share it with our customer care
                                        team during a scheduled call back.
                                    </Text>
                                    <br />
                                    <br />
                                    <Text
                                        font="helvetica"
                                        weight="normal"
                                        size="xl"
                                        className="leading-[28px]"
                                    >
                                        If you don’t have a prescription yet, no
                                        worries — you can easily {" "}
                                        <Text
                                            font="helvetica"
                                            weight="extrabold"
                                            size="xl"
                                            className="leading-[26px]"
                                            as="span"
                                        >
                                            book an appointment 
                                        </Text>
                                        <Text
                                            font="helvetica"
                                            weight="normal"
                                            size="xl"
                                            className="leading-[28px]"
                                            as="span"
                                        >
                                            to get your eyes tested either at
                                            one of our stores or in the comfort
                                            of your home.
                                        </Text>
                                        <br />
                                        <br />
                                        <Text
                                            font="helvetica"
                                            weight="normal"
                                            size="xl"
                                            className="leading-[28px]"
                                        >
                                            This ensures we have your accurate
                                            prescription before processing your
                                            order.
                                        </Text>
                                    </Text>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem
                                value="faq-8"
                                className=" border-none lg:pb-20 pb-10"
                            >
                                <div className="flex justify-between items-start cursor-pointer gap-6">
                                    <Text
                                        font="helvetica"
                                        weight="light"
                                        size="customText12"
                                        className="leading-[40px]"
                                    >
                                        When can I expect my order?{" "}
                                    </Text>
                                    <AccordionTrigger
                                        className="
        group
        bg-white
        p-2 lg:p-3
        rounded-full
        w-12 h-12
        shadow-[0_12px_44px_0_rgba(0,0,0,0.10)]
        hover:no-underline
        flex
        items-center
        justify-center
                border-none
        focus:outline-none
        focus:ring-0
        focus-visible:ring-0
        [&>svg:last-child]:hidden cursor-pointer
    "
                                    >
                                        <Plus className="block group-data-[state=open]:hidden" />
                                        <Minus className="hidden group-data-[state=open]:block" />
                                    </AccordionTrigger>
                                </div>
                                <AccordionContent className="pt-6 lg:max-w-[742px]">
                                    <Text
                                        font="helvetica"
                                        weight="normal"
                                        size="xl"
                                        className="leading-[28px]"
                                        as="span"
                                    >
                                        To upload your prescription, you can
                                        choose from three convenient
                                        options: select a saved
                                        prescription from{" "}
                                    </Text>
                                    <Text
                                        font="helvetica"
                                        weight="extrabold"
                                        size="xl"
                                        className="leading-[26px]"
                                        as="span"
                                    >
                                        your account
                                    </Text>{" "}
                                    <Text
                                        font="helvetica"
                                        weight="normal"
                                        size="xl"
                                        className="leading-[28px]"
                                        as="span"
                                    >
                                        , upload a prescription PDF directly,
                                        or share it with our customer care
                                        team during a scheduled call back.
                                    </Text>
                                    <br />
                                    <br />
                                    <Text
                                        font="helvetica"
                                        weight="normal"
                                        size="xl"
                                        className="leading-[28px]"
                                    >
                                        If you don’t have a prescription yet, no
                                        worries — you can easily {" "}
                                        <Text
                                            font="helvetica"
                                            weight="extrabold"
                                            size="xl"
                                            className="leading-[26px]"
                                            as="span"
                                        >
                                            book an appointment 
                                        </Text>
                                        <Text
                                            font="helvetica"
                                            weight="normal"
                                            size="xl"
                                            className="leading-[28px]"
                                            as="span"
                                        >
                                            to get your eyes tested either at
                                            one of our stores or in the comfort
                                            of your home.
                                        </Text>
                                        <br />
                                        <br />
                                        <Text
                                            font="helvetica"
                                            weight="normal"
                                            size="xl"
                                            className="leading-[28px]"
                                        >
                                            This ensures we have your accurate
                                            prescription before processing your
                                            order.
                                        </Text>
                                    </Text>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem
                                value="faq-9"
                                className=" border-none lg:pb-20"
                            >
                                <div className="flex justify-between items-start cursor-pointer gap-6">
                                    <Text
                                        font="helvetica"
                                        weight="light"
                                        size="customText12"
                                        className="leading-[40px]"
                                    >
                                        When can expect the refund?{" "}
                                    </Text>
                                    <AccordionTrigger
                                        className="
        group
        bg-white
        p-2 lg:p-3
        rounded-full
        w-12 h-12
        shadow-[0_12px_44px_0_rgba(0,0,0,0.10)]
        hover:no-underline
        flex
        items-center
        justify-center
                border-none
        focus:outline-none
        focus:ring-0
        focus-visible:ring-0
        [&>svg:last-child]:hidden cursor-pointer
    "
                                    >
                                        <Plus className="block group-data-[state=open]:hidden" />
                                        <Minus className="hidden group-data-[state=open]:block" />
                                    </AccordionTrigger>
                                </div>
                                <AccordionContent className="pt-6 lg:max-w-[742px]">
                                    <Text
                                        font="helvetica"
                                        weight="normal"
                                        size="xl"
                                        className="leading-[28px]"
                                        as="span"
                                    >
                                        To upload your prescription, you can
                                        choose from three convenient
                                        options: select a saved
                                        prescription from{" "}
                                    </Text>
                                    <Text
                                        font="helvetica"
                                        weight="extrabold"
                                        size="xl"
                                        className="leading-[26px]"
                                        as="span"
                                    >
                                        your account
                                    </Text>{" "}
                                    <Text
                                        font="helvetica"
                                        weight="normal"
                                        size="xl"
                                        className="leading-[28px]"
                                        as="span"
                                    >
                                        , upload a prescription PDF directly,
                                        or share it with our customer care
                                        team during a scheduled call back.
                                    </Text>
                                    <br />
                                    <br />
                                    <Text
                                        font="helvetica"
                                        weight="normal"
                                        size="xl"
                                        className="leading-[28px]"
                                    >
                                        If you don’t have a prescription yet, no
                                        worries — you can easily {" "}
                                        <Text
                                            font="helvetica"
                                            weight="extrabold"
                                            size="xl"
                                            className="leading-[26px]"
                                            as="span"
                                        >
                                            book an appointment 
                                        </Text>
                                        <Text
                                            font="helvetica"
                                            weight="normal"
                                            size="xl"
                                            className="leading-[28px]"
                                            as="span"
                                        >
                                            to get your eyes tested either at
                                            one of our stores or in the comfort
                                            of your home.
                                        </Text>
                                        <br />
                                        <br />
                                        <Text
                                            font="helvetica"
                                            weight="normal"
                                            size="xl"
                                            className="leading-[28px]"
                                        >
                                            This ensures we have your accurate
                                            prescription before processing your
                                            order.
                                        </Text>
                                    </Text>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>
            </div>
        </div>
    );
}
