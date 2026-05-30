import Link from "next/link";

const SECTIONS = [
	{ title: "Introduction", slug: "introduction" },
	{ title: "Getting Started", slug: "getting-started" },
	{ title: "API Reference", slug: "api" },
	{ title: "Algorithm", slug: "algorithm" },
	{ title: "Subject Grouping", slug: "subject" },
];

export function Sidebar() {
	return (
		<nav>
			<ul>
				{SECTIONS.map((s) => (
					<li key={s.slug}>
						<Link href={`/${s.slug}`}>{s.title}</Link>
					</li>
				))}
			</ul>
		</nav>
	);
}
