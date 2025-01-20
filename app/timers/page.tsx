import CategoryForm from "@/components/forms/CategoryForm"
import FormContainer from "@/components/forms/FormContainer"
import { getCategoryCardData } from "@/server/actions/category/get-categories"
import CategoryCard from "@/components/categoryCards/CategoryCard"
import { checkDateAndUpdateGoal } from "@/server/actions/goal/check-and-update-goal"
import { Color } from "@prisma/client"

const TimersPage = async () => {

	const { success, error } = await getCategoryCardData()
	if (success) {
		const categories = success
		categories.map((category) => {
			checkDateAndUpdateGoal(category.id)
		})
	}

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
			<div className="flex flex-wrap justify-center gap-10 md:m-20">
				{categories.map((category) =>
						<CategoryCard
							key={category.id}
							category={{
								id: category.id,
								name: category.name,
								color: category.color as Color,
								running: runningCategory?.id === category.id ? true : false,
								disabled: runningCategory && runningCategory.id !== category.id ? true : false,
								totalTime: category.timeLogs.reduce((acc, log) => acc + (log.timePassed ?? 0), 0),
								startTime: runningTimer?.startTime,
								runningTimeLogId: runningTimer?.id,
								goals: category.goals,
								timeLogs: category.timeLogs
							}}
						/>
				)}

			</div>
		</div>
	)
}

export default TimersPage