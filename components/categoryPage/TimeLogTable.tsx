import { TimeLog } from "@/lib/types"
import { Button } from "../ui/button"
import DataTable from "../ui/DataTable"
import { TimeLogColumns } from "./TimeLogColumns"

const TimeLogTable = ({ timeLogs }: { timeLogs?: TimeLog[] }) => {
	// console.dir(timeLogs)

	const dataTable = timeLogs?.map((timeLog) => {
		if (!timeLog) return null;
		return {
			id: timeLog.id,
			categoryId: timeLog.categoryId,
			startTime: timeLog.startTime,
			endTime: timeLog.endTime ?? null,
			timePassed: timeLog.timePassed,
			running: timeLog.running
		}
	})

	if (!dataTable) throw new Error('Data not found')


	return (
		<div>
			<DataTable
				columns={TimeLogColumns}
				data={dataTable}
				title="Timelogs"
				description="View, edit, organize, and delete timelogs"
				placeholder="Search by date"
				categoryId={timeLogs?.[0]?.categoryId}
			/>
			<Button
				type="button"
				onClick={() => console.log('clicked')}
				>
					Add a timeLog
				</Button>
		</div>
	)
}

export default TimeLogTable

