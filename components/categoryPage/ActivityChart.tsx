"use client"

import { cloneElement, useMemo } from "react"
import { TimeLog } from "@/lib/types"
import { Color } from "@prisma/client"
import { timeFormatString } from "@/lib/time-format"
import getTotals from "@/lib/totals-by-timeFrame"
import { Tooltip } from 'react-tooltip'
import { ActivityCalendar } from 'react-activity-calendar'
import { Card, CardContent, CardHeader } from "../ui/card"

const ActivityChart = ({ timeLogs, color }: { timeLogs: TimeLog[], color: Color }) => {

	const milliseconds = 8 * 60 * 60 * 1000
	const timeSegment = milliseconds / 3

	const level = (time: number) => {
		if (time > milliseconds) return 3
		if (time === 0) return 0
		if (time < timeSegment) return 1//MIGHT NOT NEED
		return Math.min(Math.floor(time / timeSegment), 3)
	}

	const data = useMemo(() => {
		return Array.from(new Set(timeLogs.map((log) => log?.startTime ?? ''))).map((date) => {
			const timeLogsOnDate = timeLogs.filter((log) => log?.startTime === date)
			const totals = getTotals("DAY", timeLogsOnDate, new Date(date))
			return {
				date: new Date(date).toISOString().split('T')[0],
				count: totals,
				level: level(totals)
			}
		})
	}, [timeLogs])


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
							'data-tooltip-html': `${timeFormatString(activity.count, 'h', 'm', false)} on ${new Date(activity.date).toDateString()}`,
						})
					}

				/>
				<Tooltip id="react-tooltip" />
			</CardContent>
		</Card>
	)
}

export default ActivityChart