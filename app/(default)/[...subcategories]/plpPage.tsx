import { GetCategoryProductsResponse } from "@/components/custom/plp/datas/productData.api";
import PlpWrapper from "@/components/custom/plp/plpWrapper";
import { BrandCategory } from "@/lib/services/magento/homepageData";
import { CategoriesResponseCommon } from "@/lib/services/magento/query_getCategory_graphql";
import { CurrencyResponse } from "@/lib/services/magento/query_getCurrency_graphql";

interface PlpPageProps {
    categoryProducts: GetCategoryProductsResponse | null;
    brandCategories: BrandCategory[] | null;
    getCategory: CategoriesResponseCommon["categories"] | null;
    resolverId: string;
    currency: CurrencyResponse["currency"] | null;
    searchQuery?: string;
}

export default function PlpPage({
    categoryProducts,
    brandCategories,
    getCategory,
    resolverId,
    currency,
    searchQuery,
}: PlpPageProps) {
    return (
        <PlpWrapper
            categoryProducts={categoryProducts}
            brandCategories={brandCategories}
            getCategory={getCategory}
            resolverId={resolverId}
            currency={currency}
            searchQuery={searchQuery}
        />
    );
}
