'use server'

import { db } from "@/prisma/db"
import { actionClient } from "@/lib/safe-action"
import * as z from 'zod'
import { revalidatePath } from "next/cache"


const deleteTimeLog = actionClient
	.schema(z.object({ id: z.string(), categoryId: z.string() }))
	.action(async ({ parsedInput: { id, categoryId } }) => {
		try {
			const data = await db.timeLog.delete({
				where: {
					id
				}
			})
			console.log(data)
			revalidatePath(`/category/${categoryId}`)
			return { success: `Timelog deleted successfully` }

		} catch (error) {
			return { error: `Error occurred while deleting timelog ${error}` }
		}
	})

export default deleteTimeLog