import { backgrounds } from "@/components/providers/ThemeProvider"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { E_Colors } from "@/lib/types"
import { TimeFrame } from "@prisma/client"
import GoalDisplay from "./GoalDisplay"

type GoalCardProps = {
	categoryId: string
	color: E_Colors
	timePassed: number
	goals?: {
		id: string
		timeFrame: TimeFrame
		active: boolean
		reoccurring: boolean
		targetTime: number
		completed: boolean
	}[]
}



const GoalCards = ({ goals, color, timePassed }: GoalCardProps) => {



	return (
		<Card className={`${backgrounds[color]} rounded-md size-64 flex flex-col justify-around relative`}>
			<CardHeader className="pt-2 pb-1 mb-1 text-lg font-bold text-center border border-b-2">
			<h3>GOALS</h3>
			</CardHeader>
			{/* running timer display */}
			<CardContent className="grid gap-1 tabular-nums">
				{/* {goals?.map((goal) => ( */}
					<GoalDisplay
					/>
					<GoalDisplay
					/>
					<GoalDisplay
					/>
					<GoalDisplay
					/>
{/* ))} */}


			</CardContent>
		</Card>
	)
}

export default GoalCards