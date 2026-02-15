"use client";

import React from "react";
import Text from "@/components/generic/Text";

export default function HelpCard() {
    return (
        <section className="w-full bg-white rounded-lg lg:ml-7 shadow-[0_12px_24px_0_rgba(0,0,0,0.10)] py-4 px-8 flex flex-col items-center text-center">
            <Text font="helvetica" className="text-base font-normal">
                Need help?
            </Text>

            <div className="mt-4 lg:mt-6">
                <div className="mt-1 text-base text-black font-helvetica font-light">
                    <span className="italic">Chat</span> with us now or
                </div>

                <div className="font-light font-helvetica text-black text-base">
                    call us at{" "}
                    <span className="font-semibold text-black">
                        1800-200-3400
                    </span>
                </div>
            </div>
        </section>
    );
}
