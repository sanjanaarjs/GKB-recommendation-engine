"use client";

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import Text from "@/components/generic/Text";
import Close from "@/components/icons/Close";
import SearchStore from "@/components/icons/SearchStore";
import InStockToggle from "./toggleSwitch";

interface StoreAvailabilitySheetProps {
    isOpen: boolean;
    onClose: () => void;
}

const StoreAvailabilitySheet = ({
    isOpen,
    onClose,
}: StoreAvailabilitySheetProps) => {
    const stores = [
        {
            name: "GKB Opticals - Kempegowda",
            address:
                "Kempegowda International Airport, Shop No. 3165-08, Departure Zone Level 31, Terminal 2, Devanahalli, Bengaluru - 560300",
            phone: "080-47406740",
            stock: true,
        },
        {
            name: "GKB Opticals - M G Road",
            address:
                "73, M G Road, Opposite to Metro Railway Station, Bengaluru - 560001",
            phone: "9606049319",
            stock: true,
        },
        {
            name: "GKB Opticals - Phoenix Mall of Asia",
            address:
                "Mall of Asia, Second floor, Shop No. S2, 239/240/257/8Y1, Byataranpura Village, Yelahanka, Hobli, Bellary, Bengaluru - 560092",
            phone: "9748269538",
            stock: false,
        },
    ];

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent
                side="right"
                className="w-full lg:max-w-[568px] lg:[&>button>svg:not(.keep)]:hidden gap-0"
            >
                <SheetHeader className="flex justify-between items-center flex-row shadow-[0_12px_24px_0_rgba(0,0,0,0.10)] p-6">
                    <SheetTitle className="w-full text-center font-helvetica text-[1rem] lg:text-[1.25rem] text-black font-semibold leading-[24px]">
                        In-store availability
                    </SheetTitle>
                    <button onClick={onClose} className="keep cursor-pointer">
                        <Close size={20} fill="#000" />
                    </button>
                </SheetHeader>
                <div className="p-4 lg:p-[48px]">
                    {/* Search Bar */}
                    <div className="mb-[48px] border-b">
                        <div className="relative bg-white">
                            <input
                                type="text"
                                placeholder="Search stores"
                                className="w-full border border-[#B2B2B2] rounded-full py-0 px-4 text-[1rem] font-helvetica font-light leading-[22px] placeholder:text-[1rem] placeholder:font-helvetica focus:outline-none placeholder:font-light placeholder:leading-[22px] placeholder:text-[#0B0B0B] text-[#0B0B0B] min-h-[48px]"
                            />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                {" "}
                                <SearchStore size={24} />
                            </div>
                        </div>

                        {/* Toggle for stock availability */}
                        <InStockToggle />
                    </div>

                    {/* Store List */}
                    <div className="space-y-4 overflow-y-auto">
                        {stores.map((store, idx) => (
                            <div key={idx} className="space-y-4">
                                <div>
                                    <Text
                                        as="p"
                                        className="font-helvetica font-semibold text-sm leading-[22px] text-black mb-2"
                                    >
                                        {store.name}
                                    </Text>
                                    <Text
                                        as="p"
                                        className="font-helvetica font-light text-sm leading-[22px] text-black"
                                    >
                                        {store.address}
                                    </Text>
                                </div>
                                <Text
                                    as="p"
                                    className="font-helvetica font-light text-sm leading-[22px] text-black"
                                >
                                    Contact:{" "}
                                    <span className="font-helvetica text-sm leading-[22px] text-black font-medium italic">
                                        {store.phone}
                                    </span>
                                </Text>
                                <div className="flex items-center gap-2">
                                    <span
                                        className={`w-3 h-3 rounded-full ${
                                            store.stock
                                                ? "bg-green-500"
                                                : "bg-red-500"
                                        }`}
                                    />
                                    <Text
                                        as="p"
                                        className="font-helvetica text-sm leading-[22px] text-black font-medium"
                                    >
                                        {store.stock
                                            ? "Stock available in store"
                                            : "Stock not available in store"}
                                    </Text>
                                </div>
                                <hr className="mt-3" />
                            </div>
                        ))}
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default StoreAvailabilitySheet;
