import Text from "@/components/generic/Text";
import ChevronRight from "@/components/icons/ChevronRight";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function ErrorScreen() {
    return (
        <div className="w-full items-center text-center lg:px-[184px] lg:py-20 px-10 py-12">
            <Text
                font="helvetica"
                size="customText16"
                weight="light"
                className="mb-[18px] lg:mb-4 text-border-color-light text-center"
            >
                sorry
            </Text>
            <Text
                font="helvetica"
                size="customText18"
                weight="light"
                className="mb-16 lg:mb-12 text-center"
            >
                we couldn’t find that page
            </Text>
            <div className="flex gap-1 justify-center items-center lg:mb-[82px] mb-[34px]">
                <Text font="helvetica" size="productTitle3" weight="light">
                    Try searching or go to our
                </Text>
                <Link href="#">
                    <Text
                        font="helvetica"
                        size="productTitle3"
                        weight="extrabold"
                        className="italic mt-[2px] cursor-pointer"
                    >
                        homepage
                    </Text>
                </Link>

                <ChevronRight
                    fill="black"
                    size={14}
                    className="mt-[2px] lg:w-[24px] lg:h-[24px]"
                />
            </div>
            <div className="relative mb-[65px] lg:mb-20">
                <label
                    htmlFor="search-input"
                    className="absolute top-[-8px] lg:top-[-13px] left-[10%] lg:left-[20%] lg:-translate-x-1/2 bg-white lg:w-fit cursor-text"
                >
                    <Text
                        font="helvetica"
                        color="fontSecondary"
                        size="customText11"
                        className="hidden lg:block px-2"
                    >
                        Search products, categories or whatever you are looking
                        for
                    </Text>

                    <Text
                        font="helvetica"
                        color="fontSecondary"
                        size="customText11"
                        className="lg:hidden block px-1"
                    >
                        Search here
                    </Text>
                </label>

                <input
                    id="search-input"
                    name="search"
                    type="text"
                    className="w-full border border-black placeholder-transparent rounded-full px-6 py-4 h-12 lg:h-16 text-lg"
                    aria-describedby="search-label"
                />
            </div>

            <Text
                font="helvetica"
                size="productTitle3"
                weight="light"
                className="leading-[18px] text-center mb-8 lg:mb-[56px] w-[278px] lg:w-full mx-auto"
            >
                While you’re here, take a look at our standout styles and
                collections
            </Text>
            <div className="flex flex-col lg:flex-row items-center justify-center lg:gap-20 gap-12 mb-6">
                <div className="flex flex-col items-center">
                    <Image
                        src="/images/error404/bestSellers.jpg"
                        alt="Bestsellers"
                        width={338}
                        height={169}
                        className="w-[338px] h-[169px]"
                    />
                    <Button className="cursor-pointer mt-2 bg-font-main px-6 py-2 lg:px-18 lg:py-3 rounded-[40px] h-[47px] border-[1px] border-font-main">
                        <Text
                            font="helvetica"
                            size="productTitle3"
                            weight="extrabold"
                            color="white"
                        >
                            browse bestsellers
                        </Text>
                    </Button>
                </div>
                <div className="flex flex-col items-center">
                    <Image
                        src="/images/error404/newArrivals.jpg"
                        alt="New Arrivals"
                        width={338}
                        height={169}
                        className="w-[338px] h-[169px]"
                    />
                    <Button className="cursor-pointer mt-2 bg-font-main px-6 py-2 lg:px-18 lg:py-3 rounded-[40px] h-[47px] border-[1px] border-font-main">
                        <Text
                            font="helvetica"
                            size="productTitle3"
                            weight="extrabold"
                            color="white"
                        >
                            browse new arrivals
                        </Text>
                    </Button>
                </div>
                <div className="flex flex-col items-center">
                    <Image
                        src="/images/error404/GKBLuxe.png"
                        alt="GKB Luxe"
                        width={338}
                        height={169}
                        className="w-[338px] h-[169px]"
                    />
                    <Button className="cursor-pointer mt-2 bg-font-main px-6 py-2 lg:px-18 lg:py-3 rounded-[40px] h-[47px] border-[1px] border-font-main">
                        <Text
                            font="helvetica"
                            size="productTitle3"
                            weight="extrabold"
                            color="white"
                        >
                            browse GKB Luxe
                        </Text>
                    </Button>
                </div>
            </div>
        </div>
    );
}
