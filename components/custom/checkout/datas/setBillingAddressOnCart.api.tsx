import apolloClient from "@/lib/services/magento/apolloClient";
import { gql } from "@apollo/client";

// --------------------
// Types
// --------------------
export interface Region {
    code: string | null;
    label: string | null;
}

export interface Country {
    code: string;
    label: string;
}

export interface BillingAddress {
    firstname: string | null;
    lastname: string | null;
    company: string | null;
    street: string[];
    city: string;
    region: Region | null;
    postcode: string;
    telephone: string;
    country: Country;
}

export interface SetBillingAddressOnCartResponse {
    setBillingAddressOnCart: {
        cart: {
            billing_address: BillingAddress;
        };
    };
}

export type BillingAddressInput =
    | { same_as_shipping: true }
    | {
          address: {
              firstname: string;
              lastname: string;
              company?: string;
              street: string[];
              city: string;
              region: string;
              region_id: number;
              postcode: string;
              country_code: string;
              telephone: string;
              save_in_address_book?: boolean;
          };
      }
    | { customer_address_id: number };

export interface SetBillingAddressOnCartVariables {
    cart_id: string;
    billing_address: BillingAddressInput;
}

// --------------------
// Mutation
// --------------------
export const SET_BILLING_ADDRESS_ON_CART_MUTATION = gql`
    mutation SetBillingAddressOnCart(
        $cart_id: String!
        $billing_address: BillingAddressInput!
    ) {
        setBillingAddressOnCart(
            input: { cart_id: $cart_id, billing_address: $billing_address }
        ) {
            cart {
                billing_address {
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
                }
            }
        }
    }
`;

// --------------------
// API CALL FUNCTION
// --------------------
export const setBillingAddressOnCart = async (
    cart_id: string,
    billing_address: BillingAddressInput,
    token?: string,
): Promise<SetBillingAddressOnCartResponse | null> => {
    try {
        const { data } = await apolloClient.mutate<
            SetBillingAddressOnCartResponse,
            SetBillingAddressOnCartVariables
        >({
            mutation: SET_BILLING_ADDRESS_ON_CART_MUTATION,
            variables: {
                cart_id,
                billing_address,
            },
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
        console.error("Error setting billing address:", error);
        return null;
    }
};
