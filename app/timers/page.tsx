import CategoryForm from "@/components/forms/CategoryForm"
import FormContainer from "@/components/forms/FormContainer"
import { getCategoryCardData } from "@/server/actions/category/get-categories"
import CategoryTimerCard from "@/components/categoryCards/CategoryTimerCard"
import { E_Colors } from "@/lib/types"

const TimersPage = async () => {

	const { success, error } = await getCategoryCardData()

	if (error) throw new Error(error)

	const categories = success

// No categories display
	if (categories?.length === 0 || !categories)
		return (
		<div className="flex gap-1">
			<p>Start by adding a category</p>
			<FormContainer
				title='Create a new category'
				description='Choose a name and color for a new category to track'
				openButtonLabel='Here'
			>
				<CategoryForm />
			</FormContainer>
		</div>
		)

// Running category/timer logic
const runningCategory = categories.find((category) => category.timeLogs.some((log) => log.running))
const runningTimer = runningCategory?.timeLogs.find((log) => log.running)

// Categories to display
	return (
		<div>
			<h1>Timers</h1>
			<div className="flex flex-wrap gap-10 m-20">
				{categories.map((category) =>
					<CategoryTimerCard
						key={category.id}
						category={{
							id: category.id,
							name: category.name,
							color: category.color as E_Colors,
							running: runningCategory?.id === category.id ? true : false,
							disabled: runningCategory && runningCategory.id !== category.id ? true : false,
							totalTime: category.timeLogs.reduce((acc, log) => acc + (log.timePassed ?? 0), 0),
							startTime: runningTimer?.startTime,
							timeLogId: runningTimer?.id,
							goals: category.goals
						}}
					/>
				)}
			</div>
		</div>
	)
}

export default TimersPage