import { TimeLog, TimeLogSchema } from "@/lib/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { TimeFrame } from "@prisma/client"
import { timeFormatString } from "@/lib/time-format"
import getTotals from "@/lib/totals-by-timeFrame"
import { useMemo } from "react"

const CategoryTotalTimes = ({ timeLogs }: { timeLogs: TimeLog[] }) => {

	const totalsByTimeFrame = useMemo(() => (timeFrame: TimeFrame, timeLogs: TimeLog[]) => {
		const totals = getTotals(timeFrame, timeLogs)
		if (!totals) return '0 hours 0 minutes'

		const strings = timeFormatString(totals, ' hours', ' minutes', false)

		return strings
	}, [timeLogs])


	return (
		<Card className="bg-gray-200/75 w-1/3">
			<CardHeader>
				<CardTitle>
					<h3>Totals of Time Caught </h3>
				</CardTitle>
				<CardDescription>
					<p>Time caught by:</p>
				</CardDescription>
			</CardHeader>
			<CardContent className="flex flex-col gap-2">
				<p className="flex gap-2"><b>Today</b>{totalsByTimeFrame('DAY', timeLogs)}</p>
				<p className="flex gap-2"><b>This Week</b>{totalsByTimeFrame('WEEK', timeLogs)}</p>
				<p className="flex gap-2"><b>This Month</b>{totalsByTimeFrame('MONTH', timeLogs)}</p>
				<p className="flex gap-2"><b>For the Year</b>{totalsByTimeFrame('YEAR', timeLogs)}</p>

			</CardContent>
		</Card>
	)
}

export default CategoryTotalTimes