import { db } from "@/prisma/db"
import getTotals from "@/lib/totals-by-timeFrame"
import { createGoal } from "./create-goal"
import timeFrameDates from "@/lib/timeFrame-dates"

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

export const checkDateAndUpdate = async (categoryId: string) =>{
	const reoccurringGoals = await db.goal.findMany({
		where: {
			categoryId,
			reoccurring: true,
			active: true,
			endDate: {
				lte: new Date()
			}
		}
	})
	if(!reoccurringGoals.length && reoccurringGoals.length === 0) return
	console.log('reoccurringGoals', reoccurringGoals)
	for(const goal of reoccurringGoals){
		const deactivatedGoal = await db.goal.update({
			where: {
				id: goal.id
			},
			data: {
				active: false,			}
		})

			const newGoal = await createGoal({
				categoryId: goal.categoryId,
				timeFrame: goal.timeFrame,
				targetTime: goal.targetTime,
				reoccurring: goal.reoccurring,
				active: true,
				startTime: timeFrameDates(goal.timeFrame).startDate,
				endTime: timeFrameDates(goal.timeFrame).endDate
			})

			console.log('deactivatedGoal', deactivatedGoal)
			console.log('newGoal', newGoal)
	}
}

export default checkAndUpdateGoal

