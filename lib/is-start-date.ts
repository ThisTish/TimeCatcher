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



// *set up for filtering within a date range
// export const isWithinRange = (row, columnId, value) => {
// 	const date = row.getValue('startTime') as Date;
// 	const [start, end] = filteredValue.map((date: string) => new Date(date));

// 	if((start || end) && !date) return false;

// 	if(start && !end){
// 	return date.getDate() >= start.getUTCDate()
	
// }else if(!start && end){
// 	return date.getDate() <= end.getUTCDate()

// 	}else if (start && end) {
// 	return date.getDate() >= start.getUTCDate() && date.getDate() <= end.getUTCDate()

// 	} else return true;


// 	};