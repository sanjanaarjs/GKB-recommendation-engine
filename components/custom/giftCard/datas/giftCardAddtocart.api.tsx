import apolloClient from "@/lib/services/magento/apolloClient";
import { gql } from "@apollo/client";

// -------------------------------------------------------
// TYPES
// -------------------------------------------------------

// Each entered option (uid + value)
export interface EnteredOptionInput {
    uid: string;
    value: string;
}

// Cart item input
export interface AddToCartItemInput {
    sku: string;
    quantity: number;
    entered_options?: EnteredOptionInput[];
}

// Response Types
export interface CartInfo {
    id: string;
    email: string | null;
    is_virtual: boolean;
    total_quantity: number;
}

export interface UserError {
    code: string | null;
    message: string;
}

export interface AddProductsToCartResponse {
    addProductsToCart: {
        cart: CartInfo;
        user_errors: UserError[] | null;
    };
}

export interface AddProductsToCartVariables {
    cartId: string;
    cartItems: AddToCartItemInput[];
}

// -------------------------------------------------------
// GRAPHQL MUTATION
// -------------------------------------------------------

export const ADD_PRODUCTS_TO_CART = gql`
    mutation AddProductsToCart(
        $cartId: String!
        $cartItems: [CartItemInput!]!
    ) {
        addProductsToCart(cartId: $cartId, cartItems: $cartItems) {
            cart {
                id
                email
                is_virtual
                total_quantity
            }
            user_errors {
                code
                message
            }
        }
    }
`;

// -------------------------------------------------------
// API FUNCTION
// -------------------------------------------------------

export const addProductsToCart = async (
    cartId: string,
    cartItems: AddToCartItemInput[],
): Promise<AddProductsToCartResponse | null> => {
    try {
        const { data } = await apolloClient.mutate<
            AddProductsToCartResponse,
            AddProductsToCartVariables
        >({
            mutation: ADD_PRODUCTS_TO_CART,
            variables: { cartId, cartItems },
            fetchPolicy: "no-cache",
        });

        return data ?? null;
    } catch (error) {
        console.error("Error adding products to cart:", error);
        return null;
    }
};
