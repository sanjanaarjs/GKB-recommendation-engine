import { gql } from "@apollo/client";
import apolloClient from "@/lib/services/magento/apolloClient";

export interface UrlResolverType {
    canonical_url: string;
    entity_uid: string;
    id: number;
    redirectCode: number;
    relative_url: string;
    type: string;
}

export interface UrlResolverResponse {
    urlResolver: UrlResolverType;
}

// export const URL_RESOLVER_BRANDS_QUERY = gql`
//   query UrlResolver {
//     urlResolver(url: "brands.html") {
//       canonical_url
//       entity_uid
//       id
//       redirectCode
//       relative_url
//       type
//     }
//   }
// `;

export const URL_RESOLVER_QUERY = gql`
    query UrlResolver($url: String!) {
        urlResolver(url: $url) {
            canonical_url
            entity_uid
            id
            redirectCode
            relative_url
            type
        }
    }
`;

export async function resolveUrlPath(
    url: string,
): Promise<UrlResolverType | null> {
    try {
        const { data } = await apolloClient.query<UrlResolverResponse>({
            query: URL_RESOLVER_QUERY,
            variables: { url },
            fetchPolicy: "no-cache",
        });

        return data.urlResolver;
    } catch (error) {
        console.error("Error resolving brands URL:", error);
        return null;
    }
}
