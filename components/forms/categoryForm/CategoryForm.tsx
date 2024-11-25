"use client"

import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useAction } from 'next-safe-action/hooks'
import { categoryFormSchema, E_Colors } from '@/lib/types'

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
import ColorSelect from './ColorSelect'



const CategoryForm = () => {
	const categoryForm = useForm<z.infer<typeof categoryFormSchema>>({
		resolver: zodResolver(categoryFormSchema),
		defaultValues: {
			category: '',
			color: E_Colors.WHITE
		}
	})

	// onCreate
	// onEdit


	return (
		<Form {...categoryForm}>
			<form onSubmit={categoryForm.handleSubmit(() => console.log(categoryForm.getValues().color))} className="space-y-8">
				<FormField
					control={categoryForm.control}
					name="category"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Category Name</FormLabel>
							<FormControl>
								<div>
								<Input list='categories' placeholder="Sleep" {...field} />
								<datalist id="categories">
									<option value="Sleep" />
									<option value="Work" />
									<option value="Chores" />
									<option value="Exercise" />
									<option value="Social" />
								</datalist>
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={categoryForm.control}
					name="color"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Category Color</FormLabel>
							<FormControl>
								<ColorSelect />
							<ColorSelect />
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