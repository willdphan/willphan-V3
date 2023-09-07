import React from 'react'
import Link from 'next/link'
import { useState } from 'react'
import Masonry from 'react-masonry-css'
import Image from 'next/image'
import splitz from 'public/images/splitz.gif'
import shade from 'public/images/shade.gif'
import kaleidor from 'public/images/kaleidor.gif'
import cdetector from 'public/images/color-detector.gif'
import pose from 'public/images/pose.gif'
import hand from 'public/images/hand.gif'
import parking from 'public/images/parking.gif'
import rice from 'public/images/rice.png'
import fish from 'public/images/fish.png'
import heart from 'public/images/heart.png'
import cardiovascular from 'public/images/cardiovascular.png'
import cifar from 'public/images/cifar.png'
import amazon from 'public/images/amazon.png'

const Fun = () => {
	const [showMore, setShowMore] = useState(false)
	const [selectedTech, setSelectedTech] = useState('ALL')

	const experiments = [
		{
			title: 'PYTHON',
			name: 'Parking Counter',
			description: 'Counting Available Parking Spots with OpenCV',
			code: 'https://github.com/willdphan/parking-counter',
			technology: 'ML/CV',
			image: parking,
			demo: '',
		},
		{
			title: 'PYTHON',
			name: 'Color Detector',
			description: 'Color Detector with OpenCV and PIL',
			code: 'https://github.com/willdphan/color-detector',
			technology: 'ML/CV',
			image: cdetector,
			demo: '',
		},
		{
			title: 'PYTHON',
			name: 'Pose Estimation',
			description: 'Pose Estimation with OpenCV & MediaPipe',
			code: 'https://github.com/willdphan/pose-estimator',
			technology: 'ML/CV',
			image: pose,
			demo: '',
		},
		{
			title: 'PYTHON',
			name: 'Hand Tracker',
			description: 'Hand Detection with OpenCV & MediaPipe',
			code: 'https://github.com/willdphan/hand-tracker',
			technology: 'ML/CV',
			image: hand,
			demo: '',
		},
		{
			title: 'PYTHON',
			name: 'Age-Related Conditions',
			description: 'Anonymized Health Metrics to Predict Binary Outcome',
			code: 'https://github.com/willdphan/age-related-conditions/tree/main',
			nbviewer:
				'https://nbviewer.org/github/willdphan/age-related-conditions/blob/main/Age_Related_Conditions.ipynb',
			technology: 'ML/CV',
			demo: '',
		},
		{
			title: 'PYTHON',
			name: 'Private VS Public Uni',
			description: 'University Classification - Private VS Public K-Means',
			code: 'https://github.com/willdphan/private-vs-public-uni/blob/main/Private_vs_Public_Universities.ipynb',
			nbviewer:
				'https://nbviewer.org/github/willdphan/private-vs-public-uni/blob/main/Private_vs_Public_Universities.ipynb',
			technology: 'ML/CV',
			demo: '',
		},
		{
			title: 'PYTHON',
			name: 'Cardiovascular Disease',
			description: 'Cardiovascular Disease Prediction on 19 Lifestyle Factors',
			code: 'https://github.com/willdphan/cardiovascular-disease',
			nbviewer:
				'https://nbviewer.org/github/willdphan/cardiovascular-disease/blob/main/Cardiovascular_Disease.ipynb',
			technology: 'ML/CV',
			image: cardiovascular,
			demo: '',
		},
		{
			title: 'PYTHON',
			name: 'Heart Disease',
			description: 'Binary Classification for Heart Disease Prediction.',
			code: 'https://github.com/willdphan/heart-disease/tree/main',
			nbviewer: 'https://nbviewer.org/github/willdphan/heart-disease/blob/main/Heart_Disease.ipynb',
			technology: 'ML/CV',
			image: heart,
			demo: '',
		},
		{
			title: 'PYTHON',
			name: 'Rice CNN',
			description: 'Rice CNN with 75,000 grain images.',
			code: 'https://github.com/willdphan/rice-cnn',
			nbviewer: 'https://nbviewer.org/github/willdphan/rice-cnn/blob/main/Rice_Classifier_CNN.ipynb',
			technology: 'ML/CV',
			image: rice,
			demo: '',
		},
		{
			title: 'PYTHON',
			name: 'Fish CNN',
			description: 'CNN with 9 different types of seafood.',
			code: 'https://github.com/willdphan/fish-cnn',
			nbviewer: 'https://nbviewer.org/github/willdphan/fish-cnn/blob/main/Fish_CNN.ipynb',
			technology: 'ML/CV',
			image: fish,
			demo: '',
		},
		{
			title: 'PYTHON',
			name: 'Pet CNN',
			description: 'ResNet-50 architecture for Cat and Dog Dataset.',
			code: 'https://github.com/willdphan/pet-cnn',
			nbviewer: 'https://nbviewer.org/github/willdphan/pet-cnn/blob/main/Pet_Classifier_CNN.ipynb',
			technology: 'ML/CV',
			demo: '',
		},
		{
			title: 'PYTHON',
			name: 'Frozen Lake',
			description: 'Reinforcement Learning with Frozen Lake Game.',
			code: 'https://github.com/willdphan/frozen-lake',
			nbviewer: 'https://nbviewer.org/github/willdphan/frozen-lake/blob/master/Frozen_Lake_Q_Learning.ipynb',
			technology: 'ML/CV',
		},
		{
			title: 'PYTHON',
			name: 'Amazon Stock LSTM',
			description: 'LSTM Amazon Stock Price Prediction.',
			code: 'https://github.com/willdphan/amazon-forecast/tree/main',
			nbviewer:
				'https://nbviewer.org/github/willdphan/amazon-forecast/blob/main/Amazon_Stock_Forecasting_with_LSTM.ipynb',
			technology: 'ML/CV',
			image: amazon,
			demo: '',
		},
		{
			title: 'PYTHON',
			name: 'CIFAR-10 CNN',
			description: 'CNN for CIFAR-1O Dataset.',
			code: 'https://github.com/willdphan/cifar-cnn/tree/main',
			nbviewer: 'https://nbviewer.org/github/willdphan/cifar-cnn/blob/main/CIFAR_10_CNN.ipynb',
			technology: 'ML/CV',
			image: cifar,
			demo: '',
		},
		{
			title: 'PYTHON',
			name: 'Fashion CNN',
			description: 'CNN for Fashion MNIST Dataset.',
			code: 'https://github.com/willdphan/fashion-cnn',
			nbviewer:
				'https://nbviewer.org/github/willdphan/fashion-cnn/blob/main/CNN_Fashion_Classifier_on_MNIST.ipynb',
			technology: 'ML/CV',
			demo: '',
		},
		{
			title: 'PYTHON',
			name: 'Number CNN',
			description: 'CNN for Number MNIST Dataset.',
			code: 'https://github.com/willdphan/number-cnn',
			technology: 'ML/CV',
			demo: '',
		},
		{
			title: 'PYTHON',
			name: 'Car Price',
			description: 'Linear Regression model to predict car selling prices.',
			code: 'https://github.com/willdphan/car-price.git',
			nbviewer: 'https://nbviewer.org/github/willdphan/car-price/blob/main/Car_Price_Regression.ipynb',
			technology: 'ML/CV',
			demo: '',
		},
		{
			title: 'PYTHON',
			name: 'GPT PDF',
			description: 'Using GPT to analyze PDFs.',
			code: 'https://github.com/willdphan/gpt-pdf',
			nbviewer: 'https://nbviewer.org/github/willdphan/gpt-pdf/blob/main/pdf_gpt.ipynb',
			technology: 'ML/CV',
			demo: '',
		},
		{
			title: 'PYTHON',
			name: 'Lex QA Agent',
			description: 'Lex Fridman question and answer agent.',
			code: 'https://github.com/willdphan/lex-agent',
			nbviewer: 'https://nbviewer.org/github/willdphan/lex-agent/blob/main/langchain_lex_agent.ipynb',
			technology: 'ML/CV',
			demo: '',
		},
		{
			title: 'TYPESCRIPT',
			name: 'Kaleidor',
			description: 'On-Chain NFTs w/VRGDAs. You see what you get.',
			frontend: 'https://kaleidor.vercel.app/',
			technology: 'BLOCKCHAIN',
			image: kaleidor,
			demo: '',
		},
		{
			title: 'SOLIDITY',
			name: 'RICKS-V2',
			description: 'Fractionalized ERC721 auction w/VRGDA pricing.',
			code: 'https://github.com/willdphan/RICKS-V2.git',
			technology: 'BLOCKCHAIN',
			demo: '',
		},
		{
			title: 'SOLIDITY',
			name: 'One of One',
			description: '1 | 1 NFT editions using gas efficient Minimal Proxy.',
			code: 'https://github.com/willdphan/1-of-1.git',
			technology: 'BLOCKCHAIN',
			demo: '',
		},
		{
			title: 'SOLIDITY',
			name: 'Shade',
			description: 'On-chain generative art. 111 shades of NFTs.',
			frontend: 'https://shade-pi.vercel.app/',
			technology: 'BLOCKCHAIN',
			image: shade,
			demo: '',
		},
		{
			title: 'SOLIDITY',
			name: 'ERC20-YUL',
			description: 'ERC-20 in Yul. Obviously, not optimal for production.',
			code: 'https://github.com/willdphan/erc20-yul',
			technology: 'BLOCKCHAIN',
			demo: '',
		},
		{
			title: 'SOLIDITY',
			name: 'Latter',
			description: 'Mini-implementation of Affirm - Buy Now, Pay Later.',
			code: 'https://github.com/willdphan/latter-contracts.git',
			technology: 'BLOCKCHAIN',
			demo: '',
		},
		{
			title: 'SOLIDITY',
			name: 'Splitz',
			description: 'Funds split among recipients automatically.',
			frontend: 'https://splitz.vercel.app',
			code: 'https://github.com/willdphan/splitz-contracts',
			technology: 'BLOCKCHAIN',
			image: splitz,
			demo: '',
		},
	]

	const filteredExperiments = experiments.filter(exp =>
		selectedTech === 'ALL' ? true : exp.technology === selectedTech
	)

	return (
		<section className="mt-[-2em]" id="for fun">
			<div className="flex items-center justify-start mb-4">
				{' '}
				<h2 className="text-sm font-Space text-[#9B9B9B] mx-2 mr-8">LEARNINGS</h2>{' '}
				{/* Title next to dropdown */}
				<select
					value={selectedTech}
					onChange={e => setSelectedTech(e.target.value)}
					className="bg-[#000000] rounded-md py-2 text-md leading-relaxed text-sm font-Space text-[#9B9B9B] tracking-widest hover:bg-[#2a2929] hover:text-white transform transition duration-300"
				>
					<option value="ALL">ALL</option>
					<option value="ML/CV">ML | CV</option>
					<option value="BLOCKCHAIN">BLOCKCHAIN</option>
					<option value="OTHER">OTHER</option>
				</select>
			</div>
			<Masonry
				breakpointCols={{ default: 2, 700: 1 }}
				className="my-masonry-grid flex gap-2 relative"
				columnClassName="my-masonry-grid_column"
			>
				{filteredExperiments.slice(0, showMore ? filteredExperiments.length : 4).map(project => (
					<div
						key={project.name}
						className="my-masonry-grid_column mb-2 w-full bg-[#181818]  border-[#262626] border-[1px] rounded-lg py-7 px-7 space-y-2 transform transition duration-300 sm:hover:scale-[1.01] sm:hover:bg-gradient-to-br hover:bg-[#2a2929] ] text-[#9B9B9B] hover:text-white"
					>
						<h2 className="text-xs font-Space text-[#9B9B9B] tracking-widest">{project.title}</h2>
						<h1 className="text-lg font-Space p font-medium text-white">{project.name}</h1>
						<p className="text-sm leading-relaxed font-Sans text-[#9B9B9B]">{project.description}</p>
						<div className="flex space-x-4 pt-3">
							{project.demo ? (
								<a
									href={project.demo}
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center hover:cursor-pointer font-Sans text-sm text-[#54627a] pr-3"
								>
									Demo
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
										<path fill="none" d="M0 0h24v24H0z" />
										<path
											d="M16.004 9.414l-8.607 8.607-1.414-1.414L14.589 8H7.004V6h11v11h-2V9.414z"
											fill="#54627a"
										/>
									</svg>
								</a>
							) : null}

							{project.frontend && (
								<a
									href={project.frontend}
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center hover:cursor-pointer font-Sans text-sm text-[#54627a] pr-3"
								>
									Frontend
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
										<path fill="none" d="M0 0h24v24H0z" />
										<path
											d="M16.004 9.414l-8.607 8.607-1.414-1.414L14.589 8H7.004V6h11v11h-2V9.414z"
											fill="#54627a"
										/>
									</svg>
								</a>
							)}
							{project.code && (
								<a
									href={project.code}
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center hover:cursor-pointer font-Sans text-sm text-[#54627a] pr-3"
								>
									Code
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
										<path fill="none" d="M0 0h24v24H0z" />
										<path
											d="M16.004 9.414l-8.607 8.607-1.414-1.414L14.589 8H7.004V6h11v11h-2V9.414z"
											fill="#54627a"
										/>
									</svg>
								</a>
							)}
							{project.nbviewer && (
								<a
									href={project.nbviewer}
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center hover:cursor-pointer font-Sans text-sm text-[#54627a] pr-3"
								>
									NBViewer
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
										<path fill="none" d="M0 0h24v24H0z" />
										<path
											d="M16.004 9.414l-8.607 8.607-1.414-1.414L14.589 8H7.004V6h11v11h-2V9.414z"
											fill="#54627a"
										/>
									</svg>
								</a>
							)}
							{/* Adding the Next.js Image component */}
						</div>
						{project.image && (
							<div className="pt-5">
								<Image
									src={project.image}
									alt={project.name}
									width={600} // specify the width
									height={300} // specify the height
									layout="responsive" // if you want to maintain aspect ratio
									className="rounded"
								/>
							</div>
						)}
					</div>
				))}
			</Masonry>
			{filteredExperiments.length > 3 && (
				<button
					className="py-2 px-4 rounded-md flex items-center hover:cursor-pointer font-Space text-[#9B9B9B] text-xs tracking-widest hover:bg-[#2a2929] hover:text-white transform transition duration-300"
					onClick={() => setShowMore(!showMore)}
				>
					{showMore ? 'LESS' : 'MORE'}
				</button>
			)}
		</section>
	)
}

export default Fun
