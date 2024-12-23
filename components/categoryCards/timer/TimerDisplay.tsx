"use client"

import { timeFormat } from "@/lib/time-format"
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
		<div className="text-center">
			<time>{hours} h {minutes} m {seconds} s</time>
		</div>
	)
}

export default TimerDisplay