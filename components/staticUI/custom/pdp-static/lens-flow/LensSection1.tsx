import Text from "@/components/generic/Text";
import Image from "next/image";

export default function LensSection1({
    setCurrentSection,
}: {
    setCurrentSection: (section: number) => void;
}) {
    const options = [
        {
            title: "Single-vision",
            description:
                "Lenses with one consistent prescription throughout the lens, designed to correct either distance or near vision.",
            img: "/images/pdp/lens/vis.png",
        },
        {
            title: "Progressives",
            description:
                "These lenses offer a seamless transition between multiple prescriptions in one lens, allowing clear vision at all distances — near, intermediate, and far — without any visible lines.",
            img: "/images/pdp/lens/vis.png",
        },
        {
            title: "Readers",
            description:
                "Designed for short-distance viewing, these lenses provide clear vision for reading and computer work.",
            img: "/images/pdp/lens/vis.png",
        },
        {
            title: "Bifocal",
            description:
                "These lenses are designed for those who do not have a prescription, but want to wear GKB lenses for style or protection.",
            img: "/images/pdp/lens/vis.png",
        },
        {
            title: "Single-vision",
            description:
                "Lenses with one consistent prescription throughout the lens, designed to correct either distance or near vision.",
            img: "/images/pdp/lens/vis.png",
        },
        {
            title: "Progressives",
            description:
                "These lenses offer a seamless transition between multiple prescriptions in one lens, allowing clear vision at all distances — near, intermediate, and far — without any visible lines.",
            img: "/images/pdp/lens/vis.png",
        },
        {
            title: "Readers",
            description:
                "Designed for short-distance viewing, these lenses provide clear vision for reading and computer work.",
            img: "/images/pdp/lens/vis.png",
        },
        {
            title: "Bifocal",
            description:
                "These lenses are designed for those who do not have a prescription, but want to wear GKB lenses for style or protection.",
            img: "/images/pdp/lens/vis.png",
        },
    ];

    return (
        <div>
            <Text
                as="p"
                size="xl5"
                weight="light"
                color="fontMain"
                font="helvetica"
                className="w-2/3 text-3xl lg:text-5xl"
            >
                what is your prescription type?
            </Text>
            <Text
                as="p"
                size="base"
                weight="light"
                color="fontMain"
                font="helvetica"
                className="py-6 w-3/4 text-sm lg:text-base"
            >
                The first step towards finding your ideal GKB lenses is by
                knowing which type you need. It all depends on your prescription
                and the distances where you find it hard to see clearly.
            </Text>
            <div className="flex flex-col gap-4">
                {options.map((option, index) => (
                    <button
                        key={index}
                        className="cursor-pointer p-4 lg:p-6 bg-white rounded-lg flex gap-4 items-center border border-transparent hover:border-primary-500 transition-all duration-300"
                        onClick={() => setCurrentSection(2)}
                    >
                        <Image
                            src={option.img}
                            alt={option.title}
                            width={96}
                            height={79}
                            className="w-[96px] h-[79px]"
                        />
                        <div className="flex flex-col gap-2 items-start grow-0">
                            <Text
                                as="p"
                                size="base"
                                weight="bold"
                                color="black"
                                font="helvetica"
                                className="text-sm lg:text-base"
                            >
                                {option.title}
                            </Text>
                            <Text
                                as="p"
                                size="base"
                                weight="light"
                                color="fontMain"
                                font="helvetica"
                                className="text-left text-xs sm:text-sm lg:text-base"
                            >
                                {option.description}
                            </Text>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}
