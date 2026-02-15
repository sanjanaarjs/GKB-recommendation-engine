"use client";

import * as React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ImageGridQR from "./imgaeGridQr";
import PdpBanner from "./banner";
import SimilarFrames from "./similarFrames";
import RecentProducts from "./recentProducts";
import DualImageGrid from "./dualImageGrid";
import Slider from "./slider";
import { PdpPageProps } from "@/components/custom/pdp/datas/pdpData.api";
import { useState, useEffect } from "react";
import { saveSkuToHistory } from "@/lib/utils";
import ProductDetail from "./details/ProductDetail";
import GiftPackaging from "./details/GiftPacking";
import WarrantyAuthenticity from "./details/Authenticity";
import ShippingReturn from "./details/ShippingReturn";
import {
    createGuestCart,
    getCustomerCart,
} from "./datas/addToCart/customerCart.Data.api";
import { getCookieValue } from "@/lib/cookie";
import { addSimpleProductsToCart } from "./datas/addToCart/addSimpleProductsToCart.Data.api";
import { getStoredCartId, setStoredCartId } from "@/lib/cart";
import { addLenseProductsToCart } from "./datas/addToCart/addLenseProductsToCart.Data.api";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store/store";
import { fetchCart } from "@/lib/store/cartSlice";
import { addContactLensToCart } from "./datas/addToCart/addContactProductsToCart.Data.api";
import toast from "react-hot-toast";

