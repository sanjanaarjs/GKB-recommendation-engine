import { gql } from "@apollo/client";
import apolloClient from "@/lib/services/magento/apolloClient";

export const SEND_SIGNUP_OTP = gql`
    mutation SendSignupOtp($email: String!) {
        sendSignupOtp(email: $email) {
            message
            success
            otpResendTime
        }
    }
`;

export interface SendSignupOtpVariables {
    email: string;
}

export interface SendSignupOtpResponse {
    sendSignupOtp: {
        message: string;
        success: boolean;
        otpResendTime: number;
    };
}

export async function getOtp(
    mailId: string,
): Promise<SendSignupOtpResponse["sendSignupOtp"] | null> {
    try {
        const { data } = await apolloClient.mutate<
            SendSignupOtpResponse,
            SendSignupOtpVariables
        >({
            mutation: SEND_SIGNUP_OTP,
            variables: {
                email: mailId,
            },
            fetchPolicy: "no-cache",
        });

        return data?.sendSignupOtp ?? null;
    } catch (error) {
        console.error("Error sending signup OTP:", error);
        return null;
    }
}
