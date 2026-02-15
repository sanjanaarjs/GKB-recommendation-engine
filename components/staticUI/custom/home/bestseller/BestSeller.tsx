import ProductCard from "@/components/generic/product-card/ProductCard";
import Text from "@/components/generic/Text";
import ChevronLeft from "@/components/icons/ChevronLeft";
import ChevronRight from "@/components/icons/ChevronRight";
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import Card1 from "./rhs/Card1";
import Card2 from "./rhs/Card2";

export default function BestSeller() {
    const items = [1, 2];
    const [current, setCurrent] = useState<number>(1);
    const [api, setApi] = useState<CarouselApi>();
    const [api2, setApi2] = useState<CarouselApi>();

    const prev = () => {
        api?.scrollPrev();
        api2?.scrollPrev();
        if (api?.selectedScrollSnap() !== undefined) {
            setCurrent(api?.selectedScrollSnap() + 1);
        }
    };
    const next = () => {
        api?.scrollNext();
        api2?.scrollNext();
        if (api?.selectedScrollSnap() !== undefined) {
            setCurrent(api?.selectedScrollSnap() + 1);
        }
    };
    const setSlide = (index: number) => {
        api?.scrollTo(index);
        api2?.scrollTo(index);
        setCurrent(index + 1);
    };
    const canScrollPrev = useMemo(
        () => api?.canScrollPrev() && api2?.canScrollPrev(),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [api, api2, current],
    );
    const canScrollNext = useMemo(
        () => api?.canScrollNext() && api2?.canScrollNext(),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [api, api2, current],
    );

    api?.on("select", () => {
        setCurrent(api?.selectedScrollSnap() + 1);
        api2?.scrollTo(api?.selectedScrollSnap() ?? 0);
    });
    api2?.on("select", () => {
        setCurrent(api2?.selectedScrollSnap() + 1);
        api?.scrollTo(api2?.selectedScrollSnap() ?? 0);
    });

    return (
        <div className="w-full bg-white pt-44 xl:pl-28 2xl:pl-40">
            <div className="flex pl-8 sm:pl-12">
                <div className="w-1/2">
                    <Text
                        as="h5"
                        font="helvetica"
                        size="customtext3"
                        color="black"
                        weight="bold"
                    >
                        Just in
                    </Text>
                    <Text
                        as="p"
                        font="helvetica"
                        weight="light"
                        size="customtext4"
                        color="black"
                        className="mt-4 text-2xl lg:text-5xl leading-6 lg:leading-16"
                    >
                        shop what everyone&apos;s talking about
                    </Text>
                    <Text
                        as="p"
                        font="helvetica"
                        size="customText5"
                        color="black"
                        weight="normal"
                        className="mt-8 leading-6 lg:leading-8"
                    >
                        The newest designs for your eyes and your style. Stay
                        ahead with designs that define the season.
                    </Text>
                </div>
                <div className="w-1/2 items-center justify-center gap-8 hidden lg:flex">
                    <button
                        onClick={prev}
                        className={cn(
                            "h-[128px] w-[128px] rounded-full flex items-center justify-center transition-all duration-300",
                            canScrollPrev
                                ? "bg-white shadow-2xl cursor-pointer"
                                : "bg-tertiary-600 opacity-40 cursor-not-allowed",
                        )}
                    >
                        <ChevronLeft fill="black" size={56} />
                    </button>
                    <button
                        onClick={next}
                        className={cn(
                            "h-[128px] w-[128px] rounded-full flex items-center justify-center transition-all duration-300",
                            canScrollNext
                                ? "bg-white shadow-2xl cursor-pointer"
                                : "bg-tertiary-600 opacity-40 cursor-not-allowed",
                        )}
                    >
                        <ChevronRight fill="black" size={56} />
                    </button>
                </div>
            </div>

            <div className="flex pt-16 lg:gap-32 flex-col-reverse lg:flex-row">
                <div className="w-full lg:w-1/2 sm:pr-12 lg:pr-0 pl-4 sm:pl-12 bg-primary-500/80 lg:bg-white">
                    <Carousel opts={{ loop: false }} setApi={setApi}>
                        <CarouselContent>
                            <CarouselItem>
                                <ProductCard
                                    title="Michael Kors"
                                    subtitle="Clear Cat Eye"
                                    images={[
                                        "/images/home/best-seller/spec1.png",
                                        "/images/home/best-seller/spec2.png",
                                    ]}
                                    price={13990}
                                    thumbnailImages={[
                                        "/images/home/best-seller/mb1.png",
                                        "/images/home/best-seller/mb2.png",
                                        "/images/home/best-seller/mb3.png",
                                        "/images/home/best-seller/mb4.png",
                                    ]}
                                    tryOn={false}
                                />
                            </CarouselItem>
                            <CarouselItem>
                                <ProductCard
                                    title="Burberry"
                                    subtitle="Pink Cat Eye"
                                    images={[
                                        "/images/home/best-seller/spec2.png",
                                        "/images/home/best-seller/spec1.png",
                                    ]}
                                    price={17190}
                                />
                            </CarouselItem>
                        </CarouselContent>
                    </Carousel>
                </div>
                <div className="w-full lg:w-1/2 lg:pl-12">
                    <Carousel opts={{ loop: false }} setApi={setApi2}>
                        <CarouselContent>
                            <CarouselItem>
                                <Card1 />
                            </CarouselItem>
                            <CarouselItem>
                                <Card2 />
                            </CarouselItem>
                        </CarouselContent>
                    </Carousel>
                </div>
            </div>

            <div className="flex pt-16 gap-4 justify-center bg-primary-500/80 lg:bg-white pb-20">
                {items.map((_, index) => (
                    <button
                        onClick={() => setSlide(index)}
                        key={index}
                        className={cn(
                            "bg-font-secondary/70 lg:bg-primary-500/80 rounded-full h-1.5 w-10 transition-all ease-in-out duration-1000 cursor-pointer",
                            index + 1 === current && "!bg-black w-40",
                        )}
                    ></button>
                ))}
            </div>
        </div>
    );
}
