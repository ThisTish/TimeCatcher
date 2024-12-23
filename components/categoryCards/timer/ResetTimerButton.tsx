"use client"

import { Button } from "@/components/ui/button"
import resetTimer from "@/server/actions/timer/resetTimer"
import { useAction } from "next-safe-action/hooks"
import { toast } from "sonner"


const ResetTimerButton = ({timeLogId}: {timeLogId: string}) => {


	const { execute, status } = useAction(resetTimer, {
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
		})
	})

	const handleReset = () => {
		execute({ timeLogId })
	}

	return (
		<Button
			type="button"
			variant={'secondary'}
			className="text-black"
			onClick={handleReset}
		>
			{status === 'executing' ?
				'resetting... '
				:
				'Reset'
			}
		</Button>
	)
}

export default ResetTimerButton