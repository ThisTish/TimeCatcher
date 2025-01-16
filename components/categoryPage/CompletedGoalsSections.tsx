import { timeFormatString } from "@/lib/time-format"
import getTotals from "@/lib/totals-by-timeFrame"
import { GoalDisplayProps, TimeLog } from "@/lib/types"
import { backgrounds } from "../providers/ThemeProvider"
import { Color } from "@prisma/client"

const CompletedGoalsSections = ({ goals, title, showTitle = true, timeLogs, color }: { goals: GoalDisplayProps[], title: string, showTitle?: boolean, timeLogs: TimeLog[], color: Color }) => {

	return (
		<ul className="grid gap-3">
			{showTitle
				?
				<h3><b>{title}</b></h3>
				: null
			}
			<ul className="mb-1 ">
				{goals.map((goal) => (
					<li
						className={`px-5 grid`}
						key={goal.id}>
						<p className={`${backgrounds[color]} rounded-md px-2 py-1 w-fit`}>
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
						</p>
						<span className="px-5">{timeFormatString(goal.targetTime, ' hr', ' min', false)} goal</span>
						<span className="px-5">{timeFormatString(getTotals(goal.timeFrame, timeLogs, goal.startDate), ' hr', ' min', false)} total</span>
					</li>
				))}
			</ul>
		</ul>
	)
}

export default CompletedGoalsSections