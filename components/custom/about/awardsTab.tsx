import Text from "@/components/generic/Text";
import Image from "next/image";

export default function AwardsTab() {
    return (
        <>
            <section className="w-full h-full background-about-gradient px-5 py-10 relative">
                <div className="flex flex-col items-center justify-center relative">
                    <Image
                        src="/images/about/award-1.png"
                        alt="large presence"
                        width={600}
                        height={600}
                        className="w-auto h-auto object-contain"
                    />
                </div>
                <div className="w-full flex flex-col justify-center relative py-30">
                    <span className="absolute left-1/2 -top-[50px] h-32 w-px -translate-x-1/2 bg-white" />
                    <div>
                        <Text
                            as={"p"}
                            className="text-base font-helvetica font-bold text-white text-center leading-[24px] w-full max-w-sm mx-auto"
                        >
                            MAPIC India Most Admired Retailer of The Year 2022
                        </Text>
                    </div>
                </div>
            </section>
            <section className="w-full h-full background-about-gradient px-5 py-10 relative">
                <div className="flex flex-col items-center justify-center relative">
                    <Image
                        src="/images/about/award-2.png"
                        alt="large presence"
                        width={600}
                        height={600}
                        className="w-auto h-auto object-contain"
                    />
                </div>
                <div className="w-full flex flex-col justify-center relative py-30">
                    <span className="absolute left-1/2 -top-[50px] h-32 w-px -translate-x-1/2 bg-white" />
                    <div>
                        <Text
                            as={"p"}
                            className="text-base font-helvetica font-bold text-white text-center leading-[24px] w-full max-w-sm mx-auto"
                        >
                            West Bengal Best Employer Brand Awards 2021
                        </Text>
                    </div>
                </div>
            </section>
            <section className="w-full h-full background-about-gradient px-5 py-10 relative">
                <div className="flex flex-col items-center justify-center relative">
                    <Image
                        src="/images/about/award-3.png"
                        alt="large presence"
                        width={600}
                        height={600}
                        className="w-auto h-auto object-contain"
                    />
                </div>
                <div className="w-full flex flex-col justify-center relative py-30">
                    <span className="absolute left-1/2 -top-[50px] h-32 w-px -translate-x-1/2 bg-white" />
                    <div>
                        <Text
                            as={"p"}
                            className="text-base font-helvetica font-bold text-white text-center leading-[24px] w-full max-w-sm mx-auto"
                        >
                            Times Business Awards Times Best Retail Eyewear
                            Chain 2021
                        </Text>
                    </div>
                </div>
            </section>
            <section className="w-full h-full background-about-gradient px-5 py-10 relative">
                <div className="flex flex-col items-center justify-center relative">
                    <Image
                        src="/images/about/award-4.png"
                        alt="large presence"
                        width={600}
                        height={600}
                        className="w-auto h-auto object-contain"
                    />
                </div>
                <div className="w-full flex flex-col justify-center relative py-30">
                    <span className="absolute left-1/2 -top-[50px] h-32 w-px -translate-x-1/2 bg-white" />
                    <div>
                        <Text
                            as={"p"}
                            className="text-base font-helvetica font-bold text-white text-center leading-[24px] w-full max-w-sm mx-auto"
                        >
                            India’s Most Trusted Brands Awards Council Best
                            Eyewear Store Category 2015
                        </Text>
                    </div>
                </div>
            </section>
            <section className="w-full h-full background-about-gradient px-5 py-10 relative">
                <div className="flex flex-col items-center justify-center relative">
                    <Image
                        src="/images/about/award-5.png"
                        alt="large presence"
                        width={600}
                        height={600}
                        className="w-auto h-auto object-contain"
                    />
                </div>
                <div className="w-full flex flex-col justify-center relative py-30">
                    <span className="absolute left-1/2 -top-[50px] h-32 w-px -translate-x-1/2 bg-white" />
                    <div>
                        <Text
                            as={"p"}
                            className="text-base font-helvetica font-bold text-white text-center leading-[24px] w-full max-w-sm mx-auto"
                        >
                            Images Group Most Admired Retailer Award of The Year
                            2013 - 2014
                        </Text>
                    </div>
                </div>
            </section>
        </>
    );
}
