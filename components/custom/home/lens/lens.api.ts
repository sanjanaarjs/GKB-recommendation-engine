export interface LensProps {
    slides: {
        title: string;
        description: string;
        image: string;
    }[];
}

export const lensApi: LensProps = {
    slides: [
        {
            title: "Everyday Casuals",
            description: "choose the best lens suited for your lifestyle",
            image: "/images/home/lens/lens1.jpg",
        },
        {
            title: "Outdoors",
            description: "choose the best lens suited for your lifestyle",
            image: "/images/home/lens/lens2.jpg",
        },
        {
            title: "Active Life",
            description: "choose the best lens suited for your lifestyle",
            image: "/images/home/lens/lens3.png",
        },
    ],
};
