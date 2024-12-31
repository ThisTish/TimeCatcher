"use server"

import { GoalFormSchema } from "@/lib/types"
import { actionClient } from "@/lib/safe-action"
import { db } from "@/prisma/db"
import { auth } from "@/server/actions/auth/auth"
import { TimeFrame } from "@prisma/client"


export const createGoal = actionClient
	.schema(GoalFormSchema)
	.action(async ({ parsedInput: { id, categoryId, timeFrame, targetTime, reoccurring } }) => {
		console.log('starting', id, categoryId, timeFrame, targetTime, reoccurring)


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
						reoccurring
					}
				})
				return { success: `${updatedGoal.timeFrame} goal updated!` }
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
		console.log('starting', id, categoryId, timeFrame, targetTime, reoccurring)

			try {
				const newGoal = await db.goal.create({
					data: {
						categoryId,
						userId,
						timeFrame: timeFrame as TimeFrame,
						targetTime,
						completed: false,
						reoccurring,
						active: true
					}
				})
				return { success: `${newGoal.timeFrame.slice(0,1).toUpperCase() + newGoal.timeFrame.slice(1).toLowerCase()} goal created!` } 

			} catch (error) {
				console.log(error)
				return { error: `There was an error creating the goal` }
			}
		}

	})