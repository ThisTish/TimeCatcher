"use client"

import TimeLogTable from "@/components/categoryPage/TimeLogTable"
import { Button } from "@/components/ui/button"
import { getCategory } from "@/server/actions/category/get-categories"
import { $Enums } from "@prisma/client"
import Link from "next/link"
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

	const detailedCategory = async (categoryId: string) => {
		const data = await getCategory(categoryId)
		if (data.error) {
			toast.error(data.error)
			router.push('/timers')
			return
		}
		if (data.success) {
			const categoryData = data.success
			setCategory(categoryData)
		}
	}

	useEffect(() => {
		if (categoryId) {
			detailedCategory(categoryId.toString())
		}
	}, [])


	return (
		<>
			<h1>{category?.name}</h1>
			<Link href="/timers">Timers</Link>
			<p>{category?.color}</p>
			{category?.timeLogs.length === 0 || !category?.timeLogs ? (

				null
			) : (<>
				<TimeLogTable timeLogs={category?.timeLogs} />
			</>
			)
			}
		</>
	)
}

export default CategoryPage