"use client"

import { useAction } from "next-safe-action/hooks"
import { Button } from "../../ui/button"
import startTimer from "@/server/actions/timer/start-timer"
import { toast } from "sonner"

const TimerButton = ({categoryId}: {categoryId: string}) => {


		const { execute, status } = useAction(startTimer, {
			onSuccess: ((data) =>{
				if(data.data?.success){
					console.log(data.data.success)
					toast.success(data.data.success)
				}
				if(data.data?.error){
					console.log(data.data.error)
					toast.error(data.data.error)
				}
			}),
			onError: ((error) =>{
				console.log(error)
			}),
			onExecute:(() =>{
				toast.loading('Starting timer...')
			})

		})

		const handleStart = () =>{
			execute({categoryId})
		}

	return ( 
		<Button 
			type="button" 
			variant={'outline'} 
			className="text-black"
			onClick={handleStart}
			// disabled={!categoryId}
			
		>
			Start
		</Button>
	)
}
 
export default TimerButton