import Text from "@/components/generic/Text";
// import { brandsMenuData } from "./menu.api";
import Image from "next/image";
import { CategoryItem } from "./datas/menu.api";
import { FeatureBrandCategory } from "./datas/featureBrand.data.api";
import Link from "next/link";

export default function BrandMenu({
    brandcategory,
    featurebrands,
}: {
    brandcategory: CategoryItem;
    featurebrands: FeatureBrandCategory[];
}) {
    const visibleBrands = (brandcategory?.children || [])
        .filter((child) => Boolean(child?.include_in_menu))
        .slice(0, 20);

    return (
        <div className="w-full h-full bg-black flex flex-col px-48 pb-20">
            <div>
                <div className="flex flex-col gap-5 mb-8">
                    <Text
                        as="h2"
                        font="avenir"
                        size="lg"
                        color="fontSecondary"
                        className="mb-0"
                    >
                        All brands | A - Z
                    </Text>
                    <ul className="grid grid-cols-4 gap-2">
                        {visibleBrands?.map((brandcategory) => (
                            <li key={brandcategory.uid}>
                                <Link href={`/${brandcategory.url_path}`}>
                                    <Text
                                        as="span"
                                        font="avenir"
                                        size="base"
                                        color="white"
                                        className="cursor-pointer"
                                    >
                                        {brandcategory.name}
                                    </Text>
                                </Link>
                            </li>
                        ))}
                        <li>
                            <Link href={`/${brandcategory.url_path}`}>
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
            </div>
            <div className="w-full h-full bg-black flex flex-col flex-wrap  gap-x-8 gap-y-6">
                <div>
                    <Text
                        as="h2"
                        font="avenir"
                        size="lg"
                        color="fontSecondary"
                        className="mb-3"
                    >
                        Featured brands
                    </Text>
                    <ul className="flex flex-row items-center gap-16">
                        {featurebrands.map((item) => (
                            <li key={item.id} className="min-w-[100px]">
                                {item.thumbnail && (
                                    <Image
                                        src={item.thumbnail}
                                        alt={item.name}
                                        width={100}
                                        height={50}
                                    />
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
