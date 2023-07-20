import React from 'react'
import Link from 'next/link'
import { useState } from 'react'
import Masonry from 'react-masonry-css'

function Experiments() {
	const [showMore, setShowMore] = useState(false)
	const [selectedTech, setSelectedTech] = useState('ALL')

	const experiments = [
		{
			title: 'PYTHON',
			name: 'RICE CNN',
			description: 'Rice CNN with 75,000 grain images.',
			code: 'https://github.com/willdphan/rice-cnn',
			nbviewer: 'https://nbviewer.org/github/willdphan/rice-cnn/blob/main/Rice_Classifier_CNN.ipynb',
			technology: 'ML',
		},
		{
			title: 'PYTHON',
			name: 'FISH CNN',
			description: 'CNN with 9 different seafood types.',
			code: 'https://github.com/willdphan/fish-cnn',
			nbviewer: 'https://nbviewer.org/github/willdphan/fish-cnn/blob/main/Fish_CNN.ipynb',
			technology: 'ML',
		},
		{
			title: 'PYTHON',
			name: 'FROZEN LAKE',
			description: 'Reinforcement Learning with Frozen Lake Game.',
			code: 'https://github.com/willdphan/frozen-lake',
			nbviewer: 'https://nbviewer.org/github/willdphan/frozen-lake/blob/master/Frozen_Lake_Q_Learning.ipynb',
			technology: 'ML',
		},

		{
			title: 'PYTHON',
			name: 'GPT PDF',
			description: 'Using GPT to analyze PDFs.',
			code: 'https://github.com/willdphan/gpt-pdf',
			nbviewer: 'https://nbviewer.org/github/willdphan/gpt-pdf/blob/main/pdf_gpt.ipynb',
			technology: 'ML',
		},
		{
			title: 'PYTHON',
			name: 'LEX QA AGENT',
			description: 'CNN for Fashion MNIST Dataset.',
			code: 'https://github.com/willdphan/lex-agent',
			nbviewer: 'https://nbviewer.org/github/willdphan/lex-agent/blob/main/langchain_lex_agent.ipynb',
			technology: 'ML',
		},
		{
			title: 'PYTHON',
			name: 'FASHION CNN',
			description: 'CNN for Fashion MNIST Dataset.',
			code: 'https://github.com/willdphan/fashion-cnn',
			nbviewer:
				'https://nbviewer.org/github/willdphan/fashion-cnn/blob/main/CNN_Fashion_Classifier_on_MNIST.ipynb',
			technology: 'ML',
		},
		{
			title: 'PYTHON',
			name: 'NUMBER CNN',
			description: 'CNN for Number MNIST Dataset.',
			code: 'https://github.com/willdphan/number-cnn',
			technology: 'ML',
		},
		{
			title: 'TYPESCRIPT',
			name: 'DEGEN',
			description: 'Uncover your NFT assets and their stories.',
			frontend: 'https://degen-kappa.vercel.app/',
			demo: 'https://twitter.com/willdphan/status/1660381395947077633?s=20',
			technology: 'BLOCKCHAIN',
		},
		{
			title: 'PYTHON',
			name: 'ATOM',
			description: 'Personal assistant for managing & reviewing schedule.',
			code: 'https://github.com/willdphan/atom-v2',
			demo: 'https://twitter.com/willdphan/status/1652442555533885441?s=20',
			technology: 'ML',
		},
		{
			title: 'SOLIDITY',
			name: 'RICKS-V2',
			description: 'Fractionalized ERC721 auction w/VRGDA pricing.',

			code: 'https://github.com/willdphan/RICKS-V2.git',
			technology: 'BLOCKCHAIN',
		},
		{
			title: 'SOLIDITY',
			name: 'One of One',
			description: '1 | 1 NFT editions using gas efficient Minimal Proxy.',

			code: 'https://github.com/willdphan/1-of-1.git',
			technology: 'BLOCKCHAIN',
		},
		{
			title: 'SOLIDITY',
			name: 'ERC20-YUL',
			description: 'ERC-20 in Yul. Obviously, not optimal for production.',

			code: 'https://github.com/willdphan/erc20-yul',
			technology: 'BLOCKCHAIN',
		},
		{
			title: 'TYPESCRIPT',
			name: 'Kaleidor',
			description: 'On-Chain NFTs w/VRGDAs. You see what you get.',
			frontend: 'https://kaleidor.vercel.app/',
			technology: 'OTHER',
		},
		{
			title: 'SOLIDITY',
			name: 'Latter',
			description: 'Mini-implementation of Affirm - Buy Now, Pay Later.',
			code: 'https://github.com/willdphan/latter-contracts.git',
			technology: 'BLOCKCHAIN',
		},
		{
			title: 'SOLIDITY',
			name: 'Shade',
			description: 'On-chain generative art. 111 shades of NFTs.',
			frontend: 'https://shade-pi.vercel.app/',
			technology: 'BLOCKCHAIN',
		},
		{
			title: 'SOLIDITY',
			name: 'Splitz',
			description: 'Funds split among recipients automatically.',
			frontend: 'https://splitz.vercel.app',
			code: 'https://github.com/willdphan/splitz-contracts',
			technology: 'BLOCKCHAIN',
		},
	]

	const filteredExperiments = experiments.filter(exp =>
		selectedTech === 'ALL' ? true : exp.technology === selectedTech
	)

	return (
		<section className="mt-[-2em]" id="experiments">
			<div>
				<select
					value={selectedTech}
					onChange={e => setSelectedTech(e.target.value)}
					className="mb-4 bg-[#000000] rounded-md py-2 px-4 text-md leading-relaxed text-xs font-Space text-[#9B9B9B] tracking-widest hover:bg-[#2a2929] hover:text-white transform transition duration-300"
				>
					<option value="ALL">ALL</option>
					<option value="ML">AI | ML</option>
					<option value="BLOCKCHAIN">BLOCKCHAIN</option>
					<option value="OTHER">OTHER</option>
				</select>
			</div>
			<Masonry
				breakpointCols={{ default: 2, 700: 1 }}
				className="my-masonry-grid flex gap-2 relative"
				columnClassName="my-masonry-grid_column"
			>
				{filteredExperiments.slice(0, showMore ? filteredExperiments.length : 6).map(project => (
					<div
						key={project.name}
						className="my-masonry-grid_column mb-2 w-full bg-[#181818]  border-[#262626] border-[1px] rounded-lg py-10 px-10 space-y-2 transform transition duration-300 sm:hover:scale-[1.01] sm:hover:bg-gradient-to-br hover:bg-[#2a2929] ] text-[#9B9B9B] hover:text-white"
					>
						<h2 className="text-xs font-Space text-[#9B9B9B] tracking-widest">{project.title}</h2>
						<h1 className="text-xl font-Space font-medium text-white">{project.name}</h1>
						<p className="text-md leading-relaxed font-Sans text-[#9B9B9B]">{project.description}</p>
						<div className="flex space-x-4 pt-4">
							{project.demo && (
								<a
									href={project.demo}
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center hover:cursor-pointer font-Sans text-sm text-[#54627a] pr-3"
								>
									Demo
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
										<path fill="none" d="M0 0h24v24H0z" />
										<path
											d="M16.004 9.414l-8.607 8.607-1.414-1.414L14.589 8H7.004V6h11v11h-2V9.414z"
											fill="#54627a"
										/>
									</svg>
								</a>
							)}
							{project.frontend && (
								<a
									href={project.frontend}
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center hover:cursor-pointer font-Sans text-sm text-[#54627a] pr-3"
								>
									Frontend
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
										<path fill="none" d="M0 0h24v24H0z" />
										<path
											d="M16.004 9.414l-8.607 8.607-1.414-1.414L14.589 8H7.004V6h11v11h-2V9.414z"
											fill="#54627a"
										/>
									</svg>
								</a>
							)}
							{project.code && (
								<a
									href={project.code}
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center hover:cursor-pointer font-Sans text-sm text-[#54627a] pr-3"
								>
									Code
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
										<path fill="none" d="M0 0h24v24H0z" />
										<path
											d="M16.004 9.414l-8.607 8.607-1.414-1.414L14.589 8H7.004V6h11v11h-2V9.414z"
											fill="#54627a"
										/>
									</svg>
								</a>
							)}
							{project.nbviewer && (
								<a
									href={project.nbviewer}
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center hover:cursor-pointer font-Sans text-sm text-[#54627a] pr-3"
								>
									NBViewer
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
										<path fill="none" d="M0 0h24v24H0z" />
										<path
											d="M16.004 9.414l-8.607 8.607-1.414-1.414L14.589 8H7.004V6h11v11h-2V9.414z"
											fill="#54627a"
										/>
									</svg>
								</a>
							)}
						</div>
					</div>
				))}
			</Masonry>
			{filteredExperiments.length > 3 && (
				<button
					className="py-2 px-4 rounded-md flex items-center hover:cursor-pointer font-Space text-[#9B9B9B] text-xs tracking-widest hover:bg-[#2a2929] hover:text-white transform transition duration-300"
					onClick={() => setShowMore(!showMore)}
				>
					{showMore ? 'LESS' : 'MORE'}
				</button>
			)}
		</section>
	)
}

export default Experiments
