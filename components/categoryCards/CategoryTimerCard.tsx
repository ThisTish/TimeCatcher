import { backgrounds } from "@/components/providers/ThemeProvider"
import { Button } from "@/components/ui/button"
import FormContainer from "../forms/FormContainer"
import CategoryForm from "../forms/CategoryForm"
import CategoryTimerCardDropDown from "./CategoryTimerCardDropDown"
import StartButton from "./timer/StartButton"
import StopButton from "./timer/StopButton"
import TimerDisplay from "./timer/TimerDisplay"
import CalculatedTimeDisplay from "./timer/CalculatedTimeDisplay"

type Color = keyof typeof backgrounds

type CategoryTimerCardProps = {
	id: string
	name: string
	color: Color
	running: boolean
	disabled: boolean
}


const CategoryTimerCard = ({ category }: { category: CategoryTimerCardProps }) => {

	

	return (
		<div className={`${backgrounds[category.color]} rounded-md size-52 flex flex-col justify-around relative`}>
			<div className="absolute right-0 top-0">
				<CategoryTimerCardDropDown id={category.id} />
			</div>
			<h2 className="text-2xl font-bold tracking-wide text-center">{category.name}</h2>


			<CalculatedTimeDisplay categoryId={category.id}/>

			
			{category.running ? (
				<TimerDisplay />
				): <div></div>
				}
			<div className="flex justify-center gap-5">
				<FormContainer
					title="Update category details"
					description="Change the name or color of the category"
					openButtonLabel="Edit"
				>
					<CategoryForm id={category.id} />
				</FormContainer>
				{category.running ? 
				<StopButton categoryId={category.id} /> :
					<StartButton categoryId={category.id} disabled={category.disabled}/>
				}
			</div>
		</div>
	)
}

export default CategoryTimerCard