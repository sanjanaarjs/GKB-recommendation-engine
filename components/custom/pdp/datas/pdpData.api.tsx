import apolloClient from "@/lib/services/magento/apolloClient";
import { CurrencyResponse } from "@/lib/services/magento/query_getCurrency_graphql";
import { gql } from "@apollo/client";
import { GetLensResponse } from "./lensFlow.api";

// ===============================
// Root Query Type
// ===============================
export interface ProductsQueryResponse {
    products: {
        items: ProductItem[];
    };
}
export interface ColorSwatch {
    id: number;
    frame_color_primary: string;
    hashcode: string;
    is_current: string;
    name: string;
    url_key: string;
    sku: string;
    swatch_image: string;
}

// ===============================
// Product Item
// ===============================
export interface ProductItem {
    id: number;
    uid: string;
    sku: string;
    attribute_set_id: number;
    name: string;
    color?: string;
    stock_status?: string;
    brand?: string;
    country_of_manufacture?: string;
    expected_delivery?: string;
    brandInfo?: BrandInfo;
    product_content?: ProductDetails[];
    attributeTobeShow?: AttributeToBeShow[];
    product_usp?: string;
    image?: ProductImage;
    small_image?: ProductImage;
    thumbnail?: ProductImage;
    media_gallery?: ProductImage[];
    price_range?: PriceRange;
    url_key: string;
    related_products: RelatedProduct[];
    color_swatch: ColorSwatch;
    type_of_product?: string;
    lensLabelQty?: {
        lensMinMaxQty: string;
        rightEyeLabel: string;
        leftEyeLabel: string;
    };
    contact_lens?: string;
}

export interface ProductPriceAmount {
    value: number;
    currency: string;
}

export interface ProductDiscount {
    amount_off: number;
    percent_off: number;
}

export interface ProductPriceRange {
    minimum_price: {
        regular_price: ProductPriceAmount;
        final_price: ProductPriceAmount;
        discount: ProductDiscount;
    };
    maximum_price: {
        regular_price: ProductPriceAmount;
    };
}

export interface ProductImage {
    url: string;
    label?: string;
}

export interface ProductVariant {
    product: {
        sku: string;
        name: string;
        color?: string;
        small_image?: ProductImage;
        media_gallery?: ProductImage[];
        price: {
            regularPrice: {
                amount: ProductPriceAmount;
            };
        };
        price_range: ProductPriceRange;
        stock_status: string;
    };
}

export interface ConfigurableOptionValue {
    label: string;
    value_index: number;
}

export interface ConfigurableOption {
    attribute_code: string;
    label: string;
    values: ConfigurableOptionValue[];
}

export interface RelatedProduct {
    id: number;
    name: string;
    sku: string;
    url_key: string;
    brand: string;
    price: {
        regularPrice: {
            amount: ProductPriceAmount;
        };
    };
    price_range: ProductPriceRange;
    small_image: ProductImage;
    thumbnail: ProductImage;
    configurable_options: ConfigurableOption[];
    variants: ProductVariant[];
}

// ===============================
// Price Range
// ===============================
export interface PriceRange {
    minimum_price: {
        regular_price: {
            value: number;
            currency: string;
        };
        final_price: {
            value: number;
            currency: string;
        };
        discount: {
            amount_off: number;
            percent_off: number;
        };
    };
}

// ===============================
// Brand Info
// ===============================
export interface BrandInfo {
    name: string;
    image: string;
    url_key: string;
}

// ===============================
// Product Content
// ===============================
export interface ProductContentRow {
    description: string;
    media: string;
    media_alignment: "left" | "right" | "center"; // based on your JSON, left is used
    sort_order: string; // JSON has it as string, you can change to number if you prefer
    media_mob: string;
    status: "0" | "1"; // status seems to be stringified boolean
    title: string;
    btn_text?: string | null;
    btn_url?: string | null;
}

export interface ProductDetails {
    ProductContentRow: ProductContentRow[];
    category_id: number;
    media: string | null;
    media_mob: string | null;
    sku: string;
    tag: string;
    tag_label?: string;
}

// Single content item inside product_content
export interface ProductContentItem {
    additional_info?: string;
    attachment?: string;
    video_attachment?: string;
    attachmentmob?: string;
    video_attachmentmob?: string;
    categories?: string[];
    name: string;
    buttontext?: string;
    description?: string;
    descriptionmob?: string;
    link?: string;
    sort_order?: number;
    status?: string;
    x_axis?: string;
    y_axis?: string;
}

// ===============================
// Attribute to be shown
// ===============================
export interface AttributeToBeShow {
    attribute_code: string;
    attribute_label: string;
    attribute_value: string;
    attribute_value_id: string | number;
}

// ===============================
// Product Images
// ===============================
export interface ProductImage {
    disabled: boolean;
    label?: string;
    position?: number;
    url: string;
}

