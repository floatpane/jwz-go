import type { Metadata } from "next";
import "./globals.css";
import "highlight.js/styles/github-dark.css";

export const metadata: Metadata = {
	title: "jwz-go",
	description:
		"Jamie Zawinski's mail-threading algorithm for Go. Pure-Go, zero dependencies, locale-aware subject fallback.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<header className="site-header">
					<a href="/" className="brand">
						jwz-go
					</a>
					<nav>
						<a href="https://github.com/floatpane/jwz-go">GitHub</a>
					</nav>
				</header>
				<main>{children}</main>
			</body>
		</html>
	);
}

export const viewport = { width: "device-width", initialScale: 1 };
