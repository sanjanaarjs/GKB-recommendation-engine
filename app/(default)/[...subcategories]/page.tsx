import { resolveUrlPath } from "@/lib/services/magento/query_urlResolver_graphql";
import PlpPage from "./plpPage";
import PdpPage from "./pdpPage";
import {
    getCategoryProducts,
    getSearchProducts,
} from "@/components/custom/plp/datas/productData.api";
import { getBrands } from "@/lib/services/magento/homepageData";
import { getCategoryByUid } from "@/lib/services/magento/query_getCategory_graphql";
import { getCurrency } from "@/lib/services/magento/query_getCurrency_graphql";
import { GlobalPageParam } from "@/lib/constants/global";
import { getProducts } from "@/components/custom/pdp/datas/pdpData.api";
import { getLens } from "@/components/custom/pdp/datas/lensFlow.api";
import { normalizeSearchQuery } from "@/components/custom/search/utils";
import {
    CATEGORY,
    COLLECTION,
    CURRENTPAGE,
    PAGESIZE,
    PRODUCT,
} from "@/lib/constants/variable";
import { notFound } from "next/navigation";

type SearchParams = Record<string, string | string[] | undefined>;

export default async function SubCategoryPage({
    params,
    searchParams,
}: {
    params: GlobalPageParam["params"];
    searchParams?: Promise<SearchParams>;
}) {
    let resolver = null;
    let categoryProducts = null;
    let brandCategories = null;
    let getCategory = null;
    let currency = null;
    let productData = null;
    let lensData = null;

    const resolvedParams = await params;
    const resolvedSearchParams = searchParams ? await searchParams : undefined;

    const path = resolvedParams?.subcategories?.join("/");

    const subcategorySlug = path;

    if (subcategorySlug === "search") {
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
            <PlpPage
                categoryProducts={searchResults}
                brandCategories={null}
                getCategory={null}
                resolverId="search"
                currency={currency}
                searchQuery={query}
            />
        );
    }

    // Ignore special paths like .well-known, _next, favicon, etc.
    if (
        subcategorySlug?.startsWith(".well-known") ||
        subcategorySlug?.startsWith("_next") ||
        subcategorySlug?.startsWith("favicon") ||
        subcategorySlug?.startsWith("api")
    ) {
        notFound();
    }

    try {
        resolver = await resolveUrlPath(`${subcategorySlug}.html`);

        if (!resolver) {
            console.error("No resolver found for:", subcategorySlug);
            notFound();
        }

        currency = await getCurrency();

        if (resolver.type === CATEGORY) {
            categoryProducts = await getCategoryProducts({
                filter: {
                    category_uid: { in: [resolver.entity_uid.toString()] },
                },
                pageSize: PAGESIZE, // or dynamic
                currentPage: CURRENTPAGE, // start from first page
            });
            if (categoryProducts?.products?.page_type === COLLECTION) {
                // Re-fetch WITH collectionCategoryId for collection-specific data
                categoryProducts = await getCategoryProducts({
                    filter: {
                        category_uid: { in: [resolver.entity_uid.toString()] },
                    },
                    pageSize: PAGESIZE,
                    currentPage: CURRENTPAGE,
                    collectionCategoryId: resolver.id.toString(),
                });
            }
            getCategory = await getCategoryByUid([
                resolver.entity_uid.toString(),
            ]);
            brandCategories = await getBrands();
        } else if (resolver.type === PRODUCT) {
            // Call PDP query here
            const urlKey = resolver.relative_url.replace(".html", "");
            productData = await getProducts(urlKey);
            lensData = await getLens(urlKey);
        } else {
            console.warn(`Unhandled resolver type: ${resolver.type}`);
            notFound();
        }
    } catch (error) {
        console.error("Error handling URL resolver:", error);
        notFound();
    }

    return (
        <>
            {resolver?.type === CATEGORY && (
                <PlpPage
                    categoryProducts={categoryProducts}
                    brandCategories={brandCategories}
                    getCategory={getCategory}
                    resolverId={resolver.entity_uid}
                    currency={currency}
                />
            )}
            {resolver?.type === PRODUCT && (
                <PdpPage
                    productData={productData}
                    currency={currency}
                    lensData={lensData}
                />
            )}
        </>
    );
}
