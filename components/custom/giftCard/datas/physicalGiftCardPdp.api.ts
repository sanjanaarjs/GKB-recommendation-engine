import apolloClient from "@/lib/services/magento/apolloClient";
import { gql } from "@apollo/client";

// -------------------------------------------------------
// COMMON TYPES
// -------------------------------------------------------
export interface ShortDescription {
    html: string;
}

export interface PriceValue {
    value: number;
    currency: string;
}

export interface Discount {
    amount_off: number | null;
    percent_off: number | null;
}

export interface FixedProductTax {
    amount: PriceValue;
    label: string;
}

export interface MediaImage {
    disabled: boolean;
    label: string | null;
    position: number | null;
    url: string;
}

// -------------------------------------------------------
// PRICE TYPES
// -------------------------------------------------------
export interface PriceRange {
    minimum_price?: {
        regular_price: PriceValue;
        final_price: PriceValue;
        discount?: Discount;
    };
    maximum_price?: {
        regular_price: PriceValue;
        final_price: PriceValue;
        discount?: Discount;
        fixed_product_taxes?: FixedProductTax[];
    };
}

// -------------------------------------------------------
// GIFT CARD TYPES
// -------------------------------------------------------
export interface GiftCardAmount {
    value: number;
    website_id: number;
}

export interface GiftCardOption {
    required: boolean;
    sort_order: number;
    title: string;
    uid: string;
    value?: {
        sku: string;
    }[];
}

// -------------------------------------------------------
// CUSTOMIZABLE OPTIONS
// -------------------------------------------------------
export interface CustomizableOptionValue {
    option_type_id: number;
    title: string;
    price: number;
    price_type: string;
    sku: string | null;
}

export interface CustomizableOption {
    title: string;
    required: boolean;
    sort_order: number;
    option_id: number;
    uid: string;
    value?: CustomizableOptionValue[];
}

// -------------------------------------------------------
// SIMPLE PRODUCT FIELDS (ALIGNED WITH QUERY)
// -------------------------------------------------------
export interface ColorSwatch {
    id: number;
    name: string;
    sku: string;
    hashcode: string;
    is_current: "0" | "1";
    frame_color_primary?: string;
    swatch_image?: string;
    url_key?: string;
}

// -------------------------------------------------------
// MAIN PRODUCT ITEM
// -------------------------------------------------------
export interface PhysicalGiftCardProductItem {
    id: number;
    sku: string;
    attribute_set_id: number;
    name: string;
    url_key?: string;
    short_description?: ShortDescription;

    // SimpleProduct
    expected_delivery?: string;
    color_swatch?: ColorSwatch[];
    price_range?: PriceRange;
    thumbnail?: MediaImage;
    small_image?: MediaImage;

    // GiftCardProduct
    type_id?: string;
    giftcard_options?: GiftCardOption[];
    amounts?: GiftCardAmount[];

    // CustomizableProductInterface
    customizable_options?: CustomizableOption[];
}

// -------------------------------------------------------
// RESPONSE TYPES
// -------------------------------------------------------
export interface PhysicalGiftCardProductsResponse {
    products: {
        items: PhysicalGiftCardProductItem[];
    };
}

export interface PhysicalGiftCardVariables {
    url_key: string;
}

// -------------------------------------------------------
// GRAPHQL QUERY (UPDATED)
// -------------------------------------------------------
export const GET_PHYSICAL_GIFT_CARD_PDP = gql`
    query GetPhysicalGiftCardPdp($url_key: String!) {
        products(filter: { url_key: { eq: $url_key } }) {
            items {
                id
                sku
                attribute_set_id
                name

                ... on SimpleProduct {
                    expected_delivery
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
                }

                short_description {
                    html
                }

                ... on GiftCardProduct {
                    giftcard_options: options {
                        required
                        sort_order
                        title
                        uid
                        ... on CustomizableFieldOption {
                            value {
                                sku
                            }
                        }
                    }

                    type_id

                    price_range {
                        maximum_price {
                            discount {
                                amount_off
                                percent_off
                            }
                            final_price {
                                currency
                                value
                            }
                            fixed_product_taxes {
                                amount {
                                    currency
                                    value
                                }
                                label
                            }
                            regular_price {
                                currency
                                value
                            }
                        }
                    }

                    amounts {
                        value
                        website_id
                    }
                }

                ... on CustomizableProductInterface {
                    customizable_options: options {
                        title
                        required
                        sort_order
                        option_id
                        uid
                        ... on CustomizableDropDownOption {
                            value {
                                option_type_id
                                title
                                price
                                price_type
                                sku
                            }
                        }
                    }
                }
            }
        }
    }
`;

// -------------------------------------------------------
// API CALL
// -------------------------------------------------------
export const getPhysicalGiftCardPdp = async (
    url_key: string,
): Promise<PhysicalGiftCardProductsResponse | null> => {
    try {
        const { data } = await apolloClient.query<
            PhysicalGiftCardProductsResponse,
            PhysicalGiftCardVariables
        >({
            query: GET_PHYSICAL_GIFT_CARD_PDP,
            variables: { url_key },
            fetchPolicy: "no-cache",
        });

        return data ?? null;
    } catch (error) {
        console.error("Error fetching physical gift card PDP:", error);
        return null;
    }
};
