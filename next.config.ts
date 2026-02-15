import type { NextConfig } from "next";
const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "gkb.localhost",
            },
            {
                protocol: "https",
                hostname: "dev-app.gkboptical.com",
            },
            {
                protocol: "https",
                hostname: "dev-gkb.s3.ap-south-1.amazonaws.com",
            },
            {
                protocol: "https",
                hostname: "d1f2zfbmtys0sf.cloudfront.net",
            },
            {
                protocol: "https",
                hostname: "mediagkboptical.gumlet.io",
            },
        ],
    },
    async headers() {
        return [
            {
                source: "/:path*",
                headers: [
                    {
                        key: "X-Robots-Tag",
                        value: "noindex, nofollow, noarchive, nosnippet",
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
