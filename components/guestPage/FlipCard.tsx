

import { cn } from "@/lib/utils"
import React, { useEffect, useState } from "react"

const FlipCard = ({ currentDigit, prevDigit, index }: { currentDigit: string, prevDigit: string, index: number }) => {
	const [isFlipped, setIsFlipped] = useState(false)
	const [displayedDigit, setDisplayedDigit] = useState(currentDigit)
	const [prevDisplayedDigit, setPrevDisplayedDigit] = useState(currentDigit)

	// todo store the previous displayedDigit -> show that instead of prevDigit, after animation change set displayedDigit to currentDigit





	useEffect(() => {
		// if(currentDigit !== prevDigit){
		setIsFlipped(true);
		const timer = setTimeout(() => {
			setIsFlipped(false);
		}, 200); // Match this with your animation duration
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
					{isFlipped ? prevDigit : currentDigit}
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
			<div className={ ` absolute w-full h-full top-0 left-0`}>
					<div className={`${!isFlipped ? 'animate-flip-down bg-slate-300' : ''} w-full h-1/2 text-3xl  md:text-8xl overflow-hidden transform origin-bottom`}>
						<p className="absolute top-4 left-2 tabular-nums">
							{currentDigit}
						</p>
					</div>
			</div>

			<div className={ `  absolute w-full h-full top-16 left-0`}>
					<div className={`${!isFlipped ? 'animate-flip-up bg-slate-200' : ''} transform origin-top delay-300 w-full h-1/2 text-3xl  md:text-8xl overflow-hidden `}>
						<p className="absolute -top-12 left-2 tabular-nums">
							{currentDigit}
						</p>
					</div>
			</div>
		</div>
	)

}

export default FlipCard
