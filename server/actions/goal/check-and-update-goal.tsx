import { db } from "@/prisma/db"
import getTotals from "@/lib/totals-by-timeFrame"
import { createGoal } from "./create-goal"
import timeFrameDates from "@/lib/timeFrame-dates"

export const checkCompletionAndUpdateGoal = async (categoryId: string) => {
	try {
		const goals = await db.goal.findMany({
			where: {
				categoryId,
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
			if (goal.completed && totalTime < goal.targetTime) {
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

			if (!goal.completed && totalTime >= goal.targetTime) {
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
		
		return { success: 'Goals updated.' }

	} catch (error) {
		console.log(error)
		return { error: `There was an error updating the goal` }
	}

}

// *also needs to be called on dashboard just in case
export const checkDateAndUpdateGoal = async (categoryId: string) => {
	try {

		const passedGoals = await db.goal.findMany({
			where: {
				categoryId,
				active: true,
				endDate: {
					lte: new Date()
				}
			},
			select: {
				id: true,
				categoryId: true,
				timeFrame: true,
				targetTime: true,
				reoccurring: true,
			}
		})

		if (!passedGoals.length && passedGoals.length === 0) return

		console.log('passedGoals', passedGoals)

		for (const goal of passedGoals) {
			const deactivatedGoal = await db.goal.update({
				where: {
					id: goal.id
				},
				data: {
					active: false,
				}
			})

			if (goal.reoccurring) {
				const newGoal = await createGoal({
					categoryId: goal.categoryId,
					timeFrame: goal.timeFrame,
					targetTime: goal.targetTime,
					reoccurring: goal.reoccurring,
					active: true,
					startTime: timeFrameDates(goal.timeFrame).startDate,
					endTime: timeFrameDates(goal.timeFrame).endDate
				})
				console.log('newGoal', newGoal)
			}
			console.log('deactivatedGoal', deactivatedGoal)
		}
	} catch (error) {
		console.log(error)
		return { error: `There was an error updating the goal` }
	}
}






// when app loads, check if if today is past the end date of a goal
//  if it is
// deactivate old goal,
//and if it is also reoccurring,
// create new goal with same props, but new id, startDate, and endDate

// when timer is stopped, or a timelog is updated, or a goal is created/updated- check if timePassed is >= targetTime
// if it is, mark goal as completed
