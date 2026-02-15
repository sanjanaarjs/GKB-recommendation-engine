import { gql } from "@apollo/client";

export type GetSearchSectionResponse = {
    getSearchSection: {
        data: {
            category_id: number;
            content: string;
            id: number;
            sort_order: number;
            status: string;
            title: string;
            type: string;
            image: string;
        }[];
        status: string;
    };
};

export type GetSearchSectionVariables = {
    filter: object | null;
};

export const GET_SEARCH_SECTION = gql`
    query GetSearchSection {
        getSearchSection(filter: {}) {
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
