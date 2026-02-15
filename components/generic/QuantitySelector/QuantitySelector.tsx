"use client";

import { useState } from "react";
import CartMinus from "@/components/icons/CartMinus";
import CartPlus from "@/components/icons/CartPlus";

interface QuantitySelectorProps {
    initialValue?: number;
    onChange?: (value: number) => void;
    className?: string;
}

export default function QuantitySelector({
    initialValue = 1,
    onChange,
    className = "",
}: Readonly<QuantitySelectorProps>) {
    const [quantity, setQuantity] = useState(initialValue);

    const updateQuantity = (value: number) => {
        const newQuantity = Math.max(1, value);
        setQuantity(newQuantity);
        onChange?.(newQuantity);
    };

    return (
        <div
            className={`flex items-center rounded-[2px] border-[0.5px] border-cart-border ${className}`}
        >
            <button
                className="p-[13px] cursor-pointer"
                aria-label="Decrease quantity"
                onClick={() => updateQuantity(quantity - 1)}
            >
                <CartMinus size={14} fill="black" />
            </button>
            <div className="bg-cart-border w-[0.5px] h-[40px]" />
            <span className="mx-2 w-4 text-center text-sm">{quantity}</span>
            <div className="bg-cart-border w-[0.5px] h-[40px]" />
            <button
                className="p-[13px] cursor-pointer"
                aria-label="Increase quantity"
                onClick={() => updateQuantity(quantity + 1)}
            >
                <CartPlus size={14} fill="black" />
            </button>
        </div>
    );
}
