import { gql } from "@apollo/client";

export interface ShiprocketTrackingActivity {
    date: string | null;
    description: string | null;
    label: string | null;
    location: string | null;
}

export interface ShiprocketTrackingData {
    awb: string;
    current_status: string | null;
    track_url: string | null;
    edd: string | null;
    activity: ShiprocketTrackingActivity[] | null;
}

export interface ShiprocketTrackingResponse {
    shiprocketTracking: ShiprocketTrackingData | null;
}

export interface ShiprocketTrackingVariables {
    awb: string;
}

export const SHIPROCKET_TRACKING_URL = gql`
    query ShiprocketTracking($awb: String!) {
        shiprocketTracking(awb: $awb) {
            awb
            current_status
            track_url
            edd
            activity {
                date
                description
                label
                location
            }
        }
    }
`;
