import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import profile from 'public/images/profile-pic.jpeg'

const Profile = () => {
	return (
		<div className="flex flex-row items-center space-x-10 absolute bottom-20 xl:bottom-60">
			<Image
				alt="image"
				className="w-full aspect-square rounded-full"
				height={75}
				width={75}
				objectFit="contain"
				src={profile}
			/>
			<h1 className="scroll text-Sans text-2xl cursor-pointer space-x-10">
				<Link href="https://twitter.com/willdphan">
					<a className=" hover:underline"> Twitter</a>
				</Link>
				<Link href="mailto:willdphan@gmail.com">
					<a className="scroll hover:underline"> Github </a>
				</Link>
			</h1>
		</div>
	)
}

export default Profile
