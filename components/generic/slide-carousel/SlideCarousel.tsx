"use client";

import { useEffect, useRef, useState } from "react";
import Slider1 from "./Slider1";
import Slider2 from "./Slider2";
import Slider3 from "./Slider3";
import { cn } from "@/lib/utils";
import MobileSlide1 from "./MobileSlide1";
import MobileSlider2 from "./MobileSlider2";
import MobileSlide3 from "./MobileSlide3";
import { useResponsive } from "@/lib/hooks/useResponsive";
import { ItemData } from "@/lib/services/magento/homepageData";

export default function SlideCarousel({
    onlyDesktop = false,
    onlyMobile = false,
    slides,
}: {
    onlyDesktop?: boolean;
    onlyMobile?: boolean;
    slides: ItemData[] | [];
}) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const scrollStartPosition = useRef<number>(0);
    const currentScrollPosition = useRef<number>(0);
    const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
    const isScrolling = useRef<boolean>(false);
    const scrollingTimeout = useRef<NodeJS.Timeout | null>(null);
    const scrollTransitionTimeout = useRef<NodeJS.Timeout | null>(null);
    const { isMobile, isDesktop } = useResponsive();
    const sliderData = slides;

    const nextSlide = () => {
        if (currentSlide + 1 < sliderData?.length) {
            setCurrentSlide(currentSlide + 1);
        }
    };
    const prevSlide = () => {
        if (currentSlide - 1 >= 0) {
            setCurrentSlide(currentSlide - 1);
        }
    };

    const scrollEnd = () => {
        if (
            currentScrollPosition.current === scrollStartPosition.current ||
            Math.abs(
                currentScrollPosition.current - scrollStartPosition.current,
            ) < 15
        ) {
            return;
        }
        if (
            currentScrollPosition.current > scrollStartPosition.current ||
            currentScrollPosition.current > 0
        ) {
            nextSlide();
        } else {
            prevSlide();
        }
        isScrolling.current = true;
        scrollStartPosition.current = 0;
        currentScrollPosition.current = 0;
        if (scrollingTimeout.current) {
            clearTimeout(scrollingTimeout.current);
        }
        scrollingTimeout.current = setTimeout(() => {
            isScrolling.current = false;
        }, 800);
    };

    const clearScrollTimeout = () => {
        if (scrollTimeout.current) {
            clearTimeout(scrollTimeout.current);
            scrollTimeout.current = null;
        }
    };

    const noScrollBar = () => {
        if (currentSlide < sliderData?.length - 1) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    };

    const setGeneralSlide = () => {
        if (window.scrollY !== 0) {
            setCurrentSlide(sliderData?.length - 1);
        } else {
            setCurrentSlide(0);
        }
    };

    const handleScroll = (ev: WheelEvent | TouchEvent) => {
        if (
            ev.target instanceof HTMLElement &&
            ev.target.closest(".block-carousel")
        ) {
            return;
        }
        if (onlyDesktop && isMobile) {
            setGeneralSlide();
            return;
        }
        if (onlyMobile && isDesktop) {
            setGeneralSlide();
            return;
        }
        let y = (ev as WheelEvent).deltaY;
        if (window.TouchEvent && ev instanceof TouchEvent) {
            y = -ev.touches[0].clientY;
        }
        if (window.scrollY !== 0) {
            clearScrollTimeout();
            return;
        }
        if (isScrolling.current) {
            ev.preventDefault();
            ev.stopPropagation();
            clearScrollTimeout();
            return;
        }
        if (scrollStartPosition.current === 0) {
            scrollStartPosition.current = y;
            if (ev instanceof WheelEvent) {
                ev.preventDefault();
                ev.stopPropagation();
            }
        }
        if (
            currentSlide === sliderData?.length - 1 &&
            y >= scrollStartPosition.current
        ) {
            // scrollStartPosition.current = y;
            clearScrollTimeout();
            return;
        }
        ev.preventDefault();
        ev.stopPropagation();
        currentScrollPosition.current = y;
        clearScrollTimeout();
        if (scrollTimeout.current === null) {
            scrollTransitionTimeout.current = setTimeout(() => {
                scrollEnd();
            }, 200);
        }
        scrollTimeout.current = setTimeout(() => {}, 100);
    };

    useEffect(() => {
        document.body.addEventListener("wheel", handleScroll, {
            passive: false,
        });
        document.body.addEventListener("touchmove", handleScroll, {
            passive: false,
        });
        return () => {
            document.body.removeEventListener("wheel", handleScroll);
            document.body.removeEventListener("touchmove", handleScroll);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentSlide, isMobile, isDesktop]);

    useEffect(() => {
        setGeneralSlide();
        noScrollBar();

        return () => {
            if (scrollTimeout.current) {
                clearTimeout(scrollTimeout.current);
            }
            if (scrollingTimeout.current) {
                clearTimeout(scrollingTimeout.current);
            }
            if (scrollTransitionTimeout.current) {
                clearTimeout(scrollTransitionTimeout.current);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        noScrollBar();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentSlide]);

    return (
        <div className="w-full h-full relative overflow-hidden">
            {sliderData?.map((slide, index) => (
                <div
                    key={index}
                    className={cn(
                        "h-full w-full absolute top-0 left-0 z-10 transition-all ease-in-out duration-[1s] overflow-hidden",
                        index === currentSlide
                            ? "z-20 scale-100 rounded-none"
                            : index < currentSlide
                              ? "translate-y-10 z-10 scale-95 rounded-3xl"
                              : "translate-y-[110%] z-20 scale-120",
                    )}
                >
                    {String(slide.sort_order) === "1" && onlyDesktop && (
                        <Slider1
                            heading1={slide.description}
                            paragraph={slide?.additional_info || ""}
                            buttonText={slide.buttontext || ""}
                            buttonLink={slide.link || ""}
                            bgImage={slide.attachment}
                            isVideo={slide.video_attachment}
                            videoUrl={slide.video_attachment || ""}
                        />
                    )}

                    {String(slide.sort_order) === "2" && onlyDesktop && (
                        <Slider1
                            heading1={slide.description}
                            paragraph={slide?.additional_info || ""}
                            buttonText={slide.buttontext || ""}
                            buttonLink={slide.link || ""}
                            bgImage={slide.attachment}
                        />
                    )}

                    {String(slide.sort_order) === "3" && onlyDesktop && (
                        <Slider2
                            heading1={slide.description}
                            paragraph={slide.additional_info || ""}
                            buttonText={slide.buttontext || ""}
                            buttonLink={slide.link || ""}
                            bgImage={slide.attachment}
                        />
                    )}

                    {String(slide.sort_order) === "4" && onlyDesktop && (
                        <Slider3
                            heading1={slide.description}
                            buttonText1={slide.buttontext || ""}
                            buttonLink1={slide.link || ""}
                            buttonText2={slide.additional_info || ""}
                            bgImage={slide.attachment}
                        />
                    )}

                    {String(slide.sort_order) === "0" && (
                        <MobileSlide1
                            bgImage={slide.attachmentmob}
                            heading1={slide.descriptionmob}
                            buttonText={slide.buttontext || ""}
                            buttonLink={slide.link || ""}
                            isVideo={slide.video_attachmentmob}
                            videoUrl={slide.video_attachmentmob || ""}
                        />
                    )}

                    {String(slide.sort_order) === "1" && (
                        <MobileSlider2
                            bgImage={slide.attachmentmob}
                            heading1={slide.descriptionmob}
                            buttonText={slide.buttontext || ""}
                            buttonLink={slide.link || ""}
                        />
                    )}

                    {String(slide.sort_order) === "2" && (
                        <MobileSlide3
                            bgImage={slide.attachmentmob}
                            heading1={slide.descriptionmob}
                            buttonText={slide.buttontext || ""}
                            buttonLink={slide.link || ""}
                        />
                    )}
                </div>
            ))}

            <div className="absolute bottom-12 lg:bottom-auto lg:top-[55%] lg:-translate-y-1/2 right-12 z-30 flex flex-col gap-3">
                {sliderData.map((_, index) => (
                    <div
                        key={index}
                        className={cn(
                            "bg-primary-500/80 rounded-full w-1.5 h-6 transition-all ease-in-out duration-1000",
                            index === currentSlide && "bg-black h-20 w-1.5",
                        )}
                    />
                ))}
            </div>
        </div>
    );
}
