import { GoalDisplayProps } from "@/lib/types"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card"
import GoalDisplay from "../categoryCards/goalCard/GoalDisplay"
import { shadowColor } from "../providers/ThemeProvider"
import { Color } from "@prisma/client"

const ActiveGoals = ({ goals, color }: { goals: GoalDisplayProps[], color: Color }) => {

	const activeGoals = goals.filter((goal) => goal.active)

	return (
		<Card className={`p-5 h-fit shadow-md ${shadowColor[color]}`}>
			<CardHeader>
				<CardTitle>
					<h2>Active Goals</h2>
				</CardTitle>
			</CardHeader>
			{activeGoals.length === 0 || !activeGoals
				? (<>
						<CardContent>
						<p className="text-xl py-10">No active goals</p>
							</CardContent>
							<CardFooter>
						<p className="text-sm">Start by adding a goal on the timers page.</p>
							</CardFooter>
							</>
				) : (
					<ul>
						{activeGoals.map((goal) => (
							<li key={goal.id}>
								<GoalDisplay
									key={goal.id}
									{...goal}
								/>
							</li>
						))}
					</ul>
				)
			}


		</Card>
	)
}

export default ActiveGoals