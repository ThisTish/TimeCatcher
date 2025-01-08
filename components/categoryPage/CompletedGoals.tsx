import { Category } from "@/lib/types";

const CompletedGoals = ({ categories }: { categories: Category[] }) => {
	return (
		<>
			{categories.map((category) => (
				<div key={category.id}>
					{category.goals && category.goals.length > 0 && category.goals.map((goal) => (
						<div key={goal.id}>
							<p className="text-xl font-bold">{goal.timeFrame}</p>

							{goal.completed
								? (
									<p className="grid">
										<span className="text-sm">{goal.startDate.toDateString()} - {goal.endDate.toDateString()}</span>
										<span className="font-semibold tracking-widest">Completed!</span>
									</p>
								) : <p>Not completed</p>}
						</div>
					))}
				</div>
			))}
		</>
	);
}

export default CompletedGoals;