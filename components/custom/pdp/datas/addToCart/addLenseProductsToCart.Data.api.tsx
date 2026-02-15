import apolloClient from "@/lib/services/magento/apolloClient";
import { gql } from "@apollo/client";

// --------------------
// Types
// --------------------

export interface AddLenseProductsToCartVariables {
    cartId: string;
    sku: string;
    lense_options: string;
}

export interface AddLenseProductsToCartResponse {
    addLenseProductsToCart?: {
        cart?: {
            id: string;
            is_virtual: boolean;
            total_quantity: number;
            itemsV2?: {
                items?: {
                    prices: {
                        row_total: {
                            currency: string;
                            value: number;
                        };
                        price: {
                            currency: string;
                            value: number;
                        };
                    };
                }[];
            };
        };
        user_errors?: {
            code: string;
            message: string;
        }[];
    };
}

// --------------------
// Mutation
// --------------------

export const ADD_LENSE_PRODUCTS_TO_CART = gql`
    mutation AddLenseProductsToCart(
        $cartId: String!
        $sku: String!
        $lense_options: String!
    ) {
        addLenseProductsToCart(
            cartId: $cartId
            cartItems: [
                { sku: $sku, quantity: 1, lense_options: $lense_options }
            ]
        ) {
            cart {
                id
                is_virtual
                total_quantity
                itemsV2 {
                    items {
                        prices {
                            row_total {
                                currency
                                value
                            }
                            price {
                                currency
                                value
                            }
                        }
                    }
                }
            }
            user_errors {
                code
                message
            }
        }
    }
`;

// --------------------
// API CALL FUNCTION
// --------------------

export async function addLenseProductsToCart(
    cartId: string,
    sku: string,
    lense_options: string,
    token?: string,
): Promise<AddLenseProductsToCartResponse | null> {
    try {
        const { data } = await apolloClient.mutate<
            AddLenseProductsToCartResponse,
            AddLenseProductsToCartVariables
        >({
            mutation: ADD_LENSE_PRODUCTS_TO_CART,
            variables: { cartId, sku, lense_options },
            fetchPolicy: "no-cache",
            context: token
                ? {
                      headers: {
                          Authorization: `Bearer ${token}`,
                      },
                  }
                : {},
        });

        return data ?? null;
    } catch (error) {
        console.error("Error adding lense product to cart:", error);
        return null;
    }
}
