import authenticator from "./services/auth.server";

import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	isRouteErrorResponse,
	useRouteError,
	useLoaderData
} from "@remix-run/react";
import { json } from "@remix-run/node";

import { Header } from "./components/Header";
import {
	ThemeSwitcherSafeHTML,
	ThemeSwitcherScript,
} from "./components/theme-switcher";

import "./globals.css";
import { LoaderFunctionArgs } from "@remix-run/node";


export const loader = async ({
	request,
}: LoaderFunctionArgs) => {
	return json({ user: await authenticator.isAuthenticated(request) });
	  
}

function App({ children }: { children: React.ReactNode }) {
	

	return (
		<ThemeSwitcherSafeHTML lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
				<ThemeSwitcherScript />
			</head>
			<body className="overflow-hidden">
				<Header />
				{children}
				<ScrollRestoration />
				<Scripts />
			</body>
		</ThemeSwitcherSafeHTML>
	);
}

export default function Root() {
	return (
		<App>
			<Outlet />
		</App>
	);
}

export function ErrorBoundary() {
	const error = useRouteError();
	let status = 500;
	let message = "An unexpected error occurred.";
	if (isRouteErrorResponse(error)) {
		status = error.status;
		switch (error.status) {
			case 404:
				message = "Page Not Found";
				break;
		}
	} else {
		console.error(error);
	}

	return (
		<App>
			<div className="container prose py-8">
				<h1>{status}</h1>
				<p>{message}</p>
			</div>
		</App>
	);
}