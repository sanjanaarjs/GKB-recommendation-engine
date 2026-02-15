import apolloClient from "@/lib/services/magento/apolloClient";
import { gql } from "@apollo/client";

/** ----------------- Types ----------------- */
export interface FooterCmsPageInfo {
    content: string;
    content_heading: string;
    identifier: string;
    meta_description: string;
    meta_keywords: string;
    meta_title: string;
    page_id: string;
    title: string;
}

export interface FooterItemData {
    additional_info: string | null;
    attachment: string | null;
    attachmentmob: string | null;
    buttontext: string | null;
    categories: string | null;
    product_skus: string | null;
    created_at: string;
    description: string | null;
    link: string | null;
    name: string;
    render_from: string | null;
    sort_order: number;
    status: string;
    updated_at: string;
    url_key: string | null;
    x_axis: string | null;
    y_axis: string | null;
}

export interface FooterDataV1 {
    section: string;
    cmsPageInfo: FooterCmsPageInfo;
    itemsData: FooterItemData[];
}

/** ----------------- Query Response Types ----------------- */
export interface GetFooterDataV1Response {
    getHomePageDataV1: {
        message: string;
        status: string;
        data: FooterDataV1[];
    };
}

export interface GetFooterDataV1Variables {
    cmsIdentifier: string;
    section: string;
}

/** ----------------- Query ----------------- */
export const GET_FOOTER_DATA_V1 = gql`
    query GetFooterDataV1($cmsIdentifier: String!, $section: String!) {
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
                    product_skus
                    created_at
                    description
                    link
                    name
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

/** ----------------- Service Function ----------------- */
export const getFooterHomePageData = async (
    cmsIdentifier: string,
    section: string,
): Promise<FooterDataV1[]> => {
    try {
        const { data } = await apolloClient.query<
            GetFooterDataV1Response,
            GetFooterDataV1Variables
        >({
            query: GET_FOOTER_DATA_V1,
            variables: { cmsIdentifier, section },
            fetchPolicy: "no-cache",
        });

        const block = data?.getHomePageDataV1;

        if (!block?.status || !block?.data?.length) {
            console.warn("[getFooterHomePageData] No footer data returned.");
            return [];
        }

        return block.data;
    } catch (error) {
        console.error("[getFooterHomePageData] Error fetching data:", error);
        return [];
    }
};

export async function getFooterSections() {
    const sections = Array.from(
        { length: 8 },
        (_, i) => `footer_section_${i + 1}`,
    );

    const results = await Promise.all(
        sections.map((section) => getFooterHomePageData("footer", section)),
    );

    return results;
}
