import { db } from "@/prisma/db"
import getTotals from "@/lib/totals-by-timeFrame"

const checkAndUpdateGoal = async (categoryId: string) => {
	try {
		const goals = await db.goal.findMany({
			where: {
				categoryId,
				active: true
			},
			include: {
				category: {
					select: {
						timeLogs: true
					}
				}
			}
		})

		if (!goals.length) return

		for (const goal of goals) {
			const totalTime = getTotals(goal.timeFrame, goal.category.timeLogs)
			if(goal.completed && totalTime < goal.targetTime){
					const updatedGoal = await db.goal.update({
						where: {
							id: goal.id
						},
						data: {
							completed: false
						}
					})
			console.log(updatedGoal)
			}

			if(!goal.completed && totalTime >= goal.targetTime){
				const updatedGoal = await db.goal.update({
					where: {
						id: goal.id
					},
					data: {
						completed: true
					}
				})
			console.log(updatedGoal)

			}
		}
		return { success: 'Goals updated.'}
	} catch (error) {
		console.log(error)
		return { error: `There was an error updating the goal` }
	}

}

export default checkAndUpdateGoal

