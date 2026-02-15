import { gql } from "@apollo/client";

export type ProductsResponse = {
    products: {
        items: {
            id: number;
            name: string;
            sku: string;
            url_key: string;
            small_image: {
                position: number;
                url: string;
            };
            price_range: {
                maximum_price: {
                    final_price: {
                        currency: string;
                        value: number;
                    };
                    regular_price: {
                        currency: string;
                        value: number;
                    };
                };
                minimum_price: {
                    final_price: {
                        currency: string;
                        value: number;
                    };
                    regular_price: {
                        currency: string;
                        value: number;
                    };
                    discount: {
                        percent_off: number;
                        amount_off: number;
                    };
                };
            };
        }[];
    };
};

export const GET_PRODUCTS = gql`
    query GetProducts($skuList: [String!]) {
        products(filter: { sku: { in: $skuList } }) {
            items {
                id
                name
                small_image {
                    position
                    url
                }
                sku
                url_key
                price_range {
                    maximum_price {
                        final_price {
                            currency
                            value
                        }
                        regular_price {
                            currency
                            value
                        }
                    }
                    minimum_price {
                        final_price {
                            currency
                            value
                        }
                        regular_price {
                            currency
                            value
                        }
                        discount {
                            percent_off
                            amount_off
                        }
                    }
                }
            }
        }
    }
`;
