"use client"

import deleteCategory from "@/server/actions/delete-categoty"
import { Button } from "../ui/button"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { error } from "console"

const DeleteCategoryButton = ({id}: {id: string}) => {
	
	const router = useRouter()

const handleDelete = async () =>{


	const data = await deleteCategory(id)
	if(data){
		toast.success('Category deleted')
		router.push('/timers')
	}
	else{
		toast.error('Category not found')
	}
}

	return (
		<Button 
		key={id}
		variant={'link'} 
		onClick={handleDelete}
		>
			Delete
		</Button>
	)
}

export default DeleteCategoryButton