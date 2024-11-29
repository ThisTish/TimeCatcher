"use server"

import { db } from "@/prisma/db"
import { auth } from "./auth"

export const getAllCategoriesBasic = async () =>{
	const session = await auth()
	if (!session) return 
	const userId = session.user?.id?.toString()
	if(!userId) return 

	const categoryData = await db.category.findMany({
		where:{
			userId
		},
		include:{
			timeLogs: true
		}
	})


	return categoryData
}