"use client";

import * as React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Image from "next/image";
import Text from "@/components/generic/Text";
import ImageGridQR from "./imgaeGridQr";
import PdpBanner from "./banner";
import SimilarFrames from "./similarFrames";
import RecentProducts from "./recentProducts";
import DualImageGrid from "./dualImageGrid";
import Slider from "./slider";
import { ItemData } from "@/lib/services/magento/homepageData";
// const types = [
//     { name: "Single-vision", price: "₹ 4,000" },
//     { name: "Progressives", price: "₹ 4,000" },
//     { name: "Readers", price: "₹ 4,000" },
//     { name: "Non-prescription", price: "₹ 4,000" },
// ];

const lensData = [
    {
        title: "Prescription Types",
        items: [
            {
                name: "Single-vision",
                price: "₹ 4,000",
                image: "/images/single-vision.png",
            },
            {
                name: "Progressives",
                price: "₹ 4,000",
                image: "/images/progressives.png",
            },
            { name: "Readers", price: "₹ 4,000", image: "/images/readers.png" },
            {
                name: "Non-prescription",
                price: "₹ 4,000",
                image: "/images/non-prescription.png",
            },
        ],
    },
    {
        title: "Lens Types",
        items: [
            {
                name: "Classic",
                price: "Free",
                image: "/images/classic-type.png",
            },
            { name: "Thinner", price: "₹ 4,000", image: "/images/thinner.png" },
        ],
    },
    {
        title: "Lens Material",
        items: [
            {
                name: "Polycarbonate",
                price: "Free",
                image: "/images/polycarbonate.png",
            },
            {
                name: "High-index",
                price: "₹ 8,000",
                image: "/images/high-index.png",
            },
        ],
    },
    {
        title: "Lens Coating",
        items: [
            {
                name: "Classic",
                price: "Free",
                image: "/images/classic-coating.png",
            },
            {
                name: "Anti-reflective",
                price: "₹ 3,000",
                image: "/images/anti-reflective.png",
            },
        ],
    },
];

const items: ItemData[] = [
    {
        additional_info: null,
        attachment: "/images/pdp/consultation.png", // desktop image
        attachmentmob: "/images/pdp/consultation.png", // mobile image
        video_attachment: null,
        video_attachmentmob: null,
        buttontext: "book home service",
        categories: null,
        created_at: new Date().toISOString(),
        description: null,
        descriptionmob: null,
        link: "#", // default link
        name: "Consultation",
        render_from: null,
        sort_order: 1,
        product_skus: "",
        status: "active",
        updated_at: new Date().toISOString(),
        url_key: null,
        x_axis: null,
        y_axis: null,
        buttonVariant1: "primary",
    },
    {
        additional_info: null,
        attachment: "/images/pdp/storelocator.png",
        attachmentmob: "/images/pdp/storelocator.png",
        video_attachment: null,
        video_attachmentmob: null,
        buttontext: "find a store near you",
        categories: null,
        created_at: new Date().toISOString(),
        description: null,
        descriptionmob: null,
        link: "#",
        name: "store locator",
        render_from: null,
        sort_order: 2,
        product_skus: "",
        status: "active",
        updated_at: new Date().toISOString(),
        url_key: null,
        x_axis: null,
        y_axis: null,
        buttonVariant1: "secondary",
    },
];

