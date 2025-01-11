import { db } from "@/prisma/db"
import getTotals from "@/lib/totals-by-timeFrame"
import timeFrameDates from "@/lib/timeFrame-dates"

export const checkCompletionAndUpdateGoal = async (categoryId: string) => {
console.log('checking goal completion')
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

		if (goals.length === 0) return

		for (const goal of goals) {
			const totalTime = getTotals(goal.timeFrame, goal.category.timeLogs, goal.startDate)

			if (goal.completed && totalTime < goal.targetTime) {
				const updatedGoal = await db.goal.update({
					where: {
						id: goal.id
					},
					data: {
						completed: false
					}
				})
				console.log('changed uncompleted goal',updatedGoal)
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

				console.log('changed completed goal', updatedGoal)
			}
		}
		return { success: 'Goals updated.' }
	} catch (error) {
		console.log(error)
		return { error: `There was an error updating the goal` }
	}
}

// *also needs to be called on dashboard just in case OR make middleware
export const checkDateAndUpdateGoal = async (categoryId: string) => {
	console.log('checking date')
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

		if (passedGoals.length === 0) return

		console.log('passedGoals', passedGoals)

		await Promise.all(passedGoals.map(async(goal) =>{
			return db.$transaction(async(tx) =>{
				const deactivatedGoal = await tx.goal.update({
					where:{
						id: goal.id
					},
					data:{
						active: false
					}
				})
				console.log('deactivated goal', deactivatedGoal)
				if(!deactivatedGoal.reoccurring) return

				const newGoal = await tx.goal.create({
					data: {
						...deactivatedGoal,
						id: undefined,
						active: true,
						completed: false,
						startDate: timeFrameDates(goal.timeFrame).startDate,
						endDate: timeFrameDates(goal.timeFrame).endDate
					}
					}) 
				console.log('created new goal', newGoal)
			})
		}))
	} catch (error) {
		console.log(error)
		return { error: `There was an error updating the goal` }
	}
}



