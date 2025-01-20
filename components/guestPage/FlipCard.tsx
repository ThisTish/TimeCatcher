

import { cn } from "@/lib/utils"
import React, { useEffect, useState } from "react"

const FlipCard = ({ currentDigit, prevDigit, index }: { currentDigit: string, prevDigit: string, index: number }) => {
	const [isFlipped, setIsFlipped] = useState(false)
	const [newDigit, setNewDigit] = useState(currentDigit)

	useEffect(() => {
		// if(currentDigit !== prevDigit){
		setIsFlipped(true);
		const timer = setTimeout(() => {
			setIsFlipped(false);
		}, 500); // Match this with your animation duration
		return () => clearTimeout(timer);
		// }

	}, [currentDigit, prevDigit]);

	// console.log(index)
	return (
		<div className={cn(
			`relative flex flex-col h-12 md:h-36 bg-slate-200 rounded-lg border-2 shadow-lg font-semibold`,
			currentDigit === 'AM' || currentDigit === 'PM'
				? 'w-16 md:w-48' : 'w-10  md:w-24',
			index == 1 || index == 2 || index == 4 || index == 6
				? 'ml-0' : 'ml-1 md:ml-2',

		)}>
			{/* Top Card */}
			<div className="relative overflow-hidden w-full h-1/2 bg-slate-300 rounded-t-md text-3xl shadow-md md:text-8xl">
				<p className="absolute top-4  left-2 tabular-nums">
					{isFlipped ? currentDigit : prevDigit}
				</p>
				{/* </div> */}
			</div>

			{/* Bottom Card */}
			<div className="relative overflow-hidden w-full h-1/2 bg-slate-200 rounded-b-md shadow-md -mt-1 text-3xl md:text-8xl">
				<p className="absolute -top-12 left-2  tabular-nums">
					{currentDigit}
				</p>
			</div>

			{/* Animation Layer */}

			<div className={ `${!isFlipped ? 'animate-flip-down' : ''} absolute w-full h-full top-0 left-0`}>
					<div className="w-full h-1/2 text-3xl  md:text-8xl overflow-hidden transform origin-bottom">
						<p className="absolute top-4 left-2 tabular-nums">
							{prevDigit}
						</p>
					</div>
			</div>

			<div className={ `${!isFlipped ? 'animate-flip-up' : ''} absolute w-full h-full top-14 left-0 mt-2 transform origin-top `}>
					<div className="w-full h-1/2 text-3xl  md:text-8xl overflow-hidden ">
						<p className="absolute -top-12 left-2 tabular-nums">
							{currentDigit}
						</p>
					</div>
			</div>
		</div>
	)
				{/* {isFlipped && (
				<div className="relative overflow-hidden bg-slate-500 w-full h-1/2 origin-bottom animate-flip-down">
					<div className="relative w-full h-full animate-flip-down bg-slate-200-800 rounded-t-md overflow-hidden">
					<p className="absolute -top-10 left-2 text-yellow text-3xl md:text-6xl tabular-nums">
						{prevDigit}
					</p>
					</div>
				</div>
			)} */}

			{/* Flipping Bottom Card */}
			{/* {isFlipped && (
				<div className="absolute bottom-0 left-0 w-full h-1/2 origin-top">
					<div className="relative w-full h-full animate-flip-up bg-slate-200-900 rounded-b-md overflow-hidden">
						<p className="absolute top-1 left-2 text-gray-200 text-3xl md:text-6xl tabular-nums">
							{currentDigit}
						</p>
					</div>
				</div>
			)} */}
}

export default FlipCard
