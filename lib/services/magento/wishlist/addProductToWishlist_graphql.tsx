import { gql } from "@apollo/client";
import apolloClient from "../apolloClient";
import { getCookieValue, hasCookie } from "@/lib/cookie";

export interface AddProductsToWishlistResult {
    addProductsToWishlist: {
        wishlist: {
            items_v2: {
                items: {
                    id: string;
                    quantity: number;
                    product: {
                        uid: string;
                        name: string;
                        sku: string;
                    };
                }[];
            };
        };
        user_errors: {
            code: string;
            message: string;
        }[];
    };
}

export const addProductsToWishlistMutation = gql`
    mutation AddProductsToWishlist(
        $wishlistId: ID!
        $wishlistItems: [WishlistItemInput!]!
    ) {
        addProductsToWishlist(
            wishlistId: $wishlistId
            wishlistItems: $wishlistItems
        ) {
            wishlist {
                items_v2 {
                    items {
                        id
                        quantity
                        product {
                            uid
                            name
                            sku
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

export async function addProductsToWishlist(
    wishlistId: number,
    sku: string,
    quantity = 1,
): Promise<AddProductsToWishlistResult | null> {
    try {
        // Get user token
        const hasAuthToken = await hasCookie("userToken");
        let storeAuthToken: string | undefined;
        if (hasAuthToken) {
            storeAuthToken = await getCookieValue("userToken");
        }

        let decodedToken: string | undefined;
        if (storeAuthToken && typeof storeAuthToken === "string") {
            decodedToken = atob(storeAuthToken);
        }

        const response = await apolloClient.mutate<AddProductsToWishlistResult>(
            {
                mutation: addProductsToWishlistMutation,
                variables: {
                    wishlistId,
                    wishlistItems: [
                        {
                            sku,
                            quantity,
                        },
                    ],
                },
                context: {
                    headers: {
                        Authorization: decodedToken
                            ? `Bearer ${decodedToken}`
                            : "",
                    },
                },
            },
        );

        if (response.errors) {
            console.error("GraphQL errors:", response.errors);
            return null;
        }

        return response.data ?? null;
    } catch (error) {
        console.error("Error adding product to wishlist:", error);
        return null;
    }
}
