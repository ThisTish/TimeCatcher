import { Category } from "@/lib/types";

const CompletedGoals = ({ category }: { category: Category }) => {

	const completedGoals = category.goals.filter((goal) => {
		goal.completed === true
	})

	return (
		<section>
			{completedGoals.map((goal, i) => (
				<div
				key={goal.id}
				
				>
							<p className="text-xl font-bold">{goal.timeFrame}</p>

							<p className="grid">
										<span className="text-sm">{goal.startDate.toDateString()} - {goal.endDate.toDateString()}</span>
										<span className="font-semibold tracking-widest">Completed!</span>
									</p>
				</div>
			))}




			{/* {categories.map((category) => (
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
			))} */}
		</section>
	);
}

export default CompletedGoals;