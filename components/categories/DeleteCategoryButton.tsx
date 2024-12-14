"use client"

import deleteCategory from "@/server/actions/delete-category"
import { Button } from "../ui/button"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useAction } from "next-safe-action/hooks"


// todo deleting is working, onExecute is working, onSuccess is not working.

const DeleteCategoryButton = ({ id }: { id: string }) => {

	const router = useRouter()

	const { execute, status } = useAction(deleteCategory, {
		onSuccess: (data) => {
			if (data.data?.success) {
				router.push('/timers')
				toast.success(data.data.success)
				console.log('Category deleted successfully')
			}
			if (data.data?.error) {
				console.log('Error occurred while deleting category')
				toast.error(data.data.error)
			}
		},
		// onExecute: () => {
		// 	toast.loading('Deleting category')
		// },
		onError: (error) => {
			console.log(error)
		}
	})


	return (
		<Button
			key={id}
			variant={'link'}
			onClick={() => execute({id})}
		>
			Delete
		</Button>
	)
}

export default DeleteCategoryButton