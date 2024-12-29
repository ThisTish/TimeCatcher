import ResetTimerButton from "../categoryCards/timer/ResetTimerButton"
import StartButton from "../categoryCards/timer/StartButton"
import StopButton from "../categoryCards/timer/StopButton"
import TimerDisplay from "../categoryCards/timer/TimerDisplay"

const CategoryPageTimer = ({startTime, categoryId }:{startTime?: Date | null, categoryId: string}) => {
	return (
		<>
		{startTime
				? (
					<div className="grid w-fit">
						<TimerDisplay startTime={startTime} />
						<div className="grid grid-cols-2">
							<ResetTimerButton timeLogId={categoryId} />
							<StopButton categoryId={categoryId} page={`categories/${categoryId}`} />
						</div>
					</div>
				) : (
					<div>
						<StartButton categoryId={categoryId} disabled={false} />
					</div>

				)
		}
		</>
	)
}

export default CategoryPageTimer