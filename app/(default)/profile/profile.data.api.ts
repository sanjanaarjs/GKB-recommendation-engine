import apolloClient from "@/lib/services/magento/apolloClient";
import { gql } from "@apollo/client";

export interface CustomerRegion {
    region: string;
    region_code: string;
    region_id: number;
}

export interface CustomerAddress {
    id: string;
    firstname: string;
    lastname: string;
    middlename?: string | null;
    street: string[];
    city: string;
    postcode: string;
    country_code: string;
    telephone: string;
    default_billing?: boolean;
    default_shipping?: boolean;
    region: CustomerRegion;
}

export interface CustomAttribute {
    code: string;
    value: string;
}

export interface Customer {
    email: string;
    firstname: string;
    lastname: string;
    middlename?: string | null;
    custom_attributes?: CustomAttribute[];
    addresses: CustomerAddress[];
    customerSum?: string | null;
}

export interface GetCustomerResponse {
    customer: Customer | null;
}

export const GET_CUSTOMER = gql`
    query Customer {
        customer {
            email
            firstname
            lastname
            middlename
            custom_attributes(attributeCodes: ["mobile_number"]) {
                ... on AttributeValue {
                    code
                    value
                }
            }
            addresses {
                id
                firstname
                lastname
                middlename
                street
                city
                postcode
                country_code
                telephone
                default_billing
                default_shipping
                region {
                    region
                    region_code
                    region_id
                }
            }
            customerSum
        }
    }
`;

export async function getCustomerData(
    token: string,
): Promise<GetCustomerResponse["customer"] | null> {
    try {
        const { data } = await apolloClient.query<GetCustomerResponse>({
            query: GET_CUSTOMER,
            context: {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
            fetchPolicy: "no-cache",
        });

        return data?.customer ?? null;
    } catch (error) {
        console.error("Error fetching customer:", error);
        return null;
    }
}

export const REVOKE_CUSTOMER_TOKEN = gql`
    mutation RevokeCustomerToken {
        revokeCustomerToken {
            result
        }
    }
`;

export interface RevokeCustomerTokenResponse {
    revokeCustomerToken: {
        result: boolean;
    };
}
