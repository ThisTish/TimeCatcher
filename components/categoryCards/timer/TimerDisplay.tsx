"use client"

import { timeFormat } from "@/lib/time-format"
import { Timer } from "lucide-react"
import { useEffect, useState } from "react"

const TimerDisplay = ({ startTime }: { startTime: Date }) => {
	const [time, setTime] = useState(0)

	// todo useOptimistic

	useEffect(() => {
		let timerInterval: NodeJS.Timeout | null = null;
		const setTimer = async () => {
			timerInterval = setInterval(() => {
				const currentTime = new Date().getTime()
				const timePassed = currentTime - startTime.getTime()
				setTime(timePassed)
			}, 1000)
		}
		setTimer()

		return () => {
			if (timerInterval) {
				clearInterval(timerInterval)
			}
		}

	}, [startTime])

	const { hours, minutes, seconds } = timeFormat(time / 1000)

	return (
			<>
				<Timer  size={18}/>
			<time dateTime={`${hours}h ${minutes}m ${seconds}s`}>{hours.toString().padStart(2,'0')} : {minutes.toString().padStart(2,'0')} : {seconds.toString().padStart(2, '0')}</time>
			</>
	)
}

export default TimerDisplay