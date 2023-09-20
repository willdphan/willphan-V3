import React from 'react'
import Link from 'next/link'
import { useState } from 'react'
import Masonry from 'react-masonry-css'
import Image from 'next/image'

export const projects = [
	{
		title: 'TYPESCRIPT | PYTHON',
		name: 'Plate Vision',
		description: 'Uncover your NFT assets and their stories.',
		frontend: '',
		technology: 'ML/CV',
		video: '/images/plate_vision.mp4',
		nbviewer: '',
		image: '',
	},
	{
		title: 'TYPESCRIPT',
		name: 'DEGEN',
		description: 'Uncover your NFT assets and their stories.',
		frontend: 'https://degen-kappa.vercel.app/',
		demo: 'https://twitter.com/willdphan/status/1660381395947077633?s=20',
		technology: 'BLOCKCHAIN',
		video: 'https://willphan.com/degen.mov',
		nbviewer: '',
		image: '',
	},
	{
		title: 'PYTHON',
		name: 'ATOM',
		description: 'GPT audio assistant for managing & reviewing schedule.',
		code: 'https://github.com/willdphan/atom-v2',
		demo: 'https://twitter.com/willdphan/status/1652442555533885441?s=20',
		technology: 'ML/CV',
		video: 'https://willphan.com/atom.mov',
		nbviewer: '',
		image: '',
	},
]

const Fun = () => {
	const [showMore, setShowMore] = useState(false)
	const [selectedTech, setSelectedTech] = useState('ALL')

	const filteredProjects = projects.filter(exp => (selectedTech === 'ALL' ? true : exp.technology === selectedTech))

	return (
		<section className="mt-[1em] mb-20" id="projects">
			<div className="flex items-center justify-start mb-4">
				{' '}
				<h2 className="text-sm font-Space text-[#9B9B9B] mx-2 mr-8 tracking-widest">PROJECTS</h2>{' '}
				{/* Title next to dropdown */}
				<select
					value={selectedTech}
					onChange={e => setSelectedTech(e.target.value)}
					className="bg-[#0A0A0A] rounded-md py-2 text-md leading-relaxed text-sm font-Space text-[#9B9B9B] tracking-widest hover:bg-[#2a2929] hover:text-white transform transition duration-300"
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
				{filteredProjects.slice(0, showMore ? filteredProjects.length : 4).map(project => (
					// px-7 py-7
					/* changes */

					<div
						key={project.name}
						className=" mb-2 my-masonry-grid_column w-full bg-[#0A0A0A]  border-[#262626] border-[1px] rounded-lg py-[1px]  px-[1px] space-y-2 transform transition duration-300 sm:hover:scale-[1.01] sm:hover:bg-gradient-to-br hover:bg-[#2a2929] ] text-[#9B9B9B] hover:text-white"
					>
						{project.video ? (
							<div className="">
								<video
									autoPlay
									loop
									muted
									playsInline
									className="rounded-lg border-[#0A0A0A] border-[1px]"
								>
									<source src={project.video} type="video/mp4" />
								</video>
							</div>
						) : (
							project.image && (
								<div className="">
									{/* Specify the width */}
									{/* Specify the height */}
									{/* If you want to maintain aspect ratio */}
									<Image
										src={project.image}
										alt={project.name}
										width={600}
										height={300}
										layout="responsive"
										className="rounded-lg border-[#0A0A0A] border-[1px]"
									/>
								</div>
							)
						)}

						{/* changes */}
						<h2 className="text-xs font-Space text-[#9B9B9B] tracking-widest px-3 pt-3">{project.title}</h2>
						{/*  LINK ADDED HERE FOR PROJECTS PAGE */}
						<Link
							href={`/projects/${project.name.toLowerCase().replace(/ /g, '_')}-pg?projectName=${
								project.name
							}`}
						>
							<h1 className="text-md font-Space font-normal text-white px-3 pt-3">{project.name}</h1>
						</Link>

						<p className="text-sm leading-7 font-Inter  text-[#9B9B9B] px-3">{project.description}</p>
						{/* changes */}
						<div className="flex space-x-4 pt-1 px-3 pb-3">
							{/* changes */}
							{project.demo && (
								<a
									href={project.demo}
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center hover:cursor-pointer font-Inter text-sm text-[#54627a] pr-3"
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
									className="flex items-center hover:cursor-pointer font-Inter text-sm text-[#54627a] pr-3"
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
									className="flex items-center hover:cursor-pointer font-Inter text-sm text-[#54627a] pr-3"
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
									className="flex items-center hover:cursor-pointer font-Inter text-sm text-[#54627a] pr-3"
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
					</div>
				))}
			</Masonry>
			{filteredProjects.length > 3 && (
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
