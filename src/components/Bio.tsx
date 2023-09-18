import React from 'react'
import Menu from 'src/components/Menu'
import Profile from 'src/components/Profile'
import Learnings from '@/components/Other'
import Projects from '@/components/Learnings'
import Crafts from 'src/components/Crafts'
import Link from 'next/link'

const Bio = () => {
	return (
		<div className="pt-20 lg:fixed min-h-screen lg:pt-18 space-y-2 px-3 lg:px-10  ">
			<h1 className="text-md font-Space font-medium text-white ">William Phan</h1>
			{/* <h2 className="text-sm text-[#9B9B9B] font-Inter leading-relaxed font-normal">
				Inherently Imperfectly Perfect
			</h2> */}

			<p className="text-sm text-[#9B9B9B] leading-relaxed font-Inter font-normal md:max-w-[50em] lg:max-w-[30em] xl:max-w-[35em]">
				An <span className="underline underline-offset-2">Inherently Imperfectly Perfect</span> 21 year old
				developer dabbling in design. Interested in Computer Vision. Finding ways to make a difference through
				technology while documenting my learnings. I have a weakness for diet coke & dogs. Avid grass toucher.
			</p>
			<div>
				<Menu />
			</div>
			<div>
				<Profile />
			</div>
		</div>
	)
}

export default Bio
