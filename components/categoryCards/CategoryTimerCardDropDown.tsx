import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreVertical } from "lucide-react"
import DeleteCategoryButton from "./DeleteCategoryButton"
import FormContainer from "../forms/FormContainer"
import CategoryForm from "../forms/CategoryForm"
import Link from "next/link"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"
import { Color } from "@prisma/client"

const CategoryTimerCardDropDown = ({ id, name, color }: { id: string, name: string, color: Color }) => {
	return (
		<DropdownMenu>
			{/* dropdown button */}
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<DropdownMenuTrigger aria-label="options">
							<MoreVertical className="p-5" size={58} />
						</DropdownMenuTrigger>
					</TooltipTrigger>
					<TooltipContent className="-mb-5">
						Options
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>

			<DropdownMenuContent>

				{/* More Details */}
				<DropdownMenuItem >
					<Link href={`/categories/${id}`}>
						More Details
					</Link>
				</DropdownMenuItem>				

				{/* Edit */}
				<DropdownMenuItem asChild>
					<FormContainer
						title="Update category details"
						description="Change the name or color of the category"
						openButtonLabel="Edit"
					>
						<CategoryForm id={id} categoryName={name} categoryColor={color as Color} />
					</FormContainer>
				</DropdownMenuItem>

				{/* Delete */}
				<DropdownMenuItem>
					<DeleteCategoryButton id={id} />
				</DropdownMenuItem>

			</DropdownMenuContent>

		</DropdownMenu>
	)
}

export default CategoryTimerCardDropDown