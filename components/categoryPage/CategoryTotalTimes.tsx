import { TimeLog } from "@/lib/types"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Color, TimeFrame } from "@prisma/client"
import { timeFormatString } from "@/lib/time-format"
import getTotals from "@/lib/totals-by-timeFrame"
import { useMemo } from "react"
import { backgrounds, shadowColor } from "../providers/ThemeProvider"

const CategoryTotalTimes = ({ timeLogs, color, name }: { timeLogs: TimeLog[], color: Color, name: string }) => {

	const totalsByTimeFrame = useMemo(() => (timeFrame: TimeFrame, timeLogs: TimeLog[]) => {
		const totals = getTotals(timeFrame, timeLogs)
		if (!totals) return '0 hours 0 minutes'

		const strings = timeFormatString(totals, ' hours', ' minutes', false)

		return strings
	}, [timeLogs])


	return (
		<>
			{/* no timeLogs */}
			{timeLogs.length === 0 || !timeLogs
				? (
					<Card className={`p-5 shadow-lg ${shadowColor[color]} w-fit h-fit`}>
						<CardHeader>
							<CardTitle>
								<h2>Time Caught </h2>
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-xl py-10">No time caught yet</p>
						</CardContent>
						<CardFooter>
							<p className="text-sm">Go catch some time in {name}!</p>
						</CardFooter>
					</Card>
				) : (
					// totals to display
					<Card className={`p-5 h-fit  shadow-md ${shadowColor[color]}`} >
						<CardHeader>
							<CardTitle>
								<h2>Time Caught </h2>
							</CardTitle>
						</CardHeader>
						<CardContent >
							<ul className="grid gap-3">
								<li>
									<p className="mb-1"><b>Today</b></p>
									<span className={`px-5 ${backgrounds[color]} rounded-md py-2`}>{totalsByTimeFrame('DAY', timeLogs)}</span>
								</li>
								<li>
									<p className="mb-1"><b>This Week</b></p>
									<span className={`px-5 ${backgrounds[color]} rounded-md py-2`}>{totalsByTimeFrame('WEEK', timeLogs)}</span>
								</li>
								<li>
									<p className="mb-1"><b>This Month</b></p>
									<span className={`px-5 ${backgrounds[color]} rounded-md py-2`}>{totalsByTimeFrame('MONTH', timeLogs)}</span>
								</li>
								<li>
									<p className="mb-1"><b>For the Year</b></p>
									<span className={`px-5 ${backgrounds[color]} rounded-md py-2`}>{totalsByTimeFrame('YEAR', timeLogs)}</span>
								</li>
							</ul>
						</CardContent>
					</Card>
				)}
		</>
	)
}

export default CategoryTotalTimes