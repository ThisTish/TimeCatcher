"use client"

import { useEffect, useState, useRef } from "react"
import FlipCard from "./FlipCard"

const Clock = () => {
	const [time, setTime] = useState(() => new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }))
	const prevTimeRef = useRef('')
	const [date, setDate] = useState(() => new Date().toLocaleDateString("en-us", { month: "long", day: "2-digit", year: "numeric" }))

	useEffect(() => {
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
	const fullTimeArray = [...timeDigitsArray, dayPeriod]
	const fullPrevTimeArray = [...prevTimeDigitsArray, prevDayPeriod]


	return (

		<div className="relative py-8 space-y-1 md:self-start md:ml-8">
			<p className="text-2xl md:text-3xl lg:text-5xl self-start">{date}</p>
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
			<div className="grid gap-3 absolute top-10 left-20 py-8 sm:top-14 sm:left-[7.8rem] sm:gap-5 lg:top-20 lg:left-48 lg:gap-10 ">
				<div className="size-2 sm:size-3 lg:size-4 animate-clock-pulse rounded-full bg-black"></div>
				<div className="size-2 sm:size-3 lg:size-4 animate-clock-pulse rounded-full bg-black"></div>
			</div>
			<div className="grid gap-3 absolute top-10 left-[10.5rem] py-8 sm:top-14 sm:left-[16.4rem] sm:gap-5 lg:top-20 lg:left-[25rem] lg:gap-10 ">
				<div className="size-2 sm:size-3 lg:size-4 animate-clock-pulse rounded-full bg-black"></div>
				<div className="size-2 sm:size-3 lg:size-4 animate-clock-pulse rounded-full bg-black"></div>
			</div>

		</div>
	)
}

export default Clock