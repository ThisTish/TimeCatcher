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
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"


const AddTimeLogForm = ({categoryId}:{categoryId: string}) => {

	const timeLogForm = useForm<z.infer<typeof TimeLogSchema>>({
		resolver: zodResolver(TimeLogSchema),
		defaultValues: {
			startTime: new Date(),
			endTime: null,
			categoryId
		}
	})


	return (
		<Accordion type="single" collapsible>
			<AccordionItem value="item-1">
				<AccordionTrigger>Add Timelog</AccordionTrigger>
				<AccordionContent>
					<Form {...timeLogForm}>
						<form onSubmit={timeLogForm.handleSubmit(()=> console.log(`handleSubmit`))} className="space-y-8">
							<FormField
								control={timeLogForm.control}
								name="startTime"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Username</FormLabel>
										<FormControl>
											<Input 
												type="datetime-local"
											{...field}
											value={field.value ? new Date(field.value).toISOString().slice(0, 16) : ''} />
										</FormControl>
										<FormDescription>
											This is your public display name.
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button type="submit">Submit</Button>
						</form>
					</Form>
				</AccordionContent>
			</AccordionItem>
		</Accordion>

	)
}

export default AddTimeLogForm