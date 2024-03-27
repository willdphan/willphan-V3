import React from 'react'
import Link from 'next/link'
import { useState } from 'react'
import Masonry from 'react-masonry-css'
import Image from 'next/image'
import { Popover, Text, Button } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

export const projects = [
	{
		title: 'C++',
		name: 'SILK-02',
		description: 'Quadruped with Computer Vision (WIP).',
		frontend: '',
		code: 'https://github.com/willdphan/silk-02',
		technology: 'ML/CV',
		video: 'https://pub-33c643825c664d0091b84d7ae37a5150.r2.dev/silk-02-display.mp4',
		nbviewer: '',
		image: '',
	},
	{
		title: 'PYTHON, C++',
		name: 'CHAR-01',
		description: 'Autonomous Navigation with Machine Learning.',
		frontend: '',
		code: 'https://github.com/willdphan/char-01.git',
		technology: 'ML/CV',
		video: 'https://pub-33c643825c664d0091b84d7ae37a5150.r2.dev/char-01-display.mp4',
		nbviewer: '',
		image: '',
	},
	{
		title: 'PYTHON',
		name: 'KITTI SF',
		description: 'Sensor fusion and object detection with the KITTI Dataset.',
		frontend: '',
		code: 'https://github.com/willdphan/kitti-sf',
		technology: 'ML/CV',
		video: 'https://pub-33c643825c664d0091b84d7ae37a5150.r2.dev/kitti-sf-display.mp4',
		nbviewer: 'https://nbviewer.org/github/willdphan/kitti-sf/blob/main/KITTI_SF.ipynb',
		image: '',
	},
	{
		title: 'TYPESCRIPT | PYTHON',
		name: 'Plate Vision',
		description: 'Real-time license plate recognition system.',
		frontend: '',
		code: 'https://github.com/willdphan/plate-vision.git',
		technology: 'ML/CV',
		video: 'https://pub-33c643825c664d0091b84d7ae37a5150.r2.dev/plate-vision.mp4',
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
		video: 'https://pub-33c643825c664d0091b84d7ae37a5150.r2.dev/degen.mov',
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
		video: 'https://pub-33c643825c664d0091b84d7ae37a5150.r2.dev/atom.mov',
		nbviewer: '',
		image: '',
	},
]

