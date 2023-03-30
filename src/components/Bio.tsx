import React from 'react'
import Menu from 'src/components/Menu'
import Profile from 'src/components/Profile'
import Learnings from 'src/components/Learnings'
import Projects from '@/components/Experiments'
import Crafts from 'src/components/Crafts'
import Link from 'next/link'

const Bio = () => {
	return (
		<div className="pt-20 lg:fixed min-h-screen lg:pt-18  space-y-4 px-3 lg:px-10  ">
			<h1 className="text-4xl text-white font-Space font-medium">William Phan</h1>
			<h2 className="text-xl text-white font-Space font-medium">Inherently Imperfectly Perfect</h2>
			<p className="text-sm text-[#9B9B9B] leading-loose font-Sans md:max-w-[50em] lg:max-w-[30em]">
				20 year old developer dabbling in design. I&apos;m always trying to push the boundaries of what&apos;s
				possible and finding new ways to make a difference through technology. I have a weakness for diet coke &
				dogs.
				<a className="lg:hidden">
					{' '}
					<br />{' '}
				</a>{' '}
				<div className="inline-block"> An avid grass toucher.</div>
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
