import apolloClient from "@/lib/services/magento/apolloClient";
import { gql } from "@apollo/client";

export interface CmsPage {
    identifier: string;
    url_key: string;
    title: string;
    content: string;
    content_heading: string | null;
    page_layout: string | null;
    meta_title: string | null;
    meta_description: string | null;
    meta_keywords: string | null;
}

export interface CmsPageResponse {
    cmsPage: CmsPage | null;
}

export interface CmsPageVariables {
    identifier: string;
}

export const GET_CMS_PAGE = gql`
    query CmsPage($identifier: String!) {
        cmsPage(identifier: $identifier) {
            identifier
            url_key
            title
            content
            content_heading
            page_layout
            meta_title
            meta_description
            meta_keywords
        }
    }
`;

export async function getCmsPage(identifier: string): Promise<CmsPage | null> {
    try {
        const { data } = await apolloClient.query<
            CmsPageResponse,
            CmsPageVariables
        >({
            query: GET_CMS_PAGE,
            variables: { identifier },
            fetchPolicy: "no-cache",
        });

        return data?.cmsPage ?? null;
    } catch (error) {
        console.error("[getCmsPage] Error fetching cms page:", error);
        return null;
    }
}
