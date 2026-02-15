// --------------------
// TYPES
// --------------------

import apolloClient from "@/lib/services/magento/apolloClient";
import { gql } from "@apollo/client";

export interface GiftCardOrderHistoryItem {
    amount: number;
    comments: string | null;
    id: string;
    useDate: string;
    orderId: string;
}

export interface GiftCardItem {
    balance: number;
    giftCardCode: string;
    id: string;
    issuedOn: string;
    expireAt: string;
    issuedAmount: number;
    GiftCardOrderHistory: GiftCardOrderHistoryItem[];
}

export interface GetGiftCardHistoryData {
    getGiftCardHistory: {
        message: string;
        success: boolean;
        giftCartList: GiftCardItem[];
    };
}

export const GET_GIFT_CARD_HISTORY_QUERY = gql`
    query GetGiftCardHistory {
        getGiftCardHistory {
            message
            success
            giftCartList {
                balance
                giftCardCode
                id
                issuedOn
                expireAt
                issuedAmount
                GiftCardOrderHistory {
                    amount
                    comments
                    id
                    useDate
                    orderId
                }
            }
        }
    }
`;

export const getGiftCardHistory =
    async (): Promise<GetGiftCardHistoryData | null> => {
        try {
            const { data } = await apolloClient.query<GetGiftCardHistoryData>({
                query: GET_GIFT_CARD_HISTORY_QUERY,
                fetchPolicy: "no-cache",
            });

            return data ?? null;
        } catch (error) {
            console.error("Error fetching gift card history:", error);
            return null;
        }
    };
