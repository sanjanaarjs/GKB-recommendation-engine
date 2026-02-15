import apolloClient from "@/lib/services/magento/apolloClient";
import { gql } from "@apollo/client";

// --------------------
// Types
// --------------------
export interface UpdateCartItemQuantityResponse {
    updateCartItems: {
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
export const UPDATE_CART_ITEM_QUANTITY = gql`
    mutation UpdateCartItemQuantity(
        $cartId: String!
        $itemUid: ID!
        $quantity: Float!
    ) {
        updateCartItems(
            input: {
                cart_id: $cartId
                cart_items: [{ cart_item_uid: $itemUid, quantity: $quantity }]
            }
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
// API CALL FUNCTION
// --------------------
export const updateCartItemQuantity = async (
    cartId: string,
    itemUid: string,
    quantity: number,
    token?: string,
): Promise<UpdateCartItemQuantityResponse | null> => {
    try {
        const { data } =
            await apolloClient.mutate<UpdateCartItemQuantityResponse>({
                mutation: UPDATE_CART_ITEM_QUANTITY,
                variables: {
                    cartId,
                    itemUid,
                    quantity,
                },
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
        console.error("Error updating cart quantity:", error);
        return null;
    }
};
