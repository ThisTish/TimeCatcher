import { backgrounds } from "@/components/providers/ThemeProvider"
import { Button } from "@/components/ui/button"
import FormContainer from "../forms/FormContainer"
import CategoryForm from "../forms/CategoryForm"
import CategoryTimerCardDropDown from "./CategoryTimerCardDropDown"
import StartButton from "./timer/StartButton"
import StopButton from "./timer/StopButton"
import TimerDisplay from "./timer/TimerDisplay"
import { timeFormat } from "@/lib/time-format"
import { E_Colors } from "@/lib/types"

type Color = keyof typeof backgrounds

type CategoryTimerCardProps = {
	id: string
	name: string
	color: Color
	running: boolean
	disabled: boolean
	totalTime: number
	startTime?: Date
}

const CategoryTimerCard = ({ category }: { category: CategoryTimerCardProps }) => {

	const { hours, minutes, seconds } = timeFormat(category.totalTime / 1000 || 0)


	return (
		<div className={`${backgrounds[category.color]} rounded-md size-52 flex flex-col justify-around relative`}>
			{/* category options */}
			<div className="absolute right-0 top-0">
				<CategoryTimerCardDropDown id={category.id} />
			</div>
			<h2 className="text-2xl font-bold tracking-wide text-center">{category.name}</h2>

			{/* category TotalTime */}
			<div className="text-center text-xs font-light">
				<p>Total Time</p>
				<time>{hours} h {minutes} m {seconds} s</time>
			</div>

			{/* running timer display */}
			{category.running && category.startTime ? (
				<TimerDisplay startTime={category.startTime} />
			) : <div></div>
			}

			{/* edit category */}
			<div className="flex justify-center gap-5">
				<FormContainer
					title="Update category details"
					description="Change the name or color of the category"
					openButtonLabel="Edit"
				>
					<CategoryForm id={category.id} categoryName={category.name} categoryColor={category.color as E_Colors} />
				</FormContainer>

				{/* start/stop timer button */}
				{category.running ?
					<StopButton categoryId={category.id} /> :
					<StartButton categoryId={category.id} disabled={category.disabled} />
				}
			</div>
		</div>
	)
}

export default CategoryTimerCard