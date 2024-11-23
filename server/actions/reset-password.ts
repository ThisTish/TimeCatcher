'use server'

import { forgotPasswordFormSchema } from "@/lib/types"
import { actionClient } from "@/lib/safe-action"
import { findUserByEmail } from "./user"

import { generateResetPasswordToken } from "./tokens"
import { sendResetPasswordEmail } from "./emails"


export const resetPassword = actionClient
	.schema(forgotPasswordFormSchema)
	.action(async ({ parsedInput: {email} }) => {

		const user = await findUserByEmail(email)
		if(!user) return { error: 'User not found' }

		const newResetPasswordToken = await generateResetPasswordToken(email)

		await sendResetPasswordEmail(newResetPasswordToken.email, newResetPasswordToken.token)
		console.log(newResetPasswordToken.token)

		return { success: `Reset password email has been sent. ` }
	})