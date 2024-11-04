'use server'

import { loginFormSchema } from "@/lib/types"
import { createSafeActionClient } from "next-safe-action"

// more options to look into: https://next-safe-action.dev/docs/define-actions/create-the-client
export const actionClient = createSafeActionClient()
.schema(loginFormSchema)
.action( async ({parsedInput: {username, email, password, code}}) =>{
	return console.log(username, email, password, code)
})