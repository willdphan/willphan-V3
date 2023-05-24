import React from 'react'
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

const images = [
	{ src: scale, alt: 'image', link: 'https://bw-scaleai.vercel.app/' },
	{ src: dock, alt: 'image' },
	{ src: marketplace, alt: 'image' },
	{ src: playlist, alt: 'image' },
	{ src: degen, alt: 'image', link: 'https://degen-kappa.vercel.app/' },
	{ src: opepen, alt: 'image' },
	{ src: chips, alt: 'image' },
	{ src: cd, alt: 'image' },
	{ src: walletfeatures, alt: 'image' },
	{ src: grain, alt: 'image' },
	{ src: opepenfolder, alt: 'image' },
	{ src: nouns, alt: 'image' },
]

const Crafts = () => {
	return (
		<section id="crafts">
			<div className="gap-2 columns-2 mt-20 mb-20">
				{images.map((image, index, link) => (
					<div key={index} className="mb-2">
						<a href={image.link}>
							<Image
								alt={image.alt}
								className="w-full rounded-lg border-[#121212] border-2"
								priority={true}
								src={image.src}
							/>
						</a>
					</div>
				))}
			</div>
		</section>
	)
}

export default Crafts
