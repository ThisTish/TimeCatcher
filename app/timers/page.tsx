import CategoryForm from "@/components/forms/CategoryForm"
import FormContainer from "@/components/forms/FormContainer"
import { getCategoryCardData } from "@/server/actions/category/get-categories"
import CategoryTimerCard from "@/components/categoryCards/CategoryTimerCard"

const TimersPage = async () => {

	// todo useMemo()

	const {data, success, error} = await getCategoryCardData()

	if(error) throw new Error(error)

	if(!data) throw new Error('Error fetching data, please try again')

		const categories = data

		const runningCategory = categories.find((category) => category.timeLogs.some((log) => log.running))
		const startTime = runningCategory?.timeLogs.find((log) => log.running)?.startTime

	if(success)
// !test
	return <div className="flex gap-1">
		<p>Start by adding a category</p>
		<FormContainer
			title='Create a new category'
			description='Choose a name and color for a new category to track'
			openButtonLabel='Here'
		>
			<CategoryForm />
		</FormContainer>
	</div>



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
							color: category.color,
							running: runningCategory?.id === category.id ? true : false,
							disabled: runningCategory && runningCategory.id !== category.id ? true : false,
							totalTime: category.timeLogs.reduce((acc, log) => acc + (log.timePassed ?? 0), 0),
							startTime
						}}
					/>
				)}
			</div>
		</div>
	)
}

export default TimersPage