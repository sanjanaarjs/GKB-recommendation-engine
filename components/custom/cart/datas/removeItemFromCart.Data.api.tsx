import apolloClient from "@/lib/services/magento/apolloClient";
import { gql } from "@apollo/client";

// --------------------
// Types
// --------------------
export interface RemoveItemFromCartResponse {
    removeItemFromCart: {
        cart: {
            items: {
                id: string;
                uid: string;
                quantity: number;
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
                    sku: string;
                    expected_delivery?: string | null;
                    image: {
                        url: string;
                    };
                };
                lense_custom_options?: {
                    label: string;
                    value: string;
                }[];
            }[];
            prices: {
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
                    label: string;
                }[];
            };
        };
    };
}

// --------------------
// Mutation
// --------------------

export const REMOVE_ITEM_FROM_CART = gql`
    mutation removeItemFromCart($cartId: String!, $itemUid: ID!) {
        removeItemFromCart(
            input: { cart_id: $cartId, cart_item_uid: $itemUid }
        ) {
            cart {
                items {
                    id
                    uid
                    quantity
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
                        sku
                        expected_delivery
                        image {
                            url
                        }
                    }
                    lense_custom_options {
                        label
                        value
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
                        value
                        currency
                    }
                    discounts {
                        amount {
                            value
                            currency
                        }
                        label
                    }
                }
            }
        }
    }
`;

// --------------------
// API Call Function
// --------------------

export const removeItemFromCart = async (
    cartId: string,
    itemUid: string,
    token?: string,
): Promise<RemoveItemFromCartResponse | null> => {
    try {
        const { data } = await apolloClient.mutate<RemoveItemFromCartResponse>({
            mutation: REMOVE_ITEM_FROM_CART,
            variables: { cartId, itemUid },
            context: token
                ? {
                      headers: {
                          Authorization: `Bearer ${token}`,
                      },
                  }
                : undefined,
        });

        return data ?? null;
    } catch (error) {
        console.error("Error removing item from cart:", error);
        return null;
    }
};
