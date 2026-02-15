import apolloClient from "@/lib/services/magento/apolloClient";
import { gql } from "@apollo/client";

export type CategoryLevel3 = {
    uid: string;
    level: number;
    name: string;
    cat_hex_color?: string;
    is_clickable?: boolean;
    path: string;
    url_key: string;
    url_path: string;
};

export type CategoryLevel2 = {
    uid: string;
    level: number;
    name: string;
    path: string;
    include_in_menu?: number;
    children_count: string;
    is_clickable?: boolean;
    cat_hex_color?: string;
    url_key: string;
    url_path: string;
    children?: CategoryLevel3[];
};

export type CategoryItem = {
    uid: string;
    id: number;
    is_anchor?: boolean;
    is_clickable?: boolean;
    cat_hex_color?: string;
    level: number;
    name: string;
    url_key: string;
    url_path: string;
    path: string;
    include_in_menu?: number;
    children_count: string;
    children?: CategoryLevel2[];
};

export type CategoriesResponse = {
    categories: {
        total_count: number;
        items: CategoryItem[];
        page_info: {
            current_page: number;
            page_size: number;
            total_pages: number;
        };
    };
};

export const HEADER_MENU_QUERY = gql`
    query GetHeaderMenu {
        categories(filters: { parent_id: { in: ["2"] } }) {
            total_count
            items {
                uid
                id
                is_anchor
                is_clickable
                cat_hex_color
                level
                name
                url_key
                url_path
                path
                include_in_menu
                children_count
                children {
                    uid
                    level
                    name
                    path
                    include_in_menu
                    children_count
                    is_clickable
                    cat_hex_color
                    url_key
                    url_path
                    children {
                        uid
                        level
                        name
                        cat_hex_color
                        is_clickable
                        path
                        url_key
                        url_path
                    }
                }
            }
            page_info {
                current_page
                page_size
                total_pages
            }
        }
    }
`;

export async function GetHeaderMenu(): Promise<
    CategoriesResponse["categories"] | null
> {
    try {
        const { data } = await apolloClient.query<CategoriesResponse>({
            query: HEADER_MENU_QUERY,
            fetchPolicy: "no-cache",
        });
        return data?.categories ?? null;
    } catch (error) {
        console.error("Error fetching header menu:", error);
        return null;
    }
}
