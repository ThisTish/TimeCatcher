import { GoalDisplayProps } from "@/lib/types";
import FormContainer from "../forms/FormContainer";
import GoalForm from "../forms/goalForm/GoalForm";

const CompletedGoals = ({ goals, categoryId }: { goals: GoalDisplayProps[], categoryId: string }) => {

	console.dir(goals)
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

	if (!completedGoals || completedGoals.length === 0) return (
		<div>
			<p className="text-xl font-bold">You haven't completed any goals yet</p>
			<p className="grid">
				<span className="text-sm">Keep working on catching your time.</span>
			</p>
		</div>
	)

	return (
		<section>
			{completedGoals.map((goal) => (
				<div
					key={goal.id}
				>
					<p className="text-xl font-bold">{goal.timeFrame}</p>
					<p className="grid">
						<span className="text-sm">{goal.startDate?.toDateString()} - {goal.endDate?.toDateString()}</span>
						<span className="font-semibold tracking-widest">Completed!</span>
					</p>
				</div>
			))}
		</section>
	);
}

export default CompletedGoals;