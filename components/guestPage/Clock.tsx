"use client"

import { useEffect, useState } from "react"
import NumberBorder from "./NumberBorder"

const Clock = () => {
	const [time, setTime] = useState('')
	const [date, setDate] = useState('')

	useEffect(() => {
		const updateClock = () => {
			const now = new Date()
			const formattedDate = now.toLocaleDateString("en-us", { month: "long", day: "2-digit", year: "numeric" })
			setDate(formattedDate)
			const formattedTime = now.toLocaleTimeString().padStart(11, '0')
			setTime(formattedTime)
		}

		const intervalId = setInterval(updateClock, 1000)
		updateClock()

		return () => clearInterval(intervalId)
	}, [])



	return ( 
		<div className=" relative m-10 w-fit">
		<p className="text-xl md:text-2xl">{date}</p>
		<p className="font-extrabold tracking-widest md:tracking-wider text-4xl md:text-7xl tabular-nums text-nowrap">{time}</p>
		<div className="absolute top-6 md:top-8 -left-2 flex">
			<NumberBorder />
			<NumberBorder />
		</div>
		<div className="absolute top-6 md:top-8 left-16 md:left-32 flex">
			<NumberBorder />
			<NumberBorder />
		</div>

		<div className="absolute top-6 md:top-8 left-[134px]  md:left-64 flex"  >
			<NumberBorder />
			<NumberBorder />

		</div>
		<div className="w-20 h-12 md:w-36 md:h-20 border-2 border-stone-800 absolute top-6 md:top-8 left-52 md:left-96 rounded-sm"></div>
	</div>
	 );
}
 
export default Clock;