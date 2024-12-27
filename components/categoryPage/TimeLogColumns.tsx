import { ColumnDef, createColumnHelper, FilterFn, Row } from "@tanstack/react-table"
import { TimeLog } from "@/lib/types"
import deleteTimeLog from "@/server/actions/timer/delete-timeLog"
import { useAction } from "next-safe-action/hooks"
import { toast } from "sonner"
import { Button } from "../ui/button"
import { Save, Trash } from "lucide-react"
import { timeFormat } from "@/lib/time-format"
import EditableCell from "../ui/EditableCell"
import editTimeLog from "@/server/actions/timer/edit-timeLog"
import { boolean } from "zod"
import isStartDate from "@/lib/is-start-date"


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
			<Button
				key={deleteButton.id}
				value={deleteButton.categoryId}
				type="submit"
				variant={'destructive'}
				onClick={() => {
					if (deleteButton.categoryId) {
						execute({ id: deleteButton.id, categoryId: deleteButton.categoryId })
					}
				}}
			>
				<Trash />
			</Button>
	)
}


// edit/save column
// todo disabled until row is in editable mode
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
		
			<Button
				key={editButton.id}
				value={editButton.categoryId}
				type="submit"
				variant={'outline'}
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
	)
}




export const TimeLogColumns: ColumnDef<TimeLog>[] = 
[
	// {
	// 	accessorKey: 'id',
	// 	header: 'ID'
	// },

	{
		accessorKey: 'startTime',
		header: 'Start Time',
		cell: EditableCell,
		filterFn: isStartDate

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
			const { hours, minutes, seconds } = timeFormat(totalTimePassed / 1000)

			return `Total Time Caught: ${hours.toString().padStart(2, '0')} : ${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')}`
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
	// {
	// 	accessorKey: 'running',
	// 	header: 'Running'
	// },
	{
		accessorKey: 'edit',
		header: 'Save',
		cell: EditCell
	},
	{
		accessorKey: 'delete',
		header: 'Delete',
		cell: DeleteCell
	}
]
