'use client'
import { signOut } from "next-auth/react"
import { Session } from "next-auth"
import Image from "next/image"
import avatar from '@/public/avatar.webp'

const UserBtn = ({user}: Session) => {
	if(!user) return null
	
	return (
		<div>
			<p>{user?.name}</p>
			<Image src={user.image ?? avatar} alt="user pic" width={50} height={50} />
			<button onClick={() => signOut()}>SignOut</button>
		</div>
	)
}

export default UserBtn