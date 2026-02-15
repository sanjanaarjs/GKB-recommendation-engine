import Text from "@/components/generic/Text";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Play from "@/components/icons/Play";
import { Slide } from "./slideCarousel.api";

export default function MobileSlide3({
    bgImage,
    heading1,
    heading2,
    buttonText,
    buttonLink,
    buttonVariant,
}: {
    bgImage: string;
    heading1: string;
    heading2: string;
    buttonText: string;
    buttonLink: string;
    buttonVariant: Slide["buttonVariant1"];
}) {
    return (
        <div className="w-full h-full relative flex items-center justify-center">
            <Image
                src={bgImage}
                alt="slider"
                fill
                className="object-cover object-top"
            />

            <div className="z-20 relative flex flex-col items-center justify-center pl-10 pb-16">
                <div>
                    <Text
                        as="h2"
                        className="inline-block text-[64px]"
                        weight="normal"
                        color="fontMain"
                        font="greatvibes"
                    >
                        {heading1}
                    </Text>
                </div>
                <div>
                    <Text
                        as="h2"
                        className="inline-block"
                        size="xl2"
                        weight="normal"
                        color="black"
                        font="greatvibes"
                    >
                        {heading2}
                    </Text>
                </div>
                <div className="pt-8 pb-10">
                    <Link
                        href={buttonLink}
                        className={cn(
                            "primary-button",
                            buttonVariant === "secondary" && "secondary-button",
                            buttonVariant === "primary-black" &&
                                "primary-button-black",
                            "px-8",
                        )}
                    >
                        <Text
                            as="span"
                            size="sm"
                            weight="normal"
                            font="helvetica"
                            color="fontMain"
                        >
                            {buttonText}
                        </Text>
                    </Link>
                </div>
            </div>

            <div className="absolute bottom-10 left-12 z-20 flex items-center gap-6">
                <div className="flex items-center justify-center cursor-pointer">
                    <Play />
                </div>
            </div>
        </div>
    );
}
