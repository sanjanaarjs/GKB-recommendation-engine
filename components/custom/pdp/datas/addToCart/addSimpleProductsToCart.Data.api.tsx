import apolloClient from "@/lib/services/magento/apolloClient";
import { gql } from "@apollo/client";

// --------------------
// Types
// --------------------

export interface AddSimpleProductsToCartVariables {
    cartId: string;
    sku: string | undefined;
}
export interface AddSimpleProductsToCartResponse {
    addSimpleProductsToCart?: {
        cart?: {
            itemsV2?: {
                items?: {
                    id: string;
                    quantity: number;
                    product: {
                        sku: string;
                        name: string;
                        stock_status: string;
                    };
                }[];
            };
        };
    };
}

// --------------------
// Queries & Mutations
// --------------------

export const ADD_SIMPLE_PRODUCTS_TO_CART = gql`
    mutation AddSimpleProductsToCart($cartId: String!, $sku: String!) {
        addSimpleProductsToCart(
            input: {
                cart_id: $cartId
                cart_items: [{ data: { quantity: 1, sku: $sku } }]
            }
        ) {
            cart {
                itemsV2 {
                    items {
                        id
                        quantity
                        product {
                            sku
                            name
                            stock_status
                        }
                    }
                }
            }
        }
    }
`;

// --------------------
// API CALL FUNCTIONS
// --------------------

export async function addSimpleProductsToCart(
    cartId: string,
    sku: string,
    token?: string,
): Promise<AddSimpleProductsToCartResponse | null> {
    try {
        const { data } = await apolloClient.mutate<
            AddSimpleProductsToCartResponse,
            AddSimpleProductsToCartVariables
        >({
            mutation: ADD_SIMPLE_PRODUCTS_TO_CART,
            variables: { cartId, sku },
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
        console.error("Error adding simple product to cart:", error);
        return null;
    }
}