export default function PdpWrapper({
    productData,
    currency,
    lensData,
}: Readonly<PdpPageProps>) {
    const dispatch = useDispatch<AppDispatch>();
    const [loading, setLoading] = React.useState(false);
    const productContent =
        productData?.products?.items?.[0]?.product_content ?? [];

    const isPowerLensFlow = React.useMemo(() => {
        return (
            productData?.products?.items?.[0]?.type_of_product ===
            "contact_lens"
        );
    }, [productData]);
    const [leftEyeQuantity, setLeftEyeQuantity] = useState(1);
    const [rightEyeQuantity, setRightEyeQuantity] = useState(1);
    const grandTotal = leftEyeQuantity + rightEyeQuantity;

    useEffect(() => {
        if (productData && productData?.products?.items?.[0]?.sku) {
            saveSkuToHistory(productData?.products?.items?.[0]?.sku);
        }
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [productData]);

    const components = [
        {
            content: <ProductDetail productData={productData} />,
        },
        {
            content: <ShippingReturn productContent={productContent} />,
        },
        {
            content: <GiftPackaging productContent={productContent} />,
        },
        {
            content: <WarrantyAuthenticity productContent={productContent} />,
        },
    ];

    const productSku = productData?.products.items?.[0].sku;

    // add the simple products to cart
    const handleAddToCart = async (payload?: {
        lense_options?: string;
        selected_contact_lens?: string;
    }) => {
        const toastId = toast.loading("Adding product to cart...");
        try {
            setLoading(true);

            let cartId: string | null | undefined = getStoredCartId();

            // TOKEN
            const token = await getCookieValue("userToken");
            let userToken = null;

            if (token) {
                try {
                    userToken = atob(token);
                } catch {
                    userToken = token;
                }
            }

            // CUSTOMER CART
            if (userToken) {
                const customer = await getCustomerCart(userToken);
                const customerCartId = customer?.customerCart?.id;

                if (customerCartId) {
                    cartId = customerCartId;
                    setStoredCartId(cartId);
                }
            }

            // GUEST CART
            if (!cartId) {
                const guest = await createGuestCart();
                cartId = guest?.createGuestCart?.cart?.id;

                if (cartId) {
                    setStoredCartId(cartId);
                }
            }

            if (!cartId || !productSku) return;

            // ==============================
            //   CONTACT LENS FLOW
            // ==============================
            if (payload?.selected_contact_lens) {
                const contactResult = await addContactLensToCart(
                    cartId,
                    productSku,
                    payload.selected_contact_lens,
                    grandTotal,
                    userToken ?? undefined,
                );

                if (contactResult?.addLenseProductsToCart?.cart) {
                    toast.dismiss(toastId);
                    toast.success("Product added to cart!");
                    dispatch(fetchCart());
                } else {
                    toast.dismiss(toastId);
                    toast.error("Failed to add product");
                }

                return;
            }

            // ==============================
            //        LENSE FLOW
            // ==============================
            if (payload?.lense_options) {
                const lensResult = await addLenseProductsToCart(
                    cartId,
                    productSku,
                    payload.lense_options,
                    userToken ?? undefined,
                );

                if (lensResult?.addLenseProductsToCart?.cart) {
                    toast.dismiss(toastId);
                    toast.success("Product added to cart!");
                    dispatch(fetchCart());
                } else {
                    toast.dismiss(toastId);
                    toast.error("Failed to add product");
                }

                return;
            }

            // ==============================
            //      SIMPLE PRODUCT FLOW
            // ==============================
            const simpleResult = await addSimpleProductsToCart(
                cartId,
                productSku,
                userToken ?? undefined,
            );

            const simpleItems =
                simpleResult?.addSimpleProductsToCart?.cart?.itemsV2?.items ??
                [];

            toast.dismiss(toastId);

            if (simpleItems.length > 0) {
                toast.success("Product added to cart!");
                dispatch(fetchCart());
            } else {
                toast.error("Failed to add product");
            }
        } catch (error) {
            toast.dismiss(toastId);
            toast.error("Something went wrong. Please try again.");
            console.error("Error adding product to cart:", error);
        } finally {
            setLoading(false);
        }
    };

    const filteredProductContent = productContent.filter(
        (tab) => tab.tag !== "prescription_storelocator",
    );

    return (
        <>
            <Slider
                productData={productData}
                currency={currency}
                lensData={lensData}
                isPowerLensFlow={isPowerLensFlow}
                handleAddToCart={(payload) => handleAddToCart(payload)}
                loading={loading}
                leftEyeQuantity={leftEyeQuantity}
                setLeftEyeQuantity={setLeftEyeQuantity}
                rightEyeQuantity={rightEyeQuantity}
                setRightEyeQuantity={setRightEyeQuantity}
            />

            <div className="p-5 lg:p-20 bg-background-grey">
                <Tabs defaultValue={`${0}`} className="w-full">
                    <TabsList className="w-full justify-start p-0 py-5 px-8 h-13 bg-white no-scrollbar overflow-auto overflow-y-hidden">
                        {filteredProductContent.map((tab, index) => (
                            <TabsTrigger
                                key={tab.tag_label ?? `trigger-${index}`}
                                value={`${index}`}
                                className="cursor-pointer relative h-13 text-gray-500 font-semibold text-base
        data-[state=active]:text-black
        data-[state=active]:after:absolute
        data-[state=active]:after:w-14 data-[state=active]:after:h-[4px]
        data-[state=active]:after:bg-sky-500
        data-[state=active]:after:bottom-0 data-[state=active]:after:left-1/2
        data-[state=active]:after:-translate-x-1/2 !shadow-none"
                            >
                                {tab.tag_label ?? `Tab ${index + 1}`}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {filteredProductContent.map((tab, index) => (
                        <TabsContent
                            key={tab.tag_label ?? `tab-${index}`}
                            value={`${index}`}
                            className="mt-4 text-gray-700"
                        >
                            {components[index]?.content ?? (
                                <div>Component not Available !!</div>
                            )}
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
            {!isPowerLensFlow && (
                <>
                    <ImageGridQR productContent={productContent} />
                    <PdpBanner productContent={productContent} />
                </>
            )}

            <SimilarFrames
                products={
                    productData?.products?.items?.[0]?.related_products ?? []
                }
            />
            <RecentProducts />
            <DualImageGrid productContent={productContent} />
        </>
    );
}
