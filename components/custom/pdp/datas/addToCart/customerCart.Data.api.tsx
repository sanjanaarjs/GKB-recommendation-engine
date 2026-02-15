import apolloClient from "@/lib/services/magento/apolloClient";
import { gql } from "@apollo/client";

// --------------------
// Types
// --------------------
export interface GetGuestCartIdResponse {
    createGuestCart: {
        cart: {
            id: string;
        };
    };
}

export interface GetCustomerCartIdResponse {
    customerCart: {
        id: string;
    };
}

// --------------------
// Queries & Mutations
// --------------------
export const GET_GUESTCART_ID = gql`
    mutation {
        createGuestCart {
            cart {
                id
            }
        }
    }
`;

export const GET_CUSTOMERCART_ID = gql`
    query {
        customerCart {
            id
        }
    }
`;

// --------------------
// API CALL FUNCTIONS
// --------------------

// Fetch Customer Cart
export async function getCustomerCart(
    token?: string,
): Promise<GetCustomerCartIdResponse | null> {
    try {
        const { data } = await apolloClient.query<GetCustomerCartIdResponse>({
            query: GET_CUSTOMERCART_ID,
            fetchPolicy: "no-cache",
            context: token
                ? {
                      headers: {
                          Authorization: `Bearer ${token}`,
                      },
                  }
                : {},
        });
        return data;
    } catch (error) {
        console.error("Error fetching customer cart:", error);
        return null;
    }
}

// Create Guest Cart
export async function createGuestCart(): Promise<GetGuestCartIdResponse | null> {
    try {
        const { data } = await apolloClient.mutate<GetGuestCartIdResponse>({
            mutation: GET_GUESTCART_ID,
            fetchPolicy: "no-cache",
        });
        return data ?? null;
    } catch (error) {
        console.error("Error creating guest cart:", error);
        return null;
    }
}
