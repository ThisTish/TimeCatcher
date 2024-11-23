"use server"

import { newPasswordFormSchema } from "@/lib/types"
import { actionClient } from "@/lib/safe-action"
import { db } from "@/prisma/db"
import { getPasswordResetToken } from "./tokens"
import { hash } from "bcrypt"
import { findUserByEmail } from "./user"


export const newPassword = actionClient
	.schema(newPasswordFormSchema)
	.action(async ({ parsedInput: {password, token} }) => {


		if (!token) return { error: 'Invalid token' }
		const existingResetPasswordToken = await getPasswordResetToken(token)

		if (!existingResetPasswordToken) return { error: 'Invalid token' }


		if ('expires' in existingResetPasswordToken) {
			const hasExpired = new Date(existingResetPasswordToken.expires) < new Date()
			if (hasExpired) return { error: 'Token has expired' }

			if ('email' in existingResetPasswordToken) {
				const existingUser = await findUserByEmail(existingResetPasswordToken.email)
				if (!existingUser) return { error: 'Could not find user' }

				const hashedPassword = await hash(password, 10)

				await db.user.update({
					where: {
						email: existingResetPasswordToken.email
					},
					data: {
						password: hashedPassword
					}
				})
				await db.resetPasswordToken.delete({
					where: {
						id_token: {
							id: existingResetPasswordToken.id,
							token: existingResetPasswordToken.token
						}
					}
				})
			}
				return { success: `Password updated! Redirecting to login page...` }
			}
		})

