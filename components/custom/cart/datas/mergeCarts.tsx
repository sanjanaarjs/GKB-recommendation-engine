import apolloClient from "@/lib/services/magento/apolloClient";
import { gql } from "@apollo/client";

// --------------------
// Types
// --------------------

export interface MergeCartItem {
    id: string;
    product: {
        name: string;
        sku: string;
    };
    quantity: number;
}

export interface MergeCartsResponse {
    mergeCarts: {
        itemsV2: {
            items: MergeCartItem[];
            total_count: number;
            page_info: {
                page_size: number;
                current_page: number;
                total_pages: number;
            };
        };
    };
}

// --------------------
// Mutation
// --------------------

export const MERGE_CARTS = gql`
    mutation MergeCarts(
        $source_cart_id: String!
        $destination_cart_id: String!
    ) {
        mergeCarts(
            source_cart_id: $source_cart_id
            destination_cart_id: $destination_cart_id
        ) {
            itemsV2 {
                items {
                    id
                    product {
                        name
                        sku
                    }
                    quantity
                }
                total_count
                page_info {
                    page_size
                    current_page
                    total_pages
                }
            }
        }
    }
`;

// --------------------
// API CALL FUNCTION
// --------------------

export const mergeCarts = async (
    sourceCartId: string,
    destinationCartId: string,
    token?: string,
): Promise<MergeCartsResponse | null> => {
    try {
        const { data } = await apolloClient.mutate<MergeCartsResponse>({
            mutation: MERGE_CARTS,
            variables: {
                source_cart_id: sourceCartId,
                destination_cart_id: destinationCartId,
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
        console.error("Error merging carts:", error);
        return null;
    }
};
