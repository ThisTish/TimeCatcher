"use server"

import { actionClient } from "@/lib/safe-action"
import { db } from "@/prisma/db"
import * as z from 'zod'
import { auth } from "../auth/auth"
import { revalidatePath } from "next/cache"
import { TimeLogSchema } from "@/lib/types"


export const addTimelog = actionClient
	.schema(TimeLogSchema)
	.action(async ({ parsedInput: { startTime, endTime, categoryId } }) => {

		try {
			const session = await auth()
			if (!session) return { error: "You must be logged in to catch time" }
			const userId = session.user?.id?.toString()
			if (!userId) return { error: "You must be logged in to catch time" }

			if (!startTime || !endTime) return { error: "You must provide a start and end time" }

			const timePassed = endTime.getTime() - startTime.getTime()


			const newTimeLog = await db.timeLog.create({
				data: {
					startTime,
					categoryId,
					running: false,
					timePassed,
					userId
				}
			})
			revalidatePath(`/categories/${categoryId}`)
			return { success: 'Timelog added', newTimeLog }
		}
		catch (error) {
			console.log(error)
			return { error: 'There was an error adding a timelog' }
		}
	})


export default addTimelog