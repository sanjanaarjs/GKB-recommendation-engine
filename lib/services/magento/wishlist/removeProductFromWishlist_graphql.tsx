import { gql } from "@apollo/client";
import apolloClient from "../apolloClient";
import { getCookieValue, hasCookie } from "@/lib/cookie";

export interface RemoveProductsFromWishlistResult {
    removeProductsFromWishlist: {
        wishlist: {
            id: string;
            items_count: number;
            items_v2: {
                items: {
                    id: string;
                    quantity: number;
                    product: {
                        uid: string;
                        name: string;
                        sku: string;
                        price_range: {
                            minimum_price: {
                                regular_price: {
                                    currency: string;
                                    value: number;
                                };
                            };
                            maximum_price: {
                                regular_price: {
                                    currency: string;
                                    value: number;
                                };
                            };
                        };
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

export const removeProductsFromWishlistMutation = gql`
    mutation RemoveProductsFromWishlist(
        $wishlistId: ID!
        $wishlistItemsIds: [ID!]!
    ) {
        removeProductsFromWishlist(
            wishlistId: $wishlistId
            wishlistItemsIds: $wishlistItemsIds
        ) {
            wishlist {
                id
                items_count
                items_v2 {
                    items {
                        id
                        quantity
                        product {
                            uid
                            name
                            sku
                            price_range {
                                minimum_price {
                                    regular_price {
                                        currency
                                        value
                                    }
                                }
                                maximum_price {
                                    regular_price {
                                        currency
                                        value
                                    }
                                }
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

export async function removeProductsFromWishlist(
    wishlistId: string,
    wishlistItemsIds: string[],
): Promise<RemoveProductsFromWishlistResult | null> {
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

        const response =
            await apolloClient.mutate<RemoveProductsFromWishlistResult>({
                mutation: removeProductsFromWishlistMutation,
                variables: {
                    wishlistId,
                    wishlistItemsIds,
                },
                context: {
                    headers: {
                        Authorization: decodedToken
                            ? `Bearer ${decodedToken}`
                            : "",
                    },
                },
            });

        if (response.errors) {
            console.error("GraphQL errors:", response.errors);
            return null;
        }

        return response.data ?? null;
    } catch (error) {
        console.error("Error removing products from wishlist:", error);
        return null;
    }
}
