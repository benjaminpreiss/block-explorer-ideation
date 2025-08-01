"use client";
import { ReactNode } from "react";
import ReactQueryProvider from "./ReactQueryProvider";
import Search, { SearchContextProvider } from "./Search";

export default function ClientProviders({ children }: { children: ReactNode }) {
	return (
		<SearchContextProvider>
			<Search />
			<ReactQueryProvider>{children}</ReactQueryProvider>
		</SearchContextProvider>
	);
}
