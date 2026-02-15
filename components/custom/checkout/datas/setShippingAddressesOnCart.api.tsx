import apolloClient from "@/lib/services/magento/apolloClient";
import { gql } from "@apollo/client";

// --------------------
// Types
// --------------------
export interface Region {
    code: string | null;
    label?: string | null;
}

export interface Country {
    code: string;
    label: string;
}

export interface AvailableShippingMethod {
    carrier_code: string;
    carrier_title: string;
    method_code: string;
    method_title: string;
}

export interface ShippingAddress {
    firstname: string | null;
    lastname: string | null;
    company: string | null;
    street: string[];
    city: string;
    region: Region | null;
    postcode: string;
    telephone: string;
    country: Country;
    available_shipping_methods: AvailableShippingMethod[];
}

export interface SetShippingAddressesOnCartResponse {
    setShippingAddressesOnCart: {
        cart: {
            shipping_addresses: ShippingAddress[];
        };
    };
}

// Input type used in your API
export interface ShippingAddressInput {
    address?: {
        firstname: string;
        lastname: string;
        company?: string;
        street: string[];
        city: string;
        region?: string;
        region_id?: number;
        postcode: string;
        country_code: string;
        telephone: string;
        save_in_address_book?: boolean;
    };
    customer_address_id?: number;
}

export interface SetShippingAddressesOnCartVariables {
    cart_id: string;
    shipping_addresses: ShippingAddressInput[];
}

// --------------------
// Mutation
// --------------------
export const SET_SHIPPING_ADDRESSES_ON_CART = gql`
    mutation SetShippingAddressesOnCart(
        $cart_id: String!
        $shipping_addresses: [ShippingAddressInput]!
    ) {
        setShippingAddressesOnCart(
            input: {
                cart_id: $cart_id
                shipping_addresses: $shipping_addresses
            }
        ) {
            cart {
                shipping_addresses {
                    firstname
                    lastname
                    company
                    street
                    city
                    region {
                        code
                        label
                    }
                    postcode
                    telephone
                    country {
                        code
                        label
                    }
                    available_shipping_methods {
                        carrier_code
                        carrier_title
                        method_code
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
export const setShippingAddressOnCart = async (
    cart_id: string,
    shipping_addresses: ShippingAddressInput[],
): Promise<SetShippingAddressesOnCartResponse | null> => {
    try {
        const { data } = await apolloClient.mutate<
            SetShippingAddressesOnCartResponse,
            SetShippingAddressesOnCartVariables
        >({
            mutation: SET_SHIPPING_ADDRESSES_ON_CART,
            variables: {
                cart_id,
                shipping_addresses,
            },
            fetchPolicy: "no-cache",
        });

        return data ?? null;
    } catch (error) {
        console.error("Error setting shipping address:", error);
        return null;
    }
};
