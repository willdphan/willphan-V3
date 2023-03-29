import React from 'react'
import Image from 'next/image'
import test from 'public/images/iphone-se-2020-2560x1440-dark-8k-22550.jpg'
import test1 from 'public/images/wallpaper.jpg'
import test2 from 'public/images/apple-macbook-pro-2021-2560x1440-abstract-colorful-apple-october-2021-23772.jpg'

const Crafts = () => {
	return (
		<section id="crafts">
			<div className="gap-2 columns-2 mt-20 mb-20">
				<div className="mb-2 mt-10">
					<Image alt="image" className="w-full" src={test} />
				</div>
				<div className="mb-2">
					<Image alt="image" className="w-full  rounded-lg" src={test1} />
				</div>
				<div className="mb-2">
					<Image alt="image" className="w-full  rounded-lg" src={test2} />
				</div>
				<div className="mb-2">
					<Image alt="image" className="w-full  rounded-lg" src={test1} />
				</div>
				<div className="mb-2">
					<Image alt="image" className="w-full  rounded-lg" src={test2} />
				</div>
				<div className="mb-2">
					<Image alt="image" className="w-full rounded-lg" src={test1} />
				</div>
				<div className="mb-2">
					<Image alt="image" className="w-full  rounded-lg" src={test2} />
				</div>
				<div className="mb-2">
					<Image alt="image" className="w-full rounded-lg" src={test} />
				</div>
				<div className="mb-2">
					<Image alt="image" className="w-full rounded-lg" src={test2} />
				</div>
				<div className="mb-2">
					<Image alt="image" className="w-full  rounded-lg " src={test} />
				</div>
				<div className="mb-2">
					<Image alt="image" className="w-full  rounded-lg" src={test1} />
				</div>
				<div className="mb-2">
					<Image alt="image" className="w-full rounded-lg" src={test2} />
				</div>
				<div className="mb-2">
					<Image alt="image" className="w-full rounded-lg" src={test2} />
				</div>

				{/* <img className="w-full aspect-video mb-12" src="https://picsum.photos/500/300?random=1" />
					<img className="w-full aspect-square mb-6" src="https://picsum.photos/500/300?random=2" />
					<img className="w-full aspect-square mb-6" src="https://picsum.photos/500/300?random=3" />
					<img className="w-full aspect-square mb-6" src="https://picsum.photos/500/300?random=4" />
					<img className="w-full aspect-video mb-6" src="https://picsum.photos/500/300?random=5" />
					<img className="w-full aspect-video mb-6" src="https://picsum.photos/500/300?random=6" />
					<img className="w-full aspect-square mb-6" src="https://picsum.photos/500/300?random=7" />
					<img className="w-full aspect-video mb-6" src="https://picsum.photos/500/300?random=8" />
					<img className="w-full aspect-square mb-6" src="https://picsum.photos/500/300?random=9" /> */}
			</div>
		</section>
	)
}

export default Crafts
