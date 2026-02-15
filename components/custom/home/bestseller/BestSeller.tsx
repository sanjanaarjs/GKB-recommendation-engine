import ProductCard from "@/components/generic/product-card/ProductCard";
import Text from "@/components/generic/Text";
// import ChevronLeft from "@/components/icons/ChevronLeft";
// import ChevronRight from "@/components/icons/ChevronRight";
import Card2 from "./rhs/Card2";
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import Card1 from "./rhs/Card1";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import {
    AdditionalInfoItem,
    getProductBySku,
    ItemData,
    ProductItem,
} from "@/lib/services/magento/homepageData";
import React from "react";
import { useWishlist } from "@/lib/hooks/useWishlist";

export interface IBestSellerProps {
    data: ItemData[] | [];
}

export default function BestSeller({ data }: IBestSellerProps) {
    const items = [1, 2];
    const [current, setCurrent] = useState<number>(1);
    const [api, setApi] = useState<CarouselApi>();
    const [api2, setApi2] = useState<CarouselApi>();
    const [productData, setProductData] = useState<ProductItem[]>([]);

    // const prev = () => {
    //     api?.scrollPrev();
    //     api2?.scrollPrev();
    //     if (api?.selectedScrollSnap() !== undefined) {
    //         setCurrent(api?.selectedScrollSnap() + 1);
    //     }
    // };
    // const next = () => {
    //     api?.scrollNext();
    //     api2?.scrollNext();
    //     if (api?.selectedScrollSnap() !== undefined) {
    //         setCurrent(api?.selectedScrollSnap() + 1);
    //     }
    // };
    const setSlide = (index: number) => {
        api?.scrollTo(index);
        api2?.scrollTo(index);
        setCurrent(index + 1);
    };

    api?.on("select", () => {
        setCurrent(api?.selectedScrollSnap() + 1);
        api2?.scrollTo(api?.selectedScrollSnap() ?? 0);
    });
    api2?.on("select", () => {
        setCurrent(api2?.selectedScrollSnap() + 1);
        api?.scrollTo(api2?.selectedScrollSnap() ?? 0);
    });

    const productSkusList = useMemo(
        () =>
            data && Array.isArray(data) && data.length > 0
                ? data.map((item) => item.product_skus)
                : [],
        [data],
    );

    const { wishlistSkuSet, handleWishlistClick } = useWishlist();

    useEffect(() => {
        (async () => {
            if (
                productSkusList &&
                Array.isArray(productSkusList) &&
                productSkusList.length > 0
            ) {
                // explicitly type the result of each getProductBySku call
                const results: Array<
                    { items: ProductItem[] } | null | undefined
                > = await Promise.all(
                    productSkusList.map((sku: string) => getProductBySku(sku)),
                );

                // Flatten all items safely
                const allItems: ProductItem[] = results
                    .filter((res): res is { items: ProductItem[] } =>
                        Array.isArray(res?.items),
                    )
                    .flatMap((res) => res.items);

                setProductData(allItems);
            }
        })();
    }, [productSkusList]);

    const slides =
        data && Array.isArray(data) && data.length > 0
            ? data?.map((item, index) => (
                  <CarouselItem key={index}>
                      {index === 0 ? (
                          <Card1 data={item} />
                      ) : (
                          <Card2 data={item} />
                      )}
                  </CarouselItem>
              ))
            : [];

    // Add wishlist status to each product using wishlistSkuSet
    const productDataWithWishlist = useMemo(() => {
        if (productData.length === 0) return [];
        return productData.map((item) => ({
            ...item,
            isWishlisted: wishlistSkuSet.has(item.sku),
        }));
    }, [productData, wishlistSkuSet]);

    const productSlides =
        Array.isArray(productDataWithWishlist) &&
        productDataWithWishlist.length > 0
            ? productDataWithWishlist?.map((item) => (
                  <CarouselItem key={item.id}>
                      <ProductCard
                          title={item.brand}
                          subtitle={item?.name}
                          images={[item?.image?.url, item?.thumbnail?.url]}
                          price={12590}
                          thumbnailImages={[
                              item?.thumbnail?.url,
                              "/images/home/best-seller/mb1.png",
                              "/images/home/best-seller/mb2.png",
                              "/images/home/best-seller/mb3.png",
                              "/images/home/best-seller/mb4.png",
                          ]}
                          tryOn={false}
                          sku={item.sku}
                          isWishlisted={item.isWishlisted}
                          onWishlistClick={handleWishlistClick}
                          url_key={item?.url_key}
                          currency="₹"
                      />
                  </CarouselItem>
              ))
            : [];

    const additionalInfoRow: AdditionalInfoItem[] = data?.[0]?.additional_info
        ? JSON.parse(data?.[0]?.additional_info)
        : [];
    const additionalInfo = Object.values(additionalInfoRow).filter(
        (item) => item.title && item.title.trim() !== "",
    );

    // const [canScrollNext, setCanScrollNext] = useState(false);
    // const [canScrollPrev, setCanScrollPrev] = useState(false);

    // useEffect(() => {
    //     if (!api2) return;

    //     const updateScrollButtons = () => {
    //         setCanScrollNext(api2?.canScrollNext() ?? false);
    //         setCanScrollPrev(api2?.canScrollPrev() ?? false);
    //     };

    //     updateScrollButtons(); // initial
    //     api2.on("select", updateScrollButtons);

    //     return () => {
    //         api2.off("select", updateScrollButtons);
    //     };
    // }, [api2]);

    return (
        <div className="w-full bg-white pt-12 md:pt-44 xl:pl-28 2xl:pl-40">
            <div className="flex pl-8 sm:pl-12 pr-12 lg:pr-0">
                <div className="w-full md:w-1/2">
                    {additionalInfo?.map((item, index) => {
                        if (item?.record_id === "0") {
                            return (
                                <React.Fragment key={index}>
                                    {item?.title && (
                                        <Text
                                            as="h5"
                                            size="customtext3"
                                            weight="bold"
                                            color="black"
                                            font="helvetica"
                                            className="text-xl lg:text-3xl leading-6 lg:leading-16"
                                        >
                                            {item?.title}
                                        </Text>
                                    )}
                                </React.Fragment>
                            );
                        }

                        if (item?.record_id === "1") {
                            return (
                                <React.Fragment key={index}>
                                    {item?.title && (
                                        <Text
                                            as="p"
                                            font="helvetica"
                                            size="xl5"
                                            weight="light"
                                            color="black"
                                            className="text-3xl lg:text-5xl mt-3"
                                        >
                                            {item.title}
                                        </Text>
                                    )}
                                </React.Fragment>
                            );
                        }
                        return (
                            <React.Fragment key={index}>
                                {item.title && (
                                    <Text
                                        as="p"
                                        font="helvetica"
                                        size="productTitle2"
                                        color="black"
                                        weight="normal"
                                        className="mt-5 md:mt-3 leading-[1.5]"
                                    >
                                        {item.title}
                                    </Text>
                                )}
                            </React.Fragment>
                        );
                    })}
                </div>
                {/* <div className="w-1/2 items-center justify-center gap-8 hidden lg:flex">
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
                </div> */}
            </div>

            <div className="flex pt-8 md:pt-16 lg:gap-32 flex-col-reverse lg:flex-row">
                <div className="w-full lg:w-1/2 sm:pr-12 lg:pr-0 pl-4 sm:pl-12 lg:bg-white">
                    <Carousel opts={{ loop: false }} setApi={setApi}>
                        <CarouselContent>{productSlides}</CarouselContent>
                    </Carousel>
                </div>
                <div className="w-full lg:w-1/2 lg:pl-12">
                    <Carousel opts={{ loop: false }} setApi={setApi2}>
                        <CarouselContent>{slides}</CarouselContent>
                    </Carousel>
                </div>
            </div>

            <div className="flex pt-16 gap-4 justify-center lg:bg-white pb-20">
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
