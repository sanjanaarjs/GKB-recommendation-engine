import apolloClient from "@/lib/services/magento/apolloClient";
import { gql } from "@apollo/client";

// =========================
// Interfaces
// =========================

export interface ProductPrice {
    value: number;
    currency: string;
}

export interface Discount {
    amount_off: number;
    percent_off: number;
}

export interface ProductThumbnail {
    disabled: boolean;
    label: string | null;
    position: number | null;
    url: string;
}

export interface ProductItem {
    brand?: string;
    url_key?: string;
    name: string;
    sku: string;
    tags?: string;
    thumbnail?: ProductThumbnail;
    image?: ProductThumbnail;
    price_range: {
        minimum_price: {
            regular_price: ProductPrice;
            final_price?: ProductPrice;
            discount?: Discount;
        };
    };
    color_swatch?: {
        frame_color_primary: string;
        hashcode: string;
        id: number;
        is_current: string;
        name: string;
        url_key: string;
        sku: string;
    }[];
}

export interface AggregationOption {
    label: string;
    value: string;
    count?: number;
    swatch_data?: { value: string } | null;
    brand?: string;
    brand_name?: string;
    name?: string;
    thumbnail?: string;
}

export interface Aggregation {
    attribute_code: string;
    count: number;
    label: string;
    options: AggregationOption[];
}

export interface QuickFilter {
    attribute_code: string;
    label: string;
    value: string;
    count?: number;
}

export interface PageInfo {
    page_size: number;
}

export interface BannerItemData {
    product_skus: string | null;
    additional_info: string | null;
    attachment: string | null;
    video_attachment: string | null;
    attachmentmob: string | null;
    video_attachmentmob: string | null;
    categories: string | null;
    name: string;
    buttontext: string | null;
    description: string | null;
    descriptionmob: string | null;
    link: string | null;
    sort_order: number | null;
    status: string | null;
    x_axis: string | null;
    y_axis: string | null;
}

export interface BannerData {
    itemsData: BannerItemData[];
}

export interface PlpBanner {
    status: string;
    message: string | null;
    data: BannerData[];
}

export interface PopularBrandFilter {
    brand_id: number;
    name: string;
    value: string;
    thumbnail: string;
    count: number;
}

export interface CollectionImage {
    file: string;
    link: string;
    sortOrder: number;
    ctaLabel?: string;
    ctaLink?: string;
}

export interface CollectionPage {
    collectionId: string;
    categoryId: string;
    description: string;
    isVideo: boolean;
    position: string;
    title: string;
    media: string;
    ctaLabel: string;
    ctaLink: string;
    images: CollectionImage[];
}

export interface ProductsResponse {
    page_type?: string;
    popular_brand_filters: PopularBrandFilter[];
    quick_filters: QuickFilter[];
    aggregations: Aggregation[];
    total_count: number;
    items: ProductItem[];
    page_info: PageInfo;
    plp_banners: PlpBanner;
    collectionPage?: CollectionPage[];
}

export interface GetCategoryProductsResponse {
    products: ProductsResponse;
}

export type ProductFilterInput = {
    category_id?: { in: string[] };
    gender?: { in: string[] };
    frame_shape?: { in: string[] };
    price?: { from?: string; to?: string } | { in?: string[] };
    [key: string]: unknown;
};

export type ProductSortDirection = "ASC" | "DESC";
export type ProductSortInput = Record<string, ProductSortDirection>;

// =========================
// GraphQL Query
// =========================

export const GET_CATEGORY_PLP = gql`
    query GetCategoryProducts(
        $filter: ProductAttributeFilterInput
        $pageSize: Int = 25
        $sort: ProductAttributeSortInput
        $currentPage: Int = 1
        $collectionCategoryId: String
        $search: String
    ) {
        products(
            filter: $filter
            pageSize: $pageSize
            currentPage: $currentPage
            sort: $sort
            search: $search
        ) {
            page_type
            popular_brand_filters {
                brand_id
                name
                value
                thumbnail
                count
            }
            quick_filters {
                attribute_code
                label
                value
                count
            }
            aggregations {
                attribute_code
                count
                label
                options {
                    label
                    value
                    count
                    swatch_data {
                        value
                    }
                }
            }
            total_count
            items {
                brand
                url_key
                name
                sku
                tags
                thumbnail {
                    disabled
                    label
                    position
                    url
                }
                image {
                    disabled
                    label
                    position
                    url
                }
                price_range {
                    minimum_price {
                        regular_price {
                            value
                            currency
                        }
                        final_price {
                            value
                            currency
                        }
                        discount {
                            amount_off
                            percent_off
                        }
                    }
                }
                color_swatch {
                    frame_color_primary
                    hashcode
                    id
                    is_current
                    name
                    url_key
                    sku
                }
            }
            page_info {
                page_size
            }
            plp_banners {
                status
                message
                data {
                    itemsData {
                        product_skus
                        additional_info
                        attachment
                        video_attachment
                        attachmentmob
                        video_attachmentmob
                        categories
                        name
                        buttontext
                        description
                        descriptionmob
                        link
                        sort_order
                        status
                        x_axis
                        y_axis
                    }
                }
            }
            collectionPage(categoryId: $collectionCategoryId) {
                collectionId
                categoryId
                description
                isVideo
                position
                title
                media
                ctaLabel
                ctaLink
                images {
                    file
                    link
                    sortOrder
                    ctaLabel
                    ctaLink
                }
            }
        }
    }
`;

// =========================
// Function
// =========================

export async function getCategoryProducts({
    filter,
    pageSize = 25,
    currentPage = 1,
    sort,
    collectionCategoryId,
}: {
    filter: ProductFilterInput;
    pageSize?: number;
    currentPage?: number;
    sort?: ProductSortInput;
    collectionCategoryId?: string; // optional
}): Promise<GetCategoryProductsResponse | null> {
    try {
        const { data } = await apolloClient.query<GetCategoryProductsResponse>({
            query: GET_CATEGORY_PLP,
            variables: {
                filter,
                pageSize,
                currentPage,
                sort,
                collectionCategoryId,
            },
            fetchPolicy: "no-cache",
        });
        return data;
    } catch (error) {
        console.error("Error fetching category products:", error);
        return null;
    }
}

export async function getSearchProducts({
    search,
    pageSize = 24,
    currentPage = 1,
    sort,
}: {
    search: string;
    pageSize?: number;
    currentPage?: number;
    sort?: ProductSortInput;
}): Promise<GetCategoryProductsResponse | null> {
    try {
        const { data } = await apolloClient.query<GetCategoryProductsResponse>({
            query: GET_CATEGORY_PLP,
            variables: {
                search,
                pageSize,
                currentPage,
                sort,
            },
            fetchPolicy: "no-cache",
        });
        return data;
    } catch (error) {
        console.error("Error fetching search products:", error);
        return null;
    }
}
