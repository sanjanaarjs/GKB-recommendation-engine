import { gql } from "@apollo/client";
import apolloClient from "@/lib/services/magento/apolloClient";

// ==========================
// TYPES
// ==========================

export interface GiftCardCustomOptionValue {
    customizable_option_value_uid: string;
    id: number;
    label: string;
    value: string;
}

export interface GiftCardCustomOption {
    customizable_option_uid: string;
    id: number;
    is_required: boolean;
    label: string;
    sort_order: number;
    type: string;
    values: GiftCardCustomOptionValue[];
}

export interface CartItem {
    id: string;
    uid: string;
    __typename: string;
    quantity: number;
    lense_custom_options?: {
        label: string;
        value: string;
    }[];
    prices: {
        price: {
            currency: string;
            value: number;
        };
        row_total: {
            currency: string;
            value: number;
        };
    };
    product: {
        name: string;
        expected_delivery?: string;
        image: {
            url: string;
        };
    };
    giftcard_options?: GiftCardCustomOption[] | null;
}

//shipping method type
export interface SelectedShippingMethod {
    carrier_code: string;
    method_code: string;
    carrier_title: string;
    method_title: string;
    amount: {
        value: number;
        currency: string;
    };
}

export interface CartPrices {
    subtotal_including_tax: {
        value: number;
        currency: string;
    };
    subtotal_excluding_tax: {
        value: number;
        currency: string;
    };
    grand_total: {
        value: number;
        currency: string;
    };
    discounts?: {
        amount: {
            value: number;
            currency: string;
        };
        coupon?: {
            code: string;
        };
        label: string;
        applied_to?: string[];
    }[];
    giftcard:
        | {
              code: string;
              amount: number;
              base_amount: number;
          }
        | undefined;
}

export interface GetCartDetailsResponse {
    cart: {
        id: string;
        total_quantity: number;
        is_virtual: boolean;
        items: CartItem[];
        shipping_addresses: {
            selected_shipping_method: SelectedShippingMethod | null;
        }[];
        prices: CartPrices;
    };
}

export const GET_CART_DETAILS = gql`
    query GetCartDetails($cartId: String!) {
        cart(cart_id: $cartId) {
            id
            total_quantity
            is_virtual
            shipping_addresses {
                selected_shipping_method {
                    carrier_code
                    method_code
                    carrier_title
                    method_title
                    amount {
                        value
                        currency
                    }
                }
            }
            items {
                id
                uid
                __typename
                prices {
                    price {
                        currency
                        value
                    }
                    row_total {
                        currency
                        value
                    }
                }
                product {
                    name
                    expected_delivery
                    image {
                        url
                    }
                }
                quantity
                lense_custom_options {
                    label
                    value
                }
                ... on GiftCardCartItem {
                    giftcard_options: customizable_options {
                        customizable_option_uid
                        id
                        is_required
                        label
                        sort_order
                        type
                        values {
                            customizable_option_value_uid
                            id
                            label
                            value
                        }
                    }
                }
            }
            prices {
                subtotal_including_tax {
                    value
                    currency
                }
                subtotal_excluding_tax {
                    value
                    currency
                }
                grand_total {
                    currency
                    value
                }
                discounts {
                    amount {
                        currency
                        value
                    }
                    coupon {
                        code
                    }
                    label
                    applied_to
                }
                giftcard {
                    code
                    amount
                    base_amount
                }
            }
        }
    }
`;

// --------------------
// API CALL FUNCTIONS
// --------------------

export const getCartDetails = async (
    cartId: string,
    token?: string,
): Promise<GetCartDetailsResponse | null> => {
    // Prevent API call when returning from Paytm payment
    if (typeof window !== "undefined") {
        const urlParams = new URLSearchParams(window.location.search);
        const isPaytmReturn = urlParams.has("paytm");
        const paymentProcessed =
            localStorage.getItem("PAYMENT_PROCESSED") === "true";

        if (isPaytmReturn || paymentProcessed) {
            return null;
        }
    }

    const { data } = await apolloClient.query<GetCartDetailsResponse>({
        query: GET_CART_DETAILS,
        variables: { cartId },
        context: token
            ? {
                  headers: {
                      Authorization: `Bearer ${token}`,
                  },
              }
            : {},
        fetchPolicy: "no-cache",
    });

    return data;
};
