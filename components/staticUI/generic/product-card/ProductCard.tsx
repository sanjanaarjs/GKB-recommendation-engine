import Image from "next/image";
import { colorSwatch, ProductCardProps } from "./productCard.api";
import { cn, formatPrice } from "@/lib/utils";
import Heart from "@/components/icons/Heart";
import Text from "../Text";
import Bag from "@/components/icons/Bag";
import TryOn from "@/components/icons/TryOn";
import { ColorSwatches } from "../ColorSwatches/colorSwatches";

export default function ProductCard({
    title,
    subtitle,
    images,
    price,
    tag,
    thumbnailImages,
    tryOn,
    shopNow,
}: ProductCardProps) {
    let content;

    if (shopNow) {
        // Shop Now section
        content = (
            <>
                <div className="mt-4 mb-4 lg:mb-0 lg:mt-8 bg-white lg:bg-transparent p-0 lg:px-8 lg:py-6 rounded-full flex items-center justify-between lg:shadow-lg">
                    <Text
                        as="p"
                        font="helvetica"
                        size="xl2"
                        color="black"
                        weight="bold"
                    >
                        {formatPrice(price)}
                    </Text>
                    <div className="hidden lg:flex items-center gap-3">
                        <Bag className="text-black" size={30} />
                        <Text
                            as="p"
                            font="helvetica"
                            size="xl"
                            color="black"
                            weight="bold"
                        >
                            shop now
                        </Text>
                    </div>
                </div>
                <div className="lg:hidden border-b-4 border-b-primary-100 w-fit">
                    <ColorSwatches colors={colorSwatch} />
                </div>
            </>
        );
    } else if (thumbnailImages) {
        // Homepage card
        // mobile Thumbnail version
        content = (
            <div className="mt-8 bg-white lg:bg-transparent px-8 py-6 rounded-full flex items-center justify-between shadow-lg">
                <Text
                    as="p"
                    font="helvetica"
                    size="xl2"
                    color="black"
                    weight="bold"
                >
                    {formatPrice(price)}
                </Text>
                <div className="flex items-center gap-3">
                    <Bag className="text-black" size={30} />
                    <Text
                        as="p"
                        font="helvetica"
                        size="xl"
                        color="black"
                        weight="bold"
                    >
                        shop now
                    </Text>
                </div>
            </div>
        );
    } else {
        // Homepage card
        // mobile Thumbnail version
        content = (
            <div className="mt-8 bg-white lg:bg-transparent px-8 py-6 lg:p-0 rounded-full flex items-center justify-between shadow-lg lg:shadow-none">
                <Text
                    as="p"
                    font="helvetica"
                    size="xl"
                    color="black"
                    weight="bold"
                    className="leading-6"
                >
                    {formatPrice(price)}
                </Text>
                <div className="flex lg:hidden items-center gap-3">
                    <Bag className="text-black" size={30} />
                    <Text
                        as="p"
                        font="helvetica"
                        size="xl"
                        color="black"
                        weight="bold"
                    >
                        shop now
                    </Text>
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 cursor-pointer">
            {tag && (
                <Text
                    size="orText"
                    weight="extrabold"
                    font="avenir"
                    className="text-center"
                >
                    {tag}
                </Text>
            )}
            <div className="group">
                {images.length > 0 && (
                    <Image
                        src={images[0]}
                        alt={title}
                        width={800}
                        height={500}
                        className={cn(
                            "block",
                            images.length > 1 && "block group-hover:hidden",
                        )}
                    />
                )}
                {images.length > 1 && (
                    <Image
                        src={images[1]}
                        alt={title}
                        width={800}
                        height={500}
                        className={cn(
                            "hidden",
                            images.length > 1 && "hidden group-hover:block",
                        )}
                    />
                )}
            </div>
            <div className="pt-11">
                {/* homepage card */}
                {thumbnailImages && (
                    <div className="flex lg:hidden items-center justify-center bg-white rounded-full mr-12 p-2 overflow-x-auto px-4">
                        {thumbnailImages?.map((item, index) => (
                            <div key={index} className="relative flex-1 h-12">
                                <Image
                                    src={item}
                                    alt={item}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        ))}
                    </div>
                )}

                <div className="flex items-center justify-between mt-8 lg:mt-0">
                    <button
                        className={`rounded-full flex items-center justify-between shadow-lg gap-1 py-2 ${thumbnailImages ? "px-2" : "px-4"}`}
                    >
                        <TryOn size={24} />
                        {tryOn && (
                            <Text size="tryOn" weight="tryOn">
                                Try them on
                            </Text>
                        )}
                    </button>
                    <button>
                        <Heart />
                    </button>
                </div>
                <div className="flex items-start flex-col lg:flex-row lg:items-center lg:justify-between pt-8">
                    <div>
                        <Text
                            as="h5"
                            font="avenir"
                            size="productTitle"
                            color="black"
                            weight="extrabold"
                        >
                            {title}
                        </Text>
                        <Text
                            as="p"
                            font="helvetica"
                            size="productTitle"
                            color="black"
                            weight="light"
                        >
                            {subtitle}
                        </Text>
                    </div>
                    <div className="lg:flex items-center gap-2 hidden">
                        <ColorSwatches colors={colorSwatch} />
                        {/* <button className="border-black border rounded-full p-0.5">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="25"
                                viewBox="0 0 24 25"
                                fill="none"
                            >
                                <circle
                                    cx="12"
                                    cy="12.5"
                                    r="12"
                                    fill="url(#paint0_linear_1659_473)"
                                />
                                <defs>
                                    <linearGradient
                                        id="paint0_linear_1659_473"
                                        x1="12"
                                        y1="0.5"
                                        x2="12"
                                        y2="24.5"
                                        gradientUnits="userSpaceOnUse"
                                    >
                                        <stop stopColor="#201613" />
                                        <stop offset="1" stopColor="#DED8D4" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </button>
                        <button className="border-transparent border rounded-full p-0.5">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="25"
                                viewBox="0 0 24 25"
                                fill="none"
                            >
                                <ellipse
                                    cx="12"
                                    cy="12.5"
                                    rx="12"
                                    ry="12.5"
                                    fill="url(#paint0_linear_1659_475)"
                                />
                                <defs>
                                    <linearGradient
                                        id="paint0_linear_1659_475"
                                        x1="12"
                                        y1="0"
                                        x2="12"
                                        y2="25"
                                        gradientUnits="userSpaceOnUse"
                                    >
                                        <stop stopColor="#8F9098" />
                                        <stop offset="1" stopColor="#585A77" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </button>
                        <button className="border-transparent border rounded-full p-0.5">
                            <svg width="24" height="26" viewBox="0 0 24 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <ellipse cx="12" cy="13" rx="12" ry="12.5" fill="#353535"/>
                            </svg>
                        </button> */}
                    </div>
                </div>
                <div>{content}</div>
            </div>
        </div>
    );
}
