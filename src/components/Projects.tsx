import React from 'react'
import Link from 'next/link'
import { useState } from 'react'
import Masonry from 'react-masonry-css'

function Projects() {
	const [showMore, setShowMore] = useState(false)

	const projects = [
		{
			title: 'SOLIDITY',
			name: 'One of One',
			description: 'One Of One NFT editions using Minimal Proxy. Draft of gas efficient deployments.',

			code: 'https://github.com/willdphan/1-of-1.git',
		},
		{
			title: 'PYTHON',
			name: 'Jarvis',
			description:
				"Playing with OpenAI's API. Jarvis, A GPT Voice Assistant was made with speech recognition, OpenAI's Whisper, and Gradio",
			code: 'https://github.com/willdphan/jarvis-whisperr',
		},
		{
			title: 'SOLIDITY',
			name: 'ERC20-YUL',
			description:
				'Used to practice coding in Yul. Made to be gas-efficient. Obviously, not optimal for production.',

			code: 'https://github.com/willdphan/erc20-yul',
		},
		{
			title: 'SOLIDITY',
			name: 'RSVP',
			description:
				'Show Up or Pay Up. A fee is required to attend a meeting. If absent, you lose the fee you initially paid upfront.',
			code: 'https://github.com/willdphan/rsvp',
		},
		{
			title: 'TYPESCRIPT',
			name: 'Kaleidor',
			description:
				'On-Chain NFTs. The price structure of the minted NFTs are based on VRGDAs. SVGs are pre-rendered so you see what you get.',
			frontend: 'https://kaleidor.vercel.app/',
		},
		{
			title: 'SOLIDITY',
			name: 'Latter',
			description:
				'Mini-implementation of Affirm - Buy Now, Pay Later. Pay-in-four model is implemented, where 4 payments are made every 2 weeks for an NFT.',
			code: 'https://github.com/willdphan/latter-contracts.git',
		},
		{
			title: 'SOLIDITY',
			name: 'Shade',
			description:
				'On-chain generative art. 111 NFTs, each a different pattern. Every NFT is different, unique and can be minted on the Shade dapp frontend.',
			frontend: 'https://shade-pi.vercel.app/',
		},
		{
			title: 'SOLIDITY',
			name: 'Splitz',
			description:
				'A mini-implementation of 0xSplitz. Send funds to a group and when received, funds are split among the designated recipients automatically.',
			frontend: 'https://splitz.vercel.app',
			code: 'https://github.com/willdphan/splitz-contracts',
		},
		{
			title: 'SOLIDITY',
			name: 'Ratio',
			description:
				'A mini-implementation of Fractional. Each NFT that intends to be fractionalized would be deposited into a vault by utilizing a clone factory (Vault Factory).',
			frontend: 'https://ratio-flame.vercel.app',
			code: 'https://github.com/willdphan/ratio-contracts',
		},
	]

	return (
		<section id="projects">
			<Masonry breakpointCols={2} className="my-masonry-grid flex gap-2" columnClassName="my-masonry-grid_column">
				{projects.slice(0, showMore ? projects.length : 6).map(project => (
					<div
						key={project.name}
						className="my-masonry-grid_column mb-2 w-full bg-[#121212] rounded-lg py-10 px-10 space-y-2 transform transition duration-300 sm:hover:scale-[1.01] sm:hover:bg-gradient-to-br from-[#405580] via-[#8c9ab7] to-[#FFFFFF] text-[#9B9B9B] hover:text-white"
					>
						<h2 className="text-xs font-Space text-white tracking-widest">{project.title}</h2>
						<h1 className="text-xl font-Space font-medium text-white">{project.name}</h1>
						<p className="text-sm leading-relaxed font-Sans">{project.description}</p>
						<div className="flex space-x-4 pt-4">
							{project.frontend && (
								<a
									href={project.frontend}
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center hover:cursor-pointer font-Sans text-sm text-[#405580] pr-3"
								>
									Frontend
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
										<path fill="none" d="M0 0h24v24H0z" />
										<path
											d="M16.004 9.414l-8.607 8.607-1.414-1.414L14.589 8H7.004V6h11v11h-2V9.414z"
											fill="#405580"
										/>
									</svg>
								</a>
							)}
							{project.code && (
								<a
									href={project.code}
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center hover:cursor-pointer font-Sans text-sm text-[#405580] pr-3"
								>
									Code
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
										<path fill="none" d="M0 0h24v24H0z" />
										<path
											d="M16.004 9.414l-8.607 8.607-1.414-1.414L14.589 8H7.004V6h11v11h-2V9.414z"
											fill="#405580"
										/>
									</svg>
								</a>
							)}
						</div>
					</div>
				))}
			</Masonry>
			{projects.length > 3 && (
				<button
					className="pl-2 pt-5 flex items-center hover:cursor-pointer font-Space text-sm text-white decoration underline underline-offset-4"
					onClick={() => setShowMore(!showMore)}
				>
					{showMore ? 'SHOW LESS' : 'SHOW MORE'}
				</button>
			)}
		</section>
	)
}

export default Projects
