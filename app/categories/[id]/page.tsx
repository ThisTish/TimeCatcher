"use client"

import { cn } from "@/lib/utils"
import { getCategory } from "@/server/actions/category/get-categories"
import { $Enums } from "@prisma/client"
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
import { GoalDisplayProps } from "@/lib/types"


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
	goals: GoalDisplayProps
}


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
			checkDateAndUpdateGoal(categoryData.id)
			checkCompletionAndUpdateGoal(categoryData.id)
			setCategory(categoryData)
		}
	}

	useEffect(() => {
		if (categoryId) {
			detailedCategory(categoryId.toString())
		}
	}, [])

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
			{category?.timeLogs.length === 0 || !category?.timeLogs
				? (<div>
					<p>No time caught yet. Check back for total times.</p>
				</div>
				) : (
					<CategoryTotalTimes timeLogs={category.timeLogs} />
				)
			}

			{/* timeLogs */}
			{category?.timeLogs.length === 0 || !category?.timeLogs
				? (
					<AddTimeLogForm categoryId={category?.id ?? ''} />
				) : (
					<TimeLogTable timeLogs={category?.timeLogs} />
				)
			}

			{category?.goals && category.goals.length > 0 && category.goals.map((goal) => (
				<div key={goal.id}>
					<p className="text-xl font-bold">{goal.timeFrame}</p>

					{goal.completed
						? (
							<p className="grid">
								<span className="text-sm">{goal.startDate.toDateString()} - {goal.endDate.toDateString()}</span>
								<span className="font-semibold tracking-widest">Completed!</span>
							</p>
						) : <p>Not completed</p>}

				</div>

			))}


		</main>
	)
}


export default CategoryPage

// * idea to go to next or previous category buttons at bottom with category names in buttons

// * timer
// const startTime = category?.timeLogs.find((timelog) => timelog.running)?.startTime
// need timer context i suppose for re-rendering & making sure it is the only category timer running
// <CategoryPageTimer startTime={startTime ?? null} categoryId={category?.id ?? categoryId[0]}/>