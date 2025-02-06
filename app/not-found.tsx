import { Button } from "@/components/ui/button"
import Link from "next/link"

const NotFound = () => {
	return (
		<main className="bg-neutral-700 bg-[url(/subtle-zebra-3d.png)] bg-repeat-round bg-left-top h-dvh flex items-center justify-center">
			<div className=" text-center size-fit p-5 space-y-5  md:p-10 backdrop-blur-md">
			<h1 className="text-3xl font-black">Lost in time?</h1>
			<p className="text-pretty text-xl ">Page could not be found. Let's get back to your time.</p>
			<Button asChild>
				<Link href="/">Home</Link>
			</Button>
				
			</div>
		</main>
	)
}

export default NotFound