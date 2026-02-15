import { gql } from "@apollo/client";
import apolloClient from "../apolloClient";
import { getCookieValue, hasCookie } from "@/lib/cookie";

export interface GetCustomerWishlistResult {
    customer: {
        wishlists: {
            id: string;
        }[];
    } | null;
}

export const getCustomerWishlistQuery = gql`
    query {
        customer {
            wishlists {
                id
            }
        }
    }
`;

export async function getCustomerWishlistId(): Promise<string | null> {
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

        // Execute query
        const response = await apolloClient.query<GetCustomerWishlistResult>({
            query: getCustomerWishlistQuery,
            context: {
                headers: {
                    Authorization: decodedToken ? `Bearer ${decodedToken}` : "",
                },
            },
            fetchPolicy: "no-cache",
        });

        // Return first wishlist ID if exists
        return response?.data?.customer?.wishlists?.[0]?.id ?? null;
    } catch (error) {
        console.error("Error fetching customer wishlist:", error);
        return null;
    }
}
