"use server"

import { db } from "@/prisma/db"
import { auth } from "./auth"

export const getAllCategoriesBasic = async () =>{
	try {
		const session = await auth()
		if (!session) return 
		const userId = session.user?.id?.toString()
		if(!userId) return 
	
		const categoryData = await db.category.findMany({
			where:{
				userId
			}
		})

		return categoryData
		
	} catch (error) {
		console.log(error)
	}
}


export const getCategory = async (id: string) =>{
	try {	
		const categoryData = await db.category.findMany({
			where:{
				id
			}
		})

		return {success: categoryData}

	} catch (error) {
		return {error: "Category not found"}
	}
}