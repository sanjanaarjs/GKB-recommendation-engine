import apolloClient from "@/lib/services/magento/apolloClient";
import { gql } from "@apollo/client";

// --------------------
// Types
// --------------------
export interface AvailableRegion {
    id: number;
    code: string;
    name: string;
}

export interface Country {
    id: string;
    two_letter_abbreviation: string;
    three_letter_abbreviation: string;
    full_name_locale: string;
    full_name_english: string;
    available_regions: AvailableRegion[];
}

export interface GetCountryResponse {
    country: Country;
}

export interface GetCountryVariables {
    id: string;
}

// --------------------
// GraphQL Query
// --------------------
export const GET_COUNTRY_QUERY = gql`
    query GetCountry($id: String!) {
        country(id: $id) {
            id
            two_letter_abbreviation
            three_letter_abbreviation
            full_name_locale
            full_name_english
            available_regions {
                id
                code
                name
            }
        }
    }
`;

// --------------------
// API CALL FUNCTION (NO TOKEN)
// --------------------
export const getCountry = async (
    id: string,
): Promise<GetCountryResponse | null> => {
    try {
        const { data } = await apolloClient.query<
            GetCountryResponse,
            GetCountryVariables
        >({
            query: GET_COUNTRY_QUERY,
            variables: { id },
            fetchPolicy: "no-cache",
        });

        return data ?? null;
    } catch (error) {
        console.error("Error fetching country:", error);
        return null;
    }
};
