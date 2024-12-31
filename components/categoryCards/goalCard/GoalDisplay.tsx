import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { timeFormatString } from "@/lib/time-format"
import { TimeFrame } from "@prisma/client"
import { Edit } from "lucide-react"

type GoalDisplayProps = {
	timeFrame: TimeFrame
	timePassed: number
	targetTime: number
}


const GoalDisplay = ({timeFrame, timePassed, targetTime}: GoalDisplayProps) => {

	const timeToGo = targetTime - timePassed
	let progress = (timePassed / targetTime) * 100
	if(progress > 100) progress = 100

	return (
		<figure className="w-full -ml-1 relative">
			<header>
				<h4 className="text-sm -ml-3 font-semibold">{timeFrame}</h4>
			</header>
			<div className="flex items-center justify-center text-xs gap-1">
				<span className="text-nowrap">{timeFormatString({ time: timePassed, h: 'h', m: 'm', includeSeconds: false })}</span>
				
				<Progress 
				className="border border-black"
				value={progress} 
				
				/>
				
				<span className="text-nowrap">{timeFormatString({ time: targetTime, h: 'h', m: 'm', includeSeconds: false, })}</span>
				<Edit className="absolute size-4 -right-5"/>
			</div>
			<footer>
				<p className="text-center text-xs tracking-tighter leading-none">
					{progress === 100 ? `Goal completed!` : 
					`${timeFormatString({ time: timeToGo, h: ` hours`, m: ` minutes`, includeSeconds: false })} to go!`
				}
					
					</p>
					
			</footer>
		</figure>
	)
}

export default GoalDisplay