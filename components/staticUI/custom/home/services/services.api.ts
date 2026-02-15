export interface Service {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    img: string;
    link: string;
    linkText: string;
}

export const services: Service[] = [
    {
        id: 1,
        title: "Home Services",
        subtitle: "avail premier home services at your doorstep",
        description:
            "Protect your eyes with regular eye check ups without stepping out of the comfort of your home",
        img: "/images/home/services/img3.jpg",
        link: "#",
        linkText: "book a home service",
    },
    {
        id: 2,
        title: "Gift card",
        subtitle:
            "style. care. choice. all in ne gift card for your loved ones",
        description:
            "Give the gift of clarity, comfort and cnfidence with One Card from GKB Opticals   ",
        img: "/images/home/services/img2.jpg",
        link: "#",
        linkText: "get a gift card",
    },
    {
        id: 3,
        title: "Store Locator",
        subtitle: "find the nearest vision destination just a click away",
        description:
            "Explore our curated eyewear collections and find the perfect pair for you",
        img: "/images/home/services/img3.jpg",
        link: "#",
        linkText: "find a store",
    },
];
