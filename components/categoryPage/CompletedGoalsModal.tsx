"use client"

import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer"
import { useState } from "react"
import { GoalDisplayProps, TimeLog } from "@/lib/types"
import { TimeFrame } from "@prisma/client"
import CompletedGoalsSections from "./CompletedGoalsSections"

const CompletedGoalsModal = ({ goals, title, timeLogs }: { goals: GoalDisplayProps[], title: TimeFrame, timeLogs: TimeLog[] }) => {
	const [open, setOpen] = useState(false)
	const isDesktop = useMediaQuery("(min-width: 768px)")

	if (isDesktop) {
		return (
			<Dialog open={open} onOpenChange={setOpen} >
				<DialogTrigger asChild>
					<Button variant="outline">Show More</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>CAUGHT {title} GOALS</DialogTitle>
						<DialogDescription>
							Full list of your completed goals for {title.toLowerCase()}s.
						</DialogDescription>
					</DialogHeader>
					<CompletedGoalsSections goals={goals} title={title} showTitle={false} timeLogs={timeLogs}/>
				</DialogContent>
			</Dialog>
		)
	}

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>
				<Button variant="outline">Show More</Button>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader className="text-left">
					<DrawerTitle>CAUGHT {title} GOALS</DrawerTitle>
					<DrawerDescription>
							Full list of your completed goals for {title.toLowerCase()}s.
						</DrawerDescription>
				</DrawerHeader>
				<CompletedGoalsSections goals={goals} title={title} showTitle={false} timeLogs={timeLogs} />
				<DrawerFooter className="pt-2">
					<DrawerClose asChild>
						<Button variant="outline">Close</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	)
}




export default CompletedGoalsModal