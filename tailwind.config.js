/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				msgUser: "#6CB4EE",
				msgBot: "#F0F8FF",
			},
		},
	},
	plugins: [],
};
