import apolloClient from "@/lib/services/magento/apolloClient";
import { gql } from "@apollo/client";

// -------------------------------------------------------
// TYPES
// -------------------------------------------------------

export interface GiftCardBalanceInfo {
    available_amount: number | null;
    code: string | null;
    currency: string | null;
    message: string | null;
    success: boolean;
}

export interface CheckGiftCardBalanceResponse {
    checkGiftCardBalance: GiftCardBalanceInfo;
}

export interface CheckGiftCardBalanceVariables {
    giftcardCode: string;
    giftcardPin: string;
}

// -------------------------------------------------------
// GRAPHQL QUERY
// -------------------------------------------------------

export const CHECK_GIFT_CARD_BALANCE = gql`
    query CheckGiftCardBalance($giftcardCode: String!, $giftcardPin: String!) {
        checkGiftCardBalance(
            giftcardCode: $giftcardCode
            giftcardPin: $giftcardPin
        ) {
            available_amount
            code
            currency
            message
            success
        }
    }
`;

// -------------------------------------------------------
// API FUNCTION
// -------------------------------------------------------

export const checkGiftCardBalance = async (
    giftcardCode: string,
    giftcardPin: string,
): Promise<CheckGiftCardBalanceResponse | null> => {
    try {
        const { data } = await apolloClient.query<
            CheckGiftCardBalanceResponse,
            CheckGiftCardBalanceVariables
        >({
            query: CHECK_GIFT_CARD_BALANCE,
            variables: { giftcardCode, giftcardPin },
            fetchPolicy: "no-cache",
        });

        return data ?? null;
    } catch (error) {
        console.error("Error checking gift card balance:", error);
        return null;
    }
};
