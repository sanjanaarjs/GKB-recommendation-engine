import apolloClient from "@/lib/services/magento/apolloClient";
import { gql } from "@apollo/client";

// --------------------
// Types
// --------------------
export interface ApplyCouponToCartResponse {
    applyCouponToCart: {
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
export const APPLY_COUPON_CART = gql`
    mutation ApplyCouponToCart($cartId: String!, $couponCode: String!) {
        applyCouponToCart(
            input: { cart_id: $cartId, coupon_code: $couponCode }
        ) {
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

export const applyCouponToCart = async (
    cartId: string,
    couponCode: string,
    token?: string,
): Promise<ApplyCouponToCartResponse | null> => {
    try {
        const { data } = await apolloClient.mutate<ApplyCouponToCartResponse>({
            mutation: APPLY_COUPON_CART,
            variables: {
                cartId,
                couponCode,
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
        console.error("Error applying coupon:", error);
        return null;
    }
};
