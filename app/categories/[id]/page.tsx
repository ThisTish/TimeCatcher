"use client"

import { cn } from "@/lib/utils"
import { getCategory } from "@/server/actions/category/get-categories"
import { $Enums } from "@prisma/client"
import Link from "next/link"
import { notFound, useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import AddTimeLogForm from "@/components/categoryPage/AddTimeLogForm"
import TimeLogTable from "@/components/categoryPage/TimeLogTable"
import { backgrounds, textColor } from "@/components/providers/ThemeProvider"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

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

	if (!categoryId) throw notFound

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
		<main>
			<header className="flex justify-between">
				<h1 className={cn('text-7xl text-white font-bold', category?.color ? textColor[category.color] : 'text-primary ')}>{category?.name}</h1>

				{/* Back Button to timers*/}
				<Button
					variant={'outline'}>
					<Link href="/timers" className="inline-flex gap-1 items-center">
						<ArrowLeft />
						<span className="text-sm">Back to timers</span>
					</Link>
				</Button>
			</header>

			{/* timeLogs */}
			{category?.timeLogs.length === 0 || !category?.timeLogs
				? (
					<AddTimeLogForm categoryId={category?.id ?? ''} />
				) : (
					<TimeLogTable timeLogs={category?.timeLogs} />
				)
			}

		</main>
	)
}

export default CategoryPage

// * idea to go to next or previous category buttons at bottom with category names in buttons

// * timer
// const startTime = category?.timeLogs.find((timelog) => timelog.running)?.startTime
// need timer context i suppose for re-rendering & making sure it is the only category timer running
// <CategoryPageTimer startTime={startTime ?? null} categoryId={category?.id ?? categoryId[0]}/>