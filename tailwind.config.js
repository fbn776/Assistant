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
						DEFAULT: "#73C2FB",
						txt: "#000000",
						variant: "#CED4DA",
						cont: {
							bg: "#FFFFFF",
							variant: "#F5F5F5",
							txt: "#000000",
						},
					},
					secnd: {
						DEFAULT: "#7BAFD4",
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
						DEFAULT: "#0000B8",
						txt: "#FFFFFF",
						variant: "#475569",
						cont: {
							bg: "#212529",
							variant: "#2B3035",
							txt: "#FFFFFF",
						},
					},
					secnd: {
						DEFAULT: "#16166B",
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
