"use client";

import Image from "next/image";
import SearchClose from "@/components/icons/SearchClose";
import Text from "@/components/generic/Text";

interface SearchOverlayProps {
    readonly onClose: () => void;
    readonly products?: {
        readonly name: string;
        readonly model: string;
        readonly price: string;
        readonly image: string;
    }[];
}

const defaultProducts = [
    {
        name: "Rayban",
        model: "Wayfarer Way",
        price: "₹ 12,490",
        image: "/images/search/Rectangle-22.png",
    },
    {
        name: "Persol",
        model: "Black Arrow",
        price: "₹ 26,400",
        image: "/images/search/Rectangle-23.png",
    },
    {
        name: "Michael Kors",
        model: "Clear Cat Eye",
        price: "₹ 13,990",
        image: "/images/search/Rectangle-24.png",
    },
    {
        name: "Oakley",
        model: "Radar EV",
        price: "₹ 15,999",
        image: "/images/search/Rectangle-23.png",
    },
    {
        name: "Tom Ford",
        model: "FT0595",
        price: "₹ 22,300",
        image: "/images/search/Rectangle-24.png",
    },
    {
        name: "Gucci",
        model: "GG0061S",
        price: "₹ 24,500",
        image: "/images/search/Rectangle-22.png",
    },
];

function chunkArray<T>(arr: T[], chunkSize: number): T[][] {
    const chunks = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        chunks.push(arr.slice(i, i + chunkSize));
    }
    return chunks;
}

