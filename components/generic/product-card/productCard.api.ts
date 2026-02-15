// export interface ProductCardProps {
//     title: string | undefined;
//     subtitle: string;
//     images: string[];
//     price: number;
//     tag?: string;
//     thumbnailImages?: string[];
//     tryOn?: boolean;
//     shopNow?: boolean;
// }

export interface ProductCardProps {
    type?: "product";
    tag?: string;
    title: string | null | undefined;
    subtitle?: string;
    images: string[];
    price: number | string;
    tryOn?: boolean;
    recentlyViewed?: boolean;
    shopNow?: boolean;
    tagClassName?: string;
    thumbnailImages?: string[];
    colorSwatches?: ApiColorSwatch[];
    currency?: string | null;
    url_key?: string | null;
    ishideShopNowAtMobile?: boolean;
    showPrice?: boolean;
    sku?: string | undefined;
    onWishlistClick?: (id: string) => void | Promise<void>;
    isWishlisted?: boolean;
    isRemoving?: boolean;
}

export interface ApiColorSwatch {
    frame_color_primary: string;
    hashcode: string;
    id: number;
    is_current?: string;
    name: string;
    url_key: string;
    sku: string;
}

export interface ImageItem {
    type: "image";
    src: string;
    mobileSrc: string;
    alt: string;
    large?: boolean; // if true → col-span-2 lg:col-span-3
    tag: string;
    title: string;
    images: string[];
    price: number;
    subtitle?: string;
    tryOn?: boolean;
    shopNow?: boolean;
    recentlyViewed?: boolean;
}

export type GridItem = ProductCardProps | ImageItem;

export const colorSwatch = [
    {
        label: "CoffeeBrown",
        hex: "#7c502c",
    },
    {
        label: "WhitDesert Storme",
        hex: "#585a77",
    },
    {
        label: "Orange",
        hex: "#353535",
    },
    {
        label: "Grey",
        hex: "#4f4e4f",
    },
    {
        label: "Blue",
        hex: "#0e56c2",
    },
    {
        label: "Black",
        hex: "#000000",
    },
];
