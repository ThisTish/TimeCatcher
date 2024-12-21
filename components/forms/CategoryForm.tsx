"use client"

import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useAction } from 'next-safe-action/hooks'
import { categoryFormSchema, E_Colors } from '@/lib/types'
import { createCategory } from '@/server/actions/category/create-category'

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
import { getCategory } from '@/server/actions/category/get-categories'
import { useEffect, useState } from 'react'
import { Color } from '@prisma/client'
import { backgrounds } from '../providers/ThemeProvider'

const colorItems = Object.values(E_Colors).filter(color => color !== E_Colors.WHITE)

type CategoryFormProps = {
	id?: string
	categoryName?: string
	categoryColor?: E_Colors
}

const CategoryForm = ({ id, categoryName, categoryColor }: CategoryFormProps) => {
	const [mode, setMode] = useState<'create' | 'edit'>('create')

	const categoryForm = useForm<z.infer<typeof categoryFormSchema>>({
		resolver: zodResolver(categoryFormSchema),
		defaultValues: {
			name: '',
			color: E_Colors.WHITE
		},
		mode: 'onChange'
	})

	useEffect(() =>{
		console.log(categoryColor)
		if(id && categoryName && categoryColor){
			categoryForm.setValue('name', categoryName)
			categoryForm.setValue('color', categoryColor)
			categoryForm.setValue('id', id)
		}

	}, [id, categoryName, categoryColor])


	const router = useRouter()

	// const findEditableCategory = async (id: string) => {
	// 	if (id) {
	// 		const data = await getCategory(id)

	// 		if (data.error) {
	// 			toast.error(data.error)
	// 			router.push('/timers')
	// 			return
	// 		}

	// 		if (data.success) {
	// 			categoryForm.setValue('name', data.success[0].name)
	// 			categoryForm.setValue('color', data.success[0].color)
	// 			categoryForm.setValue('id', data.success[0].id)
	// 		}
	// 	}
	// }

	// useEffect(() => {
	// 	if (id) {
	// 		findEditableCategory(id)
	// 	}
	// }, [id])

	const { execute, result, isExecuting, hasErrored, hasSucceeded } = useAction(createCategory, {
		onSuccess: (data) => {
			if (data.data?.success) {
				router.push('/timers')
				if (mode === 'edit') {
					toast.success(data.data.success, {
						description: 'Update successful! If you are finished, click Done to close the form'
					})
				}
				if (mode === 'create') {
					toast.success(data.data.success, {
						description: 'Continue to add more, or click Done to close the form'
					})
				}

				categoryForm.reset()
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
									<Input list='categories' placeholder="Name your category whatever you want" {...field} />
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
							<FormControl >
								<Select onValueChange={field.onChange} value={field.value || ''}>
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
							<Button type="submit" disabled={isExecuting}>{mode === 'create' ? 'Submit Another Category' : 'Review update'}</Button>

						}
					</>
				) : (
					<Button type="submit" disabled={isExecuting}>{id ? 'Save' : 'Create'}</Button>
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