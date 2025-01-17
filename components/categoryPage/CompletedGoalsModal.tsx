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
import { Color, TimeFrame } from "@prisma/client"
import CompletedGoalsSections from "./CompletedGoalsSections"

const CompletedGoalsModal = ({ goals, title, timeLogs, color }: { goals: GoalDisplayProps[], title: TimeFrame, timeLogs: TimeLog[], color: Color }) => {
	const [open, setOpen] = useState(false)
	const isDesktop = useMediaQuery("(min-width: 768px)")

	if (isDesktop) {
		return (
			<Dialog open={open} onOpenChange={setOpen} >
				<DialogTrigger asChild>
					<Button variant={'secondary'} className="border-2 w-fit ml-5">Show More</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Caught {title.slice(0, 1) + title.slice(1).toLocaleLowerCase()} Goals</DialogTitle>
						<DialogDescription>
							Full list of your completed {title.toLowerCase()} goals.
						</DialogDescription>
					</DialogHeader>
					<CompletedGoalsSections goals={goals} title={title} showTitle={false} timeLogs={timeLogs} color={color} />
				</DialogContent>
			</Dialog>
		)
	}

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>
				<Button variant={'secondary'} className="border-2 w-fit ml-5">Show More</Button>
			</DrawerTrigger>
			<DrawerContent className="overflow-auto">
				<DrawerHeader className="text-left">
					<DrawerTitle>Caught {title.slice(0, 1) + title.slice(1).toLocaleLowerCase()} Goals</DrawerTitle>
					<DrawerDescription>
						Full list of your completed {title.toLowerCase()} goals.
					</DrawerDescription>
				</DrawerHeader>
				<CompletedGoalsSections goals={goals} title={title} showTitle={false} timeLogs={timeLogs} color={color} />
				<DrawerFooter className="pt-2">
					<DrawerClose asChild>
						<Button variant={'secondary'} className="border-2 w-fit ml-5">Close</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	)
}




export default CompletedGoalsModal