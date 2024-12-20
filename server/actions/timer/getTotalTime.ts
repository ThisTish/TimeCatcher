import { db } from "@/prisma/db"

const getTotalTime = async (categoryId: string) =>{
	try{

		const totalTime = await db.timeLog.groupBy({
			by: ['categoryId'],
			_sum: {
				timePassed: true
			}
		})
		if(totalTime.length === 0 || !totalTime[0]._sum.timePassed || !totalTime[0]._sum.timePassed){
			return 0
		}
		const categoryTotalTime = totalTime.find((time) => time.categoryId === categoryId)
		return categoryTotalTime?._sum.timePassed || 0
	
	}
	catch(error){
		console.log(error)
	}
}

export default getTotalTime


