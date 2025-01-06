import { useAction } from "next-safe-action/hooks"
import { Row } from "@tanstack/react-table"
import editTimeLog from "@/server/actions/timer/edit-timeLog"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { TimeLog } from "@/lib/types"
import { Save } from "lucide-react"
import { toast } from "sonner"
import { checkCompletionAndUpdateGoal } from "@/server/actions/goal/check-and-update-goal"

// todo disabled until row is in editable mode
// todo useOptimistic on update
const EditTimeLogButton = ({ row }: { row: Row<TimeLog> }) => {
	const { execute, status } = useAction(editTimeLog, {
		onSuccess(data) {
			if (data.data?.success) {
				checkCompletionAndUpdateGoal(data.data.updatedTimer.categoryId)
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
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button
						key={editButton.id}
						value={editButton.categoryId}
						type="submit"
						variant={'outline'}
						onClick={() => {
							if (editButton.categoryId) {
								execute({
									id: editButton.id,
									categoryId: editButton.categoryId,
									startTime: editButton.startTime,
									endTime: editButton.endTime,
								})
							}
						}}
						disabled={status === 'executing'}
					>
						<Save />
					</Button>
				</TooltipTrigger>
				<TooltipContent>
					<p>Save changes</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}

export default EditTimeLogButton