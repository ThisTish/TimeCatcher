"use server"

import { categoryFormSchema } from "@/lib/types"
import { actionClient } from "@/lib/safe-action"
import { db } from "@/prisma/db"
import { auth } from "@/server/actions/auth"
import { Color } from "@prisma/client"


export const createCategory = actionClient
	.schema(categoryFormSchema)
	.action(async ({ parsedInput: { name, color } }) => {
		const properColor = color as Color

		const session = await auth()
		if (!session) return { error: "You must be logged in to create a category" }
		const userId = session.user?.id?.toString()
		if(!userId) return { error: "You must be logged in to create a category" }


		try {
			const newCategory = await db.category.create({
				data: {
					name,
					color: properColor,
					userId
				}
			})
			console.log(newCategory)
		return { success: `${newCategory.name}  created!` } // add a goal?${newCategory.id}

		} catch (error) {
			return { error: "There was an error creating the category" }
		}


	})