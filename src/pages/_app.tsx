import 'tailwindcss/tailwind.css'
import { ThemeProvider } from 'next-themes'
import Web3Provider from '@/components/Web3Provider'
import 'src/styles/globals.css'
import Head from 'next/head'
import favicon from 'public/images/favico.ico'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/react'

const App = ({ Component, pageProps }) => {
	return (
		<ThemeProvider attribute="class">
			<Web3Provider>
				{/* FAVICON */}
				<Head>
					{/* LINK TITLE */}
					<title>William Phan</title>
					<link rel="shortcut icon" className="rounded-full" href="/images/favico.ico" />
				</Head>

				<Component {...pageProps} />

				<Analytics />
			</Web3Provider>
		</ThemeProvider>
	)
}

export default App
