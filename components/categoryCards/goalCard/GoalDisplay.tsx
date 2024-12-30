import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const GoalDisplay = () => {
	return (
		<figure className="w-full">
			<header>
				<h4 className="text-sm font-semibold">timeFrame</h4>
			</header>
			<div className="flex items-center justify-center text-xs gap-1">
				<span>1hr</span>
				
				<Progress 
				className="border border-black"
				value={55} 
				
				/>
				
				<span >20hr</span>
			</div>
			<footer>
				<p className="text-center text-sm tracking-tighter leading-none">19 hours to go</p>
				{/* <p className="text-center text-sm bg-white">to go`</p> */}
			</footer>
		</figure>
	)
}

export default GoalDisplay