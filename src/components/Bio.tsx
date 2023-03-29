import React from 'react'
import Menu from 'src/components/Menu'
import Profile from 'src/components/Profile'
import Learnings from 'src/components/Learnings'
import Projects from 'src/components/Projects'
import Crafts from 'src/components/Crafts'
import Link from 'next/link'

const Bio = () => {
	return (
		<div className="pt-20 lg:fixed min-h-screen lg:pt-14  space-y-4 px-3 lg:px-10  ">
			<h1 className="text-4xl text-white font-Space font-medium">William Phan</h1>
			<h2 className="text-xl text-white font-Space font-medium">Always Imperfectly Perfect</h2>
			<p className="text-sm text-[#9B9B9B] leading-loose font-Sans md:max-w-[50em] lg:max-w-[30em]">
				A blockchain developer dabbling in design. I&apos;m always trying to push the boundaries of what&apos;s
				possible and finding new ways to make a difference through technology. I have a weakness for diet coke &
				dogs.
				<a className="lg:hidden">
					{' '}
					<br />{' '}
				</a>{' '}
				<div className="inline-block"> An avid grass toucher</div>
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

{
	/* <div className="h-screen flex flex-col lg:fixed pt-20 lg:max-w-[50%] lg:pt-0 lg:top-[5em] space-y-4 px-10 xl:px-28">
						<h1 className="text-3xl text-white font-Space font-medium">William Phan</h1>
						<h2 className="text-xl text-white font-Space font-medium">Always Imperfectly Perfect</h2>
						<p className="text-sm text-[#9B9B9B] leading-loose font-Sans">
							I’m a blockchain developer who dabbles in UX/UI design. You can find me coding on the
							Blockchain, learning LLMs, & exploring UX/UI design. I have a weakness for diet coke & dogs.
							An avid grass toucher.
						</p>
						<div>
							<Menu />
						</div>
						<div>
							<Profile />
						</div>
					</div> */
}
