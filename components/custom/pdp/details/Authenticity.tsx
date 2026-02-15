"use client";

import React from "react";
import Text from "@/components/generic/Text";
import { ProductDetails } from "../datas/pdpData.api";

interface WarrantyAuthenticityProps {
    productContent: ProductDetails[] | [];
}

const WarrantyAuthenticity: React.FC<WarrantyAuthenticityProps> = ({
    productContent,
}) => {
    const content =
        productContent && productContent.length > 2
            ? productContent?.[3]
            : null;

    const left = {
        title: content?.ProductContentRow?.[0]?.title ?? null,
        description: content?.ProductContentRow?.[0]?.description ?? null,
    };
    const right = {
        title: content?.ProductContentRow?.[1]?.title ?? null,
        description: content?.ProductContentRow?.[1]?.description ?? null,
    };

    return (
        <div className="bg-white">
            <div className="flex lg:flex-row flex-col lg:py-[120px] lg:px-[60px] p-6 lg:gap-[40px] max-w-max mx-[33px] gap-6">
                {/* Left Section */}
                <div className="flex-1">
                    <Text
                        font="helvetica"
                        as="h2"
                        className="font-light text-2xl leading-normal text-black mb-3 lg:mb-[25px]"
                    >
                        {left.title}
                    </Text>
                    <div>
                        <Text
                            font="helvetica"
                            as="p"
                            className="font-medium text-sm leading-normal"
                        >
                            {left.description}
                        </Text>
                    </div>
                </div>

                {/* Right Section */}
                <div className="flex-1">
                    <Text
                        font="helvetica"
                        as="h2"
                        className="font-light text-2xl leading-normal text-black mb-3 lg:mb-[25px]"
                    >
                        {right.title}
                    </Text>
                    <div>
                        <Text
                            font="helvetica"
                            as="p"
                            className="font-medium text-sm leading-normal"
                        >
                            {right.description}
                        </Text>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WarrantyAuthenticity;
