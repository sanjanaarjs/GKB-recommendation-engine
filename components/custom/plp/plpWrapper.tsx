"use client";

import ProductCard from "@/components/generic/product-card/ProductCard";
import Text from "@/components/generic/Text";
import Sort from "@/components/icons/Sort";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { PlpFilter } from "./plpFilter";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import {
    GET_CATEGORY_PLP,
    GetCategoryProductsResponse,
    ProductFilterInput,
    ProductItem,
    ProductSortInput,
} from "./datas/productData.api";
import { BrandCategory } from "@/lib/services/magento/homepageData";
import { useLazyQuery } from "@apollo/client";
import { CategoriesResponseCommon } from "@/lib/services/magento/query_getCategory_graphql";
import { CurrencyResponse } from "@/lib/services/magento/query_getCurrency_graphql";
import { useLenis } from "lenis/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import PlpBanner from "./plpBanner";
import PlpSlider from "./plpSlider";
import {
    ASC,
    BESTSELLER,
    COL_SPAN,
    COLLECTION,
    CURRENTPAGE,
    ITEM_BANNER,
    NEWARRIVAL,
} from "@/lib/constants/variable";
import { useWishlist } from "@/lib/hooks/useWishlist";
import { setCurrencySymbol } from "@/lib/store/currencySlice";
import { useDispatch } from "react-redux";

interface PlpPageProps {
    categoryProducts: GetCategoryProductsResponse | null;
    brandCategories: BrandCategory[] | null;
    getCategory: CategoriesResponseCommon["categories"] | null;
    resolverId: string;
    currency: CurrencyResponse["currency"] | null;
    initialPageSize?: number;
    searchQuery?: string;
}

interface GridItemWithBanner extends ProductItem {
    isBanner?: boolean;
    sort_order?: number;
    attachment?: string;
    attachmentmob?: string;
    buttontext?: string;
    link?: string;
    columnSpan?: number;
    rowPosition?: number;
    isWishlisted?: boolean;
}

interface AdditionalInfoItem {
    title: string;
}

interface FilterValue {
    in: string[];
}

type JSONPrimitive = string | number | boolean | null;
type JSONValue = JSONPrimitive | JSONObject | JSONArray;
interface JSONObject {
    [key: string]: JSONValue;
}
type JSONArray = Array<JSONValue>;

const isDate = (v: unknown): v is Date => v instanceof Date;

export const stableStringify = (value: unknown): string => {
    const seen = new WeakSet<object>();

    const stringify = (val: unknown): JSONValue => {
        if (val === null) return null;

        if (isDate(val)) return val.toJSON();

        const t = typeof val;

        if (t === "string" || t === "number" || t === "boolean") {
            return val as JSONPrimitive;
        }

        if (Array.isArray(val)) {
            return val.map(stringify) as JSONArray;
        }

        if (t === "object") {
            const obj = val as object;

            if (seen.has(obj)) return "__cyclic__";
            seen.add(obj);

            const out: JSONObject = {};
            for (const key of Object.keys(
                obj as Record<string, unknown>,
            ).sort()) {
                const v = (obj as Record<string, unknown>)[key];
                out[key] = stringify(v);
            }
            return out;
        }

        return null;
    };

    return JSON.stringify(stringify(value));
};

const makeCacheKey = ({
    filter,
    sort,
    page,
    pageSize,
    resolverId,
    searchQuery,
}: {
    filter: ProductFilterInput;
    sort: ProductSortInput;
    page: number;
    pageSize: number;
    resolverId: string;
    searchQuery?: string;
}) => {
    return [
        resolverId,
        searchQuery ?? "",
        page,
        pageSize,
        stableStringify(filter),
        stableStringify(sort),
    ].join("|");
};

