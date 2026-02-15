import Footer from "@/components/custom/footer/Footer";
import HeaderLoader from "@/components/custom/header/HeaderLoader";
import HeaderWrap from "@/components/custom/header/HeaderWrap";
import { AuthProvider } from "@/lib/context/AuthContext";
import { ReactLenis } from "lenis/react";
import { Suspense } from "react";

export const metadata = {
    title: "Buy sunglasses &amp; shades online for men, women &amp; kids  - GKB Opticals",
    description:
        "Shop stylish sunglasses online for men, women &amp; kids in different shapes - aviator, wayfarer, rectangle, round etc. *Fastest Delivery, *International Brands.",
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <AuthProvider>
                <ReactLenis root />
                <Suspense fallback={<HeaderLoader />}>
                    <HeaderWrap />
                </Suspense>
                {children}
                <Footer />
            </AuthProvider>
        </>
    );
}
