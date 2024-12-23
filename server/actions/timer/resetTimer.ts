"use server"

import { actionClient } from "@/lib/safe-action"
import { db } from "@/prisma/db"
import * as z from 'zod'
import { revalidatePath } from "next/cache"


export const resetTimer = actionClient
	.schema(z.object({timeLogId: z.string()}))
	.action(async ({ parsedInput: { timeLogId } }) => {

		try {

			const restartedTimer = await db.timeLog.update({
				where: {
					id: timeLogId
				},
				data: {
					startTime: new Date(),
					running: true,
					timePassed: 0,
				}
			})
			revalidatePath('/timers', "layout")
			return { success: 'Timer restarted!', restartedTimer }
		}
		catch (error) {
			console.log(error)
			return { error: 'There was an error resetting the timer' }
		}
	})


	export default resetTimer