'use server'
import { loginFormSchema } from '@/lib/types'
import { actionClient } from "@/lib/safe-action"

export const login = actionClient
	.schema(loginFormSchema)
	.action(async ({ parsedInput: {  email, password, code } }) => {
		return console.log( email, password, code)
	})



