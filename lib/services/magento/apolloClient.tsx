import { deleteCookie, getCookieValue } from "@/lib/cookie";
import { ApolloClient, InMemoryCache, from, HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { env } from "next-runtime-env";

const authLink = setContext(async (_, { headers }) => {
    const token = await getCookieValue("userToken");
    if (token && typeof token === "string") {
        return {
            headers: {
                ...headers,
                authorization: token ? `Bearer ${atob(token)}` : "",
            },
        };
    }
    return headers;
});

export const handleUnauthorized = async () => {
    if (typeof window !== "undefined") {
        try {
            localStorage.clear();

            sessionStorage.clear();

            await deleteCookie("userToken");
        } catch (err) {
            console.error("Error during authentication cleanup:", err);
        }
        window.location.href = "/";
    }
};

const errorLink = onError(({ graphQLErrors, networkError }) => {
    // GraphQL-layer errors
    if (graphQLErrors) {
        for (const err of graphQLErrors) {
            const msg = (err.message || "").toLowerCase();
            const category = err.extensions?.category;
            //const code = err.extensions?.code;

            const isUnauthorizedMessage =
                msg.includes("current customer isn't authorized") ||
                msg.includes("not authorized");

            const isUnauthorizedCategory = category === "graphql-authorization";

            // const isUnauthenticatedCode = code === 'UNAUTHENTICATED';

            if (isUnauthorizedMessage || isUnauthorizedCategory) {
                handleUnauthorized();
                return;
            }
        }
    }
    // Network-layer 401
    if (
        networkError &&
        "statusCode" in networkError &&
        networkError.statusCode === 401
    ) {
        handleUnauthorized();
    }
});

const createClient = (uri?: string) => {
    return new ApolloClient({
        link: from([
            errorLink,
            authLink.concat(
                new HttpLink({
                    uri: uri || "/graphql",
                }),
            ),
        ]),
        cache: new InMemoryCache({
            addTypename: false,
            resultCaching: false,
        }),
        defaultOptions: {
            watchQuery: { fetchPolicy: "no-cache" },
            query: { fetchPolicy: "no-cache" },
            mutate: { fetchPolicy: "no-cache" },
        },
    });
};

const apolloClient = createClient(
    env("NEXT_PUBLIC_APOLLO_CLIENT_ENDPOINT") ||
        process.env.NEXT_PUBLIC_APOLLO_CLIENT_ENDPOINT,
);

export default apolloClient;
