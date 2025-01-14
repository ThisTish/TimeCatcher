import { timeFormatString } from "@/lib/time-format"
import getTotals from "@/lib/totals-by-timeFrame"
import { GoalDisplayProps, TimeLog } from "@/lib/types"

const CompletedGoalsSections = ({ goals, title, showTitle = true, timeLogs }: { goals: GoalDisplayProps[], title: string, showTitle?: boolean, timeLogs: TimeLog[] }) => {

	return (
		<div>
			{showTitle
				?
				<h3>{title}</h3>
				: null
			}
			<ul>
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
						<span className="px-5">{timeFormatString(goal.targetTime, ' hr', ' min', false)} goal</span>
						<span className="px-5">{timeFormatString(getTotals(goal.timeFrame, timeLogs, goal.startDate), ' hr', ' min', false)} total</span>
					</li>
				))}
			</ul>
		</div>
	)
}

export default CompletedGoalsSections