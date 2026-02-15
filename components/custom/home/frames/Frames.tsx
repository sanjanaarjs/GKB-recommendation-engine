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
import {
    getProductBySku,
    ItemData,
    ProductItem,
} from "@/lib/services/magento/homepageData";
import { toSentenceCase } from "@/lib/store/commonFunction/sentenceFormat";
import { useWishlist } from "@/lib/hooks/useWishlist";

export interface IFramesProps {
    data: ItemData[] | [];
}

export default function Frames({ data }: IFramesProps) {
    const items = [1, 2];
    const [isPlaying, setIsPlaying] = useState<boolean>(true);
    const [isMuted, setIsMuted] = useState<boolean>(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState<number>(1);
    const [productData, setProductData] = useState<ProductItem[]>([]);

    const { wishlistSkuSet, handleWishlistClick } = useWishlist();

    useEffect(() => {
        (async () => {
            const productSkus: string[] =
                data?.map((item) => item.product_skus).filter(Boolean) || [];

            if (productSkus.length > 0) {
                try {
                    const results = await Promise.all(
                        productSkus.map(async (sku) => {
                            const productReq = await getProductBySku(sku);
                            return (productReq?.items ?? []) as ProductItem[];
                        }),
                    );

                    // flatten into ProductItem[]
                    const allProducts: ProductItem[] = results.flat();

                    setProductData(allProducts);
                } catch (error) {
                    console.error("Error fetching product data:", error);
                }
            }
        })();
    }, [data]);

    // Add wishlist info to each product (like in your BestSeller)
    const productDataWithWishlist = useMemo(() => {
        if (productData.length === 0) return [];
        return productData.map((item) => ({
            ...item,
            isWishlisted: wishlistSkuSet.has(item.sku),
        }));
    }, [productData, wishlistSkuSet]);

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

    const { buttontext, description, name, attachment, video_attachment } =
        data?.[0] ?? {};

    const descriptionLines =
        description && description?.length > 0
            ? description.split(/\r?\n/)
            : "";

    const productSlides =
        productDataWithWishlist &&
        Array.isArray(productDataWithWishlist) &&
        productDataWithWishlist.length > 0
            ? productDataWithWishlist?.map((item) => (
                  <CarouselItem key={item.id}>
                      <ProductCard
                          title={item.brand}
                          subtitle={item?.name}
                          images={[item?.image?.url, item?.thumbnail?.url]}
                          price={12590}
                          sku={item.sku}
                          isWishlisted={item.isWishlisted}
                          onWishlistClick={handleWishlistClick}
                          currency="₹"
                          url_key={item?.url_key}
                      />
                  </CarouselItem>
              ))
            : [];

    const [canScrollNext, setCanScrollNext] = useState(false);
    const [canScrollPrev, setCanScrollPrev] = useState(false);

    useEffect(() => {
        if (!api) return;

        const updateScrollButtons = () => {
            setCanScrollNext(api.canScrollNext());
            setCanScrollPrev(api.canScrollPrev());
        };

        // run immediately on mount
        updateScrollButtons();

        // listen to both select + reInit events
        api.on("select", updateScrollButtons);
        api.on("reInit", updateScrollButtons);

        return () => {
            api.off("select", updateScrollButtons);
            api.off("reInit", updateScrollButtons);
        };
    }, [api]);

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
                    {toSentenceCase(name)}
                </Text>
                <Text
                    font="helvetica"
                    size="xl5"
                    weight="light"
                    color="black"
                    className="text-3xl lg:text-5xl mt-3"
                >
                    {descriptionLines?.[0] ?? ""} <br />
                    <Text
                        font="helvetica"
                        size="xl5"
                        weight="light"
                        color="black"
                        as="span"
                        className="italic text-3xl lg:text-5xl mt-3"
                    >
                        {descriptionLines?.[1] ?? ""}
                    </Text>
                </Text>
                <button className="primary-button-black mt-10 py-4 px-12 rounded-full">
                    <Text
                        font="helvetica"
                        weight="contactNumber"
                        color="inherit"
                        className="lowercase lg:normal-case text-lg md:text-xl"
                    >
                        {buttontext}
                    </Text>
                </button>
            </div>

            <div className="mt-12 flex flex-col lg:flex-row gap-12">
                <div className="w-full lg:basis-1/2 h-[600px] lg:h-auto relative mt-12 shrink-0">
                    {attachment && (
                        <Image
                            src={attachment}
                            alt="frame-1"
                            fill
                            className="object-cover object-bottom-right"
                        />
                    )}
                </div>
                <div className="w-full lg:basis-1/2">
                    <div className="relative">
                        <video
                            ref={videoRef}
                            src={video_attachment ?? ""}
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
                            <CarouselContent>{productSlides}</CarouselContent>
                        </Carousel>
                    </div>
                    <div className="items-center justify-center gap-8 hidden lg:flex">
                        <button
                            onClick={prev}
                            className={cn(
                                "h-[66px] w-[66px] rounded-full flex items-center justify-center transition-all duration-300",
                                canScrollPrev
                                    ? "bg-white shadow-2xl cursor-pointer"
                                    : "bg-tertiary-600 opacity-40 cursor-not-allowed",
                            )}
                        >
                            <ChevronLeft fill="black" size={28} />
                        </button>
                        <button
                            onClick={next}
                            className={cn(
                                "h-[66px] w-[66px] rounded-full flex items-center justify-center transition-all duration-300",
                                canScrollNext
                                    ? "bg-white shadow-2xl cursor-pointer"
                                    : "bg-tertiary-600 opacity-40 cursor-not-allowed",
                            )}
                        >
                            <ChevronRight fill="black" size={28} />
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
