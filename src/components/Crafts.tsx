import React, { useState } from 'react'
import { useEffect } from 'react'

const videos = [
	{ src: 'https://pub-33c643825c664d0091b84d7ae37a5150.r2.dev/scaleai-craft.mov', alt: 'video' },
	{ src: 'https://pub-33c643825c664d0091b84d7ae37a5150.r2.dev/mac-chips-craft.mov', alt: 'video' },
	{ src: 'https://pub-33c643825c664d0091b84d7ae37a5150.r2.dev/cd-craft.mov', alt: 'video' },
	{ src: 'https://pub-33c643825c664d0091b84d7ae37a5150.r2.dev/icon-dock-craft.mp4', alt: 'video' },
	{ src: 'https://pub-33c643825c664d0091b84d7ae37a5150.r2.dev/nft-marketplace-craft.mp4', alt: 'video' },
	{ src: 'https://pub-33c643825c664d0091b84d7ae37a5150.r2.dev/opepen-folder-craft.mov', alt: 'video' },
	{ src: 'https://pub-33c643825c664d0091b84d7ae37a5150.r2.dev/grain-craft.mov', alt: 'video' },
	{ src: 'https://pub-33c643825c664d0091b84d7ae37a5150.r2.dev/opepen-craft.mp4', alt: 'video' },
	{ src: 'https://pub-33c643825c664d0091b84d7ae37a5150.r2.dev/nouns-folder-craft.mp4', alt: 'video' },
]

const Crafts = () => {
	const [visible, setVisible] = useState(5) // Initial number of videos to show
	const [expanded, setExpanded] = useState(false) // Initial state

	const toggle = () => {
		if (expanded) {
			setVisible(5)
		} else {
			setVisible(videos.length)
		}
		setExpanded(!expanded)
	}

	useEffect(() => {
		const videoElement = document.querySelector('video')
		videoElement.addEventListener('canplaythrough', function () {
			this.play()
		})
	}, [])

	return (
		<section id="crafts">
			<div className="gap-2 md:columns-2 mt-20">
				{videos.slice(0, visible).map((video, index) => (
					<div key={index} className="mb-2 border-[#242424] border-[1px] rounded-lg">
						<video
							autoPlay
							loop
							muted
							playsInline
							// className="w-full h-full rounded-lg border-[#121212] border-2"
							className="w-full h-full rounded-lg"
						>
							<source src={video.src} type="video/mp4" />
							Your browser does not support the video tag.
						</video>
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
