import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { MoreVertical } from "lucide-react";
import DeleteCategoryButton from "./DeleteCategoryButton";
import FormContainer from "../forms/FormContainer";
import CategoryForm from "../forms/CategoryForm";
import { E_Colors } from "@/lib/types";
import Link from "next/link";

const CategoryTimerCardDropDown = ({id, name, color}: {id: string, name: string, color: E_Colors}) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger aria-label="options">
				<MoreVertical className="p-5" size={58}/>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				{/* More Details */}
				<DropdownMenuItem >
					<Link href={`/categories/${id}`}>
						More Details
					</Link>
					</DropdownMenuItem>
				{/* Delete */}
				<DropdownMenuItem>
					<DeleteCategoryButton id={id} />
				</DropdownMenuItem>
				{/* Edit */}
				<DropdownMenuItem asChild>
				<FormContainer
					title="Update category details"
					description="Change the name or color of the category"
					openButtonLabel="Edit"
				>
					<CategoryForm id={id} categoryName={name} categoryColor={color as E_Colors } />
				</FormContainer>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export default CategoryTimerCardDropDown