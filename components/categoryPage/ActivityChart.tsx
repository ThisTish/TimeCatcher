import { TimeLog } from "@/lib/types"
import { Card, CardContent, CardHeader } from "../ui/card"
import { ActivityCalendar } from 'react-activity-calendar'

const ActivityChart = ({ timeLogs }: { timeLogs: TimeLog[] }) => {

	const milliseconds = 12 * 60 * 60 * 1000
	const timeSegment = milliseconds / 3

	const level = (time: number) => {
		if(time > milliseconds) return 3
		return Math.floor(time / timeSegment)
	}
	const data = timeLogs.map((log) => ({
			date: log?.startTime?.toISOString() ?? '',
			count: log?.timePassed ?? 0,
			level: level(log?.timePassed ?? 0)
		}))


		const paddedData = [
			{
				date: '2025-01-01',
				count: 0,
				level: 3
			},
			...data,
			{
				date: '2025-12-31',
				count: 0,
				level: 3
			}
		]

		console.dir(paddedData)
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
				/>
			</CardContent>
		</Card>
	)
}

export default ActivityChart