import apolloClient from "@/lib/services/magento/apolloClient";
import { gql } from "@apollo/client";

// --------------------
// Types
// --------------------
export interface CheckPaytmOrderStatusResponse {
    checkPaytmOrderStatus: {
        success: boolean;
        result_status: string; // TXN_SUCCESS | TXN_FAILURE | PENDING
        result_code: string;
        result_message: string;
        txn_id: string | null;
        bank_name: string | null;
        payment_mode: string | null;
        txn_amount: string | null;
        txn_date: string | null;
    };
}

export interface CheckPaytmOrderStatusVariables {
    order_id: string;
}

// --------------------
// Query
// --------------------
export const CHECK_PAYTM_ORDER_STATUS_QUERY = gql`
    query CheckPaytmOrderStatus($order_id: String!) {
        checkPaytmOrderStatus(order_id: $order_id) {
            success
            result_status
            result_code
            result_message
            txn_id
            bank_name
            payment_mode
            txn_amount
            txn_date
        }
    }
`;

// --------------------
// API CALL FUNCTION
// --------------------
export const checkPaytmOrderStatus = async (
    order_id: string,
    token?: string,
): Promise<CheckPaytmOrderStatusResponse | null> => {
    try {
        const { data } = await apolloClient.query<
            CheckPaytmOrderStatusResponse,
            CheckPaytmOrderStatusVariables
        >({
            query: CHECK_PAYTM_ORDER_STATUS_QUERY,
            variables: { order_id },
            fetchPolicy: "no-cache", // IMPORTANT: always get fresh status
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
        console.error("Error checking Paytm order status:", error);
        return null;
    }
};
