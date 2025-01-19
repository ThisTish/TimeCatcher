"use server"

import { db } from "@/prisma/db"
import { auth } from "@/server/actions/auth/auth"
import { checkCompletionAndUpdateGoal, checkDateAndUpdateGoal } from "../goal/check-and-update-goal"


export const getCategory = async (id: string) => {
	try {
		const categoryData = await db.category.findFirst({
			where: {
				id
			},
			include: {
				goals: {
					orderBy: {
						startDate: 'desc'
					}
				},
				timeLogs: {
					orderBy: {
						startTime: 'desc'
					}
				}
			}
		}

		)
		if (!categoryData) return { error: "Category not found" }
		await checkCompletionAndUpdateGoal(categoryData.id)
		await checkDateAndUpdateGoal(categoryData.id)
		return { success: categoryData }

	} catch (error) {
		return { error: "Category not found" }
	}
}

export const getCategoryCardData = async () => {
	try {
		const session = await auth()
		if (!session) return { error: 'Please login to see your categories' }
		const userId = session.user.id.toString()
		if (!userId) return { error: 'Please login to see your categories' }

		const categories = await db.category.findMany({
			where: {
				userId
			},
			include: {
				timeLogs: {
					select: {
						timePassed: true,
						startTime: true,
						endTime: true,
						running: true,
						id: true
					}
				},
				goals: true
			}
		})
		if (categories.length === 0 || !categories) return { success: [] }

		return { success: categories }

	} catch (error) {
		console.log(error)
		return { error: "Error finding category card data" }
	}
}