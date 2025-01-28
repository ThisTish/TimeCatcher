"use client"

import { useEffect, useState, useRef } from "react"
import FlipCard from "./FlipCard"

const Clock = () => {
	const [mounted, setMounted] = useState(false)
	const [time, setTime] = useState(() => new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }))
	const prevTimeRef = useRef('')
	const [date, setDate] = useState(() => new Date().toLocaleDateString("en-us", { month: "long", day: "2-digit", year: "numeric" }))

	useEffect(() => {
		setMounted(true)
		const updateClock = () => {
			const now = new Date()
			const formattedDate = now.toLocaleDateString("en-us", { month: "long", day: "2-digit", year: "numeric" })
			setDate(formattedDate)
			const formattedTime = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
			prevTimeRef.current = time
			setTime(formattedTime)
		
		}
		const intervalId = setInterval(updateClock, 1000)
		updateClock()

		return () => clearInterval(intervalId)
	}, [time])

	const timeDigits = time.slice(0, 2) + time.slice(3, 5) + time.slice(6, 8)
	const timeDigitsArray = timeDigits.split('')
	const prevTimeDigits = prevTimeRef.current.slice(0, 2) + prevTimeRef.current.slice(3, 5) + prevTimeRef.current.slice(6, 8)
	const prevTimeDigitsArray = prevTimeDigits.split('')
	const dayPeriod = time.slice(9, 11)
	const prevDayPeriod = prevTimeRef.current.slice(9, 11)
	const fullTimeArray = [ ...timeDigitsArray, dayPeriod ]
	const fullPrevTimeArray = [ ...prevTimeDigitsArray, prevDayPeriod]

	// if(!mounted) return (

	// )


	return (
		<div className="relative">
			<p className="text-2xl md:text-5xl self-start ">{date}</p>
			<div className="flex">
				{fullTimeArray.map((digit, index, n) => (
					<FlipCard
						key={index}
						index={n.length - index}
						currentDigit={(digit)}
						prevDigit={fullPrevTimeArray[index]}
					/>
				))
				}
			</div>
			<div className="grid gap-3 absolute top-10 left-20 sm:top-14 sm:left-[7.8rem] sm:gap-5 md:top-20 md:left-48 md:gap-10 ">
				<div className="size-2 sm:size-3 md:size-4 animate-clock-pulse rounded-full bg-black"></div>
				<div className="size-2 sm:size-3 md:size-4 animate-clock-pulse rounded-full bg-black"></div>
			</div>
			<div className="grid gap-3 absolute top-10 left-[10.5rem] sm:top-14 sm:left-[16.4rem] sm:gap-5 md:top-20 md:left-[25rem] md:gap-10 ">
				<div className="size-2 sm:size-3 md:size-4 animate-clock-pulse rounded-full bg-black"></div>
				<div className="size-2 sm:size-3 md:size-4 animate-clock-pulse rounded-full bg-black"></div>
			</div>
			
		</div>		
	)
}

export default Clock

	// <p className="font-extrabold tracking-widest md:tracking-wider text-4xl md:text-7xl tabular-nums text-nowrap">{time}</p>
	// 		<div className="absolute top-6 md:top-8 -left-2 flex">

	// 			<NumberBorder />
	// 			<NumberBorder />
	// 		</div>
	// 		<div className="absolute top-6 md:top-8 left-16 md:left-32 flex">
	// 			<NumberBorder />
	// 			<NumberBorder />
	// 		</div>

	// 		<div className="absolute top-6 md:top-8 left-[134px]  md:left-64 flex"  >
	// 			<NumberBorder />
	// 			<NumberBorder />

	// 		</div>
	// 		<div className="w-20 h-12 md:w-36 md:h-20 border-2 border-stone-800 absolute top-6 md:top-8 left-52 md:left-96 rounded-sm"></div> 