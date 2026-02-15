"use client";

import { createCookie } from "@/lib/cookie";
import { useEffect } from "react";

export default function SetStoreCookieClient({
    cookieName,
    cookieValue,
}: {
    cookieName: string;
    cookieValue: string;
}) {
    useEffect(() => {
        if (cookieName && cookieValue) {
            createCookie(cookieName, cookieValue);
        }
    }, [cookieName, cookieValue]);

    return null;
}
