import { TimeFrame } from "@prisma/client"

const timeFrameDates = (timeFrame: TimeFrame | "ALLTIME") =>{

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
	return {startDate, endDate}
}

export default timeFrameDates