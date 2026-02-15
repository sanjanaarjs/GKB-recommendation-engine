import { GetCustomerResponse } from "@/app/(default)/profile/profile.data.api";
import { GetAvailablePaymentMethodsResponse } from "@/components/custom/checkout/datas/getAvailablePaymentMethod.api";
import { GetCountryResponse } from "@/components/custom/checkout/datas/getCountriedwithRegion.api";
import { PlaceOrderResponse } from "@/components/custom/checkout/datas/placeOrder.api";
import { SetBillingAddressOnCartResponse } from "@/components/custom/checkout/datas/setBillingAddressOnCart.api";
import { SetGuestEmailOnCartResponse } from "@/components/custom/checkout/datas/setGuestEmailOnCart.api";
import { SetPaymentMethodOnCartResponse } from "@/components/custom/checkout/datas/setPaymentMethodOnCart.api";
import { SetShippingAddressesOnCartResponse } from "@/components/custom/checkout/datas/setShippingAddressesOnCart.api";
import { SetShippingMethodsOnCartResponse } from "@/components/custom/checkout/datas/setShippingMethodsOnCart.api";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CheckoutState {
    availablePaymentMethodData: GetAvailablePaymentMethodsResponse | null;
    countriesData: GetCountryResponse | null;
    guestEmailOnCartData: SetGuestEmailOnCartResponse | null;
    shippingAddressData: SetShippingAddressesOnCartResponse | null;
    billingAddressData: SetBillingAddressOnCartResponse | null;
    shippingMethodsData: SetShippingMethodsOnCartResponse | null;
    paymentMethodsData: SetPaymentMethodOnCartResponse | null;
    placeOrderData: PlaceOrderResponse | null;
    customerAddressData: GetCustomerResponse | null;
}

const initialState: CheckoutState = {
    availablePaymentMethodData: null,
    countriesData: null,
    guestEmailOnCartData: null,
    shippingAddressData: null,
    billingAddressData: null,
    shippingMethodsData: null,
    paymentMethodsData: null,
    placeOrderData: null,
    customerAddressData: null,
};

const checkoutSlice = createSlice({
    name: "checkout",
    initialState,
    reducers: {
        setAvailablePaymentMethodData: (
            state,
            action: PayloadAction<GetAvailablePaymentMethodsResponse>,
        ) => {
            state.availablePaymentMethodData = action.payload;
        },
        setCountriesData: (
            state,
            action: PayloadAction<GetCountryResponse>,
        ) => {
            state.countriesData = action.payload;
        },
        setGuestEmailOnCartData: (
            state,
            action: PayloadAction<SetGuestEmailOnCartResponse>,
        ) => {
            state.guestEmailOnCartData = action.payload;
        },
        setShippingAddressData: (
            state,
            action: PayloadAction<SetShippingAddressesOnCartResponse>,
        ) => {
            state.shippingAddressData = action.payload;
        },
        setBillingAddressData: (
            state,
            action: PayloadAction<SetBillingAddressOnCartResponse>,
        ) => {
            state.billingAddressData = action.payload;
        },
        setShippingMethodsData: (
            state,
            action: PayloadAction<SetShippingMethodsOnCartResponse>,
        ) => {
            state.shippingMethodsData = action.payload;
        },
        setPaymentMethodsData: (
            state,
            action: PayloadAction<SetPaymentMethodOnCartResponse>,
        ) => {
            state.paymentMethodsData = action.payload;
        },
        setPlaceOrderData: (
            state,
            action: PayloadAction<PlaceOrderResponse>,
        ) => {
            state.placeOrderData = action.payload;
        },
        clearPlaceOrderData: (state) => {
            state.placeOrderData = null;
        },
        setCustomerAddressData: (
            state,
            action: PayloadAction<GetCustomerResponse>,
        ) => {
            state.customerAddressData = action.payload;
        },
    },
});

export const {
    setAvailablePaymentMethodData,
    setCountriesData,
    setGuestEmailOnCartData,
    setShippingAddressData,
    setBillingAddressData,
    setShippingMethodsData,
    setPaymentMethodsData,
    setPlaceOrderData,
    clearPlaceOrderData,
    setCustomerAddressData,
} = checkoutSlice.actions;
export default checkoutSlice.reducer;