export default function PlpWrapper({
    categoryProducts,
    brandCategories,
    getCategory,
    resolverId,
    currency,
    initialPageSize = 9,
    searchQuery,
}: PlpPageProps) {
    const normalizedSearchQuery = searchQuery?.trim() ?? "";
    const isSearchMode = normalizedSearchQuery.length > 0;
    const [plpProducts, setPlpProducts] = useState(
        categoryProducts?.products?.items || [],
    );

    const [open, setOpen] = useState(false);
    // Local response cache: key -> { items, totalCount }
    const cacheRef = useRef<
        Map<string, { items: ProductItem[]; totalCount: number }>
    >(new Map());

    const [activeFilters, setActiveFilters] = useState<string[]>([]);
    const [sidebarFilters, setSidebarFilters] = useState<ProductFilterInput>(
        {},
    ); // NEW - store sidebar filters
    const [sortState, setSortState] = useState<ProductSortInput>({
        name: ASC,
    });
    const [totalCount, setTotalCount] = useState(
        categoryProducts?.products?.total_count || 0,
    );

    // 🔹 NEW state for pagination
    const [currentPage, setCurrentPage] = useState(1);

    const currentPageRef = useRef(currentPage);
    const [hasMore, setHasMore] = useState(() => {
        const initialTotal = categoryProducts?.products?.total_count || 0;
        const initialItems = categoryProducts?.products?.items?.length || 0;
        return initialItems < initialTotal;
    });
    const pageSize = initialPageSize;

    const lenis = useLenis();

    const { wishlistSkuSet, handleWishlistClick } = useWishlist();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setCurrencySymbol(currency?.base_currency_symbol ?? "₹"));
    }, [dispatch, currency?.base_currency_symbol]);

    const [fetchCategoryProducts, { loading }] = useLazyQuery(
        GET_CATEGORY_PLP,
        {
            fetchPolicy: "no-cache",
            onCompleted: (data) => {
                if (data?.products) {
                    const newItems = data.products.items;
                    const totalCount = data.products.total_count || 0;
                    const merged = buildMergedFilters(
                        activeFilters,
                        sidebarFilters,
                    );
                    const key = makeCacheKey({
                        filter: merged,
                        sort: sortState,
                        page: currentPageRef.current,
                        pageSize,
                        resolverId,
                        searchQuery: normalizedSearchQuery,
                    });

                    // write to cache
                    cacheRef.current.set(key, {
                        items: newItems,
                        totalCount: totalCount,
                    });

                    if (currentPageRef.current === 1) {
                        // First page
                        setPlpProducts(newItems);
                        setTotalCount(totalCount);
                        // ✅ Check if we have more items to load
                        setHasMore(newItems.length < totalCount);
                    } else {
                        // Subsequent pages
                        setPlpProducts((prev) => {
                            const mergedItems = [...prev, ...newItems];
                            // ✅ Check total merged items against total count
                            setHasMore(mergedItems.length < totalCount);
                            return mergedItems;
                        });
                        setTotalCount(totalCount);
                    }
                } else {
                    setHasMore(false);
                    setTotalCount(0);
                }
            },
            onError: (err) => {
                console.error("GraphQL error:", err);
                setHasMore(false);
            },
        },
    );

    useEffect(() => {
        currentPageRef.current = currentPage;
    }, [currentPage]);

    const buildMergedFilters = (
        quick: string[],
        sidebar: ProductFilterInput,
    ): ProductFilterInput => {
        const gqlFilters: ProductFilterInput = { ...sidebar };

        // merge quick filters
        quick.forEach((key) => {
            const [attribute_code, value] = key.split("-");

            if (
                attribute_code === BESTSELLER ||
                attribute_code === NEWARRIVAL
            ) {
                gqlFilters[attribute_code] = { eq: value }; // send eq: "1"
            } else {
                if (!gqlFilters[attribute_code]) {
                    gqlFilters[attribute_code] = { in: [value] };
                } else {
                    (gqlFilters[attribute_code] as FilterValue).in?.push(value);
                }
            }
        });

        if (!isSearchMode) {
            gqlFilters.category_uid = { in: [resolverId.toString()] };
        }

        return gqlFilters;
    };

    const applyQuickFilters = useCallback(
        async (filters: string[]) => {
            const merged = buildMergedFilters(filters, sidebarFilters);
            setCurrentPage(1);
            const key = makeCacheKey({
                filter: merged,
                sort: sortState,
                page: 1,
                pageSize,
                resolverId,
                searchQuery: normalizedSearchQuery,
            });

            const cached = cacheRef.current.get(key);
            if (cached) {
                setPlpProducts(cached.items);
                setTotalCount(cached.totalCount);
                // ✅ Update hasMore based on cached data
                setHasMore(cached.items.length < cached.totalCount);
                return;
            }

            await fetchCategoryProducts({
                variables: {
                    pageSize,
                    currentPage: CURRENTPAGE,
                    filter: merged,
                    sort: sortState,
                    ...(isSearchMode ? { search: normalizedSearchQuery } : {}),
                },
            })
                .then((resp) => {
                    if (resp.data?.products) {
                        const newItems = resp.data.products.items;
                        const totalCount = resp.data.products.total_count || 0;

                        setPlpProducts(newItems);
                        setTotalCount(totalCount);
                        // ✅ Update hasMore correctly
                        setHasMore(newItems.length < totalCount);
                    } else {
                        setHasMore(false);
                        setTotalCount(0);
                    }
                })
                .catch((err) => {
                    console.error("Promise error in DEBUG:", err);
                    setHasMore(false);
                });
        },
        [fetchCategoryProducts, sidebarFilters, sortState, pageSize],
    );

    // ******for banner********
    // Helper function to parse additional_info and get column span from title
    const getColumnSpan = (additionalInfo: string | null): number => {
        if (!additionalInfo) return 1;

        try {
            const parsed = JSON.parse(additionalInfo) as AdditionalInfoItem[];
            // Look for the first item with a title that represents column span
            const firstItem = parsed.find(
                (item: AdditionalInfoItem) => item.title,
            );
            return firstItem ? parseInt(firstItem.title, 10) || 1 : 1;
        } catch {
            return 1;
        }
    };

    // Helper function to create rows and insert banners based on sort_order and column positioning
    const createGridWithBanners = (): GridItemWithBanner[] => {
        if (!plpProducts) return [];

        const products: GridItemWithBanner[] = [...plpProducts];
        const banners =
            categoryProducts?.products?.plp_banners?.data?.[0]?.itemsData || [];

        // Process banners to get their configuration
        const bannerConfigs = banners.map((banner) => ({
            ...banner,
            rowPosition: parseInt(banner.sort_order?.toString() || "1", 10),
            columnSpan: getColumnSpan(banner.additional_info),
        }));

        // Check if we're on mobile (you might want to use a proper mobile detection method)
        const isMobile =
            typeof window !== "undefined" && window.innerWidth < 1024;

        if (isMobile) {
            // Mobile logic: Insert banners after every 4 products, all banners take 2 columns
            const result: GridItemWithBanner[] = [];
            let bannerIndex = 0;

            for (let i = 0; i < products.length; i++) {
                result.push(products[i]);

                // Insert banner after every 4 products (positions 4, 8, 12, etc.)
                if ((i + 1) % 4 === 0 && bannerIndex < bannerConfigs.length) {
                    const banner = bannerConfigs[bannerIndex];
                    const bannerItem: GridItemWithBanner = {
                        name: banner.name,
                        sku: `banner-mobile-${banner.sort_order}-${bannerIndex}`,
                        price_range: {
                            minimum_price: {
                                regular_price: { value: 0, currency: "INR" },
                            },
                        },
                        isBanner: true,
                        sort_order: banner.rowPosition,
                        attachment: banner.attachment || undefined,
                        attachmentmob: banner.attachmentmob || undefined,
                        buttontext: banner.buttontext || undefined,
                        link: banner.link || undefined,
                        columnSpan: 2, // Always 2 columns on mobile
                    };

                    result.push(bannerItem);
                    bannerIndex++;
                }
            }

            return result;
        }

        // Desktop logic remains unchanged
        const COLUMNS_PER_ROW = 3;
        const result: GridItemWithBanner[] = [];

        let productIndex = 0;
        let currentRow = 1;

        // Process each row
        while (productIndex < products.length) {
            const currentRowItems: GridItemWithBanner[] = [];

            // Check if we have banners for this row
            const bannersForCurrentRow = bannerConfigs.filter(
                (banner) => banner.rowPosition === currentRow,
            );

            // Fill the row with products and banners
            let columnsUsed = 0;
            const targetColumns = COLUMNS_PER_ROW;

            // Process banners for this row
            bannersForCurrentRow.forEach((bannerConfig) => {
                const columnSpan = bannerConfig.columnSpan;

                const bannerItem: GridItemWithBanner = {
                    name: bannerConfig.name,
                    sku: `banner-${bannerConfig.sort_order}`,
                    price_range: {
                        minimum_price: {
                            regular_price: { value: 0, currency: "INR" },
                        },
                    },
                    isBanner: true,
                    sort_order: bannerConfig.rowPosition,
                    attachment: bannerConfig.attachment || undefined,
                    attachmentmob: bannerConfig.attachmentmob || undefined,
                    buttontext: bannerConfig.buttontext || undefined,
                    link: bannerConfig.link || undefined,
                    columnSpan: columnSpan,
                };

                if (columnSpan === 1) {
                    // 1 column banner - place at the beginning of the row
                    currentRowItems.unshift(bannerItem);
                    columnsUsed += 1;
                } else if (columnSpan === 2) {
                    // 2 column banner - place at the end of the row
                    currentRowItems.push(bannerItem);
                    columnsUsed += 2;
                }
            });

            // Fill remaining columns with products
            const remainingColumns = targetColumns - columnsUsed;
            for (
                let i = 0;
                i < remainingColumns && productIndex < products.length;
                i++
            ) {
                // For 1-column banner at start, add products after banner
                if (bannersForCurrentRow.some((b) => b.columnSpan === 1)) {
                    currentRowItems.push(products[productIndex]);
                } else {
                    // For 2-column banner at end, add products before banner
                    if (bannersForCurrentRow.some((b) => b.columnSpan === 2)) {
                        currentRowItems.splice(-1, 0, products[productIndex]);
                    } else {
                        // No banners, just add products normally
                        currentRowItems.push(products[productIndex]);
                    }
                }
                productIndex++;
            }

            // Add current row to result
            result.push(...currentRowItems);
            currentRow++;

            // Break if no more products and no more banners
            if (
                productIndex >= products.length &&
                !bannerConfigs.some((b) => b.rowPosition > currentRow)
            ) {
                break;
            }
        }

        return result;
    };

    const gridItems = useMemo<GridItemWithBanner[]>(() => {
        // Only build grid once products are loaded
        if (plpProducts.length > 0) {
            // Step 1: create grid (your banner logic stays intact)
            const grid = createGridWithBanners();

            // Step 2: map through grid and add wishlist status for products
            return grid.map((item) => {
                if (item.isBanner) return item; // ✅ skip banners
                return {
                    ...item,
                    isWishlisted: wishlistSkuSet.has(item.sku),
                };
            });
        }

        return [];
    }, [plpProducts, wishlistSkuSet]);

    // ******for banner end********

    const handleApplyFilters = (
        filters: ProductFilterInput,
        sort: ProductSortInput,
    ) => {
        setSidebarFilters(filters);
        setSortState(sort);

        const merged = buildMergedFilters(activeFilters, filters);

        setCurrentPage(1);
        setPlpProducts([]);

        const key = makeCacheKey({
            filter: merged,
            sort,
            page: 1,
            pageSize,
            resolverId,
            searchQuery: normalizedSearchQuery,
        });

        const cached = cacheRef.current.get(key);
        if (cached) {
            setPlpProducts(cached.items);
            setTotalCount(cached.totalCount);
            // ✅ Update hasMore based on cached data
            setHasMore(cached.items.length < cached.totalCount);
            return;
        }

        fetchCategoryProducts({
            variables: {
                pageSize: pageSize,
                currentPage: CURRENTPAGE,
                filter: merged,
                sort: sort,
                ...(isSearchMode ? { search: normalizedSearchQuery } : {}),
            },
        });
    };

    const loadMore = () => {
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);

        const merged = buildMergedFilters(activeFilters, sidebarFilters);

        fetchCategoryProducts({
            variables: {
                pageSize: pageSize,
                currentPage: nextPage,
                filter: merged,
                sort: sortState,
                ...(isSearchMode ? { search: normalizedSearchQuery } : {}),
            },
        })
            .then((resp) => {
                if (resp.data?.products) {
                    const newItems = resp.data.products.items;
                    const totalCount = resp.data.products.total_count || 0;

                    if (newItems.length === 0) {
                        setHasMore(false);
                        return;
                    }

                    setPlpProducts((prev) => {
                        const mergedItems = [...prev, ...newItems];
                        setHasMore(mergedItems.length < totalCount);
                        return mergedItems;
                    });
                    setTotalCount(totalCount);
                } else {
                    setHasMore(false);
                    setTotalCount(0);
                }
            })
            .catch((err) => {
                console.error("Promise error in DEBUG:", err);
                setHasMore(false);
            });
    };

    useEffect(() => {
        if (open) {
            lenis?.stop(); // disable smooth scroll
            document.body.style.overflow = "hidden"; // fallback for touch devices
        } else {
            lenis?.start(); // re-enable scroll
            document.body.style.overflow = "";
        }

        return () => {
            lenis?.start(); // re-enable scroll on cleanup
            document.body.style.overflow = "";
        };
    }, [open, lenis]);

    return (
        <>
            {categoryProducts?.products?.page_type === COLLECTION && (
                <PlpBanner
                    bannerData={
                        categoryProducts?.products?.collectionPage ?? []
                    }
                />
            )}
            {/* <PlpBanner /> */}
            <div className="bg-background-grey py-6 px-10 lg:pt-15 lg:pb-16 lg:px-20">
                <Text className="text-base pb-6 lg:pb-4 hidden">
                    Home / Sunglasses / Women&apos;s Sunglasses
                </Text>
                <Text
                    as="h2"
                    className="text-[28px] lg:text-5xl pb-6 lg:pb-[179px]"
                >
                    {isSearchMode
                        ? `Search results for "${normalizedSearchQuery}"`
                        : getCategory?.items?.[0]?.name}{" "}
                    ({totalCount > 0 ? totalCount : "No data found"})
                </Text>
                <div className="flex justify-between flex-col lg:flex-row items-center gap-12">
                    {!isSearchMode && (
                        <div className="overflow-x-auto lg:overflow-x-visible w-full">
                            <div className="flex gap-4 py-6 lg:py-0 md:flex-wrap">
                                {categoryProducts?.products?.quick_filters?.map(
                                    (item) => {
                                        const key = `${item.attribute_code}-${item.value}`;
                                        const isActive =
                                            activeFilters.includes(key);

                                        return (
                                            <button
                                                key={key}
                                                onClick={() => {
                                                    let updatedFilters: string[];
                                                    if (isActive) {
                                                        updatedFilters =
                                                            activeFilters.filter(
                                                                (v) =>
                                                                    v !== key,
                                                            );
                                                    } else {
                                                        updatedFilters = [
                                                            ...activeFilters,
                                                            key,
                                                        ];
                                                    }
                                                    setActiveFilters(
                                                        updatedFilters,
                                                    );

                                                    // Call API with updated filters
                                                    applyQuickFilters(
                                                        updatedFilters,
                                                    );
                                                }}
                                                className={`px-8 py-2 rounded-full border border-black text-sm font-medium transition cursor-pointer h-full whitespace-nowrap
 ${isActive ? "bg-black text-white" : "bg-white text-black hover:bg-gray-100"}`}
                                            >
                                                {item.label}
                                            </button>
                                        );
                                    },
                                )}
                            </div>
                        </div>
                    )}
                    <div className="flex justify-end lg:justify-end w-full items-center md:flex-1">
                        <div
                            className="px-8 py-2 rounded-full border border-black text-sm font-medium cursor-pointer
 bg-white text-black flex gap-2 whitespace-nowrap"
                        >
                            <Sheet open={open} onOpenChange={setOpen}>
                                <SheetTrigger asChild>
                                    <div className="flex items-center gap-2">
                                        <Sort />
                                        <Text>Sort & Filters</Text>
                                    </div>
                                </SheetTrigger>
                                {open && (
                                    <PlpFilter
                                        categoryProducts={categoryProducts}
                                        brandCategories={brandCategories}
                                        onApplyFilters={handleApplyFilters}
                                    />
                                )}
                            </Sheet>
                        </div>
                    </div>
                </div>
            </div>

            {totalCount === 0 ? (
                <div className="text-center py-10 text-lg font-medium">
                    No data found
                </div>
            ) : (
                <>
                    {plpProducts && (
                        <div className="grid grid-cols-2 lg:gap-x-4 lg:gap-y-[20px] lg:grid-cols-3 mb-10">
                            {gridItems.map((item, index) => {
                                const itemKey = item.isBanner
                                    ? `banner-${item.sku}-${index}`
                                    : `product-${item.sku}-${index}`;
                                // Check if this is a banner item
                                if (item.isBanner) {
                                    const colSpan = item.columnSpan || 1;
                                    const colSpanClass =
                                        colSpan === COL_SPAN
                                            ? "col-span-2"
                                            : "col-span-1";

                                    return (
                                        <div
                                            key={itemKey}
                                            className={colSpanClass}
                                        >
                                            <div className="relative group">
                                                {/* Desktop banner */}
                                                {item.attachment && (
                                                    <Image
                                                        src={item.attachment}
                                                        alt={
                                                            item.name ||
                                                            ITEM_BANNER
                                                        }
                                                        width={
                                                            colSpan === COL_SPAN
                                                                ? 672
                                                                : 336
                                                        }
                                                        height={400}
                                                        className="w-full h-auto hidden lg:block object-cover"
                                                    />
                                                )}

                                                {/* Mobile banner */}
                                                {item.attachmentmob && (
                                                    <Image
                                                        src={item.attachmentmob}
                                                        alt={
                                                            item.name ||
                                                            ITEM_BANNER
                                                        }
                                                        width={
                                                            colSpan === COL_SPAN
                                                                ? 500
                                                                : 250
                                                        }
                                                        height={300}
                                                        className="w-full h-auto lg:hidden object-cover"
                                                    />
                                                )}

                                                {/* Button overlay */}
                                                {item.buttontext &&
                                                    item.link && (
                                                        <div className="absolute inset-0 flex justify-center items-end bottom-5 lg:bottom-10">
                                                            <Link
                                                                href={item.link}
                                                                className="px-6 py-2 rounded-full font-medium transition shadow-lg
 primary-button"
                                                            >
                                                                {
                                                                    item.buttontext
                                                                }
                                                            </Link>
                                                        </div>
                                                    )}
                                            </div>
                                        </div>
                                    );
                                }

                                // Regular product item
                                return (
                                    <div key={itemKey} className="col-span-1">
                                        <ProductCard
                                            title={item.brand}
                                            subtitle={item.name}
                                            images={[
                                                item?.image?.url ?? "",
                                                item?.thumbnail?.url ?? "",
                                            ]}
                                            // thumbnailImages={item.thumbnail?.url}
                                            price={
                                                item.price_range.minimum_price
                                                    .regular_price.value
                                            }
                                            colorSwatches={item.color_swatch}
                                            currency={
                                                currency?.base_currency_symbol
                                            }
                                            shopNow={true}
                                            url_key={item.url_key}
                                            tag={item.tags}
                                            ishideShopNowAtMobile={true}
                                            showPrice={true}
                                            sku={item.sku}
                                            isWishlisted={item.isWishlisted}
                                            onWishlistClick={
                                                handleWishlistClick
                                            }
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* 🔹 NEW: Load More button */}
                    {hasMore && plpProducts.length > 0 && (
                        <div className="flex justify-center mb-12">
                            <Button
                                type="button"
                                onClick={loadMore}
                                disabled={loading}
                                className="primary-button-black rounded-full px-6 py-2"
                            >
                                {loading ? "Loading..." : "View More"}
                            </Button>
                        </div>
                    )}
                </>
            )}
            {categoryProducts?.products?.page_type === "collection_page" && (
                <PlpSlider
                    sliders={categoryProducts?.products?.collectionPage || []}
                />
            )}
        </>
    );
}
