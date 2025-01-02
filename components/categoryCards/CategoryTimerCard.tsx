import { TimeFrame } from "@prisma/client"
import { E_Colors, GoalDisplayProps, TimeLog } from "@/lib/types"
import { timeFormat } from "@/lib/time-format"

import { backgrounds } from "@/components/providers/ThemeProvider"
import CategoryTimerCardDropDown from "./CategoryTimerCardDropDown"
import StartButton from "./timer/StartButton"
import StopButton from "./timer/StopButton"
import TimerDisplay from "./timer/TimerDisplay"
import ResetTimerButton from "./timer/ResetTimerButton"
import GoalCards from "./goalCard/GoalCards"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card"

type Color = keyof typeof backgrounds

type CategoryTimerCardProps = {
	id: string
	name: string
	color: E_Colors
	running: boolean
	disabled: boolean
	totalTime: number
	startTime?: Date
	runningTimeLogId?: string,
	timeLogs?: TimeLog[] 
	goals: GoalDisplayProps
}


const CategoryTimerCard = ({ category }: { category: CategoryTimerCardProps }) => {

	const { hours, minutes, seconds } = timeFormat(category.totalTime / 1000 || 0)


	return (
		<>
		<Card className={`${backgrounds[category.color]} rounded-md size-64 flex flex-col justify-around relative`}>

			{/* category options */}
			<div className="absolute right-0 top-0">
				<CategoryTimerCardDropDown id={category.id} name={category.name} color={category.color} />
			</div>

			<CardHeader>
				<h2 className="text-2xl font-bold tracking-wide text-center">{category.name}</h2>

				{/* category TotalTime */}
				<div className="text-center text-xs font-light">
					<p>Total Time</p>
					<time>{hours} h {minutes} m {seconds} s</time>
				</div>
			</CardHeader>

			{/* running timer display */}
			{category.running && category.startTime ? (
				<CardContent className="flex gap-3 items-center justify-center h-10 tabular-nums">

					<TimerDisplay startTime={category.startTime} />

				</CardContent>

			) : <CardContent className="flex gap-3 items-center justify-center h-10 tabular-nums"> </CardContent>

			}

			{/* edit category button*/}
			<CardFooter className="flex justify-center gap-5">


				{/* start/stop timer button */}
				{category.running && category.runningTimeLogId
					? (
						<>
							<ResetTimerButton timeLogId={category.runningTimeLogId} />

							<StopButton categoryId={category.id} page={'timers'} />
						</>)
					: (
						<>
							<Button
								variant={'ghost'}
								className="border-white border">
								Goals
							</Button>
							<StartButton categoryId={category.id} disabled={category.disabled} />
						</>
					)
				}
			</CardFooter>
		</Card>
		<GoalCards goals={category.goals}  categoryId={category.id} color={category.color} timeLogs={category.timeLogs} />

		
		</>
	)
}

export default CategoryTimerCard