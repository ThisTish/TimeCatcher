"use client"
import { useState } from "react"

import { GoalDisplayProps, TimeLog } from "@/lib/types"
import { timeFormatString } from "@/lib/time-format"

import { backgrounds } from "@/components/providers/ThemeProvider"
import CategoryTimerCardDropDown from "./CategoryTimerCardDropDown"
import GoalCards from "./goalCard/GoalCards"
import CategoryTimerCard from "./CategoryTimerCard"

import { Button } from "@/components/ui/button"
import { Card, CardHeader } from "../ui/card"
import { CornerDownLeft, CornerDownRight } from "lucide-react"
import { Color } from "@prisma/client"

type CategoryCardProps = {
	id: string
	name: string
	color: Color
	running: boolean
	disabled: boolean
	totalTime: number
	startTime?: Date
	runningTimeLogId?: string
	goals: GoalDisplayProps
	timeLogs: TimeLog[]
}


const CategoryCard = ({ category }: { category: CategoryCardProps }) => {
	const [isGoalsOpen, setIsGoalsOpen] = useState(false)

	return (
		<Card className={`${backgrounds[category.color]} rounded-md size-80 flex flex-col justify-around relative`}>
			{/* category options */}
			<div className="absolute right-0 top-0">
				<CategoryTimerCardDropDown id={category.id} name={category.name} color={category.color} />
			</div>

			<CardHeader>
				<h2 className="text-2xl font-bold tracking-wide text-center">{category.name}</h2>
				{/* category TotalTime */}
				<div className="text-center text-xs font-light">
					<p>Total Time</p>
					<time>{timeFormatString({ time: category.totalTime, h: 'h', m: 'm', s: 's', includeSeconds: true })}</time>
				</div>
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
						<Button
							className="inline-flex absolute bottom-0"
							onClick={() => setIsGoalsOpen(true)}
							variant={'link'}
						>
							<span className="inline-flex text-sm gap-1 items-center"><CornerDownLeft />Goals</span>
						</Button>
					</>
				) : (
					<>
						<GoalCards
							goals={category.goals}
							categoryId={category.id}
							color={category.color as Color}
							timeLogs={category.timeLogs}
						/>
							<Button
								className="absolute bottom-0 right-0"
								onClick={() => setIsGoalsOpen(false)}
								variant={'link'}
							>
								<span className="inline-flex text-sm gap-1 items-center">Timer<CornerDownRight /></span>
							</Button>
					</>
				)}
		</Card>
	)
}

export default CategoryCard