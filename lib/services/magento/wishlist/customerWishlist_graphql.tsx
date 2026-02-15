import { gql } from "@apollo/client";
import apolloClient from "../apolloClient";
import { getCookieValue, hasCookie } from "@/lib/cookie";

export interface WishlistQueryResult {
    wishlist: {
        items_count: number;
        name: string;
        items: {
            id: string;
            product: {
                name?: string;
                sku: string;
                image?: {
                    url: string;
                    label?: string | null;
                }[];
                categories?: {
                    name: string;
                }[];
                price?: {
                    regularPrice?: {
                        amount?: {
                            currency: string;
                            value: number;
                        };
                    };
                };
            };
        }[];
    } | null;
}

export const wishlistQuery = gql`
    query Wishlist {
        wishlist {
            items_count
            name
            items {
                id
                product {
                    name
                    sku
                    image {
                        url
                        label
                    }
                    categories {
                        name
                    }
                    price {
                        regularPrice {
                            amount {
                                currency
                                value
                            }
                        }
                    }
                }
            }
        }
    }
`;

export async function getWishlist(): Promise<WishlistQueryResult | null> {
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

        const response = await apolloClient.query<WishlistQueryResult>({
            query: wishlistQuery,
            context: {
                headers: {
                    Authorization: decodedToken ? `Bearer ${decodedToken}` : "",
                },
            },
            fetchPolicy: "no-cache",
        });

        if (!response?.data) {
            console.error("GraphQL response is empty or invalid:", response);
            return null;
        }

        return response.data;
    } catch (error) {
        console.error("Error fetching wishlist:", error);
        return null;
    }
}
