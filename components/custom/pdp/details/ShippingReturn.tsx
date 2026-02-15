"use client";

import React from "react";
import Text from "@/components/generic/Text";
import { ProductDetails } from "../datas/pdpData.api";
import { splitIntoSentences } from "@/lib/utils";

interface ShippingReturnProps {
    productContent: ProductDetails[];
}

const ShippingReturn: React.FC<ShippingReturnProps> = ({ productContent }) => {
    const content = productContent?.[1]?.ProductContentRow
        ? productContent?.[1]?.ProductContentRow
        : [];

    return (
        <div className="bg-white">
            <div className="flex lg:flex-row flex-col lg:py-[120px] lg:px-[60px] p-6 lg:gap-[40px] max-w-max mx-auto gap-6">
                {content &&
                    content.map((item, idx) => (
                        <div className="flex-1" key={idx}>
                            <Text
                                font="helvetica"
                                as="h2"
                                className="font-light text-2xl leading-normal text-black mb-3 lg:mb-[32px]"
                            >
                                {item.title}
                            </Text>
                            <div>
                                <ul className="list-disc space-y-2 pl-5">
                                    {item.description
                                        ? splitIntoSentences(
                                              item.description,
                                          )?.map((res, i) => (
                                              <li className="text-sm" key={i}>
                                                  {res}
                                              </li>
                                          ))
                                        : []}
                                </ul>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default ShippingReturn;