const tabData = [
    {
        value: "product-details",
        label: "Product Details",
        content: (
            <div className="flex flex-col md:flex-row gap-10">
                {/* left - Details */}
                <div className="w-full lg:w-1/2">
                    <Image
                        src="/images/pdp/tabImage.png"
                        width="753"
                        height="753"
                        alt="black arrow"
                        objectFit="contain"
                        className="-translate-x-[80px]"
                    />
                </div>
                {/* Right - Details */}
                <div className="w-full lg:w-1/2 text-black space-y-4 bg-white p-6 md:p-10">
                    {/* Title */}
                    <h2 className="text-2xl font-light">Black Arrow</h2>

                    {/* Description */}
                    <p className="text-sm leading-relaxed">
                        Contemporary Persol style for a smart, retro-inspired
                        look. This squared optical shape comes in premium
                        acetate with slim profile, for a perfect finish and
                        optimal comfort and durability, while the Meflecto
                        system, ensure the maximum comfort. Available in a
                        varied selection of dense colours and versatile classics
                        for distinct Persol style.
                    </p>

                    {/* Specs */}
                    <div className="space-y-3 text-sm">
                        <div className="grid grid-cols-2 ">
                            <span className="font-light">Model code:</span>{" "}
                            <span className="font-bold">
                                PO0054S 95/M3 53-22
                            </span>
                        </div>
                        <div className="grid grid-cols-2 ">
                            <span className="font-light">Frame color:</span>{" "}
                            <span className="font-bold">Black</span>
                        </div>
                        <div className="grid grid-cols-2 ">
                            <span className="font-light">Lens color:</span>{" "}
                            <span className="font-bold">
                                Light Grey Gradient Dark Grey
                            </span>
                        </div>
                        <div className="grid grid-cols-2 ">
                            <span className="font-light">Frame material:</span>{" "}
                            <span className="font-bold">Acetate</span>
                        </div>
                        <div className="grid grid-cols-2 ">
                            <p className="font-light">Fit:</p>{" "}
                            <p className="font-bold flex justify-between">
                                <span>Wide Fitting</span>{" "}
                                <span>Size Guide</span>
                            </p>{" "}
                            <br />
                            <span className="text-xs text-gray-500">
                                A larger lens front designed for those who
                                prefer to cover a greater portion of the face.
                            </span>
                        </div>
                        <div className="grid grid-cols-2 ">
                            <span className="font-light">
                                Bridge Choice & Nosepad:
                            </span>{" "}
                            <span className="font-bold">High Bridge Fit</span>
                            <br />
                            <span className="text-xs text-gray-500">
                                Offers a more secure and comfortable fit for
                                those with a high nose bridge and lower
                                cheekbones. A good choice if the bridge of your
                                nose is above the level of your pupils.
                            </span>
                        </div>
                    </div>

                    {/* Button */}
                    <div className="flex justify-center">
                        <button className="border border-black rounded-full px-6 py-2 text-sm font-medium hover:bg-black hover:text-white transition">
                            View details
                        </button>
                    </div>
                </div>
            </div>
        ),
    },
    {
        value: "prescription-lens-guide",
        label: "Prescription & Lens Guide",
        content: (
            <div className="flex flex-col md:flex-row gap-10">
                {/* left - Details */}
                <div className="w-full lg:w-1/2mt-15">
                    <Text size="xl5" as="h2" className="mb-10 leading-[1.3]">
                        A quick glimpse of the prescription and lens types
                        offered
                    </Text>
                    <div className="flex gap-4 flex-col">
                        <button className="w-80 bg-black text-white font-semibold text-lg px-8 py-3 rounded-full border-2 border-black transition-colors duration-300 hover:bg-white hover:text-black">
                            choose your lens and buy
                        </button>

                        <button className="w-80 bg-white text-black font-semibold text-lg px-8 py-3 rounded-full border-2 border-black transition-colors duration-300 hover:bg-black hover:text-white">
                            learn more in our lens guide
                        </button>
                    </div>
                </div>
                {/* Right - Details */}
                <div className="w-full lg:w-1/2 text-black space-y-4 bg-white p-6 md:p-10">
                    <div>
                        {lensData.map((category, idx) => (
                            <div key={idx} className="mb-4">
                                <h2 className="text-1xl font-bold mb-2">
                                    {category.title}
                                </h2>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {category.items.map((item, i) => (
                                        <div key={i} className="text-center">
                                            <div className="w-full aspect-[4/3] bg-gray-300">
                                                {/* Replace with actual images */}
                                                {/* <img src={item.image} alt={item.name} className="w-full h-full object-cover" /> */}
                                            </div>
                                            <p className="mt-3 font-medium">
                                                {item.name}
                                            </p>
                                            <p>{item.price}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        ),
    },
    {
        value: "shipping-returns",
        label: "Shipping & Returns",
        content: (
            <div className="bg-white">
                <div className="flex lg:flex-row flex-col lg:py-[120px] lg:px-[60px] p-[50px] lg:gap-[40px] max-w-max mx-auto gap-">
                    <div className="flex-1">
                        <Text
                            font="helvetica"
                            as={"h2"}
                            className="font-light text-[3rem] leading-normal text-black mb-[64px]"
                        >
                            Free shipping
                        </Text>
                        <div>
                            <ul className="list-disc list-inside">
                                <li>
                                    Enjoy free standard shipping on all eyewear
                                    orders.{" "}
                                </li>
                                <li>
                                    Orders are typically processed and shipped
                                    within 2–3 business days.{" "}
                                </li>
                                <li>
                                    For more details, refer to our{" "}
                                    <strong>
                                        <i>Shipping Policy</i>
                                    </strong>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="flex-1">
                        <Text
                            font="helvetica"
                            as={"h2"}
                            className="font-light text-[3rem] leading-normal text-black mb-[64px]"
                        >
                            Free returns
                        </Text>
                        <div>
                            <ul className="list-disc list-inside">
                                <li>
                                    We offer a 30-day return and exchange
                                    window for unworn eyewear in original
                                    packaging.
                                </li>

                                <li>
                                    Easy, hassle-free returns with a prepaid
                                    return label included in your order.
                                </li>

                                <li>
                                    Refunds are issued to your original payment
                                    method within 5–7 business days after your
                                    return is received.{" "}
                                </li>

                                <li>
                                    For more details, refer to our{" "}
                                    <strong>
                                        <i>Returns Policy</i>
                                    </strong>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        ),
    },
    {
        value: "gift-packing",
        label: "Gift & Packing",
        content: (
            <div className="flex lg:flex-row flex-col h-full bg-white">
                <div className="flex-1 bg-[#f7f7f7]">
                    <Image
                        src={"/images/pdp/Packaging.png"}
                        alt="Packaging"
                        width={751}
                        height={399}
                        className="max-w-max mx-auto"
                    />
                </div>
                <div className="flex-1 h-full lg:pt-[120px] lg:pb-[48px] lg:px-[59px] p-5">
                    <Text
                        font="helvetica"
                        as={"h2"}
                        className="font-light text-[3rem] leading-normal text-black mb-[64px]"
                    >
                        Gift and packaging
                    </Text>
                    <ul className="list-disc list-inside">
                        <li>
                            Each eyewear piece arrives in our signature premium
                            case with a protective cleaning cloth, elegantly
                            packaged for a refined unboxing experience.
                        </li>

                        <li>
                            Complimentary gift packaging is available, making
                            your eyewear a perfect present for any occasion.
                        </li>
                    </ul>
                </div>
            </div>
        ),
    },
    {
        value: "authenticity-warranty",
        label: "Authenticity & Warranty",
        content: (
            <div className="bg-white">
                <div className="flex lg:flex-row flex-col lg:py-[120px] lg:px-[60px] p-[50px] lg:gap-[40px] max-w-max lg:max-w-[70%] mx-auto gap-2 bg-white">
                    <div className="flex-1">
                        <Text
                            font="helvetica"
                            as={"h2"}
                            className="font-light text-[3rem] leading-normal text-black mb-[25px]"
                        >
                            Warranties
                        </Text>
                        <div>
                            <Text
                                font="helvetica"
                                as={"p"}
                                className="font-medium text-[1.25rem] leading-normal text-black"
                            >
                                Your eyewear is protected by our comprehensive
                                1-year warranty, which covers any manufacturing
                                defects to ensure lasting quality and confidence
                                in your purchase.
                            </Text>
                        </div>
                    </div>
                    <div className="flex-1">
                        <Text
                            font="helvetica"
                            as={"h2"}
                            className="font-light text-[3rem] leading-normal text-black mb-[25px]"
                        >
                            Authenticity
                        </Text>
                        <div>
                            <Text
                                font="helvetica"
                                as={"p"}
                                className="font-medium text-[1.25rem] leading-normal text-black"
                            >
                                Every pair is accompanied by a certificate of
                                authenticity, assuring you that your eyewear is
                                100% genuine, crafted to the highest standards,
                                and sourced directly from our premium
                                collection.
                            </Text>
                        </div>
                    </div>
                </div>
            </div>
        ),
    },
];

export default function PdpWrapper() {
    return (
        <>
            <Slider />
            <div className="p-5 lg:p-20 bg-background-grey">
                <Tabs defaultValue={tabData[0].value} className="w-full">
                    <TabsList className="w-full justify-start p-0 py-5 px-8 h-13 bg-white no-scrollbar overflow-auto overflow-y-hidden">
                        {tabData.map((tab) => (
                            <TabsTrigger
                                key={tab.value}
                                value={tab.value}
                                className="cursor-pointer relative h-13 text-gray-500 font-semibold
                       data-[state=active]:text-black
                       data-[state=active]:after:absolute
                       data-[state=active]:after:w-14 data-[state=active]:after:h-[4px]
                       data-[state=active]:after:bg-sky-500
                       data-[state=active]:after:bottom-0 data-[state=active]:after:left-1/2
                       data-[state=active]:after:-translate-x-1/2 !shadow-none"
                            >
                                {tab.label}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {tabData.map((tab) => (
                        <TabsContent
                            key={tab.value}
                            value={tab.value}
                            className="mt-4 text-gray-700"
                        >
                            {tab.content}
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
            <ImageGridQR />
            <PdpBanner />
            <SimilarFrames />
            <RecentProducts />
            <DualImageGrid items={items} />
        </>
    );
}
