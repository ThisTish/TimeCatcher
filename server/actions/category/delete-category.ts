'use server'

import { db } from "@/prisma/db"
import { actionClient } from "@/lib/safe-action"
import * as z from 'zod'
import { revalidatePath } from "next/cache"


const deleteCategory = actionClient
	.schema(z.object({ id: z.string() }))
	.action(async ({ parsedInput: { id } }) => {
		try {
			const data = await db.category.delete({
				where: {
					id
				}
			})
			revalidatePath('/timers')
			return { success: `Category ${data.name} deleted successfully` }

		} catch (error) {
			return { error: `Error occurred while deleting category ${error}` }
		}
	})

export default deleteCategory