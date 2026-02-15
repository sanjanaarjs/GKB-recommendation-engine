import Text from "@/components/generic/Text";
import Image from "next/image";
import { CategoryItem } from "./datas/menu.api";
import { ExploreQueryResponse } from "./datas/explore.data.api";
import Link from "next/link";

export default function CategoryMenu({
    eyewearCategory,
    exploreCategories,
}: {
    eyewearCategory: CategoryItem;
    exploreCategories: ExploreQueryResponse["getSearchSection"] | null;
}) {
    return (
        <div className="w-full h-full bg-black flex flex-col px-48 pb-20">
            <div className="flex flex-row gap-24 mb-8 justify-between">
                {eyewearCategory.children?.map((category) => (
                    <div key={category.uid}>
                        <Text
                            as="h2"
                            font="avenir"
                            size="lg"
                            color="fontSecondary"
                            className="mb-3"
                        >
                            {category.name}
                        </Text>
                        <ul className="flex flex-col gap-2">
                            {category.children?.map((child) => (
                                <li key={child.uid}>
                                    <Link href={`/${child.url_path}`}>
                                        <Text
                                            as="span"
                                            font="avenir"
                                            size="base"
                                            color="white"
                                            className="cursor-pointer"
                                        >
                                            {child.name}
                                        </Text>
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <Link href={`/${category.url_path}`}>
                                    <Text
                                        as="span"
                                        font="avenir"
                                        size="base"
                                        color="white"
                                        className="cursor-pointer underline"
                                    >
                                        View All
                                    </Text>
                                </Link>
                            </li>
                        </ul>
                    </div>
                ))}
            </div>
            <div className="w-full h-full bg-black flex flex-col">
                <div>
                    <Text
                        as="h2"
                        font="avenir"
                        size="lg"
                        color="fontSecondary"
                        className="mb-3"
                    >
                        Also explore
                    </Text>
                    <ul className="flex flex-row gap-16">
                        {exploreCategories?.data.map((item) => (
                            <li key={item.id}>
                                <div className="w-[200px] h-[100px] relative">
                                    {item.image && (
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className="object-cover"
                                        />
                                    )}
                                </div>
                                <Text
                                    as="span"
                                    font="avenir"
                                    size="base"
                                    color="white"
                                    className="cursor-pointer"
                                >
                                    {item.title}
                                </Text>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
