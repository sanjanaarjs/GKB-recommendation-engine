import Text from "@/components/generic/Text";

export default function ReturnAndRefund() {
    return (
        <div>
            {/* Title */}
            <div className="lg:py-20 lg:px-[306px] px-10 py-6 bg-background-grey">
                <Text
                    font="helvetica"
                    weight="light"
                    size="customText16"
                    className="leading-[36px] lg:leading-[64px] w-[151px] lg:w-full"
                >
                    returns <br className="lg:hidden" /> and refunds
                </Text>
            </div>

            {/* Content */}
            <div className="lg:px-[306px] lg:py-20 px-10 pt-6 py-10">
                <ul className="list-disc pl-5 space-y-4 mb-10">
                    <li>
                        <Text
                            font="helvetica"
                            weight="normal"
                            size="customText7"
                            className="leading-[20px] lg:leading-[28px]"
                            as="span"
                        >
                            Products must be returned{" "}
                        </Text>
                        <Text
                            font="helvetica"
                            weight="extrabold"
                            size="customText7"
                            className="leading-[18px] lg:leading-[24px]"
                            as="span"
                        >
                            within 7 days of delivery
                        </Text>
                        <Text
                            font="helvetica"
                            weight="normal"
                            size="customText7"
                            className="leading-[32px]"
                            as="span"
                        >
                            , and
                        </Text>
                        <Text
                            font="helvetica"
                            weight="extrabold"
                            size="customText7"
                            className="leading-[18px] lg:leading-[24px]"
                            as="span"
                        >
                            {" "}
                            no later than 14 days
                        </Text>{" "}
                        <Text
                            font="helvetica"
                            weight="normal"
                            size="customText7"
                            className="leading-[32px]"
                            as="span"
                        >
                            from the date of receipt.{" "}
                        </Text>
                    </li>

                    <li>
                        <Text
                            font="helvetica"
                            weight="normal"
                            size="customText7"
                            className="leading-[32px]"
                            as="span"
                        >
                            Once returned the product will undergo a
                        </Text>
                        <Text
                            font="helvetica"
                            weight="extrabold"
                            size="customText7"
                            className="leading-[18px] lg:leading-[24px]"
                            as="span"
                        >
                            {" "}
                            quality inspection
                        </Text>{" "}
                        <Text
                            font="helvetica"
                            weight="normal"
                            size="customText7"
                            className="leading-[32px]"
                            as="span"
                        >
                            {" "}
                            before any refund is processed.
                        </Text>
                    </li>

                    <li>
                        <Text
                            font="helvetica"
                            weight="normal"
                            size="customText7"
                            className="leading-[32px]"
                            as="span"
                        >
                            Refunds will be issued
                        </Text>{" "}
                        <Text
                            font="helvetica"
                            weight="extrabold"
                            size="customText7"
                            className="leading-[18px] lg:leading-[24px]"
                            as="span"
                        >
                            only if the product is unworn, and in brand new
                            condition
                        </Text>
                        <Text
                            font="helvetica"
                            weight="normal"
                            size="customText7"
                            className="leading-[32px]"
                            as="span"
                        >
                            , and includes:
                        </Text>
                        <ul className="list-disc pl-6 mt-3 space-y-2">
                            <li>
                                <Text
                                    font="helvetica"
                                    weight="normal"
                                    size="customText7"
                                    className="leading-[32px]"
                                    as="span"
                                >
                                    Original sealed box
                                </Text>
                            </li>
                            <li>
                                <Text
                                    font="helvetica"
                                    weight="normal"
                                    size="customText7"
                                    className="leading-[32px]"
                                    as="span"
                                >
                                    Instruction manual
                                </Text>
                            </li>
                            <li>
                                <Text
                                    font="helvetica"
                                    weight="normal"
                                    size="customText7"
                                    className="leading-[32px]"
                                    as="span"
                                >
                                    Warranty card
                                </Text>
                            </li>
                            <li>
                                <Text
                                    font="helvetica"
                                    weight="normal"
                                    size="customText7"
                                    className="leading-[32px]"
                                    as="span"
                                >
                                    All accessories (if applicable)
                                </Text>
                            </li>
                        </ul>
                    </li>
                </ul>

                {/* Exchange Policy */}
                <div>
                    <Text
                        font="helvetica"
                        weight="light"
                        size="customText19"
                        className="leading-[32px] lg:leading-[40px] mb-6"
                    >
                        Exchange policy
                    </Text>
                    <ul className="list-disc pl-5">
                        <li>
                            <Text
                                font="helvetica"
                                weight="normal"
                                size="customText7"
                                className="leading-[32px]"
                                as="span"
                            >
                                If you’re not satisfied with your purchase, you
                                may{" "}
                            </Text>
                            <Text
                                font="helvetica"
                                weight="extrabold"
                                size="customText7"
                                className="leading-[18px] lg:leading-[24px]"
                                as="span"
                            >
                                {" "}
                                exchange it for another product of equal value
                            </Text>
                            <Text
                                font="helvetica"
                                weight="extrabold"
                                size="customText7"
                                className="leading-[18px] lg:leading-[24px]"
                                as="span"
                            >
                                {" "}
                                within 7 days of receipt.
                            </Text>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
