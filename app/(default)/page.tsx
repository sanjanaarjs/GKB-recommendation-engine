import HomePage from "./HomePage";
import {
    getBrands,
    getHomepageData,
} from "@/lib/services/magento/homepageData";

export default async function Home() {
    const [
        sliderData,
        sliderDataMobile,
        bestSellerData,
        lensData,
        frameData,
        brandBanner,
        brandData,
        aboutData,
        ctabannerData,
        serviceData,
    ] = await Promise.all([
        getHomepageData("home-page-2", "homepage_banner_1"),
        getHomepageData("home-page-2", "mob_homepage_banner_1"),
        getHomepageData("home-page-2", "section_3"),
        getHomepageData("home-page-2", "section_4"),
        getHomepageData("home-page-2", "section_5"),
        getHomepageData("home-page-2", "section_6"),
        getBrands(),
        getHomepageData("home-page-2", "section_7_read_about"),
        getHomepageData("home-page-2", "section_9_cta_banner"),
        getHomepageData("home-page-2", "section_8_services"),
    ]);

    return (
        <HomePage
            sliderData={sliderData}
            sliderDataMobile={sliderDataMobile}
            bestSeller={bestSellerData}
            lensData={lensData}
            frameData={frameData}
            brandBanner={brandBanner}
            brandsData={brandData}
            aboutData={aboutData}
            serviceData={serviceData}
            ctabannerData={ctabannerData}
        />
    );
}
