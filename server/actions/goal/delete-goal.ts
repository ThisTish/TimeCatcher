'use server'

import { db } from "@/prisma/db"
import { actionClient } from "@/lib/safe-action"
import * as z from 'zod'
import { revalidatePath } from "next/cache"


const deleteGoal = actionClient
	.schema(z.object({ id: z.string() }))
	.action(async ({ parsedInput: { id } }) => {
		try {
			const data = await db.goal.delete({
				where: {
					id
				}
			})
			revalidatePath('/timers')
			return { success: `Goal deleted successfully` }

		} catch (error) {
			return { error: `Error occurred while deleting goal: ${error}` }
		}
	})

export default deleteGoal