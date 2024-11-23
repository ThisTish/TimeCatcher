"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
	category: z.string().min(3, {
		message: "Please use at least 3 characters.",
	}),
	color: z.enum(["BLUE", "GREEN", "YELLOW", "ORANGE", "RED", "PINK", "PURPLE", "BLACK", "WHITE", "GRAY", "BROWN" ]),
})

export function ProfileForm() {
	const form = useForm({
		resolver: zodResolver(formSchema),
	})
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(() => console.log('form'))} className="space-y-8">
				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Username</FormLabel>
							<FormControl>
								<Input placeholder="shadcn" {...field} />
							</FormControl>
							<FormDescription>
								This is your public display name.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Submit</Button>
			</form>
		</Form>
	)
}
