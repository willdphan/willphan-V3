/** @type {import('tailwindcss/tailwind-config').TailwindConfig} */
module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	darkMode: 'class',
	theme: {
		extend: {
			fontFamily: {
				Space: ['Space Grotesk', 'sans-serif'],
				Sans: ['DM Sans', 'sans-serif'],
				Inter: ['Inter', 'sans-serif'],
			},
		},
		screens: {
			xs: '420px',
			sm: '640px',
			// => @media (min-width: 640px) { ... }

			md: '768px',
			// => @media (min-width: 768px) { ... }

			lg: '1024px',
			// => @media (min-width: 1024px) { ... }

			xl: '1280px',
			// => @media (min-width: 1280px) { ... }

			'2xl': '1536px',
			// => @media (min-width: 1536px) { ... }
		},
	},
	plugins: [],
}
