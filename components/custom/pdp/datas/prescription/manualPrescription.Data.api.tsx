import apolloClient from "@/lib/services/magento/apolloClient";
import { gql } from "@apollo/client";

export interface ContactLensInput {
    sku: string;
    spherical?: string;
    cylindrical?: string;
}

export interface ContactLensData {
    spherical: string;
    id: number;
    cylindrical: string;
    axis: number | null;
}

export interface GetContactLensResponse {
    getContactLens: {
        data: ContactLensData[];
        message: string;
        status: boolean;
    };
}

export const GET_CONTACT_LENS = gql`
    query ($sku: String!, $spherical: String, $cylindrical: String) {
        getContactLens(
            input: {
                sku: $sku
                spherical: $spherical
                cylindrical: $cylindrical
            }
        ) {
            data {
                spherical
                id
                cylindrical
                axis
            }
            message
            status
        }
    }
`;

export async function getContactLens({
    sku,
    spherical,
    cylindrical,
}: ContactLensInput) {
    try {
        const { data } = await apolloClient.query({
            query: GET_CONTACT_LENS,
            variables: {
                sku,
                spherical: spherical || "",
                cylindrical: cylindrical || "",
            },
            fetchPolicy: "no-cache",
        });

        return data;
    } catch (error) {
        console.error("Error fetching contact lens details:", error);
        return null;
    }
}
