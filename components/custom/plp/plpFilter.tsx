"use client";

import { Button } from "@/components/ui/button";
import {
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { XIcon } from "lucide-react";
import Text from "@/components/generic/Text";
import PlpPriceRangeFilter from "./plpPriceRangeFilter";
import {
    AggregationOption,
    GetCategoryProductsResponse,
    ProductFilterInput,
    ProductSortInput,
} from "./datas/productData.api";
import { BrandCategory } from "@/lib/services/magento/homepageData";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import BrandFilter from "./plpBrandFilter";
import { ATTR_BRAND, POPULAR } from "@/lib/constants/variable";

interface PlpPageProps {
    categoryProducts: GetCategoryProductsResponse | null;
    brandCategories: BrandCategory[] | null;
}

interface PlpFilterProps extends PlpPageProps {
    onApplyFilters?: (
        filters: ProductFilterInput,
        sort: ProductSortInput,
    ) => void;
}

type FilterValues = string[] | { from: string; to: string };

export function PlpFilter({
    categoryProducts,
    // brandCategories,
    onApplyFilters,
}: PlpFilterProps) {
    const sortOptions = [
        // { value: "popular", label: "Popular" },
        { value: "priceHighToLow", label: "Price (high to low)" },
        { value: "priceLowToHigh", label: "Price (low to high)" },
        // { value: "newArrivals", label: "New arrivals" },
    ];

    // =========================
    // STEP 1: Merge popular brands into brand aggregation
    // =========================

    const aggregations = (() => {
        const baseAggs = categoryProducts?.products?.aggregations ?? [];
        const popularBrands =
            categoryProducts?.products?.popular_brand_filters ?? [];

        // find if "brands" aggregation exists
        const brandAggIndex = baseAggs.findIndex(
            (agg) => agg.attribute_code === ATTR_BRAND,
        );

        if (brandAggIndex !== -1 && popularBrands.length > 0) {
            const brandAgg = baseAggs[brandAggIndex];

            const popularBrandOptions: AggregationOption[] = popularBrands.map(
                (b) => ({
                    ...b,
                    label: b.name,
                    brand: b.name,
                    brand_name: b.name,
                    isPopular: true,
                }),
            );

            // Separate existing options into popular and others
            const existing = brandAgg.options ?? [];

            const otherBrands = existing;

            // Merge → popular first, then other brands
            const merged: AggregationOption[] = [
                ...popularBrandOptions,
                ...otherBrands,
            ];

            // Replace in the array
            const newAgg = { ...brandAgg, options: merged };
            const newAggs = [...baseAggs];
            newAggs[brandAggIndex] = newAgg;

            return newAggs;
        }

        return baseAggs;
    })();

    const [selectedFilters, setSelectedFilters] = useState<
        Record<string, FilterValues>
    >({});
    const [selectedSort, setSelectedSort] = useState(POPULAR);

    const router = useRouter();
    const searchParams = useSearchParams();

    // ====== sync from URL on mount
    useEffect(() => {
        const params: Record<string, string> = {};
        searchParams.forEach((value, key) => {
            params[key] = value;
        });

        const filters: Record<string, FilterValues> = {};
        Object.entries(params).forEach(([key, val]) => {
            if (key === "q") {
                return; // preserve search query separately (not a filter)
            }
            if (key === "price") {
                const [from, to] = val.split("-");
                filters[key] = { from, to };
            } else if (key === "sort_order" || key === "sort_value") {
                // handled by selectedSort later
            } else {
                filters[key] = val.split(",");
            }
        });

        const sortFromUrl = params.sort_value
            ? `${params.sort_value}${params.sort_order === "DESC" ? "HighToLow" : "LowToHigh"}`
            : "popular";

        setSelectedFilters(filters);
        setSelectedSort(sortFromUrl);

        if (onApplyFilters) {
            const gqlPayload = buildGraphqlFilter(filters);
            const gqlSort = buildGraphqlSort(sortFromUrl);
            onApplyFilters(gqlPayload, gqlSort);
        }
    }, [searchParams]);

    const handleCheckboxChange = (
        attribute_code: string,
        option_value: string | number | undefined,
        checked: boolean,
    ) => {
        const optionStr = String(option_value ?? "");

        setSelectedFilters((prev) => {
            // const prevArr = prev[attribute_code] ?? [];
            const prevArr = Array.isArray(prev[attribute_code])
                ? (prev[attribute_code] as string[])
                : [];
            let newArr: string[];
            if (checked) {
                // add the option if not already present
                newArr = prevArr.includes(optionStr)
                    ? prevArr
                    : [...prevArr, optionStr];
            } else {
                // remove
                newArr = prevArr.filter((v) => v !== optionStr);
            }
            const updated: Record<string, FilterValues> = {
                ...prev,
                [attribute_code]: newArr,
            };

            return updated;
        });
    };

    const handlePriceRangeChange = (min: number, max: number) => {
        setSelectedFilters((prev) => ({
            ...prev,
            price: {
                from: min.toString(),
                to: max.toString(),
            },
        }));
    };

    const buildGraphqlFilter = (filters: Record<string, FilterValues>) => {
        const out: Record<string, unknown> = {};
        Object.entries(filters).forEach(([attr, values]) => {
            if (!values) return;

            if (attr === "price" && !Array.isArray(values)) {
                out[attr] = { from: values.from, to: values.to };
            } else if (Array.isArray(values) && values.length > 0) {
                out[attr] =
                    values.length === 1 ? { eq: values[0] } : { in: values };
            }
        });
        return out;
    };

    const buildGraphqlSort = (sortValue: string): ProductSortInput => {
        switch (sortValue) {
            case "priceLowToHigh":
                return { price: "ASC" as ProductSortInput[string] };
            case "priceHighToLow":
                return { price: "DESC" as ProductSortInput[string] };
            case "newArrivals":
                return { created_at: "DESC" as ProductSortInput[string] };
            case "popular":
            default:
                return { relevance: "DESC" as ProductSortInput[string] };
        }
    };

    const updateUrlParams = (
        filters: Record<string, FilterValues>,
        sort: string,
    ) => {
        // <<< NEW
        const params = new URLSearchParams();
        const searchQuery = searchParams.get("q");
        if (searchQuery) {
            params.set("q", searchQuery);
        }

        // sort
        const sortParts = sort.match(
            /(priceLowToHigh|priceHighToLow|popular|newArrivals)/,
        );
        if (sortParts) {
            switch (sortParts[0]) {
                case "priceLowToHigh":
                    params.set("sort_value", "price");
                    params.set("sort_order", "ASC");
                    break;
                case "priceHighToLow":
                    params.set("sort_value", "price");
                    params.set("sort_order", "DESC");
                    break;
                case "newArrivals":
                    params.set("sort_value", "created_at");
                    params.set("sort_order", "DESC");
                    break;
                case "popular":
                    params.set("sort_value", "relevance");
                    params.set("sort_order", "DESC");
                    break;
            }
        }

        // filters
        Object.entries(filters).forEach(([key, val]) => {
            if (!val) return;
            if (key === "price" && !Array.isArray(val)) {
                params.set(key, `${val.from}-${val.to}`);
            } else if (Array.isArray(val) && val.length > 0) {
                params.set(key, val.join(","));
            }
        });

        router.replace(`?${params.toString()}`);
    };

    const handleSaveClick = () => {
        const gqlSort = buildGraphqlSort(selectedSort);
        const gqlPayload = buildGraphqlFilter(selectedFilters);
        updateUrlParams(selectedFilters, selectedSort);

        if (onApplyFilters) {
            onApplyFilters(gqlPayload, gqlSort);
        }
    };

    // ======== Reset all filters
    const handleResetFilters = () => {
        const defaultSort = POPULAR;
        setSelectedFilters({});
        setSelectedSort(defaultSort);
        updateUrlParams({}, defaultSort);

        const gqlPayload = buildGraphqlFilter({});
        const gqlSort = buildGraphqlSort(defaultSort);

        if (onApplyFilters) {
            onApplyFilters(gqlPayload, gqlSort);
        }
    };

    // helper to get selected count for a tab
    const getSelectedCount = (attr: string) => {
        const val = selectedFilters[attr];
        if (!val) return 0;
        if (Array.isArray(val)) return val.length;
        if (typeof val === "object" && val.from && val.to) return 1;
        return 0;
    };

    return (
        <SheetContent
            side="right"
            className="w-full lg:w-96 lg:min-w-[43%] gap-0 [&>button>svg:not(.keep)]:hidden"
        >
            {/* ---------------- Header ---------------- */}
            <SheetHeader className="shadow-[0_12px_24px_0_rgba(0,0,0,0.10)] px-10 py-6 h-[72px] w-full bg-white flex-row justify-center">
                <SheetTitle className="text-center text-2xl w-full">
                    <Text size="productTitle" weight="bold">
                        Sort & Filter by
                    </Text>
                </SheetTitle>
                <SheetClose className="ring-offset-background focus:ring-ring data-[state=open]:bg-secondary top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none">
                    <XIcon className="size-5" />
                    <span className="sr-only">Close</span>
                </SheetClose>
            </SheetHeader>

            {/* ---------------- Body ---------------- */}
            <div className="grid gap-4 h-auto overflow-y-auto no-scrollbar">
                <Tabs
                    defaultValue="sort"
                    className="flex h-full flex-row gap-0"
                >
                    {/* -------- Left Side Tab List -------- */}
                    <div
                        data-lenis-prevent
                        className="overflow-y-auto no-scrollbar h-[calc(100vh-144px)]"
                    >
                        <TabsList
                            className="flex flex-col w-35 rounded-none h-full items-start bg-background-grey-light p-0 justify-start
              "
                        >
                            {/* Static Sort Tab */}
                            <TabsTrigger
                                value="sort"
                                className="w-full text-center text-lg font-light py-6 lg:py-6 rounded-none 
                data-[state=active]:font-bold cursor-pointer flex-0"
                            >
                                Sort
                            </TabsTrigger>

                            {/* Dynamic filter tabs from API */}
                            {aggregations
                                .filter(
                                    (agg) =>
                                        agg.attribute_code !== "is_besteller" &&
                                        agg.attribute_code !== "is_new_arrival",
                                )
                                .map((tab) => (
                                    <TabsTrigger
                                        key={tab.attribute_code}
                                        value={tab.attribute_code}
                                        className="w-full justify-center text-center text-lg font-light py-6 lg:py-6 px-2 rounded-none 
                  data-[state=active]:font-bold cursor-pointer whitespace-normal flex-0"
                                    >
                                        {tab.label}
                                        {/* count badge for any aggregation */}
                                        {getSelectedCount(tab.attribute_code) >
                                            0 && (
                                            <span className="ml-2 px-2 py-0.5 bg-black text-white rounded-full text-xs">
                                                {getSelectedCount(
                                                    tab.attribute_code,
                                                )}
                                            </span>
                                        )}
                                    </TabsTrigger>
                                ))}
                        </TabsList>
                    </div>
                    {/* -------- Right Side Tab Content -------- */}
                    <div
                        className="flex-1 px-4 lg:px-6 py-[18px] overflow-y-auto no-scrollbar h-[calc(100vh-144px)]"
                        data-lenis-prevent
                    >
                        {/*  Sort Content (static) */}
                        <TabsContent value="sort">
                            <RadioGroup
                                value={selectedSort}
                                onValueChange={setSelectedSort}
                                className="space-y-4"
                            >
                                {sortOptions.map((option) => (
                                    <div
                                        key={option.value}
                                        className="flex items-center space-x-3"
                                    >
                                        <RadioGroupItem
                                            value={option.value}
                                            id={option.value}
                                            className="w-5 h-5 data-[state=checked]:bg-black data-[state=checked]:border-black data-[state=checked]:text-white"
                                        />
                                        <Label
                                            htmlFor={option.value}
                                            className="text-lg cursor-pointer"
                                        >
                                            <Text size="base" weight="normal">
                                                {option.label}
                                            </Text>
                                        </Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </TabsContent>

                        {/* Dynamic Tab Content */}
                        {aggregations.map((agg) => {
                            switch (agg.attribute_code) {
                                case "category_uid": // Category = styled checkboxes
                                    return (
                                        <TabsContent
                                            key={agg.attribute_code}
                                            value={agg.attribute_code}
                                        >
                                            <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(180px,1fr))]">
                                                {agg.options?.map(
                                                    (
                                                        opt: AggregationOption,
                                                    ) => {
                                                        const value =
                                                            selectedFilters[
                                                                agg
                                                                    .attribute_code
                                                            ];
                                                        const isChecked =
                                                            Array.isArray(
                                                                value,
                                                            ) &&
                                                            value.includes(
                                                                opt.value,
                                                            );

                                                        return (
                                                            <div
                                                                key={opt.value}
                                                                className="relative"
                                                            >
                                                                <Checkbox
                                                                    id={
                                                                        opt.value
                                                                    }
                                                                    checked={
                                                                        isChecked
                                                                    }
                                                                    onCheckedChange={(
                                                                        checked,
                                                                    ) => {
                                                                        handleCheckboxChange(
                                                                            agg.attribute_code,
                                                                            opt.value,
                                                                            Boolean(
                                                                                checked,
                                                                            ),
                                                                        );
                                                                    }}
                                                                    className="peer sr-only"
                                                                />
                                                                <Label
                                                                    htmlFor={
                                                                        opt.value
                                                                    }
                                                                    className="cursor-pointer py-2 px-4 lg:py-[10px] lg:px-5 rounded-full border text-base justify-center
                                  border-gray-300 text-black
                                  peer-data-[state=checked]:border-black
                                  peer-data-[state=checked]:bg-white"
                                                                >
                                                                    <Text
                                                                        size="base"
                                                                        weight="normal"
                                                                    >
                                                                        {
                                                                            opt.label
                                                                        }
                                                                    </Text>
                                                                </Label>
                                                            </div>
                                                        );
                                                    },
                                                )}
                                            </div>
                                        </TabsContent>
                                    );

                                case "gender": // Gender = radio group
                                    return (
                                        <TabsContent
                                            key={agg.attribute_code}
                                            value={agg.attribute_code}
                                        >
                                            <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
                                                {agg.options?.map(
                                                    (
                                                        opt: AggregationOption,
                                                    ) => {
                                                        const attr =
                                                            agg.attribute_code;
                                                        const value =
                                                            selectedFilters[
                                                                attr
                                                            ];
                                                        const isChecked =
                                                            Array.isArray(
                                                                value,
                                                            ) &&
                                                            value.includes(
                                                                opt.value,
                                                            );
                                                        const checkboxId = `gender-${opt.value}`;

                                                        return (
                                                            <div
                                                                key={opt.value}
                                                                className="relative flex items-center"
                                                            >
                                                                <Checkbox
                                                                    id={
                                                                        checkboxId
                                                                    }
                                                                    checked={
                                                                        isChecked
                                                                    }
                                                                    onCheckedChange={(
                                                                        checked,
                                                                    ) =>
                                                                        handleCheckboxChange(
                                                                            attr,
                                                                            opt.value,
                                                                            Boolean(
                                                                                checked,
                                                                            ),
                                                                        )
                                                                    }
                                                                    className="peer sr-only"
                                                                />
                                                                <Label
                                                                    htmlFor={
                                                                        checkboxId
                                                                    }
                                                                    className={`flex items-center w-full py-2 px-4 lg:py-[10px] lg:px-5
                                  rounded-full border text-base cursor-pointer justify-center
                                  ${
                                      isChecked
                                          ? "border-black bg-white font-bold"
                                          : "border-gray-300 text-black"
                                  }`}
                                                                >
                                                                    <Text
                                                                        size="base"
                                                                        weight={
                                                                            isChecked
                                                                                ? "bold"
                                                                                : "normal"
                                                                        }
                                                                    >
                                                                        {
                                                                            opt.label
                                                                        }
                                                                    </Text>
                                                                </Label>
                                                            </div>
                                                        );
                                                    },
                                                )}
                                            </div>
                                        </TabsContent>
                                    );

                                case "frame_shape": // Frame Shape = swatch image
                                    return (
                                        <TabsContent
                                            key={agg.attribute_code}
                                            value={agg.attribute_code}
                                        >
                                            <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
                                                {agg.options?.map(
                                                    (
                                                        opt: AggregationOption,
                                                    ) => {
                                                        const attr =
                                                            agg.attribute_code;
                                                        const isChecked =
                                                            Array.isArray(
                                                                selectedFilters[
                                                                    attr
                                                                ],
                                                            ) &&
                                                            selectedFilters[
                                                                attr
                                                            ].includes(
                                                                opt.value,
                                                            );
                                                        // const isChecked = selectedFilters[attr]?.includes(opt.value) ?? false;

                                                        const checkboxId = `shape-${opt.value}`;

                                                        return (
                                                            <div
                                                                key={opt.value}
                                                                className={`relative flex items-center gap-2 cursor-pointer border rounded-md p-2 ${
                                                                    isChecked
                                                                        ? "border-black bg-white"
                                                                        : "border-gray-300"
                                                                }`}
                                                            >
                                                                <Checkbox
                                                                    id={
                                                                        checkboxId
                                                                    }
                                                                    checked={
                                                                        isChecked
                                                                    }
                                                                    onCheckedChange={(
                                                                        checked,
                                                                    ) =>
                                                                        handleCheckboxChange(
                                                                            attr,
                                                                            opt.value,
                                                                            Boolean(
                                                                                checked,
                                                                            ),
                                                                        )
                                                                    }
                                                                    className="peer sr-only"
                                                                />
                                                                <Label
                                                                    htmlFor={
                                                                        checkboxId
                                                                    }
                                                                    className="flex items-center gap-2 w-full justify-center flex-col"
                                                                >
                                                                    {opt
                                                                        .swatch_data
                                                                        ?.value && (
                                                                        <Image
                                                                            src={
                                                                                opt
                                                                                    .swatch_data
                                                                                    .value
                                                                            }
                                                                            alt={
                                                                                opt.label
                                                                            }
                                                                            className=" object-contain"
                                                                            width={
                                                                                64
                                                                            }
                                                                            height={
                                                                                64
                                                                            }
                                                                        />
                                                                    )}
                                                                    <Text
                                                                        size="base"
                                                                        weight={
                                                                            isChecked
                                                                                ? "bold"
                                                                                : "normal"
                                                                        }
                                                                    >
                                                                        {
                                                                            opt.label
                                                                        }
                                                                    </Text>
                                                                </Label>
                                                            </div>
                                                        );
                                                    },
                                                )}
                                            </div>
                                        </TabsContent>
                                    );

                                case "frame_color_primary": // Frame Color = color circles
                                    return (
                                        <TabsContent
                                            key={agg.attribute_code}
                                            value={agg.attribute_code}
                                        >
                                            <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
                                                {agg.options?.map(
                                                    (
                                                        opt: AggregationOption,
                                                    ) => {
                                                        const attr =
                                                            agg.attribute_code;
                                                        const selectedValues =
                                                            selectedFilters[
                                                                attr
                                                            ] as
                                                                | string[]
                                                                | undefined;
                                                        const isChecked =
                                                            selectedValues?.includes(
                                                                opt.value,
                                                            ) ?? false;

                                                        const checkboxId = `frameColor-${opt.value}`; // unique ID

                                                        return (
                                                            <div
                                                                key={opt.value}
                                                                className={`relative flex items-center gap-2 cursor-pointer border rounded-md p-2 ${
                                                                    isChecked
                                                                        ? "border-black bg-white"
                                                                        : "border-gray-300"
                                                                }`}
                                                            >
                                                                <Checkbox
                                                                    id={
                                                                        checkboxId
                                                                    }
                                                                    checked={
                                                                        isChecked
                                                                    }
                                                                    onCheckedChange={(
                                                                        checked,
                                                                    ) =>
                                                                        handleCheckboxChange(
                                                                            attr,
                                                                            opt.value,
                                                                            Boolean(
                                                                                checked,
                                                                            ),
                                                                        )
                                                                    }
                                                                    className="peer sr-only"
                                                                />
                                                                <Label
                                                                    htmlFor={
                                                                        checkboxId
                                                                    }
                                                                    className="flex items-center gap-2 w-full justify-start px-5"
                                                                >
                                                                    {opt
                                                                        .swatch_data
                                                                        ?.value && (
                                                                        <span
                                                                            className="w-4 h-4 rounded-full"
                                                                            style={{
                                                                                backgroundColor:
                                                                                    opt
                                                                                        .swatch_data
                                                                                        .value,
                                                                            }}
                                                                        />
                                                                    )}
                                                                    <Text
                                                                        size="base"
                                                                        weight={
                                                                            isChecked
                                                                                ? "bold"
                                                                                : "normal"
                                                                        }
                                                                    >
                                                                        {
                                                                            opt.label
                                                                        }
                                                                    </Text>
                                                                </Label>
                                                            </div>
                                                        );
                                                    },
                                                )}
                                            </div>
                                        </TabsContent>
                                    );

                                case "price": // Price = custom component
                                    return (
                                        <TabsContent
                                            key={agg.attribute_code}
                                            value={agg.attribute_code}
                                        >
                                            <PlpPriceRangeFilter
                                                options={agg.options}
                                                onChange={
                                                    handlePriceRangeChange
                                                }
                                                value={(() => {
                                                    const price =
                                                        selectedFilters.price;
                                                    if (
                                                        !price ||
                                                        Array.isArray(price)
                                                    )
                                                        return undefined;
                                                    return [
                                                        Number(price.from),
                                                        Number(price.to),
                                                    ];
                                                })()}
                                            />
                                        </TabsContent>
                                    );

                                case "brand":
                                    return (
                                        <TabsContent
                                            key={agg.attribute_code}
                                            value={agg.attribute_code}
                                        >
                                            <BrandFilter
                                                options={agg.options || []}
                                                selectedFilters={
                                                    selectedFilters
                                                }
                                                handleCheckboxChange={
                                                    handleCheckboxChange
                                                }
                                                attributeCode={
                                                    agg.attribute_code
                                                }
                                            />
                                        </TabsContent>
                                    );
                                default: // Fallback = simple checkboxes
                                    return (
                                        <TabsContent
                                            key={agg.attribute_code}
                                            value={agg.attribute_code}
                                        >
                                            <div className="grid gap-2">
                                                {agg.options?.map(
                                                    (
                                                        opt: AggregationOption,
                                                    ) => (
                                                        <div
                                                            key={opt.value}
                                                            className="flex items-center gap-2"
                                                        >
                                                            <Checkbox
                                                                id={opt.value}
                                                            />
                                                            <Label
                                                                htmlFor={
                                                                    opt.value
                                                                }
                                                            >
                                                                {opt.label}
                                                            </Label>
                                                        </div>
                                                    ),
                                                )}
                                            </div>
                                        </TabsContent>
                                    );
                            }
                        })}
                    </div>
                </Tabs>
            </div>

            {/* ---------------- Footer ---------------- */}
            <SheetFooter className="flex-row justify-center">
                <SheetClose asChild className="flex-1">
                    <Button
                        type="button"
                        onClick={handleResetFilters}
                        className="primary-button-black rounded-full"
                    >
                        reset all filters
                    </Button>
                </SheetClose>
                <SheetClose asChild className="flex-1">
                    <Button
                        type="button"
                        onClick={handleSaveClick} // <<< ADDED: show the staged filters on save
                        className="secondary-button rounded-full"
                    >
                        Apply
                        {/* total selected filters */}
                        <span className="text-sm font-medium">
                            {/* {Object.values(selectedFilters).reduce(
                                (acc, val) => {
                                    if (!val) return acc;
                                    if (Array.isArray(val))
                                        return acc + val.length;
                                    if (
                                        typeof val === "object" &&
                                        val.from &&
                                        val.to
                                    )
                                        return acc + 1;
                                    return acc;
                                },
                                0,
                            )}{" "} */}
                            filters
                        </span>
                    </Button>
                </SheetClose>
            </SheetFooter>
        </SheetContent>
    );
}
