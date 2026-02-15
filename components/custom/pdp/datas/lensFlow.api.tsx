import apolloClient from "@/lib/services/magento/apolloClient";
import { gql } from "@apollo/client";

export interface GetLensResponse {
    products: {
        items: LensProductItem[];
    };
}

export interface GetLensVariables {
    urlKey: string;
}

export interface LensProductItem {
    id: number;
    sku: string;
    attribute_set_id: number;
    name: string;
    lense_addition?: {
        success: boolean;
        message: string;
        LensInfo?: { steps: LensStep[] }[];
        productImage?: string;
    };
    color?: string;
    stock_status?: string;
    brand?: string;
    country_of_manufacture?: string;
    expected_delivery?: string;
    brandInfo?: {
        name: string;
        image: string;
        url_key: string;
    };
    color_swatch?: ColorSwatch[];
    product_content?: ProductContent;
    attributeTobeShow?: AttributeToBeShow[];
    product_usp?: string[];
    image?: MediaItem[];
    small_image?: MediaItem[];
    thumbnail?: MediaItem[];
    media_gallery?: MediaItem[];
    type_of_product?: string;
    lensLabelQty?: {
        lensMinMaxQty: string;
        rightEyeLabel: string;
        leftEyeLabel: string;
    };
}

export interface LensStep {
    name: string;
    alias: string;
    title: string;
    description?: string;
    image?: string;
    steps_options: StepOption[];
}

export interface StepOption {
    id: string | number;
    price?: number;
    title: string;
    image?: string;
    color_type?: string;
    color_type_label?: string;
    description?: string;
    is_color?: number;
    sort_order?: number;
    small_image?: string;
    next_step?: string;
    is_logged_required?: number;
    login_title?: string;
    colors_finish_type?: ColorsFinishType[];
    alias?: string;
}

export interface ColorsFinishType {
    colors: LensColor[];
    finish_type_id: string;
    finish_type_label: string;
}

export interface LensColor {
    id: string | number;
    color_code: string;
    color_name: string;
    color_type: string;
    sort_order?: number;
    image?: string;
    recommended?: {
        media?: string;
    };
    price?: string;
}

export interface ColorSwatch {
    frame_color_primary?: string;
    hashcode?: string;
    id: number;
    is_current?: boolean;
    name: string;
    url_key: string;
    sku: string;
}

export interface ProductContent {
    ProductContentRow: ProductContentRow[];
    category_id?: string;
    media?: string;
    media_mob?: string;
    sku?: string;
    tag?: string;
}

export interface ProductContentRow {
    description?: string;
    media?: string;
    media_alignment?: string;
    sort_order?: number;
    media_mob?: string;
    status?: string;
    title?: string;
}

export interface AttributeToBeShow {
    attribute_code: string;
    attribute_label: string;
    attribute_value: string;
    attribute_value_id: string;
}

export interface MediaItem {
    disabled?: boolean;
    label?: string;
    position?: number;
    url: string;
}

export const GET_LENS = gql`
    query GetLensProduct($urlKey: String!) {
        products(filter: { url_key: { eq: $urlKey } }) {
            items {
                lensLabelQty {
                    lensMinMaxQty
                    rightEyeLabel
                    leftEyeLabel
                }
                lense_addition {
                    success
                    message
                    productImage
                    LensInfo {
                        steps {
                            name
                            alias
                            title
                            description
                            image
                            steps_options {
                                id
                                price
                                title
                                image
                                color_type
                                color_type_label
                                description
                                is_color
                                sort_order
                                small_image
                                next_step
                                lightOption
                                price
                                is_logged_required
                                login_title
                                # colors {
                                #     id
                                #     color_name
                                #     color_code
                                #     color_type
                                #     sort_order
                                #     image
                                # }
                                colors_finish_type {
                                    colors {
                                        color_code
                                        price
                                        color_name
                                        color_type
                                        id
                                        image
                                        sort_order
                                        recommended {
                                            media
                                        }
                                    }
                                    finish_type_id
                                    finish_type_label
                                }
                            }
                        }
                    }
                }
                type_of_product
                id
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
                        # image
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
                        }
                        category_id
                        media
                        media_mob
                        sku
                        tag
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
                    small_image {
                        disabled
                        label
                        position
                        url
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

export async function getLens(urlKey: string): Promise<GetLensResponse | null> {
    try {
        const { data } = await apolloClient.query<
            GetLensResponse,
            GetLensVariables
        >({
            query: GET_LENS,
            variables: { urlKey },
            fetchPolicy: "no-cache",
        });

        return data;
    } catch (error) {
        console.error("Error fetching product details:", error);
        return null;
    }
}
