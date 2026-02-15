import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

const textVariants = cva("font-normal", {
    variants: {
        size: {
            xs: "text-xs",
            sm: "text-sm",
            base: "text-base",
            lg: "text-lg",
            xl: "text-xl",
            xl2: "text-2xl",
            xl3: "text-3xl",
            xl4: "text-4xl",
            xl5: "text-5xl",
            xl6: "text-6xl",
            xl7: "text-7xl",
            xl8: "text-8xl",
            xl9: "text-9xl",
            custom32: "text-[32px]",
            contactTitle: "text-xs md:text-xl",
            contactNumber: "text-2xl md:text-xl",
            orText: "text-base md:text-xl",
            customText1: "text-[10px] md:text-xs",
            customtext2: "text-[10px] md:text-base",
            customtext3: "text-sm md:text-[32px]",
            customtext4: "text-[28px] lg:text-5xl",
            customText5: "text-sm md:text-2xl",
            customText6: "text-xs md:text-lg",
            customText7: "text-sm md:text-xl",
            customText8: "text-2xl md:text-5xl",
            customText9: "text-base md:text-2xl",
            customText10: "text-xl md:text-5xl",
            customText11: "text-xs lg:text-base",
            customText12: "text-base lg:text-[32px]",
            customText13: "text-base md:text-xs",
            customText14: "text-base md:text-2xl",
            customText15: "lg:text-base text-xl",
            customText16: "text-[28px] lg:text-[48px]",
            customText17: "text-[28px] lg:text-[32px]",
            customText18: "text-xl lg:text-2xl",
            customText19: "text-[24px] lg:text-[32px]",
            loginTitle: "text-xl md:text-[40px]",
            gkbOpticalText: "text-lg md:text-[32px] ",
            productTitle: "text-base lg:text-xl",
            tryOn: "text-sm md:text-xl",
            productTitle1: "text-sm lg:text-base",
            productTitle2: "text-sm lg:text-lg",
            productTitle3: "text-sm lg:text-xl",
            productTitle4: "text-xs lg:text-sm",
        },
        color: {
            inherit: "text-inherit",
            default: "text-black",
            white: "text-white",
            black: "text-black",
            // Primary
            primary100: "text-primary-100",
            primary200: "text-primary-200",
            primary300: "text-primary-300",
            primary400: "text-primary-400",
            primary500: "text-primary-500",

            // Secondary
            secondary100: "text-secondary-100",
            secondary200: "text-secondary-200",

            // Tertiary
            tertiary100: "text-tertiary-100",
            tertiary200: "text-tertiary-200",
            tertiary300: "text-tertiary-300",
            tertiary400: "text-tertiary-400",
            tertiary500: "text-tertiary-500",
            tertiary600: "text-tertiary-600",

            // Font
            fontMain: "text-font-main",
            fontSecondary: "text-font-secondary",
            fontInverse: "text-font-inverse",
            fontAccent1: "text-font-accent-1",
            fontAccent2: "text-font-accent-2",
            fontError: "text-font-error",
        },
        weight: {
            light: "font-light",
            normal: "font-normal",
            medium: "font-medium",
            semibold: "font-semibold",
            bold: "font-bold",
            extrabold: "font-extrabold",
            fontblack: "font-black",
            contactTitle: "font-light md:font-normal",
            contactNumber: "font-bold md:font-normal",
            customtext2: "font-bold md:font-normal",
            customWeight1: "font-normal md:font-light",
            customWeight2: "lg:font-light font-extrabold",
            tryOn: "font-normal md:font-bold ",
        },
        font: {
            gilroy: "font-gilroy",
            avenir: "font-avenir",
            helvetica: "font-helvetica",
            montserrat: "font-montserrat",
            greatvibes: "font-greatvibes",
        },
        custom: {
            h1Desktop: "text-5xl font-normal",
            h1Mobile: "text-[32px] font-light",
            h2: "text-[32px] font-medium",
            h3: "text-2xl font-normal",
            h4: "text-xl font-bold",
            h5: "text-base font-bold uppercase tracking-[0.25em]",
            subtitle1: "text-base font-medium",
            subtitle2: "text-xl font-normal",
            body1: "text-base font-normal",
            body2: "text-xs font-normal",
            caption: "text-[11px] font-normal tracking-[0.04em]",
            overline: "text-[10px] font-normal uppercase tracking-[0.15em]",
        },
    },
    defaultVariants: {
        size: "base",
        color: "default",
        weight: "normal",
        font: "avenir",
    },
});

export default function Text({
    as: Comp = "p",
    className,
    size,
    color,
    weight,
    font = "avenir",
    custom,
    children,
    ...props
}: {
    as?: React.ElementType;
    className?: string;
    size?:
        | "xs"
        | "sm"
        | "base"
        | "lg"
        | "xl"
        | "xl2"
        | "xl3"
        | "xl4"
        | "xl5"
        | "xl6"
        | "xl7"
        | "xl8"
        | "xl9"
        | "custom32"
        | "contactTitle"
        | "contactNumber"
        | "orText"
        | "customText1"
        | "customtext2"
        | "customtext3"
        | "customtext4"
        | "customText5"
        | "customText6"
        | "customText7"
        | "customText8"
        | "customText9"
        | "customText10"
        | "customText11"
        | "customText12"
        | "customText13"
        | "customText14"
        | "customText15"
        | "customText16"
        | "customText17"
        | "customText18"
        | "customText19"
        | "productTitle"
        | "gkbOpticalText"
        | "loginTitle"
        | "tryOn"
        | "productTitle1"
        | "productTitle2"
        | "productTitle3"
        | "productTitle4";
    color?:
        | "inherit"
        | "default"
        | "white"
        | "black"
        | "primary100"
        | "primary200"
        | "primary300"
        | "primary400"
        | "primary500"
        | "secondary100"
        | "secondary200"
        | "tertiary100"
        | "tertiary200"
        | "tertiary300"
        | "tertiary400"
        | "tertiary500"
        | "tertiary600"
        | "fontMain"
        | "fontSecondary"
        | "fontInverse"
        | "fontAccent1"
        | "fontAccent2"
        | "fontError";
    weight?:
        | "normal"
        | "medium"
        | "bold"
        | "semibold"
        | "extrabold"
        | "light"
        | "contactTitle"
        | "contactNumber"
        | "fontblack"
        | "customtext2"
        | "customWeight1"
        | "customWeight2"
        | "tryOn";
    font?: "gilroy" | "avenir" | "helvetica" | "montserrat" | "greatvibes";
    custom?:
        | "h1Desktop"
        | "h1Mobile"
        | "h2"
        | "h3"
        | "h4"
        | "h5"
        | "subtitle1"
        | "subtitle2"
        | "body1"
        | "body2"
        | "caption"
        | "overline";
    children: React.ReactNode;
}) {
    return (
        <Comp
            className={cn(
                textVariants({ size, color, weight, font, custom }),
                className,
            )}
            {...props}
        >
            {children}
        </Comp>
    );
}
