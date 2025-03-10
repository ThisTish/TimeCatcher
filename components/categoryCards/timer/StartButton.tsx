"use client"

import { useAction } from "next-safe-action/hooks"
import { Button } from "../../ui/button"
import startTimer from "@/server/actions/timer/start-timer"
import { toast } from "sonner"

const StartButton = ({ categoryId, disabled }: { categoryId: string, disabled: boolean }) => {


	const { execute, status } = useAction(startTimer, {
		onSuccess: ((data) => {
			if (data.data?.success) {
				toast.success(data.data.success)
			}
			if (data.data?.error) {
				toast.error(data.data.error)
			}
		}),
		onError: ((error) => {
			console.log(error)
		})
	})

	const handleStart = () => {
		execute({ categoryId })
	}

	return (
		<Button
			type="button"
			variant={'outline'}
			className="text-black mt-10"
			onClick={handleStart}
			disabled={status === 'executing' || disabled}
		>
			{status === 'executing' ?
				'Starting... '
				:
				'Start'
			}
		</Button>
	)
}

export default StartButton