import Text from "@/components/generic/Text";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import he from "he";
import { ItemData } from "@/lib/services/magento/homepageData";

export default function Slider2({
    bgImage,
    heading1,
    // heading2,
    // italicHeading2,
    paragraph,
    buttonText,
    buttonLink,
    buttonVariant = "secondary",
}: {
    bgImage: string | null;
    heading1: string | null;
    // heading2: string;
    // italicHeading2: string;
    paragraph: string;
    buttonText: string;
    buttonLink: string;
    buttonVariant?: ItemData["buttonVariant1"];
}) {
    const descExtract = heading1 ? he.decode(heading1) : "";

    let parsedButtonText: { title: string; url: string }[] = [];

    if (paragraph) {
        try {
            parsedButtonText = JSON.parse(paragraph);
        } catch (error) {
            console.error("Failed to parse additional_info", error);
        }
    }

    const titleText = parsedButtonText?.[0]?.title || "";

    return (
        <div className="w-full h-full relative flex items-center justify-end">
            {bgImage && (
                <Image
                    src={bgImage}
                    alt="slider"
                    fill
                    className="object-cover object-top"
                />
            )}

            <div className="z-20 relative flex flex-col items-center justify-center pr-32">
                <div dangerouslySetInnerHTML={{ __html: descExtract }} />
                <div className="pt-6">
                    <Text
                        as="p"
                        className="inline-block"
                        size="xl2"
                        font="helvetica"
                        weight="normal"
                        color="fontMain"
                    >
                        {titleText}
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
                            color="inherit"
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
