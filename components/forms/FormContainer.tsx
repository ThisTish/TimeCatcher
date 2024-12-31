"use client"

import { useState, CSSProperties } from "react"
import { useMediaQuery } from "@/hooks/use-media-query"

import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
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
import Link from "next/link"
import { cn } from "@/lib/utils"

type FormContainerProps = {
	openButtonLabel: string
	title: 'Create a new category' | 'Update category details' | 'Add a new goal' | 'Update goal details'
	description: string
	children: React.ReactNode
	className?: string
}

const FormContainer = ({openButtonLabel, title, description, children, className}: FormContainerProps) => {
	const [open, setOpen] = useState(false)
	const isDesktop = useMediaQuery("(min-width: 768px)")

	if (isDesktop) {
		return (
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<Button type="button" variant='ghost' className={cn("border-white border", className)}>{openButtonLabel}</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>{title}</DialogTitle>
						<DialogDescription>
							{description}
						</DialogDescription>
					</DialogHeader>
					{children}
					<DialogFooter>
						<DialogClose asChild>
							<Button variant="outline">Done</Button>
							</DialogClose>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		)
	}

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>
				<Button variant="ghost">{openButtonLabel}</Button>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader className="text-left">
					<DrawerTitle>{title}</DrawerTitle>
					<DrawerDescription>
						{description}
					</DrawerDescription>
				</DrawerHeader>
				{children}

				<DrawerFooter className="pt-2">	
					<DrawerClose asChild>
						<Button variant="outline">Done</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	)
}

export default FormContainer