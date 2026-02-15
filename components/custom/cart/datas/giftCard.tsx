import apolloClient from "@/lib/services/magento/apolloClient";
import { gql } from "@apollo/client";

// --------------------
// Types
// --------------------
export interface ApplyGiftCardResponse {
    applyGiftCard: {
        message: string;
        success: boolean;
    };
}

// --------------------
// Mutation
// --------------------
export const APPLY_GIFT_CARD = gql`
    mutation ApplyGiftCard(
        $giftcardCode: String!
        $giftcardPin: String!
        $cartId: String!
        $remove: Boolean!
    ) {
        applyGiftCard(
            giftcardCode: $giftcardCode
            giftcardPin: $giftcardPin
            cartId: $cartId
            remove: $remove
        ) {
            message
            success
        }
    }
`;

// --------------------
// API CALL FUNCTION
// --------------------

export const applyGiftCard = async (
    cartId: string,
    giftcardCode: string,
    giftcardPin: string,
    remove: boolean,
    token?: string,
): Promise<ApplyGiftCardResponse | null> => {
    try {
        const { data } = await apolloClient.mutate<ApplyGiftCardResponse>({
            mutation: APPLY_GIFT_CARD,
            variables: {
                cartId,
                giftcardCode,
                giftcardPin,
                remove,
            },
            context: token
                ? {
                      headers: {
                          Authorization: `Bearer ${token}`,
                      },
                  }
                : undefined,
        });

        return data ?? null;
    } catch (error) {
        console.error("Error applying gift card:", error);
        return null;
    }
};
