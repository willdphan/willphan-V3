import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout, { projectClasses } from 'src/pages/projects/layout'
import '@mantine/code-highlight/styles.css'
import { CodeHighlight } from '@mantine/code-highlight'
import { Code } from '@mantine/core'

import { CodeHighlightTabs } from '@mantine/code-highlight'
import Link from 'next/link'

const Project = () => {
	const fetchnfts = `
const fetchNfts = async address => {
	try {
			// fetch
			const res = await fetch('/api/nftsAxios?address=$[some_address]')
			// turn json to response
			const data = await res.json()
			// set the new data
			setNfts(data)
			console.log(data)
		} catch (error) {
			console.error(error)
		}
	}`
	const nftcard = `
const NftCard = ({ title, id, image, value, last }) => {
	const formatText = text => {
		if (text && text.length > 4) {
			return text.slice(0, 4) + '...'
		}
		return text
	}

	return (
		<section id="learnings" className="w-full px-1 flex hover:cursor hover:cursor-pointer">
			<div className="columns-1 my-2 w-full flex items-center justify-center">
				<div className="w-full max-w-[24em] sm:max-w-[30em] bg-white transform transition duration-300 sm:hover:scale-[1.01] sm:hover:bg-[#F8F8F8] text-[#9B9B9B]  mb-2 font-Mono uppercase text-lg py-5">
					<motion.div
						exit={{ opacity: 0 }}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5 }}
						className="pl-10 space-y-2 flex space-x-10 uppercase ease-in-out"
					>
						<Image width={70} height={70} src={image} alt="" />
						<div className="flex flex-col">
							<h1 className="text-black text-wrap max-w-[10em] sm:max-w-full ">{title}</h1>
							<div className="hidden sm:block sm:inline-flex space-x-3 ">
								<p className="text-gray-400">ID:{formatText(id)}</p>
								{value && <p className="text-gray-400">| FP:{Number(value).toFixed(3)}Ξ</p>}
								{last && <p className="text-gray-400">| LS:{Number(last).toFixed(3)}Ξ</p>}
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	)
}`
	const face = `
const Home: FC = () => {
	return (
		<div className="flex flex-col items-center  bg-white w-full min-h-screen ">
			<Enter />
			<div className="max-h-[55vh] flex flex-col lg:flex-row pt-36 w-full justify-center ">
				<h3 className="hidden lg:block text-black uppercase font-Mono xl:mr-36 pt-2 text-lg">William Phan</h3>
				<div>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 1 }}
						className="mb-64 mt-28 mx-5 lg:mt-0  pl-6 lg:pl-10 justify-center text-2xl md:text-4xl lg:text-[2.8rem] text-gray-400 bg-blue font-Mono uppercase max-w-[16em] sm:max-w-[20em] lg:max-w-[17em] mr-5  transition-all"
						style={{ lineHeight: '1.3' }}
					>
						Uncover your NFT assets and their stories. Type in your wallet. Use Degen now.
					</motion.div>
				</div>
			</div>
			{/* Use props below */}
			<Menu />
		</div>
	)
}`

	const router = useRouter()
	const { projectName } = router.query

	const publicationDate = 'May, 2023'

	return (
		<Layout projectName={projectName as string} publicationDate={publicationDate}>
			<div className={`${projectClasses.content}`}>
				<div>
					Degen is a Next.js application that provides a user-friendly interface for viewing NFT (Non-Fungible
					Token) portfolios. Next.js is a popular React framework that enables server-side rendering and
					generates static websites for React-based web applications.
				</div>
				<div>
					The main functionality of Degen is to allow users to view any NFT portfolio by simply pasting a
					wallet address into an input field. This feature is particularly useful for users who want to
					quickly check the NFTs associated with a specific wallet address.
				</div>
			</div>

			<br />

			<video
				autoPlay
				loop
				muted
				playsInline
				// className="w-full h-full rounded-lg border-[#121212] border-2"
				className="w-full h-full rounded-lg"
			>
				<source src="https://pub-33c643825c664d0091b84d7ae37a5150.r2.dev/degen-display.mp4" type="video/mp4" />
				Your browser does not support the video tag.
			</video>
			<br />
			<h2 id="Fetching Data" className={`${projectClasses.subheading}`}>
				Fetching Data
			</h2>

			<div className={`${projectClasses.content}`}>
				<div>
					To fetch the data, the application uses the{' '}
					<Link className={projectClasses.underline} href="https://simplehash.com/">
						Simple Hash API
					</Link>
					. This API provides information about NFTs, including their images, names, and other details. After
					fetching the data, the application displays it in a user-friendly manner, making it easy for users
					to understand and interact with the information.
				</div>
				<div>
					The application is structured in a modular way, with different components responsible for different
					parts of the application. For example, there are components for displaying NFT details, handling
					search functionality, and providing a user interface for inputting wallet addresses.
				</div>
				<div>
					The application fetches data from the Simple Hash API in the <Code>src/pages/search.tsx</Code> file.
					The
					<Code>fetchNfts</Code> function is responsible for this, where it makes a <Code>GET</Code> request
					to the API endpoint with the wallet address as a parameter. The fetched data is then stored in the
					nfts state variable using the <Code>setNfts</Code> function.
				</div>
			</div>

			<br />
			<CodeHighlight
				code={`${fetchnfts}`}
				language="tsx"
				copyLabel="Copy code"
				copiedLabel="Copied!"
				className={`${projectClasses.code}`}
			/>
			<br />

			<div className={`${projectClasses.content}`}>
				The fetched data is displayed using the <Code>NftCard</Code> component, which is defined in the
				<Code>src/components/NftCard.tsx</Code> file. This component takes in the NFT details as props and
				displays them in a user-friendly manner.
			</div>

			<br />
			<video
				autoPlay
				loop
				muted
				playsInline
				// className="w-full h-full rounded-lg border-[#121212] border-2"
				className="w-full h-full rounded-lg"
			>
				<source src="https://pub-33c643825c664d0091b84d7ae37a5150.r2.dev/degen-cards.mp4" type="video/mp4" />
				Your browser does not support the video tag.
			</video>

			<br />

			<CodeHighlightTabs
				withExpandButton
				defaultExpanded={false}
				expandCodeLabel="Show full code"
				collapseCodeLabel="Show less"
				code={[{ fileName: 'NftCard.tsx', code: nftcard, language: 'tsx' }]}
				copiedLabel="Copied!"
				className={`${projectClasses.code}`}
			/>

			<br />

			<div className={`${projectClasses.content}`}>
				The application provides a user interface for inputting wallet addresses in the{' '}
				<Code>src/pages/index.tsx</Code>
				file. The Enter component is used for this purpose.
			</div>
			<br />
			<video
				autoPlay
				loop
				muted
				playsInline
				// className="w-full h-full rounded-lg border-[#121212] border-2"
				className="w-full h-full rounded-lg"
			>
				<source src="https://pub-33c643825c664d0091b84d7ae37a5150.r2.dev/degen-address.mp4" type="video/mp4" />
				Your browser does not support the video tag.
			</video>
			<br />

			<div className={`${projectClasses.content}`}>
				The search functionality is handled in the <Code>src/pages/search.tsx</Code> file. The{' '}
				<Code>handleInputChange</Code> function updates the address state variable with the input value and
				calls the fetchNfts function to fetch the NFTs associated with the input wallet address.
			</div>

			<br />

			<CodeHighlightTabs
				withExpandButton
				defaultExpanded={false}
				expandCodeLabel="Show full code"
				collapseCodeLabel="Show less"
				code={[{ fileName: 'Home.tsx', code: face, language: 'tsx' }]}
				copiedLabel="Copied!"
				className={`${projectClasses.code}`}
			/>

			<br />
			<h2 id="Design Practice" className={`${projectClasses.subheading}`}>
				Design Practice
			</h2>
			<div className={`${projectClasses.content}`}>
				<div>
					Degen is a user-friendly application built with Next.js that leverages the Simple Hash API to allow
					users to view NFT portfolios associated with any Ethereum wallet address. The project refined my
					UI/UX design skills. Making the application user-friendly was a top priority, and achieving that
					goal required attention to detail in every aspect of the design and user interaction process.
				</div>
				<div>
					Building Degen was an immensely educational experience on multiple fronts. I delved deep into the
					intricacies of Next.js, a leading React framework. It wasn&apos;t just about setting up a basic
					project but mastering the nuances of server-side rendering and static site generation to deliver a
					fast and optimized user experience.
				</div>
				<div>
					I integrated the Simple Hash API to fetch NFT data, which was an eye-opening experience in
					understanding how to interact with external APIs, process the returned data, and transform it into a
					digestible format for end-users. The experience taught me a lot about the broader NFT ecosystem and
					how data is stored and accessed on the blockchain.
				</div>
				<div>
					All in all, working on Degen was a holistic learning journey, enriching my understanding of modern
					web frameworks, API integration, modular architecture, and domain-specific challenges in the rapidly
					evolving world of NFTs.
				</div>
			</div>
		</Layout>
	)
}

export default Project
