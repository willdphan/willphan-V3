import { FC } from 'react'
import Menu from 'src/components/Menu'
import Profile from 'src/components/Profile'
import Learnings from 'src/components/Learnings'
import Projects from 'src/components/Projects'
import Crafts from 'src/components/Crafts'
import Bio from 'src/components/Bio'

const Home: FC = () => {
	return (
		<div className="flex items-center justify-center bg-[#080808] ">
			<div className="relative px-6 lg:px-10 xl:px-28 max-w-screen-2xl	">
				<div className="relative lg:w-6/12 inset-0">
					<Bio />
				</div>

				<div className="w-full lg:w-6/12 ml-auto pt-14 ">
					<Projects />
					<Crafts />
					<Learnings />
				</div>
			</div>
		</div>
	)
}

export default Home

{
	/* <div className="bg-[#080808] flex items-center justify-center ">
			<div className="flex flex-col lg:flex-row justify-center max-w-7xl sm:items-center py-4 lg:px-30 2xl:px-0 sm:pt-0 relative ">
				<section className="container mx-auto flex flex-col min-h-screen lg:max-w-[50%] px-10 lg:px-10 xl:px-28 pt-16 py-24 items-center justify-center fixed">
					<Bio />
				</section>
				<section className=" container mx-auto flex flex-col min-h-screen lg:max-w-[50%] px-10 lg:px-10 xl:px-28 pt-16 py-24 items-center justify-center ">
					<Projects />
					<Crafts />
					<Learnings />
				</section>
			</div>
		</div> */
}
