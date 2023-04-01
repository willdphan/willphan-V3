import React from 'react'
import Image from 'next/image'
import test from 'public/images/iphone-se-2020-2560x1440-dark-8k-22550.jpg'
import test1 from 'public/images/wallpaper.jpg'
import test2 from 'public/images/apple-macbook-pro-2021-2560x1440-abstract-colorful-apple-october-2021-23772.jpg'
import Link from 'next/link'

const Learnings = () => {
	return (
		<section id="learnings">
			<div className="gap-2 columns-1 mt-20 mb-20">
				{/* LEARNINGS START */}
				<div className="w-full bg-[#121212] transform transition duration-300 sm:hover:scale-[1.01] sm:hover:bg-gradient-to-br from-[#405580] via-[#8c9ab7] to-[#FFFFFF] text-[#9B9B9B] hover:text-white rounded-lg mb-2">
					<div className="py-10 px-10 space-y-2">
						<h2 className="text-xs font-Space text-white tracking-widest">GET PLUGGED IN.</h2>
						<h1 className="text-xl font-Space font-medium text-white">Development</h1>
						<p className="text-sm leading-relaxed  font-Sans">
							A comprehensive guide to the tools, tutorials, and references that have assisted me in my
							journey towards becoming a proficient web developer.
						</p>
						<div className="flex space-x-3 pt-4 text-sm text-[#405580]">
							{/* LINK 1 */}
							<div className="flex items-center hover:cursor-pointer">
								<Link href="https://frost-sloop-bbc.notion.site/Dev-42a7eeaa9240423eb7566a5abc3237d5">
									<p>Notion</p>
								</Link>
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
									<path fill="none" d="M0 0h24v24H0z" />
									<path
										d="M16.004 9.414l-8.607 8.607-1.414-1.414L14.589 8H7.004V6h11v11h-2V9.414z"
										fill="#405580"
									/>
								</svg>
							</div>
						</div>
					</div>
				</div>
				{/* LEARNINGS END */}
				{/* LEARNINGS START */}
				<div className="w-full bg-[#121212] transform transition duration-300 sm:hover:scale-[1.01] sm:hover:bg-gradient-to-br from-[#405580] via-[#8c9ab7] to-[#FFFFFF] text-[#9B9B9B] hover:text-white rounded-lg mb-2">
					<div className="py-10 px-10 space-y-2">
						<h2 className="text-xs font-Space text-white tracking-widest">WEB3</h2>
						<h1 className="text-xl font-Space font-medium text-white">Blockchain</h1>
						<p className="text-sm leading-relaxed  font-Sans">
							This is a collection of resources I&apos;ve compiled while studying blockchain protocols,
							blockchains, and NFT projects.
						</p>
						<div className="flex space-x-3 pt-4 text-sm text-[#405580]">
							{/* LINK 1 */}
							<div className="flex items-center hover:cursor-pointer">
								<Link href="https://frost-sloop-bbc.notion.site/Blockchain-54d10d04cee848e082cae8a62e7be8e2">
									<p>Notion</p>
								</Link>
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
									<path fill="none" d="M0 0h24v24H0z" />
									<path
										d="M16.004 9.414l-8.607 8.607-1.414-1.414L14.589 8H7.004V6h11v11h-2V9.414z"
										fill="#405580"
									/>
								</svg>
							</div>
						</div>
					</div>
				</div>
				{/* LEARNINGS END */}
				{/* LEARNINGS START */}
				<div className="w-full bg-[#121212] transform transition duration-300 sm:hover:scale-[1.01] sm:hover:bg-gradient-to-br from-[#405580] via-[#8c9ab7] to-[#FFFFFF] text-[#9B9B9B] hover:text-white rounded-lg mb-2">
					<div className="py-10 px-10 space-y-2">
						<h2 className="text-xs font-Space text-white tracking-widest">UX | UI</h2>
						<h1 className="text-xl font-Space font-medium text-white">Design</h1>
						<p className="text-sm leading-relaxed  font-Sans">
							My collection of UX/UI resources includes links to articles, videos, and courses that have
							helped me improve my design skills.
						</p>
						<div className="flex space-x-3 pt-4 text-sm text-[#405580]">
							{/* LINK 1 */}
							<div className="flex items-center hover:cursor-pointer">
								<Link href="https://frost-sloop-bbc.notion.site/UX-UI-234124ad035f4370a6b3f5d865fc00f3">
									<p>Notion</p>
								</Link>
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
									<path fill="none" d="M0 0h24v24H0z" />
									<path
										d="M16.004 9.414l-8.607 8.607-1.414-1.414L14.589 8H7.004V6h11v11h-2V9.414z"
										fill="#405580"
									/>
								</svg>
							</div>
						</div>
					</div>
				</div>
				{/* LEARNINGS END */}
				{/* LEARNINGS START */}
				<div className="w-full bg-[#121212] transform transition duration-300 sm:hover:scale-[1.01] sm:hover:bg-gradient-to-br from-[#405580] via-[#8c9ab7] to-[#FFFFFF] text-[#9B9B9B] hover:text-white rounded-lg mb-2">
					<div className="py-10 px-10 space-y-2">
						<h2 className="text-xs font-Space text-white tracking-widest">GOOD READS</h2>
						<h1 className="text-xl font-Space font-medium text-white">Library</h1>
						<p className="text-sm leading-relaxed  font-Sans">
							My collection of books that I&apos;ve read, want to read, and am currently reading. Feel
							free to follow me on Goodreads!
						</p>
						<div className="flex space-x-3 pt-4 text-sm text-[#405580]">
							{/* LINK 1 */}
							<div className="flex items-center hover:cursor-pointer">
								<Link href="https://www.goodreads.com/user/show/164155100-william-phan">
									<p>Goodreads</p>
								</Link>
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
									<path fill="none" d="M0 0h24v24H0z" />
									<path
										d="M16.004 9.414l-8.607 8.607-1.414-1.414L14.589 8H7.004V6h11v11h-2V9.414z"
										fill="#405580"
									/>
								</svg>
							</div>
						</div>
					</div>
				</div>
				{/* LEARNINGS END */}
			</div>
		</section>
	)
}

export default Learnings
