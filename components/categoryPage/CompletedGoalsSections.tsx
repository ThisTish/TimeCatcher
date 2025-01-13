import { timeFormatString } from "@/lib/time-format"
import { GoalDisplayProps } from "@/lib/types"

const CompletedGoalsSections = ({ goals, title }: { goals: GoalDisplayProps[], title: string }) => {
	return (
		<div>
			<h3>{title}</h3>
			<ul >
				{goals.map((goal) => (
					<li
						className="px-5 grid"
						key={goal.id}>
						<span>
							{title === "DAY" ?
								`${goal.startDate?.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: '2-digit' })}`
								:
								title === "WEEK" ?
									`${goal.startDate?.toLocaleDateString('en-US', { month: 'short', day: '2-digit' })} - ${goal.endDate?.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}`

									:
									title === "MONTH" ?
										`${goal.startDate?.toLocaleDateString('en-US', { month: 'long' })} ${goal.startDate?.getFullYear()}`
										:
										title === "YEAR" ?
											goal.startDate?.getFullYear()
											: null

							}
						</span>
						<span className="px-5">{timeFormatString(goal.targetTime, 'h', 'm', false)}</span>
					</li>
				))}
			</ul>
		</div>
	)
}

export default CompletedGoalsSections