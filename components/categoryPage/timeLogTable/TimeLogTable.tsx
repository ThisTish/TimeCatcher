import { TimeLog } from "@/lib/types"
import DataTable from "../../ui/DataTable"
import { TimeLogColumns } from "./TimeLogColumns"
import { Card } from "@/components/ui/card"
import { shadowColor } from "@/components/providers/ThemeProvider"
import { Color } from "@prisma/client"

const TimeLogTable = ({ timeLogs, color }: { timeLogs?: TimeLog[], color: Color }) => {

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
			<DataTable
				columns={TimeLogColumns}
				data={dataTable}
				title="Timelogs"
				description="View, edit, organize, and delete timelogs"
				placeholder="Search by date"
				categoryId={timeLogs?.[0]?.categoryId}
				color={color}
			/>
		
	)
}

export default TimeLogTable

