"use client"

import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useAction } from 'next-safe-action/hooks'
import { categoryFormSchema, E_Colors } from '@/lib/types'
import { HSLColor } from 'react-color'

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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { TwitterPicker } from 'react-color'
import React from 'react'

const colorItems = Object.values(E_Colors)

console.log('E_Colors', (colorItems))


const CategoryForm = () => {
	const categoryForm = useForm<z.infer<typeof categoryFormSchema>>({
		resolver: zodResolver(categoryFormSchema),
		defaultValues: {
			category: '',
			color: E_Colors.white
		}
	})




	// onCreate
	// onEdit


	return (
		<Form {...categoryForm}>
			<form onSubmit={categoryForm.handleSubmit(() => console.log(categoryForm.getValues()))} className="space-y-8">
			
			{/* Name */}
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

				{/* Color */}
				<FormField
					control={categoryForm.control}
					name="color"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Category Color</FormLabel>
							<FormControl>
								<Select onValueChange={field.onChange} required>
									<SelectTrigger >
										<SelectValue placeholder="Color" />
									</SelectTrigger>
									<SelectContent>
										{colorItems.map((color, index) =>(
										<SelectItem key={index} value={color}>	
											<div  className={`size-5 bg-${color} inline-block mr-3 -mb-1 rounded-sm`}></div>
											{color}
										</SelectItem>
									))}
									</SelectContent>
								</Select>
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



	// const colorValues: HSLColor[] = [
	// 	{ h: 212, s: 96, l: 78 },
	// 	{ h: 142, s: 77, l: 73 },
	// 	{ h: 50, s: 98, l: 64 },
	// 	{ h: 27, s: 96, l: 65 },
	// 	{ h: 0, s: 91, l: 71 },
	// 	{ h: 329, s: 86, l: 70 },
	// 	{ h: 270, s: 95, l: 75 },
	// 	{ h: 0, s: 0, l: 0 },
	// 	{ h: 0, s: 0, l: 100 },
	// 	{ h: 216, s: 12, l: 84 }
	// ];