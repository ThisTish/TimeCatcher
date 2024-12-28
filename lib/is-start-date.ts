import { FilterFn } from "@tanstack/react-table"
import { TimeLog } from "./types"

const isStartDate: FilterFn<TimeLog> = (row, columnId, filteredValue, addMeta) => {
	const date = row.getValue('startTime') as Date
	const start = new Date(filteredValue)
	console.log(start)
	if(start && !date) return false
	return date.getDate() === start.getUTCDate()
}

export default isStartDate