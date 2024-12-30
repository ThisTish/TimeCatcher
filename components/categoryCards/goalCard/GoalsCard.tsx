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
		<Card className={`${backgrounds[color]} rounded-md w-64 height-52 flex flex-col justify-around relative`}>

			<CardHeader>
				<h3 className="text-xl font-semibold">Goals</h3>

			</CardHeader>

			{/* running timer display */}
			<CardContent className="flex flex-col gap-3 items-center justify-center h-10 tabular-nums">
				{/* {goals?.map((goal) => ( */}
					<GoalDisplay
					/>
{/* ))} */}


			</CardContent>


			{/* edit category button*/}
			<CardFooter className="flex justify-center gap-5">

			</CardFooter>
		</Card>
	)
}

export default GoalCards