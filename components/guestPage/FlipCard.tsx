

import { cn } from "@/lib/utils"
import React, { useEffect, useRef, useState } from "react"

const FlipCard = ({ currentDigit, prevDigit, index }: { currentDigit: string, prevDigit: string, index: number }) => {
	const [isFlipped, setIsFlipped] = useState(false)

	useEffect(() => {
		if (currentDigit !== prevDigit) {
			setIsFlipped(false);
			const timer = setTimeout(() => {
				setIsFlipped(true);
			}, 400);
			return () => clearTimeout(timer);
		}

	}, [currentDigit, prevDigit]);

	return (
		
		<div className={cn(
			` relative overflow-hidden flex flex-col h-12 sm:h-24  lg:h-36 bg-neutral-400 rounded-lg shadow-lg text-3xl sm:text-6xl lg:text-8xl font-semibold`,
			currentDigit === 'AM' || currentDigit === 'PM'
				? 'w-16 sm:w-32 lg:w-48' : 'w-10 sm:w-16 lg:w-24',
			index == 1 || index == 2 || index == 4 || index == 6 || index == 7
				? 'ml-0' : 'ml-2 lg:ml-4',

		)}>
			{/* Top Card */}
			<div className=" relative w-full h-1/2 bg-gradient-to-b from-neutral-500 to-neutral-300 border-b-2 border-neutral-800 rounded-t-lg overflow-hidden shadow-lg ">
				<p className="absolute top-1 sm:top-[1rem] lg:top-4 left-2 tabular-nums">
					{currentDigit}
				</p>
			</div>

			{/* Bottom Card */}
			<div className=" relative w-full h-1/2 bg-gradient-to-b from-neutral-300 from-60% to-neutral-400  rounded-b-lg overflow-hidden shadow-lg">
				<p className="absolute -top-5 sm:-top-8 lg:-top-14 left-2  tabular-nums">
					{prevDigit}
				</p>
			</div>

			{/* Animation Layer */}
			{isFlipped ? null : (

				<div
					className='absolute w-full h-full top-0 left-0 '>
					<div
						className={`animate-flip-down bg-gradient-to-b from-neutral-500 to-neutral-300 border-b-2 rounded-t-lg border-neutral-800  overflow-hidden w-full h-1/2 transform origin-bottom`}>
						<p className=" absolute top-1 sm:top-[1rem] lg:top-4 left-2 tabular-nums">
							{prevDigit}
						</p>
					</div>
				</div>
			)}

			{!isFlipped ? null : (
				<div className={` absolute w-full h-1/2 bottom-0 left-0 overflow-hidden animate-flip-up transform origin-top`}>
					<div
						className={`bg-gradient-to-b from-neutral-300 from-30% to-70% to-neutral-400  pb-[70px] w-full h-1/2 `}>
						<p className="absolute -top-5 sm:-top-8 lg:-top-14 left-2 tabular-nums">
							{currentDigit}
						</p>
					</div>
				</div>
			)}
		</div>

	)

}

export default FlipCard
