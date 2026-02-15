import { gql } from "@apollo/client";

export interface WishlistProductImage {
    url: string;
    label?: string | null;
}

export interface WishlistProductCategory {
    name: string;
}

export interface WishlistProductPrice {
    regularPrice: {
        amount: {
            currency: string;
            value: number;
        };
    };
}

export interface WishlistProduct {
    name: string;
    image?: WishlistProductImage;
    categories?: WishlistProductCategory[];
    price?: WishlistProductPrice;
    sku: string;
    url_key?: string;
    id: string;
}

export interface WishlistItem {
    product: WishlistProduct;
}

export interface WishlistData {
    wishlist: {
        items_count: number;
        name: string;
        items: WishlistItem[];
    };
}

export const GET_WISHLIST = gql`
    query Wishlist {
        wishlist {
            items_count
            name
            items {
                product {
                    name
                    image {
                        url
                        label
                    }
                    categories {
                        name
                    }
                    price {
                        regularPrice {
                            amount {
                                currency
                                value
                            }
                        }
                    }
                    sku
                    url_key
                }
            }
        }
    }
`;
