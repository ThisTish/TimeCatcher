'use server'

import { registerFormSchema } from "@/lib/types"
import { createSafeActionClient } from "next-safe-action"

// more options to look into: https://next-safe-action.dev/docs/define-actions/create-the-client
export const actionClient = createSafeActionClient()
.schema(registerFormSchema)
.action( async ({parsedInput: {username, email, password, confirm, code}}) =>{
	return console.log(username, email, password, confirm, code)
})