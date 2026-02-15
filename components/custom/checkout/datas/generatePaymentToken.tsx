import apolloClient from "@/lib/services/magento/apolloClient";
import { gql } from "@apollo/client";

// --------------------
// Types
// --------------------
export interface GeneratePaytmTxnTokenResponse {
    generatePaytmTxnToken: {
        mid: string;
        order_id: string;
        txn_token: string;
        amount: string;
        success: boolean;
        message: string;
    };
}

export interface GeneratePaytmTxnTokenVariables {
    order_id: string;
}

// --------------------
// Query
// --------------------
export const GENERATE_PAYTM_TXN_TOKEN_QUERY = gql`
    query GeneratePaytmTxnToken($order_id: String!) {
        generatePaytmTxnToken(order_id: $order_id) {
            mid
            order_id
            txn_token
            amount
            success
            message
        }
    }
`;

// --------------------
// API CALL FUNCTION
// --------------------
export const generatePaytmTxnToken = async (
    order_id: string,
    token?: string,
): Promise<GeneratePaytmTxnTokenResponse | null> => {
    try {
        const { data } = await apolloClient.query<
            GeneratePaytmTxnTokenResponse,
            GeneratePaytmTxnTokenVariables
        >({
            query: GENERATE_PAYTM_TXN_TOKEN_QUERY,
            variables: { order_id },
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
        console.error("Error generating Paytm transaction token:", error);
        return null;
    }
};
