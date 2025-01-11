"use client"

import { backgrounds } from "@/components/providers/ThemeProvider"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {  GoalDisplayProps, TimeLog } from "@/lib/types"
import { Color, TimeFrame } from "@prisma/client"
import GoalDisplay from "./GoalDisplay"
import getTotalTime from "@/server/actions/timer/getTotalTime"
import { useEffect, useState } from "react"
import GoalDisplayEmpty from "./GoalDisplayEmpty"
import getTotals from "@/lib/totals-by-timeFrame"

type GoalCardProps = {
	categoryId: string
	color: Color
	goals: GoalDisplayProps[]
	timeLogs?: TimeLog[]
}

const GoalCards = ({ goals, color, categoryId, timeLogs }: GoalCardProps) => {
	// ? do i need this?
	const [totalTimes, setTotalTimes] = useState<Record<TimeFrame, number>>({
		[TimeFrame.DAY]: 0,
		[TimeFrame.WEEK]: 0,
		[TimeFrame.MONTH]: 0,
		[TimeFrame.YEAR]: 0,
	})



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
		<Card className={`${backgrounds[color]} mx-auto rounded-md size-64 flex flex-col border-0 -mt-16 justify-around`}>
			<CardContent className="w-full px-2 flex flex-col items-center">
				<h4 className="text-lg font-semibold">Goals</h4>
				{slots}</CardContent>
		</Card>
	)
}

export default GoalCards
