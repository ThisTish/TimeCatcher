import { TimeLog } from "@/lib/types"
import { Button } from "../ui/button"
import DataTable from "../ui/DataTable"
import {TimeLogColumns} from "../categoryCards/timer/TimeLogColumns"

const TimeLogTable = ({ timeLogs }: { timeLogs?: TimeLog[] }) => {
	console.dir(timeLogs)
	// if(!timeLogs || timeLogs.length === 0) throw new Error('Timelogs not found')

	const dataTable = timeLogs?.map((timeLog) => {
		if (!timeLog) return null;
		return {
			id: timeLog.id,
			startTime: timeLog.startTime,
			endTime: timeLog.endTime ?? null,
			timePassed: timeLog.timePassed,
			running: timeLog.running
		}
	})

	if(!dataTable) throw new Error('Data not found')


	return (
		<div>
			<DataTable 
			columns={TimeLogColumns} 
			data={dataTable} 
			title="Timelogs" 
			description="View, edit, organize, and delete timelogs" 
			placeholder="Search by date"
			/>
		</div>
	)
}

export default TimeLogTable



// trying on my own:
{/* <table  >
			<thead>
				<tr>
					<th>Started</th>
					<th>Ended</th>
					<th>Time Passed</th>
					<th>Running</th>
				</tr>
			</thead>
			<tbody>
				{timeLogs?.map((timeLog) => (
					<TimeLogTableRow timeLog={timeLog} key={timeLog?.id} />
				))}
			</tbody>
			<tfoot>
				<tr>
					<td align="right" colSpan={4}>
						<Button>
							Add a Timelog
						</Button>
					</td>
				</tr>
			</tfoot>
		</table> */}