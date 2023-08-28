import React, { useState } from 'react'
import Image from 'next/image'
import opepen from 'public/images/opepen.gif'
import nouns from 'public/images/nouns.gif'
import marketplace from 'public/images/marketplace.gif'
import dock from 'public/images/dock.gif'
import chips from 'public/images/mac-chips.gif'
import walletfeatures from 'public/images/wallet-features.gif'
import opepenfolder from 'public/images/opepenfolder.gif'
import playlist from 'public/images/playlist-2.gif'
import grain from 'public/images/playlist-grain-2.gif'
import cd from 'public/images/cd2.gif'
import degen from 'public/images/degen.gif'
import scale from 'public/images/scale.gif'
import styled from 'styled-components'

const images = [
	{ src: scale, alt: 'image', link: 'https://bw-scaleai.vercel.app/' },
	{ src: dock, alt: 'image' },
	{ src: marketplace, alt: 'image' },
	// { src: playlist, alt: 'image' },
	{ src: degen, alt: 'image', link: 'https://degen-kappa.vercel.app/' },
	{ src: opepen, alt: 'image' },
	{ src: chips, alt: 'image' },
	{ src: cd, alt: 'image' },
	// { src: walletfeatures, alt: 'image' },
	{ src: grain, alt: 'image' },
	{ src: opepenfolder, alt: 'image' },
	{ src: nouns, alt: 'image' },
]

const Crafts = () => {
	const [visible, setVisible] = useState(8)
	const [expanded, setExpanded] = useState(false)
	const [imageLoaded, setImageLoaded] = useState({}) // Add this line

	const toggle = () => {
		if (expanded) {
			setVisible(8)
		} else {
			setVisible(images.length)
		}
		setExpanded(!expanded)
	}

	const handleImageLoaded = index => {
		// Add this function
		setImageLoaded(prevState => ({ ...prevState, [index]: true }))
	}

	return (
		<section id="crafts">
			<div className="gap-2 columns-2 mt-20">
				{images.slice(0, visible).map((image, index) => (
					<div key={index} className="mb-2 relative">
						<a href={image.link}>
							<div
								className={`${
									imageLoaded[index] ? '' : 'animate-pulse bg-gray-400'
								} absolute inset-0 z-10`}
							></div>
							<Image
								alt={image.alt}
								className="w-full rounded-lg border-[#121212] border-2 relative z-0"
								priority={true}
								src={image.src}
								onLoad={() => handleImageLoaded(index)} // Add this line
							/>
						</a>
					</div>
				))}
			</div>
			<button
				onClick={toggle}
				className="py-2 px-4 rounded-md flex items-center hover:cursor-pointer font-Space text-[#9B9B9B] text-xs tracking-widest hover:bg-[#2a2929] hover:text-white transform transition duration-300"
			>
				{expanded ? 'LESS' : 'MORE'}
			</button>
		</section>
	)
}

export default Crafts
// import React, { useState } from 'react'
// import Image from 'next/image'
// import opepen from 'public/images/opepen.gif'
// import nouns from 'public/images/nouns.gif'
// import marketplace from 'public/images/marketplace.gif'
// import dock from 'public/images/dock.gif'
// import chips from 'public/images/mac-chips.gif'
// import walletfeatures from 'public/images/wallet-features.gif'
// import opepenfolder from 'public/images/opepenfolder.gif'
// import playlist from 'public/images/playlist-2.gif'
// import grain from 'public/images/playlist-grain-2.gif'
// import cd from 'public/images/cd2.gif'
// import degen from 'public/images/degen.gif'
// import scale from 'public/images/scale.gif'

// const images = [
// 	{ src: scale, alt: 'image', link: 'https://bw-scaleai.vercel.app/' },
// 	{ src: dock, alt: 'image' },
// 	{ src: marketplace, alt: 'image' },
// 	// { src: playlist, alt: 'image' },
// 	{ src: degen, alt: 'image', link: 'https://degen-kappa.vercel.app/' },
// 	{ src: opepen, alt: 'image' },
// 	{ src: chips, alt: 'image' },
// 	{ src: cd, alt: 'image' },
// 	// { src: walletfeatures, alt: 'image' },
// 	{ src: grain, alt: 'image' },
// 	{ src: opepenfolder, alt: 'image' },
// 	{ src: nouns, alt: 'image' },
// ]
// const Crafts = () => {
// 	const [visible, setVisible] = useState(8) // Initial number of images to show
// 	const [expanded, setExpanded] = useState(false) // Initial state

// 	const toggle = () => {
// 		if (expanded) {
// 			setVisible(8)
// 		} else {
// 			setVisible(images.length)
// 		}
// 		setExpanded(!expanded)
// 	}

// 	return (
// 		<section id="crafts">
// 			<div className="gap-2 columns-2 mt-20">
// 				{images.slice(0, visible).map((image, index) => (
// 					<div key={index} className="mb-2">
// 						<a href={image.link}>
// 							<Image
// 								alt={image.alt}
// 								className="w-full rounded-lg border-[#121212] border-2"
// 								priority={true}
// 								src={image.src}
// 							/>
// 						</a>
// 					</div>
// 				))}
// 			</div>
// 			<button
// 				onClick={toggle}
// 				className="py-2 px-4 rounded-md flex items-center hover:cursor-pointer font-Space text-[#9B9B9B] text-xs tracking-widest hover:bg-[#2a2929] hover:text-white transform transition duration-300"
// 			>
// 				{expanded ? 'LESS' : 'MORE'}
// 			</button>
// 		</section>
// 	)
// }

// export default Crafts
