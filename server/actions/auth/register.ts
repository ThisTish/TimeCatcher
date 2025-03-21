'use server'

import { registerFormSchema } from "@/lib/types"
import { actionClient } from "@/lib/safe-action"
import { db } from "@/prisma/db"
import { hash } from 'bcrypt'
import { generateVerificationToken } from "./tokens"
import { sendVerificationEmail } from "./emails"


export const register = actionClient
	.schema(registerFormSchema)
	.action(async ({ parsedInput: { name, email, password, confirm } }) => {

		if (password !== confirm) return { error: 'Passwords do not match' }
		const hashedPassword = await hash(password, 10)

		const existingUser = await db.user.findFirst({
			where: {
				email
			}
		})
		if (existingUser) {
			if (!existingUser.emailVerified) {
				const newVerificationToken = await generateVerificationToken(email)
				await sendVerificationEmail(newVerificationToken.email, newVerificationToken.token)
			}
			return { error: 'Email already in use' }
		}


		const newUser = await db.user.create({
			data: {
				name,
				email,
				password: hashedPassword,
			}
		})
		return { success: `Welcome, ${newUser.name}. Please check ${newUser.email} for a verification email ` }
		const newVerificationToken = await generateVerificationToken(email)

		await sendVerificationEmail(newVerificationToken.email, newVerificationToken.token)

		return { success: `Welcome, ${newUser.name}. Please check ${newUser.email} for a verification email ` }
	})