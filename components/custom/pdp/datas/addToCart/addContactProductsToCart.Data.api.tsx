// addContactLensToCart.api.ts

import apolloClient from "@/lib/services/magento/apolloClient";
import { gql } from "@apollo/client";

// -------------------------------------------------
// TYPES
// -------------------------------------------------

export interface AddContactLensToCartVariables {
    cartId: string;
    sku: string;
    selected_contact_lens: string; // stringified JSON
    quantity: number;
}

export interface AddContactLensToCartResponse {
    addLenseProductsToCart?: {
        cart?: {
            id: string;
            is_virtual: boolean;
            total_quantity: number;
            itemsV2?: {
                items?: {
                    product: {
                        name: string;
                    };
                    errors?: {
                        code: string;
                        message: string;
                    }[];
                }[];
            };
        };
        user_errors?: {
            code: string;
            message: string;
        }[];
    };
}

// -------------------------------------------------
// MUTATION
// -------------------------------------------------

export const ADD_CONTACT_LENS_TO_CART = gql`
    mutation AddLenseProductsToCart(
        $cartId: String!
        $sku: String!
        $selected_contact_lens: String!
        $quantity: Float!
    ) {
        addLenseProductsToCart(
            cartId: $cartId
            cartItems: [
                {
                    sku: $sku
                    quantity: $quantity
                    selected_contact_lens: $selected_contact_lens
                }
            ]
        ) {
            cart {
                id
                is_virtual
                total_quantity
                itemsV2 {
                    items {
                        product {
                            name
                        }
                        errors {
                            code
                            message
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

// -------------------------------------------------
// API CALL FUNCTION
// -------------------------------------------------

export async function addContactLensToCart(
    cartId: string,
    sku: string,
    selected_contact_lens: string,
    quantity: number = 1,
    token?: string,
): Promise<AddContactLensToCartResponse | null> {
    try {
        const { data } = await apolloClient.mutate<
            AddContactLensToCartResponse,
            AddContactLensToCartVariables
        >({
            mutation: ADD_CONTACT_LENS_TO_CART,
            variables: { cartId, sku, selected_contact_lens, quantity },
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
        console.error("Error adding contact lens product to cart:", error);
        return null;
    }
}
