import Text from "@/components/generic/Text";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Slide } from "./slideCarousel.api";
import Link from "next/link";

export default function Slider2({
    bgImage,
    heading1,
    heading2,
    italicHeading2,
    paragraph,
    buttonText,
    buttonLink,
    buttonVariant = "primary",
}: {
    bgImage: string;
    heading1: string;
    heading2: string;
    italicHeading2: string;
    paragraph: string;
    buttonText: string;
    buttonLink: string;
    buttonVariant?: Slide["buttonVariant1"];
}) {
    return (
        <div className="w-full h-full relative flex items-center justify-end">
            <Image
                src={bgImage}
                alt="slider"
                fill
                className="object-cover object-top"
            />

            <div className="z-20 relative flex flex-col items-center justify-center pr-32">
                <div>
                    <Text
                        as="h2"
                        className="inline-block"
                        size="xl5"
                        weight="extrabold"
                        color="fontMain"
                        font="montserrat"
                    >
                        {heading1}
                    </Text>
                </div>
                <div className="pt-2">
                    <Text
                        as="h2"
                        className="inline-block"
                        size="xl5"
                        weight="extrabold"
                        color="fontMain"
                        font="montserrat"
                    >
                        {heading2}
                    </Text>
                    <Text
                        as="h2"
                        className="inline-block italic"
                        size="xl5"
                        weight="medium"
                        color="fontMain"
                        font="montserrat"
                    >
                        &nbsp;{italicHeading2}
                    </Text>
                </div>
                <div className="pt-6">
                    <Text
                        as="p"
                        className="inline-block"
                        size="xl2"
                        font="helvetica"
                        weight="normal"
                        color="fontMain"
                    >
                        {paragraph}
                    </Text>
                </div>
                <div className="bg-primary-500 mt-8 rounded-3xl flex items-center justify-between w-full">
                    <input
                        type="text"
                        placeholder="Enter your email"
                        className="w-full px-6 font-helvetica text-base placeholder:text-black focus:outline-none font-light"
                    />
                    <Link
                        href={buttonLink}
                        className={cn(
                            "primary-button",
                            buttonVariant === "secondary" && "secondary-button",
                            "px-8",
                        )}
                    >
                        <Text
                            as="span"
                            size="base"
                            weight="bold"
                            color="white"
                            font="helvetica"
                            className="whitespace-nowrap"
                        >
                            {buttonText}
                        </Text>
                    </Link>
                </div>
            </div>
        </div>
    );
}
