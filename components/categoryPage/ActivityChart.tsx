import { TimeLog } from "@/lib/types"
import { Card, CardContent, CardHeader } from "../ui/card"
import { ActivityCalendar } from 'react-activity-calendar'
import { Color } from "@prisma/client"
import { timeFormatString } from "@/lib/time-format"
import { cloneElement } from "react"
import { Tooltip } from 'react-tooltip'
import getTotals from "@/lib/totals-by-timeFrame"

const ActivityChart = ({ timeLogs, color }: { timeLogs: TimeLog[], color: Color }) => {

	const milliseconds = 8 * 60 * 60 * 1000
	const timeSegment = milliseconds / 3

	const level = (time: number) => {
		if (time > milliseconds) return 3
		if (time === 0) return 0
		if (time < timeSegment) return 1//MIGHT NOT NEED
		return Math.min(Math.floor(time / timeSegment), 3)
	}

	const data = Array.from(
		new Set(timeLogs.map((log) => log?.startTime?.toISOString().split('T')[0] ?? ''))
	).map((date) =>{
		const timeLogsOnDate = timeLogs.filter((log) => log?.startTime?.toISOString().split('T')[0] === date)
		console.log(timeLogsOnDate.map((log) => log?.timePassed ), date )
		const totals = getTotals("DAY", timeLogsOnDate, new Date(date))
		return {
			date,
			count: totals,
			level: level(totals)
		}
	})
	console.dir(data)

	// let data:{
	// 	date:string,
	// 	count:number,
	// 	level:number
	// }[] = []

	// const findingObject = (timelogs: TimeLog[]) =>{
	// 	const dateArray = new Set(timeLogs.map((log) => log?.startTime?.toISOString().split('T')[0] ?? ''))
	// 	const objectifying = dateArray.forEach((date)=>{
	// 		const timeLogsOnDate = timeLogs.filter((log) => log?.startTime?.toISOString().split('T')[0] === date)
	// 		const totals = getTotals("DAY", timeLogsOnDate)
	// 		data.push({
	// 			date: date,
	// 			count: totals,
	// 			level: level(totals)
	// 		})
	// 	})
	// }

	// const data = timeLogs.map((log) => ({
	// 	date: log?.startTime?.toISOString().split('T')[0] ?? '',
	// 	count: getTotals("DAY", log ) ?? 0,
	// 	level: level(log?.timePassed ?? 0)
	// }))

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