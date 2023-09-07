import React from 'react'
import Link from 'next/link'
import { useState } from 'react'
import Masonry from 'react-masonry-css'
import Image from 'next/image'

import degen from 'public/images/degen.gif'

import atom from 'public/images/atom.gif'

const Fun = () => {
	const [showMore, setShowMore] = useState(false)
	const [selectedTech, setSelectedTech] = useState('ALL')

	const experiments = [
		{
			title: 'TYPESCRIPT',
			name: 'DEGEN',
			description: 'Uncover your NFT assets and their stories.',
			frontend: 'https://degen-kappa.vercel.app/',
			demo: 'https://twitter.com/willdphan/status/1660381395947077633?s=20',
			technology: 'BLOCKCHAIN',
			image: degen,
			nbviewer: '',
		},
		{
			title: 'PYTHON',
			name: 'ATOM',
			description: 'GPT audio assistant for managing & reviewing schedule.',
			code: 'https://github.com/willdphan/atom-v2',
			demo: 'https://twitter.com/willdphan/status/1652442555533885441?s=20',
			technology: 'ML/CV',
			image: atom,
			nbviewer: '',
		},
	]

	const filteredExperiments = experiments.filter(exp =>
		selectedTech === 'ALL' ? true : exp.technology === selectedTech
	)

	return (
		<section className="mt-[1em]" id="projects">
			<div className="flex items-center justify-start mb-4">
				{' '}
				<h2 className="text-sm font-Space text-[#9B9B9B] mx-2 mr-8">PROJECTS</h2> {/* Title next to dropdown */}
				<select
					value={selectedTech}
					onChange={e => setSelectedTech(e.target.value)}
					className="bg-[#000000] rounded-md py-2 text-md leading-relaxed text-sm font-Space text-[#9B9B9B] tracking-widest hover:bg-[#2a2929] hover:text-white transform transition duration-300"
				>
					<option value="ALL">ALL</option>
					<option value="ML/CV">ML | CV</option>
					<option value="BLOCKCHAIN">BLOCKCHAIN</option>
					<option value="OTHER">OTHER</option>
				</select>
			</div>
			<Masonry
				breakpointCols={{ default: 2, 700: 1 }}
				className="my-masonry-grid flex gap-2 relative"
				columnClassName="my-masonry-grid_column"
			>
				{filteredExperiments.slice(0, showMore ? filteredExperiments.length : 4).map(project => (
					<div
						key={project.name}
						className="mb-20 my-masonry-grid_column w-full bg-[#181818]  border-[#262626] border-[1px] rounded-lg py-7 px-7 space-y-2 transform transition duration-300 sm:hover:scale-[1.01] sm:hover:bg-gradient-to-br hover:bg-[#2a2929] ] text-[#9B9B9B] hover:text-white"
					>
						<h2 className="text-xs font-Space text-[#9B9B9B] tracking-widest">{project.title}</h2>
						<h1 className="text-lg font-Space font-medium text-white">{project.name}</h1>
						<p className="text-sm leading-relaxed font-Sans text-[#9B9B9B]">{project.description}</p>
						<div className="flex space-x-4 pt-3">
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
							{/* Adding the Next.js Image component */}
						</div>
						{project.image && (
							<div className="pt-5">
								<Image
									src={project.image}
									alt={project.name}
									width={600} // specify the width
									height={300} // specify the height
									layout="responsive" // if you want to maintain aspect ratio
									className="rounded"
								/>
							</div>
						)}
					</div>
				))}
			</Masonry>
			{filteredExperiments.length > 3 && (
				<div className="flex items-center">
					<button
						className="py-2 px-4 rounded-md flex items-center hover:cursor-pointer font-Space text-[#9B9B9B] text-xs tracking-widest hover:bg-[#2a2929] hover:text-white transform transition duration-300"
						onClick={() => setShowMore(!showMore)}
					>
						{showMore ? 'LESS' : 'MORE'}
					</button>
				</div>
			)}
		</section>
	)
}

export default Fun
