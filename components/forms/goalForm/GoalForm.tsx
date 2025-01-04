"use client"

import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useAction } from 'next-safe-action/hooks'
import { useMemo, useState } from 'react'

import { Button } from "@/components/ui/button"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { GoalFormSchema } from '@/lib/types'
import { createGoal } from '@/server/actions/goal/create-goal'
import { Checkbox } from '@/components/ui/checkbox'
import { DualRangeSlider } from '@/components/ui/DualRangeSlider'
import { timeFormat } from '@/lib/time-format'
import { TimeFrame } from '@prisma/client'


type GoalFormProps = {
	id?: string
	categoryId?: string
	timeFrame: TimeFrame
	targetTime?: number
	reoccurring?: boolean
}

const setSliderOptions = (timeFrame: string ) => {
	const sliderOptions = useMemo(() =>{

	switch (timeFrame) {
		case 'DAY':
			return {
				min: 15*60*1000,
				max: 12*60*60*1000,
				steps: 12*60*60*1000 / 48
			}
		case 'WEEK':
			return {
				min: 30*60*1000,
				max: 7*12*60*60*1000,
				steps: 7*12*60*60*1000 / 168
			}
		case 'MONTH':
			return {
				min: 60*60*1000,
				max: 31*12*60*60*1000,
				steps: 31*12*60*60*1000 / 372
			}
		case 'YEAR':
			return {
				min: 10*60*60*1000,
				max: 365*12*60*60*1000,
				steps: 365*12*60*60*1000 / 876
			}		
			default:
				return {
					min: 10*60*60*1000,
					max: 365*12*60*60*1000,
					steps: 365*12*60*60*1000 / 4380
				}
	}
}, [timeFrame])
return sliderOptions
}



const GoalForm = ({ id, categoryId, timeFrame, targetTime, reoccurring }: GoalFormProps) => {
	const [buttonLabel, setButtonLabel] = useState('Save')
	const goalForm = useForm<z.infer<typeof GoalFormSchema>>({
		resolver: zodResolver(GoalFormSchema),
		defaultValues: {
			id: id ? id : undefined,
			categoryId: categoryId,
			timeFrame: timeFrame,
			targetTime: id ? targetTime : setSliderOptions(timeFrame).min,
			reoccurring: id ? reoccurring : false,
		},
		mode: 'onChange'
	})

	const sliderTargetTimeLabel = () =>{
		const { hours, minutes } = timeFormat(goalForm.getValues('targetTime') / 1000)
		if(timeFrame === 'MONTH' || timeFrame === 'YEAR'){
			return `${hours}hr`
		}
		if(hours <= 0){
			return `${minutes}min`
		}
		return `${hours}hr ${minutes}min`
	}


	const router = useRouter()

	const { execute, isExecuting, result, hasErrored, hasSucceeded } = useAction(createGoal, {
		onSuccess: (data) => {
			if (data.data?.success) {
				router.push('/timers')

				if (id) {
					toast.success(data.data.success, {
						description: 'Update successful! If you are finished, click Done to close the form'
					})

					setButtonLabel('Save new updates')
				}
				if (!id) {
					toast.success(data.data.success, {
						description: 'Continue to add more, or click Done to close the form'
					})
					goalForm.reset()
				}

			}

			if (data.data?.error) {
				toast.error(data.data.error)
				console.log(data.data.error)
			}
			return
		},
		onError: (error) => {
			console.log(error)
		},
		onExecute: () => {
			if (id) {
				const updatingToast = toast.loading('Updating goal...')
				setTimeout(() => {
					toast.dismiss(updatingToast)
				}, 3000)
			}
			if (!id) {
				const creatingToast = toast.loading('Creating goal...')
				setTimeout(() => {
					toast.dismiss(creatingToast)
				}, 3000)
			}
		}
	})

	const onSubmit = (values: z.infer<typeof GoalFormSchema>) => {
		execute(values)
	}

	

	return (
		<Form {...goalForm}>
			<form onSubmit={goalForm.handleSubmit(onSubmit)} className="space-y-8">

				{/* TargetTime */}
				<FormField
					control={goalForm.control}
					name="targetTime"
					render={({ field }) => (
						<FormItem >
							<FormLabel>Target Time</FormLabel>
							<FormControl>
								{/* slider */}
								<DualRangeSlider
									className='py-10'
									label={() => `${sliderTargetTimeLabel()}`}
									value={[field.value]}
									min={setSliderOptions(timeFrame).min}
									max={setSliderOptions(timeFrame).max}
									step={setSliderOptions(timeFrame).steps}
									onValueChange={(value) => field.onChange(value[0])}
								/>
								
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Reoccurring */}
				<FormField
					control={goalForm.control}
					name="reoccurring"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Reoccurring? </FormLabel>
							<FormControl >
								<Checkbox id='reoccurring' checked={field.value} onCheckedChange={field.onChange} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{hasSucceeded || hasErrored ? (
					<>
						{hasErrored || result.data?.error &&
							<Button type="submit" disabled={isExecuting}>Try Again</Button>
						}
						{hasSucceeded && result.data?.success &&
							<Button type="submit" disabled={isExecuting}>{buttonLabel}</Button>

						}
					</>
				) : (
					<Button type="submit" >{id ? 'Save' : 'Add'}</Button>
				)} 


			</form>
		</Form >
	)
}


export default GoalForm


