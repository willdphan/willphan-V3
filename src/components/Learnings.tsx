import React from 'react'
import Image from 'next/image'
import test from 'public/images/iphone-se-2020-2560x1440-dark-8k-22550.jpg'
import test1 from 'public/images/wallpaper.jpg'
import test2 from 'public/images/apple-macbook-pro-2021-2560x1440-abstract-colorful-apple-october-2021-23772.jpg'
import Link from 'next/link'

const Learnings = () => {
	return (
		<section>
			<div className="gap-6 columns-1 mt-32">
				{/* LEARNINGS START */}
				<div className="w-full bg-[#121212] rounded-lg mb-6">
					<div className="py-10 px-10 space-y-5">
						<h2 className="text-xl font-Space">Get. Plugged. In.</h2>
						<h1 className="text-3xl font-Space font-medium">Development</h1>
						<p className="text-xl leading-relaxed text-[#9B9B9B] font-Sans">
							Libraries for building performant and instant search experiences with Algolia. Compatible
							with JavaScript, TypeScript, React and Vue.
						</p>
						<div className="flex space-x-10 text-xl text-[#405580]">
							<Link href="mailto:willdphan@gmail.com">
								<p>Notion</p>
							</Link>
							<Link href="mailto:willdphan@gmail.com">
								<p>Contracts</p>
							</Link>
						</div>
					</div>
				</div>
				{/* LEARNINGS END */}
				{/* LEARNINGS START */}
				<div className="w-full bg-[#121212] rounded-lg mb-6">
					<div className="py-10 px-10 space-y-5">
						<h2 className="text-xl font-Space">Boosting My Creative Outlet</h2>
						<h1 className="text-3xl font-Space font-medium">Design [UI/UX]</h1>
						<p className="text-xl leading-relaxed text-[#9B9B9B] font-Sans">
							Libraries for building performant and instant search experiences with Algolia. Compatible
							with JavaScript, TypeScript, React and Vue.
						</p>
						<div className="flex space-x-10 text-xl text-[#405580]">
							<Link href="mailto:willdphan@gmail.com">
								<p>Notion</p>
							</Link>
						</div>
					</div>
				</div>
				{/* LEARNINGS END */}
				{/* LEARNINGS START */}
				<div className="w-full bg-[#121212] rounded-lg mb-6">
					<div className="py-10 px-10 space-y-5">
						<h2 className="text-xl font-Space">Good Reads</h2>
						<h1 className="text-3xl font-Space font-medium">My Library</h1>
						<p className="text-xl leading-relaxed text-[#9B9B9B] font-Sans">
							Libraries for building performant and instant search experiences with Algolia. Compatible
							with JavaScript, TypeScript, React and Vue.
						</p>
						<div className="flex space-x-10 text-xl text-[#405580]">
							<Link href="mailto:willdphan@gmail.com">
								<p>Notion</p>
							</Link>
						</div>
					</div>
				</div>
				{/* LEARNINGS END */}
			</div>
		</section>
	)
}

export default Learnings
