import apolloClient from "@/lib/services/magento/apolloClient";
import { gql } from "@apollo/client";

// --------------------
// Types
// --------------------
export interface MoneyValue {
    value: number;
    currency: string;
}

export interface Discount {
    label: string;
    amount: MoneyValue;
}

export interface SelectedOption {
    label: string;
    value: string;
}

export interface OrderItem {
    product_sku: string;
    product_name: string;
    quantity_ordered: number;
    product_sale_price: MoneyValue;
    discounts: Discount[] | null;
    selected_options: SelectedOption[] | null;
}

export interface OrderTotal {
    grand_total: MoneyValue;
    subtotal: MoneyValue;
    total_tax: MoneyValue;
    total_shipping: MoneyValue;
}

export interface OrderAddress {
    firstname: string;
    lastname: string;
    street: string[];
    city: string;
    postcode: string;
    region: string | null;
    country_code: string;
    telephone: string;
}

export interface PaymentMethod {
    name: string;
    type: string;
}

export interface OrderV2 {
    number: string;
    order_date: string;
    status: string;
    payment_methods: PaymentMethod[];
    items: OrderItem[];
    total: OrderTotal;
    shipping_method: string | null;
    shipping_address: OrderAddress | null;
    billing_address: OrderAddress | null;
}

export interface PlaceOrderError {
    message: string;
    code: string;
}

export interface PlaceOrderResponse {
    placeOrder: {
        orderV2: OrderV2 | null;
        errors: PlaceOrderError[] | null;
    };
}

export interface PlaceOrderVariables {
    cart_id: string;
}

// --------------------
// Mutation
// --------------------
export const PLACE_ORDER_MUTATION = gql`
    mutation PlaceOrder($cart_id: String!) {
        placeOrder(input: { cart_id: $cart_id }) {
            orderV2 {
                number
                order_date
                status
                payment_methods {
                    name
                    type
                }
                items {
                    product_sku
                    product_name
                    quantity_ordered
                    product_sale_price {
                        value
                        currency
                    }
                    discounts {
                        label
                        amount {
                            value
                            currency
                        }
                    }
                    selected_options {
                        label
                        value
                    }
                }
                total {
                    grand_total {
                        value
                        currency
                    }
                    subtotal {
                        value
                        currency
                    }
                    total_tax {
                        value
                        currency
                    }
                    total_shipping {
                        value
                        currency
                    }
                }
                shipping_method
                shipping_address {
                    firstname
                    lastname
                    street
                    city
                    postcode
                    region
                    country_code
                    telephone
                }
                billing_address {
                    firstname
                    lastname
                    street
                    city
                    postcode
                    region
                    country_code
                    telephone
                }
            }
            errors {
                message
                code
            }
        }
    }
`;

// --------------------
// API CALL FUNCTION
// --------------------
export const placeOrder = async (
    cart_id: string,
): Promise<PlaceOrderResponse | null> => {
    try {
        const { data } = await apolloClient.mutate<
            PlaceOrderResponse,
            PlaceOrderVariables
        >({
            mutation: PLACE_ORDER_MUTATION,
            variables: { cart_id },
            fetchPolicy: "no-cache",
        });

        return data ?? null;
    } catch (error) {
        console.error("Error placing order:", error);
        return null;
    }
};
