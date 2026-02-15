import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatPrice(price: number) {
    const hasDecimal = !Number.isInteger(price);

    return price.toLocaleString("en-IN", {
        minimumFractionDigits: hasDecimal ? 2 : 0,
        maximumFractionDigits: hasDecimal ? 2 : 0,
    });
}

export const saveSkuToHistory = (sku: string) => {
    if (typeof window === "undefined") return; // ensure it's client-side only

    // Get existing search history from localStorage (parse into string[])
    const existing = localStorage.getItem("searchHistory");
    const history: string[] = existing ? JSON.parse(existing) : [];

    console.log("Existing historyData --->>", history);

    // Add the new SKU only if it doesn't already exist
    if (!history.includes(sku)) {
        history.push(sku);
    }

    // Optional: keep only last N items (e.g., last 10)
    const updatedHistory: string[] = history.slice(-10);

    // Save back to localStorage as an array of strings
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
};

export function splitIntoSentences(text: string): string[] {
    if (!text) return []; // handle null/undefined/empty string safely

    return text
        .split(".")
        .map((sentence) => sentence.trim())
        .filter((sentence) => sentence.length > 0)
        .map((sentence) => sentence + ".");
}

export const makeStreetLines = (streetArr?: string[]) => {
    if (!streetArr || streetArr.length === 0) return ["", ""];

    if (streetArr.length > 1)
        return [
            String(streetArr[0] || "").trim(),
            String(streetArr[1] || "").trim(),
        ];

    const single = String(streetArr[0] || "").trim();
    if (!single) return ["", ""];

    // Only split on our internal delimiter '||'
    if (single.includes("||")) {
        const [first, ...rest] = single.split("||");
        return [String(first || "").trim(), rest.join("||").trim() || ""];
    }

    // Do NOT split on comma
    return [single, ""];
};
