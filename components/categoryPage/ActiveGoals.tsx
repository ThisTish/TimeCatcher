import { GoalDisplayProps, TimeLog } from "@/lib/types"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card"
import GoalDisplay from "../categoryCards/goalCard/GoalDisplay"
import { shadowColor } from "../providers/ThemeProvider"
import { Color } from "@prisma/client"
import getTotals from "@/lib/totals-by-timeFrame"
import GoalCards from "../categoryCards/goalCard/GoalCards"

const ActiveGoals = ({ goals, color, categoryId, timeLogs }: { goals: GoalDisplayProps[], color: Color, categoryId: string, timeLogs: TimeLog[] }) => {


	const activeGoals = goals.filter((goal) => goal.active)

	return (
		<Card className={`p-5 h-fit shadow-lg ${shadowColor[color]}`}>
			<CardHeader>
				<CardTitle>
					<h2>Active Goals</h2>
				</CardTitle>
			</CardHeader>
			
					<CardContent>

						<GoalCards 
						goals={activeGoals} 
						color={color} 
						categoryId={categoryId} 
						showBackground={false}
						showTitle={false}
						timeLogs={timeLogs}
						/>
					</CardContent>

			
			
			


		</Card>
	)
}

export default ActiveGoals