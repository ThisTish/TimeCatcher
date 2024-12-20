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
		console.log(categoryTotalTime)
		return categoryTotalTime?._sum.timePassed || 0
		// console.log(categoryId)
		// const totalTime = await db.timeLog.aggregate({
		// 	_sum:{
		// 		timePassed: true
		// 	},
		// 	where:{
		// 		categoryId
		// 	}
		// })
		// console.log(totalTime._sum.timePassed)
		// return totalTime._sum.timePassed
	}
	catch(error){
		console.log(error)
	}
}

export default getTotalTime