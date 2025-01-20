"use client"
import { useState } from "react"

import { GoalDisplayProps, TimeLog } from "@/lib/types"
import { timeFormatString } from "@/lib/time-format"

import { backgrounds } from "@/components/providers/ThemeProvider"
import CategoryTimerCardDropDown from "./CategoryTimerCardDropDown"
import GoalCards from "./goalCard/GoalCards"
import CategoryTimerCard from "./CategoryTimerCard"

import { Button } from "@/components/ui/button"
import { Card, CardFooter, CardHeader } from "../ui/card"
import { ArrowBigLeft, ArrowBigRight, ArrowDownAz, ArrowLeft, ArrowLeftIcon, ArrowRight, CornerDownLeft, CornerDownRight } from "lucide-react"
import { Color } from "@prisma/client"
import { cn } from "@/lib/utils"

type CategoryCardProps = {
	id: string
	name: string
	color: Color
	running: boolean
	disabled: boolean
	totalTime: number
	startTime?: Date
	runningTimeLogId?: string
	goals: GoalDisplayProps[]
	timeLogs: TimeLog[]
}


const CategoryCard = ({ category }: { category: CategoryCardProps }) => {
	const [isGoalsOpen, setIsGoalsOpen] = useState(false)

	return (
		<Card className={cn(`${backgrounds[category.color]} rounded-md flex flex-col size-96 relative px-5`, isGoalsOpen ? 'w-72 sm:size-96' : 'size-64')}>
			{/* category options */}
			<div className="absolute right-0 top-0">
				<CategoryTimerCardDropDown id={category.id} name={category.name} color={category.color} />
			</div>

			<CardHeader>
				<h2 className="text-2xl font-bold tracking-wide text-center ">{category.name}</h2>
				{/* category TotalTime */}
				{!category.running
				?(
				<div className="text-center text-xs font-light">
					<p>Total Time</p>
					<time>{timeFormatString(category.totalTime, 'h', 'm', true, 's')}</time>
				</div>
				): null

				}
			</CardHeader>

			{!isGoalsOpen
				? (
					<>
						<CategoryTimerCard
							categoryId={category.id}
							running={category.running}
							runningTimeLogId={category.runningTimeLogId}
							disabled={category.disabled}
							startTime={category.startTime}
						/>
						<CardFooter>
						<Button
							onClick={() => setIsGoalsOpen(true)}
							variant={'ghost'}
							className="w-full"
						>
							<span >
								Goals
							</span>
						</Button>
						</CardFooter>
					</>
				) : (
					<>
						<GoalCards
							goals={category.goals}
							categoryId={category.id}
							color={category.color as Color}
							timeLogs={category.timeLogs}
						/>
						<CardFooter className="p-0">
						<Button
							onClick={() => setIsGoalsOpen(false)}
							variant={'ghost'}
							className="w-full mt-4"
						>
							<p>
								Timer
								</p>
						</Button>
						</CardFooter>
					</>
				)}
		</Card>
	)
}

export default CategoryCard