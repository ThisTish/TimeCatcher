
import { timeFormat } from "@/lib/time-format"
import getTotalTime from "@/server/actions/timer/getTotalTime"

type CalculatedTimeDisplayProps = {
	categoryId: string
	timeFrame?: "allTime" | "day" | "week" | "month" | "season" | "year"
}


const CalculatedTimeDisplay = async ({categoryId, timeFrame}: CalculatedTimeDisplayProps) => {

	const totalTime = await getTotalTime(categoryId)

	if(!totalTime) return 0

	const { hours, minutes, seconds } = timeFormat(totalTime/1000 || 0)

	return (
		<div className="text-center text-xs font-light">
			<p>Total Time</p>
			<time>{hours} h {minutes} m {seconds} s</time>
		</div>
	)
}

export default CalculatedTimeDisplay