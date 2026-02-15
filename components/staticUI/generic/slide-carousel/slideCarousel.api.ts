export interface Slide {
    id: number;
    bgImage: string;
    heading1: string;
    italicHeading1?: string;
    heading2: string;
    paragraph?: string;
    buttonText1: string;
    slideType:
        | "slider1"
        | "slider2"
        | "slider3"
        | "mobileslider1"
        | "mobileslider2"
        | "mobileslider3";
    buttonLink1: string;
    buttonVariant1?: "primary" | "secondary" | "primary-black";
    italicHeading2?: string;
    buttonText2?: string;
    buttonLink2?: string;
    buttonVariant2?: "primary" | "secondary" | "primary-black";
    isVideo?: boolean;
    videoUrl?: string;
}

export const desktopSlides: Slide[] = [
    {
        id: 1,
        bgImage: "/images/home/slide-carousel/slide1.png",
        heading1: "Do you wear the",
        italicHeading1: "lenses",
        heading2: "that your eyes deserve?",
        paragraph:
            "Our lens selection guide will direct you to your perfect pair.",
        buttonText1: "Discover lenses",
        slideType: "slider1",
        buttonLink1: "#",
        buttonVariant1: "primary",
        isVideo: true,
        videoUrl: "/images/home/slide-carousel/end_of_sale.mp4",
    },
    {
        id: 2,
        bgImage: "/images/home/slide-carousel/slide2.png",
        heading1: "Celebrating",
        italicHeading1: "50 years",
        heading2: "of timeless vision",
        paragraph: "A legacy in trust and style",
        buttonText1: "Know your story",
        slideType: "slider1",
        buttonLink1: "#",
        buttonVariant1: "secondary",
    },
    {
        id: 3,
        bgImage: "/images/home/slide-carousel/slide3.jpg",
        heading1: "Not able to visit a store",
        heading2: "to test an",
        italicHeading2: "eye test?",
        paragraph: "Let us come to your home for the much-deserved care",
        buttonText1: "Book home service",
        slideType: "slider2",
        buttonLink1: "#",
        buttonVariant1: "secondary",
    },
    {
        id: 4,
        bgImage: "/images/home/slide-carousel/slide4.jpg",
        italicHeading1: "See",
        heading1: "the summer",
        heading2: "better!",
        buttonText1: "Sunglasses",
        buttonLink1: "#",
        buttonText2: "Eyeglasses",
        slideType: "slider3",
        buttonLink2: "#",
        isVideo: false,
        videoUrl: "/images/home/slide-carousel/end_of_sale.mp4",
    },
];

export const mobileSlides: Slide[] = [
    {
        id: 1,
        bgImage: "/images/home/slide-carousel/mob-slide1.png",
        heading1: "adventure",
        heading2: "looks good on you",
        buttonText1: "shop adventure collection",
        buttonLink1: "#",
        buttonVariant1: "primary",
        slideType: "mobileslider1",
        isVideo: true,
        videoUrl: "/images/home/slide-carousel/end_of_sale.mp4",
    },
    {
        id: 2,
        bgImage: "/images/home/slide-carousel/mob-slide2.png",
        heading1: "Our store is now",
        heading2: "at your doorstep",
        buttonText1: "book a home service",
        buttonLink1: "#",
        buttonVariant1: "secondary",
        slideType: "mobileslider2",
    },
    {
        id: 3,
        bgImage: "/images/home/slide-carousel/mob-slide3.png",
        heading1: "Lenses",
        heading2: "that loves you",
        buttonText1: "explore our lens guide",
        buttonLink1: "#",
        buttonVariant1: "primary-black",
        slideType: "mobileslider3",
    },
];
