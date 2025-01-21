

import { cn } from "@/lib/utils"
import React, { useEffect, useRef, useState } from "react"

const FlipCard = ({ currentDigit, prevDigit, index }: { currentDigit: string, prevDigit: string, index: number }) => {
	const [isFlipped, setIsFlipped] = useState(true)
	const flipDownRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (currentDigit !== prevDigit) {
			setIsFlipped(false);
			const timer = setTimeout(() => {
				setIsFlipped(true);
			}, 450);
			return () => clearTimeout(timer);
		}

	}, [currentDigit, prevDigit]);

	return (
		<div className={cn(
			`relative flex flex-col h-12 md:h-36 bg-slate-200 rounded-lg border-2 shadow-lg font-semibold`,
			currentDigit === 'AM' || currentDigit === 'PM'
				? 'w-16 md:w-48' : 'w-10  md:w-24',
			index == 1 || index == 2 || index == 4 || index == 6
				? 'ml-0' : 'ml-1 md:ml-2',

		)}>
			{/* Top Card */}
			<div className=" relative overflow-hidden w-full h-1/2 bg-slate-300 rounded-t-md text-3xl shadow-md md:text-8xl">
				<p className="absolute top-4  left-2 tabular-nums">
					{currentDigit}
				</p>
			</div>

			{/* Bottom Card */}
			<div className=" relative overflow-hidden w-full h-1/2 bg-slate-200 rounded-b-md shadow-md -mt-1 text-3xl md:text-8xl">
				<p className="absolute -top-12 left-2  tabular-nums">
					{isFlipped ? currentDigit : prevDigit}
				</p>
			</div>

			{/* Animation Layer */}
			{isFlipped ? null : (

				<>
					<div
						ref={flipDownRef}
						className=' absolute w-full h-full top-0 left-0'>
						<div
							className={`b animate-flip-down bg-slate-300 w-full h-1/2 text-3xl  md:text-8xl overflow-hidden transform origin-bottom`}>
							<p className=" absolute top-4 left-2 tabular-nums">
								{prevDigit}
							</p>
						</div>
					</div>


					<div className={` absolute w-full h-1/2 top-16 left-0 overflow-hidden animate-flip-up transform origin-top delay-200 opacity-0`}>
						<div 
						
						className={`  bg-slate-200  w-full h-1/2 text-3xl  md:text-8xl overflow-hidden `}>
							<p className="absolute -top-12 left-2 tabular-nums">
								{currentDigit}
							</p>
						</div>
					</div>
				</>
			)
			}
		</div>


	)

}

export default FlipCard
