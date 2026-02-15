import apolloClient from "@/lib/services/magento/apolloClient";
import { gql } from "@apollo/client";

// --------------------
// Types
// --------------------
export interface AvailablePaymentMethod {
    code: string;
    title: string;
}

export interface GetAvailablePaymentMethodsResponse {
    cart: {
        available_payment_methods: AvailablePaymentMethod[];
    };
}

export interface GetAvailablePaymentMethodsVariables {
    cart_id: string;
}

// --------------------
// Query
// --------------------
export const GET_AVAILABLE_PAYMENT_METHODS_QUERY = gql`
    query GetAvailablePaymentMethods($cart_id: String!) {
        cart(cart_id: $cart_id) {
            available_payment_methods {
                code
                title
            }
        }
    }
`;

// --------------------
// API CALL FUNCTION
// --------------------
export const getAvailablePaymentMethods = async (
    cart_id: string,
    token?: string,
): Promise<GetAvailablePaymentMethodsResponse | null> => {
    try {
        const { data } = await apolloClient.query<
            GetAvailablePaymentMethodsResponse,
            GetAvailablePaymentMethodsVariables
        >({
            query: GET_AVAILABLE_PAYMENT_METHODS_QUERY,
            variables: { cart_id },
            context: token
                ? {
                      headers: {
                          Authorization: `Bearer ${token}`,
                      },
                  }
                : undefined,
            fetchPolicy: "no-cache",
        });

        return data ?? null;
    } catch (error) {
        console.error("Error fetching available payment methods:", error);
        return null;
    }
};
