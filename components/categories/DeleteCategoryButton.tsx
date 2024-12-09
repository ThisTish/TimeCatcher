"use client"

import deleteCategory from "@/server/actions/delete-category"
import { Button } from "../ui/button"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useAction } from "next-safe-action/hooks"

const DeleteCategoryButton = ({ id }: { id: string }) => {

	const router = useRouter()

// todo onsuccess toast not working.
	const { execute, status } = useAction(deleteCategory, {
		onSuccess: (data) => {
			if (data.data?.success) {
				toast.success(data.data.success)
				console.log('Category deleted successfully')
				router.push('/timers')
			}
			if (data.data?.error) {
				console.log('Error occurred while deleting category')
				toast.error(data.data.error)
			}
		},
		// onExecute: (data) => {
		// 	toast.loading('Deleting category')
		// },
		onError: (error) => {
			console.log(error)
		}
	})
	// const handleDelete = () => {
	// 	execute({ id })

	// }

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