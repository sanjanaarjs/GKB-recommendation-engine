import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    clearStoredCartId,
    getStoredCartId,
    setStoredCartId,
} from "@/lib/cart";
import {
    createGuestCart,
    getCustomerCart,
} from "@/components/custom/pdp/datas/addToCart/customerCart.Data.api";
import {
    getCartDetails,
    GetCartDetailsResponse,
} from "@/components/custom/pdp/datas/addToCart/getCart.Data.api";
import { getCookieValue } from "@/lib/cookie";

interface CartState {
    cartData: GetCartDetailsResponse["cart"] | null;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null; // added error state
}

// Async thunk to fetch cart from API (with proper rejection)
export const fetchCart = createAsyncThunk<
    GetCartDetailsResponse["cart"] | null,
    void,
    { rejectValue: string }
>("cart/fetchCart", async (_, { rejectWithValue }) => {
    let token: string | null = null;

    try {
        const id = getStoredCartId();
        if (!id) {
            return rejectWithValue("No cart ID found in localStorage");
        }

        token = (await getCookieValue("userToken")) ?? null;
        if (token) {
            try {
                token = atob(token);
            } catch {
                console.log("Token already decoded or not base64");
            }
        }

        const result = await getCartDetails(id, token ?? undefined);

        if (!result || !result.cart) {
            return rejectWithValue("No cart data returned from API");
        }

        return result.cart;
    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error
                ? error.message
                : "Failed to fetch cart data";

        const isInactiveCart = errorMessage
            .toLowerCase()
            .includes("cart isn't active");

        if (isInactiveCart) {
            clearStoredCartId();

            let newCartId: string | null = null;

            if (token) {
                const customerCart = await getCustomerCart(token ?? undefined);
                newCartId = customerCart?.customerCart?.id ?? null;
            } else {
                const guestCart = await createGuestCart();
                newCartId = guestCart?.createGuestCart?.cart?.id ?? null;
            }

            if (newCartId) {
                setStoredCartId(newCartId);
                const retry = await getCartDetails(
                    newCartId,
                    token ?? undefined,
                );

                if (retry?.cart) {
                    return retry.cart;
                }
            }

            return rejectWithValue(
                "Cart was inactive. A new cart was created.",
            );
        }

        return rejectWithValue(errorMessage);
    }
});

// Initial state
const initialState: CartState = {
    cartData: null,
    status: "idle",
    error: null,
};

// Slice
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        clearCart: (state) => {
            state.cartData = {
                id: "empty",
                items: [],
                total_quantity: 0,
                is_virtual: false,
                shipping_addresses: [],
                prices: {
                    grand_total: { value: 0, currency: "INR" },
                    subtotal_excluding_tax: { value: 0, currency: "INR" },
                    subtotal_including_tax: { value: 0, currency: "INR" },
                    giftcard: undefined,
                    discounts: [],
                },
            };
            state.status = "idle";
            state.error = null;
        },
        setCartData: (state, action) => {
            state.cartData = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.status = "loading";
                state.error = null; // clear previous errors
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.cartData = action.payload;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || "Unknown error occurred";
                state.cartData = null;
            });
    },
});

export default cartSlice.reducer;
export const { clearCart, setCartData } = cartSlice.actions;
