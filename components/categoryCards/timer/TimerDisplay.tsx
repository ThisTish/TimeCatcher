"use client"

import { timeFormat } from "@/lib/time-format"
import { getActiveCategory } from "@/server/actions/category/get-categories"
import { useEffect, useState } from "react"

const TimerDisplay = ({startTime}: {startTime: number}) => {

	const [time, setTime] = useState(0)

	
	// todo useOptimistic


	useEffect(() => {

		let timerInterval: NodeJS.Timeout | null = null;

		const setTimer = async () => {
			const activeTimer = await getActiveCategory()
			if (!activeTimer) return
			if ('timeLogs' in activeTimer && activeTimer.timeLogs[0]) {
				const startTime = activeTimer.timeLogs[0].startTime.getTime()

				timerInterval = setInterval(() =>{
					const currentTime = new Date().getTime()
					const timePassed = currentTime - startTime
					setTime(timePassed)
				}, 1000)
			}
			return () => {
				if (timerInterval) {
					clearInterval(timerInterval)
				}
			}
		}
		setTimer()
	}, [])

	const { hours, minutes, seconds } = timeFormat(time /1000) 

	return (
		<div className="text-center">
			<time>{hours} h {minutes} m {seconds} s</time>
		</div>
	)
}

export default TimerDisplay