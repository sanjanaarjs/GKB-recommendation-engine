import apolloClient from "@/lib/services/magento/apolloClient";
import { gql } from "@apollo/client";

// ===============================
// Query Response Types
// ===============================
export interface GetLensPriceInfoResponse {
    getLensPriceInfo: LensPriceInfo;
}

export interface LensPriceInfo {
    entity_id: number;
    message: string;
    prescription: string;
    price: number;
    status: string;
    tint: number;
}

// ===============================
// Query Variables
// ===============================
export interface GetLensPriceInfoVariables {
    select_lense_option: string;
}

// ===============================
// GraphQL Query
// ===============================
export const GET_LENS_PRICE_INFO = gql`
    query GetLensPriceInfo($select_lense_option: String!) {
        getLensPriceInfo(select_lense_option: $select_lense_option) {
            entity_id
            message
            prescription
            price
            status
            tint
        }
    }
`;

// ===============================
// API Function
// ===============================
export async function getLensPriceInfo(selectLenseOption: {
    prescription_type: string;
    light_protection: string;
    choice_lens: string;
    color_name?: string;
}): Promise<LensPriceInfo | null> {
    try {
        const { data } = await apolloClient.query<
            GetLensPriceInfoResponse,
            GetLensPriceInfoVariables
        >({
            query: GET_LENS_PRICE_INFO,
            variables: {
                select_lense_option: JSON.stringify(selectLenseOption),
            },
            fetchPolicy: "no-cache",
        });

        return data?.getLensPriceInfo ?? null;
    } catch (error) {
        console.error("Error fetching lens price info:", error);
        return null;
    }
}
