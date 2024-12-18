"use server"

import { db } from "@/prisma/db"
import { auth } from "@/server/actions/auth/auth"

export const getAllCategoriesBasic = async () => {
	try {
		const session = await auth()
		if (!session) return
		const userId = session.user?.id?.toString()
		if (!userId) return

		const categoryData = await db.category.findMany({
			where: {
				userId
			},
			include: {
				timeLogs: true
			}
		})

		return categoryData

	} catch (error) {
		console.log(error)
	}
}


export const getCategory = async (id: string) => {
	try {
		const categoryData = await db.category.findMany({
			where: {
				id
			}
		})

		return { success: categoryData }

	} catch (error) {
		return { error: "Category not found" }
	}
}

export const getActiveCategory = async () => {
	try {
		const session = await auth()
		if (!session) return
		const userId = session.user.id.toString()

		const activeCategory = await db.category.findFirst({
			where: {
				userId,
				timeLogs: {
					some: {
						running: true
					}
				}
			},
			include: {
				timeLogs: {
					where: {
						running: true
					}
				}
			}
		})

		if (!activeCategory) return

		return activeCategory
	}
	catch (error) {
		return { error: "Error finding active category" }
	}
}