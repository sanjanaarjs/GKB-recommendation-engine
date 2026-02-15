import { gql } from "@apollo/client";

export type SearchProductsResponse = {
    products: {
        total_count: number;
        items: {
            id: number;
            name: string;
            url_key: string;
            image: {
                label: string | null;
            };
            small_image: {
                url: string;
            };
            price_range: {
                minimum_price: {
                    regular_price: {
                        value: number;
                        currency: string;
                    };
                    final_price: {
                        value: number;
                        currency: string;
                    };
                    discount: {
                        percent_off: number;
                    };
                };
            };
        }[];
    };
};

export const SEARCH_PRODUCTS = gql`
    query SearchProducts($search: String!) {
        products(search: $search, pageSize: 12) {
            total_count
            items {
                id
                name
                url_key
                image {
                    label
                }
                small_image {
                    url
                }
                price_range {
                    minimum_price {
                        regular_price {
                            value
                            currency
                        }
                        final_price {
                            value
                            currency
                        }
                        discount {
                            percent_off
                        }
                    }
                }
            }
        }
    }
`;
