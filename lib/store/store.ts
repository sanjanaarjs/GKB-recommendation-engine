import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import signupReducer from "./features/signupSlice";
import plpReducer from "./features/plpSlice";
import wishlistReducer from "./features/wishlistSlice";
import cartReducer from "./cartSlice";
import checkoutRedcer from "./checkoutSlice";
import checkoutFormReducer from "./checkoutFormSlice";
import currencyReducer from "./currencySlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        signupSlice: signupReducer,
        plpSlice: plpReducer,
        wishlistSlice: wishlistReducer,
        cart: cartReducer,
        checkout: checkoutRedcer,
        checkoutForm: checkoutFormReducer,
        currency: currencyReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
