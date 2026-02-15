import PlpWrapper from "@/components/custom/plp/plpWrapper";
import { getSearchProducts } from "@/components/custom/plp/datas/productData.api";
import { normalizeSearchQuery } from "@/components/custom/search/utils";
import { getCurrency } from "@/lib/services/magento/query_getCurrency_graphql";

interface SearchPageProps {
    searchParams: Promise<{
        q?: string | string[];
    }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const resolvedSearchParams = await searchParams;
    const query = normalizeSearchQuery(resolvedSearchParams?.q);

    const searchResults = query
        ? await getSearchProducts({
              search: query,
              pageSize: 24,
              currentPage: 1,
          })
        : null;

    const currency = await getCurrency();

    return (
        <PlpWrapper
            categoryProducts={searchResults}
            brandCategories={null}
            getCategory={null}
            resolverId="search"
            currency={currency}
            searchQuery={query}
        />
    );
}