export default function SearchOverlay({
    onClose,
    products,
}: SearchOverlayProps) {
    const chunkedProducts = chunkArray(
        products?.length ? products : defaultProducts,
        3,
    );

    return (
        <div className="fixed inset-0 z-50 bg-white p-8 lg:px-[80px] lg:py-[48px] overflow-y-auto">
            <div className="flex justify-between items-center mb-8">
                <Text
                    as="h1"
                    color="black"
                    font="avenir"
                    size="customText10"
                    weight="light"
                >
                    Search
                </Text>
                <button onClick={onClose} className="cursor-pointer">
                    <SearchClose size={72} fill="#0B0B0B" />
                </button>
            </div>
            <div className="relative">
                <label className="bg-white w-fit absolute left-[15px] lg:left-[30px] top-[-13px]">
                    <Text
                        font="helvetica"
                        color="fontSecondary"
                        size="customText11"
                    >
                        Search products, categories or whatever you are looking
                        for
                    </Text>
                </label>
                <input
                    type="text"
                    className="w-full border border-black rounded-full px-6 py-4 text-lg mb-10"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[25%_1fr] gap-10 font-helvetica">
                <div className="space-y-8">
                    <div>
                        <Text
                            as="h3"
                            font="helvetica"
                            color="black"
                            size="base"
                            weight="bold"
                            className="mb-2"
                        >
                            Most searched
                        </Text>
                        <ul className="space-y-1 text-[1rem] font-[300]">
                            <li>
                                <Text
                                    color="black"
                                    font="helvetica"
                                    size="base"
                                    weight="light"
                                >
                                    Michael Kors eyewear
                                </Text>
                            </li>
                            <li>
                                <Text
                                    color="black"
                                    font="helvetica"
                                    size="base"
                                    weight="light"
                                >
                                    Vision care
                                </Text>
                            </li>
                            <li>
                                <Text
                                    color="black"
                                    font="helvetica"
                                    size="base"
                                    weight="light"
                                >
                                    Sports sunglasses
                                </Text>
                            </li>
                            <li>
                                <Text
                                    color="black"
                                    font="helvetica"
                                    size="base"
                                    weight="light"
                                >
                                    Monthly contact lenses
                                </Text>
                            </li>
                            <li>
                                <Text
                                    color="black"
                                    font="helvetica"
                                    size="base"
                                    weight="light"
                                >
                                    Rayban Meta
                                </Text>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <Text
                            as="h3"
                            font="helvetica"
                            color="black"
                            size="base"
                            weight="bold"
                            className="mb-2"
                        >
                            You might be interested in
                        </Text>
                        <ul className="space-y-1 text-[1rem] font-[300]">
                            <li>
                                <Text
                                    color="black"
                                    font="helvetica"
                                    size="base"
                                    weight="light"
                                >
                                    Progressive eyeglasses
                                </Text>
                            </li>
                            <li>
                                <Text
                                    color="black"
                                    font="helvetica"
                                    size="base"
                                    weight="light"
                                >
                                    Shipping & Returns
                                </Text>
                            </li>
                            <li>
                                <Text
                                    color="black"
                                    font="helvetica"
                                    size="base"
                                    weight="light"
                                >
                                    Gift card
                                </Text>
                            </li>
                            <li>
                                <Text
                                    color="black"
                                    font="helvetica"
                                    size="base"
                                    weight="light"
                                >
                                    Home service
                                </Text>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <Text
                            as="h3"
                            font="helvetica"
                            color="black"
                            size="base"
                            weight="bold"
                            className="mb-2"
                        >
                            Recently searched
                        </Text>
                        <ul className="space-y-1 text-[1rem] font-[300]">
                            <li>
                                <Text
                                    color="black"
                                    font="helvetica"
                                    size="base"
                                    weight="light"
                                >
                                    Sunglasses for Women
                                </Text>
                            </li>
                            <li>
                                <Text
                                    color="black"
                                    font="helvetica"
                                    size="base"
                                    weight="light"
                                >
                                    Women sunglasses for golf
                                </Text>
                            </li>
                        </ul>
                    </div>
                </div>

                <div>
                    <div className="flex gap-8 items-center mb-6">
                        <Text
                            as="h3"
                            color="black"
                            size="base"
                            font="helvetica"
                            weight="bold"
                        >
                            Popular products
                        </Text>
                        <Text
                            color="black"
                            size="base"
                            font="helvetica"
                            weight="normal"
                            as="span"
                            className="cursor-pointer italic"
                        >
                            View all products (456) →
                        </Text>
                    </div>

                    <div className="flex flex-col md:flex-row gap-12">
                        {chunkedProducts.map((group, colIndex) => (
                            <div key={colIndex} className="flex flex-col gap-6">
                                {group.map((item, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center gap-4"
                                    >
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            width={80}
                                            height={80}
                                        />
                                        <div>
                                            <Text
                                                color="black"
                                                font="avenir"
                                                size="xs"
                                                weight="extrabold"
                                            >
                                                {item.name}
                                            </Text>
                                            <Text
                                                color="black"
                                                font="helvetica"
                                                size="xs"
                                                weight="light"
                                            >
                                                {item.model}
                                            </Text>

                                            <Text
                                                color="black"
                                                font="helvetica"
                                                size="sm"
                                                weight="bold"
                                            >
                                                {item.price}
                                            </Text>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>

                    <div className="mt-16">
                        <div className="flex gap-8 items-center mb-4">
                            <Text
                                color="black"
                                font="helvetica"
                                size="base"
                                weight="bold"
                                as="h3"
                            >
                                Popular brands
                            </Text>
                            <Text
                                as="span"
                                font="helvetica"
                                size="base"
                                weight="normal"
                                color="black"
                                className="italic"
                            >
                                View all products (46) →
                            </Text>
                        </div>
                        <div className="flex flex-wrap gap-10 items-center">
                            <Image
                                src="/images/search/brand-1.png"
                                alt="Michael Kors"
                                width={80}
                                height={30}
                            />
                            <Image
                                src="/images/search/brand-2.png"
                                alt="Oakley"
                                width={80}
                                height={30}
                            />
                            <Image
                                src="/images/search/brand-3.png"
                                alt="Ray-Ban"
                                width={80}
                                height={30}
                            />
                            <Image
                                src="/images/search/brand-4.png"
                                alt="Tom Ford"
                                width={80}
                                height={30}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
