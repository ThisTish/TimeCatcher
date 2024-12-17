"use client"

import { Button } from "@/components/ui/button"
import { stopTimer } from "@/server/actions/timer/stop-timer"
import { useAction } from "next-safe-action/hooks"
import { toast } from "sonner"

const StopButton = ({ categoryId }: { categoryId: string }) => {

	const { execute, status } = useAction(stopTimer, {
		onSuccess: ((data) => {
			if (data.data?.success) {
				console.log(data.data.success)
				toast.success(data.data.success)
			}
			if (data.data?.error) {
				console.log(data.data.error)
				toast.error(data.data.error)
			}
		}),
		onError: ((error) => {
			console.log(error)
		}),
		// onExecute: (() => {
		// 	toast.loading('Starting timer...')
		// })
	})


	return (
		<Button
			variant={'secondary'}
			key={categoryId}
			onClick={() => execute({categoryId})}
		>
			{status === 'executing' ? 
			'Stopping... '
			:
			'Stop'
			}
		</Button>
	)
}

export default StopButton