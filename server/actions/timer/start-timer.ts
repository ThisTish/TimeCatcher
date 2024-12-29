"use server"

import { actionClient } from "@/lib/safe-action"
import { db } from "@/prisma/db"
import * as z from 'zod'
import { auth } from "../auth/auth"
import { revalidatePath } from "next/cache"


export const startTimer = actionClient
	.schema(z.object({categoryId: z.string()}))
	.action(async ({ parsedInput: { categoryId } }) => {

		try {
				const session = await auth()
					if (!session) return { error: "You must be logged in to catch time" }
					const userId = session.user?.id?.toString()
					if(!userId) return { error: "You must be logged in to catch time" }


			const newTimer = await db.timeLog.create({
				data: {
					startTime: new Date(),
					categoryId,
					running: true,
					timePassed: 0,
					userId
				}
			})
			revalidatePath(`/timers`)
			return { success: 'Timer started!', newTimer }
		}
		catch (error) {
			console.log(error)
			return { error: 'There was an error starting the timer' }
		}
	})


	export default startTimer