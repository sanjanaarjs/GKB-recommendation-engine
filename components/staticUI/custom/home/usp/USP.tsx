import Text from "@/components/generic/Text";

export default function USP() {
    return (
        <div
            className="w-full h-screen relative bg-cover bg-center bg-fixed flex flex-col items-center lg:items-end justify-center px-4 sm:px-16"
            style={{ backgroundImage: "url(/images/home/brands/bg2.jpg)" }}
        >
            <div className="flex flex-col items-center justify-center max-w-[800px]">
                <Text
                    as="h2"
                    size="xl6"
                    weight="bold"
                    font="helvetica"
                    color="white"
                    className="text-center text-xl lg:text-3xl leading-normal mb-10"
                >
                    See the difference with GKB Opticals
                </Text>
                <div>
                    <Text
                        as="span"
                        size="customtext4"
                        weight="light"
                        font="helvetica"
                        color="white"
                        className="text-center"
                    >
                        schedule a home
                    </Text>{" "}
                    <Text
                        as="span"
                        size="customtext4"
                        weight="bold"
                        font="helvetica"
                        color="fontAccent1"
                        className="text-center italic"
                    >
                        eye check-up
                    </Text>
                    ,{" "}
                    <Text
                        as="span"
                        size="customtext4"
                        weight="light"
                        font="helvetica"
                        color="white"
                        className="text-center"
                    >
                        discover curated
                    </Text>{" "}
                    <Text
                        as="span"
                        size="customtext4"
                        weight="bold"
                        font="helvetica"
                        color="fontAccent1"
                        className="text-center italic "
                    >
                        eyewear
                    </Text>
                    <Text
                        as="span"
                        size="customtext4"
                        weight="light"
                        font="helvetica"
                        color="white"
                        className="text-center"
                    >
                        collections, and find the perfect
                    </Text>{" "}
                    <Text
                        as="span"
                        size="customtext4"
                        weight="bold"
                        font="helvetica"
                        color="fontAccent1"
                        className="text-center italic"
                    >
                        lenses
                    </Text>
                    ,{" "}
                    <Text
                        as="span"
                        size="customtext4"
                        weight="light"
                        font="helvetica"
                        color="white"
                        className="text-center"
                    >
                        eye check-up without stepping out!
                    </Text>
                </div>
            </div>
        </div>
    );
}
