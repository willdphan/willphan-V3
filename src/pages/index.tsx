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

				<div className="w-full lg:w-6/12 ml-auto pt-14  ">
					<Projects />
					<Crafts />
					<Learnings />
				</div>
			</div>
		</div>
	)
}

export default Home
