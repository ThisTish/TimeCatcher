"use client"

import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useAction } from 'next-safe-action/hooks'
import { categoryFormSchema, } from '@/lib/types'
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
import { useEffect, useState } from 'react'
import { Color } from '@prisma/client'
import { backgrounds } from '../providers/ThemeProvider'

const colorItems = Object.values(Color).filter(color => color !== Color.WHITE)


type CategoryFormProps = {
	id?: string
	categoryName?: string
	categoryColor?: Color
}

const CategoryForm = ({ id, categoryName, categoryColor }: CategoryFormProps) => {
	const [buttonLabel, setButtonLabel] = useState('Add another')
	const [isDisabled, setIsDisabled] = useState(false)

	const categoryForm = useForm<z.infer<typeof categoryFormSchema>>({
		resolver: zodResolver(categoryFormSchema),
		defaultValues: {
			id: id ? id : undefined,
			name: id ? categoryName : '',
			color: id ? categoryColor : Color.WHITE
		},
		mode: 'onChange'
	})


	const router = useRouter()



	const { execute, result, isExecuting, hasErrored, hasSucceeded } = useAction(createCategory, {
		onSuccess: (data) => {
			if (data.data?.success) {
				router.push('/timers')

				if (id) {
					toast.success(data.data.success, {
						description: 'Update successful! If you are finished, click Done to close the form'
					})
					setIsDisabled(true)
					setButtonLabel('Save new updates')
				}
				if (!id) {
					toast.success(data.data.success, {
						description: 'Continue to add more, or click Done to close the form'
					})
					setIsDisabled(true)
					categoryForm.reset()
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
							<FormControl
								onChange={() => setIsDisabled(false)}
							>
								<div>
									<Input
										list='categories'
										placeholder="Name your category whatever you want"
										{...field} />
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
								<Select onValueChange={field.onChange} value={field.value}>
									<SelectTrigger >
										<SelectValue placeholder={<WhiteSelectItem label={'white'} />} />
									</SelectTrigger>
									<SelectContent>
										<SelectItem defaultValue={Color.WHITE} value={Color.WHITE}>
											<div className={`size-5 bg-WHITE border-gray border inline-block mr-3 -mb-1 rounded-sm`}></div>
											{Color.WHITE.toLowerCase()}
										</SelectItem>
										{colorItems.map((color) => (
											<SelectItem key={color} value={color}>
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
							<Button type="submit" disabled={isExecuting || isDisabled}>{buttonLabel}</Button>

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