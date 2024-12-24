import { ColumnDef, Row } from "@tanstack/react-table"
import { TimeLog } from "@/lib/types"


export const TimeLogColumns:ColumnDef<TimeLog>[] = [
	{
		accessorKey: 'id',
		header: 'ID'
	},
	{
		accessorKey: 'startTime',
		header: 'Start Time',
		cell: ({row}) =>{
			const startTime = row.getValue('startTime') as Date
			const formattedDate = new Intl.DateTimeFormat('en-Us', {
				year: '2-digit',
				month: 'short',
				day: '2-digit',
				hour: '2-digit',
				minute: '2-digit',
				second: '2-digit'
			}).format(new Date(startTime))
			return(
				<time>
					{formattedDate}
				</time>
			)
		}
	},
	{
		accessorKey: 'endTime',
		header: 'End Time',
		cell: ({row}) =>{
			const endTime = row.getValue('endTime') as Date
			const formattedDate = new Intl.DateTimeFormat('en-Us', {
				year: '2-digit',
				month: 'short',
				day: '2-digit',
				hour: '2-digit',
				minute: '2-digit',
				second: '2-digit'
			}).format(new Date(endTime))
			return(
				<time>
					{formattedDate}
				</time>
			)
		}
	},
	{
		accessorKey: 'timePassed',
		header: 'Time Caught'
	},
	{
		accessorKey: 'running',
		header: 'Running'
	}
]
