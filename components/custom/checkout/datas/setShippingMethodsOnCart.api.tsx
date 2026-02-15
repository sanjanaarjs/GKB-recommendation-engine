import apolloClient from "@/lib/services/magento/apolloClient";
import { gql } from "@apollo/client";

// --------------------
// Types
// --------------------
export interface SelectedShippingMethod {
    carrier_code: string;
    method_code: string;
    carrier_title: string;
    method_title: string;
}

export interface ShippingAddressWithMethod {
    selected_shipping_method: SelectedShippingMethod | null;
}

export interface SetShippingMethodsOnCartResponse {
    setShippingMethodsOnCart: {
        cart: {
            shipping_addresses: ShippingAddressWithMethod[];
        };
    };
}

export interface ShippingMethodInput {
    carrier_code: string;
    method_code: string;
}

export interface SetShippingMethodsOnCartVariables {
    cart_id: string;
    shipping_methods: ShippingMethodInput[];
}

// --------------------
// Mutation
// --------------------
export const SET_SHIPPING_METHODS_ON_CART_MUTATION = gql`
    mutation SetShippingMethodsOnCart(
        $cart_id: String!
        $shipping_methods: [ShippingMethodInput]!
    ) {
        setShippingMethodsOnCart(
            input: { cart_id: $cart_id, shipping_methods: $shipping_methods }
        ) {
            cart {
                shipping_addresses {
                    selected_shipping_method {
                        carrier_code
                        method_code
                        carrier_title
                        method_title
                    }
                }
            }
        }
    }
`;

// --------------------
// API CALL FUNCTION
// --------------------
export const setShippingMethodsOnCart = async (
    cart_id: string,
    shipping_methods: ShippingMethodInput[],
): Promise<SetShippingMethodsOnCartResponse | null> => {
    try {
        const { data } = await apolloClient.mutate<
            SetShippingMethodsOnCartResponse,
            SetShippingMethodsOnCartVariables
        >({
            mutation: SET_SHIPPING_METHODS_ON_CART_MUTATION,
            variables: {
                cart_id,
                shipping_methods,
            },
            fetchPolicy: "no-cache",
        });

        return data ?? null;
    } catch (error) {
        console.error("Error setting shipping methods:", error);
        return null;
    }
};
