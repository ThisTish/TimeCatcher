"use client"

import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useAction } from 'next-safe-action/hooks'
import { useEffect } from 'react'
import { useToast } from "@/hooks/use-toast"
import { categoryFormSchema, E_Colors } from '@/lib/types'
import { createCategory } from '@/server/actions/create-category'

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

const colorItems = Object.values(E_Colors).filter(color => color !== E_Colors.white)

const CategoryForm = ({ mode }: { mode: 'create' | 'edit' }) => {
	const categoryForm = useForm<z.infer<typeof categoryFormSchema>>({
		resolver: zodResolver(categoryFormSchema),
		defaultValues: {
			name: '',
			color: E_Colors.white
		}
	})

	const { toast } = useToast()

	const action = mode === 'create' ? createCategory : async () => {
		console.log('editCategory');
		return undefined;
	}
	const description = mode === 'create' ? 'Continue to add more, or click Done to close the form' : 'Update successful! If you are finished, click Done to close the form'

	const { execute, result, isExecuting, hasErrored, hasSucceeded } = useAction(action)

	const onSubmit = (values: z.infer<typeof categoryFormSchema>) => {
		execute(values)
	}

	useEffect(() => {
		if(result.data?.success){
			toast({
				title: `${result.data?.success}`,
				description: description,
				variant: 'success'
			})
			categoryForm.reset()
			
			console.log('success', result.data?.success)
		}
		if(result.data?.error){
			toast({
				title: `${result.data?.error}`,
				description: "Try again or refresh page",
				variant: 'destructive'
			})
			console.log('error', result.data?.error)

		}
	
		if (hasErrored) {
			toast({
				title: `${result.data?.error}`,
				description: "Try again or refresh page",
				variant: 'destructive'
			})
			console.log('error', result.data?.error)
	
		}

	}, [result.data])

		// onCreate
		// onEdit

	
	return (
		<Form {...categoryForm}>
			<form onSubmit={categoryForm.handleSubmit(onSubmit)} className="space-y-8">

				{/* Name */}
				<FormField
					control={categoryForm.control}
					name="name"
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
								<Select onValueChange={field.onChange}>
									<SelectTrigger >
										<SelectValue placeholder={<WhiteSelectItem label={'white'} />} />
									</SelectTrigger>
									<SelectContent>
										<SelectItem defaultValue={E_Colors.white} value={E_Colors.white}>
											<div className={`size-5 bg-white border-gray border inline-block mr-3 -mb-1 rounded-sm`}></div>
											{E_Colors.white}
										</SelectItem>
										{colorItems.map((color, index) => (
											<SelectItem key={index} value={color}>
												<div className={`size-5 bg-${color} inline-block mr-3 -mb-1 rounded-sm`}></div>
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

			{hasSucceeded || hasErrored ? (
				<>
					{hasErrored || result.data?.error && 
						<Button type="submit" disabled={isExecuting}>Try Again</Button>
					}
					{hasSucceeded && result.data?.success &&
						<Button type="submit" disabled={isExecuting}>Submit Another Category</Button>
					}
				</>
			) : (
				<Button type="submit" disabled={isExecuting}>Submit</Button>
			)}


		</form>
		</Form >
	)
}


export default CategoryForm


const WhiteSelectItem = ({ label }: { label: string }) => {
	return (
		<>
			<div className={`size-5 bg-white border-gray border inline-block mr-3 -mb-1 rounded-sm`}></div>
			{label}
		</>
	)
}