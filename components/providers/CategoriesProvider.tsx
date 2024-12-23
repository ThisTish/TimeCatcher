"use client"

import { getCategoryCardData } from '@/server/actions/category/get-categories'
import { createContext } from 'react'


type Category = {
			timeLogs: {
			id: string;
			startTime: Date;
			timePassed: number;
			running: boolean;
		}[];
	} & {
		id: string;
		name: string;
		userId: string;
	color: string;
	createdAt: Date;
	updatedAt: Date;
}

export const CategoriesContext = createContext<Category[]>([])

// export default async function CategoryProvider({
// 	children,
// }: {
// 	children: React.ReactNode
// }) {

	
// 	const { success, error } = await getCategoryCardData()

// 	if (error) throw new Error(error)

// 	const categories = success || []


// 	return <CategoriesContext.Provider value={categories} >{children}</CategoriesContext.Provider>
// }

