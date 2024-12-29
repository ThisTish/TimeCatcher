import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { TimeLog } from "@/lib/types"
import deleteTimeLog from "@/server/actions/timer/delete-timeLog"
import { Row } from "@tanstack/react-table"
import { Trash } from "lucide-react"
import { useAction } from "next-safe-action/hooks"
import { toast } from "sonner"


const DeleteTimeLogButton = ({ row }: { row: Row<TimeLog> }) => {
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
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
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
						disabled={status === 'executing'}
					>
						<Trash />
					</Button>
				</TooltipTrigger>
				<TooltipContent>
					<p>Delete Timelog</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}


export default DeleteTimeLogButton;