export interface ProductQueryVariables {
    sku: string[];
}

export interface PdpPageProps {
    productData: ProductsQueryResponse | null;
    currency: CurrencyResponse["currency"] | null;
    lensData: GetLensResponse | null | undefined;
    lensContent?: GetLensResponse | null;
    isPowerLensFlow?: boolean;
    handleAddToCart?: (payload?: { lense_options?: string }) => void;
}

export interface SliderProps {
    productData: ProductsQueryResponse | null;
    currency: CurrencyResponse["currency"] | null;
    lensData: GetLensResponse | null | undefined;
    isPowerLensFlow: boolean;
    handleAddToCart: (payload?: {
        lense_options?: string;
        selected_contact_lens?: string;
    }) => void;
    loading: boolean;

    leftEyeQuantity: number;
    setLeftEyeQuantity: React.Dispatch<React.SetStateAction<number>>;
    rightEyeQuantity: number;
    setRightEyeQuantity: React.Dispatch<React.SetStateAction<number>>;
}

export const GET_PRODUCTS = gql`
    query Products($urlKey: String!) {
        products(filter: { url_key: { eq: $urlKey } }) {
            items {
                lensLabelQty {
                    lensMinMaxQty
                    rightEyeLabel
                    leftEyeLabel
                }
                type_of_product
                id
                uid
                sku
                attribute_set_id
                name
                ... on SimpleProduct {
                    color
                    stock_status
                    brand
                    country_of_manufacture
                    expected_delivery
                    brandInfo {
                        name
                        image
                        url_key
                    }
                    color_swatch {
                        frame_color_primary
                        hashcode
                        id
                        is_current
                        name
                        url_key
                        sku
                        swatch_image
                    }
                    related_products {
                        id
                        sku
                        name
                        brand
                        url_key
                        price {
                            regularPrice {
                                amount {
                                    value
                                    currency
                                }
                            }
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
                            maximum_price {
                                regular_price {
                                    value
                                    currency
                                }
                            }
                        }
                        small_image {
                            url
                            label
                            position
                            disabled
                        }
                        thumbnail {
                            url
                            label
                            position
                            disabled
                        }
                        image {
                            url
                            label
                            position
                            disabled
                        }
                        ... on ConfigurableProduct {
                            color_swatch {
                                id
                                name
                                sku
                                hashcode
                                is_current
                            }
                            configurable_options {
                                attribute_code
                                label
                                values {
                                    label
                                    value_index
                                }
                            }
                            variants {
                                product {
                                    sku
                                    name
                                    color
                                    stock_status
                                    small_image {
                                        url
                                    }
                                    media_gallery {
                                        url
                                        position
                                        disabled
                                        label
                                    }
                                    price {
                                        regularPrice {
                                            amount {
                                                value
                                                currency
                                            }
                                        }
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
                                        maximum_price {
                                            regular_price {
                                                value
                                                currency
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    product_content {
                        ProductContentRow {
                            description
                            media
                            media_alignment
                            sort_order
                            media_mob
                            status
                            title
                            btn_text
                            btn_url
                        }
                        category_id
                        media
                        media_mob
                        sku
                        tag
                        tag_label
                    }
                    attributeTobeShow(fields: ["brand"]) {
                        attribute_code
                        attribute_label
                        attribute_value
                        attribute_value_id
                    }
                    product_usp
                    image {
                        disabled
                        label
                        position
                        url
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
                    media_gallery {
                        disabled
                        label
                        position
                        url
                    }
                }
            }
        }
    }
`;

export async function getProducts(
    urlKey: string,
): Promise<ProductsQueryResponse | null> {
    try {
        const { data } = await apolloClient.query<
            ProductsQueryResponse,
            { urlKey: string }
        >({
            query: GET_PRODUCTS,
            variables: { urlKey },
            fetchPolicy: "no-cache",
        });

        return data;
    } catch (error) {
        console.error("Error fetching product details:", error);
        return null;
    }
}

export const GET_PRODUCTS_BY_SKU = gql`
    query ProductsBySkus($skus: [String!]) {
        products(filter: { sku: { in: $skus } }) {
            items {
                id
                sku
                name
                brand
                url_key
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
                            percent_off
                        }
                    }
                }
                small_image {
                    url
                    label
                }
                thumbnail {
                    url
                    label
                }
            }
        }
    }
`;

export const getProductBySku = async (skus: string[]) => {
    if (!skus || skus.length === 0) {
        return null; // nothing to fetch
    }

    try {
        const { data } = await apolloClient.query({
            query: GET_PRODUCTS_BY_SKU,
            variables: { skus },
            fetchPolicy: "network-only", // always fetch latest
        });

        return data?.products?.items || [];
    } catch (error) {
        console.error("Error fetching products by SKU:", error);
        return [];
    }
};
