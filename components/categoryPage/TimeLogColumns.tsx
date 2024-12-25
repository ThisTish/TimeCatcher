import { ColumnDef, Row } from "@tanstack/react-table"
import { TimeLog } from "@/lib/types"
import deleteTimeLog from "@/server/actions/timer/delete-timelog"
import { useAction } from "next-safe-action/hooks"
import { toast } from "sonner"
import { Button } from "../ui/button"
import { Trash } from "lucide-react"

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



export const TimeLogColumns: ColumnDef<TimeLog>[] = [
	{
		accessorKey: 'id',
		header: 'ID'
	},
	{
		accessorKey: 'startTime',
		header: 'Start Time',
		cell: ({ row }) => {
			const startTime = row.getValue('startTime') as Date
			const formattedDate = new Intl.DateTimeFormat('en-Us', {
				year: '2-digit',
				month: 'short',
				day: '2-digit',
				hour: '2-digit',
				minute: '2-digit',
				second: '2-digit'
			}).format(new Date(startTime))
			return (
				<time>
					{formattedDate}
				</time>
			)
		}
	},
	{
		accessorKey: 'endTime',
		header: 'End Time',
		cell: ({ row }) => {
			const endTime = row.getValue('endTime') as Date
			const formattedDate = new Intl.DateTimeFormat('en-Us', {
				year: '2-digit',
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
		header: 'Time Caught'
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
