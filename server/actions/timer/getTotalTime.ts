import { db } from "@/prisma/db"
import { TimeFrame } from "@prisma/client"

const getTotalTime = async (categoryId: string, timeFrame: TimeFrame | "ALLTIME") =>{
	const currentYear = new Date().getFullYear()
	const currentMonth = new Date().getMonth()

	let startTime: Date
	let endTime: Date = new Date()

	switch(timeFrame){
		case TimeFrame.DAY:
			startTime = new Date(new Date().setHours(0,0,0,0))
			endTime = new Date(new Date().setHours(23,59,59,999))
			break
		case TimeFrame.WEEK:
			startTime = new Date()
			startTime.setDate(startTime.getDate() - startTime.getDay())
			startTime.setHours(0,0,0,0) 
			endTime.setDate(startTime.getDate() + 6)
			break
		case TimeFrame.MONTH:
			startTime = new Date(currentYear, currentMonth, 1)
			endTime = new Date(new Date(currentYear, currentMonth + 1, 0).setHours(23,59,59,999))
			break
		case TimeFrame.YEAR:
			startTime = new Date(currentYear, 0, 1)
			endTime = new Date(new Date(currentYear, 11, 31).setHours(23,59,59,999))
			break
		case "ALLTIME":
			startTime = new Date(0)
			break
		default:
			throw new Error(`Unsupported time frame: ${timeFrame}`)
	}


	try{
		const totalTime = await db.timeLog.groupBy({
			by: ['categoryId'],
			where:{
				startTime: {
					gte: startTime,
					lte: endTime
				}
			},
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


