import Text from "@/components/generic/Text";
import { brandsMenuData } from "./menu.api";
import Image from "next/image";

export default function BrandMenu() {
    return (
        <div className="w-full h-full bg-black flex flex-col px-48 pb-20">
            <div>
                {brandsMenuData.columns.map((column) => (
                    <div
                        key={column.title}
                        className="flex flex-col gap-5 mb-10"
                    >
                        <Text
                            as="h2"
                            font="avenir"
                            size="xl2"
                            color="fontSecondary"
                            className="mb-6"
                        >
                            {column.title}
                        </Text>
                        <ul className="grid grid-cols-4 gap-4">
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
                        Featured brands
                    </Text>
                    <ul className="flex flex-row items-center gap-16">
                        {brandsMenuData.featured.map((item) => (
                            <li key={item}>
                                <Image
                                    src={item}
                                    alt={"Icon"}
                                    width={100}
                                    height={50}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
