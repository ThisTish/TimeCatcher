"use client"

import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useAction } from 'next-safe-action/hooks'
import { categoryFormSchema } from '@/lib/types'

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
import CategoryFormContainer from './CategoryFormContainer'



const CategoryForm = () => {
	const categoryForm = useForm<z.infer<typeof categoryFormSchema>>({
		resolver: zodResolver(categoryFormSchema),
		defaultValues: {
			category: '',
			color: 'WHITE'
		}
	})

	// onCreate
	// onEdit


	return (
		<Form {...categoryForm}>
			<form onSubmit={categoryForm.handleSubmit(() => console.log('form'))} className="space-y-8">
				<FormField
					control={categoryForm.control}
					name="category"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Category Name</FormLabel>
							<FormControl>
								<Input placeholder="Sleep" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Submit</Button>
			</form>
		</Form>
	)
}


export default CategoryForm