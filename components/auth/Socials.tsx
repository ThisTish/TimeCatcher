import { signIn } from "next-auth/react"
import { Button } from "../ui/button"
// todo find icon package for socials.(google, discord, instagram, linkedin)

const Socials = () => {
	return (
		<div>
			<Button
				variant={'outline'}
				className=""
				onClick={() => signIn('google', {

					redirect: false, //????
					callbackUrl: '/'

				})}>
				<p>Sign in with Google</p>
				{/* social icon */}
			</Button>
			<Button
				variant={'outline'}
				className=""
				onClick={() => signIn('discord', {

					redirect: false, //????
					callbackUrl: '/' 

				})}>
				<p>Sign in with Discord</p>
				{/* social icon */}
			</Button>
			<Button
				variant={'outline'}
				className=""
				onClick={() => signIn('instagram', {

					redirect: false, //????
					callbackUrl: '/' 

				})}>
				<p>Sign in with Instagram</p>
				{/* social icon */}
			</Button>
			<Button
				variant={'outline'}
				className=""
				onClick={() => signIn('linkedin', {

					redirect: false, //????
					callbackUrl: '/' 

				})}>
				<p>Sign in with Linkedin</p>
				{/* social icon */}
			</Button>
		</div>
	)
}

export default Socials