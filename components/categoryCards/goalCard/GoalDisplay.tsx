import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Edit } from "lucide-react"

const GoalDisplay = () => {
	return (
		<figure className="w-full -ml-1 relative">
			<header>
				<h4 className="text-sm -ml-3 font-semibold">timeFrame</h4>
			</header>
			<div className="flex items-center justify-center text-xs gap-1">
				<span>1hr</span>
				
				<Progress 
				className="border border-black"
				value={55} 
				
				/>
				
				<span >20hr</span>
				<Edit className="absolute size-4 -right-5"/>
			</div>
			<footer>
				<p className="text-center text-xs tracking-tighter leading-none"><strong>19</strong> hours to go</p>
				{/* <p className="text-center text-sm bg-white">to go`</p> */}
			</footer>
		</figure>
	)
}

export default GoalDisplay