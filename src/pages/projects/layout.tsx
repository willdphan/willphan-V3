import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Link as ScrollLink } from 'react-scroll'

// Tailwind CSS Global classes
export const projectClasses = {
	// H1
	title: 'text-md font-space font-medium text-white pb-2',
	date: 'text-xs font-Space text-[#9B9B9B] tracking-widest pb-2 uppercase mb-6',
	// SUBHEADINGS ARE H2
	subheading: 'text-sm font-Space font-normal text-white pb-2 mt-6',
	content: 'text-sm text-[#9B9B9B] leading-7 font-Inter font-normal mb-6',
	image: 'relative rounded-lg w-full h-full overflow-hidden border-[#242424] border-[1px]', // Define a custom class for images h-[350px] sm:h-[450px] md:h-[550px] lg:h-[550px] xl:h-[550px]
	video: 'my-6 rounded-xl border-[#242424] border-[1px] rounded-lg', // Define a custom class for videos
	code: 'max-w-md sm:max-w-2xl  mb-6 w-full rounded-xl border-[#262626] border-[1px]',
	// max-w-md sm:max-w-2xl
}

export default function Layout({ children, projectName, publicationDate }) {
	// State to store the list of subheadings
	const [subheadings, setSubheadings] = useState([])

	// Function to populate the list of subheadings based on the content
	const generateSubheadings = () => {
		// Find subheadings in the content (customize this based on your content structure)
		const content = document.getElementById('content')
		if (content) {
			const headings = content.querySelectorAll('h2, h3')
			const subheadingList = Array.from(headings).map(heading => ({
				text: heading.textContent,
				id: heading.id,
			}))
			setSubheadings(subheadingList)
		}
	}

	// Function to scroll to a subheading when clicked in the table of contents
	const scrollToSubheading = id => {
		const headingElement = document.getElementById(id)
		if (headingElement) {
			headingElement.scrollIntoView({ behavior: 'smooth' })
		}
	}

	// Listen for changes to the content and update subheadings accordingly
	useEffect(() => {
		generateSubheadings()
	}, [children])

	return (
		<div className="bg-[#0A0A0A] w-full min-h-[100vh] h-full px-6 pt-20 flex flex-col items-center pb-20">
			<main className="max-w-2xl ">
				{/* Table of Contents */}
				<div className="">
					<div className="fixed">
						<ul className="animate-fade invisible xl:visible  absolute left-[-18em] space-y-2 text-xs text-[#9B9B9B] leading-relaxed font-Inter font-light">
							<li>
								<Link href="/">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										width="20"
										height="20"
										className="mb-[6em]"
									>
										<path
											d="M7.82843 10.9999H20V12.9999H7.82843L13.1924 18.3638L11.7782 19.778L4 11.9999L11.7782 4.22168L13.1924 5.63589L7.82843 10.9999Z"
											fill="#9B9B9B"
										></path>
									</svg>
								</Link>
							</li>
							{subheadings.map(subheading => (
								<li key={subheading.id}>
									<ScrollLink
										to={subheading.id}
										smooth={true}
										duration={500}
										style={{ cursor: 'pointer' }} // Add this style
									>
										{subheading.text}
									</ScrollLink>
								</li>
							))}
						</ul>
					</div>
				</div>
				{/* Table of Contents */}
				<div id="content">
					<div>
						<Link href="/">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								width="20"
								height="20"
								className="mb-10 lg:hidden"
							>
								<path
									d="M7.82843 10.9999H20V12.9999H7.82843L13.1924 18.3638L11.7782 19.778L4 11.9999L11.7782 4.22168L13.1924 5.63589L7.82843 10.9999Z"
									fill="#9B9B9B"
								></path>
							</svg>
						</Link>
					</div>
					{/* Display the project name as a title */}
					<h1 className={projectClasses.title}>{projectName}</h1>

					{/* Display the publication date */}
					<p className={projectClasses.date}>{publicationDate}</p>
					<div className={projectClasses.content}>{children}</div>
				</div>
			</main>
			<footer>{/* Footer content */}</footer>
		</div>
	)
}
