import { gql } from "@apollo/client";

export type AdvancedSearchSuggestionResponse = {
    advancedSearchSuggestion: {
        id: number;
        title: string;
        type: string;
        url_key: string;
    }[];
};

export const ADVANCED_SEARCH_SUGGESTION = gql`
    query AdvancedSearchSuggestion($query: String!) {
        advancedSearchSuggestion(query: $query) {
            id
            title
            type
            url_key
        }
    }
`;
