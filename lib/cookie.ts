"use server";

import { cookies } from "next/headers";

export async function createCookie(cookieName: string, cookieValue: string) {
    const cookieStore = await cookies();
    cookieStore.set(cookieName, cookieValue || "en", {
        httpOnly: true,
        path: "/",
        secure: true,
    });
}

export async function getCookieValue(name: string) {
    const cookieStore = cookies();
    return (await cookieStore).get(name)?.value;
}

export async function hasCookie(cookieName: string) {
    const cookieStore = cookies();
    const cookie = (await cookieStore).get(cookieName);
    return !!cookie;
}
export async function deleteCookie(
    name: string,
    opts?: { path?: string; domain?: string },
) {
    const store = await cookies();
    store.set(name, "", {
        path: opts?.path ?? "/",
        domain: opts?.domain,
        maxAge: 0,
        expires: new Date(0),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
    });
}
