import Text from "@/components/generic/Text";
import Mute from "@/components/icons/Mute";
import Play from "@/components/icons/Play";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function PresentTab() {
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.play();
            } else {
                videoRef.current.pause();
            }
        }
    }, [isPlaying]);
    return (
        <>
            <section
                className="
        relative
        w-full
        min-h-[500px]
        2xl:min-h-[1000px]
        flex
        items-center
        bg-no-repeat
        bg-cover
        bg-right
      "
                style={{
                    backgroundImage: "url('/images/about/presenttab-bg.png')",
                }}
            >
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />

                {/* Content */}
                <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        {/* LEFT TEXT */}
                        <div className="max-w-xl text-white">
                            <Text
                                as="p"
                                className="text-base font-helvetica font-normal text-white text-center leading-[24px]"
                            >
                                “The price of success is hard work, dedication
                                to the job at hand, and the determination that
                                whether we win or lose, we have applied the best
                                of ourselves to the task at hand.”
                            </Text>
                            <div className="text-center mt-4">
                                <Text
                                    as="p"
                                    className="text-base font-helvetica font-bold text-white text-center leading-[24px]"
                                >
                                    B. K. Gupta
                                </Text>
                                <Text
                                    as="p"
                                    className="text-base font-helvetica font-light text-white text-center leading-[24px]"
                                >
                                    Founder and Chairman of GKB Opticals
                                </Text>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* video section -1 */}
            <section className="w-full mx-auto h-full bg-white px-5 py-5 relative">
                <div className="lg:w-[60%] mx-auto relative">
                    <div className="w-full z-10 relative">
                        <Text
                            as="p"
                            className="text-[48px] font-helvetica font-light text-black text-center leading-[64px] my-20 lg:mt-30 lg:mb-20"
                        >
                            one vision
                        </Text>

                        <span className="absolute left-1/2 top-[80px] h-32 w-px -translate-x-1/2 bg-black" />
                        <div className="grid gap-8">
                            <video
                                ref={videoRef}
                                src="https://mediagkboptical.gumlet.io/media/components/tmp/attachment/end_of_sale_5.mp4"
                                autoPlay
                                muted={isMuted}
                                loop
                                className="w-full h-full object-cover object-top"
                            />
                            <Text
                                as={"p"}
                                className="text-base font-helvetica font-normal text-white text-center leading-[24px] w-full max-w-xl mx-auto"
                            >
                                Our brand’s vision has always been to make
                                quality eye care and eye wear accessible and
                                affordable for everyone.
                            </Text>
                        </div>
                    </div>
                    <div className="absolute bottom-30 left-12 z-20 flex items-center gap-6">
                        <div
                            className="flex items-center justify-center cursor-pointer"
                            onClick={() => setIsPlaying(!isPlaying)}
                        >
                            <Play />
                        </div>
                        <div
                            className="flex items-center justify-center cursor-pointer"
                            onClick={() => setIsMuted(!isMuted)}
                        >
                            <Mute />
                        </div>
                    </div>
                </div>
            </section>
            <section className="relative w-full bg-black py-10 px-5 -mt-[310px]">
                <div className="h-[300px]"></div>
                <div className="w-full lg:my-40 my-0">
                    <div className="relative py-10">
                        <Text
                            as="p"
                            className="text-[48px] font-helvetica font-light text-white text-center leading-[64px] mb-30"
                        >
                            large presence
                        </Text>

                        <span className="absolute left-1/2 top-[140px] h-32 w-px -translate-x-1/2 bg-white" />
                    </div>

                    <div className="w-full flex lg:flex-row flex-col justify-center gap-8">
                        <div className="flex flex-1 ">
                            <Image
                                src="/images/about/Indiamap.png"
                                alt="large presence"
                                width={300}
                                height={300}
                                className="w-full h-full max-w-4xl mb-20 object-contain"
                            />
                        </div>

                        <div className="flex flex-col  flex-1 w-full justify-center">
                            <div className="flex flex-col gap-6 w-full justify-center mb-10">
                                <Text
                                    as="p"
                                    className="text-[2rem] font-helvetica font-normal text-white text-center leading-[40px] w-full grid gap-4"
                                >
                                    90+ stores
                                    <Text
                                        as="span"
                                        className="text-[2rem] font-helvetica font-normal text-white text-center leading-[40px]"
                                    >
                                        29 cities
                                    </Text>
                                    <Text
                                        as="span"
                                        className="text-[2rem] font-helvetica font-normal text-white text-center leading-[40px]"
                                    >
                                        20 states
                                    </Text>
                                </Text>
                                <Text
                                    as="p"
                                    className="text-base font-helvetica font-light text-white text-center leading-[24px] w-full max-w-xl mx-auto"
                                >
                                    GKB Opticals is a multi-branded eyewear
                                    retail chain with stores in premium
                                    locations and a footprint of 44 high-street
                                    and 50 mall doors
                                </Text>
                            </div>
                            <div className="w-full flex justify-center">
                                <Button className="text-white italic font-helvetica text-xl">
                                    Find a store near you
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="relative py-10">
                        <Text
                            as="p"
                            className="text-[48px] font-helvetica font-light text-white text-center leading-[64px] mb-30"
                        >
                            vast portfolio
                        </Text>

                        <span className="absolute left-1/2 top-[140px] h-32 w-px -translate-x-1/2 bg-white" />
                    </div>

                    <div className="w-full flex lg:flex-row flex-col justify-center gap-8">
                        <div className="flex flex-1 ">
                            <Image
                                src="/images/about/Globe-1.png"
                                alt="large presence"
                                width={300}
                                height={300}
                                className="w-full h-full max-w-4xl mb-20 object-contain"
                            />
                        </div>

                        <div className="flex flex-col  flex-1 w-full justify-center">
                            <div className="flex flex-col gap-6 w-full justify-center mb-10">
                                <Text
                                    as="p"
                                    className="text-[2rem] font-helvetica font-normal text-white text-center leading-[40px] w-full grid gap-4"
                                >
                                    1000+ products
                                    <Text
                                        as="span"
                                        className="text-[2rem] font-helvetica font-normal text-white text-center leading-[40px]"
                                    >
                                        50+ brands
                                    </Text>
                                </Text>
                                <Text
                                    as="p"
                                    className="text-base font-helvetica font-light text-white text-center leading-[24px] w-full max-w-xl mx-auto"
                                >
                                    GKB Opticals is not only home to some of the
                                    world’s most stylish brands, but also hosts
                                    some of the world’s most luxurious eyewear
                                    brands
                                </Text>
                            </div>
                            <div className="w-full flex justify-center">
                                <Button className="text-white italic font-helvetica text-xl">
                                    Explore our brands
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* video section -2 */}
            <section className="w-full mx-auto h-full bg-white px-5 py-5 relative">
                <div className="lg:w-[60%] mx-auto relative">
                    <div className="w-full z-10 relative">
                        <Text
                            as="p"
                            className="text-[48px] font-helvetica font-light text-black text-center leading-[64px] my-20 lg:mt-30 lg:mb-20"
                        >
                            our store experiences
                        </Text>

                        <span className="absolute left-1/2 lg:top-[80px] top-[140px] h-32 w-px -translate-x-1/2 bg-black" />
                        <div className="grid gap-8">
                            <video
                                ref={videoRef}
                                src="https://mediagkboptical.gumlet.io/media/components/tmp/attachment/end_of_sale_5.mp4"
                                autoPlay
                                muted={isMuted}
                                loop
                                className="w-full h-full object-cover object-top"
                            />
                            <Text
                                as={"p"}
                                className="text-2xl font-helvetica font-normal text-white leading-[24px] w-full flex flex-col gap-2 text-right"
                            >
                                Vision Lounge
                                <Text
                                    className="text-base font-helvetica font-light text-white leading-[24px] w-full text-right"
                                    as="span"
                                >
                                    Mumbai
                                </Text>
                            </Text>
                        </div>
                    </div>
                    <div className="absolute bottom-30 left-12 z-20 flex items-center gap-6">
                        <div
                            className="flex items-center justify-center cursor-pointer"
                            onClick={() => setIsPlaying(!isPlaying)}
                        >
                            <Play />
                        </div>
                        <div
                            className="flex items-center justify-center cursor-pointer"
                            onClick={() => setIsMuted(!isMuted)}
                        >
                            <Mute />
                        </div>
                    </div>
                </div>
            </section>
            <section className="relative w-full bg-black py-10 px-5 -mt-[310px]">
                <div className="h-[300px]"></div>

                {/* block -1 */}

                <div className="w-full flex lg:flex-row flex-col justify-center gap-8">
                    <div className="flex flex-1 ">
                        <Image
                            src="/images/about/alterpic-1.png"
                            alt="large presence"
                            width={300}
                            height={300}
                            className="w-full h-full max-w-4xl lg:mb-20 object-contain"
                        />
                    </div>

                    <div className="flex flex-col  flex-1 w-full justify-items-start">
                        <div className="flex flex-col gap-6 w-full justify-items-start px-10 py-10 lg:py-20">
                            <Text
                                as="p"
                                className="text-2xl font-helvetica font-normal text-white text-left leading-[32px] w-full grid gap-2"
                            >
                                Audiology Clinic
                                <Text
                                    as="span"
                                    className="text-base font-helvetica font-light text-white text-left leading-[32px]"
                                >
                                    Bengaluru
                                </Text>
                            </Text>
                        </div>
                    </div>
                </div>
                {/* block -2 */}

                <div className="w-full flex lg:flex-row flex-col justify-center gap-8">
                    <div className="flex flex-col  flex-1 w-full justify-items-start">
                        <div className="flex flex-col gap-6 w-full justify-items-start px-10 py-10 lg:py-20">
                            <Text
                                as="p"
                                className="text-2xl font-helvetica font-normal text-white text-right leading-[32px] w-full grid gap-2"
                            >
                                Lens Experience Zone
                                <Text
                                    as="span"
                                    className="text-base font-helvetica font-light text-white text-right leading-[32px]"
                                >
                                    Bengaluru
                                </Text>
                            </Text>
                        </div>
                    </div>
                    <div className="flex flex-1 ">
                        <Image
                            src="/images/about/alterpic-2.png"
                            alt="large presence"
                            width={300}
                            height={300}
                            className="w-full h-full max-w-4xl mb-20 object-contain"
                        />
                    </div>
                </div>
                {/* block -3 */}
                <div className="w-full flex lg:flex-row flex-col justify-center gap-8">
                    <div className="flex flex-1 ">
                        <Image
                            src="/images/about/alterpic-3.png"
                            alt="large presence"
                            width={300}
                            height={300}
                            className="w-full h-full max-w-4xl lg:mb-20 object-contain"
                        />
                    </div>

                    <div className="flex flex-col  flex-1 w-full justify-items-start">
                        <div className="flex flex-col gap-6 w-full justify-items-start px-10 py-10 lg:py-20">
                            <Text
                                as="p"
                                className="text-2xl font-helvetica font-normal text-white text-left leading-[32px] w-full grid gap-2"
                            >
                                Audiology Clinic
                                <Text
                                    as="span"
                                    className="text-base font-helvetica font-light text-white text-left leading-[32px]"
                                >
                                    Bengaluru
                                </Text>
                            </Text>
                        </div>
                    </div>
                </div>
                {/* block -4 */}
                <div className="w-full flex lg:flex-row flex-col justify-center gap-8">
                    <div className="flex flex-col  flex-1 w-full justify-items-start">
                        <div className="flex flex-col gap-6 w-full justify-items-start px-10 py-10 lg:py-20">
                            <Text
                                as="p"
                                className="text-2xl font-helvetica font-normal text-white text-right leading-[32px] w-full grid gap-2"
                            >
                                Home Service
                                <Text
                                    as="span"
                                    className="text-base font-helvetica font-light text-white text-right leading-[32px]"
                                >
                                    At your home
                                </Text>
                            </Text>
                        </div>
                    </div>
                    <div className="flex flex-1 ">
                        <Image
                            src="/images/about/alterpic-4.png"
                            alt="large presence"
                            width={300}
                            height={300}
                            className="w-full h-full max-w-4xl mb-20 object-contain"
                        />
                    </div>
                </div>
            </section>
        </>
    );
}