const Fun = () => {
	const [showMore, setShowMore] = useState(false)
	const [showVisuals, setShowVisuals] = useState(true)
	const [selectedTech, setSelectedTech] = useState('ALL')
	const [opened, { close, open }] = useDisclosure(false)

	const filteredProjects = projects.filter(exp => (selectedTech === 'ALL' ? true : exp.technology === selectedTech))

	return (
		<section className="mt-[1em] mb-20" id="projects">
			<div className="flex items-center justify-start mb-4">
				{/* TITLE */}
				{/* <h2 className="text-sm font-Space text-[#9B9B9B] mx-2  tracking-widest">PROJECTS</h2> */}

				<Popover width={350} position="bottom" withArrow opened={opened}>
					<Popover.Target>
						<Button
							onMouseEnter={open}
							onMouseLeave={close}
							className="text-sm font-Space animate-pulse"
							style={{
								backgroundColor: '#0A0A0A',
								borderRadius: '50%',
								width: '30px',
								height: '30px',
								color: '#d5d5d5',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								padding: '1px',
								borderColor: '#d5d5d5',
								borderWidth: '0.5px',
								borderStyle: 'solid',
							}}
						>
							?
						</Button>
					</Popover.Target>
					<Popover.Dropdown
						className="font-Inter text-[#9B9B9B]"
						style={{
							pointerEvents: 'none',
							backgroundColor: '#0A0A0A',
							borderRadius: '5%',
							borderWidth: '1px',
							borderColor: '#262626',
							padding: '20px',
							lineHeight: '1.75rem',
						}}
					>
						<div
							style={{
								lineHeight: '1.75rem',
							}}
							className="text-md mb-2 font-Space text-white  pt-3 uppercase"
						>
							What is this?
							<br />
						</div>
						<div
							className="text-sm font-Inter text-[#9B9B9B]"
							style={{
								lineHeight: '1.75rem',
							}}
						>
							Below is a curated selection of my projects, showcasing my designs and code.
							<p className="text-[#d5d5d5] my-2">Press &quot;Show Visuals&quot; to toggle Graphics!</p>
							{/* Click the project titles for details about the creation process and conceptual foundations.
							<br />
							Code snippets and links are also provided for further exploration. */}
						</div>
					</Popover.Dropdown>
				</Popover>
				<button
					onClick={() => setShowVisuals(!showVisuals)}
					className="py-2 px-2 ml-4 rounded-md flex items-center hover:cursor-pointer text-sm font-Space text-[#FFFFFF] tracking-widest hover:bg-[#2a2929] hover:text-white transform transition duration-300 animate-pulse"
				>
					{showVisuals ? 'HIDE VISUALS' : 'SHOW VISUALS'}
				</button>
				{/* FILTER BUTTON */}
				{/* <select
					value={selectedTech}
					onChange={e => setSelectedTech(e.target.value)}
					className="bg-[#0A0A0A] rounded-md py-2 text-md leading-relaxed text-sm font-Space text-[#9B9B9B] tracking-widest hover:bg-[#2a2929] hover:text-white transform transition duration-300 mr-6"
				>
					<option value="ALL">ALL</option>
					<option value="ML/CV">ML | CV</option>
					<option value="BLOCKCHAIN">BLOCKCHAIN</option>
					<option value="OTHER">OTHER</option>
				</select> */}
			</div>
			<Masonry
				breakpointCols={{ default: 2, 700: 1 }}
				className="my-masonry-grid flex gap-2 relative"
				columnClassName="my-masonry-grid_column"
			>
				{filteredProjects.slice(0, showMore ? filteredProjects.length : 6).map(project => (
					// py-[1px] px-[1px]
					<div
						key={project.name}
						className="mb-2 my-masonry-grid_column w-full bg-[#0A0A0A] border-[#262626] border-[1px] rounded-lg py-[1px] px-[1px]  space-y-2 transform transition duration-300 sm:hover:scale-[1.01] sm:hover:bg-gradient-to-br hover:bg-[#2a2929] ] text-[#9B9B9B] hover:text-white"
					>
						{showVisuals &&
							(project.video ? (
								<div className="video-container">
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
							))}

						<Link
							href={`/projects/${project.name.toLowerCase().replace(/ /g, '_')}-pg?projectName=${
								project.name
							}`}
						>
							<h2 className="text-xs font-Space text-[#9B9B9B] tracking-widest px-7 pt-7">
								{project.title}
							</h2>

							<h1 className="text-md font-Space font-normal text-white px-7 pt-3">{project.name}</h1>

							<p className="text-sm leading-7 font-Inter text-[#9B9B9B] pt-[7px] px-7">
								{project.description}
							</p>
						</Link>
						<div className="flex space-x-4 pt-1 px-7 pb-7 ">
							{project.demo && (
								<a
									href={project.demo}
									target="_blank"
									rel="noopener noreferrer"
									className="	 flex items-center hover:cursor-pointer font-Inter text-sm text-[#bfdbfe] pr-3"
								>
									Demo
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
										<path fill="none" d="M0 0h24v24H0z" />
										<path
											d="M16.004 9.414l-8.607 8.607-1.414-1.414L14.589 8H7.004V6h11v11h-2V9.414z"
											fill="#bfdbfe"
										/>
									</svg>
								</a>
							)}
							{project.frontend && (
								<a
									href={project.frontend}
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center hover:cursor-pointer font-Inter text-sm text-[#bfdbfe] pr-3"
								>
									Frontend
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
										<path fill="none" d="M0 0h24v24H0z" />
										<path
											d="M16.004 9.414l-8.607 8.607-1.414-1.414L14.589 8H7.004V6h11v11h-2V9.414z"
											fill="#bfdbfe"
										/>
									</svg>
								</a>
							)}
							{project.code && (
								<a
									href={project.code}
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center hover:cursor-pointer font-Inter text-sm text-[#bfdbfe] pr-3"
								>
									Code
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
										<path fill="none" d="M0 0h24v24H0z" />
										<path
											d="M16.004 9.414l-8.607 8.607-1.414-1.414L14.589 8H7.004V6h11v11h-2V9.414z"
											fill="#bfdbfe"
										/>
									</svg>
								</a>
							)}
							{project.nbviewer && (
								<a
									href={project.nbviewer}
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-c<ntr hover:cursor-pointer font-Inter text-sm text-[#bfdbfe] pr-3"
								>
									NBViewer
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
										<path fill="none" d="M0 0h24v24H0z" />
										<path
											d="M16.004 9.414l-8.607 8.607-1.414-1.414L14.589 8H7.004V6h11v11h-2V9.414z"
											fill="#bfdbfe"
										/>
									</svg>
								</a>
							)}
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
