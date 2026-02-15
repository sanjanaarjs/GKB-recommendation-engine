import { gql } from "@apollo/client";
import apolloClient from "@/lib/services/magento/apolloClient";

export const CREATE_CUSTOMER = gql`
    mutation CreateCustomer($input: CustomerInput!) {
        createCustomer(input: $input) {
            customer {
                firstname
                lastname
                email
                is_subscribed
                token
            }
            message
            status
        }
    }
`;

export interface CreateCustomerInput {
    firstname: string;
    lastname: string;
    email: string;
    is_subscribed?: boolean;
    mobile_number?: string; // 👈 new field
}

export interface CreateCustomerVariables {
    input: CreateCustomerInput;
}

export interface CreateCustomerResponse {
    createCustomer: {
        customer: {
            firstname: string;
            lastname: string;
            email: string;
            is_subscribed: boolean;
            token: string;
        };
        message: string;
        status: string;
    };
}

export async function createCustomer(
    input: CreateCustomerInput,
): Promise<CreateCustomerResponse["createCustomer"] | null> {
    try {
        const { data } = await apolloClient.mutate<
            CreateCustomerResponse,
            CreateCustomerVariables
        >({
            mutation: CREATE_CUSTOMER,
            variables: { input },
            fetchPolicy: "no-cache",
        });

        return data?.createCustomer ?? null;
    } catch (error) {
        console.error("Error creating customer:", error);
        return null;
    }
}
