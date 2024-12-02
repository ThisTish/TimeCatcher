"use client"

import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useAction } from 'next-safe-action/hooks'
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
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { getCategory } from '@/server/actions/get-categories'
import { useEffect } from 'react'
import { Color } from '@prisma/client'
import { backgrounds } from '../providers/ThemeProvider'

const colorItems = Object.values(E_Colors).filter(color => color !== E_Colors.WHITE)

const CategoryForm = ({ id }: { id?: string }) => {
	const categoryForm = useForm<z.infer<typeof categoryFormSchema>>({
		resolver: zodResolver(categoryFormSchema),
		defaultValues: {
			name: '',
			color: E_Colors.WHITE
		},
		mode: 'onChange'
	})

	const router = useRouter()

	const findEditableCategory = async (id: string) => {
		if (id) {
			const data = await getCategory(id)

			if (data.error) {
				toast.error(data.error)
				router.push('/')
				return
			}

			if (data.success) {
				categoryForm.setValue('name', data.success[0].name)
				categoryForm.setValue('color', data.success[0].color)
				categoryForm.setValue('id', data.success[0].id)
			}
		}
	}

	useEffect(() => {
		if (id) {
			findEditableCategory(id)
		}
	}, [id])
	// const description = mode === 'create' ? 'Continue to add more, or click Done to close the form' : 'Update successful! If you are finished, click Done to close the form'

	const { execute, result, isExecuting, hasErrored, hasSucceeded } = useAction(createCategory, {
		onSuccess: (data) => {
			if (data.data?.success) {
				router.push('/')
				categoryForm.reset()
				toast.success(data.data.success)
			}
			if (data.data?.error) {
				toast.error(data.data.error)
				console.log(data.data.error)
			}
		},
		onError: (error) => {
			console.log(error)
		}
	})

	const onSubmit = (values: z.infer<typeof categoryFormSchema>) => {
		execute(values)
	}


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
										<SelectItem defaultValue={E_Colors.WHITE} value={E_Colors.WHITE}>
											<div className={`size-5 bg-WHITE border-gray border inline-block mr-3 -mb-1 rounded-sm`}></div>
											{E_Colors.WHITE.toLowerCase()}
										</SelectItem>
										{colorItems.map((color, index) => (
											<SelectItem key={index} value={(color)}>
												<div className={`size-5 ${backgrounds[color.toUpperCase() as Color]} inline-block mr-3 -mb-1 rounded-sm`}></div>
												{color.valueOf().toLowerCase()}
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