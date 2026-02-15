import ProductCard from "@/components/generic/product-card/ProductCard";
import Text from "@/components/generic/Text";
import Mute from "@/components/icons/Mute";
import Play from "@/components/icons/Play";
import { Carousel, CarouselApi, CarouselItem } from "@/components/ui/carousel";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { CarouselContent } from "@/components/ui/carousel";
import ChevronLeft from "@/components/icons/ChevronLeft";
import ChevronRight from "@/components/icons/ChevronRight";
import { cn } from "@/lib/utils";

export default function Frames() {
    const items = [1, 2];
    const [isPlaying, setIsPlaying] = useState<boolean>(true);
    const [isMuted, setIsMuted] = useState<boolean>(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState<number>(1);

    useEffect(() => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.play();
            } else {
                videoRef.current.pause();
            }
        }
    }, [isPlaying]);

    const prev = () => {
        api?.scrollPrev();
        if (api?.selectedScrollSnap() !== undefined) {
            setCurrent(api?.selectedScrollSnap() + 1);
        }
    };
    const next = () => {
        api?.scrollNext();
        if (api?.selectedScrollSnap() !== undefined) {
            setCurrent(api?.selectedScrollSnap() + 1);
        }
    };
    const setSlide = (index: number) => {
        api?.scrollTo(index);
        setCurrent(index + 1);
    };
    const canScrollPrev = useMemo(
        () => api?.canScrollPrev(),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [api, current],
    );
    const canScrollNext = useMemo(
        () => api?.canScrollNext(),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [api, current],
    );

    api?.on("select", () => {
        setCurrent(api?.selectedScrollSnap() + 1);
    });

    return (
        <div className="w-full px-4 sm:px-12 xl:px-28 2xl:px-40 py-16 lg:py-40 bg-white">
            <div>
                <Text
                    font="helvetica"
                    size="customtext3"
                    weight="bold"
                    color="black"
                    className="text-xl lg:text-3xl leading-6 lg:leading-16"
                >
                    Streetwear collection
                </Text>
                <Text
                    font="helvetica"
                    size="xl5"
                    weight="light"
                    color="black"
                    className="text-3xl lg:text-5xl mt-3"
                >
                    pair your lenses with <br />
                    the{" "}
                    <Text
                        font="helvetica"
                        size="xl5"
                        weight="light"
                        color="black"
                        as="span"
                        className="italic text-3xl lg:text-5xl mt-3"
                    >
                        perfect frame
                    </Text>
                </Text>
                <button className="primary-button-black mt-10 px-10">
                    <Text
                        font="helvetica"
                        size="customText7"
                        weight="contactNumber"
                        color="fontMain"
                        className="lowercase lg:normal-case"
                    >
                        discover collection
                    </Text>
                </button>
            </div>

            <div className="mt-12 flex flex-col lg:flex-row gap-12">
                <div className="w-full lg:basis-1/2 h-[600px] lg:h-auto relative mt-12 shrink-0">
                    <Image
                        src="/images/home/frames/img1.jpg"
                        alt="frame-1"
                        fill
                        className="object-cover object-bottom-right"
                    />
                </div>
                <div className="w-full lg:basis-1/2">
                    <div className="relative">
                        <video
                            ref={videoRef}
                            src="/images/home/slide-carousel/end_of_sale.mp4"
                            autoPlay
                            loop
                            muted
                        />
                        <div className="absolute bottom-10 left-12 z-20 flex items-center gap-6">
                            <div
                                className="flex items-center justify-center cursor-pointer"
                                onClick={() => setIsPlaying(!isPlaying)}
                            >
                                <Play />
                            </div>
                            <div
                                className="flex items-center justify-center cursor-pointer"
                                onClick={() => setIsMuted(!isMuted)}
                            >
                                <Mute />
                            </div>
                        </div>
                    </div>

                    <div className="lg:px-12 pt-12">
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
                    <div className="items-center justify-center gap-8 hidden lg:flex">
                        <button
                            onClick={prev}
                            className={cn(
                                "h-[96px] w-[96px] rounded-full flex items-center justify-center transition-all duration-300",
                                canScrollPrev
                                    ? "bg-white shadow-2xl cursor-pointer"
                                    : "bg-tertiary-600 opacity-40 cursor-not-allowed",
                            )}
                        >
                            <ChevronLeft fill="black" size={48} />
                        </button>
                        <button
                            onClick={next}
                            className={cn(
                                "h-[96px] w-[96px] rounded-full flex items-center justify-center transition-all duration-300",
                                canScrollNext
                                    ? "bg-white shadow-2xl cursor-pointer"
                                    : "bg-tertiary-600 opacity-40 cursor-not-allowed",
                            )}
                        >
                            <ChevronRight fill="black" size={48} />
                        </button>
                    </div>
                    <div className="flex lg:hidden pt-16 gap-4 justify-center">
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
            </div>
        </div>
    );
}
