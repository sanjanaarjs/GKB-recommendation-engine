import Text from "@/components/generic/Text";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Slide } from "./slideCarousel.api";

export default function MobileSlide2({
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

            <div className="z-20 relative flex flex-col items-center justify-center">
                <div>
                    <Text
                        as="h2"
                        className="inline-block"
                        size="xl4"
                        weight="extrabold"
                        color="fontMain"
                        font="montserrat"
                    >
                        {heading1}
                    </Text>
                </div>
                <div>
                    <Text
                        as="h2"
                        className="inline-block"
                        size="xl4"
                        weight="extrabold"
                        color="fontMain"
                        font="montserrat"
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
                            "px-8",
                        )}
                    >
                        <Text
                            as="span"
                            size="base"
                            weight="normal"
                            font="helvetica"
                            color="inherit"
                        >
                            {buttonText}
                        </Text>
                    </Link>
                </div>
            </div>
        </div>
    );
}
