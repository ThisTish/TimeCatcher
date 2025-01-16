import { TimeLog, TimeLogSchema } from "@/lib/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Color, TimeFrame } from "@prisma/client"
import { timeFormatString } from "@/lib/time-format"
import getTotals from "@/lib/totals-by-timeFrame"
import { useMemo } from "react"
import { backgrounds, shadowColor } from "../providers/ThemeProvider"

const CategoryTotalTimes = ({ timeLogs, color }: { timeLogs: TimeLog[], color: Color }) => {

	const totalsByTimeFrame = useMemo(() => (timeFrame: TimeFrame, timeLogs: TimeLog[]) => {
		const totals = getTotals(timeFrame, timeLogs)
		if (!totals) return '0 hours 0 minutes'

		const strings = timeFormatString(totals, ' hours', ' minutes', false)

		return strings
	}, [timeLogs])


	return (
		<Card className={`p-10 shadow-md ${shadowColor[color]}`} >
			<CardHeader>
				<CardTitle>
					<h2>Time Caught </h2>
				</CardTitle>
				
			</CardHeader>
			<CardContent className="flex flex-col gap-2">
				<p className="flex gap-2"><b>Today</b></p>
				<span className={`px-5 ${backgrounds[color]} rounded-md py-2`}>{totalsByTimeFrame('DAY', timeLogs)}</span>
				<p className="flex gap-2"><b>This Week</b></p>
				<span className={`px-5 ${backgrounds[color]} rounded-md py-2`}>{totalsByTimeFrame('WEEK', timeLogs)}</span>
				<p className="flex gap-2"><b>This Month</b></p>
				<span className={`px-5 ${backgrounds[color]} rounded-md py-2`}>{totalsByTimeFrame('MONTH', timeLogs)}</span>
				<p className="flex gap-2"><b>For the Year</b></p>
				<span className={`px-5 ${backgrounds[color]} rounded-md py-2`}>{totalsByTimeFrame('YEAR', timeLogs)}</span>

			</CardContent>
		</Card>
	)
}

export default CategoryTotalTimes