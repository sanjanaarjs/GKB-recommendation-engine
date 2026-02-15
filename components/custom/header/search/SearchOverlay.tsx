"use client";

import Image from "next/image";
import SearchClose from "@/components/icons/SearchClose";
import Text from "@/components/generic/Text";
import { useLazyQuery, useQuery } from "@apollo/client";
import { STORE_LABEL_QUERY } from "./SearchLabel.api";
import {
    GET_SEARCH_SECTION,
    GetSearchSectionResponse,
} from "./GetSearchSection.api";
import { useEffect, useState, useRef, useCallback } from "react";
import { GET_PRODUCTS, ProductsResponse } from "./GetProductsData.api";
import {
    SEARCH_PRODUCTS,
    SearchProductsResponse,
} from "./GetProductSuggestion.api";
import {
    ADVANCED_SEARCH_SUGGESTION,
    AdvancedSearchSuggestionResponse,
} from "./GetSearchSuggestion.api";
import Link from "next/link";

interface SearchOverlayProps {
    readonly onClose: () => void;
    readonly products?: {
        readonly name: string;
        readonly model: string;
        readonly price: string;
        readonly image: string;
    }[];
}

function chunkArray<T>(arr: T[], chunkSize: number): T[][] {
    const chunks = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        chunks.push(arr.slice(i, i + chunkSize));
    }
    return chunks;
}

