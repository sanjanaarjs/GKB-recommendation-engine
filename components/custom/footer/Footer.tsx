import Text from "@/components/generic/Text";
import Image from "next/image";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import Plus from "@/components/icons/Plus";
import Minus from "@/components/icons/Minus";
import {
    FooterCmsPageInfo,
    FooterItemData,
    getFooterSections,
} from "./footerData";
import { getHomepageData } from "@/lib/services/magento/homepageData";
import { toSentenceCase } from "@/lib/store/commonFunction/sentenceFormat";

export interface FooterDataV1 {
    section: string;
    cmsPageInfo: FooterCmsPageInfo;
    itemsData: FooterItemData[];
}

export default async function Footer() {
    const footerData = await getFooterSections();
    const footerStores = await getHomepageData(
        "home-page-2",
        "section_10_footer_stores",
    );

    const footerSectionsData = footerData.flat();

    const normalizedSections = footerSectionsData.slice(0, 5).map((section) => {
        const item = section.itemsData[0];
        let links: { title: string; url: string }[] = [];

        try {
            if (item.additional_info) {
                const parsed = JSON.parse(item.additional_info);
                links = Array.isArray(parsed) ? parsed : [parsed];
            }
        } catch {
            console.warn("Invalid additional_info JSON:", item.additional_info);
        }

        return {
            title: item.name,
            links,
        };
    });

    let contactInfo: { title: string; url: string; record_id?: string }[] = [];
    try {
        const raw = footerSectionsData?.[5]?.itemsData?.[0]?.additional_info;
        if (raw) {
            const parsed = JSON.parse(raw);
            contactInfo = Array.isArray(parsed) ? parsed : [parsed];
        }
    } catch {
        console.warn(
            "Invalid contact additional_info JSON:",
            footerSectionsData?.[5]?.itemsData?.[0]?.additional_info,
        );
    }

    let policies: { title: string; url: string }[] = [];

    try {
        const parsed = JSON.parse(
            footerSectionsData?.[7]?.itemsData?.[0]?.additional_info || "[]",
        );
        policies = Array.isArray(parsed) ? parsed : [parsed];
    } catch (e) {
        console.warn("Invalid footer policies JSON:", e);
    }

    return (
        <>
            <footer className="bg-font-main  px-[40px] lg:px-20 pt-6 pb-12 md:py-12 text-sm">
                {/* for desktop */}
                <div className="flex flex-wrap justify-between gap-y-8 gap-x-4 pb-0 hidden md:flex">
                    {normalizedSections.map((section, idx) => (
                        <div key={idx}>
                            <Text
                                size="lg"
                                weight="normal"
                                color="white"
                                className="mb-6"
                                font="helvetica"
                            >
                                {toSentenceCase(section.title)}
                            </Text>

                            {section.links.length > 0 && (
                                <ul className="space-y-2">
                                    {section.links.map((link, i) => (
                                        <Link
                                            href={
                                                link.url?.startsWith("/")
                                                    ? link.url
                                                    : `/${link.url}`
                                            }
                                            key={`${link.url}-${i}`}
                                            className="cursor-pointer mb-3 last:mb-0 block"
                                        >
                                            <Text
                                                size="sm"
                                                weight="light"
                                                color="white"
                                                font="helvetica"
                                            >
                                                {toSentenceCase(
                                                    link.title,
                                                )}{" "}
                                            </Text>
                                        </Link>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </div>

                {/* for mobile */}
                <Accordion
                    type="single"
                    collapsible
                    className="block md:hidden"
                >
                    {normalizedSections.map((section, index) => (
                        <AccordionItem
                            key={index}
                            value={`section-${index}`}
                            className="border-b border-font-secondary last:border-b"
                        >
                            <AccordionTrigger className="group py-8 [&>svg]:hidden">
                                <Text
                                    as="p"
                                    size="xl"
                                    weight="light"
                                    color="white"
                                    font="helvetica"
                                >
                                    {toSentenceCase(section.title)}
                                </Text>
                                <div className="keep">
                                    <Plus
                                        size={24}
                                        className="group-data-[state=open]:hidden"
                                    />
                                    <Minus
                                        size={24}
                                        className="hidden group-data-[state=open]:block"
                                    />
                                </div>
                            </AccordionTrigger>

                            <AccordionContent>
                                {section.links.length > 0 && (
                                    <ul className="pl-4 space-y-2 py-2">
                                        {section.links.map((link, i) => (
                                            <li
                                                key={i}
                                                className="cursor-pointer"
                                            >
                                                <Link
                                                    href={
                                                        link.url?.startsWith(
                                                            "/",
                                                        )
                                                            ? link.url
                                                            : `/${link.url}`
                                                    }
                                                    key={`${link.url}-${i}`}
                                                >
                                                    <Text
                                                        size="sm"
                                                        as="span"
                                                        color="primary500"
                                                        font="helvetica"
                                                    >
                                                        {toSentenceCase(
                                                            link.title,
                                                        )}
                                                    </Text>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </footer>
            {/* footer image section - desktop */}
            <div className="overflow-x-auto md:overflow-visible lg:block hidden">
                <div className="flex flex-nowrap w-max md:w-full">
                    {footerStores.map((store, index) => (
                        <div
                            key={index}
                            className="relative w-full group cursor-pointer"
                        >
                            {store.attachment && (
                                <Image
                                    src={store.attachment}
                                    alt={`${store.description}`}
                                    width={370}
                                    height={449}
                                    className="object-cover static min-w-full"
                                />
                            )}
                            <div
                                className="absolute bottom-0 left-0 w-full h-100 bg-[linear-gradient(0deg,_rgba(0,0,0,1)_0%,_rgba(255,255,255,0)_52%,_rgba(255,255,255,0)_100%)] md:bg-none md:hidden

"
                            />
                            <div className="absolute left-8 w-[50%] md:w-full md:left-0 bottom-8 md:bottom-0 md:top-0 md:items-center md:justify-center md:hidden md:group-hover:flex md:bg-tertiary-800">
                                <Text
                                    as="span"
                                    font="helvetica"
                                    weight="contactTitle"
                                    color="white"
                                    className="text-center md:w-[70%] lg:text-xl 2xl:text-3xl"
                                >
                                    {store.description}
                                </Text>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <footer className="bg-font-main  px-[40px] lg:px-20 pt-6 pb-12 md:py-12 text-sm">
                {/* 1 */}
                <div className="flex flex-col md:flex-row justify-between items-center text-center gap-12 md:gap-4 md:pb-6">
                    <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-[61px]">
                        {contactInfo.map((item, idx) => (
                            <div
                                key={item.record_id || idx}
                                className="flex items-center lg:gap-[61px] flex-col lg:flex-row gap-y-4"
                            >
                                <div>
                                    <Text
                                        className="mb-[6px] lg:text-left"
                                        as="p"
                                        size="customText13"
                                        weight="contactTitle"
                                        color="white"
                                        font="helvetica"
                                    >
                                        {toSentenceCase(item.title)}
                                    </Text>
                                    <Text
                                        as="p"
                                        size="customText14"
                                        weight="contactNumber"
                                        color="white"
                                        font="helvetica"
                                    >
                                        {item.url}
                                    </Text>
                                </div>
                                {idx < contactInfo.length - 1 && (
                                    <Text
                                        as="span"
                                        size="customText15"
                                        weight="light"
                                        font="helvetica"
                                        className="lg:text-[#B2B2B2] text-font-secondary"
                                    >
                                        or
                                    </Text>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-font-secondary pt-6 md:pt-0 md:border-t-0 w-full md:w-auto">
                        <Text
                            weight="contactTitle"
                            className="text-left md:text-right mb-0"
                            as="p"
                            size="customText1"
                            color="white"
                        >
                            {footerSectionsData?.[6]?.itemsData?.[0]?.name}
                        </Text>
                        <div className="max-w-7xl mx-auto flex flex-wrap gap-2 justify-start md:justify-end">
                            {footerSectionsData?.[6]?.itemsData?.[0]
                                ?.attachment && (
                                <Image
                                    src={
                                        footerSectionsData?.[6]?.itemsData?.[0]
                                            ?.attachment
                                    }
                                    alt={
                                        footerSectionsData?.[6]?.itemsData?.[0]
                                            ?.name
                                    }
                                    width={154}
                                    height={8}
                                    className="w-auto"
                                />
                            )}
                        </div>
                    </div>
                </div>
                {/* 2 */}
                <div className="flex items-center md:justify-between border-t-0 md:border-t border-font-secondary md:pt-5 text-center text-xs text-white/60">
                    <Text
                        className="hidden md:block"
                        size="xs"
                        weight="light"
                        color="white"
                        font="helvetica"
                    >
                        {toSentenceCase(
                            footerSectionsData?.[7]?.itemsData?.[0]
                                ?.description ?? "",
                        )}
                    </Text>
                    <div className="mt-[18px] md:mt-2 flex justify-center gap-6">
                        {policies.map((policy, i) => (
                            <Link href={`/${policy.url}`} key={i}>
                                <Text
                                    as="span"
                                    size="customtext2"
                                    weight="customtext2"
                                    color="white"
                                >
                                    {toSentenceCase(policy.title)}
                                </Text>
                            </Link>
                        ))}
                    </div>
                </div>
            </footer>
            {/* footer image section - mobile*/}
            <div className="overflow-x-auto md:overflow-visible lg:hidden block">
                <div className="flex flex-nowrap w-max md:w-full">
                    {footerStores.map((store, index) => (
                        <div
                            key={index}
                            className="relative w-full group cursor-pointer"
                        >
                            {store.attachment && (
                                <Image
                                    src={store.attachment}
                                    alt={`${store.description}`}
                                    width={370}
                                    height={449}
                                    className="object-cover static min-w-full"
                                />
                            )}
                            <div
                                className="absolute bottom-0 left-0 w-full h-100 bg-[linear-gradient(0deg,_rgba(0,0,0,1)_0%,_rgba(255,255,255,0)_52%,_rgba(255,255,255,0)_100%)] md:bg-none md:hidden

"
                            />
                            <div className="absolute left-8 w-[50%] md:w-full md:left-0 bottom-8 md:bottom-0 md:top-0 md:items-center md:justify-center md:hidden md:group-hover:flex md:bg-tertiary-800">
                                <Text
                                    as="span"
                                    font="helvetica"
                                    weight="contactTitle"
                                    size="xl3"
                                    color="white"
                                    className="text-center md:w-[70%]"
                                >
                                    {store.description}
                                </Text>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <footer className="bg-font-main px-[40px] pt-2 pb-6 text-sm lg:hidden block">
                <Text
                    size="xs"
                    weight="light"
                    color="white"
                    font="helvetica"
                    className="text-center"
                >
                    {toSentenceCase(
                        footerSectionsData?.[7]?.itemsData?.[0]?.description ??
                            "",
                    )}
                </Text>
            </footer>
        </>
    );
}
