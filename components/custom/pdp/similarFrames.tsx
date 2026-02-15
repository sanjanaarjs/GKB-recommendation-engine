import ProductCard from "@/components/generic/product-card/ProductCard";
import Text from "@/components/generic/Text";
import { Swiper, SwiperSlide } from "swiper/react";
import { RelatedProduct } from "./datas/pdpData.api";
import { useWishlist } from "@/lib/hooks/useWishlist";

interface SimilarFramesProps {
    title?: string; // dynamic heading
    products: RelatedProduct[]; // dynamic products
}

export default function SimilarFrames({
    title = "Similar frames you may also like", // default fallback
    products,
}: SimilarFramesProps) {
    const { wishlistSkuSet, handleWishlistClick } = useWishlist();

    if (products && products.length <= 0) {
        return null;
    }

    // Prepare product list with wishlist status
    const enhancedProducts = products.map((item) => {
        const sku = item?.sku ?? "";
        return {
            ...item,
            sku,
            isWishlisted: sku ? wishlistSkuSet.has(sku) : false,
        };
    });

    return (
        <div className="bg-background-grey">
            {/* Dynamic Title */}
            <Text
                size="xl4"
                className="md:pt-[178px] pt-16 pb-8 px-10 md:pb-[72px] w-full md:mx-20 md:w-[290px]"
            >
                {title}
            </Text>

            {/* Swiper Slider */}
            <Swiper
                spaceBetween={20}
                slidesPerView={1.5}
                navigation
                pagination={{ clickable: true }}
                breakpoints={{
                    768: { slidesPerView: 2, spaceBetween: 24 },
                    1024: { slidesPerView: 3, spaceBetween: 32 },
                }}
                className="bg-white lg:mb-[48px] mb-5 px-6"
            >
                {enhancedProducts &&
                    enhancedProducts.length > 0 &&
                    enhancedProducts.map((item, index) => (
                        <SwiperSlide key={index}>
                            <ProductCard
                                tag={item.brand ?? ""}
                                title={item.brand}
                                subtitle={item.name ?? ""}
                                images={[
                                    item.small_image?.url,
                                    item.thumbnail.url,
                                ]}
                                price={
                                    item.price?.regularPrice?.amount?.value ??
                                    13990
                                }
                                tryOn={false}
                                shopNow={true}
                                tagClassName="italic font-semibold font-avenir"
                                url_key={item.url_key}
                                sku={item.sku}
                                isWishlisted={item.isWishlisted}
                                onWishlistClick={() => {
                                    if (item.sku) handleWishlistClick(item.sku);
                                }}
                            />
                        </SwiperSlide>
                    ))}
            </Swiper>
        </div>
    );
}
