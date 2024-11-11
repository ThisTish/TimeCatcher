'use client'

import { registerFormSchema } from "@/lib/types"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z  from "zod"
import { useAction } from "next-safe-action/hooks"
import { register } from "@/server/actions/register"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import AuthCard from "./AuthCard"
import FormAlert from "./FormAlert"

const RegisterForm = () => {

	const registerForm = useForm<z.infer<typeof registerFormSchema>>({
		resolver: zodResolver(registerFormSchema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
			confirm: ''
		}
	})

	const { execute, result, isExecuting, hasErrored, hasSucceeded } = useAction(register)

	const onSubmit = (values: z.infer<typeof registerFormSchema>) => {
		execute(values)
		registerForm.reset()
	}

	return (
		<AuthCard cardTitle="Time to Register" backButtonLabel="Already have an account?" backButtonHref="/auth/login" showSocials={false}>
			<Form {...registerForm}>
				<form onSubmit={registerForm.handleSubmit(onSubmit)}>

					{/* name */}
					<FormField
						control={registerForm.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									Name
								</FormLabel>
								<FormControl>
									<Input
										type="text"
										placeholder="name"
										autoComplete="name"
										{...field} />
								</FormControl>
								<FormDescription>
								</FormDescription>
								<FormMessage>
									{registerForm.formState.errors.name?.message}
								</FormMessage>
							</FormItem>
						)}
					/>

					{/* email */}
					<FormField
						control={registerForm.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									Email
								</FormLabel>
								<FormControl>
									<Input
										type="email"
										placeholder="email"
										autoComplete="email"
										{...field} />
								</FormControl>
								<FormMessage>
									{registerForm.formState.errors.email?.message}
								</FormMessage>
							</FormItem>
						)}
					/>

					{/* password */}
					<FormField
						control={registerForm.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									Password
								</FormLabel>
								<FormControl>
									<Input
										placeholder="********"
										type="password"
										autoComplete="current-password"
										required
										{...field} />
								</FormControl>
								<FormMessage>
									{registerForm.formState.errors.password?.message}
								</FormMessage>
							</FormItem>
						)}
					/>

					{/* confirm password */}
					<FormField
						control={registerForm.control}
						name="confirm"
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									Confirm Password
								</FormLabel>
								<FormControl>
									<Input
										placeholder="********"
										type="password"
										required
										{...field} />
								</FormControl>
								<FormMessage>
									{registerForm.formState.errors.confirm?.message}
								</FormMessage>
							</FormItem>
						)}
					/>

					{hasErrored && <FormAlert message={`${result.data?.error}`} type={'error'}/>}
					{hasSucceeded && <FormAlert message={`${result.data?.success}`} type={'success'}/>}
					
					<Button
						type="submit"
						className={cn('w-full', isExecuting ? 'animate-pulse' : '')}
					>Submit
					</Button>

				</form>
			</Form>
		</AuthCard>
	)
}

export default RegisterForm