import Text from "@/components/generic/Text";
import Minus from "@/components/icons/Minus";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Plus } from "lucide-react";

export default function AboutCards() {
    const accordionData = [
        {
            title: "Can I use an e-gift card in store?",
            content: [
                "Gift cards have no expiration date and no associated dormancy fees.",
            ],
        },
        {
            title: "Can I use a gift card or e-gift card to make a purchase online?",
            content: [
                "Gift cards have no expiration date and no associated dormancy fees.",
            ],
        },
        {
            title: "Can I make multiple purchases with a gift card?",
            content: [
                "Gift cards have no expiration date and no associated dormancy fees.",
            ],
        },
        {
            title: "Do gift cards expire?",
            content: [
                "Gift cards have no expiration date and no associated dormancy fees.",
            ],
        },
        {
            title: "What if I lose my gift card?",
            content: [
                "Gift cards have no expiration date and no associated dormancy fees.",
            ],
        },
    ];

    return (
        <div className="lg:px-[168px] bg-font-secondary/5">
            <div className="px-10 lg:px-0 pt-16 pb-4 lg:pt-16 lg:pb-12 lg:border-b-0 border-b-[0.5px] border-b-font-secondary/50">
                <Text
                    font="helvetica"
                    size="customtext4"
                    weight="light"
                    className="w-[118px] lg:w-[202px] lg:leading-16 leading-9"
                >
                    about gift cards
                </Text>
            </div>
            <Accordion
                type="single"
                collapsible
                className="w-full"
                defaultValue="item-1"
            >
                {accordionData.map((item, index) => (
                    <AccordionItem
                        key={item.title}
                        value={`item-${index}`}
                        className="border-b-[0.5px] border-b-font-secondary/50"
                    >
                        <AccordionTrigger className="flex cursor-pointer my-8 py-0 px-10 lg:p-0 justify-between group items-center [&>svg]:hidden">
                            <Text
                                font="helvetica"
                                weight="extrabold"
                                size="productTitle1"
                                className="cursor-pointer lg:w-100 w-[250px]"
                            >
                                {item.title}
                            </Text>
                            <div className="p-2 flex justify-center items-center rounded-[20px] bg-white shadow-[0_6px_24px_0_rgba(0,0,0,0.10)]">
                                <Plus
                                    size={16}
                                    className="text-black group-data-[state=open]:hidden cursor-pointer"
                                />
                                <Minus
                                    size={16}
                                    stroke="black"
                                    className="text-black hidden group-data-[state=open]:block cursor-pointer"
                                />
                            </div>
                        </AccordionTrigger>

                        <AccordionContent className="pb-8 text-balance">
                            {item.content.map((paragraph) => (
                                <Text
                                    font="helvetica"
                                    size="sm"
                                    weight="normal"
                                    key={paragraph}
                                    className="lg:pt-4 lg:text-lg lg:font-light lg:leading-5 py-0 px-10 lg:p-0"
                                >
                                    {paragraph}
                                </Text>
                            ))}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
}
