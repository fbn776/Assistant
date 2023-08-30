/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	darkMode: "class",
	theme: {
		extend: {
			colors: {
				/** Abbreviations:
				 * l - light mode
				 * d - dark mode
				 * prim - primary
				 * secnd - secondary
				 * cont - container
				 * bg - background
				 * txt - text
				 */
				//Light mode;
				l: {
					prim: {
						DEFAULT: "#0070FF",
						txt: "#000000",
						variant: "#CED4DA",
						cont: {
							bg: "#FFFFFF",
							variant: "#F5F5F5",
							txt: "#000000",
						},
					},
					secnd: {
						DEFAULT: "#F5F5F5",
						txt: "#000000",
						variant: "#B9D9EB",
						cont: {
							bg: "#FFFFFF",
							variant: "#F5F5F5",
							txt: "#000000",
						},
					},
				},
				//Dark mode;
				d: {
					prim: {
						DEFAULT: "#007FFF",
						txt: "#FFFFFF",
						variant: "#475569",
						cont: {
							bg: "#212529",
							variant: "#2B3035",
							txt: "#FFFFFF",
						},
					},
					secnd: {
						DEFAULT: "#212529",
						txt: "#FFFFFF",
						variant: "#",
						cont: {
							bg: "#343A40",
							variant: "#",
							txt: "#FFFFFF",
						},
					},
				},
			},
		},
	},
	plugins: [],
};
