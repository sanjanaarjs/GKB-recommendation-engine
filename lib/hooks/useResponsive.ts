"use client";

import { useState, useEffect } from "react";

export function useResponsive() {
    const [windowSize, setWindowSize] = useState<{
        width: number;
        height: number;
    }>({
        width: 0,
        height: 0,
    });

    const isMobile: boolean = windowSize.width < 768;
    const isTablet: boolean =
        windowSize.width >= 768 && windowSize.width < 1024;
    const isDesktop: boolean = windowSize.width >= 1024;

    useEffect(() => {
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        handleResize();

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return {
        windowSize,
        isMobile,
        isTablet,
        isDesktop,
    };
}
