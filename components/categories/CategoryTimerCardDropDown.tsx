import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { MoreVertical } from "lucide-react";
import DeleteCategoryButton from "./DeleteCategoryButton";

const CategoryTimerCardDropDown = ({id}: {id: string}) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<MoreVertical className="p-5" size={58}/>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem>More Details</DropdownMenuItem>
				<DropdownMenuItem>
					<DeleteCategoryButton id={id} />
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export default CategoryTimerCardDropDown