"use client"

import CategoryContainer from "@/components/categoryPage/CategoryContainer"
import TimeLogTable from "@/components/categoryPage/TimeLogTable"
import { timeFormat } from "@/lib/time-format"
import { E_Colors } from "@/lib/types"
import { getCategory } from "@/server/actions/category/get-categories"
import { $Enums } from "@prisma/client"
import { time, timeLog } from "console"
// import { CategoriesContext, useCategories } from "@/components/providers/CategoriesProvider"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import { toast } from "sonner"

type Category = {
	id: string
	name: string
	color: $Enums.Color
	timeLogs: {
		id: string
		userId: string
		categoryId: string
		startTime: Date
		endTime: Date | null
		timePassed: number
		running: boolean
	}[]
}

const CategoryPage = () => {
	const router = useRouter()
	const categoryId = useParams().id
	const [category, setCategory] = useState<Category>()

	const detailedCategory = async (categoryId: string) =>{
			const data = await getCategory(categoryId)
			if(data.error){
				toast.error(data.error)
				console.log('error')
				router.push('/timers')
				return
			}
			if(data.success){
				const categoryData = data.success
				console.log(JSON.stringify(categoryData))
				setCategory(categoryData)
			}
		}
	

	useEffect(() =>{
		if(categoryId){
			detailedCategory(categoryId.toString())
		}
	}, [])
	if(categoryId){
	console.dir(category)
	}
	return (
		<>
			<h1>{category?.name}</h1>
			<p>{category?.color}</p>
			{category?.timeLogs && category?.timeLogs.length > 0
			? (
				<TimeLogTable timeLogs={category?.timeLogs || []}/>
			)
				: null
			}
			
				{/* <div key={timelog.id}>
					<time>{timelog.startTime.getFullYear()}</time>
					<time>{timelog.endTime ? `${timelog.endTime.getTime()}` : ''}</time>
					<p>{timelog.timePassed}</p>
					<p>{timelog.running ? 'true' : 'false'}</p>
				</div> */}
			
		</>
	)
}

export default CategoryPage