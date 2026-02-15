import apolloClient from "@/lib/services/magento/apolloClient";
import { gql } from "@apollo/client";

export type FeatureBrandCategory = {
    id: string | number;
    image: string;
    name: string;
    thumbnail: string;
};

export type BrandCategoriesResponse = {
    getBrandCategories: {
        message: string;
        status: string | number;
        data: FeatureBrandCategory[];
    } | null;
};

export const BRAND_MENU_QUERY = gql`
    query GetBrandCategories {
        getBrandCategories(is_feature: 1) {
            message
            status
            data {
                id
                image
                name
                thumbnail
            }
        }
    }
`;

export async function GetBrandCategories(): Promise<
    BrandCategoriesResponse["getBrandCategories"] | null
> {
    try {
        const { data } = await apolloClient.query<BrandCategoriesResponse>({
            query: BRAND_MENU_QUERY,
            fetchPolicy: "no-cache",
        });
        return data?.getBrandCategories ?? null;
    } catch (error) {
        console.error("Error fetching header menu:", error);
        return null;
    }
}
