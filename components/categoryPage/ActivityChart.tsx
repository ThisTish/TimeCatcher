import { TimeLog } from "@/lib/types"
import { Card, CardContent, CardHeader } from "../ui/card"
import { ActivityCalendar } from 'react-activity-calendar'
import { Color } from "@prisma/client"

const ActivityChart = ({ timeLogs, color }: { timeLogs: TimeLog[], color: Color }) => {

	const milliseconds = 12 * 60 * 60 * 1000
	const timeSegment = milliseconds / 3

	const level = (time: number) => {
		if (time > milliseconds) return 3
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


	// ! add hours & minutes to completedGoals instead of h & m
	// ! sort goals by date
	// ! completed goals to show how much total timepassed with goal in parenthesis?
	// ! !isDesktop, show small calendar, else show large calendar


	return (
		<Card className="bg-gray-400">
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
						light: [`var(--white)`, `var(--${color.toLocaleLowerCase()})`],
						dark: [`var(--black)`, `var(--${color.toLocaleLowerCase()})`]
					}}
				/>
			</CardContent>
		</Card>
	)
}

export default ActivityChart