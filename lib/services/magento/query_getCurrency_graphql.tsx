import apolloClient from "@/lib/services/magento/apolloClient";
import { gql } from "@apollo/client";

// =========================
// Types
// =========================

export type CurrencyResponse = {
    currency: {
        available_currency_codes: string[];
        base_currency_code: string;
        base_currency_symbol: string;
        default_display_currecy_code?: string; // note: looks like a typo in your schema
        default_display_currecy_symbol?: string; // note: looks like a typo in your schema
        default_display_currency_code: string;
        default_display_currency_symbol: string;
    };
};

// =========================
// Query
// =========================

export const CURRENCY_QUERY = gql`
    query Currency {
        currency {
            available_currency_codes
            base_currency_code
            base_currency_symbol
            default_display_currecy_code
            default_display_currecy_symbol
            default_display_currency_code
            default_display_currency_symbol
        }
    }
`;

// =========================
// Function
// =========================

export async function getCurrency(): Promise<
    CurrencyResponse["currency"] | null
> {
    try {
        const { data } = await apolloClient.query<CurrencyResponse>({
            query: CURRENCY_QUERY,
            fetchPolicy: "no-cache",
        });
        return data?.currency ?? null;
    } catch (error) {
        console.error("Error fetching currency:", error);
        return null;
    }
}
