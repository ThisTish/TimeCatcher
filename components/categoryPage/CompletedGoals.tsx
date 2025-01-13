import { GoalDisplayProps } from "@/lib/types"
import FormContainer from "../forms/FormContainer"
import GoalForm from "../forms/goalForm/GoalForm"
import { Card, CardContent, CardHeader } from "../ui/card"
import CompletedGoalsSections from "./CompletedGoalsSections"

const CompletedGoals = ({ goals, categoryId }: { goals: GoalDisplayProps[], categoryId: string }) => {

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


	// if no completed goals
	const completedGoals = goals.filter((goal) => goal.completed === true)
	const completedDayGoals = completedGoals.filter((goal) => goal.timeFrame === "DAY")
	const completedWeekGoals = completedGoals.filter((goal) => goal.timeFrame === "WEEK")
	const completedMonthGoals = completedGoals.filter((goal) => goal.timeFrame === "MONTH")
	const completedYearGoals = completedGoals.filter((goal) => goal.timeFrame === "YEAR")



	if (!completedGoals || completedGoals.length === 0) return (
		<div>
			<p className="text-xl font-bold">You haven't completed any goals yet</p>
			<p className="grid">
				<span className="text-sm">Keep working on catching your time.</span>
			</p>
		</div>
	)

	// display completed goals
	return (
		<section>
			<Card className="bg-gray-300">
				<CardHeader>
					<h2>Caught Goals</h2>
				</CardHeader>
				<CardContent>
					{completedDayGoals.length > 0
						? (
							<CompletedGoalsSections goals={completedDayGoals} title="DAY" />
						) : null}
					{completedWeekGoals.length > 0
						? (
							<CompletedGoalsSections goals={completedWeekGoals} title="WEEK" />
						) : null}
					{completedMonthGoals.length > 0
						? (
							<CompletedGoalsSections goals={completedMonthGoals} title="MONTH" />
						) : null}
					{completedYearGoals.length > 0
						? (
							<CompletedGoalsSections goals={completedYearGoals} title="YEAR" />
						) : null}


				</CardContent>
			</Card>

		</section>
	)
}

export default CompletedGoals