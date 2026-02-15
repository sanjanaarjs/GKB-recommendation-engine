import Text from "@/components/generic/Text";
import Image from "next/image";

export default function Card1() {
    return (
        <div className="flex flex-col h-full w-full bg-black py-24 pl-8 sm:pl-20">
            <Image
                src="/images/home/best-seller/log.jpg"
                alt="Michael Kors"
                width={180}
                height={114}
                className="h-[114px]"
            />
            <Text
                as="p"
                font="helvetica"
                size="xl3"
                color="white"
                weight="light"
                className="pt-10 lowercase leading-12"
            >
                Casual. Glamorous.
                <br />
                <br />
                AN EXCLUSIVE DESIGNER
                <br /> COLLECTION OF STYLES THAT
                <br /> COMBINES STYLISH
                <br /> ELEGANCE AND A SPORTY
                <br /> ATTITUDE.
            </Text>
            <div className="flex justify-start">
                <button className="primary-button mt-12 px-12 py-4 rounded-full">
                    <Text
                        as="p"
                        font="helvetica"
                        size="lg"
                        color="inherit"
                        weight="bold"
                    >
                        Discover more
                    </Text>
                </button>
            </div>
        </div>
    );
}
