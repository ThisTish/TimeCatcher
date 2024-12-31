"use client"

import { backgrounds } from "@/components/providers/ThemeProvider"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { E_Colors } from "@/lib/types"
import { TimeFrame } from "@prisma/client"
import GoalDisplay from "./GoalDisplay"
import getTotalTime from "@/server/actions/timer/getTotalTime"
import { useEffect, useState } from "react"

type GoalCardProps = {
	categoryId: string
	color: E_Colors
	goals?: {
		id: string
		timeFrame: TimeFrame
		active: boolean
		reoccurring: boolean
		targetTime: number
		completed: boolean
	}[]
}

const GoalCards = ({ goals, color, categoryId }: GoalCardProps) => {
	const [dayTime, setDayTime] = useState(0)
	const [weekTime, setWeekTime] = useState(0)
	const [monthTime, setMonthTime] = useState(0)
	const [yearTime, setYearTime] = useState(0)
	const [totalTimes, setTotalTimes] = useState<Record<string, number>>({})

	useEffect(() => {
		const fetchTimes = async () => {
			if (!goals) return
			const times: Record<string, number> = {}
			for (const goal of goals) {
				if (goal.active) {
					times[goal.id] = (await getTotalTime(categoryId, goal.timeFrame)) ?? 0
				}
			}
			setTotalTimes(times)
		}
		fetchTimes().catch(console.error)
	}, [])


	const activeGoals = goals?.filter((goal) => goal.active)

	return (
		<Card className={`${backgrounds[color]} rounded-md size-64 flex flex-col justify-around relative`}>
			<CardHeader className="pt-2 pb-1 mb-1 text-lg font-bold text-center border border-b-2">
				<h3>GOALS</h3>
			</CardHeader>
			{/* running timer display */}
			<CardContent className="grid gap-1 tabular-nums">
				{activeGoals?.map((goal) => (
					<div key={goal.id}>
						{goal.timeFrame === TimeFrame.DAY && (
							<GoalDisplay timeFrame='DAY' timePassed={dayTime} targetTime={goal.targetTime} />
						)}
						{goal.timeFrame === TimeFrame.WEEK && (
							<GoalDisplay timeFrame='WEEK' timePassed={weekTime} targetTime={goal.targetTime} />
						)}
						{goal.timeFrame === TimeFrame.MONTH && (
							<GoalDisplay timeFrame='MONTH' timePassed={monthTime} targetTime={goal.targetTime} />
						)}
						{goal.timeFrame === TimeFrame.YEAR && (
							<GoalDisplay timeFrame='YEAR' timePassed={yearTime} targetTime={goal.targetTime} />
						)}
					</div>
				))}
				{!activeGoals?.some((goal) => goal.timeFrame === TimeFrame.DAY) && (
					<button className="btn btn-primary">Add Day Goal</button>
				)}
				{!activeGoals?.some((goal) => goal.timeFrame === TimeFrame.WEEK) && (
					<button className="btn btn-primary">Add Week Goal</button>
				)}
				{!activeGoals?.some((goal) => goal.timeFrame === TimeFrame.MONTH) && (
					<button className="btn btn-primary">Add Month Goal</button>
				)}
				{!activeGoals?.some((goal) => goal.timeFrame === TimeFrame.YEAR) && (
					<button className="btn btn-primary">Add Year Goal</button>
				)}

			</CardContent>
		</Card>
	)
}

export default GoalCards