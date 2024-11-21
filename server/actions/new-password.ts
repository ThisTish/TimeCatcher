'use server'

import { newPasswordFormSchema } from "@/lib/types"
import { actionClient } from "@/lib/safe-action"
import { useParams } from "next/navigation"


export const newPassword = actionClient
	.schema(newPasswordFormSchema)
	.action(async ({ parsedInput: {password} }) => {

		const token = useParams().token

		


		return { success: `Reset password password has been sent. ` }
	})