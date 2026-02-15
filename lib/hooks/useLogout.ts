import {
    REVOKE_CUSTOMER_TOKEN,
    RevokeCustomerTokenResponse,
} from "@/app/(default)/profile/profile.data.api";
import { useMutation, useApolloClient } from "@apollo/client";
import { useRouter } from "next/navigation";
import { deleteCookie } from "../cookie";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setLoggedIn } from "../store/features/authSlice";
import { clearCart } from "../store/cartSlice";
import { setCustomerWishlistData } from "../store/features/wishlistSlice";

export const useLogout = () => {
    const router = useRouter();
    const client = useApolloClient();
    const dispatch = useDispatch();

    const [revokeCustomerToken, { loading }] =
        useMutation<RevokeCustomerTokenResponse>(REVOKE_CUSTOMER_TOKEN);

    const clearApp = async () => {
        try {
            localStorage.clear();
            sessionStorage.clear();

            await deleteCookie("userToken");

            dispatch(setLoggedIn(false));

            dispatch(clearCart()); // Clear Redux cart
            dispatch(setCustomerWishlistData({ wishlist: null })); // Clear wishlist

            await client.clearStore();

            toast.success("Logged out successfully!");
            window.location.href = "/";
        } catch (err) {
            console.error("Error clearing app:", err);
        }
    };

    const handleLogout = async () => {
        try {
            const res = await revokeCustomerToken();

            if (res?.data?.revokeCustomerToken?.result) {
                await clearApp();
            } else {
                console.warn("Logout failed: API returned false");
            }
        } catch (err) {
            console.error("Logout API failed:", err);
            await clearApp(); // failsafe logout
        }
    };

    return { handleLogout, loading };
};
