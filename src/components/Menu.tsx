import React from 'react'
import Link from 'next/link'

const Menu = () => {
	return (
		<div className="pt-10 z-10 text-start font-Sans text-[#9B9B9B] space-y-10 text-md">
			<Link href="https://github.com/wdphan">
				<p className="scroll  cursor-pointer hover:underline pb-7">Projects</p>
			</Link>
			<Link href="/projects">
				<p className="scroll  cursor-pointer hover:underline pb-7">Crafts</p>
			</Link>
			<Link href="https://frost-sloop-bbc.notion.site/Library-034fc60526034e6c85f1f4fa605095e7">
				<p className="scroll  cursor-pointer hover:underline pb-7">Learnings</p>
			</Link>
		</div>
	)
}

export default Menu
