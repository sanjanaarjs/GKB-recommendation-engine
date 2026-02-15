import Text from "@/components/generic/Text";
import ChevronRight from "@/components/icons/ChevronRight";
import LocationPin from "@/components/icons/LocationPin";
import Image from "next/image";
import { NearbyStore } from "./datas/storeLocator.api";
import AudiologyIcon from "@/components/icons/AudiologyIcon";
import GeneralTest from "@/components/icons/GeneralTest";

export interface StoreLocatorWrapperProps {
    store: NearbyStore | null;
    onBook: () => void;
}

export default function StoreCard({ store, onBook }: StoreLocatorWrapperProps) {
    return (
        <div className="border-r border-gray-300 px-[48px] lg:pr-[48px]">
            <div className="py-[32px] flex flex-col gap-4 border-b border-gray-300">
                {store?.storeImage && (
                    <Image
                        src={store?.storeImage}
                        alt={store?.name ?? ""}
                        width={100}
                        height={100}
                        className="w-full object-cover rounded-md"
                    />
                )}

                <div className="flex flex-col justify-between">
                    <div>
                        {store?.name && (
                            <Text
                                as={"h3"}
                                className="font-bold text-black text-sm font-helvetica leading-[18px] mb-[8px]"
                            >
                                {store?.name}
                            </Text>
                        )}
                        {(store?.city || store?.state || store?.postcode) && (
                            <Text
                                as={"p"}
                                className="font-light text-black text-sm font-helvetica leading-[20px] mb-[16px]"
                            >
                                {store?.city}, {store?.state}, {store?.postcode}
                            </Text>
                        )}
                        {store?.landlinePrimary && (
                            <Text className="font-light text-black text-sm font-helvetica leading-normal mb-[16px] flex items-center gap-1">
                                Contact:{" "}
                                <Text
                                    className="italic font-bold text-black text-sm font-helvetica leading-normal"
                                    as="span"
                                >
                                    {store?.landlinePrimary}
                                </Text>
                            </Text>
                        )}

                        {/* OpenStreetMap Directions Link */}
                        {store?.latitude && store?.longitude && (
                            <a
                                href={`https://www.openstreetmap.org/directions?from=&to=${store.latitude},${store.longitude}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-bold text-black text-sm font-helvetica leading-normal flex items-center gap-1 mb-[16px] cursor-pointer"
                            >
                                <LocationPin size={16} />
                                Get directions
                                <ChevronRight size={16} fill={"black"} />
                            </a>
                        )}

                        {/* Services */}
                        {(store?.isLensExpZone === 1 ||
                            store?.isAudiology === 1 ||
                            store?.isHomeService === 1 ||
                            store?.isMyopiaClinic === 1) && (
                            <div className="flex flex-wrap gap-2 mb-[16px]">
                                {store?.isLensExpZone === 1 && (
                                    <span className="px-3 py-1 text-xs font-helvetica flex items-center gap-1">
                                        <GeneralTest />
                                        General eye test
                                    </span>
                                )}

                                {store?.isAudiology === 1 && (
                                    <span className="px-3 py-1 text-xs font-helvetica flex items-center gap-1">
                                        <AudiologyIcon />
                                        Hearing test
                                    </span>
                                )}

                                {store?.isHomeService === 1 && (
                                    <span className="px-3 text-xs font-helvetica flex items-center gap-1">
                                        <Image
                                            src="/images/storeLocator/homeService.svg"
                                            alt="Home Service"
                                            width={16}
                                            height={16}
                                        />
                                        Home service
                                    </span>
                                )}

                                {store?.isMyopiaClinic === 1 && (
                                    <span className="px-3 py-1 text-xs font-helvetica flex items-center gap-1">
                                        Myopia clinic
                                    </span>
                                )}
                            </div>
                        )}
                    </div>

                    <button
                        className="bg-black font-helvetica text-white px-[48px] py-2 rounded-full text-sm hover:bg-gray-800 transition w-fit cursor-pointer"
                        onClick={onBook}
                    >
                        book appointment
                    </button>
                </div>
            </div>
        </div>
    );
}
