"use client"

import { backgrounds } from "@/components/providers/ThemeProvider"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { GoalDisplayProps, TimeLog } from "@/lib/types"
import { Color, TimeFrame } from "@prisma/client"
import GoalDisplay from "./GoalDisplay"
import getTotalTime from "@/server/actions/timer/getTotalTime"
import { useEffect, useState } from "react"
import GoalDisplayEmpty from "./GoalDisplayEmpty"
import getTotals from "@/lib/totals-by-timeFrame"
import { cn } from "@/lib/utils"

type GoalCardProps = {
	categoryId: string
	color: Color
	goals: GoalDisplayProps[]
	timeLogs?: TimeLog[]
}

const GoalCards = ({ goals, color, categoryId, timeLogs, showTitle=true, showBackground=true }: GoalCardProps & {showTitle?: boolean, showBackground?: boolean}) => {


	const activeGoals = goals.filter((goal) => goal.active)

	// Generate goal display slots
	const slots = Object.values(TimeFrame).map((timeFrame) => {
		const goal = activeGoals.find((goal) => goal.timeFrame === timeFrame)

		if (goal) {
			const totalTimeByPeriod = getTotals(goal.timeFrame, timeLogs ?? [])
			return (
				<GoalDisplay
					key={goal.id}
					id={goal.id}
					categoryId={categoryId}
					timeFrame={timeFrame}
					timePassed={totalTimeByPeriod}
					targetTime={goal.targetTime}
					active={goal.active}
					reoccurring={goal.reoccurring}
					completed={goal.completed}
				/>
			)
		}

		return (
			<GoalDisplayEmpty key={timeFrame} timeFrame={timeFrame} categoryId={categoryId} />
		)
	})

	return (
		<div className={cn("mx-auto rounded-md size-64 grid border-0 bg-transparent w-full", showBackground ? `${backgrounds[color]} -mt-16` : 'mt-0')}>
		{/* <Card className={cn(showBackground ? `${backgrounds[color]} -mt-16` : 'bg-card mt-0') + ` mx-auto rounded-md size-64 grid border-0`}> */}
			<div className="w-full px-2 flex flex-col gap-2 items-center">
				{showTitle 
				? (
					<h3 className="text-lg font-semibold">Goals</h3>
				): null}
				
				{slots}
			</div>
		</div>
	)
}

export default GoalCards
