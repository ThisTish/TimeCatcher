import { ColumnDef, createColumnHelper, Row } from "@tanstack/react-table"
import { TimeLog } from "@/lib/types"
import deleteTimeLog from "@/server/actions/timer/delete-timelog"
import { useAction } from "next-safe-action/hooks"
import { toast } from "sonner"
import { Button } from "../ui/button"
import { Trash } from "lucide-react"
import { timeFormat } from "@/lib/time-format"
import EditableCell from "../ui/EditableCell"


// delete column
const ActionCell = ({ row }: { row: Row<TimeLog> }) => {
	const { execute, status } = useAction(deleteTimeLog, {
		onSuccess(data) {
			if (data.data?.success) {
				toast.success(data.data.success)
			}
			if (data.data?.error) {
				toast.error(data.data.error)
			}
		},
		onError: (error) => {
			console.log(error)
		}
	})

	const deleteButton = row.original
	if (!deleteButton) {
		return null
	}
	return (
		<div>
			<Button
				key={deleteButton.id}
				value={deleteButton.categoryId}
				type="submit"
				variant={'secondary'}
				onClick={() => {
					if (deleteButton.categoryId) {
						console.log(deleteButton.categoryId, deleteButton.id)
						execute({ id: deleteButton.id, categoryId: deleteButton.categoryId })
					}
				}}
			>
				<Trash />
			</Button>
		</div>
	)
}



export const TimeLogColumns: ColumnDef<TimeLog>[] = 
[

	{
		accessorKey: 'startTime',
		header: 'Start Time',
		cell: EditableCell

	},
	{
		accessorKey: 'endTime',
		header: 'End Time',
		cell: ({ row }) => {
			const endTime = row.getValue('endTime') as Date
			const formattedDate = new Intl.DateTimeFormat('en-Us', {
				year: 'numeric',
				month: 'short',
				day: '2-digit',
				hour: '2-digit',
				minute: '2-digit',
				second: '2-digit'
			}).format(new Date(endTime))
			return (
				<time>
					{formattedDate}
				</time>
			)
		}
	},
	{
		accessorKey: 'timePassed',
		header: 'Time Caught',
		footer: ({table}) =>{
			const totalTimePassed = table
			.getFilteredRowModel()
			.rows.reduce((sum, row) => sum + row.getValue<number>('timePassed'), 0)
			return `Total Time Caught: ${timeFormat(totalTimePassed / 1000).hours} : ${timeFormat(totalTimePassed / 1000).minutes} : ${timeFormat(totalTimePassed / 1000).seconds}`
		},
		cell: ({ row }) => {
			const timePassed = row.getValue('timePassed') as number
			const { hours, minutes, seconds } = timeFormat(timePassed / 1000)
			const formattedTimePassed = `${hours.toString().padStart(2, '0')} : ${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')}`

			return (
				<span>
					{formattedTimePassed}
				</span>
			)
		}
	},
	{
		accessorKey: 'running',
		header: 'Running'
	},
	{
		accessorKey: 'delete',
		header: 'Delete',
		cell: ActionCell
	}
]
