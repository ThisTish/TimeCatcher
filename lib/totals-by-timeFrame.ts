import { TimeFrame } from "@prisma/client"
import { TimeLog } from "./types"

	const getTotals = (timeFrame: TimeFrame | "ALLTIME", timeLogs: TimeLog[]) => {
		const currentYear = new Date().getFullYear()
		const currentMonth = new Date().getMonth()

		let startDate: Date
		let endDate: Date = new Date()



		switch (timeFrame) {
			case TimeFrame.DAY:
				startDate = new Date(new Date().setHours(0, 0, 0, 0))
				endDate = new Date(new Date().setHours(23, 59, 59, 999))
				break
			case TimeFrame.WEEK:
				startDate = new Date()
				startDate.setDate(startDate.getDate() - startDate.getDay())
				startDate.setHours(0, 0, 0, 0)
				endDate = new Date(startDate);
				endDate.setDate(startDate.getDate() + 6);
				endDate.setHours(23, 59, 59, 999);
				break
			case TimeFrame.MONTH:
				startDate = new Date(currentYear, currentMonth, 1)
				endDate = new Date(new Date(currentYear, currentMonth + 1, 0).setHours(23, 59, 59, 999))
				break
			case TimeFrame.YEAR:
				startDate = new Date(currentYear, 0, 1)
				endDate = new Date(new Date(currentYear, 11, 31).setHours(23, 59, 59, 999))
				break
			case "ALLTIME":
				startDate = new Date(0)
				break
			default:
				throw new Error(`Unsupported time frame: ${timeFrame}`)
		}

		const timeLogsByTimeFrame = timeLogs.filter((timelog) => timelog?.startTime && timelog.endTime && (timelog.startTime >= startDate) && (timelog?.endTime <= endDate))

		const totals = timeLogsByTimeFrame.reduce((acc, timelog) => acc + (timelog?.timePassed || 0), 0)

		return totals

	}

	export default getTotals