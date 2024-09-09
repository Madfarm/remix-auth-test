export type Theme = "light" | "dark" | "system";

/**
 * This component is used to set the theme based on the value at hydration time.
 * If no value is found, it will default to the user's system preference and
 * coordinates with the ThemeSwitcherScript to prevent a flash of unstyled content
 * and a React hydration mismatch.
 */
export function ThemeSwitcherSafeHTML({
	children,
	lang,
	...props
}: React.HTMLProps<HTMLHtmlElement> & { lang: string }) {
	const dataTheme =
		typeof document === "undefined"
			? undefined
			: document.documentElement.getAttribute("data-theme") || undefined;

	return (
		<html {...props} lang={lang} data-theme={dataTheme}>
			{children}
		</html>
	);
}