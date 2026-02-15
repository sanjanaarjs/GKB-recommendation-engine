import Text from "@/components/generic/Text";
import Image from "next/image";

export default function LeadersTab() {
    return (
        <>
            <section className="w-full h-full bg-black px-5 py-5 relative">
                <div className="flex flex-col items-center justify-center relative">
                    <Image
                        src="/images/about/leaders-2.png"
                        alt="large presence"
                        width={600}
                        height={600}
                        className="w-full h-full object-contain"
                    />
                </div>
                <div className="w-full flex flex-col justify-center relative py-30">
                    <span className="absolute left-1/2 -top-[50px] h-32 w-px -translate-x-1/2 bg-white" />
                    <div className="grid gap-2 mb-10">
                        <Text
                            as={"h2"}
                            className="text-base font-helvetica font-bold text-white text-center leading-[24px] w-full max-w-xl mx-auto"
                        >
                            Brijendra Kumar Gupta
                        </Text>
                        <Text
                            as={"p"}
                            className="text-base font-helvetica font-light text-white text-center leading-[24px] w-full max-w-xl mx-auto"
                        >
                            Founder and Chairman, GKB Opticals
                        </Text>
                    </div>

                    <div>
                        <Text
                            as={"p"}
                            className="text-base font-helvetica font-normal text-white text-center leading-[24px] w-full max-w-xl mx-auto"
                        >
                            Driven by a focus on quality and innovation, Mr.
                            Gupta revolutionized the optical trade with
                            precision-made lenses and was a pioneer in
                            introducing Rx prescription glasses in India. Under
                            his leadership, GKB Opticals has expanded to over 90
                            stores nationwide, earning renown for personalized
                            service and partnerships with international brands.
                        </Text>
                    </div>
                </div>
            </section>
            <section className="w-full h-full bg-black px-5 py-5 relative">
                <div className="flex flex-col items-center justify-center relative">
                    <Image
                        src="/images/about/leaders-1.png"
                        alt="large presence"
                        width={600}
                        height={600}
                        className="w-full h-full object-contain"
                    />
                </div>
                <div className="w-full flex flex-col justify-center relative py-30">
                    <span className="absolute left-1/2 -top-[50px] h-32 w-px -translate-x-1/2 bg-white" />
                    <div className="grid gap-2 mb-10">
                        <Text
                            as={"h2"}
                            className="text-base font-helvetica font-bold text-white text-center leading-[24px] w-full max-w-xl mx-auto"
                        >
                            Priyanka Gupta
                        </Text>
                        <Text
                            as={"p"}
                            className="text-base font-helvetica font-light text-white text-center leading-[24px] w-full max-w-xl mx-auto"
                        >
                            Director, GKB Opticals
                        </Text>
                    </div>

                    <div>
                        <Text
                            as={"p"}
                            className="text-base font-helvetica font-normal text-white text-center leading-[24px] w-full max-w-xl mx-auto"
                        >
                            With a background in business administration and
                            marketing, she has spearheaded innovative ventures
                            within the company, notably launching GKB Home
                            Service to provide eye care at customers’ homes and
                            driving the omni-channel strategy. Her leadership
                            has been marked by a focus on customer-centric
                            solutions, digital growth, and redefining eyewear
                            trends in India’s luxury and wedding segments.
                        </Text>
                    </div>
                </div>
            </section>
        </>
    );
}
