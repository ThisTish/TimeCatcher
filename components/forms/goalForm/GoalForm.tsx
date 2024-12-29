"use client"

import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useAction } from 'next-safe-action/hooks'
import { useEffect, useState } from 'react'

import { Button } from "@/components/ui/button"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { GoalFormSchema } from '@/lib/types'
import { createGoal } from '@/server/actions/goal/createGoal'
import { Checkbox } from '@/components/ui/checkbox'



type GoalFormProps = {
	id?: string
	categoryId?: string
	timeFrame?: 'day' | 'week' | 'month' | 'year'
	targetTime?: number
	reoccurring?: boolean
	active?: boolean
}

const GoalForm = ({ id, categoryId, timeFrame, targetTime, reoccurring, active }: GoalFormProps) => {
	const [buttonLabel, setButtonLabel] = useState('Add another')

	const goalForm = useForm<z.infer<typeof GoalFormSchema>>({
		resolver: zodResolver(GoalFormSchema),
		defaultValues: {
			id: id ? id : undefined,
			categoryId: id ? categoryId : '',
			timeFrame: id ? timeFrame : 'day',
			targetTime: id ? targetTime : 0,
			reoccurring: id ? reoccurring : false,
			active: id ? active : true
		},
		mode: 'onChange'
	})

	const router = useRouter()

	const { execute, result, isExecuting, hasErrored, hasSucceeded } = useAction(createGoal, {
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
				const updatingToast = toast.loading('Updating category...')
				setTimeout(() => {
					toast.dismiss(updatingToast)
				}, 3000)
			}
			if (!id) {
				const creatingToast = toast.loading('Creating category...')
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
						<FormItem>
							<FormLabel>TargetTime</FormLabel>
							<FormControl>
								{/* slider */}
									<Input {...field} type='range' />
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
							<FormLabel>Reoccurring?</FormLabel>
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
					<Button type="submit" disabled={isExecuting}>{id ? 'Save' : 'Create'}</Button>
				)}


			</form>
		</Form >
	)
}


export default GoalForm


