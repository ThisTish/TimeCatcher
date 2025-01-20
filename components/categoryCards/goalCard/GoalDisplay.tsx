import FormContainer from "@/components/forms/FormContainer"
import GoalForm from "@/components/forms/goalForm/GoalForm"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { timeFormatString } from "@/lib/time-format"
import { GoalDisplayProps } from "@/lib/types"
import { cn } from "@/lib/utils"
import { Color } from "@prisma/client"
import { Edit, RefreshCw } from "lucide-react"


const GoalDisplay = ({ id, timeFrame, timePassed, targetTime, reoccurring, categoryId, completed }: GoalDisplayProps ) => {
	if (!timePassed) timePassed = 0
	const timeToGo = targetTime - timePassed
	let progress = (timePassed / targetTime) * 100
	if (progress > 100) progress = 100


	return (
		<div className="w-full -ml-1 relative">
			<header className="text-sm -ml-1 items-center font-semibold flex gap-2">
				<h3>{timeFrame.slice(0, 1) + timeFrame.slice(1).toLowerCase()}</h3>
				{reoccurring
					? <TooltipProvider>
						<Tooltip>
							<TooltipTrigger>
								<RefreshCw size={14} />
							</TooltipTrigger>
							<TooltipContent>
								Reoccurring
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
					: null}
			</header>

			<div className="flex items-center justify-center text-xs gap-1">
				<span className="text-nowrap">{timeFormatString(timePassed, 'h', 'm', false)}</span>
				<Progress
					className="border border-black"
					value={progress}
				/>

				<span className="text-nowrap">{timeFormatString(targetTime, 'h', 'm', false)}</span>


				{/* <TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild> */}
				<FormContainer
					className=" border-none -mr-1 p-0  h-fit z-10"
					title="Edit goal"
					openButtonLabel={
						<Edit className="" aria-label="Edit" />

					}
				>
					<GoalForm id={id} timeFrame={timeFrame} targetTime={targetTime} reoccurring={reoccurring} categoryId={categoryId} />
				</FormContainer>
				{/* </TooltipTrigger>
						<TooltipContent>
							Edit
						</TooltipContent>
					</Tooltip>
				</TooltipProvider> */}
			</div>
			<footer>
				<p className="text-center text-xs tracking-tight leading-none">
					{progress === 100 ? `Goal completed!` :
						`${timeFormatString(timeToGo, ` hours`, ` minutes`, false)} to go!`
					}

				</p>

			</footer>
		</div >
	)
}

export default GoalDisplay