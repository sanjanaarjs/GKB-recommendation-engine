import { gql } from "@apollo/client";
import { Address } from "./type";

/* ==============================
   QUERIES
============================== */

export const GET_CUSTOMER_ADDRESSES = gql`
    query GetCustomerAddresses {
        customer {
            addresses {
                id
                firstname
                lastname
                street
                city
                postcode
                country_code
                telephone
                default_billing
                default_shipping
            }
        }
    }
`;

/* ==============================
   MUTATIONS
============================== */

export const CREATE_CUSTOMER_ADDRESS = gql`
    mutation CreateCustomerAddress($input: CustomerAddressInput!) {
        createCustomerAddress(input: $input) {
            city
            company
            country_code
            default_billing
            default_shipping
            fax
            firstname
            lastname
            middlename
            postcode
            street
            telephone
        }
    }
`;

export const GET_COUNTRY_REGIONS = gql`
    query GetCountryRegions($countryId: String!) {
        country(id: $countryId) {
            available_regions {
                id
                code
                name
            }
        }
    }
`;

export const UPDATE_CUSTOMER_ADDRESS = gql`
    mutation UpdateCustomerAddress($id: Int!, $input: CustomerAddressInput!) {
        updateCustomerAddress(id: $id, input: $input) {
            city
            company
            default_billing
            default_shipping
            fax
            firstname
            lastname
            middlename
            postcode
            street
            telephone
            country_code
            region {
                region
                region_code
                region_id
            }
        }
    }
`;

export const DELETE_CUSTOMER_ADDRESS = gql`
    mutation DeleteCustomerAddress($id: Int!) {
        deleteCustomerAddress(id: $id)
    }
`;

/* ==============================
   TYPES
============================== */

/** Response type for fetching addresses */
export interface CustomerAddress {
    id: string;
    firstname: string;
    lastname: string;
    street: string[];
    city: string;
    postcode: string;
    country_code: string;
    telephone: string;
    default_billing?: boolean;
    default_shipping?: boolean;
}

export interface Region {
    code: string;
    id: number;
    name: string;
}

/** Query response for GetCustomerAddresses */
export interface GetCustomerAddressesResponse {
    customer: {
        addresses: Address[];
    } | null;
}

/** Input type for creating a customer address */
export interface CustomerAddressInput {
    city: string;
    company?: string;
    country_code: string; // e.g., "IN"
    fax?: string;
    firstname: string;
    lastname: string;
    postcode: string;
    region: {
        region: string;
        region_code: string;
        region_id: number;
    };
    street: string[];
    telephone: string;
    default_billing?: boolean;
    default_shipping?: boolean;
}

/** Wrapper for mutation input */
export interface CustomerAddressForm {
    input: CustomerAddressInput;
}

/** Mutation response for CreateCustomerAddress */
export interface CreateCustomerAddressResponse {
    createCustomerAddress: {
        city: string;
        company?: string | null;
        country_code: string;
        default_billing: boolean;
        default_shipping: boolean;
        fax?: string | null;
        firstname: string;
        lastname: string;
        middlename?: string | null;
        postcode: string;
        street: string[];
        telephone: string;
    };
}

/** Variables for CreateCustomerAddress mutation */
export interface CreateCustomerAddressVariables {
    input: CustomerAddressInput;
}

/** Variables for DeleteCustomerAddress mutation */
export interface DeleteCustomerAddressVariables {
    id: string;
}

/** Mutation response for DeleteCustomerAddress */
export interface DeleteCustomerAddressResponse {
    deleteCustomerAddress: boolean;
}

/** Props for address list component */
export interface AddressListProps {
    onEdit: (data: Address) => void;
    data: Address[];
    onDelete: (id: string) => void;
    loading: boolean;
}

/** Props for the Address Delete Form component */
export interface IAddressDeleteFormProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    addressId?: string | null;
    refreshAddressList: () => void;
}

export interface GetCountryRegionsResponse {
    country: {
        available_regions: Region[];
    } | null;
}

export interface GetCountryRegionsVariables {
    countryId: string;
}
