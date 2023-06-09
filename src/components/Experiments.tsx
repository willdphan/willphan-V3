import React from 'react'
import Link from 'next/link'
import { useState } from 'react'
import Masonry from 'react-masonry-css'

function Experiments() {
	const [showMore, setShowMore] = useState(false)

	const experiments = [
		{
			title: 'TYPESCRIPT',
			name: 'DEGEN',
			description: 'Uncover your NFT assets and their stories. Paste in your wallet to get started.',
			frontend: 'https://degen-kappa.vercel.app/',
			demo: 'https://twitter.com/willdphan/status/1660381395947077633?s=20',
		},
		{
			title: 'PYTHON',
			name: 'ATOM',
			description: 'A personal assistant for managing and reviewing my schedule when I wake up.',
			code: 'https://github.com/willdphan/atom-v2',
			demo: 'https://twitter.com/willdphan/status/1652442555533885441?s=20',
		},
		{
			title: 'SOLIDITY',
			name: 'RICKS-V2',
			description:
				'A fractionalized ERC721 auction contract that uses VRGDA as pricing logic and allows for buyouts.',

			code: 'https://github.com/willdphan/RICKS-V2.git',
		},
		{
			title: 'SOLIDITY',
			name: 'One of One',
			description: 'One Of One NFT editions using Minimal Proxy. Draft of gas efficient deployments.',

			code: 'https://github.com/willdphan/1-of-1.git',
		},
		{
			title: 'SOLIDITY',
			name: 'ERC20-YUL',
			description:
				'Used to practice coding in Yul. Made to be gas-efficient. Obviously, not optimal for production.',

			code: 'https://github.com/willdphan/erc20-yul',
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
	]

	return (
		<section id="experiments">
			<Masonry
				breakpointCols={{ default: 2, 700: 1 }}
				className="my-masonry-grid flex gap-2 relative"
				columnClassName="my-masonry-grid_column"
			>
				{/* <!-- Animation Snippet --> */}
				{/* <div className="flex h-5 w-5 top-3 right-2 absolute z-10">
					<span className="animate-ping absolute h-4 w-4 rounded-full bg-[#405580] opacity-75"></span>
					<span className="relative rounded-full h-4 w-4 bg-[#9B9B9B] flex items-center justify-center text-[#405580] text-xs">
						?
					</span>
				</div> */}
				{/* <!-- Animation Snippet --> */}
				{experiments.slice(0, showMore ? experiments.length : 6).map(project => (
					<div
						key={project.name}
						className="my-masonry-grid_column mb-2 w-full bg-[#121212] rounded-lg py-10 px-10 space-y-2 transform transition duration-300 sm:hover:scale-[1.01] sm:hover:bg-gradient-to-br from-[#405580] via-[#8c9ab7] to-[#FFFFFF] text-[#9B9B9B] hover:text-white"
					>
						<h2 className="text-xs font-Space text-white tracking-widest">{project.title}</h2>
						<h1 className="text-xl font-Space font-medium text-white">{project.name}</h1>
						<p className="text-sm leading-relaxed font-Sans">{project.description}</p>
						<div className="flex space-x-4 pt-4">
							{project.demo && (
								<a
									href={project.demo}
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center hover:cursor-pointer font-Sans text-sm text-[#405580] pr-3"
								>
									Demo
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
										<path fill="none" d="M0 0h24v24H0z" />
										<path
											d="M16.004 9.414l-8.607 8.607-1.414-1.414L14.589 8H7.004V6h11v11h-2V9.414z"
											fill="#405580"
										/>
									</svg>
								</a>
							)}
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
			{experiments.length > 3 && (
				<button
					className="pl-2 pt-2 flex items-center hover:cursor-pointer font-Space text-sm text-white decoration underline underline-offset-4"
					onClick={() => setShowMore(!showMore)}
				>
					{showMore ? 'SHOW LESS' : 'SHOW MORE'}
				</button>
			)}
		</section>
	)
}

export default Experiments
