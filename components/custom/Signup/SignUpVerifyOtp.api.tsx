import { gql } from "@apollo/client";
import apolloClient from "@/lib/services/magento/apolloClient";

export const SEND_VERIFY_OTP = gql`
    mutation verifySignupOtp($email: String!, $otp: String!) {
        verifySignupOtp(email: $email, otp: $otp) {
            message
            success
        }
    }
`;

export interface VerifySignupOtpVariables {
    email: string;
    otp: string;
}

export interface VerifySignupOtpResponse {
    verifySignupOtp: {
        message: string;
        success: boolean;
    };
}

export async function verifyOtp(
    mailId: string,
    otp: string,
): Promise<VerifySignupOtpResponse["verifySignupOtp"] | null> {
    try {
        const { data } = await apolloClient.mutate<
            VerifySignupOtpResponse,
            VerifySignupOtpVariables
        >({
            mutation: SEND_VERIFY_OTP,
            variables: {
                email: mailId,
                otp: otp,
            },
            fetchPolicy: "no-cache",
        });

        return data?.verifySignupOtp ?? null;
    } catch (error) {
        console.error("Error verifying signup OTP:", error);
        return null;
    }
}
