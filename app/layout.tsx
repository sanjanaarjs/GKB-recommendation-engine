import "./globals.css";
import "leaflet/dist/leaflet.css";
import Providers from "./providers";
import { PublicEnvScript } from "next-runtime-env";
import { Toaster } from "react-hot-toast";

export const metadata = {
    title: "Buy sunglasses &amp; shades online for men, women &amp; kids  - GKB Opticals",
    description:
        "Shop stylish sunglasses online for men, women &amp; kids in different shapes - aviator, wayfarer, rectangle, round etc. *Fastest Delivery, *International Brands.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <link
                    rel="icon"
                    href="/images/favicon.webp"
                    type="image/webp"
                />
                <meta name="robots" content="noindex,nofollow" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, viewport-fit=cover"
                />
                <PublicEnvScript />
            </head>
            <body className={`antialiased`}>
                <Providers>{children}</Providers>
                <Toaster position="top-right" />
            </body>
        </html>
    );
}
