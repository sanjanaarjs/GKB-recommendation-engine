"use client";

import { ReactNode } from "react";
import { ApolloProvider } from "@apollo/client";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/lib/store/store";
import apolloClient from "@/lib/services/magento/apolloClient";

export default function Providers({ children }: { children: ReactNode }) {
    return (
        <ApolloProvider client={apolloClient}>
            <ReduxProvider store={store}>{children}</ReduxProvider>
        </ApolloProvider>
    );
}
