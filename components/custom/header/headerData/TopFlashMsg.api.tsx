import apolloClient from "@/lib/services/magento/apolloClient";
import { gql } from "@apollo/client";

export const GET_TOP_FLASH_MESSAGE = gql`
    query GetTopFlashMessage {
        getTopFlashMessage {
            ctaHyperlink
            ctaLable
            description
            endDate
            position
            startDate
        }
    }
`;

export interface GetTopFlashMessageResponse {
    getTopFlashMessage: {
        ctaHyperlink: string;
        ctaLable: string;
        description: string;
        endDate: string;
        position: string;
        startDate: string;
    };
}

export async function getTopFlashMessage(): Promise<
    GetTopFlashMessageResponse["getTopFlashMessage"] | null
> {
    try {
        const { data } = await apolloClient.query<GetTopFlashMessageResponse>({
            query: GET_TOP_FLASH_MESSAGE,
            fetchPolicy: "no-cache",
        });

        return data?.getTopFlashMessage ?? null;
    } catch (error) {
        console.error("Error fetching top flash message:", error);
        return null;
    }
}
