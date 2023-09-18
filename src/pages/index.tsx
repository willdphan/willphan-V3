import { FC } from 'react'
import Menu from 'src/components/Menu'
import Profile from 'src/components/Profile'
import Other from '@/components/Other'
import Projects from '@/components/Projects'
import Learnings from '@/components/Learnings'
import Crafts from 'src/components/Crafts'
import Bio from 'src/components/Bio'

const Home: FC = () => {
	return (
		<div className="flex items-center justify-center bg-[#0A0A0A] ">
			<div className="relative px-6 lg:px-10 xl:px-28 max-w-screen-2xl w-full	">
				<div className="relative lg:w-6/12 inset-0">
					<Bio />
				</div>

				<div className="w-full lg:w-6/12 ml-auto pt-14  ">
					<Projects />
					<Learnings />
					<Crafts />
					<Other />
				</div>
			</div>
		</div>
	)
}

export default Home
