import { gql } from "@apollo/client";
import apolloClient from "@/lib/services/magento/apolloClient";

// Response type
export interface UploadPrescriptionResponse {
    uploadPrescription: {
        message: string;
        success: boolean;
        downloadUrl: string;
        id: string;
    };
}

// Variables type
export interface UploadPrescriptionVariables {
    attachment: {
        prescriptionName: string;
        fileName: string;
        path: string;
        type: string;
        prescriptionType: string | undefined;
    };
}
// GraphQL mutation
export const UPLOAD_PRESCRIPTION = gql`
    mutation UploadPrescription($attachment: PrescriptionAttachmentInput!) {
        uploadPrescription(attachment: $attachment) {
            message
            success
            downloadUrl
            id
        }
    }
`;

// Secure API call
export async function uploadPrescription(
    variables: UploadPrescriptionVariables["attachment"],
): Promise<UploadPrescriptionResponse | null> {
    try {
        const { data } = await apolloClient.mutate<UploadPrescriptionResponse>({
            mutation: UPLOAD_PRESCRIPTION,
            variables: { attachment: variables },
            fetchPolicy: "no-cache",
        });

        return data || null;
    } catch (error) {
        console.error("Error uploading prescription:", error);
        return null;
    }
}
