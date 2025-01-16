"use client"

import { TimeLog } from "@/lib/types"
import { Card, CardContent, CardHeader } from "../ui/card"
import { ActivityCalendar } from 'react-activity-calendar'
import { Color } from "@prisma/client"
import { timeFormatString } from "@/lib/time-format"
import { cloneElement, useMemo } from "react"
import { Tooltip } from 'react-tooltip'
import getTotals from "@/lib/totals-by-timeFrame"
import timeFrameDates from "@/lib/timeFrame-dates"

const ActivityChart = ({ timeLogs, color }: { timeLogs: TimeLog[], color: Color }) => {

	const milliseconds = 8 * 60 * 60 * 1000
	const timeSegment = milliseconds / 3

	const level = (time: number) => {
		if (time > milliseconds) return 3
		if (time === 0) return 0
		if (time < timeSegment) return 1//MIGHT NOT NEED
		return Math.min(Math.floor(time / timeSegment), 3)
	}

	const getLocalDateString = (date: Date) => {
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');
		return (`${year}-${month}-${day}`);
	};

	// const data = useMemo(() => {
	// 	const validTimeLogs = Array.isArray(timeLogs) ? timeLogs : []

	// 	const currentYear = new Date().getFullYear()
	// 	const startDate =  new Date(currentYear, 0, 1)
	// 	const endDate = new Date(currentYear, 11, 31)

	// 	const getDatesInRange = (start: Date, end: Date) => {
	// 		const dates = []

	// 		let currentDate = new Date(start)
	// 		while(currentDate <= end){
	// 			dates.push(new Date(currentDate))
	// 			// currentDate =timeFrameDates("DAY", currentDate).startDate
	// 			currentDate.setUTCDate(currentDate.getDate() + 1)
	// 		}
	// 		return dates
	// 	}

	// 	return getDatesInRange(startDate, endDate).map((date) =>{
	// 		const localDateString = getLocalDateString(date)
	// 		const timeLogsOnDate = validTimeLogs.filter((log) => {
	// 			try {
	// 				return log && getLocalDateString(log.startTime) === localDateString
	// 			} catch (error) {
	// 				return false
	// 			}
	// 		})
			
	// 		const totals = getTotals("DAY", timeLogsOnDate, date)

	// 		return {
	// 			date: localDateString,
	// 			count: totals,
	// 			level: level(totals)
	// 		}
	// 	})

	// }, [timeLogs])
	



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