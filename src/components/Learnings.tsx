import React from 'react'
import Link from 'next/link'

const Learnings = () => {
	const learnings = [
		{
			title: 'Library',
			sub: 'GOOD READS',
			description:
				"Books that I've read, want to read, and am currently reading. Feel free to follow me on Goodreads!",
			link: 'https://www.goodreads.com/user/show/164155100-william-phan',
		},
	]

	return (
		<section id="learnings">
			<div className="gap-2 columns-1 mt-20 mb-20">
				{learnings.map((learning, index) => (
					<div
						key={index}
						className="w-full border-[#262626] border-[1px] bg-[#121212] transform transition duration-300 hover:bg-[#2a2929] text-[#9B9B9B] hover:text-white rounded-lg mb-2"
					>
						<div className="py-7 px-7 space-y-2">
							<h2 className="text-xs font-Space text-[#9B9B9B] tracking-widest">{learning.sub}</h2>
							<h1 className="text-xl font-Space font-medium text-white">{learning.title}</h1>
							<p className="text-sm leading-relaxed font-Sans text-[#9B9B9B]">{learning.description}</p>
							<div className="flex space-x-3 pt-4 text-sm text-[#405580]">
								<div className="flex items-center font-Sans hover:cursor-pointer">
									<Link href={learning.link}>
										<p className="text-[#54627a]">Link</p>
									</Link>
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
										<path fill="none" d="M0 0h24v24H0z" />
										<path
											d="
  M16.004 9.414l-8.607 8.607-1.414-1.414L14.589 8H7.004V6h11v11h-2V9.414z"
											fill="#54627a"
										/>
									</svg>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</section>
	)
}

export default Learnings
