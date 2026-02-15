import apolloClient from "@/lib/services/magento/apolloClient";
import { gql } from "@apollo/client";

// --------------------
// Types
// --------------------
export interface SelectedPaymentMethod {
    code: string;
}

export interface SetPaymentMethodOnCartResponse {
    setPaymentMethodOnCart: {
        cart: {
            selected_payment_method: SelectedPaymentMethod | null;
        };
    };
}

export interface PaymentMethodInput {
    code: string;
}

export interface SetPaymentMethodOnCartVariables {
    cart_id: string;
    payment_method: PaymentMethodInput;
}

// --------------------
// Mutation
// --------------------
export const SET_PAYMENT_METHOD_ON_CART_MUTATION = gql`
    mutation SetPaymentMethodOnCart(
        $cart_id: String!
        $payment_method: PaymentMethodInput!
    ) {
        setPaymentMethodOnCart(
            input: { cart_id: $cart_id, payment_method: $payment_method }
        ) {
            cart {
                selected_payment_method {
                    code
                }
            }
        }
    }
`;

// --------------------
// API CALL FUNCTION
// --------------------
export const setPaymentMethodOnCart = async (
    cart_id: string,
    payment_method: PaymentMethodInput,
): Promise<SetPaymentMethodOnCartResponse | null> => {
    try {
        const { data } = await apolloClient.mutate<
            SetPaymentMethodOnCartResponse,
            SetPaymentMethodOnCartVariables
        >({
            mutation: SET_PAYMENT_METHOD_ON_CART_MUTATION,
            variables: {
                cart_id,
                payment_method,
            },
            fetchPolicy: "no-cache",
        });

        return data ?? null;
    } catch (error) {
        console.error("Error setting payment method:", error);
        return null;
    }
};
