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

const Crafts = () => {
	return (
		<section id="crafts">
			<div className="gap-2 columns-2 mt-20 mb-20">
				<div className="mb-2 mt-10">
					<Image alt="image" className="w-full rounded-lg" src={opepen} />
				</div>
				<div className="mb-2">
					<Image alt="image" className="w-full  rounded-lg" src={nouns} />
				</div>
				<div className="mb-2">
					<Image alt="image" className="w-full  rounded-lg" src={marketplace} />
				</div>
				<div className="mb-2">
					<Image alt="image" className="w-full  rounded-lg" src={dock} />
				</div>
				<div className="mb-2">
					<Image alt="image" className="w-full  rounded-lg" src={chips} />
				</div>
			</div>
		</section>
	)
}

export default Crafts
