"use client"

import deleteCategory from "@/server/actions/category/delete-category"
import { Button } from "../ui/button"
import { toast } from "sonner"
import { useAction } from "next-safe-action/hooks"

// todo text red, hover-textwhite bg red

const DeleteCategoryButton = ({ id }: { id: string }) => {


	const { execute, status } = useAction(deleteCategory, {
		onSuccess: (data) => {
			if (data.data?.success) {
				toast.success(data.data.success)
				console.log('Category deleted successfully')
			}
			if (data.data?.error) {
				console.log('Error occurred while deleting category')
				toast.error(data.data.error)
			}
		},
		onError: (error) => {
			console.log(error)
		}
	})


	return (
		<Button
			key={id}
			variant={'link'}
			onClick={() => execute({id})}
			disabled={status === 'executing'}
		>
			Delete
		</Button>
	)
}

export default DeleteCategoryButton