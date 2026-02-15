import apolloClient from "@/lib/services/magento/apolloClient";
import { gql } from "@apollo/client";

export type SendSigninOtpResponse = {
    sendSigninOtp: {
        message: string;
        success: boolean;
        otpResendTime: number;
    };
};
type SendSigninOtpVariables = {
    identifier: string;
};

const SEND_SIGNIN_OTP = gql`
    mutation SendSigninOtp($identifier: String!) {
        sendSigninOtp(identifier: $identifier) {
            message
            success
            otpResendTime
        }
    }
`;

export async function getSigninOtp(
    identifier: string,
): Promise<SendSigninOtpResponse["sendSigninOtp"] | null> {
    try {
        const { data } = await apolloClient.mutate<
            SendSigninOtpResponse,
            SendSigninOtpVariables
        >({
            mutation: SEND_SIGNIN_OTP,
            variables: {
                identifier,
            },
            fetchPolicy: "no-cache",
        });
        return data?.sendSigninOtp ?? null;
    } catch (error) {
        console.error("Error fetching products:", error);
        return null;
    }
}
