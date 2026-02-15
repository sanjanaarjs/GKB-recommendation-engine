import { gql } from "@apollo/client";

export type StoreConfigResponse = {
    storeConfig: {
        header_logo_src: string | null;
        base_media_url: string | null;
        logo_alt: string | null;
        logo_height: number | null;
        logo_width: number | null;
        logo_url: string | null;
    };
};

export const STORE_LABEL_QUERY = gql`
    query StoreConfig {
        storeConfig {
            search_label
            search_placeholder
        }
    }
`;
