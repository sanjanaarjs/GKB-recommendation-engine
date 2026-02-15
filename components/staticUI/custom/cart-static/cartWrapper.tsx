"use client";

import Text from "@/components/generic/Text";
import CartItems from "./cartItems";
import CartSummary from "./cartSummary";
import ChevronRight from "@/components/icons/ChevronRight";
import ChevronLeft from "@/components/icons/ChevronLeft";

export default function CartWrapper() {
    return (
        <div className="p-10 lg:px-[168px] bg-[#F7F7F7]">
            <div className="flex items-center gap-2 justify-start py-2 lg:hidden">
                <ChevronLeft size={16} fill="black" />
                <Text
                    as={"h4"}
                    className="font-helvetica text-[14px] font-normal text-font-main leading-normal"
                >
                    Back
                </Text>
            </div>
            <div className="flex items-center justify-between border-b py-[24px] lg:py-[80px]">
                <Text
                    as={"h1"}
                    className="font-helvetica text-[28px] lg:text-[3rem] font-light leading-normal"
                >
                    your cart
                </Text>
                <button
                    type="button"
                    className="text-[1.5rem] font-helvetica italic leading-normal font-medium cursor-pointer flex items-start gap-4"
                >
                    Wishlist
                    <div className="italic">
                        <ChevronRight size={16} fill="black" />
                    </div>
                </button>
            </div>
            <div className="flex flex-col lg:flex-row">
                <CartItems />
                <CartSummary />
            </div>
        </div>
    );
}
