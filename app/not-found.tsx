import { Button } from "@/components/ui/button"
import Link from "next/link"

const NotFound = () => {
	return (
		<main className="bg-neutral-900/55 h-dvh flex items-center justify-center">
			<div className=" text-center border m-3 size-fit p-5 space-y-5 md:p-16 bg-neutral-400/70 shadow-2xl rounded-lg ">
			<h1 className="text-3xl font-black md:text-5xl">Lost in time?</h1>
			<div>
			<p className="text-pretty text-xl md:text-2xl">Page could not be found. </p>
			<p className="text-pretty text-xl pb-5 md:text-2xl">Let's get back to your time. </p>
				
			</div>
			<Button asChild>
				<Link href="/">Home</Link>
			</Button>
				
			</div>
		</main>
	)
}

export default NotFound