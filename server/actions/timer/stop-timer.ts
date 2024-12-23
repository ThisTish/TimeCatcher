"use server"

import { actionClient } from "@/lib/safe-action"
import { timeFormat } from "@/lib/time-format"
import { db } from "@/prisma/db"
import { revalidatePath } from "next/cache"
import * as z from 'zod'


export const stopTimer = actionClient
	.schema(z.object({ categoryId: z.string() }))
	.action(async ({ parsedInput: { categoryId } }) => {
		try {
			const activeTimeLog = await db.timeLog.findFirst({
				where: {
					categoryId,
					running: true,
					endTime: null
				}
			})

			if (!activeTimeLog) return { error: 'No active timer found' }

			if (activeTimeLog.startTime) {
				const timePassed = new Date().getTime() - activeTimeLog?.startTime.getTime()
				const updatedTimeLog = await db.timeLog.update({
					where: {
						id: activeTimeLog.id
					},
					data: {
						endTime: new Date(),
						timePassed: timePassed,
						running: false
					},
					include: {
						category: true
					}
				})

				if (!updatedTimeLog) return
				revalidatePath('/timers')

				let { hours, minutes, seconds } = timeFormat(timePassed / 1000)

				if (hours === 0  && minutes === 0) {
					return { success: `Timer stopped for ${updatedTimeLog.category.name}.  You caught ${seconds} seconds!` }
				} else if (hours === 0) {
					return { success: `Timer stopped for ${updatedTimeLog.category.name}.  You caught ${minutes} minutes and ${seconds} seconds!` }
				} else {
					return { success: `Timer stopped for ${updatedTimeLog.category.name}.  You caught ${hours} hours, ${minutes} minutes and ${seconds} seconds!` }
				}
			}

		} catch (error) {
			return { error: 'There was an error stopping the timer' }
		}

	})