import { CreateCustomerVariables } from "@/components/custom/Signup/CreateCustomer.api";
import { SendSignupOtpResponse } from "@/components/custom/Signup/SignupOtpSend.api";
// import { SendSignupOtpResponse } from '@/components/custom/Signup/SignupOtpSend.api';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CustomerState {
    customerDetails: CreateCustomerVariables | null;
    getOtpData: SendSignupOtpResponse["sendSignupOtp"] | null;
}

const initialState: CustomerState = {
    customerDetails: null,
    getOtpData: null,
};

const signupSlice = createSlice({
    name: "signupSlice",
    initialState,
    reducers: {
        setCustomerDetails: (
            state,
            action: PayloadAction<CreateCustomerVariables>,
        ) => {
            state.customerDetails = action.payload;
        },
        setGetOtpData: (
            state,
            action: PayloadAction<
                SendSignupOtpResponse["sendSignupOtp"] | null
            >,
        ) => {
            state.getOtpData = action.payload;
        },
        clearCustomerDetails: (state) => {
            state.customerDetails = null;
        },
    },
});

export const { setCustomerDetails, clearCustomerDetails, setGetOtpData } =
    signupSlice.actions;

export default signupSlice.reducer;
