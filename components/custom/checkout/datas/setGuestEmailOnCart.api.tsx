import apolloClient from "@/lib/services/magento/apolloClient";
import { gql } from "@apollo/client";

// --------------------
// Types
// --------------------
export interface SetGuestEmailCart {
    email: string;
}

export interface SetGuestEmailOnCartResponse {
    setGuestEmailOnCart: {
        cart: SetGuestEmailCart;
    };
}

export interface SetGuestEmailOnCartVariables {
    cart_id: string;
    email: string;
}

// --------------------
// Mutation
// --------------------
export const SET_GUEST_EMAIL_ON_CART_MUTATION = gql`
    mutation SetGuestEmailOnCart($cart_id: String!, $email: String!) {
        setGuestEmailOnCart(input: { cart_id: $cart_id, email: $email }) {
            cart {
                email
            }
        }
    }
`;

// --------------------
// API CALL FUNCTION
// --------------------
export const setGuestEmailOnCart = async (
    cart_id: string,
    email: string,
): Promise<SetGuestEmailOnCartResponse | null> => {
    try {
        const { data } = await apolloClient.mutate<
            SetGuestEmailOnCartResponse,
            SetGuestEmailOnCartVariables
        >({
            mutation: SET_GUEST_EMAIL_ON_CART_MUTATION,
            variables: { cart_id, email },
            fetchPolicy: "no-cache",
        });

        return data ?? null;
    } catch (error) {
        console.error("Error setting guest email:", error);
        return null;
    }
};
