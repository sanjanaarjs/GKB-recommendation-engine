import Text from "@/components/generic/Text";
import Image from "next/image";

export default function Card2() {
    return (
        <div className="flex flex-col h-full w-full relative justify-end items-center pb-20">
            <Image
                src="/images/home/best-seller/bg1.png"
                alt="Michael Kors"
                fill
                className="object-cover"
            />
            <div className="z-10">
                <button className="primary-button px-12 py-4 rounded-full">
                    <Text
                        as="p"
                        font="helvetica"
                        size="xl2"
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
