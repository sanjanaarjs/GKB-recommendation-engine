import sanitizeHtml from "sanitize-html";
import he from "he";
import { Oswald } from "next/font/google";
import { getCmsPage } from "@/lib/services/magento/cmsPage";

const oswald = Oswald({
    subsets: ["latin"],
    weight: ["200", "300", "400", "500", "600", "700"],
});

export default async function RaybanPage() {
    const cmsPage = await getCmsPage("sis-rayban-page");
    const decodedHtml = he.decode(cmsPage?.content ?? "");
    const safeHtml = sanitizeHtml(decodedHtml, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat([
            "img",
            "video",
            "source",
            "section",
            "main",
            "header",
            "footer",
            "h1",
            "h2",
            "h3",
            "span",
            "div",
        ]),
        allowedAttributes: {
            "*": ["class", "id", "data-*"],
            a: ["href", "title", "target", "rel"],
            img: ["src", "alt", "title", "loading"],
            video: [
                "src",
                "controls",
                "autoplay",
                "muted",
                "loop",
                "playsinline",
                "poster",
            ],
            source: ["src", "type"],
        },
        allowedSchemes: ["http", "https", "mailto", "tel"],
        transformTags: {
            a: sanitizeHtml.simpleTransform("a", {
                rel: "noopener noreferrer",
            }),
        },
    });

    return (
        <div
            className={`${oswald.className} bg-white text-black`}
            dangerouslySetInnerHTML={{ __html: safeHtml }}
        />
    );
}
