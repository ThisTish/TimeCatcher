import CategoryForm from "@/components/forms/CategoryForm"
import FormContainer from "@/components/forms/FormContainer"
import { getAllCategoriesBasic } from "@/server/actions/category/get-categories"
import CategoryTimerCard from "@/components/categoryCards/CategoryTimerCard"

const TimersPage = async () => {

	const categories = await getAllCategoriesBasic()

	if(!categories) return <div>Server Error, please reload page.</div>

	if(categories === null || categories.length === 0) return <div className="flex gap-1">
		<p>Start by adding a category</p>
		<FormContainer
			title='Create a new category' 
			description='Choose a name and color for a new category to track' 
			openButtonLabel='Here'
			>
			<CategoryForm  />
		</FormContainer>
	</div>

	

	return (
		<div>
			<h1>Timers</h1>
			<div className="flex flex-wrap gap-10 m-20">
			{categories.map((category) =>
				<CategoryTimerCard key={category.id} category={category}/>
			)}
			</div>
		</div>
	)
}

export default TimersPage