// /lib/cart.ts

export const getStoredCartId = (): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("cart_id");
};

export const setStoredCartId = (id: string) => {
    if (typeof window === "undefined") return;
    localStorage.setItem("cart_id", id);
};

export const clearStoredCartId = () => {
    if (typeof window === "undefined") return;
    localStorage.removeItem("cart_id");
};
