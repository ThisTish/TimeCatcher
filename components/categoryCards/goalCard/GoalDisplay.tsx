import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { timeFormat } from "@/lib/time-format"
import { TimeFrame } from "@prisma/client"
import { Edit } from "lucide-react"

type GoalDisplayProps = {
	timeFrame: TimeFrame
	timePassed: number
	targetTime: number
}


const GoalDisplay = ({timeFrame, timePassed, targetTime}: GoalDisplayProps) => {
	// console.log(timeFrame, timePassed, targetTime)

	const timeFormatString = ({ time, h, m, includeSeconds, s }: { time: number, h: string, m: string, includeSeconds: boolean, s?: string }) => {
		console.log(timeFormat(time / 1000))
		if (time === 0) {
			if (includeSeconds) return `0${h} 0${m} 0${s}`
			return `0${h} 0${m}`
		}
		const { hours, minutes, seconds } = timeFormat(time / 1000)

		if (hours === 0 && minutes === 0) {
			if (includeSeconds) return `${minutes}${m} ${seconds}${s}`
			return `0${h} 0${m}`
		}

		if(hours === 0){
			if(includeSeconds) return `${minutes}${m} ${seconds}${s}`
			return `${minutes}${m} `
		} 

		if (minutes === 0){
			if(includeSeconds) return `${hours}${h} ${minutes}${m} ${seconds}${s}`
			return `${hours}${h}`
		}

		if (includeSeconds) return `${hours}${h} ${minutes}${m} ${seconds}${s}`
		
		return `${hours}${h} ${minutes}${m}`
	}


	const timeToGo = targetTime - timePassed

	return (
		<figure className="w-full -ml-1 relative">
			<header>
				<h4 className="text-sm -ml-3 font-semibold">{timeFrame}</h4>
			</header>
			<div className="flex items-center justify-center text-xs gap-1">
				<span className="text-nowrap">{timeFormatString({ time: timePassed, h: 'h', m: 'm', includeSeconds: false })}</span>
				
				<Progress 
				className="border border-black"
				value={55} 
				
				/>
				
				<span className="text-nowrap">{timeFormatString({ time: targetTime, h: 'h', m: 'm', includeSeconds: false, })}</span>
				<Edit className="absolute size-4 -right-5"/>
			</div>
			<footer>
				<p className="text-center text-xs tracking-tighter leading-none">{timeFormatString({ time: timeToGo, h: ` hours`, m: ` minutes`, includeSeconds: false })} to go!</p>
				{/* <p className="text-center text-sm bg-white">to go`</p> */}
			</footer>
		</figure>
	)
}

export default GoalDisplay