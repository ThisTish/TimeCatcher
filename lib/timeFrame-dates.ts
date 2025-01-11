import { TimeFrame } from "@prisma/client"

const timeFrameDates = (timeFrame: TimeFrame | "ALLTIME", date: Date = new Date()) =>{

	const currentYear = new Date(date).getFullYear()
	const currentMonth = new Date(date).getMonth()

	let startDate: Date
	let endDate: Date = new Date()
	switch (timeFrame) {
		case TimeFrame.DAY:
			startDate = new Date(new Date(date).setHours(0, 0, 0, 0))
			endDate = new Date(new Date(date).setHours(23, 59, 59, 999))
			break
		case TimeFrame.WEEK:
			startDate = new Date(date)
			startDate.setDate(startDate.getDate() - startDate.getDay())
			startDate.setHours(0, 0, 0, 0)
			endDate = new Date(startDate);
			endDate.setDate(startDate.getDate() + 6);
			endDate.setHours(23, 59, 59, 999);
			break
		case TimeFrame.MONTH:
			startDate = new Date(currentYear, currentMonth, 1)
			endDate = new Date(new Date(currentYear, currentMonth + 1, 1).setHours(23, 59, 59, 999))
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
	return {startDate, endDate}
}

export default timeFrameDates