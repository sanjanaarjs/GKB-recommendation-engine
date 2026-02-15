"use client";

import React from "react";
import Image from "next/image";
import {
    ProductContentRow,
    ProductItem,
    ProductsQueryResponse,
} from "../datas/pdpData.api";

interface ProductDetailProps {
    productData: ProductsQueryResponse | null;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ productData }) => {
    const product: ProductItem | null =
        productData?.products?.items && productData?.products?.items.length > 0
            ? productData.products.items[0]
            : null;

    const productContent: ProductContentRow | undefined | null =
        productData?.products?.items && productData?.products?.items?.length > 0
            ? productData?.products?.items?.[0]?.product_content?.[0]
                  ?.ProductContentRow?.[0]
            : null;

    return (
        <div className="flex flex-col md:flex-row gap-10">
            {/* Left - Image */}
            <div className="w-full lg:w-1/2">
                {productContent?.media && (
                    <Image
                        src={productContent?.media}
                        width={753}
                        height={753}
                        alt={`${productContent?.title}_image`}
                        className="-translate-x-[80px] object-contain"
                    />
                )}
            </div>

            {/* Right - Details */}
            <div className="w-full lg:w-1/2 text-black space-y-4 bg-white p-6 md:p-10 lg:h-fit">
                {/* Title */}
                <h2 className="text-2xl font-light">{product?.name}</h2>

                {/* Description */}
                <p className="text-sm leading-relaxed">
                    {productContent?.description}
                </p>

                {/* Specs */}
                <div className="space-y-3 text-sm">
                    {product?.attributeTobeShow?.map((item) =>
                        item?.attribute_label &&
                        item?.attribute_value &&
                        item.attribute_value.trim() !== "" ? (
                            <div
                                key={item.attribute_code}
                                className="grid grid-cols-2 gap-3"
                            >
                                <span className="font-light">
                                    {item.attribute_label}:
                                </span>
                                <span className="font-bold">
                                    {item.attribute_value}
                                </span>
                            </div>
                        ) : null,
                    )}
                </div>
                {/* {specs.map((spec, index) => (
                        <div key={index} className="grid grid-cols-2">
                            <span className="font-light">{spec.label}:</span>
                            <span className="font-bold">{spec.value}</span>
                            {spec.note && (
                                <span className="col-span-2 text-xs text-gray-500 mt-1">
                                    {spec.note}
                                </span>
                            )}
                        </div>
                    ))} */}

                {/* Button */}
                {/* <div className="flex justify-center">
                    <button
                        onClick={() => { }}
                        className="border border-black rounded-full px-6 py-2 text-sm font-medium hover:bg-black hover:text-white transition"
                    >
                        {'buttonLabel'}
                    </button>
                </div> */}
            </div>
        </div>
    );
};

export default ProductDetail;
