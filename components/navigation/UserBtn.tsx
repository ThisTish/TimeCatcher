'use client'
import { signOut } from "next-auth/react"
import { Session } from "next-auth"

const UserBtn = ({user}: Session) => {
	return (
		<div>
			<p>{user?.name}</p>
			<button onClick={() => signOut()}>SignOut</button>
			
		</div>
	)
}

export default UserBtn