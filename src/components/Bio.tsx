import React from 'react'
import Menu from 'src/components/Menu'
import Profile from 'src/components/Profile'
import Learnings from 'src/components/Learnings'
import Projects from '@/components/Experiments'
import Crafts from 'src/components/Crafts'
import Link from 'next/link'

const Bio = () => {
	return (
		<div className="pt-20 lg:fixed min-h-screen lg:pt-18 space-y-2 px-3 lg:px-10  ">
			<h1 className="text-xl font-Space font-medium text-white ">William Phan</h1>
			<h2 className="text-md text-[#9B9B9B] font-Sans leading-relaxed font-light">
				Inherently Imperfectly Perfect
			</h2>
			<p className="text-md text-[#9B9B9B] leading-relaxed font-Sans  font-light md:max-w-[50em] lg:max-w-[25em] xl:max-w-[30em]">
				21 year old developer dabbling in design. Finding new ways to make a difference through technology while
				documenting my learnings. I have a weakness for diet coke & dogs. Avid grass toucher.
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
