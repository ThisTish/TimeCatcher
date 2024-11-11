'use server'
import { loginFormSchema } from '@/lib/types'
import { actionClient } from "@/lib/safe-action"

export const login = actionClient
	.schema(loginFormSchema)
	.action(async ({ parsedInput: {  email, password, code } }) => {
		// const existingUser = await 


		return console.log( email, password, code)
	})



