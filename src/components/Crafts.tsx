import React from 'react'
import Image from 'next/image'
import test from 'public/images/iphone-se-2020-2560x1440-dark-8k-22550.jpg'
import test1 from 'public/images/wallpaper.jpg'
import test2 from 'public/images/apple-macbook-pro-2021-2560x1440-abstract-colorful-apple-october-2021-23772.jpg'
import Link from 'next/link'
import Menu from 'src/components/Menu'
import Profile from 'src/components/Profile'

const Crafts = () => {
	return (
		<section>
			<div className="gap-6 columns-2 ">
				{/* MARGIN-TOP-20 */}
				<div className="mb-4 mt-20">
					<Image alt="image" className="w-full aspect-square" objectFit="contain" src={test} />
				</div>
				<div className="mb-4">
					<Image alt="image" className="w-full aspect-square rounded-lg" objectFit="contain" src={test1} />
				</div>
				<div className="mb-4">
					<Image alt="image" className="w-full aspect-square rounded-lg" objectFit="contain" src={test2} />
				</div>
				<div className="mb-4">
					<Image alt="image" className="w-full aspect-square rounded-lg" objectFit="contain" src={test1} />
				</div>
				<div className="mb-4">
					<Image alt="image" className="w-full aspect-square rounded-lg" objectFit="contain" src={test2} />
				</div>
				<div className="mb-4">
					<Image alt="image" className="w-full aspect-square rounded-lg" objectFit="contain" src={test1} />
				</div>
				<div className="mb-4">
					<Image alt="image" className="w-full aspect-square rounded-lg" objectFit="contain" src={test2} />
				</div>
				<div className="mb-4">
					<Image alt="image" className="w-full aspect-square rounded-lg" objectFit="contain" src={test} />
				</div>
				<div className="mb-4">
					<Image alt="image" className="w-full aspect-square" objectFit="contain" src={test2} />
				</div>
				<div className="mb-4">
					<Image alt="image" className="w-full aspect-square rounded-lg " objectFit="contain" src={test} />
				</div>
				<div className="mb-4">
					<Image alt="image" className="w-full aspect-square rounded-lg" objectFit="contain" src={test1} />
				</div>
				<div className="mb-4">
					<Image alt="image" className="w-full aspect-square" objectFit="contain" src={test2} />
				</div>
				<div className="mb-4">
					<Image alt="image" className="w-full aspect-square" objectFit="contain" src={test2} />
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
