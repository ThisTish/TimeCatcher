"use client"

import { cn } from "@/lib/utils"
import { getCategory } from "@/server/actions/category/get-categories"
import Link from "next/link"
import { notFound, useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import AddTimeLogForm from "@/components/categoryPage/timeLogTable/AddTimeLogForm"
import TimeLogTable from "@/components/categoryPage/timeLogTable/TimeLogTable"
import { backgrounds, shadowColor, textColor } from "@/components/providers/ThemeProvider"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

import { toast } from "sonner"
import CategoryTotalTimes from "@/components/categoryPage/CategoryTotalTimes"
import { Category } from "@/lib/types"
import CompletedGoals from "@/components/categoryPage/CompletedGoals"
import ActivityChart from "@/components/categoryPage/ActivityChart"
import GoalDisplay from "@/components/categoryCards/goalCard/GoalDisplay"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"



const CategoryPage = () => {
	const router = useRouter()
	const categoryId = useParams().id
	const [category, setCategory] = useState<Category>()

	if (!categoryId) return notFound()

	const detailedCategory = async (categoryId: string) => {
		const data = await getCategory(categoryId)
		if (data.error) {
			router.push('/timers')
			toast.error(data.error)
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

	if (!detailedCategory || !category) return <div>Loading...</div>

	const activeGoals = category.goals.filter((goal) => goal.active)

	return (
		<main className="flex flex-col items-center gap-10" >
			<h1 className={cn('text-7xl text-white font-bold self-start', category?.color ? textColor[category.color] : 'text-primary ')}>{category?.name}</h1>

			{/* Back Button to timers*/}
			<Button className={cn("sticky top-2 right-2 self-end z-10 opacity-80 backdrop-blur-sm font-bold", category?.color ? backgrounds[category.color] : ' ', "text-black")}>
				<Link href="/timers" className="inline-flex gap-1 items-center">
					<ArrowLeft />
					<span className="text-sm">Back to timers</span>
				</Link>
			</Button>

			{/* TotalTimes */}
			<div className="flex flex-wrap gap-10">
				{category.timeLogs.length === 0 || !category.timeLogs
					? (
						<Card className={`p-5 shadow-md ${shadowColor[category.color]} `}>
							<CardHeader>
								<CardTitle>
									<h2>Time Caught </h2>
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-xl py-10">No time caught yet</p>
							</CardContent>
							<CardFooter>
								<p>Go catch some time in {category.name}!</p>
							</CardFooter>
						</Card>
					) : (
						<CategoryTotalTimes timeLogs={category.timeLogs} color={category.color} />
					)
				}

				{/* completed goals */}
				<CompletedGoals goals={category.goals} categoryId={category.id} timeLogs={category.timeLogs} />

				{/* active goals */}
				<Card>
					<CardHeader>
						<h2>Active Goals</h2>
					</CardHeader>
					<CardContent>
						{activeGoals.length === 0 || !activeGoals
							? (
								<p>No active goals</p>
							) : (
								activeGoals.map((goal) =>
									<GoalDisplay
										key={goal.id}
										{...goal}
									/>
								)
							)}


					</CardContent>
				</Card>


			</div>


			<div
				className="flex flex-wrap"
			>
				{/* activity Chart */}
				<ActivityChart timeLogs={category.timeLogs} color={category?.color} />

				{/* timeLogs */}
				{category.timeLogs.length === 0 || !category.timeLogs
					? (
						<AddTimeLogForm categoryId={category.id} />
					) : (
						<TimeLogTable timeLogs={category.timeLogs} />
					)
				}
			</div>
		</main>
	)
}


export default CategoryPage

// * idea to go to next or previous category buttons at bottom with category names in buttons

// * timer
// const startTime = category?.timeLogs.find((timelog) => timelog.running)?.startTime
// need timer context i suppose for re-rendering & making sure it is the only category timer running
// <CategoryPageTimer startTime={startTime ?? null} categoryId={category?.id ?? categoryId[0]}/>


{/* For testing editing goals purposes*/ }
{/* <FormContainer
		className=" border-none -mr-1 p-0  h-fit z-10"
		title="Edit goal"
		openButtonLabel={
			<Edit className="" aria-label="Edit" />
		}
	>
		<GoalForm timeFrame={"DAY"} targetTime={900000} reoccurring={false} categoryId={categoryId[0]} />
	</FormContainer> */}