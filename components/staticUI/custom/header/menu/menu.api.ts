export interface CategoryColumn {
    title: string;
    mobileTitle: string;
    items: string[];
}

export interface CategoryMenuData {
    columns: CategoryColumn[];
    alsoExplore: {
        label: string;
        image: string;
    }[];
}

export const categoryMenuData: CategoryMenuData = {
    columns: [
        {
            title: "Eyeglasses",
            mobileTitle: "Eyeglasses",
            items: [
                "Men",
                "Women",
                "Junior & kids",
                "Bestsellers",
                "New arrivals",
                "Available for home try-on",
                "View all",
            ],
        },
        {
            title: "Sunglasses",
            mobileTitle: "Sunglasses",
            items: [
                "Men",
                "Women",
                "Junior & kids",
                "Bestsellers",
                "New arrivals",
                "Prescription",
                "Available for home try-on",
                "View all",
            ],
        },
        {
            title: "Contact lenses",
            mobileTitle: "Contact lenses",
            items: [
                "Monthly disposable",
                "Bi-weekly disposable",
                "Daily disposable",
                "Quarterly disposable",
                "Clear",
                "Colored",
                "View all",
            ],
        },
        {
            title: "Collections",
            mobileTitle: "Collections & Collaborations",
            items: [
                "Active Lifestyle",
                "Summer ’25",
                "Streetwear",
                "Fashion",
                "Audibles",
            ],
        },
    ],
    alsoExplore: [
        {
            label: "Lens guide",
            image: "/images/header/also-explore/img4.png",
        },
        {
            label: "GKB Luxe",
            image: "/images/header/also-explore/img3.png",
        },
        {
            label: "Gift card",
            image: "/images/header/also-explore/img2.png",
        },
        {
            label: "Rayban x Meta",
            image: "/images/header/also-explore/img1.png",
        },
    ],
};

export interface BrandsMenuData {
    columns: CategoryColumn[];
    featured: string[];
}

export const brandsMenuData = {
    columns: [
        {
            title: "All brands | A - Z",
            mobileTitle: "Brands",
            items: [
                "Armani Exchange",
                "Arnette",
                "Burberry",
                "Carrera",
                "Coolers",
                "CR7",
                "David Beckham",
                "Dolce & Gabbana",
                "Emporio Armani",
                "Esprit",
                "Giorgio Armani",
                "GKB Legacy",
                "Guess",
                "Hamamoto",
                "Hublot",
                "Hugo Boss",
                "Iarra",
                "Image",
                "Inspira",
                "Lance Bremmer",
                "Marc Jacobs",
                "Maui Jim",
                "Michael Kors",
                "Nova",
                "Oakley",
                "Polaroid",
                "Police",
                "Porsche",
                "Prada",
                "Rayban",
                "Rocco",
                "Rodenstock",
                "Serengiti",
                "Silhouette",
                "Stepper",
                "Tom Ford",
                "Tommy Hilfiger",
                "Versace",
                "Vogue",
                "View all",
            ],
        },
    ],
    featured: [
        "/images/header/featured-brands/img1.png",
        "/images/header/featured-brands/img2.png",
        "/images/header/featured-brands/img3.png",
        "/images/header/featured-brands/img4.png",
    ],
};
