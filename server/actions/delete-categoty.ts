"use server"

import { db } from "@/prisma/db"
import { createSafeActionClient } from "next-safe-action"
import * as z from 'zod'

const action = createSafeActionClient()

const deleteCategory = action
	.schema(z.object({id: z.string()}))
	.action(async ({parsedInput: {id}}) =>{
		try {
			const data = await db.category.delete({
				where:{
					id
				}
			})

			return {success: `Category ${data.name} deleted successfully`}

		} catch (error) {
			return { error: 'Error occurred while deleting category'}
		}
	})

// const deleteCategory = async (id: string ) =>{
// 	const deletingCategory = await db.category.delete({
// 		where: {
// 			id
// 		}
// 	})

// 	if(!deletingCategory) return {error: 'Category not found'}

// 	return deletingCategory
// }

export default deleteCategory