import apolloClient from "@/lib/services/magento/apolloClient";
import { gql } from "@apollo/client";

type VerifySigninOtpResponse = {
    verifySigninOtp: {
        message: string;
        success: boolean;
        token: string | null; // use `string` if token is always present
    };
};

type VerifySigninOtpVariables = {
    identifier: string;
    otp: string;
};

const VERIFY_SIGNIN_OTP = gql`
    mutation VerifySigninOtp($identifier: String!, $otp: String!) {
        verifySigninOtp(identifier: $identifier, otp: $otp) {
            message
            success
            token
        }
    }
`;

export async function getSigninVerifyOtp(
    identifier: string,
    otp: string,
): Promise<VerifySigninOtpResponse["verifySigninOtp"] | null> {
    try {
        const { data } = await apolloClient.mutate<
            VerifySigninOtpResponse,
            VerifySigninOtpVariables
        >({
            mutation: VERIFY_SIGNIN_OTP,
            variables: {
                identifier,
                otp,
            },
            fetchPolicy: "no-cache",
        });
        return data?.verifySigninOtp ?? null;
    } catch (error) {
        console.error("Error fetching products:", error);
        return null;
    }
}
