import { db } from "@/prisma/db";
import { PrismaClient, TimeFrame } from "@prisma/client";

const validateActiveGoal = async (db:PrismaClient, categoryId: string, timeFrame: TimeFrame) =>{
	return !(await db.goal.findFirst({
		where:{
			categoryId,
			timeFrame,
			active: true
		}
	}))
}

export default validateActiveGoal


// *claude streamline
// async function validateActiveGoal(
// 	db: PrismaClient,
// 	categoryId: string,
// 	timeFrame: string,
// 	excludeGoalId?: string
//   ) {
// 	return !(await db.goal.findFirst({
// 	  where: {
// 		categoryId,
// 		timeFrame,
// 		active: true,
// 		...(excludeGoalId && { NOT: { id: excludeGoalId } })
// 	  }
// 	}))
//   }
  
//   // Schema for goal creation
//   const createGoalSchema = z.object({
// 	categoryId: z.string(),
// 	timeFrame: z.string(),
// 	targetTime: z.number(),
// 	reoccurring: z.boolean(),
// 	active: z.boolean(),
// 	completed: z.boolean(),
// 	startTime: z.date(),
// 	endTime: z.date()
//   }).refine(
// 	async (data) => !data.active || await validateActiveGoal(db, data.categoryId, data.timeFrame),
// 	{
// 	  message: "Another goal is already active for this category and time frame",
// 	  path: ["active"]
// 	}
//   )
  
//   export const checkDateAndUpdateGoal = async (categoryId: string) => {
// 	try {
// 	  const passedGoals = await db.goal.findMany({
// 		where: {
// 		  categoryId,
// 		  active: true,
// 		  endDate: { lte: new Date() }
// 		},
// 		select: {
// 		  id: true,
// 		  categoryId: true,
// 		  timeFrame: true,
// 		  targetTime: true,
// 		  reoccurring: true,
// 		}
// 	  })
  
// 	  if (!passedGoals.length) return
  
// 	  await Promise.all(passedGoals.map(async (goal) => {
// 		return db.$transaction(async (tx) => {
// 		  // Deactivate current goal
// 		  const deactivatedGoal = await tx.goal.update({
// 			where: { id: goal.id },
// 			data: { active: false }
// 		  })
  
// 		  if (!deactivatedGoal.reoccurring) return
  
// 		  const { startDate, endDate } = timeFrameDates(goal.timeFrame)
// 		  const canCreateActive = await validateActiveGoal(
// 			tx,
// 			goal.categoryId,
// 			goal.timeFrame
// 		  )
  
// 		  const newGoalData = {
// 			categoryId: goal.categoryId,
// 			timeFrame: goal.timeFrame,
// 			targetTime: goal.targetTime,
// 			reoccurring: goal.reoccurring,
// 			active: canCreateActive,
// 			completed: false,
// 			startTime: startDate,
// 			endTime: endDate
// 		  }
  
// 		  await createGoalSchema.parseAsync(newGoalData)
// 		  return tx.goal.create({ data: newGoalData })
// 		})
// 	  }))
  
// 	} catch (error) {
// 	  const errorMessage = error instanceof z.ZodError 
// 		? 'Validation failed when creating reoccurring goal'
// 		: 'There was an error updating the goal'
	  
// 	  return { error: errorMessage }
// 	}
//   }