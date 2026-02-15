import Text from "@/components/generic/Text";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Play from "@/components/icons/Play";
import he from "he";
import { ItemData } from "@/lib/services/magento/homepageData";

export default function MobileSlide3({
    bgImage,
    heading1,
    buttonText,
    buttonLink,
    buttonVariant,
}: {
    bgImage: string | null;
    heading1: string | null;
    buttonText: string;
    buttonLink: string;
    buttonVariant?: ItemData["buttonVariant1"];
}) {
    return (
        <div className="w-full h-full relative flex items-center justify-center">
            {bgImage && (
                <Image
                    src={bgImage}
                    alt="slider"
                    fill
                    className="object-cover object-top"
                />
            )}

            <div className="z-20 relative flex flex-col items-center justify-center pl-10 pb-16">
                {heading1 && (
                    <div
                        dangerouslySetInnerHTML={{
                            __html: he.decode(heading1),
                        }}
                    />
                )}
                <div className="pt-8 pb-10">
                    <Link
                        href={buttonLink}
                        className={cn(
                            "primary-button primary-button-black",
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
