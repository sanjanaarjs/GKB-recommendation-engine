export const formatOrderDate = (dateStr?: string): string => {
    if (!dateStr) return "";

    const date = new Date(dateStr.replace(" ", "T"));

    return date
        .toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        })
        .replace(/ /g, "-");
};