export default function SearchOverlay({ onClose }: SearchOverlayProps) {
    const { data: storeConfigData } = useQuery(STORE_LABEL_QUERY);
    const { data: searchData } =
        useQuery<GetSearchSectionResponse>(GET_SEARCH_SECTION);
    const [showResults, setShowResults] = useState(false);
    const mostSearched =
        searchData?.getSearchSection?.data.filter(
            (item) => item.type === "most_searched",
        ) || [];

    const interestIn =
        searchData?.getSearchSection?.data.filter(
            (item) => item.type === "also_explore",
        ) || [];
    const popularProducts =
        searchData?.getSearchSection?.data.filter(
            (item) => item.type === "popular_products",
        ) || [];
    const popularBrands =
        searchData?.getSearchSection?.data.filter(
            (item) => item.type === "popular_brands",
        ) || [];

    const skuArray =
        popularProducts?.[0]?.content?.split(",").map((str) => str.trim()) ??
        [];

    const [inputValue, setInputValue] = useState("");
    const [searchHistory, setSearchHistory] = useState<string[]>([]);

    const { data: productsData } = useQuery<
        ProductsResponse,
        { skuList: string[] }
    >(GET_PRODUCTS, {
        variables: { skuList: skuArray },
        skip: !skuArray || skuArray.length === 0, // Skip query if no SKUs
    });

    const chunkedProducts = chunkArray(productsData?.products?.items ?? [], 3);

    const [
        searchProducts,
        { data: searchProductsData, loading: searchLoading },
    ] = useLazyQuery<SearchProductsResponse, { search: string }>(
        SEARCH_PRODUCTS,
    );

    const [
        getSuggestions,
        { data: suggestionData, loading: suggestionsLoading },
    ] = useLazyQuery<AdvancedSearchSuggestionResponse, { query: string }>(
        ADVANCED_SEARCH_SUGGESTION,
    );

    // Debounce ref to track timeout
    const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Store latest functions in refs to avoid recreating debounced function
    const searchProductsRef = useRef(searchProducts);
    const getSuggestionsRef = useRef(getSuggestions);

    // Keep refs updated
    useEffect(() => {
        searchProductsRef.current = searchProducts;
        getSuggestionsRef.current = getSuggestions;
    }, [searchProducts, getSuggestions]);

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "";
        };
    }, []);

    // Debounced search function - stable reference
    const debouncedSearch = useCallback(
        (value: string) => {
            // Clear any existing timeout
            if (debounceTimeoutRef.current) {
                clearTimeout(debounceTimeoutRef.current);
            }

            // Set new timeout
            debounceTimeoutRef.current = setTimeout(() => {
                searchProductsRef.current({ variables: { search: value } });
                getSuggestionsRef.current({ variables: { query: value } });
            }, 500); // 500ms debounce delay
        },
        [], // No dependencies - uses refs instead
    );

    // Cleanup debounce timeout on unmount
    useEffect(() => {
        return () => {
            if (debounceTimeoutRef.current) {
                clearTimeout(debounceTimeoutRef.current);
            }
        };
    }, []);

    const chunkedSearchProducts = chunkArray(
        searchProductsData?.products?.items ?? [],
        4,
    );

    useEffect(() => {
        if (storeConfigData && searchData) {
            console.log("storeConfig", storeConfigData);
            console.log("searchData", searchData);
        }
    }, [storeConfigData]);

    useEffect(() => {
        const stored = localStorage.getItem("searchHistory");
        if (stored) {
            setSearchHistory(JSON.parse(stored));
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);

        if (value.length >= 3) {
            debouncedSearch(value);
            setShowResults(true);
        } else {
            // Cancel pending debounce if input is less than 3 characters
            if (debounceTimeoutRef.current) {
                clearTimeout(debounceTimeoutRef.current);
            }
            setShowResults(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            const value = inputValue.trim();
            if (!value) return;

            if (value.length < 3) {
                // setInputValue("");
                return;
            }

            if (searchHistory.includes(value)) {
                // setInputValue("");
                return;
            }

            const updated = [...searchHistory, value];
            setSearchHistory(updated);
            localStorage.setItem("searchHistory", JSON.stringify(updated));
            // setInputValue("");
        }
    };

    const trimmedSearchTerm = inputValue.trim();
    const searchResultsHref =
        trimmedSearchTerm.length >= 3
            ? `/search?q=${encodeURIComponent(trimmedSearchTerm)}`
            : "/search";
    const totalSearchResults =
        searchProductsData?.products?.total_count ??
        searchProductsData?.products?.items?.length ??
        0;

    return (
        <div
            className="fixed inset-0 z-50 bg-white p-8 lg:px-[80px] lg:py-[48px] overflow-y-auto"
            data-lenis-prevent
        >
            <div className="flex justify-between items-center mb-8">
                <Text
                    as="h1"
                    color="black"
                    font="avenir"
                    size="customText10"
                    weight="light"
                >
                    Search
                </Text>
                <button
                    onClick={onClose}
                    className="cursor-pointer hidden lg:block"
                >
                    <SearchClose size={72} fill="#0B0B0B" />
                </button>
                <button
                    onClick={onClose}
                    className="cursor-pointer block lg:hidden"
                >
                    <SearchClose size={32} fill="#0B0B0B" />
                </button>
            </div>
            <div className="relative">
                <label className="bg-white lg:w-fit left-1/2 -translate-x-1/2 lg:translate-x-0 w-[222px] absolute lg:left-[30px] top-[-13px]">
                    <Text
                        font="helvetica"
                        color="fontSecondary"
                        size="customText11"
                    >
                        {storeConfigData?.storeConfig?.search_label}
                    </Text>
                </label>
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    placeholder={
                        storeConfigData?.storeConfig?.search_placeholder
                    }
                    className="w-full border border-black placeholder-transparent rounded-full px-6 py-4 text-lg mb-10"
                />
            </div>

            {/* {!searchProductsData || !suggestionData ? ( */}
            {!showResults ? (
                <div className="grid grid-cols-1 lg:grid-cols-[25%_1fr] gap-10 font-helvetica">
                    <div className="space-y-8">
                        <div>
                            <Text
                                as="h3"
                                font="helvetica"
                                color="black"
                                size="sm"
                                weight="bold"
                                className="mb-2"
                            >
                                Most searched
                            </Text>
                            <ul className="space-y-1 text-[1rem] font-[300]">
                                {mostSearched.length ? (
                                    <>
                                        {mostSearched?.map((item) => (
                                            <li key={item.id}>
                                                <Link
                                                    href={item?.content}
                                                    onClick={onClose}
                                                >
                                                    <Text
                                                        color="black"
                                                        font="helvetica"
                                                        size="base"
                                                        weight="light"
                                                    >
                                                        {item.title}
                                                    </Text>
                                                </Link>
                                            </li>
                                        ))}
                                    </>
                                ) : (
                                    <li>
                                        <Text
                                            color="black"
                                            font="helvetica"
                                            size="base"
                                            weight="light"
                                        >
                                            Most Searched data not available
                                        </Text>
                                    </li>
                                )}
                            </ul>
                        </div>
                        <div>
                            <Text
                                as="h3"
                                font="helvetica"
                                color="black"
                                size="sm"
                                weight="bold"
                                className="mb-2"
                            >
                                You might be interested in
                            </Text>
                            <ul className="space-y-1 text-[1rem] font-[300]">
                                {interestIn.length ? (
                                    <>
                                        {interestIn?.map((item) => (
                                            <li key={item.id}>
                                                <Link
                                                    href={item?.content}
                                                    onClick={onClose}
                                                >
                                                    <Text
                                                        color="black"
                                                        font="helvetica"
                                                        size="base"
                                                        weight="light"
                                                    >
                                                        {item.title}
                                                    </Text>
                                                </Link>
                                            </li>
                                        ))}
                                    </>
                                ) : (
                                    <Text
                                        color="black"
                                        font="helvetica"
                                        size="base"
                                        weight="light"
                                    >
                                        data not available
                                    </Text>
                                )}
                            </ul>
                        </div>
                        <div>
                            <Text
                                as="h3"
                                font="helvetica"
                                color="black"
                                size="sm"
                                weight="bold"
                                className="mb-2"
                            >
                                Recently searched
                            </Text>
                            <ul className="space-y-1 text-[1rem] font-[300]">
                                {searchHistory.length ? (
                                    <>
                                        {searchHistory
                                            .slice(-2)
                                            .map((item, idx) => (
                                                <li key={idx}>
                                                    <Link
                                                        href=""
                                                        onClick={onClose}
                                                    >
                                                        <Text
                                                            color="black"
                                                            font="helvetica"
                                                            size="base"
                                                            weight="light"
                                                        >
                                                            {item}
                                                        </Text>
                                                    </Link>
                                                </li>
                                            ))}
                                    </>
                                ) : (
                                    <Text
                                        color="black"
                                        font="helvetica"
                                        size="base"
                                        weight="light"
                                    >
                                        No recently searched items
                                    </Text>
                                )}
                            </ul>
                        </div>
                    </div>

                    <div>
                        <div className="flex flex-col lg:flex-row lg:gap-8 gap-3 lg:items-center items-start mb-6">
                            <Text
                                as="h3"
                                color="black"
                                size="sm"
                                font="helvetica"
                                weight="bold"
                            >
                                Popular products
                            </Text>
                            <Text
                                color="black"
                                size="base"
                                font="helvetica"
                                weight="normal"
                                as="span"
                                className="cursor-pointer italic"
                            >
                                View all products (456) →
                            </Text>
                        </div>

                        <div className="flex flex-col md:flex-row gap-12">
                            {chunkedProducts.length ? (
                                <>
                                    {chunkedProducts.map((group, colIndex) => (
                                        <div
                                            key={colIndex}
                                            className="flex flex-col gap-3"
                                        >
                                            {group.map((item) => {
                                                const productSlug =
                                                    (item.url_key || "")
                                                        .replace(/^\/+/, "")
                                                        .replace(/\.html$/i, "")
                                                        .split("/")
                                                        .pop() || "";
                                                const productUrl = productSlug
                                                    ? `/${productSlug}`
                                                    : "";

                                                return (
                                                    <Link
                                                        href={productUrl}
                                                        key={item.id}
                                                        onClick={onClose}
                                                    >
                                                        <div className="flex items-center gap-4">
                                                            {item.small_image
                                                                .url && (
                                                                <Image
                                                                    src={
                                                                        item
                                                                            .small_image
                                                                            .url
                                                                    }
                                                                    alt={
                                                                        item.name
                                                                    }
                                                                    width={160}
                                                                    height={80}
                                                                />
                                                            )}
                                                            <div>
                                                                <Text
                                                                    color="black"
                                                                    font="avenir"
                                                                    size="xs"
                                                                    weight="extrabold"
                                                                    className="mb-1"
                                                                >
                                                                    {item.name}
                                                                </Text>
                                                                <Text
                                                                    color="black"
                                                                    font="helvetica"
                                                                    size="xs"
                                                                    weight="light"
                                                                >
                                                                    {item.name}
                                                                </Text>

                                                                <Text
                                                                    color="black"
                                                                    font="helvetica"
                                                                    size="sm"
                                                                    weight="bold"
                                                                    className="mt-3"
                                                                >
                                                                    &#8377;{" "}
                                                                    {item
                                                                        .price_range
                                                                        .minimum_price
                                                                        .discount
                                                                        .percent_off >
                                                                    0
                                                                        ? item
                                                                              .price_range
                                                                              .minimum_price
                                                                              .regular_price
                                                                              .value
                                                                        : item
                                                                              .price_range
                                                                              .minimum_price
                                                                              .final_price
                                                                              .value}
                                                                </Text>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    ))}
                                </>
                            ) : (
                                <Text
                                    color="black"
                                    font="helvetica"
                                    size="base"
                                    weight="light"
                                >
                                    No popular products found
                                </Text>
                            )}
                        </div>

                        <div className="mt-16">
                            <div className="flex lg:gap-8 gap-3 lg:flex-row flex-col lg:items-center items-start mb-4">
                                <Text
                                    color="black"
                                    font="helvetica"
                                    size="sm"
                                    weight="bold"
                                    as="h3"
                                >
                                    Popular brands
                                </Text>
                                <Text
                                    as="span"
                                    font="helvetica"
                                    size="base"
                                    weight="normal"
                                    color="black"
                                    className="cursor-pointer italic"
                                >
                                    View all products (46) →
                                </Text>
                            </div>

                            {/* popular brands data when proper image is available */}
                            <div className="flex flex-wrap gap-10 items-center">
                                {popularBrands.length ? (
                                    <>
                                        {popularBrands?.map(
                                            (brand) =>
                                                brand?.image && (
                                                    <Link
                                                        href={brand?.content}
                                                        key={brand.title}
                                                        onClick={onClose}
                                                    >
                                                        {brand.image && (
                                                            <Image
                                                                src={
                                                                    brand.image ||
                                                                    ""
                                                                }
                                                                alt={
                                                                    brand.title
                                                                }
                                                                width={80}
                                                                height={30}
                                                                className="invert"
                                                            />
                                                        )}
                                                    </Link>
                                                ),
                                        )}
                                    </>
                                ) : (
                                    <Text
                                        color="black"
                                        font="helvetica"
                                        size="base"
                                        weight="light"
                                    >
                                        No popular brands found
                                    </Text>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ) : searchLoading || suggestionsLoading ? (
                <div className="grid grid-cols-1 lg:grid-cols-[25%_1fr] gap-10 font-helvetica animate-pulse">
                    {/* Left sidebar skeleton */}
                    <div className="space-y-8">
                        <div>
                            <div className="h-4 w-24 bg-gray-200 rounded mb-4"></div>
                            <div className="space-y-2">
                                <div className="h-3 w-32 bg-gray-200 rounded"></div>
                                <div className="h-3 w-28 bg-gray-200 rounded"></div>
                                <div className="h-3 w-36 bg-gray-200 rounded"></div>
                                <div className="h-3 w-24 bg-gray-200 rounded"></div>
                            </div>
                        </div>
                    </div>

                    {/* Right content skeleton */}
                    <div>
                        <div className="flex gap-8 items-center mb-6">
                            <div className="h-4 w-40 bg-gray-200 rounded"></div>
                            <div className="h-3 w-32 bg-gray-200 rounded"></div>
                        </div>

                        <div className="flex flex-col md:flex-row gap-12">
                            {[1, 2, 3].map((col) => (
                                <div key={col} className="flex flex-col gap-4">
                                    {[1, 2, 3, 4].map((item) => (
                                        <div
                                            key={item}
                                            className="flex items-center gap-4"
                                        >
                                            <div className="w-[160px] h-[80px] bg-gray-200 rounded"></div>
                                            <div className="flex flex-col gap-2">
                                                <div className="h-3 w-24 bg-gray-200 rounded"></div>
                                                <div className="h-3 w-20 bg-gray-200 rounded"></div>
                                                <div className="h-4 w-16 bg-gray-200 rounded mt-1"></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-[25%_1fr] gap-10 font-helvetica">
                    <div className="space-y-8">
                        <div>
                            <ul className="space-y-1 lg:space-y-3 text-[1rem] font-[300] xl:w-[230px]">
                                {suggestionData?.advancedSearchSuggestion
                                    ?.length ? (
                                    <>
                                        {suggestionData?.advancedSearchSuggestion?.map(
                                            (item) => (
                                                <li key={item.id}>
                                                    <Link
                                                        href={item?.url_key}
                                                        onClick={onClose}
                                                    >
                                                        <Text
                                                            color="black"
                                                            font="helvetica"
                                                            size="base"
                                                            weight="light"
                                                        >
                                                            {item?.title}
                                                        </Text>
                                                    </Link>
                                                </li>
                                            ),
                                        )}
                                    </>
                                ) : (
                                    <li>
                                        <Text
                                            color="black"
                                            font="helvetica"
                                            size="base"
                                            weight="light"
                                        >
                                            No results found
                                        </Text>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>

                    <div>
                        <div className="flex gap-8 items-center mb-6">
                            <Text
                                as="h3"
                                color="black"
                                size="sm"
                                font="helvetica"
                                weight="bold"
                            >
                                RESULTS for {inputValue}
                            </Text>
                            <Link
                                href={searchResultsHref}
                                onClick={onClose}
                                className="cursor-pointer italic"
                            >
                                <Text
                                    color="black"
                                    size="base"
                                    font="helvetica"
                                    weight="normal"
                                    as="span"
                                >
                                    View all products ({totalSearchResults}) →
                                </Text>
                            </Link>
                        </div>

                        <div className="flex flex-col md:flex-row gap-12">
                            {searchProductsData?.products?.items?.length ? (
                                <>
                                    {chunkedSearchProducts.map(
                                        (group, colIndex) => (
                                            <div
                                                key={colIndex}
                                                className="flex flex-col gap-3"
                                            >
                                                {group.map((item) => {
                                                    const productSlug =
                                                        (item.url_key || "")
                                                            .replace(/^\/+/, "")
                                                            .replace(
                                                                /\.html$/i,
                                                                "",
                                                            )
                                                            .split("/")
                                                            .pop() || "";
                                                    const productUrl =
                                                        productSlug
                                                            ? `/${productSlug}`
                                                            : "";

                                                    return (
                                                        <Link
                                                            href={productUrl}
                                                            key={item.id}
                                                            onClick={onClose}
                                                        >
                                                            <div className="flex items-center gap-4">
                                                                {item
                                                                    .small_image
                                                                    .url && (
                                                                    <Image
                                                                        src={
                                                                            item
                                                                                .small_image
                                                                                .url
                                                                        }
                                                                        alt={
                                                                            item
                                                                                ?.image
                                                                                ?.label ??
                                                                            ""
                                                                        }
                                                                        width={
                                                                            110
                                                                        }
                                                                        height={
                                                                            80
                                                                        }
                                                                    />
                                                                )}
                                                                <div>
                                                                    <Text
                                                                        color="black"
                                                                        font="avenir"
                                                                        size="xs"
                                                                        weight="extrabold"
                                                                    >
                                                                        {
                                                                            item.name
                                                                        }
                                                                    </Text>
                                                                    <Text
                                                                        color="black"
                                                                        font="helvetica"
                                                                        size="xs"
                                                                        weight="light"
                                                                    >
                                                                        {
                                                                            item.name
                                                                        }
                                                                    </Text>

                                                                    <Text
                                                                        color="black"
                                                                        font="helvetica"
                                                                        size="sm"
                                                                        weight="bold"
                                                                    >
                                                                        {item
                                                                            .price_range
                                                                            .minimum_price
                                                                            .discount
                                                                            .percent_off >
                                                                        0
                                                                            ? item
                                                                                  .price_range
                                                                                  .minimum_price
                                                                                  .regular_price
                                                                                  .value
                                                                            : item
                                                                                  .price_range
                                                                                  .minimum_price
                                                                                  .final_price
                                                                                  .value}
                                                                    </Text>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    );
                                                })}
                                            </div>
                                        ),
                                    )}
                                </>
                            ) : (
                                <Text
                                    color="black"
                                    font="helvetica"
                                    size="base"
                                    weight="light"
                                >
                                    No search products found
                                </Text>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
