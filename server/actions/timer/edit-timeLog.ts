"use server"

import { actionClient } from "@/lib/safe-action"
import { db } from "@/prisma/db"
import { revalidatePath } from "next/cache"
import { TimeLogSchema } from "@/lib/types"


export const editTimeLog = actionClient
	.schema(TimeLogSchema)
	.action(async ({ parsedInput: { id, startTime, endTime, categoryId} }) => {

		if (!endTime || !startTime) return { error: 'You must provide a start & end time' }

		const timePassed = endTime.getTime() - startTime.getTime()

		try {

			const updatedTimer = await db.timeLog.update({
				where: {
					id
				},
				data: {
					startTime,
					endTime,
					running: false,
					timePassed
				}
			})
			revalidatePath(`/categories/${categoryId}`)
			return { success: 'Timelog updated!', updatedTimer }
		}
		catch (error) {
			console.log(error)
			return { error: 'There was an error updating the timelog' }
		}
	})


export default editTimeLog