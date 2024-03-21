import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout, { projectClasses } from 'src/pages/projects/layout'
import '@mantine/code-highlight/styles.css'
import { CodeHighlight } from '@mantine/code-highlight'
import { Code } from '@mantine/core'
import Image from 'next/image'
import { CodeHighlightTabs } from '@mantine/code-highlight'
import Link from 'next/link'
import Latex from 'react-latex-next'
import 'katex/dist/katex.min.css'

{
	/* <br />

<CodeHighlightTabs
	withExpandButton
	defaultExpanded={false}
	expandCodeLabel="Show full code"
	collapseCodeLabel="Show less"
	code={[{ fileName: 'draw_scenario', code: draw, language: 'tsx' }]}
/>

<br /> */
}

const Project = () => {
	const difference = `
array([ -0.0095994,   0.0013328,  -0.0028969,   0.0023714,   -0.010605,  -0.0032876,   -0.013486,  -0.0092651,  -0.0040865,   -0.011558,   0.0044812,  -0.0059038,   -0.010697])
`

	const router = useRouter()
	const { projectName } = router.query

	const publicationDate = 'March, 2024'

	return (
		<Layout projectName={projectName as string} publicationDate={publicationDate}>
			<div className={`${projectClasses.content}`}>
				<div>
					In building this quadruped robot, my aim was to expand my practical skills in several areas. It
					served as an ideal platform for learning about Arduino applications and exploring the complexities
					of robotic movement. Incorporating an ESP32 camera allowed me to delve into the realm of computer
					vision, an exciting area that adds depth to a robot&apos;s interaction with its surroundings.
				</div>

				<div>
					{' '}
					I chose a design that resonates with the futuristic appeal of sci-fi, which added an element of fun
					to the challenge. I grabbed some CAD files online, edited and combined them to form the design.
					Soldering became a valuable skill picked up along the way, ensuring that the electronic components
					were assembled with precision. The project was a step into more advanced robotics, marrying my
					technical interests with creative design. Below is a CAD render of SILK 02. Like always, I like to
					keep it minimal.
				</div>
			</div>

			<br />

			<video
				autoPlay
				loop
				muted
				playsInline
				// className="w-full h-full rounded-lg border-[#121212] border-2"
				className="w-full h-full rounded-lg border-[#121212] border-2"
			>
				<source
					src="https://pub-33c643825c664d0091b84d7ae37a5150.r2.dev/silk-02-display.mp4"
					type="video/mp4"
				/>
				Your browser does not support the video tag.
			</video>

			<br />

			<div className={`${projectClasses.content}`}>
				<div>
					{' '}
					At one point, I got really into product design and learned how to sketch on my iPad. I wanted to go
					further with renders and use a software like KeyShot, but Fusion360 will do!
				</div>
			</div>

			<br />
			<Image
				src="/images/silk-02-sketch.jpeg"
				alt=""
				width={1000}
				height={1000}
				layout="responsive"
				className={`${projectClasses.image}`}
			/>

			<br />

			<h2 id="ender 3 issues & prints" className={`${projectClasses.subheading}`}>
				Ender 3 Issues & Prints
			</h2>
			<div className={`${projectClasses.content}`}>
				<div>
					I was tired of commuting back and forth to school to 3D print pieces of this robot, so I decided to
					dog-sit for a week to save up for an Ender 3.
				</div>

				<div>
					It took around 2 hours to set up, along with an hour of trying to printer to accept the PLA
					filament.
				</div>
			</div>

			<br />
			<Image
				src="/images/silk-02-ender-build.jpg"
				alt=""
				width={1000}
				height={1000}
				layout="responsive"
				className={`${projectClasses.image}`}
			/>

			<br />

			<div className={`${projectClasses.content}`}>
				<div>
					Learned a lot about how to use the Cura Slicer, and how to ensure prints come out properly. Many
					issues came up:
				</div>

				<div>
					<ul>
						<li>• Filament would get tangled</li>
						<li>• Constantly adjusting bed level</li>
						<li>• Prints wouldn&apos;t stick to bed</li>
					</ul>
				</div>

				<div>
					... and more. Some of these issues still exist, and constantly supervision is needed when printing.
					The prints definitely should have come out cleaner and smoother, but they will do for now.
				</div>
			</div>

			<br />

			<video
				autoPlay
				loop
				muted
				playsInline
				// className="w-full h-full rounded-lg border-[#121212] border-2"
				className="w-full h-full rounded-lg border-[#121212] border-2"
			>
				<source
					src="https://pub-33c643825c664d0091b84d7ae37a5150.r2.dev/silk-02-sped-up.MOV"
					type="video/mp4"
				/>
				Your browser does not support the video tag.
			</video>

			<br />

			<div>
				Either way, it&apos;s super cool to see a machine making another machine. The way it delivers the print
				is super satisfying. Stared at the Ender 3 do its work.
			</div>

			<br />

			<video
				autoPlay
				loop
				muted
				playsInline
				// className="w-full h-full rounded-lg border-[#121212] border-2"
				className="w-full h-full rounded-lg border-[#121212] border-2"
			>
				<source
					src="https://pub-33c643825c664d0091b84d7ae37a5150.r2.dev/silk-02-delivery.MOV"
					type="video/mp4"
				/>
				Your browser does not support the video tag.
			</video>

			<br />
			<h2 id="assembly" className={`${projectClasses.subheading}`}>
				Assembly
			</h2>

			<div className={`${projectClasses.content}`}>
				<div>
					The assembly took hours. This was mostly due to subpar quality prints. I had to drills larger holes,
					re-print broken parts, and ensure SILK 02 was able to remain mobile (able to move its legs).
					Otherwise, the servos would&apos; be able to move the parts since they&apos;re not strong enough.
				</div>

				<div>
					Cable management was also a small hassle. Just constantly reorganizing, assembling and un-assembling
					to see what would look best for the bot.
				</div>
			</div>

			<br />
			<Image
				src="/images/silk-02-wiring.jpeg"
				alt=""
				width={1000}
				height={1000}
				layout="responsive"
				className={`${projectClasses.image}`}
			/>
			<br />

			<div className={`${projectClasses.content}`}>
				<div>
					But, we got it assembled! As you can see, the pile on the left were the parts and extra filament I
					had to scrap. There was more, but I threw them away. Just a nice comparison to show the trial and
					error of working with the Ender 3.
				</div>
			</div>

			<br />
			<Image
				src="/images/silk-02-assemble.jpeg"
				alt=""
				width={1000}
				height={1000}
				layout="responsive"
				className={`${projectClasses.image}`}
			/>
			<br />

			<div className={`${projectClasses.content}`}>
				<div>
					Had to disassemble it several times to identify what was wrong while coding. I realized that 2 of
					the 8 servers were not working and I burnt out 3 Arduino Nanos So I went in and replaced them. Got
					some movement going, not final yet though. 
				</div>
			</div>

			<br />

			<video
				autoPlay
				loop
				muted
				playsInline
				// className="w-full h-full rounded-lg border-[#121212] border-2"
				className="w-full h-full rounded-lg border-[#121212] border-2"
			>
				<source src="https://pub-33c643825c664d0091b84d7ae37a5150.r2.dev/silk-02-move.MOV" type="video/mp4" />
				Your browser does not support the video tag.
			</video>

			<br />
		</Layout>
	)
}

export default Project
