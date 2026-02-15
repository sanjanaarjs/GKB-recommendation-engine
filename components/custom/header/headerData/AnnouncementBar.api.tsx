import apolloClient from "@/lib/services/magento/apolloClient";
import { gql } from "@apollo/client";

export const GET_HOME_PAGE_DATA = gql`
    query GetHomePageDataV1($cmsIdentifier: String!, $section: String!) {
        getHomePageDataV1(cmsIdentifier: $cmsIdentifier, section: $section) {
            message
            status
            data {
                section
                cmsPageInfo {
                    content
                    content_heading
                    identifier
                    meta_description
                    meta_keywords
                    meta_title
                    page_id
                    title
                }
                itemsData {
                    additional_info
                    attachment
                    attachmentmob
                    buttontext
                    categories
                    created_at
                    description
                    link
                    name
                    product_skus
                    render_from
                    sort_order
                    status
                    updated_at
                    url_key
                    x_axis
                    y_axis
                }
            }
        }
    }
`;

export interface GetHomePageDataVariables {
    cmsIdentifier: string;
    section: string;
}
export interface GetHomePageDataResponse {
    getHomePageDataV1: {
        message: string;
        status: string;
        data: {
            section: string;
            cmsPageInfo: {
                content: string;
                content_heading: string;
                identifier: string;
                meta_description: string;
                meta_keywords: string;
                meta_title: string;
                page_id: number;
                title: string;
            };
            itemsData: {
                additional_info: string;
                attachment: string;
                attachmentmob: string;
                buttontext: string;
                categories: string;
                created_at: string;
                description: string;
                link: string;
                name: string;
                product_skus: string;
                render_from: string;
                sort_order: number;
                status: string;
                updated_at: string;
                url_key: string;
                x_axis: string;
                y_axis: string;
            }[];
        }[];
    };
}

export async function getHomePageData(
    variables: GetHomePageDataVariables,
): Promise<GetHomePageDataResponse["getHomePageDataV1"] | null> {
    try {
        const { data } = await apolloClient.query<
            GetHomePageDataResponse,
            GetHomePageDataVariables
        >({
            query: GET_HOME_PAGE_DATA,
            variables,
            fetchPolicy: "no-cache",
        });

        return data?.getHomePageDataV1 ?? null;
    } catch (error) {
        console.error("Error fetching homepage data:", error);
        return null;
    }
}
