import FormContainer from "@/components/forms/FormContainer"
import GoalForm from "@/components/forms/goalForm/GoalForm"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { timeFormatString } from "@/lib/time-format"
import { TimeFrame } from "@prisma/client"
import { Edit, RefreshCw } from "lucide-react"

type GoalDisplayProps = {
	id: string
	categoryId: string
	timeFrame: TimeFrame
	timePassed: number
	targetTime: number
	reoccurring: boolean
}


const GoalDisplay = ({ id, timeFrame, timePassed, targetTime, reoccurring, categoryId }: GoalDisplayProps) => {
	const timeToGo = targetTime - timePassed
	let progress = (timePassed / targetTime) * 100
	if (progress > 100) progress = 100

	return (
		<div className="w-full -ml-1 relative">
			<header className="text-sm -ml-1 items-center font-semibold flex gap-2">
				<h4>{timeFrame}</h4>
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
				<span className="text-nowrap">{timeFormatString({ time: timePassed, h: 'h', m: 'm', includeSeconds: false })}</span>
				<Progress
					className="border border-black"
					value={progress}
				/>

				<span className="text-nowrap">{timeFormatString({ time: targetTime, h: 'h', m: 'm', includeSeconds: false, })}</span>


				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger >
							<FormContainer
								className=" border-none -mr-1 p-0  h-fit z-10"
								title="Update goal details"
								openButtonLabel={
									<Edit className="" />

								}
							>
								<GoalForm id={id} timeFrame={timeFrame} targetTime={targetTime} reoccurring={reoccurring} categoryId={categoryId}/>
							</FormContainer>
						</TooltipTrigger>
						<TooltipContent>
							Edit
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</div>
			<footer>
				<p className="text-center text-xs tracking-tighter leading-none">
					{progress === 100 ? `Goal completed!` :
						`${timeFormatString({ time: timeToGo, h: ` hours`, m: ` minutes`, includeSeconds: false })} to go!`
					}

				</p>

			</footer>
		</div >
	)
}

export default GoalDisplay