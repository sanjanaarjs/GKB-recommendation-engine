import { getStoreConfig } from "@/lib/services/magento/storeData";
import Header from "./Header";
import { getHomePageData } from "./headerData/AnnouncementBar.api";
import { getTopFlashMessage } from "./headerData/TopFlashMsg.api";
import { GetExplore } from "./menu/datas/explore.data.api";
import { GetBrandCategories } from "./menu/datas/featureBrand.data.api";
import { GetHeaderMenu } from "./menu/datas/menu.api";

export default async function HeaderWrap() {
    const [
        topHeaderResponse,
        topFlashResponse,
        storeConfigData,
        exploreCategories,
        brandCategories,
        categories,
    ] = await Promise.all([
        getHomePageData({
            cmsIdentifier: "home-page-2",
            section: "section_1",
        }),
        getTopFlashMessage(),
        getStoreConfig(),
        GetExplore(),
        GetBrandCategories(),
        GetHeaderMenu(),
    ]);

    const items = topHeaderResponse?.data?.[0]?.itemsData;
    const announcementsData = items && items.length > 0 ? items : [];

    const announcements = Array.isArray(topFlashResponse)
        ? topFlashResponse.map((item) => ({
              description: item.description.replace("{link}", item.ctaLable),
              ctaHyperlink: item.ctaHyperlink,
          }))
        : [];

    return (
        <Header
            announcementsData={announcementsData}
            announcements={announcements}
            storeConfigData={storeConfigData}
            exploreCategories={exploreCategories}
            brandCategories={brandCategories}
            categories={categories}
        />
    );
}
