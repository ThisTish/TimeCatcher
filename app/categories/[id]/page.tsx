"use client"

import { cn } from "@/lib/utils"
import { getCategory } from "@/server/actions/category/get-categories"
import Link from "next/link"
import { notFound, useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import AddTimeLogForm from "@/components/categoryPage/timeLogTable/AddTimeLogForm"
import TimeLogTable from "@/components/categoryPage/timeLogTable/TimeLogTable"
import { textColor } from "@/components/providers/ThemeProvider"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

import { toast } from "sonner"
import CategoryTotalTimes from "@/components/categoryPage/CategoryTotalTimes"
import { checkCompletionAndUpdateGoal, checkDateAndUpdateGoal } from "@/server/actions/goal/check-and-update-goal"
import { Category } from "@/lib/types"
import CompletedGoals from "@/components/categoryPage/CompletedGoals"



const CategoryPage = () => {
	const router = useRouter()
	const categoryId = useParams().id
	const [category, setCategory] = useState<Category>()

	if (!categoryId) return notFound()

	const detailedCategory = async (categoryId: string) => {
		const data = await getCategory(categoryId)
		if (data.error) {
			toast.error(data.error)
			router.push('/timers')
			return
		}

		if (data.success) {
			const categoryData = data.success
			checkCompletionAndUpdateGoal(categoryData.id)
			checkDateAndUpdateGoal(categoryData.id)
			setCategory(categoryData)
		}
	}

	useEffect(() => {
		if (categoryId) {
			detailedCategory(categoryId.toString())
		}
	}, [])

	if (!detailedCategory || !category) return <div>Loading...</div>

	return (
		<main >
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

			{/* TotalTimes */}
			{category.timeLogs.length === 0 || !category.timeLogs
				? (<div>
					<p>No time caught yet. Check back for total times.</p>
				</div>
				) : (
					<CategoryTotalTimes timeLogs={category.timeLogs} />
				)
			}

			{/* completed goals */}
			<div>
				<CompletedGoals goals={category.goals} categoryId={category.id} />
			</div>


			{/* timeLogs */}
			{category.timeLogs.length === 0 || !category.timeLogs
				? (
					<AddTimeLogForm categoryId={category.id} />
				) : (
					<TimeLogTable timeLogs={category.timeLogs} />
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