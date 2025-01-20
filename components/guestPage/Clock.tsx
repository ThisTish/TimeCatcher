"use client"

import { useEffect, useState } from "react"
import NumberBorder from "./NumberBorder"
import FlipCard from "./FlipCard"

const Clock = () => {
	const [time, setTime] = useState('')
	const [prevTime, setPrevTime] = useState('')
	const [date, setDate] = useState('')

	useEffect(() => {
		const updateClock = () => {
			const now = new Date()
			const formattedDate = now.toLocaleDateString("en-us", { month: "long", day: "2-digit", year: "numeric" })
			setDate(formattedDate)
			const formattedTime = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
			setPrevTime(time)
			setTime(formattedTime)
			
		}

		const intervalId = setInterval(updateClock, 1000)
		updateClock()

		return () => clearInterval(intervalId)
	}, [])

	const timeDigits = time.slice(0, 2) + time.slice(3, 5) + time.slice(6, 8)
	const timeDigitsArray = timeDigits.split('')
	const prevTimeDigits = prevTime.slice(0, 2) + prevTime.slice(3, 5) + prevTime.slice(6, 8)
	const prevTimeDigitsArray = prevTimeDigits.split('')
	const dayPeriod = time.slice(9, 11)
	const prevDayPeriod = prevTime.slice(9, 11)
	const fullTimeArray = [ ...timeDigitsArray, dayPeriod ]
	const fullPrevTimeArray = [ ...prevTimeDigitsArray, prevDayPeriod]


	return (

		<div>
			<p className="text-2xl md:text-5xl self-start">{date}</p>
			<div className="flex">
				{fullTimeArray.map((digit, index, n) => (
					<FlipCard
						key={index}
						index={n.length - index}
						currentDigit={(digit)}
						prevDigit={(fullPrevTimeArray[index] || digit)}
					/>
				))
				}
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