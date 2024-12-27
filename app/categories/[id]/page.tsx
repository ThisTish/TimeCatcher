"use client"

import AddTimeLogForm from "@/components/categoryPage/AddTimeLogForm"
import TimeLogTable from "@/components/categoryPage/TimeLogTable"
import { backgrounds, textColor } from "@/components/providers/ThemeProvider"
import { Button } from "@/components/ui/button"
import { categoryFormSchema } from "@/lib/types"
import { cn } from "@/lib/utils"
import { getCategory } from "@/server/actions/category/get-categories"
import { $Enums } from "@prisma/client"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import { toast } from "sonner"

type Category = {
	id: string
	name: string
	color: $Enums.Color
	timeLogs: {
		id: string
		userId: string
		categoryId: string
		startTime: Date
		endTime: Date | null
		timePassed: number
		running: boolean
	}[]
}

type Color = keyof typeof backgrounds

const CategoryPage = () => {
	const router = useRouter()
	const categoryId = useParams().id
	const [category, setCategory] = useState<Category>()

	const detailedCategory = async (categoryId: string) => {
		const data = await getCategory(categoryId)
		if (data.error) {
			toast.error(data.error)
			router.push('/timers')
			return
		}
		if (data.success) {
			const categoryData = data.success
			setCategory(categoryData)
		}
	}

	useEffect(() => {
		if (categoryId) {
			detailedCategory(categoryId.toString())
		}
	}, [])


	return (
			<>
			<h1 className={cn('text-7xl text-white font-bold', category?.color ? textColor[category.color] : 'text-primary ')}>{category?.name}</h1>
			<Link href="/timers" className="rounded-md border-2 border-black p-2 font-bold inline-flex">
				<ArrowLeft />
				<span>Back to timers</span>
			</Link>
			<p>{category?.color}</p>
			{category?.timeLogs.length === 0 || !category?.timeLogs ? (

				<AddTimeLogForm categoryId={category?.id ?? ''} />
			) : (<>
				<TimeLogTable timeLogs={category?.timeLogs} />
			</>
			)
			}
		
	</>
	)
}

export default CategoryPage