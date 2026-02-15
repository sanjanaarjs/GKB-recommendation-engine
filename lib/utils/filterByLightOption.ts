export function filterByLightOption<T extends { title: string }>(
    options: T[],
    lightOption?: string | null,
): T[] {
    if (!lightOption) return options;

    const allowedLabels = lightOption
        .split(",")
        .map((item) => item.trim().toLowerCase());

    return options.filter((opt) =>
        allowedLabels.includes(opt.title.toLowerCase()),
    );
}
