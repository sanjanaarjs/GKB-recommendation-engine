import { WishlistQueryResult } from "@/lib/services/magento/wishlist/customerWishlist_graphql";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WishlistState {
    customerWishlistData: WishlistQueryResult | null;
}

const initialState: WishlistState = {
    customerWishlistData: null,
};

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        setCustomerWishlistData: (
            state,
            action: PayloadAction<WishlistQueryResult>,
        ) => {
            console.log("wishlistSlice", action.payload);
            state.customerWishlistData = action.payload;
        },
    },
});

export const { setCustomerWishlistData } = wishlistSlice.actions;
export default wishlistSlice.reducer;
