import { signIn } from "next-auth/react"
import { Button } from "../ui/button"
// todo find icon package for socials.

const Socials = () => {
	return (
		<div>
			<Button
				variant={'outline'}
				className=""
				onClick={() => signIn('google', {

					redirect: false, //????
					callbackUrl: '/' // probably going to change to dashboard

				})}>
				<p>Sign in with Google</p>
				{/* social icon */}
			</Button>
		</div>
	)
}

export default Socials