import apolloClient from "@/lib/services/magento/apolloClient";
import { gql } from "@apollo/client";

// -------------------------------------------------------
// Types
// -------------------------------------------------------
export interface ShortDescription {
    html: string;
}

export interface GiftCardAmount {
    value: number;
    website_id: number;
}

export interface MediaImage {
    disabled: boolean;
    label: string | null;
    position: number | null;
    url: string;
}

export interface BaseGiftCardOption {
    required: boolean;
    sort_order: number;
    title: string;
    uid: string;
    __typename: string;
}

// Field option
export interface CustomizableFieldOption extends BaseGiftCardOption {
    __typename: "CustomizableFieldOption";
}

// Area / textarea option
export interface CustomizableAreaOption extends BaseGiftCardOption {
    __typename: "CustomizableAreaOption";
}

// Date option
export interface CustomizableDateOption extends BaseGiftCardOption {
    __typename: "CustomizableDateOption";
}

// Dropdown option (has values[])
export interface CustomizableDropDownOption extends BaseGiftCardOption {
    __typename: "CustomizableDropDownOption";
    option_id: number;
    value: CustomizableOptionValue[];
}

export interface PriceValue {
    currency: string;
    value: number;
}

export interface FixedProductTax {
    label: string;
    amount: PriceValue;
}

export interface MaximumPrice {
    discount: {
        amount_off: number | null;
        percent_off: number | null;
    };
    final_price: PriceValue;
    regular_price: PriceValue;
    fixed_product_taxes: FixedProductTax[];
}

export interface PriceRange {
    maximum_price: MaximumPrice;
}

export interface CustomizableOptionValue {
    option_type_id: number;
    title: string;
    price: number;
    price_type: string;
    sku: string | null;
}

// GiftCardOption now includes all option types
export type GiftCardOption =
    | CustomizableFieldOption
    | CustomizableAreaOption
    | CustomizableDateOption
    | CustomizableDropDownOption;

export type ProductOption = GiftCardOption;

export interface ProductItem {
    id: number;
    sku: string;
    attribute_set_id: number;
    name: string;
    short_description?: ShortDescription;
    thumbnail?: MediaImage;
    small_image?: MediaImage;

    // Gift card fields
    type_id?: string;
    price_range?: PriceRange;
    amounts?: GiftCardAmount[];
    options?: GiftCardOption[];
}

export interface ProductsResponse {
    products: {
        items: ProductItem[];
    };
}

export interface ProductsVariables {
    url_key: string;
}

// -------------------------------------------------------
// GraphQL QUERY
// -------------------------------------------------------
export const GET_GIFT_CARD_PRODUCT = gql`
    query GetGiftCardProduct($url_key: String!) {
        products(filter: { url_key: { eq: $url_key } }) {
            items {
                id
                sku
                attribute_set_id
                name
                short_description {
                    html
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
                ... on GiftCardProduct {
                    type_id
                    name
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
                                label
                                amount {
                                    currency
                                    value
                                }
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
                    options {
                        required
                        title
                        uid
                        sort_order
                        __typename
                    }
                }

                ... on CustomizableProductInterface {
                    options {
                        title
                        required
                        sort_order
                        option_id
                        __typename
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
// API CALL FUNCTION
// -------------------------------------------------------
export const getGiftCardProduct = async (
    url_key: string,
): Promise<ProductsResponse | null> => {
    try {
        const { data } = await apolloClient.query<
            ProductsResponse,
            ProductsVariables
        >({
            query: GET_GIFT_CARD_PRODUCT,
            variables: { url_key },
            fetchPolicy: "no-cache",
        });

        return data ?? null;
    } catch (error) {
        console.error("Error fetching gift card product:", error);
        return null;
    }
};
