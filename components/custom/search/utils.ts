export const normalizeSearchQuery = (value?: string | string[]): string => {
    if (typeof value === "undefined" || value === null) {
        return "";
    }

    const query = Array.isArray(value) ? value[0] : value;

    try {
        return decodeURIComponent(query);
    } catch {
        return query;
    }
};
