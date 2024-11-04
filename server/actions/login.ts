'use server'
import { loginFormSchema } from '@/lib/types'
import { actionClient } from "@/lib/safe-action"

export const login = actionClient
	.schema(loginFormSchema)
	.action(async ({ parsedInput: { username, email, password, code } }) => {
		return console.log(username, email, password, code)
	})



