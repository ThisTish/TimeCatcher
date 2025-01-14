import { TimeLog } from "@/lib/types"
import { Card, CardContent, CardHeader } from "../ui/card"
import { ActivityCalendar } from 'react-activity-calendar'
import { Color } from "@prisma/client"
import { timeFormatString } from "@/lib/time-format"
import { cloneElement } from "react"
import { Tooltip } from 'react-tooltip'

const ActivityChart = ({ timeLogs, color }: { timeLogs: TimeLog[], color: Color }) => {

	const milliseconds = 8 * 60 * 60 * 1000
	const timeSegment = milliseconds / 3

	const level = (time: number) => {
		if (time > milliseconds) return 3
		if (time === 0) return 0
		if (time < timeSegment) return 1
		return Math.min(Math.floor(time / timeSegment), 3)
	}

	const data = timeLogs.map((log) => ({
		date: log?.startTime?.toISOString().split('T')[0] ?? '',
		count: log?.timePassed ?? 0,
		level: level(log?.timePassed ?? 0)
	}))

	//todo if statement if timelog for 2025-01-01 exists, then don't add it && same with 2025-12-31
	const paddedData = [
		{
			date: '2025-01-01',
			count: 0,
			level: 0
		},
		...data,
		{
			date: '2025-12-31',
			count: 0,
			level: 0
		}
	]


	return (
		<Card className="bg-gray-400 min-w-96 max-w-fit overflow-y-auto" >
			<CardHeader>
				<h3>
					Daily Activity
				</h3>
			</CardHeader>
			<CardContent>
				<ActivityCalendar
					data={paddedData}
					maxLevel={3}
					totalCount={timeLogs.length}
					showWeekdayLabels={true}
					blockRadius={3}
					blockMargin={3}
					colorScheme="light"
					labels={{ totalCount: `${timeLogs.length} timelogs added in ${(new Date()).getFullYear()}` }}
					theme={{
						light: [`var(--secondary)`, `var(--${color.toLocaleLowerCase()})`],
					}}
					renderBlock={(block, activity) =>
						cloneElement(block, {
							'data-tooltip-id': 'react-tooltip',
							'data-tooltip-html': `${timeFormatString(activity.count, 'h', 'm', false)} on ${new Date(activity.date).toLocaleDateString('en-US', {day: 'numeric', month: 'short'})}`,
						})
					}

				/>
				<Tooltip id="react-tooltip" />
			</CardContent>
		</Card>
	)
}

export default ActivityChart