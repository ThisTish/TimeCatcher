"use server"

import { db } from "@/prisma/db"

const deleteCategory = async (id: string ) =>{
	const deletingCategory = await db.category.delete({
		where: {
			id
		}
	})

	if(!deletingCategory) return {error: 'Category not found'}

	return deletingCategory
}

export default deleteCategory