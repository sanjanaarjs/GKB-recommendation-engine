"use client";

import Text from "@/components/generic/Text";
import Image from "next/image";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import Plus from "@/components/icons/Plus";
import Minus from "@/components/icons/Minus";

const footerSections = [
    {
        title: "Quick Links",
        links: [
            "Eyeglasses",
            "Sunglasses",
            "Contact Lens",
            "Accessories",
            "Brands",
            "Sale",
        ],
    },
    {
        title: "Brands",
        links: [
            "Burberry",
            "Coolers",
            "INSPIRA",
            "Maui Jim",
            "Oakley",
            "View all Brands",
        ],
    },
    {
        title: "Our Services",
        links: ["Try On", "Home Service", "Hearing Aids", "Gift Card"],
    },
    {
        title: "Information",
        links: ["About us", "Blog", "Contact us", "FAQ’s", "Stores"],
    },
    {
        title: "My Account",
        links: [
            "My account",
            "Login",
            "Shopping cart",
            "My wishlist",
            "Track order",
        ],
    },
];

const paymentIcons = [
    { src: "/images/footer/payment1.png", alt: "AMEX" },
    { src: "/images/footer/payment2.png", alt: "Apple Pay" },
    { src: "/images/footer/payment3.png", alt: "Google Pay" },
    { src: "/images/footer/payment4.png", alt: "MasterCard" },
    { src: "/images/footer/payment5.png", alt: "Shop Pay" },
    { src: "/images/footer/payment6.png", alt: "UnionPay" },
    { src: "/images/footer/payment7.png", alt: "Visa" },
    { src: "/images/footer/payment8.png", alt: "PayPal" },
    { src: "/images/footer/payment9.png", alt: "Rupay" },
    { src: "/images/footer/payment10.png", alt: "Discover" },
];

const storeImages = [
    {
        src: "/images/footer/footerStore/stores1.png",
        location: "Forum Mall",
        city: "Bangalore",
    },
    {
        src: "/images/footer/footerStore/stores2.png",
        location: "Dadar",
        city: "Mumbai",
    },
    {
        src: "/images/footer/footerStore/stores3.png",
        location: "Phoenix Mall",
        city: "Chennai",
    },
    {
        src: "/images/footer/footerStore/stores4.png",
        location: "Select City",
        city: "Delhi",
    },
];

