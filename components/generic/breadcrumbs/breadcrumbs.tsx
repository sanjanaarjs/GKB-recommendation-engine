"use client";

import React from "react";
import Link from "next/link";
import Text from "@/components/generic/Text";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
} from "@/components/ui/breadcrumb";

export interface BreadcrumbItemType {
    label: string;
    url?: string;
}

export interface BreadcrumbsProps {
    items: BreadcrumbItemType[];
}

export function Breadcrumbs({ items }: Readonly<BreadcrumbsProps>) {
    const validItems = items?.filter(
        (item) => item.label && item.label.trim() !== "",
    );

    return (
        <Breadcrumb className="montserrat">
            <BreadcrumbList>
                {validItems?.map((item, index) => {
                    const isLast = index === validItems.length - 1;

                    return (
                        <React.Fragment key={item.label}>
                            <BreadcrumbItem>
                                {!isLast && item.url ? (
                                    <BreadcrumbLink asChild>
                                        <Link href={item.url.toLowerCase()}>
                                            <Text
                                                as="span"
                                                font="helvetica"
                                                size="base"
                                                weight="light"
                                                className="text-title-800 leading-6 lg:text-base"
                                            >
                                                {item.label}
                                            </Text>
                                        </Link>
                                    </BreadcrumbLink>
                                ) : (
                                    <BreadcrumbPage>
                                        <Text
                                            as="span"
                                            size="sm"
                                            weight="extrabold"
                                            className="text-title-900 leading-6 lg:text-base"
                                        >
                                            {item.label}
                                        </Text>
                                    </BreadcrumbPage>
                                )}
                            </BreadcrumbItem>
                            {!isLast && (
                                <span className="text-title-800"> / </span>
                            )}
                        </React.Fragment>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
}
