import apolloClient from "@/lib/services/magento/apolloClient";
import { gql } from "@apollo/client";

// =========================
// Interfaces
// =========================

export interface NearbyStore {
    city: string;
    country: string;
    distance: number;
    isAudiology: 0 | 1;
    isHomeService: 0 | 1;
    isLensExpZone: 0 | 1;
    isMyopiaClinic: 0 | 1;
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
    skuQty: number | null;
}

export interface QuickFilterOption {
    attribute_code: string;
    label: string;
    value: string;
}

export interface QuickFilter {
    label: string;
    options: QuickFilterOption[];
}

export interface GetNearbyStoresResponse {
    getNearbyStores: {
        message: string;
        status: string;
        totalCount: number;
        data: NearbyStore[];
        quick_filters: QuickFilter[];
    };
}

// =========================
// GraphQL Query
// =========================

export const GET_NEARBY_STORES = gql`
    query GetNearbyStores(
        $lat: Float
        $lon: Float
        $name: String
        $isAudiology: Int
        $isMyopiaClinic: Int
        $isHomeService: Int
        $isLensExpZone: Int
        $brand: String
        $skuAvailability: Boolean
        $page: Int
        $pageSize: Int
    ) {
        getNearbyStores(
            lat: $lat
            lon: $lon
            name: $name
            isAudiology: $isAudiology
            isMyopiaClinic: $isMyopiaClinic
            isHomeService: $isHomeService
            isLensExpZone: $isLensExpZone
            brand: $brand
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
                isAudiology
                isHomeService
                isLensExpZone
                isMyopiaClinic
                landlinePrimary
                landlineSecondary
                latitude
                longitude
                name
                postcode
                secondaryName
                sourceCode
                state
                storeImage
                skuAvailability
                skuQty
            }
            quick_filters {
                label
                options {
                    attribute_code
                    label
                    value
                }
            }
        }
    }
`;

// =========================
// Function
// =========================

export async function getNearbyStores({
    lat,
    lon,
    sku = "", //
    isAudiology = 0, //
    isMyopiaClinic = 0,
    isHomeService = 0,
    isLensExpZone = 0,
    brand = "", //
    skuAvailability = true,
    page = 1,
    pageSize = 100,
}: {
    lat: number;
    lon: number;
    sku?: string;
    isAudiology?: number;
    isMyopiaClinic?: number;
    isHomeService?: number;
    isLensExpZone?: number;
    brand?: string;
    skuAvailability?: boolean;
    page?: number;
    pageSize?: number;
}): Promise<GetNearbyStoresResponse | null> {
    try {
        const { data } = await apolloClient.query<GetNearbyStoresResponse>({
            query: GET_NEARBY_STORES,
            variables: {
                lat,
                lon,
                sku,
                isAudiology,
                isMyopiaClinic,
                isHomeService,
                isLensExpZone,
                brand,
                skuAvailability,
                page,
                pageSize,
            },
            fetchPolicy: "no-cache",
        });

        return data;
    } catch (error) {
        console.error("Error fetching nearby stores:", error);
        return null;
    }
}