export default function Footer() {
    return (
        <>
            <footer className="bg-font-main  px-10 md:px-20 pt-6 pb-12 md:py-12 text-sm">
                {/* for desktop */}
                <div className="flex flex-wrap justify-between gap-y-8 gap-x-4 border-b border-font-secondary pb-0 md:pb-12 hidden md:flex">
                    {footerSections.map((section, idx) => (
                        <div key={idx}>
                            <Text
                                size="xl2"
                                weight="normal"
                                color="white"
                                className="mb-12"
                                font="helvetica"
                            >
                                {section.title}
                            </Text>
                            <ul className="space-y-2">
                                {section.links.map((link, i) => (
                                    <Link
                                        href="#"
                                        key={i}
                                        className="cursor-pointer
                                    mb-4 last:mb-0 block"
                                    >
                                        <Text
                                            size="base"
                                            weight="light"
                                            color="white"
                                            font="helvetica"
                                        >
                                            {link}
                                        </Text>
                                    </Link>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                {/* for mobile */}
                <Accordion
                    type="single"
                    collapsible
                    className="block md:hidden"
                >
                    {footerSections.map((section, index) => (
                        <AccordionItem
                            key={index}
                            value={`section-${index}`}
                            className="border-b border-font-secondary last:border-b"
                        >
                            <AccordionTrigger className="group py-8 [&>svg]:hidden">
                                <Text
                                    as="p"
                                    size="xl"
                                    weight="light"
                                    color="white"
                                    font="helvetica"
                                >
                                    {section.title}
                                </Text>
                                <div className="keep">
                                    <Plus
                                        size={24}
                                        className="group-data-[state=open]:hidden"
                                    />
                                    <Minus
                                        size={24}
                                        className="hidden group-data-[state=open]:block"
                                    />
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>
                                <ul className="pl-4 space-y-2 py-2">
                                    {section.links.map((link, i) => (
                                        <li key={i} className="cursor-pointer">
                                            <Text
                                                size="sm"
                                                as="span"
                                                color="primary500"
                                            >
                                                {link}
                                            </Text>
                                        </li>
                                    ))}
                                </ul>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-center gap-12 md:gap-4 pt-16 pb-12 md:py-16">
                    <div className="flex flex-col sm:flex-row items-center gap-6 md:gap-[61px]">
                        <div>
                            <Text
                                className="mb-2"
                                as="p"
                                size="contactTitle"
                                weight="contactTitle"
                                color="white"
                                font="helvetica"
                            >
                                Call Us (Toll Free)
                            </Text>
                            <Text
                                as="p"
                                size="contactNumber"
                                weight="contactNumber"
                                color="white"
                                font="helvetica"
                            >
                                1800 419 1990
                            </Text>
                        </div>
                        <Text
                            as="span"
                            size="orText"
                            weight="light"
                            color="fontSecondary"
                            font="helvetica"
                        >
                            or
                        </Text>
                        <div>
                            <Text
                                className="mb-2"
                                as="p"
                                size="contactTitle"
                                weight="contactTitle"
                                color="white"
                                font="helvetica"
                            >
                                Whatsapp Chat
                            </Text>
                            <Text
                                as="p"
                                size="contactNumber"
                                weight="contactNumber"
                                color="white"
                                font="helvetica"
                            >
                                8961599800
                            </Text>
                        </div>
                    </div>

                    <div className="border-t border-font-secondary pt-8 md:pt-0 md:border-t-0 w-full md:w-auto">
                        <Text
                            weight="contactTitle"
                            className="text-left md:text-right mb-2"
                            as="p"
                            size="customText1"
                            color="white"
                        >
                            We guarantee every transaction is 100% secure
                        </Text>
                        <div className="max-w-7xl mx-auto flex flex-wrap gap-2 justify-start md:justify-end">
                            {paymentIcons.map((icon, idx) => (
                                <Image
                                    key={idx}
                                    src={icon.src}
                                    alt={icon.alt}
                                    width={40}
                                    height={24}
                                    className="object-contain"
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-around md:justify-between border-t-0 md:border-t border-font-secondary md:pt-[22px] text-center text-xs text-white/60">
                    <Text
                        className="hidden md:block"
                        size="base"
                        weight="normal"
                        color="white"
                        font="helvetica"
                    >
                        Copyright © 2025 GKB Optical, Inc. All rights reserved.
                    </Text>
                    <div className="mt-2 flex justify-center gap-6">
                        <Link href="#">
                            <Text
                                as="span"
                                size="customtext2"
                                weight="customtext2"
                                color="white"
                            >
                                Privacy Policy
                            </Text>
                        </Link>
                        <Link href="#">
                            <Text
                                as="span"
                                size="customtext2"
                                weight="customtext2"
                                color="white"
                            >
                                Terms of Service
                            </Text>
                        </Link>
                        <Link href="#">
                            <Text
                                as="span"
                                size="customtext2"
                                weight="customtext2"
                                color="white"
                            >
                                Cookies Settings
                            </Text>
                        </Link>
                    </div>
                </div>
            </footer>
            {/* footer image section */}
            <div className="overflow-x-auto md:overflow-visible">
                <div className="flex flex-nowrap w-max md:w-full">
                    {storeImages.map((store, index) => (
                        <div
                            key={index}
                            className="relative w-full group cursor-pointer"
                        >
                            <Image
                                src={store.src}
                                alt={`${store.location} ${store.city}`}
                                width={370}
                                height={449}
                                className="object-cover static min-w-full"
                            />
                            <div
                                className="absolute bottom-0 left-0 w-full h-100 bg-[linear-gradient(0deg,_rgba(0,0,0,1)_0%,_rgba(255,255,255,0)_52%,_rgba(255,255,255,0)_100%)] md:bg-none md:hidden

"
                            />
                            <div className="absolute left-8 md:left-0 bottom-8 md:bottom-0 md:top-0 md:w-full md:items-center md:justify-center md:hidden md:group-hover:flex md:bg-tertiary-800">
                                <Text
                                    as="span"
                                    font="helvetica"
                                    weight="contactTitle"
                                    size="xl"
                                    color="white"
                                >
                                    {store.location}
                                </Text>
                                <Text
                                    as="span"
                                    font="helvetica"
                                    weight="contactTitle"
                                    size="xl"
                                    color="white"
                                >
                                    {store.city}
                                </Text>
                            </div>
                        </div>
                    ))}
                </div>
                {/* <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent pointer-events-none z-9" /> */}
            </div>
        </>
    );
}
