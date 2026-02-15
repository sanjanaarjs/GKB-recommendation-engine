"use client";

import React from "react";
import Image from "next/image";
import Text from "@/components/generic/Text";
import { ProductDetails } from "../datas/pdpData.api";
import { splitIntoSentences } from "@/lib/utils";

interface GiftPackagingProps {
    productContent: ProductDetails[] | null;
}

const GiftPackaging: React.FC<GiftPackagingProps> = ({ productContent }) => {
    const content = productContent?.[1]?.ProductContentRow
        ? productContent?.[2]?.ProductContentRow?.[0]
        : null;

    return (
        <div className="flex lg:flex-row flex-col h-full bg-white">
            {/* Left - Image */}
            <div className="flex-1 bg-[#f7f7f7]">
                {content && content?.media && (
                    <Image
                        src={content?.media}
                        alt={`img_${content?.title}`}
                        width={751}
                        height={399}
                        className="max-w-max mx-auto"
                    />
                )}
            </div>

            {/* Right - Text Content */}
            <div className="flex-1 h-full lg:pt-[120px] lg:pb-[48px] lg:px-[59px] p-6">
                <Text
                    font="helvetica"
                    as="h2"
                    className="font-light text-2xl leading-normal text-black mb-3 lg:mb-[32px]"
                >
                    {content?.title}
                </Text>
                <ul className="list-disc space-y-3 pl-5">
                    {content && content?.description
                        ? splitIntoSentences(content?.description)?.map(
                              (item, index) => (
                                  <li className="text-sm" key={index}>
                                      {item}
                                  </li>
                              ),
                          )
                        : []}
                </ul>
            </div>
        </div>
    );
};

export default GiftPackaging;
