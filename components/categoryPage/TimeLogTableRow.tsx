// import { timeFormat } from "@/lib/time-format"
// import { TimeLog } from "@/lib/types"
// import { Button } from "../ui/button"

// const TimeLogTableRow = ({ timeLog }: { timeLog: TimeLog }) => {
// 	if (!timeLog) return null

// 	let { hours, minutes, seconds } = timeFormat(timeLog.timePassed / 1000)

// 	const formattedTimePassed = `${hours.toString().padStart(2, '0')} : ${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')}`

// 	return (
// 		<tr key={timeLog.id}>
// 			<td><time>{timeLog.startTime.toString()}</time></td>
// 			<td><time>{timeLog.endTime ? timeLog.endTime.toString() : ''}</time></td>
// 			<td><time>{formattedTimePassed}</time></td>
// 			<td>{timeLog.running ? 'true' : 'false'}</td>
// 			<td>
// 				<Button
// 					variant={'outline'}
// 				>
// 					Edit
// 				</Button>
// 			</td>
// 		</tr>
// 	)
// }

// export default TimeLogTableRow