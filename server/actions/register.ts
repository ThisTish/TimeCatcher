'use server'

import { registerFormSchema } from "@/lib/types"
import { actionClient } from "@/lib/safe-action"


export const register = actionClient
.schema(registerFormSchema)
.action( async ({parsedInput: {username, email, password, confirm, code}}) =>{
	return console.log(username, email, password, confirm, code)
	// todo logic for register
})