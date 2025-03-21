"use server"

import { actionClient } from "@/lib/safe-action"
import { db } from "@/prisma/db"
import * as z from 'zod'
import { auth } from "../auth/auth"
import { revalidatePath } from "next/cache"
import { TimeLogSchema } from "@/lib/types"
import { checkCompletionAndUpdateGoal } from "../goal/check-and-update-goal"


export const addTimelog = actionClient
	.schema(TimeLogSchema)
	.action(async ({ parsedInput: { startTime, endTime, categoryId } }) => {

		try {
			const session = await auth()
			if (!session) return { error: "You must be logged in to catch time" }
			const userId = session.user?.id?.toString()
			if (!userId) return { error: "You must be logged in to catch time" }

			const category = await db.category.findUnique({
				where: { id: categoryId }
			})
			if (!category) return { error: "Category not found" }

			if (!startTime || !endTime) return { error: "You must provide a start and end time" }
			if (startTime > endTime || startTime === endTime) return { error: "The start time must be before the end time" }
			if (startTime > new Date() || endTime > new Date()) return { error: "You can't catch time in the future." }

			const newTimeLog = await db.timeLog.create({
				data: {
					startTime,
					endTime,
					categoryId,
					running: false,
					timePassed: endTime.getTime() - startTime.getTime(),
					userId
				}
			})

			await checkCompletionAndUpdateGoal(categoryId)
			revalidatePath(`/categories/${categoryId}`)
			console.log('newtimelog', newTimeLog, categoryId)
			return { success: 'Timelog added', newTimeLog }
		}
		catch (error) {
			console.log(error)
			return { error: 'There was an error adding a timelog' }
		}
	})


export default addTimelog