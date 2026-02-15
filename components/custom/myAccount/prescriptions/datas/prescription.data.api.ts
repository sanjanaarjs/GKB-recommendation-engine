import { gql } from "@apollo/client";

export const GET_MY_PRESCRIPTIONS = gql`
    query GetMyPrescriptions {
        getMyPrescriptions {
            data {
                id
                prescriptionName
                prescriptionPath
                prescriptionType
                downloadUrl
                addedOn
            }
            message
            success
        }
    }
`;

export interface Prescription {
    id: string;
    prescriptionName: string;
    prescriptionPath: string;
    prescriptionType: string;
    downloadUrl: string;
    userName?: string | null;
    addedOn?: string | null;
}

export interface GetMyPrescriptionsResponse {
    getMyPrescriptions: {
        data: Prescription[];
        message: string;
        success: boolean;
    };
}

export interface PrescriptionCardProps {
    prescription: {
        id: string | number;
        prescriptionName: string;
        prescriptionPath?: string;
        prescriptionType?: string;
        downloadUrl?: string;
        addedOn?: string | null;
    };
    onDelete?: (id: string | number) => void;
}
