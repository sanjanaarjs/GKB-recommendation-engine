import apolloClient from "@/lib/services/magento/apolloClient";
import { gql } from "@apollo/client";

/** ----------------- Types ----------------- */
// Product Types
export interface ProductImage {
    disabled: boolean;
    label: string | null;
    position: number;
    url: string;
}

export interface ColorSwatch {
    frame_color_primary: string | null;
    hashcode: string | null;
    id: number;
    is_current: boolean;
    name: string | null;
    sku: string;
    url_key: string | null;
}

export interface ProductItem {
    attribute_set_id: number;
    brand: string | null;
    canonical_url: string | null;
    color: string | null;
    country_of_manufacture: string | null;
    created_at: string;
    gift_message_available: boolean;
    id: number;
    is_in_stock: boolean;
    manufacturer: string | null;
    meta_description: string | null;
    meta_keyword: string | null;
    meta_title: string | null;
    name: string;
    new_from_date: string | null;
    new_to_date: string | null;
    only_x_left_in_stock: number | null;
    options_container: string | null;
    rating_summary: number | null;
    review_count: number | null;
    sku: string;
    special_from_date: string | null;
    special_price: number | null;
    special_to_date: string | null;
    stock_status: string;
    swatch_image: string | null;
    tier_price: number | null;
    type_id: string;
    uid: string;
    updated_at: string;
    url_key: string | null;
    url_path: string | null;
    url_suffix: string | null;
    image: ProductImage;
    small_image: ProductImage;
    thumbnail: ProductImage;
    product_skus: string;
    color_swatch: ColorSwatch[];
}

// CMS/Homepage Types
export interface CmsPageInfo {
    content: string;
    content_heading: string;
    identifier: string;
    meta_description: string;
    meta_keywords: string;
    meta_title: string;
    page_id: string;
    title: string;
}

export interface AdditionalInfoItem {
    record_id: string;
    title: string;
    url: string;
}

export interface ItemData {
    additional_info: string | null;
    attachment: string | null;
    attachmentmob: string | null;
    video_attachment: string | null;
    video_attachmentmob: string | null;
    buttontext: string | null;
    categories: string | null;
    created_at: string;
    description: string | null;
    descriptionmob: string | null;
    link: string | null;
    name: string;
    render_from: string | null;
    sort_order: number;
    product_skus: string;
    status: string;
    updated_at: string;
    url_key: string | null;
    x_axis: string | null;
    y_axis: string | null;
    buttonVariant1?: "primary" | "secondary" | "primary-black";
}

export interface HomePageDataV1 {
    section: string;
    cmsPageInfo: CmsPageInfo;
    itemsData: ItemData[];
}

/** ----------------- Query Response Types ----------------- */
export interface ProductsResponse {
    products: {
        total_count: number;
        items: ProductItem[];
    };
}

export interface ProductsVariables {
    sku: string;
}

export interface GetHomePageDataV1Response {
    getHomePageDataV1: {
        message: string;
        status: string;
        data: HomePageDataV1[];
    };
}

export interface GetHomePageDataV1Variables {
    cmsIdentifier: string;
    section: string;
}

export interface ProductQueryResponse {
    total_count: number;
    items: ProductItem[];
}

export interface BrandCategory {
    id: string;
    image: string | null;
    name: string;
    thumbnail: string | null;
}

export interface GetBrandCategoriesResponse {
    getBrandCategories: {
        message: string;
        status: number;
        data: BrandCategory[];
    };
}

/** ----------------- Queries ----------------- */
export const GET_HOME_PAGE_DATA_V1 = gql`
    query GetHomePageDataV1($cmsIdentifier: String!, $section: String!) {
        getHomePageDataV1(cmsIdentifier: $cmsIdentifier, section: $section) {
            message
            status
            data {
                section
                cmsPageInfo {
                    title
                    content_heading
                    content
                }
                itemsData {
                    additional_info
                    name
                    description
                    descriptionmob
                    product_skus
                    url_key
                    attachment
                    attachmentmob
                    video_attachment
                    video_attachmentmob
                    categories
                    buttontext
                    sort_order
                    link
                }
            }
        }
    }
`;

export const GET_PRODUCT_BY_SKU = gql`
    query Products($sku: String!) {
        products(filter: { sku: { eq: $sku } }) {
            items {
                brand
                canonical_url
                color
                country_of_manufacture
                created_at
                gift_message_available
                id
                is_in_stock
                manufacturer
                meta_description
                meta_keyword
                meta_title
                name
                new_from_date
                new_to_date
                only_x_left_in_stock
                options_container
                rating_summary
                review_count
                sku
                special_from_date
                special_price
                special_to_date
                stock_status
                swatch_image
                tier_price
                type_id
                uid
                updated_at
                url_key
                url_path
                url_suffix
                image {
                    disabled
                    label
                    position
                    url
                }
                color_swatch {
                    frame_color_primary
                    hashcode
                    id
                    is_current
                    name
                    sku
                    url_key
                }
                small_image {
                    disabled
                    label
                    position
                    url
                }
                thumbnail {
                    disabled
                    label
                    position
                    url
                }
            }
        }
    }
`;

export const GET_BRAND_CATEGORIES = gql`
    query GetBrandCategories {
        getBrandCategories(is_feature: 1) {
            message
            status
            data {
                id
                image
                name
                thumbnail
            }
        }
    }
`;

/** ----------------- Service Functions ----------------- */
export const getHomepageData = async (
    cmsIdentifier: string,
    section: string,
): Promise<HomePageDataV1["itemsData"]> => {
    try {
        const { data } = await apolloClient.query<
            GetHomePageDataV1Response,
            GetHomePageDataV1Variables
        >({
            query: GET_HOME_PAGE_DATA_V1,
            variables: { cmsIdentifier, section },
            fetchPolicy: "no-cache",
        });

        const block = data?.getHomePageDataV1;

        if (!block?.status || !block?.data?.length) {
            console.warn("[getHomepageData] No homepage data returned.");
            return [];
        }

        return block.data?.[0]?.itemsData;
    } catch (error) {
        console.error("[getHomepageData] Error fetching data:", error);
        return [];
    }
};

export const getProductBySku = async (
    sku: string,
): Promise<ProductQueryResponse | null> => {
    try {
        const { data } = await apolloClient.query<
            ProductsResponse,
            ProductsVariables
        >({
            query: GET_PRODUCT_BY_SKU,
            variables: { sku },
            fetchPolicy: "no-cache",
        });

        if (!data?.products?.items?.length) {
            console.warn(`[getProductBySku] No product found for SKU: ${sku}`);
            return null;
        }

        return data.products;
    } catch (error) {
        console.error("[getProductBySku] Error fetching product:", error);
        return null;
    }
};

export async function getBrands(): Promise<BrandCategory[] | []> {
    try {
        const { data } = await apolloClient.query<GetBrandCategoriesResponse>({
            query: GET_BRAND_CATEGORIES,
            fetchPolicy: "no-cache", // important for SSR
        });

        return data?.getBrandCategories?.data ?? [];
    } catch (error) {
        console.error("SSR getBrands() error:", error);
        return [];
    }
}
