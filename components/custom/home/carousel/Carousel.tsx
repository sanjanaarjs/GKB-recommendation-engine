import SlideCarousel from "@/components/generic/slide-carousel/SlideCarousel";
import { ItemData } from "@/lib/services/magento/homepageData";

export interface SliderDataProps {
    data: ItemData[] | [];
    dataMobile: ItemData[] | [];
}

export default function Carousel({ data, dataMobile }: SliderDataProps) {
    return (
        <div className="h-[calc(100vh-56px)] lg:h-[calc(100vh-96px-48px)]">
            <div className="hidden lg:block h-full w-full">
                <SlideCarousel onlyDesktop slides={data} />
            </div>
            <div className="lg:hidden h-full w-full">
                <SlideCarousel onlyMobile slides={dataMobile} />
            </div>
        </div>
    );
}
