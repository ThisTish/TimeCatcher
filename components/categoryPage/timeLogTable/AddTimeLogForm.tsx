"use client"
import { TimeLogSchema } from "@/lib/types"
import * as z from 'zod'

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion"
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
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAction } from "next-safe-action/hooks"
import addTimelog from "@/server/actions/timer/add-timeLog"
import { toast } from "sonner"
import toLocalIsoString from "@/lib/to-Local-ISO-String"

const AddTimeLogForm = ({ categoryId }: { categoryId: string }) => {


	const timeLogForm = useForm<z.infer<typeof TimeLogSchema>>({
		resolver: zodResolver(TimeLogSchema),
		defaultValues: {
			startTime: new Date(),
			endTime: null,
			categoryId
		}
	})

	const { execute, status } = useAction(addTimelog, {
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

	const onStartBlur = () => {
		const startDate = new Date(timeLogForm.getValues('startTime'))
		timeLogForm.setValue('startTime', startDate)
	}

	const onEndBlur = () => {
		const endTimeValue = timeLogForm.getValues('endTime')
		if (!endTimeValue) return toast.error('You must provide an end time')
		const endDate = new Date(endTimeValue)
		timeLogForm.setValue('endTime', endDate)

	}


	return (
		<Accordion type="single" collapsible>
			<AccordionItem value="Add Timelog">
				<AccordionTrigger>Add Timelog</AccordionTrigger>
				<AccordionContent>
					<Form {...timeLogForm}>
						<form onSubmit={timeLogForm.handleSubmit(execute)} className="flex">
							{/* start time */}
							<FormField
								control={timeLogForm.control}
								name="startTime"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Start Time</FormLabel>
										<FormControl>
											<Input
												type="datetime-local"
												{...field}
												value={field.value ? toLocalIsoString(new Date(field.value)) : ''}
												onBlur={onStartBlur}
												onChange={(e) => field.onChange(toLocalIsoString(new Date(e.target.value)))} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							{/* endTime */}
							<FormField
								control={timeLogForm.control}
								name="endTime"
								render={({ field }) => (
									<FormItem>
										<FormLabel>End Time</FormLabel>
										<FormControl>
											<Input
												type="datetime-local"
												{...field}
												value={field.value ? toLocalIsoString(new Date(field.value)) : ''}
												onBlur={onEndBlur}
												onChange={(e) => field.onChange(toLocalIsoString(new Date(e.target.value)))} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button
								type="submit"
							>
								Submit
							</Button>
						</form>
					</Form>
				</AccordionContent>
			</AccordionItem>
		</Accordion>

	)
}

export default AddTimeLogForm