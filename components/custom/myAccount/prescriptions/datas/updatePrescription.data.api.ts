import { gql } from "@apollo/client";

export interface UpdatePrescriptionResponse {
    updatePrescription: {
        message: string;
        success: boolean;
    };
}

export interface UpdatePrescriptionVariables {
    prescriptionId: number;
    isDelete: number;
    prescriptionName?: string;
}

export const UPDATE_PRESCRIPTION = gql`
    mutation updatePrescription(
        $prescriptionId: Int!
        $isDelete: Int!
        $prescriptionName: String
    ) {
        updatePrescription(
            attachment: {
                prescriptionId: $prescriptionId
                isDelete: $isDelete
                prescriptionName: $prescriptionName
            }
        ) {
            message
            success
        }
    }
`;
