import apolloClient from "@/lib/services/magento/apolloClient";
import { gql } from "@apollo/client";

// --------------------
// Types
// --------------------
export interface RemoveCouponResponse {
    removeCouponFromCart: {
        cart: {
            applied_coupons:
                | {
                      code: string;
                  }[]
                | null;
        };
    };
}

// --------------------
// Mutation
// --------------------
export const REMOVE_COUPON_CART = gql`
    mutation RemoveCouponFromCart($cartId: String!) {
        removeCouponFromCart(input: { cart_id: $cartId }) {
            cart {
                applied_coupons {
                    code
                }
            }
        }
    }
`;

// --------------------
// API CALL FUNCTION
// --------------------
export const removeCouponFromCart = async (
    cartId: string,
    token?: string,
): Promise<RemoveCouponResponse | null> => {
    try {
        const { data } = await apolloClient.mutate<RemoveCouponResponse>({
            mutation: REMOVE_COUPON_CART,
            variables: { cartId },
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
        console.error("Error removing coupon:", error);
        return null;
    }
};
