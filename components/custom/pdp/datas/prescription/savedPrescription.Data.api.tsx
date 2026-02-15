import { gql } from "@apollo/client";

export interface GetSavedPrescriptionResponse {
    getMyPrescriptions: {
        data: Prescription[];
        message: string;
        success: boolean;
    };
}

export interface Prescription {
    id: string;
    prescriptionName: string;
    prescriptionPath: string;
    prescriptionType: string;
    downloadUrl: string;
}

export const GET_SAVED_PRESCRIPTION = gql`
    query GetMyPrescriptions {
        getMyPrescriptions {
            data {
                id
                prescriptionName
                prescriptionPath
                prescriptionType
                downloadUrl
            }
            message
            success
        }
    }
`;
