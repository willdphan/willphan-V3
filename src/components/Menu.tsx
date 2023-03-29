import React from 'react'
import { Tab } from '@headlessui/react'
import { useState } from 'react'

import { Link } from 'react-scroll'

const Menu = () => {
	function classNames(...classes) {
		return classes.filter(Boolean).join(' ')
	}

	let [categories] = useState({
		PROJECTS: [],
		CRAFTS: [],
		LEARNINGS: [],
	})

	return (
		<div className="w-full max-w-md  pt-8 sm:px-0 ">
			{/* PHONE SCREEN */}
			<Tab.Group>
				<Tab.List className="flex flex-row rounded-lg  md:flex-row p-1 font-Space lg:hidden">
					{Object.keys(categories).map(category => (
						// eslint-disable-next-line react/jsx-key
						<Link to={category.toLowerCase()} spy={true} smooth={true} offset={100} duration={500}>
							<Tab
								key={category}
								className={({ selected }) =>
									classNames(
										'px-6 sm:px-10 py-2.5 tracking-widest text-xs text-[#9B9B9B] transition-all ease-in-out duration-100',
										'focus:outline-none text-white text-start md:text-center',
										selected
											? '   bg-gradient-to-b from-[#4055808b] via-[#40558039] to-[#40558000] shadow border-t-2 '
											: 'text-white  hover:border-t-2  hover:bg-gradient-to-b from-[#4055808b] via-[#40558039] to-[#40558000] text-xs font-Space tracking-widest '
									)
								}
							>
								{category}
							</Tab>
						</Link>
					))}
				</Tab.List>
			</Tab.Group>
			{/* MEDIUM SCREEN OR LARGER */}
			<Tab.Group>
				<Tab.List className="rounded-lg font-Space hidden lg:block">
					{Object.keys(categories).map(category => (
						// eslint-disable-next-line react/jsx-key
						<Link to={category.toLowerCase()} spy={true} smooth={true} offset={50} duration={500}>
							<Tab
								key={category}
								className={({ selected }) =>
									classNames(
										'flex flex-row px-6 py-4 tracking-widest text-xs text-[#9B9B9B] transition-all ease-in-out duration-100',
										'focus:outline-none text-white text-start md:text-center',
										selected
											? 'bg-gradient-to-r from-[#4055808b] via-[#40558039] to-[#40558000] shadow border-l-2 '
											: 'text-white  hover:border-l-2  hover:bg-gradient-to-r from-[#4055808b] via-[#40558039] to-[#40558000] text-xs font-Space tracking-widest '
									)
								}
							>
								{category}
							</Tab>
						</Link>
					))}
				</Tab.List>
			</Tab.Group>
		</div>
	)
}

export default Menu

{
	/* <div className="pt-10 z-10 text-start font-Space text-[#9B9B9B] text-sm">
			<ul className="space-y-2">
				<li>
					<Link
						className="scroll cursor-pointer hover:ml-5 hover:text-white text-xs font-Space tracking-widest transform transition duration-300 "
						to="Projects"
						spy={true}
						smooth={true}
						offset={50}
						duration={500}
					>
						PROJECTS
					</Link>
				</li>
				<li>
					<Link
						className="scroll cursor-pointer hover:ml-5 hover:text-white text-xs font-Space tracking-widest transform transition duration-300 "
						to="Crafts"
						spy={true}
						smooth={true}
						offset={50}
						duration={500}
					>
						CRAFTS
					</Link>
				</li>
				<li>
					<Link
						className="scroll cursor-pointer hover:ml-5 hover:text-white text-xs font-Space tracking-widest transform transition duration-300 "
						to="Learnings"
						spy={true}
						smooth={true}
						offset={50}
						duration={500}
					>
						LEARNINGS
					</Link>
				</li>
			</ul>
		</div> */
}
