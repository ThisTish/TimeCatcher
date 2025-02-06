'use client'

import { Button } from "@/components/ui/button"
import { useEffect } from "react"


const ErrorPage = ({ error, reset }: { error: Error & { digest?: string }, reset: () => void }) => {
	useEffect(() => {
		console.log(error)
	}, [])

	return (
		<main className="bg-neutral-700 bg-[url(/circles.png)] bg-repeat-round bg-left-top h-dvh flex items-center justify-center">
			<div className=" text-center m-3 h-fit max-w-3xl p-5 space-y-5 md:p-16 bg-neutral-400/20 shadow-2xl rounded-lg ">
				<h1 className="text-3xl font-black md:text-5xl">A broken clock is right two times a day</h1>
				<div>
					<p className="text-pretty text-xl md:text-2xl">There was an error</p>
					<p className="text-pretty text-xl md:text-2xl pb-5">{error.message}</p>

				</div>
				<div className="space-x-3">
					<Button variant={'outline'} onClick={() => window.history.back()}>Go Back</Button>
					<Button onClick={() => reset()}>Try Again</Button>
				</div>
			</div>
		</main>
	)
}

export default ErrorPage