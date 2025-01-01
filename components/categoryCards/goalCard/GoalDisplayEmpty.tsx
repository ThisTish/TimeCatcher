import FormContainer from "@/components/forms/FormContainer"
import GoalForm from "@/components/forms/goalForm/GoalForm"
import { TimeFrame } from "@prisma/client"


const GoalDisplayEmpty = ({ timeFrame, categoryId }: { timeFrame: TimeFrame, categoryId: string }) => {

	return (
		<div className="w-full -ml-1 relative">
			<header>
				<h4 className="text-sm -ml-1 font-semibold">{timeFrame}</h4>
			</header>
				<FormContainer
					className={'text-xs w-full border-black p-3 h-3'}
					title="Add a new goal"
					openButtonLabel={`Add Goal for ${timeFrame.slice(0, 1).toUpperCase() + timeFrame.slice(1).toLowerCase()}`}
				>
					<GoalForm categoryId={categoryId} timeFrame={timeFrame} />
				</FormContainer>

		</div>
	)
}

export default GoalDisplayEmpty