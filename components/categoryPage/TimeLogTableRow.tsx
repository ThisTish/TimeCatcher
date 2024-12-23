import { TimeLog } from "@/lib/types";

const TimeLogTableRow = ({timeLog}: {timeLog: TimeLog}) => {
	if(!timeLog) return null

	return ( 
		<tr key={timeLog.id}>
						<td>{timeLog.startTime.toString()}</td>
						<td>{timeLog.endTime ? timeLog.endTime.toString() : ''}</td>
						<td>{timeLog.timePassed}</td>
						<td>{timeLog.running ? 'true' : 'false'}</td>
					</tr>
	 );
}
 
export default TimeLogTableRow;