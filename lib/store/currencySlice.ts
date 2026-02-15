import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AppState {
    currencySymbol: string;
}

const initialState: AppState = {
    currencySymbol: "₹", // fallback
};

const currencySlice = createSlice({
    name: "currency",
    initialState,
    reducers: {
        setCurrencySymbol(state, action: PayloadAction<string>) {
            state.currencySymbol = action.payload;
        },
    },
});

export const { setCurrencySymbol } = currencySlice.actions;
export default currencySlice.reducer;
