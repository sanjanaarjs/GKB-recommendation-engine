import { SendSigninOtpResponse } from "@/components/custom/header/login/Datas/loginData.api";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    value: number;
    getSigninOtpData: SendSigninOtpResponse["sendSigninOtp"] | null;
    isLoggedIn: boolean;
}

const initialState: AuthState = {
    value: 0,
    getSigninOtpData: null,
    isLoggedIn: false,
};

const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        setGetSigninOtpData: (
            state,
            action: PayloadAction<
                SendSigninOtpResponse["sendSigninOtp"] | null
            >,
        ) => {
            state.getSigninOtpData = action.payload;
        },
        setLoggedIn: (state, action: PayloadAction<boolean>) => {
            state.isLoggedIn = action.payload;
        },
    },
});

export const { increment, decrement, setGetSigninOtpData, setLoggedIn } =
    authSlice.actions;
export default authSlice.reducer;
