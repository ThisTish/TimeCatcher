import CategoryForm from "@/components/forms/CategoryForm"
import FormContainer from "@/components/forms/FormContainer"
import { Button } from "@/components/ui/button"
import { getAllCategoriesBasic } from "@/server/actions/get-categories"
import Error from "next/error"

const TimersPage = async () => {

	const categories = await getAllCategoriesBasic()
	console.dir(categories)

	if(!categories) return <div>Server Error, please reload page.</div>

	if(categories === null || categories.length === 0) return <div className="flex gap-1">
		<p>Start by adding a category</p>
		<FormContainer
			title='Create a new category' 
			description='Choose a name and color for a new category to track' 
			openButtonLabel='Here'
			>
			<CategoryForm mode='create' />
		</FormContainer>
		
	</div>

	return (
		<div>
			<h1>Timers</h1>
			{categories.map((category) =>{
				return (
					<div 
					key={category.id}
					className={`bg-${category.color.toLowerCase()}`}
					>
						<h2>{category.name}</h2>
						<Button variant={'default'}>Start</Button>
					</div>
				)
			})}
		</div>
	)
}

export default TimersPage