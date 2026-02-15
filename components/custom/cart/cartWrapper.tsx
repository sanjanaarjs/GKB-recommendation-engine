"use client";

import Text from "@/components/generic/Text";
import CartItems from "./cartItems";
import CartSummary from "./cartSummary";
import ChevronRight from "@/components/icons/ChevronRight";
import ChevronLeft from "@/components/icons/ChevronLeft";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchCart } from "@/lib/store/cartSlice";
import { RootState, AppDispatch } from "@/lib/store/store";
import { getStoredCartId } from "@/lib/cart";
import { getCookieValue } from "@/lib/cookie";
import { removeItemFromCart } from "./datas/removeItemFromCart.Data.api";
import { updateCartItemQuantity } from "./datas/updateCartItemQuantity";
import toast from "react-hot-toast";
import { applyGiftCard } from "./datas/giftCard";
import { applyCouponToCart } from "./datas/applyCouponCart";
import { removeCouponFromCart } from "./datas/removeCouponCart";

export default function CartWrapper() {
    const dispatch = useDispatch<AppDispatch>();
    // cart data
    const { cartData, status } = useSelector((state: RootState) => state.cart);
    const [giftCardMessage, setGiftCardMessage] = useState<string | null>(null);
    const [couponMessage, setCouponMessage] = useState<string | null>(null);

    useEffect(() => {
        const paymentProcessed =
            typeof window !== "undefined" &&
            localStorage.getItem("PAYMENT_PROCESSED") === "true";
        if (status === "idle" && !paymentProcessed) {
            dispatch(fetchCart());
        }
    }, [dispatch, status]);

    // cart item deletion

    const handleRemoveItem = async (itemUid: string) => {
        const cartId = getStoredCartId();
        if (!cartId) {
            toast.error("Cart ID not found!");
            return;
        }

        let token = await getCookieValue("userToken");
        if (token) {
            try {
                token = atob(token);
            } catch {
                console.log("Token already decoded or not base64");
            }
        }

        const toastId = toast.loading("Removing item...");

        try {
            const result = await removeItemFromCart(
                cartId,
                itemUid,
                token ?? undefined,
            );

            if (result?.removeItemFromCart?.cart) {
                toast.dismiss(toastId);
                toast.success("Item removed from cart!");
                console.log("Item removed successfully");
                dispatch(fetchCart());
            } else {
                toast.dismiss(toastId);
                toast.error("Failed to remove item. Please try again.");
                console.warn("Failed to remove item from cart");
            }
        } catch (err) {
            toast.dismiss(toastId);
            toast.error("Something went wrong. Please try again later.");
            console.error("Error removing item from cart:", err);
        }
    };

    // update cart item quantity
    const handleQuantityChange = async (
        itemUid: string,
        newQuantity: number,
    ) => {
        const cartId = getStoredCartId();
        if (!cartId) {
            toast.error("Cart not found!");
            return;
        }

        let token = await getCookieValue("userToken");
        if (token) {
            try {
                token = atob(token);
            } catch {
                console.log("Token already decoded");
            }
        }

        const toastId = toast.loading("Updating quantity...");
        try {
            const result = await updateCartItemQuantity(
                cartId,
                itemUid,
                newQuantity,
                token ?? undefined,
            );

            if (result?.updateCartItems?.cart) {
                toast.dismiss(toastId);
                toast.success("Quantity updated successfully!");
                console.log("Quantity updated successfully");
                dispatch(fetchCart());
            } else {
                toast.dismiss(toastId);
                toast.error("Failed to update quantity. Try again.");
                console.warn("Failed to update quantity");
            }
        } catch (error) {
            toast.dismiss(toastId);
            toast.error("Something went wrong while updating quantity.");
            console.error("Error updating cart quantity:", error);
        }
    };

    // Apply & Remove Gift Card
    const handleApplyGiftCard = async (
        giftcardCode: string,
        giftcardPin: string,
        remove: boolean,
    ): Promise<boolean> => {
        const cartId = getStoredCartId();
        if (!cartId) {
            toast.error("Cart not found!");
            return false;
        }

        let token = await getCookieValue("userToken");
        if (token) {
            try {
                token = atob(token);
            } catch {
                console.log("Token already decoded or invalid");
            }
        }

        const toastId = toast.loading(
            remove ? "Removing gift card..." : "Applying gift card...",
        );

        try {
            const result = await applyGiftCard(
                cartId,
                giftcardCode,
                giftcardPin,
                remove,
                token ?? undefined,
            );

            const message = result?.applyGiftCard?.message;
            const success = result?.applyGiftCard?.success;

            toast.dismiss(toastId);

            if (success) {
                if (!remove) {
                    localStorage.setItem("giftCardMessage", message || "");
                    setGiftCardMessage(message || null);
                } else {
                    localStorage.removeItem("giftCardMessage");
                    setGiftCardMessage(null);
                }

                toast.success(
                    remove
                        ? "Gift card removed!"
                        : "Gift card applied successfully!",
                );

                dispatch(fetchCart());
                return true;
            } else {
                toast.error(message || "Gift card failed!");
                return false;
            }
        } catch (err) {
            toast.dismiss(toastId);
            toast.error("Something went wrong. Try again later.");
            console.error("Gift Card Error:", err);
            return false;
        }
    };

    // cart id reset
    useEffect(() => {
        const cartId = getStoredCartId();
        const savedMessage = localStorage.getItem("giftCardMessage");
        if (!cartId && savedMessage) {
            localStorage.removeItem("giftCardMessage");
            setGiftCardMessage(null);
        }
    }, []);

    // Apply coupon handler
    const handleApplyCoupon = async (couponCode: string) => {
        const cartId = getStoredCartId();
        if (!cartId) {
            toast.error("Cart not found!");
            return false;
        }

        let token = await getCookieValue("userToken");
        if (token) {
            try {
                token = atob(token);
            } catch (err) {
                console.log("Token already decoded or invalid", err);
            }
        }

        const toastId = toast.loading("Applying coupon...");

        try {
            const result = await applyCouponToCart(
                cartId,
                couponCode,
                token ?? undefined,
            );

            toast.dismiss(toastId);

            const appliedCoupons =
                result?.applyCouponToCart?.cart?.applied_coupons;

            if (appliedCoupons && appliedCoupons.length > 0) {
                const appliedCode = appliedCoupons[0].code;

                // localStorage - SAVED
                const message = `${appliedCode} - APPLIED`;
                localStorage.setItem("couponMessage", message);

                setCouponMessage(message);

                toast.success("Coupon applied successfully!");
                dispatch(fetchCart());
                return true;
            } else {
                toast.error("Invalid or expired coupon.");
                return false;
            }
        } catch (err: unknown) {
            toast.dismiss(toastId);

            // Magento usually returns this message
            let msg = "";
            if (typeof err === "string") {
                msg = err;
            } else if (err instanceof Error) {
                msg = err.message;
            } else if (
                typeof err === "object" &&
                err !== null &&
                "message" in err
            ) {
                const m = (err as { message?: unknown }).message;
                msg = typeof m === "string" ? m : String(m ?? "");
            }

            if (msg.includes("already applied")) {
                toast.error("Coupon already applied!");
            } else if (msg.includes("isn't valid")) {
                toast.error("Invalid or expired coupon.");
            } else {
                toast.error("Something went wrong. Try again later.");
            }

            console.error("Coupon Error:", err);
            return false;
        }
    };

    useEffect(() => {
        const savedCoupon = localStorage.getItem("couponMessage");
        if (savedCoupon) {
            setCouponMessage(savedCoupon);
        }
    }, []);

    // Remove Coupon Handler

    const handleRemoveCoupon = async () => {
        const cartId = getStoredCartId();
        if (!cartId) {
            toast.error("Cart not found!");
            return false;
        }

        let token = await getCookieValue("userToken");
        if (token) {
            try {
                token = atob(token);
            } catch (err) {
                console.log("Token already decoded or invalid", err);
            }
        }

        const toastId = toast.loading("Removing coupon...");

        try {
            const result = await removeCouponFromCart(
                cartId,
                token ?? undefined,
            );

            toast.dismiss(toastId);

            const applied = result?.removeCouponFromCart?.cart?.applied_coupons;

            if (!applied || applied.length === 0) {
                /** REMOVE message from localStorage */
                localStorage.removeItem("couponMessage");

                /** REMOVE message from state */
                setCouponMessage("");

                toast.success("Coupon removed!");

                dispatch(fetchCart());
                return true;
            } else {
                toast.error("Failed to remove coupon.");
                return false;
            }
        } catch (err) {
            toast.dismiss(toastId);
            console.error("Error removing coupon:", err);
            toast.error("Something went wrong.");
            return false;
        }
    };

    return (
        <div className="p-5 lg:px-20 2xl:px-[168px] bg-white">
            <div className="flex items-center gap-2 justify-start py-2 lg:hidden">
                <ChevronLeft size={16} fill="black" />
                <Text
                    as={"h4"}
                    className="font-helvetica text-[14px] font-normal text-font-main leading-normal"
                >
                    Back
                </Text>
            </div>
            <div className="flex items-center justify-between lg:border-b lg:py-[80px]">
                <Text
                    as={"h1"}
                    className="font-helvetica text-[28px] lg:text-[3rem] font-light leading-normal"
                >
                    your cart
                </Text>
                <button
                    type="button"
                    className="text-[1.5rem] font-helvetica italic leading-normal font-medium cursor-pointer flex items-start gap-4 hidden"
                >
                    Wishlist
                    <div className="italic">
                        <ChevronRight size={16} fill="black" />
                    </div>
                </button>
            </div>
            <div className="flex flex-col lg:flex-row">
                <CartItems
                    cartData={cartData}
                    handleRemoveItem={handleRemoveItem}
                    handleQuantityChange={handleQuantityChange}
                />
                {(cartData?.items?.length ?? 0) > 0 && (
                    <CartSummary
                        cartData={cartData}
                        handleApplyGiftCard={handleApplyGiftCard}
                        giftCardMessage={giftCardMessage ?? ""}
                        handleApplyCoupon={handleApplyCoupon}
                        couponMessage={couponMessage ?? ""}
                        handleRemoveCoupon={handleRemoveCoupon}
                    />
                )}
            </div>
        </div>
    );
}
