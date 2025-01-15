import { TimeFrame } from "@prisma/client"
import { TimeLog } from "./types"
import timeFrameDates from "./timeFrame-dates"

	const getTotals = (timeFrame: TimeFrame | "ALLTIME", timeLogs: TimeLog[], date: Date = new Date()) => {
	
		const {startDate, endDate } = timeFrameDates(timeFrame,  date)  

		const timeLogsByTimeFrame = timeLogs.filter((timelog) => timelog?.startTime && timelog.endTime && (timelog.startTime >= startDate) && (timelog?.startTime <= endDate))

		const totals = timeLogsByTimeFrame.reduce((acc, timelog) => acc + (timelog?.timePassed || 0), 0)

		return totals

	}

	export default getTotals