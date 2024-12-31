"use client";

import { backgrounds } from "@/components/providers/ThemeProvider";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { E_Colors } from "@/lib/types";
import { TimeFrame } from "@prisma/client";
import GoalDisplay from "./GoalDisplay";
import getTotalTime from "@/server/actions/timer/getTotalTime";
import { useEffect, useState } from "react";

type GoalCardProps = {
	categoryId: string;
	color: E_Colors;
	goals?: {
		id: string;
		timeFrame: TimeFrame;
		active: boolean;
		reoccurring: boolean;
		targetTime: number;
		completed: boolean;
	}[];
};

const GoalCards = ({ goals, color, categoryId }: GoalCardProps) => {
	const [totalTimes, setTotalTimes] = useState<Record<TimeFrame, number>>({
		[TimeFrame.DAY]: 0,
		[TimeFrame.WEEK]: 0,
		[TimeFrame.MONTH]: 0,
		[TimeFrame.YEAR]: 0,
	});

	// Fetch total times for each active goal
	useEffect(() => {
		const fetchTimes = async () => {
			if (!goals) return;

			const times: Record<TimeFrame, number> = { ...totalTimes };
			for (const timeFrame of Object.values(TimeFrame)) {
				times[timeFrame] = (await getTotalTime(categoryId, timeFrame)) ?? 0;
			}
			setTotalTimes(times);
		};

		fetchTimes().catch(console.error);
	}, [goals, categoryId]);

	const activeGoals = goals?.filter((goal) => goal.active);

	// Generate goal display slots
	const slots = Object.values(TimeFrame).map((timeFrame) => {
		const goal = activeGoals?.find((g) => g.timeFrame === timeFrame);

		if (goal) {
			return (
				<div key={timeFrame}>
					<GoalDisplay
						timeFrame={timeFrame}
						timePassed={totalTimes[timeFrame] ?? 0}
						targetTime={goal.targetTime}
					/>
				</div>
			);
		}

		return (
			<div key={timeFrame}>
				<button
					className="btn btn-primary"
					onClick={() => {
						console.log(`Add ${timeFrame} Goal`); // Replace with real add goal logic
					}}
				>
					Add {timeFrame.charAt(0).toUpperCase() + timeFrame.slice(1).toLowerCase()} Goal
				</button>
			</div>
		);
	});

	return (
		<Card className={`${backgrounds[color]} rounded-md size-64 flex flex-col justify-around relative`}>
			<CardHeader className="pt-2 pb-1 mb-1 text-lg font-bold text-center border border-b-2">
				<h3>GOALS</h3>
			</CardHeader>
			<CardContent className="grid gap-1 tabular-nums">{slots}</CardContent>
		</Card>
	);
};

export default GoalCards;
