import { GoalDisplayProps, TimeLog } from "@/lib/types"
import FormContainer from "../forms/FormContainer"
import GoalForm from "../forms/goalForm/GoalForm"
import { Card, CardContent, CardHeader } from "../ui/card"
import CompletedGoalsSections from "./CompletedGoalsSections"
import CompletedGoalsModal from "./CompletedGoalsModal"


const CompletedGoals = ({ goals, categoryId, timeLogs }: { goals: GoalDisplayProps[], categoryId: string, timeLogs: TimeLog[] }) => {
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
		<div>
			<p className="text-xl font-bold">You haven't completed any goals yet</p>
			<p className="grid">
				<span className="text-sm">Keep working on catching your time.</span>
			</p>
		</div>
	)

	// display completed goals
	return (
		<Card className="bg-gray-300">
			<CardHeader>
				<h2>Caught Goals</h2>
			</CardHeader>
			<CardContent className="grid sm:flex">
				{/* Days */}
				{completedDayGoals.length > 0 ? (
					completedDayGoals.length > 5 ? (
						<div className="grid">
							<CompletedGoalsSections goals={completedDayGoals.slice(0, 5)} title="DAY" timeLogs={timeLogs} />
							<CompletedGoalsModal goals={completedDayGoals} title="DAY" timeLogs={timeLogs} />
						</div>
					) : (
						<CompletedGoalsSections goals={completedDayGoals} title="DAY" timeLogs={timeLogs} />
					)
				) : null}

				{/* Weeks */}
				{completedWeekGoals.length > 0 ? (
					completedWeekGoals.length > 5 ? (
						<div className="grid">
							<CompletedGoalsSections goals={completedWeekGoals.slice(0, 5)} title="WEEK" timeLogs={timeLogs} />
							<CompletedGoalsModal goals={completedWeekGoals} title="WEEK" timeLogs={timeLogs} />
						</div>
					) : (
						<CompletedGoalsSections goals={completedWeekGoals} title="WEEK" timeLogs={timeLogs} />
					)
				) : null}

				{/* Months */}
				{completedMonthGoals.length > 0 ? (
					completedMonthGoals.length > 5 ? (
						<div className="grid">
							<CompletedGoalsSections goals={completedMonthGoals.slice(0, 5)} title="MONTH" timeLogs={timeLogs} />
							<CompletedGoalsModal goals={completedMonthGoals} title="MONTH" timeLogs={timeLogs} />
						</div>
					) : (
						<CompletedGoalsSections goals={completedMonthGoals} title="MONTH" timeLogs={timeLogs} />
					)
				) : null}

				{/* Years */}
				{completedYearGoals.length > 0
					? (
						<CompletedGoalsSections goals={completedYearGoals} title="YEAR" timeLogs={timeLogs} />
					) : null}


			</CardContent>
		</Card>
	)
}

export default CompletedGoals