"use server"

import { GoalFormSchema } from "@/lib/types"
import { actionClient } from "@/lib/safe-action"
import { db } from "@/prisma/db"
import { auth } from "@/server/actions/auth/auth"
import { TimeFrame } from "@prisma/client"
import timeFrameDates from "@/lib/timeFrame-dates"
import { checkCompletionAndUpdateGoal } from "./check-and-update-goal"

export const createGoal = actionClient
	.schema(GoalFormSchema)
	.action(async ({ parsedInput: { id, categoryId, timeFrame, targetTime, reoccurring, active, completed } }) => {

		if (id) {
			try {
				const updatedGoal = await db.goal.update({
					where: {
						id
					},
					data: {
						categoryId,
						timeFrame: timeFrame as TimeFrame,
						targetTime,
						reoccurring,
						active,
						startDate: timeFrameDates(timeFrame).startDate,
						endDate: timeFrameDates(timeFrame).endDate
					}
				})

				if (!updatedGoal) return { error: `There was an error updating the goal` }
				await checkCompletionAndUpdateGoal(categoryId)
				return { success: `${updatedGoal.timeFrame} goal updated!`, updatedGoal }
			} catch (error) {
				console.log(error)
				return { error: `There was an error updating the goal` }
			}
		}

		if (!id) {
			const session = await auth()
			if (!session) return { error: "You must be logged in to create a goal" }
			const userId = session.user?.id?.toString()
			if (!userId) return { error: "You must be logged in to create a goal" }

			try {
				const newGoal = await db.goal.create({
					data: {
						categoryId,
						userId,
						timeFrame: timeFrame as TimeFrame,
						targetTime,
						completed: false,
						reoccurring,
						active: true,
						startDate: timeFrameDates(timeFrame).startDate,
						endDate: timeFrameDates(timeFrame).endDate
					}
				})
				await checkCompletionAndUpdateGoal(categoryId)
				console.dir(newGoal)
				return { success: `${newGoal.timeFrame.slice(0, 1).toUpperCase() + newGoal.timeFrame.slice(1).toLowerCase()} goal created!`, newGoal }

			} catch (error) {
				console.log(error)
				return { error: `There was an error creating the goal` }
			}
		}
	})