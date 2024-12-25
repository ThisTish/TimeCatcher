import { ColumnDef, createColumnHelper, Row } from "@tanstack/react-table"
import { TimeLog } from "@/lib/types"
import deleteTimeLog from "@/server/actions/timer/delete-timelog"
import { useAction } from "next-safe-action/hooks"
import { toast } from "sonner"
import { Button } from "../ui/button"
import { Pencil, Save, SaveAll, Trash } from "lucide-react"
import { timeFormat } from "@/lib/time-format"
import EditableCell from "../ui/EditableCell"
import editTimeLog from "@/server/actions/timer/edit-timeLog"


// delete column
const DeleteCell = ({ row }: { row: Row<TimeLog> }) => {
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


// delete column
const EditCell = ({ row }: { row: Row<TimeLog> }) => {
	const { execute, status } = useAction(editTimeLog, {
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

	const editButton = row.original
	if (!editButton) {
		return null
	}
	return (
		<div>
			<Button
				key={editButton.id}
				value={editButton.categoryId}
				type="submit"
				variant={'secondary'}
				onClick={() => {
					if (editButton.categoryId) {
						console.log(editButton.categoryId, editButton.id)
						execute({ 
							id: editButton.id, 
							categoryId: editButton.categoryId, 
							startTime: editButton.startTime,
							endTime: editButton.endTime,
						})
					}
				}}
			>
				<Save />
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
		cell: EditableCell
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
		cell: DeleteCell
	},
	{
		accessorKey: 'edit',
		header: 'Edit',
		cell: EditCell
	}
]
