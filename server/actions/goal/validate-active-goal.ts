import { PrismaClient, TimeFrame } from "@prisma/client"

const validateActiveGoal = async (db: PrismaClient, categoryId: string, timeFrame: TimeFrame) => {
	return !(await db.goal.findFirst({
		where: {
			categoryId,
			timeFrame,
			active: true
		}
	}))
}

export default validateActiveGoal
