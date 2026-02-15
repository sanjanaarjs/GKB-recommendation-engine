import { CustomerAddress } from "@/app/(default)/profile/profile.data.api";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CheckoutFormState {
    currentStep: number;
    userInput: string;
    selectedEmail: string;
    selectedAddress: CustomerAddress | null;
    selectedShippingAddress: number | null;
    selectedBillingAddress: number | null;
    selectedPaymentMethod: string | null;
    stepHistory: number[];
    // Address form fields
    addressForm: {
        sameAsShipping: boolean;
        shipping: {
            phone: string;
            email: string;
            firstName: string;
            lastName: string;
            street: string;
            state: string;
            city: string;
            pincode: string;
            regionId: number;
        };
        billing: {
            phone: string;
            email: string;
            firstName: string;
            lastName: string;
            street: string;
            state: string;
            city: string;
            pincode: string;
            regionId: number;
        };
    };
}

const initialState: CheckoutFormState = {
    currentStep: 1,
    userInput: "",
    selectedEmail: "",
    selectedAddress: null,
    selectedShippingAddress: null,
    selectedBillingAddress: null,
    selectedPaymentMethod: null,
    stepHistory: [],
    addressForm: {
        sameAsShipping: true,
        shipping: {
            phone: "",
            email: "",
            firstName: "",
            lastName: "",
            street: "",
            state: "",
            city: "",
            pincode: "",
            regionId: 0,
        },
        billing: {
            phone: "",
            email: "",
            firstName: "",
            lastName: "",
            street: "",
            state: "",
            city: "",
            pincode: "",
            regionId: 0,
        },
    },
};

const checkoutFormSlice = createSlice({
    name: "checkoutForm",
    initialState,
    reducers: {
        setCurrentStep: (state, action: PayloadAction<number>) => {
            // Add current step to history before changing
            if (state.currentStep !== action.payload) {
                state.stepHistory.push(state.currentStep);
            }
            state.currentStep = action.payload;
        },
        goToPreviousStep: (state) => {
            if (state.stepHistory.length > 0) {
                const previousStep = state.stepHistory.pop();
                if (previousStep !== undefined) {
                    state.currentStep = previousStep;
                }
            }
        },
        setUserInput: (state, action: PayloadAction<string>) => {
            state.userInput = action.payload;
        },
        setSelectedEmail: (state, action: PayloadAction<string>) => {
            state.selectedEmail = action.payload;
        },
        setSelectedAddress: (
            state,
            action: PayloadAction<CustomerAddress | null>,
        ) => {
            state.selectedAddress = action.payload;
        },
        setSelectedShippingAddress: (
            state,
            action: PayloadAction<number | null>,
        ) => {
            state.selectedShippingAddress = action.payload;
        },
        setSelectedBillingAddress: (
            state,
            action: PayloadAction<number | null>,
        ) => {
            state.selectedBillingAddress = action.payload;
        },
        setSelectedPaymentMethod: (
            state,
            action: PayloadAction<string | null>,
        ) => {
            state.selectedPaymentMethod = action.payload;
        },
        resetCheckoutForm: (state) => {
            Object.assign(state, initialState);
        },
        // Restore specific step data when going back
        restoreStepData: (
            state,
            action: PayloadAction<{
                step: number;
                data: Partial<CheckoutFormState>;
            }>,
        ) => {
            const { step, data } = action.payload;
            if (state.currentStep === step) {
                Object.assign(state, data);
            }
        },
        // Address form actions
        setSameAsShipping: (state, action: PayloadAction<boolean>) => {
            state.addressForm.sameAsShipping = action.payload;
        },
        setShippingFormField: (
            state,
            action: PayloadAction<{
                field: keyof CheckoutFormState["addressForm"]["shipping"];
                value: string | number;
            }>,
        ) => {
            const { field, value } = action.payload;
            state.addressForm.shipping[field] = value as never;
        },
        setBillingFormField: (
            state,
            action: PayloadAction<{
                field: keyof CheckoutFormState["addressForm"]["billing"];
                value: string | number;
            }>,
        ) => {
            const { field, value } = action.payload;
            state.addressForm.billing[field] = value as never;
        },
        setAddressFormData: (
            state,
            action: PayloadAction<Partial<CheckoutFormState["addressForm"]>>,
        ) => {
            Object.assign(state.addressForm, action.payload);
        },
        clearAddressForm: (state) => {
            state.addressForm = initialState.addressForm;
        },
    },
});

export const {
    setCurrentStep,
    goToPreviousStep,
    setUserInput,
    setSelectedEmail,
    setSelectedAddress,
    setSelectedShippingAddress,
    setSelectedBillingAddress,
    setSelectedPaymentMethod,
    resetCheckoutForm,
    restoreStepData,
    setSameAsShipping,
    setShippingFormField,
    setBillingFormField,
    setAddressFormData,
    clearAddressForm,
} = checkoutFormSlice.actions;

export default checkoutFormSlice.reducer;
