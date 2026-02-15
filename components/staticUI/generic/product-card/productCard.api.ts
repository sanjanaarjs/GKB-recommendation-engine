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
    title: string;
    subtitle?: string;
    images: string[];
    price: number;
    tryOn?: boolean;
    shopNow?: boolean;
    thumbnailImages?: string[];
}

export interface ImageItem {
    type: "image";
    src: string;
    mobileSrc: string;
    alt: string;
    large?: boolean; // if true → col-span-2 lg:col-span-3
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
