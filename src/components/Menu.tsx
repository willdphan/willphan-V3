import React from 'react'
import Link from 'next/link'

const Menu = () => {
	return (
		<div>
			<div className="pt-20 z-10 text-start font-Sans text-[#9B9B9B] space-y-10 text-2xl">
				<Link href="https://github.com/wdphan">
					<h1 className="scroll  cursor-pointer hover:underline">Crafts</h1>
				</Link>
				<Link href="/projects">
					<h1 className=" scroll  cursor-pointer hover:underline">Projects</h1>
				</Link>
				<Link href="https://frost-sloop-bbc.notion.site/Library-034fc60526034e6c85f1f4fa605095e7">
					<h1 className="scroll  cursor-pointer hover:underline">Learnings</h1>
				</Link>
			</div>
		</div>
	)
}

export default Menu
