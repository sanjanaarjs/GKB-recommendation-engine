import apolloClient from "@/lib/services/magento/apolloClient";
import { gql } from "@apollo/client";

export type ExploreItem = {
    category_id: string | number;
    content: string;
    id: string | number;
    sort_order: number;
    status: string | number;
    title: string;
    type: string;
    image: string;
};

export type ExploreQueryResponse = {
    getSearchSection: {
        data: ExploreItem[];
        status: string | number;
    };
};
export type ExploreMobileQueryResponse = {
    data: ExploreItem[];
    status: string | number;
};

export const EXPLORE_QUERY = gql`
    query GetSearchSection {
        getSearchSection(filter: { type: { eq: "also_explore" } }) {
            data {
                category_id
                content
                id
                sort_order
                status
                title
                type
                image
            }
            status
        }
    }
`;

export async function GetExplore(): Promise<
    ExploreQueryResponse["getSearchSection"] | null
> {
    try {
        const { data } = await apolloClient.query<ExploreQueryResponse>({
            query: EXPLORE_QUERY,
            fetchPolicy: "no-cache",
        });
        return data?.getSearchSection ?? null;
    } catch (error) {
        console.error("Error fetching header menu:", error);
        return null;
    }
}
