/** @type {import('tailwindcss/tailwind-config').TailwindConfig} */
module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	darkMode: 'class',
	theme: {
		extend: {
			fontFamily: {
				Space: ['Space Grotesk', 'sans-serif'],
				Sans: ['DM Sans', 'sans-serif'],
			},
		},
	},
	plugins: [],
}
