import { CategoryTimerCardProps } from "@/lib/types"

import StartButton from "./timer/StartButton"
import StopButton from "./timer/StopButton"
import TimerDisplay from "./timer/TimerDisplay"
import ResetTimerButton from "./timer/ResetTimerButton"

import { CardContent, CardFooter } from "../ui/card"





const CategoryTimerCard = ({ categoryId, running, runningTimeLogId, disabled, startTime }: CategoryTimerCardProps) => {

	return (
		<>
			{/* running timer display */}
			{running && startTime ? (
				<CardContent className="flex gap-3 justify-center text-lg -mt-3 font-semibold tabular-nums">
					<TimerDisplay startTime={startTime} />
				</CardContent>
			) : (
				<CardContent className="flex gap-3 items-center justify-center h-10 tabular-nums">
					<StartButton categoryId={categoryId} disabled={disabled} />
				</CardContent>)
			}

			<div className="inline-flex gap-5 mb-10 mx-auto ">

				{/* start/stop timer button */}
				{running && runningTimeLogId
					? (
						<>
							<ResetTimerButton timeLogId={runningTimeLogId} />
							<StopButton categoryId={categoryId} page={'timers'} />
						</>
					) : (null
						// <StartButton categoryId={categoryId} disabled={disabled} />
					)
				}
			</div>
		</>
	)
}

export default CategoryTimerCard