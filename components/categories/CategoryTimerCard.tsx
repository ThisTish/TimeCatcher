import { backgrounds } from "@/components/providers/ThemeProvider"
import { Button } from "@/components/ui/button"
import FormContainer from "../forms/FormContainer"
import CategoryForm from "../forms/CategoryForm"
import CategoryTimerCardDropDown from "./CategoryTimerCardDropDown";

type Color = keyof typeof backgrounds;

type CategoryTimerCardProps = {
	id: string
	name: string
	color: Color
}


const CategoryTimerCard = ({ category }: { category: CategoryTimerCardProps }) => {
	return (
		<div className={`${backgrounds[category.color]} rounded-md min-w-52 min-h-52 flex flex-col justify-around relative`}>
			<div className="absolute right-0 top-0">
				<CategoryTimerCardDropDown id={category.id}/>
			</div>
			<h2 className="text-2xl font-bold tracking-wide text-center">{category.name}</h2>
			<div className="flex justify-center gap-5">
				<FormContainer
					title="Update category details"
					description="Change the name or color of the category"
					openButtonLabel="Edit"
				>
					<CategoryForm id={category.id} />
				</FormContainer>
				<Button type="button" variant={'outline'} className="text-black">Start</Button>
			</div>
		</div>
	)
}

export default CategoryTimerCard