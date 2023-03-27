import { FC } from 'react'
import Menu from 'src/components/Menu'
import Profile from 'src/components/Profile'
import Learnings from 'src/components/Learnings'
import Projects from 'src/components/Projects'
import Crafts from 'src/components/Crafts'

const Home: FC = () => {
	return (
		<div className="flex flex-col lg:flex-row justify-center bg-[#080808] sm:items-center py-4 lg:px-30 2xl:px-40 sm:pt-0">
			<section className="container mx-auto max-h-screen flex flex-col items-center justify-center relative pb-20">
				<div className="h-screen flex flex-col lg:fixed pt-20 lg:pt-0 lg:top-[5em] px-10 xl:px-28  space-y-4 ">
					<h1 className="text-3xl text-white font-Space font-medium">William Phan</h1>
					<h2 className="text-xl text-white font-Space font-medium">Perfectly Imperfect in Every Way</h2>
					<p className="text-md text-[#9B9B9B] leading-loose font-Sans">
						I’m a blockchain developer who dabbles in UX/UI design. You can find me coding on the Blockchain
						, learning LLMs , & exploring UX/UI design. I have a weakness for diet coke & dogs. An avid
						grass toucher.
					</p>
					<div>
						<Menu />
					</div>
					<div>
						<Profile />
					</div>
				</div>
			</section>
			<section className="container mx-auto flex flex-col min-h-screen lg:px-10 xl:px-28 pt-16 py-24 items-center justify-center ">
				<Projects />
				<Crafts />
				<Learnings />
			</section>
		</div>
	)
}

export default Home
