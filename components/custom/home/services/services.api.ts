import { ItemData } from "@/lib/services/magento/homepageData";

export interface Service {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    img: string;
    link: string;
    imgMob: string;
    linkText: string;
}

export function transformServicesData(data: ItemData[]): Service[] {
    // split into first 3 (subtitle) and next 3 (detailed)
    const firstSet = data.slice(0, 3);
    const secondSet = data.slice(3);

    return firstSet.map((item, index): Service => {
        const detailed = secondSet[index];
        return {
            id: index + 1,
            title: item.name.replace(/\b\w/g, (char) => char.toUpperCase()), // Capitalize
            subtitle: item.description ?? "",
            description: detailed?.description ?? "",
            img: detailed?.attachment || "/images/home/services/default.jpg",
            link: detailed?.link || "#",
            linkText: detailed?.buttontext || "",
            imgMob: detailed?.attachmentmob ?? "",
        };
    });
}
