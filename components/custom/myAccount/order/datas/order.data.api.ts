import { gql } from "@apollo/client";

export const CUSTOMER_ORDERS = gql`
    query CustomerOrders {
        customerOrders {
            total_count
            items {
                id
                created_at
                grand_total
                order_number
                status
                items {
                    product_name
                    product_url_key
                    status
                    quantity_ordered
                    product {
                        image {
                            label
                            url
                        }
                        price {
                            regularPrice {
                                amount {
                                    currency
                                    value
                                }
                            }
                        }
                        media_gallery {
                            label
                            url
                        }
                    }
                }
            }
        }
    }
`;

export interface CustomerOrdersResponse {
    customerOrders: {
        total_count: number;
        items: CustomerOrder[];
    };
}

export interface CustomerOrder {
    id: string;
    created_at: string;
    grand_total: number;
    order_number: string;
    status: string;
    items: OrderItem[];
}

export interface OrderItem {
    product_name: string;
    product_url_key: string;
    status: string;
    product: Product;
    quantity: number;
    image: ProductImage;
    length?: number;
    quantity_ordered: number;
    product_sale_price: {
        currency: string;
        value: number;
    };
}

export interface Product {
    image?: ProductImage | null;
    price?: ProductPrice | null;
    media_gallery?: ProductImage[] | null;
    description: string;
    thumbnail?: ProductImage | null;
}

export interface ProductImage {
    label?: string | null;
    url: string;
}

export interface ProductPrice {
    regularPrice: {
        amount: {
            currency: string;
            value: number;
        };
    };
}

export const GET_CUSTOMER_ORDER_DETAILS = gql`
    query Customer($orderNumber: String!) {
        customer {
            email
            firstname
            lastname
            middlename
            orders(filter: { number: { eq: $orderNumber } }) {
                total_count
                items {
                    grand_total
                    order_date
                    order_number
                    status
                    invoices {
                        id
                        number
                        total {
                            base_grand_total {
                                currency
                                value
                            }
                            discounts {
                                applied_to
                                label
                            }
                            grand_total {
                                currency
                                value
                            }
                            shipping_handling {
                                total_amount {
                                    currency
                                    value
                                }
                                discounts {
                                    amount {
                                        currency
                                        value
                                    }
                                }
                                taxes {
                                    rate
                                    title
                                    amount {
                                        currency
                                        value
                                    }
                                }
                            }
                            total_shipping {
                                currency
                                value
                            }
                            subtotal {
                                currency
                                value
                            }
                            taxes {
                                rate
                                title
                                amount {
                                    currency
                                    value
                                }
                            }
                        }
                    }
                    items {
                        product_name
                        #product_sku
                        #product_type
                        product_url_key
                        status
                        product {
                            color
                            attributeTobeShow(fields: ["brand"]) {
                                attribute_label
                                attribute_value
                            }
                            thumbnail {
                                label
                                url
                            }
                            #media_gallery {
                            #label
                            #url
                            #}
                            categories {
                                id
                                name
                            }
                        }
                        product_sale_price {
                            currency
                            value
                        }
                        quantity_ordered
                    }
                    shipping_address {
                        firstname
                        lastname
                        middlename
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
                        middlename
                        street
                        city
                        postcode
                        region
                        country_code
                        telephone
                    }
                    shipments {
                        tracking {
                            carrier
                            number
                            title
                        }
                    }
                    payment_methods {
                        name
                        type
                    }
                    total {
                        base_grand_total {
                            currency
                            value
                        }
                        discounts {
                            applied_to
                            label
                            amount {
                                currency
                                value
                            }
                        }
                        grand_total {
                            currency
                            value
                        }
                        shipping_handling {
                            total_amount {
                                currency
                                value
                            }
                        }
                        subtotal {
                            currency
                            value
                        }
                        taxes {
                            rate
                            title
                            amount {
                                currency
                                value
                            }
                        }
                        total_tax {
                            currency
                            value
                        }
                        total_shipping {
                            currency
                            value
                        }
                        giftcard {
                            code
                            amount
                            base_amount
                        }
                    }
                }
            }
        }
    }
`;

export interface CustomerOrderDetailsResponse {
    customer: {
        email: string;
        firstname: string;
        lastname: string;
        middlename?: string | null;
        orders: {
            total_count: number;
            items: CustomerOrderDetails[];
        };
    };
}

export interface CustomerOrderDetails {
    grand_total: number;
    order_date: string;
    order_number: string;
    status: string;
    invoices: Invoice[];
    items?: OrderDetailItem[];
    shipping_address: ShippingAddress;
    billing_address: ShippingAddress;
    shipments: Shipment[];
    payment_methods: PaymentMethod[];
    total: OrderTotals;
}

/* ------------------ INVOICE ------------------ */
export interface Invoice {
    id: string;
    number: string;
    total: InvoiceTotal;
}

export interface InvoiceTotal {
    base_grand_total: MoneyAmount;
    discounts: InvoiceDiscount[];
    grand_total: MoneyAmount;
    shipping_handling: InvoiceShippingHandling;
    total_shipping: MoneyAmount;
    subtotal: MoneyAmount;
    taxes: TaxAmount[];
}

export interface InvoiceDiscount {
    applied_to?: string;
    label?: string;
}

export interface InvoiceShippingHandling {
    total_amount: MoneyAmount;
    discounts?: {
        amount: MoneyAmount;
    };
    taxes?: TaxAmount[];
}

export interface TaxAmount {
    rate: number;
    title: string;
    amount: MoneyAmount;
}

export interface MoneyAmount {
    currency: string;
    value: number;
}

/* ------------------ ORDER ITEMS ------------------ */
export interface OrderDetailItem {
    product_name: string;
    product_url_key: string;
    status: string;

    product: {
        color?: string | null;
        image?: ProductImage | null;
        media_gallery?: ProductImage[];
        categories?: Category[];
        thumbnail?: ProductImage | null;
        attributeTobeShow?: {
            attribute_label: string;
            attribute_value: string;
        }[];
    };

    product_sale_price: MoneyAmount;
    quantity_ordered: number;
}

export interface Category {
    id: string;
    name: string;
}

/* ------------------ SHIPPING ADDRESS ------------------ */
export interface ShippingAddress {
    firstname: string;
    lastname: string;
    middlename?: string | null;
    street: string[];
    city: string;
    postcode: string;
    region: string;
    country_code: string;
    telephone: string;
}

/* ------------------ SHIPMENTS ------------------ */
export interface Shipment {
    tracking: {
        carrier: string;
        number: string;
        title: string;
    }[];
}

/* ------------------ PAYMENT METHODS ------------------ */
export interface PaymentMethod {
    name: string;
    type: string;
}

/* ------------------ ORDER TOTALS ------------------ */
export interface OrderTotals {
    base_grand_total: MoneyAmount;
    discounts?: {
        applied_to?: string;
        label?: string;
        amount: MoneyAmount;
    }[];
    grand_total: MoneyAmount;
    shipping_handling: {
        total_amount: MoneyAmount;
    };
    subtotal: MoneyAmount;
    taxes?: TaxAmount[];
    total_tax: MoneyAmount;
    total_shipping: MoneyAmount;
    giftcard?: {
        code: string;
        amount: number;
        base_amount: number;
    }[];
}
