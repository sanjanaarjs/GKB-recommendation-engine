import Footer from "@/components/custom/footer/Footer";
import HeaderLoader from "@/components/custom/header/HeaderLoader";
import HeaderWrap from "@/components/custom/header/HeaderWrap";
import { AuthProvider } from "@/lib/context/AuthContext";
import { ReactLenis } from "lenis/react";
import { Suspense } from "react";

export default function MarketingLayout({
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
