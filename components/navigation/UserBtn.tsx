'use client'
import { signOut } from "next-auth/react"
import { Session } from "next-auth"
import Image from "next/image"
import avatar from '@/public/avatar.webp'
import { Button } from "../ui/button"


const UserBtn = ({user}: Session) => {
	if(!user) return null
	
	return (
		<div >
			<p>{user?.name}</p>
			<Image src={user.image ?? avatar} alt="user pic" width={50} height={50} />
			<Button 
				className="p-0"
				variant={'ghost'}
				onClick={() => signOut({redirectTo: '/', redirect: true})}
			>
				Sign Out
			</Button>
		</div>
	)
}

export default UserBtn