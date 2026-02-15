import {
    ProductFilterInput,
    ProductItem,
    ProductSortInput,
} from "@/components/custom/plp/datas/productData.api";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PlpState {
    products: ProductItem[];
    filters: ProductFilterInput | null;
    sort: ProductSortInput | null;
    resolverId: string | null;
}

const initialState: PlpState = {
    products: [],
    filters: null,
    sort: null,
    resolverId: null,
};

export const plpSlice = createSlice({
    name: "plp",
    initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<ProductItem[]>) => {
            state.products = action.payload;
        },
        setFilters: (state, action: PayloadAction<ProductFilterInput>) => {
            state.filters = action.payload;
        },
        setSort: (state, action: PayloadAction<ProductSortInput>) => {
            state.sort = action.payload;
        },
        setResolverId: (state, action: PayloadAction<string>) => {
            state.resolverId = action.payload;
        },
        clearPlpCache: (state) => {
            state.products = [];
            state.filters = null;
            state.sort = null;
            state.resolverId = null;
        },
    },
});

export const {
    setProducts,
    setFilters,
    setSort,
    setResolverId,
    clearPlpCache,
} = plpSlice.actions;
export default plpSlice.reducer;
