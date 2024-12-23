import { TimeLog } from "@/lib/types"
import TimeLogTableRow from "./TimeLogTableRow"

const TimeLogTable = ({ timeLogs }: { timeLogs: TimeLog[] }) => {
	return (
		<table align="center">
			<thead>
				<tr>
					<th>Started</th>
					<th>Ended</th>
					<th>Time Passed</th>
					<th>Running</th>
				</tr>
			</thead>
			<tbody>
				{timeLogs?.map((timeLog)=>(
					<TimeLogTableRow timeLog={timeLog} key={timeLog?.id}/>
				))}
			</tbody>
		</table>
	)
}

export default TimeLogTable