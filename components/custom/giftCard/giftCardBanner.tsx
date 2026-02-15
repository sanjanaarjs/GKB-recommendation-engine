import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Text from "@/components/generic/Text";
import React, { useEffect, useRef, useState } from "react";
import Plus from "@/components/icons/Plus";
import Image from "next/image";
import ChevronRight from "@/components/icons/ChevronRight";
import Bag from "@/components/icons/Bag";
import TruckDelivery from "@/components/icons/TruckDelivery";
import { Input } from "@/components/ui/input";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import ChevronLeft from "@/components/icons/ChevronLeft";
import BrandSlider from "./brandSlider";
import QuantitySelector from "@/components/generic/QuantitySelector/QuantitySelector";
import { CustomizableOptionValue, ProductItem } from "./datas/giftCardPdp.api";
import {
    addProductsToCart,
    AddToCartItemInput,
} from "./datas/giftCardAddtocart.api";
import { getStoredCartId, setStoredCartId } from "@/lib/cart";
import { getCookieValue } from "@/lib/cookie";
import {
    GET_CUSTOMERCART_ID,
    GET_GUESTCART_ID,
} from "../pdp/datas/addToCart/customerCart.Data.api";
import SuccessMessageModals from "@/components/generic/modals/successMessageModals";
import { useLazyQuery, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { fetchCart } from "@/lib/store/cartSlice";
import { AppDispatch } from "@/lib/store/store";
import { useDispatch } from "react-redux";
import { useLenis } from "lenis/react";
import {
    getPhysicalGiftCardPdp,
    PhysicalGiftCardProductItem,
} from "./datas/physicalGiftCardPdp.api";
import toast from "react-hot-toast";

// Define Schema - now accepts enabled flag to conditionally validate recipient fields
const createGiftCardSchema = (isForSelf: boolean) =>
    z.object({
        amount: z.string().min(1, "Please select an amount"),
        recipientName: isForSelf
            ? z.string().optional()
            : z.string().min(1, "Recipient name is required"),
        recipientEmail: isForSelf
            ? z.string().optional()
            : z.string().email("Enter a valid email"),
        senderName: z.string().min(1, "Your name is required"),
        senderEmail: z.string().email("Enter a valid email"),
        message: z
            .string()
            .max(200, "Message cannot exceed 200 characters")
            .optional()
            .or(z.literal("")),
        sendDate: z.string().min(1, "Please select a date"),
    });

type GiftCardForm = z.infer<ReturnType<typeof createGiftCardSchema>>;

interface GiftCardPageWrapperProps {
    giftcardData: ProductItem | undefined;
}

export default function GiftCardBanner({
    giftcardData,
}: GiftCardPageWrapperProps) {
    const [selectedSwatchKey, setSelectedSwatchKey] =
        useState<string>("giftcard-black");

    const [enabled, setEnabled] = useState(false);
    const [activeTab, setActiveTab] = useState<"digital" | "physical">(
        "digital",
    );
    const [physicalGiftCardData, setPhysicalGiftCardData] =
        useState<PhysicalGiftCardProductItem | null>(null);
    const [isPhysicalLoading, setIsPhysicalLoading] = useState(false);
    const [loading, setLoading] = React.useState(false);
    const [showPopup, setShowPopup] = React.useState(false);
    const [selectedAmount, setSelectedAmount] = React.useState<string>("");
    const [isAmountSheetOpen, setIsAmountSheetOpen] = useState(false);
    const [physicalOptionTypeId, setPhysicalOptionTypeId] =
        useState<string>("");
    const [physicalQuantity, setPhysicalQuantity] = useState<number>(1);
    const today = new Date().toISOString().split("T")[0];
    const lenis = useLenis();

    const [physicalUrlKey, setPhysicalUrlKey] =
        useState<string>("giftcard-black");
    const physicalPdpCache = useRef<
        Record<string, PhysicalGiftCardProductItem>
    >({});

    // -------------------------------------------------------
    // Fetch physical gift card PDP on tab switch
    // -------------------------------------------------------
    useEffect(() => {
        if (activeTab !== "physical") return;
        if (!physicalUrlKey) return;

        // If cached, use it immediately (NO loading)
        if (physicalPdpCache.current[physicalUrlKey]) {
            setPhysicalGiftCardData(physicalPdpCache.current[physicalUrlKey]);
            return;
        }

        const fetchPhysicalGiftCard = async () => {
            try {
                setIsPhysicalLoading(true);
                const response = await getPhysicalGiftCardPdp(physicalUrlKey);
                const item = response?.products?.items?.[0];
                console.log("Fetched physical gift card PDP", item);

                if (item) {
                    physicalPdpCache.current[physicalUrlKey] = item;
                    setPhysicalGiftCardData(item);
                }
            } catch (error) {
                console.error("Physical PDP fetch failed", error);
            } finally {
                setIsPhysicalLoading(false);
            }
        };

        fetchPhysicalGiftCard();
    }, [activeTab, physicalUrlKey]);

    useEffect(() => {
        if (!physicalGiftCardData?.color_swatch?.length) return;

        const current =
            physicalGiftCardData.color_swatch.find(
                (s) => s.url_key === physicalUrlKey,
            ) ||
            physicalGiftCardData.color_swatch.find(
                (s) => s.is_current === "1",
            ) ||
            physicalGiftCardData.color_swatch[0];

        if (current?.url_key) {
            setSelectedSwatchKey(current.url_key);
        }
    }, [physicalGiftCardData, physicalUrlKey]);

    // ADD THIS PREFETCH EFFECT HERE
    useEffect(() => {
        if (!physicalGiftCardData?.color_swatch?.length) return;

        physicalGiftCardData.color_swatch.forEach((swatch) => {
            const key = swatch.url_key;

            if (!key) return;

            // already cached → skip
            if (physicalPdpCache.current[key]) return;

            // background prefetch (NO loading state)
            getPhysicalGiftCardPdp(key)
                .then((response) => {
                    const item = response?.products?.items?.[0];
                    if (item) {
                        physicalPdpCache.current[key] = item;
                    }
                })
                .catch(() => {
                    // silent fail – never block UI
                });
        });
    }, [physicalGiftCardData]);

    useEffect(() => {
        console.log("physicalGiftCardData", physicalGiftCardData);

        if (
            physicalGiftCardData?.customizable_options?.[0]?.value?.length &&
            !physicalOptionTypeId
        ) {
            const firstOption =
                physicalGiftCardData.customizable_options[0].value[0];

            setPhysicalOptionTypeId(String(firstOption.option_type_id));
            setSelectedAmount(firstOption.price.toString());
        }
    }, [physicalGiftCardData, physicalOptionTypeId]);

    // swatches more btn
    const visibleColors = physicalGiftCardData?.color_swatch?.slice(0, 3) || [];
    const activeSwatch =
        physicalGiftCardData?.color_swatch?.find(
            (s) => s.url_key === selectedSwatchKey,
        ) ??
        physicalGiftCardData?.color_swatch?.find((s) => s.is_current === "1");

    // header

    useEffect(() => {
        if (isAmountSheetOpen) {
            lenis?.stop();
            document.body.style.overflow = "hidden";
        } else {
            lenis?.start();
            document.body.style.overflow = "";
        }

        return () => {
            lenis?.start();
            document.body.style.overflow = "";
        };
    }, [isAmountSheetOpen, lenis]);

    // Apollo hooks
    const [createGuestCart] = useMutation(GET_GUESTCART_ID);
    const [fetchCustomerCart] = useLazyQuery(GET_CUSTOMERCART_ID);

    // extract all gift card options dynamically (sort-order based)
    const sortedOptions = React.useMemo(() => {
        if (!giftcardData?.options) return [];
        return [...giftcardData.options].sort(
            (a, b) => a.sort_order - b.sort_order,
        );
    }, [giftcardData]);

    // map each option to correct UI section based ONLY on sort_order
    const amountOption = sortedOptions[0]; // Dropdown (prices)
    const recipientNameOption = sortedOptions[1]; // Recipient name textbox
    const recipientEmailOption = sortedOptions[2]; // Recipient email textbox
    const senderNameOption = sortedOptions[3]; // Sender name
    const senderEmailOption = sortedOptions[4]; // Sender email
    const messageOption = sortedOptions[5]; // Message textarea
    const dateOption = sortedOptions[6]; // Date input
    const dispatch = useDispatch<AppDispatch>();

    // local form state (stores values mapped to UID)
    const [form, setForm] = React.useState<Record<string, string>>({});

    // generic handler for all inputs
    const updateFormValue = (uid: string, value: string) => {
        setForm((prev) => ({ ...prev, [uid]: value }));
    };

    const physicalAmountOption = physicalGiftCardData?.customizable_options
        ?.length
        ? physicalGiftCardData.customizable_options[0]
        : null;

    const buildEnteredOptionsFromFormData = (formData: GiftCardForm) => {
        const options = [];

        // Amount (always required)
        if (amountOption?.uid && form[amountOption.uid]) {
            options.push({
                uid: amountOption.uid,
                value: form[amountOption.uid],
            });
        }

        // Recipient Name & Email
        if (enabled) {
            // If buying for myself, use sender data for recipient fields
            if (recipientNameOption?.uid && recipientEmailOption?.uid) {
                options.push({
                    uid: recipientNameOption.uid,
                    value: formData.senderName,
                });
                options.push({
                    uid: recipientEmailOption.uid,
                    value: formData.senderEmail,
                });
            }
        } else {
            // Otherwise use actual recipient data
            if (recipientNameOption?.uid) {
                options.push({
                    uid: recipientNameOption.uid,
                    value: formData.recipientName || "",
                });
            }
            if (recipientEmailOption?.uid) {
                options.push({
                    uid: recipientEmailOption.uid,
                    value: formData.recipientEmail || "",
                });
            }
        }

        // Sender Name & Email (always include)
        options.push({
            uid: senderNameOption.uid,
            value: formData.senderName,
        });
        options.push({
            uid: senderEmailOption.uid,
            value: formData.senderEmail,
        });

        // Message (if not buying for self and has value)
        if (!enabled && formData.message && messageOption?.uid) {
            options.push({
                uid: messageOption.uid,
                value: formData.message,
            });
        }

        // Date (always required)
        if (dateOption?.uid && form[dateOption.uid]) {
            options.push({
                uid: dateOption.uid,
                value: form[dateOption.uid],
            });
        }

        return options;
    };
    let defaultAmountPrice = "";
    let defaultAmountTypeId = "";

    if (amountOption?.__typename === "CustomizableDropDownOption") {
        const firstOption = amountOption.value?.[0]; // fully typed now
        if (firstOption) {
            defaultAmountPrice = firstOption.price.toString();
            defaultAmountTypeId = firstOption.option_type_id.toString();
        }
    }

    // React Hook Form setup - resolver updates dynamically based on enabled state
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<GiftCardForm>({
        resolver: zodResolver(createGiftCardSchema(enabled)),
        defaultValues: {
            amount: defaultAmountPrice, // DEFAULT FIRST PRICE
            recipientName: "",
            recipientEmail: "",
            senderName: "",
            senderEmail: "",
            message: "",
            sendDate: "",
        },
    });

    // form submit wrapper
    const onSubmit = (data: GiftCardForm) => {
        let finalData = { ...data };

        if (enabled) {
            // AUTO FILL RECIPIENT = SENDER (when buying for self)
            finalData.recipientName = data.senderName;
            finalData.recipientEmail = data.senderEmail;

            // UPDATE UID VALUES (For Magento) - use sender values for recipient
            if (recipientNameOption?.uid && recipientEmailOption?.uid) {
                updateFormValue(recipientNameOption.uid, data.senderName);
                updateFormValue(recipientEmailOption.uid, data.senderEmail);
            }
        } else {
            // Ensure recipient fields are set in form state for Magento
            // (they should already be set via onChange, but ensure they're in the form object)
            if (data.recipientName) {
                updateFormValue(recipientNameOption.uid, data.recipientName);
            }
            if (data.recipientEmail) {
                updateFormValue(recipientEmailOption.uid, data.recipientEmail);
            }
        }
        handleAddToCart(finalData);
    };

    const handleAddToCart = async (formData: GiftCardForm) => {
        try {
            setLoading(true);

            let cartId: string | null | undefined = getStoredCartId();

            // ------------------------------------
            // CHECK IF USER IS LOGGED IN (TOKEN)
            // ------------------------------------
            const token = await getCookieValue("userToken");
            let userToken = null;

            if (token) {
                try {
                    userToken = atob(token);
                } catch {
                    userToken = token; // already decoded
                }
            }

            // ------------------------------------
            // CUSTOMER CART
            // ------------------------------------
            if (userToken) {
                const { data } = await fetchCustomerCart();
                const customerCartId = data?.customerCart?.id;

                if (customerCartId) {
                    setStoredCartId(customerCartId);
                }
            }

            // ------------------------------------
            // GUEST CART
            // ------------------------------------
            if (!cartId) {
                const { data } = await createGuestCart();
                cartId = data?.createGuestCart?.cart?.id;

                if (cartId) setStoredCartId(cartId);
            }

            // Safety check
            if (!cartId) {
                console.error("Failed to get a valid cart ID");
                return;
            }

            // ------------------------------------
            // BUILD CART ITEMS PAYLOAD
            // (hardcoded for now — replace later)
            // ------------------------------------

            const cartItems = [
                {
                    sku: giftcardData?.sku ?? "giftcard",
                    quantity: 1,
                    entered_options: buildEnteredOptionsFromFormData(formData),
                },
            ];

            // ------------------------------------
            // CALL ADD TO CART MUTATION
            // ------------------------------------
            const response = await addProductsToCart(cartId, cartItems);

            if (response?.addProductsToCart?.user_errors?.length) {
                toast.error("Unable to add product");
            } else {
                toast.success("Product added to cart");
                dispatch(fetchCart());
            }
        } catch (error) {
            console.error("Error in Add to Cart:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddPhysicalToCart = async () => {
        try {
            setLoading(true);

            let cartId = getStoredCartId();

            // ------------------------------------
            // CHECK LOGIN
            // ------------------------------------
            const token = await getCookieValue("userToken");
            let userToken = null;

            if (token) {
                try {
                    userToken = atob(token);
                } catch {
                    userToken = token;
                }
            }

            if (userToken) {
                const { data } = await fetchCustomerCart();
                if (data?.customerCart?.id) {
                    cartId = data?.customerCart?.id;
                    if (cartId) setStoredCartId(cartId);
                }
            }

            if (!cartId) {
                const { data } = await createGuestCart();
                cartId = data?.createGuestCart?.cart?.id;
                if (cartId) setStoredCartId(cartId);
                console.log("Created guest cart with ID:", cartId);
            }

            if (!cartId || !physicalOptionTypeId) {
                console.error("Missing cartId or option_type_id");
                return;
            }

            if (
                !physicalGiftCardData?.sku ||
                !physicalGiftCardData?.customizable_options?.[0]?.uid ||
                !physicalOptionTypeId
            ) {
                console.error("Missing physical gift card data");
                return;
            }

            // ------------------------------------
            // MINIMAL PAYLOAD
            // ------------------------------------
            const cartItems: AddToCartItemInput[] = [
                {
                    sku: physicalGiftCardData?.sku,
                    quantity: physicalQuantity,
                    entered_options: [
                        {
                            uid: physicalGiftCardData?.customizable_options?.[0]
                                .uid,
                            value: physicalOptionTypeId,
                        },
                    ],
                },
            ];

            const response = await addProductsToCart(cartId, cartItems);

            if (response?.addProductsToCart?.user_errors?.length) {
                toast.error("Unable to add product");
            } else {
                toast.success("Product added to cart");
                dispatch(fetchCart());
            }
        } catch (err) {
            console.error("Physical add to cart failed", err);
        } finally {
            setLoading(false);
        }
    };

    // APPLY DEFAULT SELECTED AMOUNT WHEN COMPONENT LOADS
    React.useEffect(() => {
        if (amountOption?.uid && defaultAmountTypeId) {
            updateFormValue(amountOption.uid, defaultAmountTypeId);
            setSelectedAmount(defaultAmountPrice);
        }
    }, [amountOption]);

    const handleSwatchClick = (color: any) => {
        if (!color.url_key) return;

        setSelectedSwatchKey(color.url_key);
        setPhysicalUrlKey(color.url_key);

        // reset dependent state
        setPhysicalOptionTypeId("");
        setSelectedAmount("");
    };
    return (
        <>
            <div className="lg:flex bg-font-secondary/5">
                <div className="lg:flex-1 lg:flex hidden">
                    {giftcardData?.thumbnail?.url && (
                        <Image
                            src={giftcardData?.thumbnail?.url}
                            alt="Gift Card Banner"
                            width={1307}
                            height={873}
                            className="w-full h-auto lg:h-full object-cover"
                        />
                    )}
                </div>
                <div className="lg:flex-1 lg:pt-12 lg:pl-12 lg:pr-20">
                    <Button
                        className="flex gap-2 items-center p-[10px] cursor-pointer mx-6 my-2 lg:hidden shadow-none"
                        aria-label="Go back"
                    >
                        <ChevronLeft className="w-6 h-6" fill="black" />
                        <Text>Back</Text>
                    </Button>
                    <Text
                        font="helvetica"
                        weight="light"
                        size="xl5"
                        className="leading-16 mb-12 md:block hidden"
                    >
                        {activeSwatch?.name ??
                            physicalGiftCardData?.name ??
                            "Gift Card"}
                    </Text>
                    <Text
                        font="avenir"
                        size="base"
                        color="fontMain"
                        weight="fontblack"
                        className="px-10 py-6 md:hidden block"
                    >
                        {activeSwatch?.name ??
                            physicalGiftCardData?.name ??
                            "Gift Card"}
                    </Text>
                    <div className="bg-gray-50 flex items-center justify-center lg:hidden">
                        <BrandSlider giftcardData={giftcardData} />
                    </div>
                    <div>
                        <Tabs
                            value={activeTab}
                            onValueChange={(v) =>
                                setActiveTab(v as "digital" | "physical")
                            }
                        >
                            <div className="overflow-x-auto w-full scrollbar-hide">
                                <TabsList className="lg:mt-6 lg:mb-8 mx-10 mb-4 mt-[23px] lg:mx-0">
                                    <TabsTrigger
                                        value="digital"
                                        className="mr-4 px-8 py-2 text-base lg:py-3 lg:px-18 lg:w-[203px] lg:h-[47px]
  rounded-[40px] cursor-pointer border border-border-color-light transition-colors font-extrabold
  bg-white text-font-main data-[state=active]:font-extrabold
  data-[state=active]:bg-black data-[state=active]:text-white"
                                    >
                                        digital
                                    </TabsTrigger>

                                    <TabsTrigger
                                        value="physical"
                                        className="mr-4 px-8 py-2 text-base lg:py-3 lg:px-18 h-8 lg:w-[203px] lg:h-[47px]
  rounded-[40px] cursor-pointer border border-border-color-light transition-colors font-extrabold
  bg-white text-font-main data-[state=active]:font-extrabold
  data-[state=active]:bg-black data-[state=active]:text-white"
                                    >
                                        physical
                                    </TabsTrigger>
                                </TabsList>
                            </div>
                            <TabsContent value="digital">
                                <Text
                                    font="helvetica"
                                    size="base"
                                    color="fontMain"
                                    weight="light"
                                    className="leading-[22px] lg:block hidden"
                                >
                                    Accompanied by a personalized message,
                                    digital gift cards can be purchased in any
                                    amount between Rs 500 and Rs 50,000. Your
                                    recipient will receive the gift via email on
                                    your chosen date, ensuring a thoughtful and
                                    perfectly timed surprise.
                                </Text>
                                <Text
                                    font="helvetica"
                                    size="sm"
                                    weight="normal"
                                    className="block lg:hidden px-10"
                                >
                                    Instantly send a digital card via email to
                                    your loved ones.
                                </Text>
                                {/* <div className="flex lg:flex-row flex-col lg:gap-12 lg:items-center lg:border-b lg:border-b-border-color-light">
                                    <div className="flex items-center gap-4 lg:py-6 lg:mb-4 lg:mt-4 pt-8 pb-4 px-10 lg:px-0">
                                        {colors.map((color, idx) => (
                                            <button
                                                key={color}
                                                type="button"
                                                onClick={() =>
                                                    setSelectedColor(idx)
                                                }
                                                aria-pressed={
                                                    selectedColor === idx
                                                }
                                                className={`flex items-center justify-center cursor-pointer p-[6px] rounded-full
            ${selectedColor === idx ? "border-2 border-black" : "border-none"}
          `}
                                            >
                                                <span
                                                    className="block h-12 w-12 rounded-full"
                                                    style={{
                                                        backgroundColor: color,
                                                    }}
                                                ></span>
                                            </button>
                                        ))}

                                        <Button
                                            className="flex items-center gap-2 cursor-pointer lg:hidden"
                                            aria-label="Show more colors"
                                        >
                                            <Plus size={16} fill="black" />
                                            <Text
                                                font="helvetica"
                                                size="sm"
                                                weight="normal"
                                                className="italic"
                                            >
                                                More
                                            </Text>
                                        </Button>
                                    </div>
                                    <div className="flex gap-2 items-center px-10 pb-8 lg:p-0 border-b border-b-border-color-light lg:border-none">
                                        <Text
                                            font="helvetica"
                                            size="productTitle1"
                                            weight="customWeight1"
                                            className="lg:text-font-main"
                                        >
                                            Theme:
                                        </Text>
                                        <Text
                                            font="helvetica"
                                            size="productTitle1"
                                            weight="extrabold"
                                            className="lg:text-font-main"
                                        >
                                            GKB Blue
                                        </Text>
                                    </div>
                                </div> */}
                                <div className="border-b border-b-border-color-light">
                                    {/* dynamic selected amount display */}
                                    <div className="py-8 px-10 lg:px-0">
                                        <div className="flex items-center mb-2 justify-between">
                                            <Sheet
                                                open={isAmountSheetOpen}
                                                onOpenChange={
                                                    setIsAmountSheetOpen
                                                }
                                            >
                                                <SheetTrigger asChild>
                                                    <Button
                                                        className="cursor-pointer p-0 flex items-center gap-2 w-full bg-transparent shadow-none text-left"
                                                        aria-label="Select gift card amount"
                                                        onClick={() =>
                                                            setIsAmountSheetOpen(
                                                                true,
                                                            )
                                                        }
                                                    >
                                                        <Text
                                                            font="helvetica"
                                                            size="base"
                                                            weight="light"
                                                            color="fontMain"
                                                            className="hidden lg:block w-full"
                                                        >
                                                            Select gift card
                                                            amount
                                                        </Text>
                                                        <Text
                                                            font="helvetica"
                                                            size="base"
                                                            weight="light"
                                                            color="fontMain"
                                                            className="block lg:hidden w-full"
                                                        >
                                                            Select an amount
                                                        </Text>

                                                        <div>
                                                            <ChevronRight
                                                                className="w-6 h-6"
                                                                fill="black"
                                                            />
                                                        </div>
                                                    </Button>
                                                </SheetTrigger>

                                                <SheetContent
                                                    className="overflow-auto"
                                                    data-lenis-prevent
                                                >
                                                    <SheetHeader>
                                                        <SheetTitle>
                                                            <div className="flex items-center gap-2">
                                                                <ChevronLeft
                                                                    className="w-6 h-6 block lg:hidden"
                                                                    fill="black"
                                                                />
                                                                <Text
                                                                    font="helvetica"
                                                                    size="sm"
                                                                    weight="extrabold"
                                                                >
                                                                    Select
                                                                    amount
                                                                </Text>
                                                            </div>
                                                        </SheetTitle>
                                                        <SheetDescription></SheetDescription>
                                                    </SheetHeader>

                                                    {amountOption?.__typename ===
                                                        "CustomizableDropDownOption" &&
                                                        amountOption.value?.map(
                                                            (v) => (
                                                                <div
                                                                    key={
                                                                        v.option_type_id
                                                                    }
                                                                    className="p-6 h-[66px] mx-6 my-4 shadow-[0_6px_24px_0_rgba(0,0,0,0.10)] flex items-center gap-1 cursor-pointer"
                                                                    onClick={() => {
                                                                        // UPDATE FORM (send option_type_id)
                                                                        updateFormValue(
                                                                            amountOption.uid,
                                                                            String(
                                                                                v.option_type_id,
                                                                            ),
                                                                        );

                                                                        setValue(
                                                                            "amount",
                                                                            v.price.toString(),
                                                                        );

                                                                        // SHOW SELECTED AMOUNT
                                                                        setSelectedAmount(
                                                                            v.price.toString(),
                                                                        );

                                                                        // CLOSE SHEET SAFELY
                                                                        setIsAmountSheetOpen(
                                                                            false,
                                                                        );
                                                                    }}
                                                                >
                                                                    <span>
                                                                        ₹
                                                                    </span>
                                                                    <span className="font-helvetica font-extrabold text-base">
                                                                        {v.price.toLocaleString(
                                                                            "en-IN",
                                                                        )}
                                                                    </span>
                                                                </div>
                                                            ),
                                                        )}
                                                </SheetContent>
                                            </Sheet>
                                        </div>

                                        {/* DISPLAY SELECTED VALUE — default = MIN price */}
                                        <span>₹</span>
                                        <Text
                                            font="helvetica"
                                            size="base"
                                            weight="extrabold"
                                            as="span"
                                        >
                                            {selectedAmount
                                                ? Number(
                                                      selectedAmount,
                                                  ).toLocaleString("en-IN")
                                                : amountOption?.__typename ===
                                                    "CustomizableDropDownOption"
                                                  ? amountOption.value[0]?.price.toLocaleString(
                                                        "en-IN",
                                                    )
                                                  : ""}
                                        </Text>
                                    </div>
                                    {/* NEW CODE END */}

                                    <div className="flex lg:hidden justify-between items-center bg-primary-500 py-4 px-10 fixed bottom-0 left-0 right-0 z-99">
                                        <div className="flex items-center gap-2">
                                            <Text
                                                font="helvetica"
                                                color="fontMain"
                                                size="sm"
                                                weight="normal"
                                            >
                                                Total
                                            </Text>
                                            <span>₹</span>
                                            <Text
                                                font="helvetica"
                                                size="base"
                                                weight="extrabold"
                                                as="span"
                                            >
                                                {selectedAmount
                                                    ? Number(
                                                          selectedAmount,
                                                      ).toLocaleString("en-IN")
                                                    : amountOption?.__typename ===
                                                        "CustomizableDropDownOption"
                                                      ? amountOption.value[0]?.price.toLocaleString(
                                                            "en-IN",
                                                        )
                                                      : ""}
                                            </Text>
                                        </div>
                                        <button
                                            onClick={handleSubmit(onSubmit)}
                                            className="bg-font-main rounded-[40px] w-[140px] h-8 px-8 cursor-pointer"
                                        >
                                            <Text
                                                size="base"
                                                weight="normal"
                                                color="white"
                                                font="helvetica"
                                                className="whitespace-nowrap"
                                            >
                                                add to cart
                                            </Text>
                                        </button>
                                    </div>
                                </div>
                                <div className="py-8 flex flex-col gap-4 px-10 lg:px-0 border-b border-b-border-color-light">
                                    {!enabled && (
                                        <>
                                            <Text
                                                font="helvetica"
                                                color="fontMain"
                                                size="base"
                                                weight="light"
                                            >
                                                Send to:
                                            </Text>
                                            <div className="flex lg:flex-row flex-col gap-4">
                                                <div className="flex-1">
                                                    <label
                                                        htmlFor="recipient-name"
                                                        className="sr-only"
                                                    >
                                                        Recipient’s name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        {...register(
                                                            "recipientName",
                                                        )}
                                                        onChange={(e) => {
                                                            register(
                                                                "recipientName",
                                                            ).onChange(e);
                                                            updateFormValue(
                                                                recipientNameOption.uid,
                                                                e.target.value,
                                                            );
                                                        }}
                                                        placeholder={`* ${recipientNameOption?.title}`}
                                                        className="w-full px-6 pt-[15px] font-helvetica pb-[11px] border border-border-color-light bg-white rounded-full text-font-main placeholder-font-main font-light h-[48px]"
                                                    />
                                                    {errors.recipientName && (
                                                        <p className="text-red-500 mt-2 ml-2">
                                                            {
                                                                errors
                                                                    .recipientName
                                                                    .message
                                                            }
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="flex-1">
                                                    <label
                                                        htmlFor="recipient-email"
                                                        className="sr-only"
                                                    >
                                                        Recipient’s email
                                                    </label>
                                                    <input
                                                        type="text"
                                                        {...register(
                                                            "recipientEmail",
                                                        )}
                                                        onChange={(e) => {
                                                            register(
                                                                "recipientEmail",
                                                            ).onChange(e);
                                                            updateFormValue(
                                                                recipientEmailOption.uid,
                                                                e.target.value,
                                                            );
                                                        }}
                                                        placeholder={`* ${recipientEmailOption?.title}`}
                                                        className="w-full px-6 pt-[15px] font-helvetica pb-[11px] border border-border-color-light bg-white rounded-full text-font-main placeholder-font-main font-light h-[48px]"
                                                    />
                                                    {errors.recipientEmail && (
                                                        <p className="text-red-500 mt-2 ml-2">
                                                            {
                                                                errors
                                                                    .recipientEmail
                                                                    .message
                                                            }
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </>
                                    )}
                                    <div className="flex gap-4 items-center">
                                        <button
                                            type="button"
                                            role="switch"
                                            aria-checked={enabled}
                                            onClick={() => setEnabled(!enabled)}
                                            className={`relative inline-flex h-6 w-11 items-center rounded-full cursor-pointer transition-colors duration-300 ${
                                                enabled
                                                    ? "bg-green-500"
                                                    : "bg-gray-300"
                                            }`}
                                        >
                                            <span
                                                className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform duration-300 ${
                                                    enabled
                                                        ? "translate-x-5"
                                                        : "translate-x-0"
                                                }`}
                                            />
                                        </button>
                                        <Text
                                            font="helvetica"
                                            size="sm"
                                            weight="light"
                                        >
                                            I am buying this gift card for
                                            myself
                                        </Text>
                                    </div>
                                </div>
                                <div className="py-8 flex flex-col gap-4 px-10 lg:px-0 border-b border-b-border-color-light">
                                    <Text
                                        font="helvetica"
                                        color="fontMain"
                                        size="base"
                                        weight="light"
                                    >
                                        From:
                                    </Text>
                                    <div className="flex lg:flex-row flex-col gap-4">
                                        <div className="flex-1">
                                            <input
                                                type="text"
                                                {...register("senderName")}
                                                onChange={(e) => {
                                                    register(
                                                        "senderName",
                                                    ).onChange(e);
                                                    updateFormValue(
                                                        senderNameOption.uid,
                                                        e.target.value,
                                                    );
                                                }}
                                                placeholder={`* ${senderNameOption?.title}`}
                                                className="w-full px-6 pt-[15px] font-helvetica pb-[11px] lg:flex-1 border border-border-color-light bg-white rounded-full text-font-main placeholder-font-main font-light h-[48px]"
                                            />
                                            {errors.senderName && (
                                                <p className="text-red-500 ml-2 mt-2">
                                                    {errors.senderName.message}
                                                </p>
                                            )}
                                        </div>
                                        <div className="lg:flex-1">
                                            <input
                                                type="text"
                                                {...register("senderEmail")}
                                                onChange={(e) => {
                                                    register(
                                                        "senderEmail",
                                                    ).onChange(e);
                                                    updateFormValue(
                                                        senderEmailOption.uid,
                                                        e.target.value,
                                                    );
                                                }}
                                                placeholder={`* ${senderEmailOption?.title}`}
                                                className="w-full px-6 pt-[15px] font-helvetica pb-[11px] border border-border-color-light bg-white rounded-full text-font-main placeholder-font-main font-light h-[48px]"
                                            />
                                            {errors.senderEmail && (
                                                <p className="text-red-500 ml-2 mt-2">
                                                    {errors.senderEmail.message}
                                                </p>
                                            )}
                                            <Text
                                                font="helvetica"
                                                size="sm"
                                                weight="light"
                                                className="text-font-secondary block lg:hidden mt-2"
                                            >
                                                You will also receive the email
                                                for security reasons
                                            </Text>
                                        </div>
                                    </div>
                                    {!enabled && (
                                        <>
                                            <textarea
                                                {...register("message")}
                                                maxLength={200}
                                                onChange={(e) => {
                                                    register(
                                                        "message",
                                                    ).onChange(e);
                                                    updateFormValue(
                                                        messageOption.uid,
                                                        e.target.value,
                                                    );
                                                }}
                                                placeholder={
                                                    messageOption?.title
                                                }
                                                className="w-full h-[112px] text-font-main placeholder-font-main px-6 py-4 border border-border-color-light bg-white rounded-[12px] font-helvetica text-base font-light outline-none resize-none focus:border-black"
                                            ></textarea>
                                            {errors.message && (
                                                <p className="text-red-500">
                                                    {errors.message.message}
                                                </p>
                                            )}
                                        </>
                                    )}
                                </div>
                                <div className="py-8 px-10 lg:px-0">
                                    <Text
                                        font="helvetica"
                                        color="fontMain"
                                        size="base"
                                        weight="light"
                                        className="mb-3"
                                    >
                                        {dateOption.title}
                                    </Text>
                                    <Input
                                        type="date"
                                        min={today}
                                        {...register("sendDate")}
                                        placeholder="* Send on (dd/mm/yyyy)"
                                        onChange={(e) => {
                                            register("sendDate").onChange(e);
                                            const date = e.target.value;
                                            if (date) {
                                                const now = new Date();
                                                const timeString = now
                                                    .toTimeString()
                                                    .slice(0, 8);
                                                const finalDate = `${date} ${timeString}`;
                                                updateFormValue(
                                                    dateOption.uid,
                                                    finalDate,
                                                );
                                            }
                                        }}
                                        className="w-full px-6 pt-[15px] h-12 bg-white font-helvetica pb-[11px] block rounded-[40px] border border-border-color-light"
                                    />
                                    {errors.sendDate && (
                                        <p className="text-red-500 mt-2 ml-2">
                                            {errors.sendDate.message}
                                        </p>
                                    )}
                                </div>
                                <div className="hidden lg:flex justify-center">
                                    <button
                                        onClick={handleSubmit(onSubmit)}
                                        disabled={loading}
                                        className="flex justify-center items-center gap-2 lg:mt-10 px-18 py-3 bg-font-main rounded-[40px] w-[364px] h-[47px] cursor-pointer"
                                    >
                                        <Bag size={20} className="text-white" />
                                        <Text
                                            size="base"
                                            weight="normal"
                                            color="white"
                                            font="helvetica"
                                            className="whitespace-nowrap"
                                        >
                                            {loading
                                                ? "adding..."
                                                : "add to cart"}
                                        </Text>
                                    </button>
                                </div>
                            </TabsContent>
                            {/* physical tab */}
                            <TabsContent value="physical">
                                {isPhysicalLoading && (
                                    <Text className="px-10">
                                        Loading physical gift card…
                                    </Text>
                                )}
                                {!isPhysicalLoading && physicalGiftCardData && (
                                    <>
                                        {physicalGiftCardData.short_description
                                            ?.html && (
                                            <div
                                                className="leading-[22px] lg:block hidden"
                                                dangerouslySetInnerHTML={{
                                                    __html: physicalGiftCardData
                                                        .short_description.html,
                                                }}
                                            />
                                        )}
                                        {/* Traditional gift cards are elegantly
                                            packaged in our signature envelope and
                                            shipped complimentary to the recipient by
                                            mail for a delightful unboxing experience. */}
                                        <Text
                                            font="helvetica"
                                            size="sm"
                                            weight="normal"
                                            className="block lg:hidden px-10"
                                        >
                                            Get a physical card shipped to your
                                            loved ones.
                                        </Text>
                                        <div className="flex lg:flex-row flex-col lg:gap-12 lg:items-center lg:border-b lg:border-b-border-color-light ">
                                            <div className="flex items-center gap-4 lg:py-6 lg:mb-4 lg:mt-4 pt-8 pb-4 px-10 lg:px-0">
                                                {visibleColors.map(
                                                    (color, idx) => (
                                                        <button
                                                            key={color.id}
                                                            type="button"
                                                            onClick={() =>
                                                                handleSwatchClick(
                                                                    color,
                                                                )
                                                            }
                                                            aria-pressed={
                                                                selectedSwatchKey ===
                                                                color.url_key
                                                            }
                                                            className={`flex items-center justify-center cursor-pointer p-[6px] rounded-full
                    ${selectedSwatchKey === color.url_key ? "border-2 border-black" : "border-none"}
                `}
                                                        >
                                                            <span
                                                                className="block h-12 w-12 rounded-full"
                                                                style={{
                                                                    backgroundColor:
                                                                        color.hashcode,
                                                                }}
                                                            ></span>
                                                        </button>
                                                    ),
                                                )}
                                                {physicalGiftCardData?.color_swatch &&
                                                    physicalGiftCardData
                                                        .color_swatch.length >
                                                        3 && (
                                                        <button
                                                            type="button"
                                                            className="flex items-center gap-2 cursor-pointer"
                                                            onClick={() => {
                                                                /* open color modal / sheet */
                                                            }}
                                                        >
                                                            <Plus
                                                                size={16}
                                                                fill="black"
                                                            />
                                                            <Text
                                                                font="helvetica"
                                                                size="sm"
                                                                weight="normal"
                                                                className="italic"
                                                            >
                                                                More
                                                            </Text>
                                                        </button>
                                                    )}
                                            </div>

                                            <div className="flex gap-2 items-center px-10 pb-8 lg:p-0 border-b border-b-border-color-light lg:border-none">
                                                <Text
                                                    font="helvetica"
                                                    size="productTitle1"
                                                    weight="customWeight1"
                                                    className="lg:text-font-main"
                                                >
                                                    Theme:
                                                </Text>
                                                <Text
                                                    font="helvetica"
                                                    size="productTitle1"
                                                    weight="extrabold"
                                                    className="lg:text-font-main"
                                                >
                                                    {activeSwatch?.frame_color_primary ??
                                                        ""}
                                                </Text>
                                            </div>
                                        </div>
                                        <div className="border-b border-b-border-color-light">
                                            {/* dynamic selected amount display */}
                                            <div className="py-8 px-10 lg:px-0">
                                                <div className="flex items-center mb-2 justify-between">
                                                    <Sheet
                                                        open={isAmountSheetOpen}
                                                        onOpenChange={
                                                            setIsAmountSheetOpen
                                                        }
                                                    >
                                                        <SheetTrigger asChild>
                                                            <Button
                                                                className="cursor-pointer p-0 flex items-center gap-2 w-full bg-transparent shadow-none text-left"
                                                                aria-label="Select gift card amount"
                                                                onClick={() =>
                                                                    setIsAmountSheetOpen(
                                                                        true,
                                                                    )
                                                                }
                                                            >
                                                                <Text
                                                                    font="helvetica"
                                                                    size="base"
                                                                    weight="light"
                                                                    color="fontMain"
                                                                    className="hidden lg:block w-full"
                                                                >
                                                                    Select gift
                                                                    card amount
                                                                </Text>
                                                                <Text
                                                                    font="helvetica"
                                                                    size="base"
                                                                    weight="light"
                                                                    color="fontMain"
                                                                    className="block lg:hidden w-full"
                                                                >
                                                                    Select an
                                                                    amount
                                                                </Text>

                                                                <div>
                                                                    <ChevronRight
                                                                        className="w-6 h-6"
                                                                        fill="black"
                                                                    />
                                                                </div>
                                                            </Button>
                                                        </SheetTrigger>

                                                        <SheetContent
                                                            className="overflow-auto"
                                                            data-lenis-prevent
                                                        >
                                                            <SheetHeader>
                                                                <SheetTitle>
                                                                    <div className="flex items-center gap-2">
                                                                        <ChevronLeft
                                                                            className="w-6 h-6 block lg:hidden"
                                                                            fill="black"
                                                                        />
                                                                        <Text
                                                                            font="helvetica"
                                                                            size="sm"
                                                                            weight="extrabold"
                                                                        >
                                                                            Select
                                                                            amount
                                                                        </Text>
                                                                    </div>
                                                                </SheetTitle>
                                                                <SheetDescription></SheetDescription>
                                                            </SheetHeader>

                                                            {physicalAmountOption?.value?.map(
                                                                (
                                                                    v: CustomizableOptionValue,
                                                                ) => (
                                                                    <div
                                                                        key={
                                                                            v.option_type_id
                                                                        }
                                                                        className="p-6 h-[66px] mx-6 my-4 shadow-[0_6px_24px_0_rgba(0,0,0,0.10)] flex items-center gap-1 cursor-pointer"
                                                                        onClick={() => {
                                                                            // ONLY store option_type_id
                                                                            setPhysicalOptionTypeId(
                                                                                String(
                                                                                    v.option_type_id,
                                                                                ),
                                                                            );

                                                                            // ONLY for UI display
                                                                            setSelectedAmount(
                                                                                v.price.toString(),
                                                                            );

                                                                            // Close sheet
                                                                            setIsAmountSheetOpen(
                                                                                false,
                                                                            );
                                                                        }}
                                                                    >
                                                                        <span>
                                                                            ₹
                                                                        </span>
                                                                        <span className="font-helvetica font-extrabold text-base">
                                                                            {v.price.toLocaleString(
                                                                                "en-IN",
                                                                            )}
                                                                        </span>
                                                                    </div>
                                                                ),
                                                            )}
                                                        </SheetContent>
                                                    </Sheet>
                                                </div>

                                                {/* DISPLAY SELECTED VALUE — default = MIN price */}
                                                <span>₹</span>
                                                <Text
                                                    font="helvetica"
                                                    size="base"
                                                    weight="extrabold"
                                                    as="span"
                                                >
                                                    {selectedAmount
                                                        ? Number(
                                                              selectedAmount,
                                                          ).toLocaleString(
                                                              "en-IN",
                                                          )
                                                        : amountOption?.__typename ===
                                                            "CustomizableDropDownOption"
                                                          ? amountOption.value[0]?.price.toLocaleString(
                                                                "en-IN",
                                                            )
                                                          : ""}
                                                </Text>
                                            </div>
                                            {/* NEW CODE END */}

                                            <div className="flex lg:hidden justify-between items-center bg-primary-500 py-4 px-10 fixed bottom-0 left-0 right-0 z-99">
                                                <div className="flex items-center gap-2">
                                                    <Text
                                                        font="helvetica"
                                                        color="fontMain"
                                                        size="sm"
                                                        weight="normal"
                                                    >
                                                        Total
                                                    </Text>
                                                    <span>₹</span>
                                                    <Text
                                                        font="helvetica"
                                                        size="base"
                                                        weight="extrabold"
                                                        as="span"
                                                    >
                                                        {selectedAmount
                                                            ? Number(
                                                                  selectedAmount,
                                                              ).toLocaleString(
                                                                  "en-IN",
                                                              )
                                                            : amountOption?.__typename ===
                                                                "CustomizableDropDownOption"
                                                              ? amountOption.value[0]?.price.toLocaleString(
                                                                    "en-IN",
                                                                )
                                                              : ""}
                                                    </Text>
                                                </div>
                                                <button
                                                    onClick={
                                                        handleAddPhysicalToCart
                                                    }
                                                    disabled={
                                                        !physicalOptionTypeId ||
                                                        loading
                                                    }
                                                    className="bg-font-main rounded-[40px] w-[140px] h-8 px-8 cursor-pointer physical-mob-btn"
                                                >
                                                    <Text
                                                        size="base"
                                                        weight="normal"
                                                        color="white"
                                                        font="helvetica"
                                                        className="whitespace-nowrap"
                                                    >
                                                        add to cart
                                                    </Text>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="hidden lg:flex flex-col gap-4 py-8">
                                            <Text
                                                font="helvetica"
                                                size="base"
                                                weight="light"
                                                color="fontMain"
                                            >
                                                Quantity:
                                            </Text>
                                            <div className="hidden lg:block">
                                                <div className="flex items-center justify-between">
                                                    <QuantitySelector
                                                        className="hidden lg:flex"
                                                        onChange={(qty) =>
                                                            setPhysicalQuantity(
                                                                qty,
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        {physicalGiftCardData?.expected_delivery && (
                                            <div className="flex flex-col gap-2 lg:flex-row px-10 lg:px-0 py-8 lg:pt-8 lg:pb-10 lg:border-t lg:border-t-border-color-light">
                                                <div className="flex items-center gap-2">
                                                    <TruckDelivery size={20} />
                                                    <Text
                                                        font="helvetica"
                                                        size="sm"
                                                        weight="normal"
                                                    >
                                                        Expected delivery:
                                                    </Text>
                                                </div>
                                                <Text
                                                    font="helvetica"
                                                    size="sm"
                                                    weight="extrabold"
                                                >
                                                    {
                                                        physicalGiftCardData?.expected_delivery
                                                    }
                                                </Text>
                                            </div>
                                        )}
                                        <div className="hidden lg:flex justify-center physical-desktop-btn">
                                            <button
                                                onClick={
                                                    handleAddPhysicalToCart
                                                }
                                                disabled={
                                                    !physicalOptionTypeId ||
                                                    loading
                                                }
                                                className="flex justify-center items-center gap-2 px-18 py-3 bg-font-main rounded-[40px] w-[364px] h-[47px] cursor-pointer"
                                            >
                                                <Bag size={20} />
                                                <Text
                                                    size="base"
                                                    weight="normal"
                                                    color="white"
                                                    font="helvetica"
                                                    className="whitespace-nowrap"
                                                >
                                                    {loading
                                                        ? "adding..."
                                                        : "add to cart"}
                                                </Text>
                                            </button>
                                        </div>
                                    </>
                                )}
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
            <SuccessMessageModals
                open={showPopup}
                onClose={() => setShowPopup(false)}
                status="success"
                title="Product added to cart!"
                message="Your item has been successfully added."
            />
        </>
    );
}
