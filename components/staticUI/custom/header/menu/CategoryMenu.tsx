import Text from "@/components/generic/Text";
import { categoryMenuData } from "./menu.api";
import Image from "next/image";

export default function CategoryMenu() {
    return (
        <div className="w-full h-full bg-black flex flex-col px-48 pb-20">
            <div className="flex flex-row gap-24 mb-10 justify-between">
                {categoryMenuData.columns.map((column) => (
                    <div key={column.title}>
                        <Text
                            as="h2"
                            font="avenir"
                            size="xl2"
                            color="fontSecondary"
                            className="mb-6"
                        >
                            {column.title}
                        </Text>
                        <ul className="flex flex-col gap-4">
                            {column.items.map((item) => (
                                <li key={item}>
                                    <Text
                                        as="span"
                                        font="avenir"
                                        size="xl"
                                        color="white"
                                        className="cursor-pointer"
                                    >
                                        {item}
                                    </Text>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <div className="w-full h-full bg-black flex flex-col">
                <div>
                    <Text
                        as="h2"
                        font="avenir"
                        size="xl2"
                        color="fontSecondary"
                        className="mb-6"
                    >
                        Also explore
                    </Text>
                    <ul className="flex flex-row gap-16">
                        {categoryMenuData.alsoExplore.map((item) => (
                            <li key={item.label}>
                                <div className="w-[200px] h-[100px] relative">
                                    <Image
                                        src={item.image}
                                        alt={item.label}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <Text
                                    as="span"
                                    font="avenir"
                                    size="xl"
                                    color="white"
                                    className="cursor-pointer"
                                >
                                    {item.label}
                                </Text>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
