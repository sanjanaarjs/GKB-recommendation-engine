import apolloClient from "@/lib/services/magento/apolloClient";
import { gql } from "@apollo/client";

export interface StoreLocation {
    city: string;
    country: string;
    distance: number;
    landlinePrimary: string | null;
    landlineSecondary: string | null;
    latitude: number;
    longitude: number;
    name: string;
    postcode: string;
    secondaryName: string | null;
    sourceCode: string;
    state: string;
    storeImage: string | null;
    skuAvailability: boolean;
    skuQty: number;
}

export interface GetNearbyStoresResponse {
    getNearbyStores: {
        message: string;
        status: boolean;
        totalCount: number;
        data: StoreLocation[];
    };
}

export const GET_STORELOCATION = gql`
    query GetNearbyStores(
        $lat: Float
        $lon: Float
        $sku: String!
        $city: String
        $state: String
        $skuAvailability: Boolean
        $page: Int!
        $pageSize: Int!
    ) {
        getNearbyStores(
            lat: $lat
            lon: $lon
            city: $city
            state: $state
            sku: $sku
            skuAvailability: $skuAvailability
            page: $page
            pageSize: $pageSize
        ) {
            message
            status
            totalCount
            data {
                city
                country
                distance
                landlinePrimary
                landlineSecondary
                latitude
                longitude
                name
                postcode
                secondaryName
                sourceCode
                state
                skuAvailability
                skuQty
            }
        }
    }
`;

export async function fetchNearbyStores(
    lat: number | null,
    lon: number | null,
    sku: string,
    city: string,
    state: string,
    skuAvailability: boolean | null = true,
    page: number = 1,
    pageSize: number = 100,
): Promise<GetNearbyStoresResponse["getNearbyStores"] | null> {
    try {
        const { data } = await apolloClient.query<GetNearbyStoresResponse>({
            query: GET_STORELOCATION,
            variables: {
                lat: lat ?? null,
                lon: lon ?? null,
                city: city || "",
                state: state || "",
                sku,
                skuAvailability: skuAvailability,
                page,
                pageSize,
            },
            fetchPolicy: "no-cache",
        });

        return data.getNearbyStores;
    } catch (error) {
        console.error("Error fetching nearby stores:", error);
        return null;
    }
}
