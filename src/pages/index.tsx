import { FC } from 'react'
import { APP_NAME } from '@/lib/consts'
import ConnectWallet from '@/components/ConnectWallet'
import { BookOpenIcon, CodeIcon, ShareIcon } from '@heroicons/react/outline'
import ThemeSwitcher from '@/components/ThemeSwitcher'
import Menu from 'src/components/Menu'
import Profile from 'src/components/Profile'
import Image from 'next/image'
import test from 'public/images/iphone-se-2020-2560x1440-dark-8k-22550.jpg'
import test1 from 'public/images/wallpaper.jpg'
import test2 from 'public/images/apple-macbook-pro-2021-2560x1440-abstract-colorful-apple-october-2021-23772.jpg'

const Home: FC = () => {
	return (
		<div className="flex flex-col xl:flex-row justify-center bg-[#080808] sm:items-center py-4 xl:px-30 2xl:px-40 sm:pt-0">
			<section className="container mx-auto max-h-screen flex items-center justify-center flex-col relative pb-40">
				<div className="h-screen flex flex-col xl:fixed pt-28 xl:pt-0 xl:top-[10em] px-20 xl:pr-32 xl:max-w-[50em] space-y-8">
					<h1 className="text-6xl text-white text-Space font-medium">William Phan</h1>
					<h2 className="text-3xl text-white text-Space font-medium">Perfectly Imperfect in Every Way</h2>
					<p className="text-2xl text-[#9B9B9B] leading-loose text-Sans">
						I’m a blockchain developer who dabbles in UX/UI design. You can find me coding on the{' '}
						<a className="underline underline-offset-6" href="">
							Blockchain
						</a>
						, learning{' '}
						<a className="underline underline-offset-2" href="">
							MLL
						</a>
						, & exploring{' '}
						<a className="underline underline-offset-2" href="">
							UX/UI
						</a>{' '}
						design. I have a weakness for diet coke & dogs. An avid grass toucher.
					</p>
					<div className="">
						<Menu />
					</div>
					<div>
						<Profile />
					</div>
				</div>
			</section>
			<section className="container mx-auto flex flex-col min-h-screen px-20 pt-24 sm:mt-0 py-24 items-center justify-center ">
				<div className="gap-6 columns-2">
					<div className="mb-4">
						<Image alt="image" className="w-full aspect-square" objectFit="contain" src={test} />
					</div>
					<div className="mb-4">
						<Image
							alt="image"
							className="w-full aspect-square rounded-lg"
							objectFit="contain"
							src={test1}
						/>
					</div>
					<div className="mb-4">
						<Image
							alt="image"
							className="w-full aspect-square rounded-lg"
							objectFit="contain"
							src={test2}
						/>
					</div>
					<div className="mb-4">
						<Image
							alt="image"
							className="w-full aspect-square rounded-lg"
							objectFit="contain"
							src={test1}
						/>
					</div>
					<div className="mb-4">
						<Image
							alt="image"
							className="w-full aspect-square rounded-lg"
							objectFit="contain"
							src={test2}
						/>
					</div>
					<div className="mb-4">
						<Image
							alt="image"
							className="w-full aspect-square rounded-lg"
							objectFit="contain"
							src={test1}
						/>
					</div>
					<div className="mb-4">
						<Image
							alt="image"
							className="w-full aspect-square rounded-lg"
							objectFit="contain"
							src={test2}
						/>
					</div>
					<div className="mb-4">
						<Image alt="image" className="w-full aspect-square rounded-lg" objectFit="contain" src={test} />
					</div>
					<div className="mb-4">
						<Image alt="image" className="w-full aspect-square" objectFit="contain" src={test2} />
					</div>
					<div className="mb-4">
						<Image
							alt="image"
							className="w-full aspect-square rounded-lg "
							objectFit="contain"
							src={test}
						/>
					</div>
					<div className="mb-4">
						<Image
							alt="image"
							className="w-full aspect-square rounded-lg"
							objectFit="contain"
							src={test1}
						/>
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
		</div>
	)
}

export default Home
