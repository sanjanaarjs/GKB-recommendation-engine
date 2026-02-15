"use client";

import Carousel from "@/components/custom/home/carousel/Carousel";
// import BestSeller from "@/components/custom/home/bestseller/BestSeller";
import Lens from "@/components/custom/home/lens/Lens";
import Frames from "@/components/custom/home/frames/Frames";
import Brands from "@/components/custom/home/brands/Brands";
import Aboutus from "@/components/custom/home/aboutus/Aboutus";
import USP from "@/components/custom/home/usp/USP";
import Services from "@/components/custom/home/services/Services";
import { BrandCategory, ItemData } from "@/lib/services/magento/homepageData";
import BestSeller from "@/components/custom/home/bestseller/BestSeller";

// Props Interface
export interface HomePageProps {
    sliderData: ItemData[] | [];
    sliderDataMobile: ItemData[] | [];
    bestSeller: ItemData[] | [];
    lensData: ItemData[] | [];
    frameData: ItemData[] | [];
    brandBanner: ItemData[] | [];
    brandsData: BrandCategory[] | [];
    aboutData: ItemData[] | [];
    serviceData: ItemData[] | [];
    ctabannerData: ItemData[] | [];
}

export default function HomePage({
    sliderData,
    sliderDataMobile,
    bestSeller,
    lensData,
    frameData,
    brandBanner,
    brandsData,
    aboutData,
    ctabannerData,
    serviceData,
}: HomePageProps) {
    return (
        <div>
            <Carousel data={sliderData} dataMobile={sliderDataMobile} />
            <BestSeller data={bestSeller} />
            <Lens data={lensData} />
            <Frames data={frameData} />
            <Brands data={brandsData} brandBanner={brandBanner} />
            <Aboutus data={aboutData} />
            <Services data={serviceData} />
            <USP data={ctabannerData} />
        </div>
    );
}
