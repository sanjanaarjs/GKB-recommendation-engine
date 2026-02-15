import apolloClient from "@/lib/services/magento/apolloClient";
import { gql } from "@apollo/client";

export const GET_STORE_CONFIG = gql`
    query StoreConfig {
        storeConfig {
            header_logo_src
            base_media_url
            logo_alt
            logo_height
            logo_width
            logo_url
        }
    }
`;

export interface StoreConfigResponse {
    storeConfig: {
        header_logo_src: string;
        base_media_url: string;
        logo_alt: string;
        logo_height: number;
        logo_width: number;
        logo_url: string;
    };
}

// Function to fetch data
export async function getStoreConfig(): Promise<
    StoreConfigResponse["storeConfig"] | null
> {
    try {
        const { data } = await apolloClient.query<StoreConfigResponse>({
            query: GET_STORE_CONFIG,
            fetchPolicy: "no-cache",
        });

        return data?.storeConfig ?? null;
    } catch (error) {
        console.error("Error fetching store config:", error);
        return null;
    }
}
