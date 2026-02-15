import Text from "@/components/generic/Text";
import Image from "next/image";

export default function LegacyTab() {
    return (
        <>
            <section className="w-full h-full background-about-gradient px-5 py-5 relative">
                <div className="flex flex-col items-center justify-center relative lg:mb-40 mb-20">
                    <Image
                        src="/images/about/legacy.png"
                        alt="large presence"
                        width={600}
                        height={600}
                        className="w-full h-full max-w-4xl object-contain"
                    />
                    <Image
                        src="/images/about/specs-1.png"
                        alt="large presence"
                        width={600}
                        height={600}
                        className="w-full h-auto max-w-4xl object-contain absolute right-[20px] lg:-bottom-[243px] -bottom-[119px]"
                    />
                </div>
                <div className="w-full flex flex-col justify-center relative py-30">
                    <span className="absolute left-1/2 top-[0px] h-32 w-px -translate-x-1/2 bg-white" />
                    <div>
                        <Text
                            as={"h2"}
                            className="text-[60px] font-helvetica font-normal text-white text-center leading-[24px] w-full max-w-xl mx-auto my-10"
                        >
                            1959
                        </Text>
                    </div>

                    <div className="grid gap-8">
                        <Text
                            as={"p"}
                            className="text-base font-helvetica font-bold text-white text-center leading-[24px] w-full max-w-xl mx-auto"
                        >
                            Humble beginnings in Agra
                        </Text>
                        <Text
                            as={"p"}
                            className="text-base font-helvetica font-light text-white text-center leading-[24px] w-full max-w-xl mx-auto"
                        >
                            GKB Opticals launched its journey with just four
                            hand-operated spindle machines at Agra, aiming to
                            pioneer quality lens manufacturing in India.
                        </Text>
                    </div>
                </div>
            </section>
            <section className="w-full h-full background-about-gradient relative">
                <Image
                    src="/images/about/D1.png"
                    alt="large presence"
                    width={600}
                    height={600}
                    className="w-full h-full object-contain"
                />
                <div className="w-full flex flex-col justify-center relative py-40 background-about-gradient-2">
                    <span className="absolute left-1/2 top-[0px] h-32 w-px -translate-x-1/2 bg-white" />
                    <div>
                        <Text
                            as={"h2"}
                            className="text-[60px] font-helvetica font-normal text-white text-center leading-[24px] w-full max-w-xl mx-auto my-10"
                        >
                            1964
                        </Text>
                    </div>

                    <div className="grid gap-8">
                        <Text
                            as={"p"}
                            className="text-base font-helvetica font-bold text-white text-center leading-[24px] w-full max-w-xl mx-auto"
                        >
                            Building a foundation
                        </Text>
                        <Text
                            as={"p"}
                            className="text-base font-helvetica font-light text-white text-center leading-[24px] w-full max-w-xl mx-auto"
                        >
                            The company moved into its own dedicated building,
                            strengthening its commitment to the optical industry
                            and scaling its ambitions
                        </Text>
                    </div>
                    {/* <div className="background-about-gradient-2 py-15"></div> */}
                </div>
            </section>
            <section className="w-full h-full background-about-gradient-2 relative">
                <div>
                    <Image
                        src="/images/about/gkb-opticals-gariahat-kolkata.png"
                        alt="large presence"
                        width={600}
                        height={600}
                        className="w-full h-full object-contain"
                    />
                    <Image
                        src="/images/about/Saltlake_1.png"
                        alt="large presence"
                        width={600}
                        height={600}
                        className="w-full h-full object-contain lg:max-w-2xl max-w-xs mx-auto lg:-mt-[100px] -mt-[50px]"
                    />
                </div>

                <div className="w-full flex flex-col justify-center relative py-40">
                    <span className="absolute left-1/2 top-[0px] h-32 w-px -translate-x-1/2 bg-white" />
                    <div>
                        <Text
                            as={"h2"}
                            className="text-[60px] font-helvetica font-normal text-white text-center leading-[24px] w-full max-w-xl mx-auto my-10"
                        >
                            1968
                        </Text>
                    </div>

                    <div className="grid gap-8">
                        <Text
                            as={"p"}
                            className="text-base font-helvetica font-bold text-white text-center leading-[24px] w-full max-w-xl mx-auto"
                        >
                            The first retail leap
                        </Text>
                        <Text
                            as={"p"}
                            className="text-base font-helvetica font-light text-white text-center leading-[24px] w-full max-w-xl mx-auto"
                        >
                            GKB Opticals opened its first retail store at
                            Gariahat, Kolkata, marking its entry into India
                            organized eyewear retail space.
                        </Text>
                    </div>
                    {/* <div className="background-about-gradient-2 py-15"></div> */}
                </div>
            </section>
        </>
    );
}
