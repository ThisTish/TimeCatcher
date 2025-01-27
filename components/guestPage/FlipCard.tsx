

import { cn } from "@/lib/utils"
import React, { useEffect, useRef, useState } from "react"

const FlipCard = ({ currentDigit, prevDigit, index }: { currentDigit: string, prevDigit: string, index: number }) => {
	const [isFlipped, setIsFlipped] = useState(false)

	useEffect(() => {
		if (currentDigit !== prevDigit) {
			setIsFlipped(false);
			const timer = setTimeout(() => {
				setIsFlipped(true);
			}, 600);
			return () => clearTimeout(timer);
		}

	}, [currentDigit, prevDigit]);

	return (
		
		<div className={cn(
			` relative flex flex-col h-12 sm:h-24  md:h-36 bg-slate-200 rounded-lg shadow-lg text-3xl sm:text-6xl  md:text-8xl  font-semibold`,
			currentDigit === 'AM' || currentDigit === 'PM'
				? 'w-16 sm:w-32 md:w-48' : 'w-10 sm:w-16 md:w-24',
			index == 1 || index == 2 || index == 4 || index == 6
				? 'ml-0' : 'ml-1 md:ml-2',

		)}>
			{/* Top Card */}
			<div className=" relative w-full h-1/2 bg-slate-300 rounded-t-md overflow-hidden shadow-md ">
				<p className="absolute top-1 sm:top-[1rem] md:top-4 left-2 tabular-nums">
					{currentDigit}
				</p>
			</div>

			{/* Bottom Card */}
			<div className=" relative w-full h-1/2 bg-slate-200 rounded-b-md overflow-hidden shadow-md">
				<p className="absolute -top-5 sm:-top-8 md:-top-14 left-2  tabular-nums">
					{prevDigit}
				</p>
			</div>

			{/* Animation Layer */}
			{isFlipped ? null : (

				<div
					className='absolute w-full h-full top-0 left-0 '>
					<div
						className={`animate-flip-down bg-slate-300 overflow-hidden w-full h-1/2 transform origin-bottom`}>
						<p className=" absolute top-1 sm:top-[1rem] md:top-4 left-2 tabular-nums">
							{prevDigit}
						</p>
					</div>
				</div>
			)}

			{!isFlipped ? null : (
				<div className={` absolute w-full h-1/2 bottom-0 left-0 overflow-hidden animate-flip-up transform origin-top`}>
					<div
						className={` bg-slate-200 w-full h-1/2 `}>
						<p className="absolute -top-5 sm:-top-8 md:-top-14 left-2 tabular-nums">
							{currentDigit}
						</p>
					</div>
				</div>
			)}
		</div>

	)

}

export default FlipCard
