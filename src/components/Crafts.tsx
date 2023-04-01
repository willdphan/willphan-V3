import React from 'react'
import Image from 'next/image'
import test from 'public/images/iphone-se-2020-2560x1440-dark-8k-22550.jpg'
import test1 from 'public/images/wallpaper.jpg'
import test2 from 'public/images/apple-macbook-pro-2021-2560x1440-abstract-colorful-apple-october-2021-23772.jpg'
import opepen from 'public/images/ezgif.com-video-to-gif.gif'
import nouns from 'public/images/ezgif.com-video-to-gif (1).gif'
import marketplace from 'public/images/ezgif.com-video-to-gif (1) copy.gif'
import dock from 'public/images/ezgif.com-video-to-gif (1) copy 2.gif'
import chips from 'public/images/mac-chips.gif'
import walletfeatures from 'public/images/wallet-features.gif'
import opepenfolder from 'public/images/ezgif.com-optimize.gif'
import playlist from 'public/images/playlist-song-2.gif'
import grain from 'public/images/playlist-grain-2.gif'
import cd from 'public/images/cd2.gif'

const images = [
	{ src: dock, alt: 'image' },
	{ src: marketplace, alt: 'image' },
	{ src: playlist, alt: 'image' },
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
				{images.map((image, index) => (
					<div key={index} className="mb-2">
						<Image
							alt={image.alt}
							className="w-full rounded-lg border-[#121212] border-2"
							priority={true}
							src={image.src}
						/>
					</div>
				))}
			</div>
		</section>
	)
}

export default Crafts
