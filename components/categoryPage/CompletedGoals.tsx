import { GoalDisplayProps, TimeLog } from "@/lib/types"
import FormContainer from "../forms/FormContainer"
import GoalForm from "../forms/goalForm/GoalForm"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card"
import CompletedGoalsSections from "./CompletedGoalsSections"
import CompletedGoalsModal from "./CompletedGoalsModal"
import { shadowColor } from "../providers/ThemeProvider"
import { Color } from "@prisma/client"


const CompletedGoals = ({ goals, categoryId, timeLogs, color }: { goals: GoalDisplayProps[], categoryId: string, timeLogs: TimeLog[], color: Color }) => {
	// if no goal created yet
	if (!goals || goals.length === 0) return (
		<div>
			<p className="text-xl font-bold">No goals yet</p>
			<p className="grid">
				<span>Start by adding a goal for
					<FormContainer
						title='Make a goal for DAYS'
						description='Choose a time frame and target time for a new goal'
						openButtonLabel='For days here'>
						<GoalForm
							categoryId={categoryId}
							timeFrame={"DAY"}
							targetTime={0}
						/>
					</FormContainer>
				</span>
				<span className="text-sm">Return to <a href="/timers">Timers Page to add a goal on the category card</a></span>
			</p>
		</div>
	)


	const completedGoals = goals.filter((goal) => goal.completed === true)
	const completedDayGoals = completedGoals.filter((goal) => goal.timeFrame === "DAY")
	const completedWeekGoals = completedGoals.filter((goal) => goal.timeFrame === "WEEK")
	const completedMonthGoals = completedGoals.filter((goal) => goal.timeFrame === "MONTH")
	const completedYearGoals = completedGoals.filter((goal) => goal.timeFrame === "YEAR")


	// if no completed goals
	if (!completedGoals || completedGoals.length === 0) return (
		<Card className={`p-5 h-fit shadow-md ${shadowColor[color]}`} >
			<CardHeader>
				<CardTitle>
					<h2>Caught Goals</h2>
				</CardTitle>
			</CardHeader>
			<CardContent>
				<p className="text-xl py-10">You haven't completed any goals yet</p>
			</CardContent>
			<CardFooter>
				<span className="text-sm">Keep working on catching your time.</span>
			</CardFooter>
		</Card>
	)

	// display completed goals
	return (
		<Card className={`p-5 h-fit ${shadowColor[color]}`}>
			<CardHeader>
				<CardTitle>
					<h2>Caught Goals</h2>
				</CardTitle>
			</CardHeader>
			<CardContent className="grid sm:flex sm:items-start">
				{/* Days */}
				{completedDayGoals.length > 0 ? (
					completedDayGoals.length > 5 ? (
						<div className="grid gap-2">
							<CompletedGoalsSections goals={completedDayGoals.slice(0, 5)} title="DAY" timeLogs={timeLogs} color={color} />
							<CompletedGoalsModal goals={completedDayGoals} title="DAY" timeLogs={timeLogs} color={color} />
						</div>
					) : (
						<CompletedGoalsSections goals={completedDayGoals} title="DAY" timeLogs={timeLogs} color={color} />
					)
				) : null}

				{/* Weeks */}
				{completedWeekGoals.length > 0 ? (
					completedWeekGoals.length > 5 ? (
						<div className="grid">
							<CompletedGoalsSections goals={completedWeekGoals.slice(0, 5)} title="WEEK" timeLogs={timeLogs} color={color} />
							<CompletedGoalsModal goals={completedWeekGoals} title="WEEK" timeLogs={timeLogs} color={color} />
						</div>
					) : (
						<CompletedGoalsSections goals={completedWeekGoals} title="WEEK" timeLogs={timeLogs} color={color} />
					)
				) : null}

				{/* Months */}
				{completedMonthGoals.length > 0 ? (
					completedMonthGoals.length > 5 ? (
						<div className="grid">
							<CompletedGoalsSections goals={completedMonthGoals.slice(0, 5)} title="MONTH" timeLogs={timeLogs} color={color} />
							<CompletedGoalsModal goals={completedMonthGoals} title="MONTH" timeLogs={timeLogs} color={color} />
						</div>
					) : (
						<CompletedGoalsSections goals={completedMonthGoals} title="MONTH" timeLogs={timeLogs} color={color} />
					)
				) : null}

				{/* Years */}
				{completedYearGoals.length > 0
					? (
						<CompletedGoalsSections goals={completedYearGoals} title="YEAR" timeLogs={timeLogs} color={color} />
					) : null}


			</CardContent>
		</Card>
	)
}

export default CompletedGoals