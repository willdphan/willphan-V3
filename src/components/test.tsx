import React from 'react'
import Link from 'next/link'

const Projects = () => {
	return (
		<section id="projects">
			<div className="lg:flex gap-2">
				{/* COLUMN 1 */}

				<section className="space-y-2 ">
					{/* PROJECT START MARGIN-TOP-10 */}
					<div className=" w-full  bg-[#121212] rounded-lg  py-10 px-10 space-y-2 transform transition duration-300 sm:hover:scale-[1.01] sm:hover:bg-gradient-to-br from-[#405580] via-[#8c9ab7] to-[#FFFFFF] text-[#9B9B9B] hover:text-white">
						<h2 className="text-xs font-Space text-white tracking-widest">SOLIDITY</h2>
						<h1 className="text-xl font-Space font-medium text-white">One of One</h1>
						<p className="text-sm leading-relaxed font-Sans">
							One Of One NFT editions using Minimal Proxy. Draft of gas efficient deployments.
						</p>
						<div className="flex space-x-3 text-sm text-[#405580] pt-4">
							{/* LINK 1 */}
							<div className="flex items-center hover:cursor-pointer">
								<Link href="https://github.com/willdphan/1-of-1.git">
									<p>Code</p>
								</Link>
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
									<path fill="none" d="M0 0h24v24H0z" />
									<path
										d="M16.004 9.414l-8.607 8.607-1.414-1.414L14.589 8H7.004V6h11v11h-2V9.414z"
										fill="#405580"
									/>
								</svg>
							</div>
						</div>
					</div>
					{/* PROJECT END */}
					{/* PROJECT START MARGIN-TOP-10 */}
					<div className=" w-full bg-[#121212] rounded-lg py-10 px-10 space-y-2 transform transition duration-300 sm:hover:scale-[1.01] sm:hover:bg-gradient-to-br from-[#405580] via-[#8c9ab7] to-[#FFFFFF] text-[#9B9B9B] hover:text-white">
						<h2 className="text-xs font-Space text-white tracking-widest">PYTHON</h2>
						<h1 className="text-xl font-Space font-medium text-white">Jarvis</h1>
						<p className="text-sm leading-relaxed font-Sans">
							Playing with OpenAI&apos;s API. Jarvis, A GPT Voice Assistant was made with speech
							recognition, OpenAI&apos;s Whisper, and Gradio
						</p>
						<div className="flex space-x-3 text-sm text-[#405580] pt-4">
							{/* LINK 1 */}
							<div className="flex items-center hover:cursor-pointer">
								<Link href="https://github.com/willdphan/jarvis-whisperr">
									<p>Code</p>
								</Link>
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
									<path fill="none" d="M0 0h24v24H0z" />
									<path
										d="M16.004 9.414l-8.607 8.607-1.414-1.414L14.589 8H7.004V6h11v11h-2V9.414z"
										fill="#405580"
									/>
								</svg>
							</div>
							{/* LINK 2 */}
						</div>
					</div>
					{/* PROJECT END */}
					{/* PROJECT START MARGIN-TOP-10 */}
					<div className=" w-full bg-[#121212] rounded-lg  py-10 px-10 space-y-2 transform transition duration-300 sm:hover:scale-[1.01] sm:hover:bg-gradient-to-br from-[#405580] via-[#8c9ab7] to-[#FFFFFF] text-[#9B9B9B] hover:text-white">
						<h2 className="text-xs font-Space text-white tracking-widest">SOLIDITY</h2>
						<h1 className="text-xl font-Space font-medium text-white">ERC20-YUL</h1>
						<p className="text-sm leading-relaxed font-Sans">
							Used to practice coding in Yul. Made to be gas-efficient. Obviously, not optimal for
							production.
						</p>
						<div className="flex space-x-3 text-sm text-[#405580] pt-4">
							{/* LINK 1 */}
							<div className="flex items-center hover:cursor-pointer">
								<Link href="https://github.com/willdphan/erc20-yul">
									<p>Code</p>
								</Link>
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
									<path fill="none" d="M0 0h24v24H0z" />
									<path
										d="M16.004 9.414l-8.607 8.607-1.414-1.414L14.589 8H7.004V6h11v11h-2V9.414z"
										fill="#405580"
									/>
								</svg>
							</div>
						</div>
					</div>
					{/* PROJECT END */}
					{/* PROJECT START MARGIN-TOP-10 */}
					<div className=" w-full bg-[#121212] rounded-lg  py-10 px-10 space-y-2 transform transition duration-300 sm:hover:scale-[1.01] sm:hover:bg-gradient-to-br from-[#405580] via-[#8c9ab7] to-[#FFFFFF] text-[#9B9B9B] hover:text-white">
						<h2 className="text-xs font-Space text-white tracking-widest">SOLIDITY</h2>
						<h1 className="text-xl font-Space font-medium text-white">RSVP</h1>
						<p className="text-sm leading-relaxed font-Sans">
							Show Up or Pay Up. A fee is required to attend a meeting. If absent, you lose the fee you
							initially paid upfront.
						</p>
						<div className="flex space-x-3 text-sm text-[#405580] pt-4">
							{/* LINK 1 */}
							<div className="flex items-center hover:cursor-pointer">
								<Link href="https://github.com/willdphan/rsvp">
									<p>Code</p>
								</Link>
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
									<path fill="none" d="M0 0h24v24H0z" />
									<path
										d="M16.004 9.414l-8.607 8.607-1.414-1.414L14.589 8H7.004V6h11v11h-2V9.414z"
										fill="#405580"
									/>
								</svg>
							</div>
						</div>
					</div>
					{/* PROJECT END */}
					{/* PROJECT START MARGIN-TOP-10 */}
					<div className=" w-full bg-[#121212] rounded-lg  py-10 px-10 space-y-2 transform transition duration-300 sm:hover:scale-[1.01] sm:hover:bg-gradient-to-br from-[#405580] via-[#8c9ab7] to-[#FFFFFF] text-[#9B9B9B] hover:text-white">
						<h2 className="text-xs font-Space text-white tracking-widest">TYPESCRIPT</h2>
						<h1 className="text-xl font-Space font-medium text-white">Kaleidor</h1>
						<p className="text-sm leading-relaxed font-Sans">
							On-Chain NFTs. The price structure of the minted NFTs are based on VRGDAs. SVGs are
							pre-rendered so you see what you get.
						</p>
						<div className="flex space-x-3 text-sm text-[#405580] pt-4">
							{/* LINK 1 */}
							<div className="flex items-center hover:cursor-pointer">
								<Link href="https://kaleidor.vercel.app/">
									<p>Frontend</p>
								</Link>
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
									<path fill="none" d="M0 0h24v24H0z" />
									<path
										d="M16.004 9.414l-8.607 8.607-1.414-1.414L14.589 8H7.004V6h11v11h-2V9.414z"
										fill="#405580"
									/>
								</svg>
							</div>
							{/* LINK 2 */}
						</div>
					</div>
					{/* PROJECT END */}
				</section>

				{/* COLUMN 2 */}

				<section className="space-y-2 pt-2 lg:pt-10 lg:max-w-[50%]">
					{/* PROJECT START */}
					<div className="w-full bg-[#121212] rounded-lg py-10 px-10 space-y-2 transform transition duration-300 sm:hover:scale-[1.01] sm:hover:bg-gradient-to-br from-[#405580] via-[#8c9ab7] to-[#FFFFFF] text-[#9B9B9B] hover:text-white">
						<h2 className="text-xs font-Space text-white tracking-widest">SOLIDITY</h2>
						<h1 className="text-xl font-Space font-medium text-white">Latter</h1>
						<p className="text-sm leading-relaxed font-Sans">
							Mini-implementation of Affirm - Buy Now, Pay Later. Pay-in-four model is implemented, where
							4 payments are made every 2 weeks for an NFT.
						</p>
						<div className="flex space-x-3 text-sm text-[#405580] pt-4">
							{/* LINK 1 */}
							<div className="flex items-center hover:cursor-pointer">
								<Link href="https://github.com/willdphan/latter-contracts.git">
									<p>Code</p>
								</Link>
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
									<path fill="none" d="M0 0h24v24H0z" />
									<path
										d="M16.004 9.414l-8.607 8.607-1.414-1.414L14.589 8H7.004V6h11v11h-2V9.414z"
										fill="#405580"
									/>
								</svg>
							</div>
						</div>
					</div>
					{/* PROJECT END */}

					{/* PROJECT START  */}
					<div className=" w-full bg-[#121212] rounded-lg  py-10 px-10 space-y-2 transform transition duration-300 sm:hover:scale-[1.01] sm:hover:bg-gradient-to-br from-[#405580] via-[#8c9ab7] to-[#FFFFFF] text-[#9B9B9B] hover:text-white">
						<h2 className="text-xs font-Space text-white tracking-widest">SOLIDITY</h2>
						<h1 className="text-xl font-Space font-medium text-white">Shade</h1>
						<p className="text-sm leading-relaxed font-Sans">
							On-chain generative art. 111 NFTs, each a different pattern. Every NFT is different, unique
							and can be minted on the Shade dapp frontend.
						</p>
						<div className="flex space-x-3 text-sm text-[#405580] pt-4">
							{/* LINK 1 */}
							<div className="flex items-center hover:cursor-pointer">
								<Link href="https://shade-pi.vercel.app/">
									<p>Frontend</p>
								</Link>
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
									<path fill="none" d="M0 0h24v24H0z" />
									<path
										d="M16.004 9.414l-8.607 8.607-1.414-1.414L14.589 8H7.004V6h11v11h-2V9.414z"
										fill="#405580"
									/>
								</svg>
							</div>
							{/* LINK 2 */}
							<div className="flex items-center hover:cursor-pointer ">
								<Link href="https://github.com/willdphan/shade-contracts">
									<p>Code</p>
								</Link>
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
									<path fill="none" d="M0 0h24v24H0z" />
									<path
										d="M16.004 9.414l-8.607 8.607-1.414-1.414L14.589 8H7.004V6h11v11h-2V9.414z"
										fill="#405580"
									/>
								</svg>
							</div>
						</div>
					</div>
					{/* PROJECT END */}

					{/* PROJECT START */}
					<div className=" w-full bg-[#121212] rounded-lg  py-10 px-10 space-y-2 transform transition duration-300 sm:hover:scale-[1.01] sm:hover:bg-gradient-to-br from-[#405580] via-[#8c9ab7] to-[#FFFFFF] text-[#9B9B9B] hover:text-white">
						<h2 className="text-xs font-Space text-white tracking-widest">SOLIDITY</h2>
						<h1 className="text-xl font-Space font-medium text-white">Splitz</h1>
						<p className="text-sm leading-relaxed font-Sans">
							A mini-implementation of 0xSplitz. Send funds to a group and when received, funds are split
							among the designated recipients automatically.
						</p>
						<div className="flex space-x-3 text-sm text-[#405580] pt-4">
							{/* LINK 1 */}
							<div className="flex items-center hover:cursor-pointer">
								<Link href="splitz.vercel.app">
									<p>Frontend</p>
								</Link>
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
									<path fill="none" d="M0 0h24v24H0z" />
									<path
										d="M16.004 9.414l-8.607 8.607-1.414-1.414L14.589 8H7.004V6h11v11h-2V9.414z"
										fill="#405580"
									/>
								</svg>
							</div>
							{/* LINK 2 */}
							<div className="flex items-center hover:cursor-pointer ">
								<Link href="https://github.com/willdphan/splitz-contracts">
									<p>Code</p>
								</Link>
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
									<path fill="none" d="M0 0h24v24H0z" />
									<path
										d="M16.004 9.414l-8.607 8.607-1.414-1.414L14.589 8H7.004V6h11v11h-2V9.414z"
										fill="#405580"
									/>
								</svg>
							</div>
						</div>
					</div>
					{/* PROJECT END */}

					{/* PROJECT START*/}
					<div className=" w-full bg-[#121212] rounded-lg py-10 px-10 space-y-2 transform transition duration-300 sm:hover:scale-[1.01] sm:hover:bg-gradient-to-br from-[#405580] via-[#8c9ab7] to-[#FFFFFF] text-[#9B9B9B] hover:text-white">
						<h2 className="text-xs font-Space text-white tracking-widest">SOLIDITY</h2>
						<h1 className="text-xl font-Space font-medium text-white">Ratio</h1>
						<p className="text-sm leading-relaxed font-Sans">
							A mini-implementation of Fractional. Each NFT that intends to be fractionalized would be
							turn into a vault by utilizing a clone factory (Vault Factory).
						</p>
						<div className="flex space-x-3 text-sm text-[#405580] pt-4">
							{/* LINK 1 */}
							<div className="flex items-center hover:cursor-pointer">
								<Link href="ratio-flame.vercel.app">
									<p>Frontend</p>
								</Link>
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
									<path fill="none" d="M0 0h24v24H0z" />
									<path
										d="M16.004 9.414l-8.607 8.607-1.414-1.414L14.589 8H7.004V6h11v11h-2V9.414z"
										fill="#405580"
									/>
								</svg>
							</div>
							{/* LINK 2 */}
							<div className="flex items-center hover:cursor-pointer ">
								<Link href="https://github.com/willdphan/ratio-contracts">
									<p>Code</p>
								</Link>
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
									<path fill="none" d="M0 0h24v24H0z" />
									<path
										d="M16.004 9.414l-8.607 8.607-1.414-1.414L14.589 8H7.004V6h11v11h-2V9.414z"
										fill="#405580"
									/>
								</svg>
							</div>
						</div>
					</div>
					{/* PROJECT END */}
				</section>
			</div>
		</section>
	)
}

export default Projects
