import CategoryForm from "@/components/forms/CategoryForm"
import FormContainer from "@/components/forms/FormContainer"
import { Button } from "@/components/ui/button"
import { getAllCategoriesBasic } from "@/server/actions/get-categories"
import { backgrounds } from "@/components/providers/ThemeProvider"

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
			{categories.map((category) =>{
				return (
					<div 
					key={category.id}
					className={`${backgrounds[category.color]} rounded-md min-w-52 min-h-52 flex flex-col justify-around`}
					>
						<h2 className="text-2xl font-bold tracking-wide text-center">{category.name}</h2>
						<div className="flex justify-center gap-5">
						<FormContainer
							title="Update category details"
							description="Change the name or color of the category"
							openButtonLabel="Edit"
							>
								<CategoryForm id={category.id}/>
						</FormContainer>
						<Button type="button" variant={'outline'} className="text-black">Start</Button>
						</div>
					</div>
				)
			})}
			</div>
		</div>
	)
}

export default TimersPage